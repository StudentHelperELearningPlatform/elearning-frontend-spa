import { Injectable, computed, inject, signal } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContactService, InboxMessage, UserProfile, displayNameOf } from './contact.service';
import { AuthStore } from '@features/auth/store/auth.store';
import { TeacherClassService } from '@core/services/teacher-class.service';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface Conversation {
  contactId: string;
  contactName: string;
  messages: InboxMessage[];
  lastMessage: InboxMessage;
}

@Injectable({ providedIn: 'root' })
export class ChatStore {
  private readonly contactService = inject(ContactService);
  private readonly authStore = inject(AuthStore);
  private readonly classService = inject(TeacherClassService);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly sending = signal(false);
  readonly sendError = signal<string | null>(null);
  readonly selectedContactId = signal<string | null>(null);
  readonly startingChat = signal(false);
  readonly startChatError = signal<string | null>(null);

  private readonly _allMessages = signal<InboxMessage[]>([]);
  private readonly _userNames = signal<Map<string, string>>(new Map());
  private readonly _discoverableContacts = signal<{ id: string; name: string }[]>([]);

  readonly hasActiveConversations = computed(() => {
    const me = this.authStore.user()?.id;
    const msgs = this._allMessages();
    if (!me || msgs.length === 0) return false;

    return msgs.some((msg) => {
      const partnerId = msg.senderId === me ? msg.receiverId : msg.senderId;
      return partnerId && partnerId !== me;
    });
  });

  readonly conversations = computed<Conversation[]>(() => {
    const me = this.authStore.user()?.id;
    const msgs = this._allMessages();
    const names = this._userNames();
    if (!me) return [];

    const map = new Map<string, InboxMessage[]>();

    for (const msg of msgs) {
      // Received message: partner is senderId
      // Optimistically-sent message: partner is receiverId
      const partnerId: string =
        msg.senderId === me ? (msg.receiverId ?? msg.senderId) : msg.senderId;
      if (!partnerId || partnerId === me) continue;

      if (!map.has(partnerId)) map.set(partnerId, []);
      map.get(partnerId)!.push(msg);
    }

    const activeConvs = Array.from(map.entries())
      .map(([contactId, messages]) => {
        const sorted = [...messages].sort(
          (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
        );
        const contactName =
          names.get(contactId) ?? `User …${contactId.slice(-6)}`;
        return {
          contactId,
          contactName,
          messages: sorted,
          lastMessage: sorted.at(-1)!,
        };
      })
      .sort(
        (a, b) =>
          new Date(b.lastMessage.sentAt).getTime() -
          new Date(a.lastMessage.sentAt).getTime(),
      );

    if (activeConvs.length > 0) {
      return activeConvs;
    }

    // Fallback: discoverable/potential classmates or students
    return this._discoverableContacts().map((contact) => {
      const contactName = names.get(contact.id) ?? contact.name;
      return {
        contactId: contact.id,
        contactName,
        messages: [],
        lastMessage: {
          id: '',
          senderId: contact.id,
          subject: 'Direct Message',
          body: 'No messages yet. Say hello!',
          isRead: true,
          sentAt: new Date().toISOString(),
        },
      };
    });
  });

  readonly selectedConversation = computed(() =>
    this.conversations().find((c) => c.contactId === this.selectedContactId()),
  );

  loadInbox() {
    this.loading.set(true);
    this.error.set(null);

    forkJoin({
      inbox: this.contactService.getInbox().pipe(catchError(() => of([] as InboxMessage[]))),
      sent: this.contactService.getSent().pipe(catchError(() => of([] as InboxMessage[]))),
    }).subscribe({
      next: ({ inbox, sent }) => {
        const safeInbox = Array.isArray(inbox) ? inbox : [];
        const safeSent = Array.isArray(sent) ? sent : [];

        // Merge by id so an optimistic sent message added before the server
        // round-trip doesn't appear twice once persisted state is loaded.
        const byId = new Map<string, InboxMessage>();
        for (const m of [...safeInbox, ...safeSent]) {
          if (m && m.id) byId.set(m.id, m);
        }
        const merged = [...byId.values()];

        this._allMessages.set(merged);
        this._resolveContactNames(merged);
        this._loadDiscoverableContacts();
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Failed to load messages');
      },
    });
  }

  private _resolveContactNames(msgs: InboxMessage[]) {
    const me = this.authStore.user()?.id;
    // Partner is the other party — senderId for received, receiverId for sent.
    const partnerIds = msgs.flatMap((m) =>
      [m.senderId, m.receiverId].filter((id): id is string => !!id && id !== me),
    );
    const uniqueIds = [...new Set(partnerIds)];
    if (uniqueIds.length === 0) return;

    const requests = uniqueIds.map((id) =>
      this.contactService.getUser(id).pipe(catchError(() => of(null))),
    );

    forkJoin(requests).subscribe((profiles) => {
      const map = new Map(this._userNames());
      profiles.forEach((p: UserProfile | null, i) => {
        if (p) {
          map.set(uniqueIds[i], displayNameOf({ ...p, id: uniqueIds[i] }));
        }
      });
      this._userNames.set(map);
    });
  }

  private _loadDiscoverableContacts() {
    const me = this.authStore.user();
    if (!me) {
      this.loading.set(false);
      return;
    }

    const role = me.role;
    const myId = me.id;

    if (role === 'PROFESSOR' || role === 'TEACHER') {
      // Teachers can list their classes and roster each one through
      // GET /api/v1/teachers/classes/{id}/students.
      this.classService.getClasses().pipe(
        catchError(() => of([]))
      ).subscribe((classes) => {
        if (classes.length === 0) {
          this.loading.set(false);
          return;
        }

        const requests = classes.map((c) =>
          this.classService.getStudents(c.id).pipe(catchError(() => of([])))
        );

        forkJoin(requests).subscribe((rosters) => {
          const map = new Map<string, string>();
          for (const roster of rosters) {
            for (const s of roster) {
              // Backend returns StudentNameResponse(userId, firstName, lastName, email)
              const studentId = (s as { userId?: string }).userId ?? s.id;
              if (studentId && studentId !== myId) {
                map.set(studentId, displayNameOf({ ...s, id: studentId }));
              }
            }
          }
          const list = Array.from(map, ([id, name]) => ({ id, name }));
          this._discoverableContacts.set(list);

          const nameMap = new Map(this._userNames());
          list.forEach((item) => nameMap.set(item.id, item.name));
          this._userNames.set(nameMap);

          this.loading.set(false);
        });
      });
    } else {
      // Students (and other roles) have no exposed user/roster lookup,
      // so we leave the discoverable list empty — they start chats via
      // startConversationByUserId().
      this._discoverableContacts.set([]);
      this.loading.set(false);
    }
  }

  /**
   * Look up a user by UUID and add them as a discoverable contact so the user
   * can send the first message. Backend exposes `GET /api/v1/users/{id}` to
   * any authenticated user, which is the only generic discovery path for
   * students.
   */
  startConversationByUserId(rawId: string): void {
    const id = rawId.trim();
    this.startChatError.set(null);

    if (!UUID_RE.test(id)) {
      this.startChatError.set('Enter a valid user ID (UUID).');
      return;
    }

    const me = this.authStore.user();
    if (me && id === me.id) {
      this.startChatError.set("You can't start a chat with yourself.");
      return;
    }

    // Already a known contact? Just select it.
    const existingName = this._userNames().get(id);
    if (existingName) {
      this.selectedContactId.set(id);
      return;
    }

    this.startingChat.set(true);
    this.contactService.getUser(id).subscribe({
      next: (profile) => {
        const name = displayNameOf({ ...profile, id });
        const nameMap = new Map(this._userNames());
        nameMap.set(id, name);
        this._userNames.set(nameMap);

        const discoverable = this._discoverableContacts();
        if (!discoverable.some((c) => c.id === id)) {
          this._discoverableContacts.set([...discoverable, { id, name }]);
        }
        this.selectedContactId.set(id);
        this.startingChat.set(false);
      },
      error: () => {
        this.startingChat.set(false);
        this.startChatError.set('No user found with that ID.');
      },
    });
  }

  selectContact(contactId: string) {
    this.selectedContactId.set(contactId);
  }

  contactNameFor(contactId: string): string {
    return (
      this._userNames().get(contactId) ?? `User …${contactId.slice(-6)}`
    );
  }

  sendMessage(receiverId: string, body: string, subject = 'Chat') {
    const me = this.authStore.user();
    if (!me || !body.trim()) return;

    this.sending.set(true);
    this.sendError.set(null);

    this.contactService
      .sendMessage({
        senderId: me.id,
        receiverId,
        subject,
        body: body.trim(),
      })
      .subscribe({
        next: () => {
          const optimistic: InboxMessage = {
            id: crypto.randomUUID(),
            senderId: me.id,
            receiverId,
            subject,
            body: body.trim(),
            isRead: true,
            sentAt: new Date().toISOString(),
          };
          this._allMessages.update((list) => [...list, optimistic]);
          this.sending.set(false);
        },
        error: () => {
          this.sending.set(false);
          this.sendError.set('Failed to send. Try again.');
        },
      });
  }
}
