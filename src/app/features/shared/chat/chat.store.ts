import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContactService, InboxMessage, UserProfile } from './contact.service';
import { AuthStore } from '@features/auth/store/auth.store';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { TeacherClassService } from '@core/services/teacher-class.service';

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
  private readonly http = inject(HttpClient);
  private readonly apiBase = inject(USER_PLATFORM_API_URL);
  private readonly classService = inject(TeacherClassService);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly sending = signal(false);
  readonly sendError = signal<string | null>(null);
  readonly selectedContactId = signal<string | null>(null);

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
          lastMessage: sorted[sorted.length - 1],
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

    this.contactService.getInbox().subscribe({
      next: (msgs) => {
        const safeMessages = Array.isArray(msgs) ? msgs : [];
        this._allMessages.set(safeMessages);
        this._resolveContactNames(safeMessages);
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
    const uniqueIds = [
      ...new Set(msgs.map((m) => m.senderId).filter((id) => id !== me)),
    ];
    if (uniqueIds.length === 0) return;

    const requests = uniqueIds.map((id) =>
      this.contactService.getUser(id).pipe(catchError(() => of(null))),
    );

    forkJoin(requests).subscribe((profiles) => {
      const map = new Map(this._userNames());
      profiles.forEach((p: UserProfile | null, i) => {
        if (p) {
          map.set(
            uniqueIds[i],
            p.name ?? p.username ?? p.email ?? `User …${uniqueIds[i].slice(-6)}`,
          );
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

    if (role === 'STUDENT') {
      this.http.get<any>(`${this.apiBase}/students/me/profile`).pipe(
        catchError(() => of(null))
      ).subscribe((profile) => {
        if (!profile || !Array.isArray(profile.enrolledClasses) || profile.enrolledClasses.length === 0) {
          this.loading.set(false);
          return;
        }

        const requests = profile.enrolledClasses.map((classId: string) =>
          this.classService.getClassDetail(classId).pipe(catchError(() => of(null)))
        );

        forkJoin(requests).subscribe((details: any) => {
          const peers = new Map<string, string>();
          details.forEach((detail: any) => {
            if (detail && Array.isArray(detail.students)) {
              detail.students.forEach((s: any) => {
                if (s.id && s.id !== myId) {
                  peers.set(s.id, s.name || s.email || `Student …${s.id.slice(-6)}`);
                }
              });
            }
          });

          const list = Array.from(peers.entries()).map(([id, name]) => ({ id, name }));
          this._discoverableContacts.set(list);

          const nameMap = new Map(this._userNames());
          list.forEach(item => nameMap.set(item.id, item.name));
          this._userNames.set(nameMap);

          this.loading.set(false);
        });
      });
    } else if (role === 'PROFESSOR' || role === 'TEACHER') {
      this.classService.getClasses().pipe(
        catchError(() => of([]))
      ).subscribe((classes) => {
        if (classes.length === 0) {
          this.loading.set(false);
          return;
        }

        const requests = classes.map((c) =>
          this.classService.getClassDetail(c.id).pipe(catchError(() => of(null)))
        );

        forkJoin(requests).subscribe((details: any) => {
          const studentsMap = new Map<string, string>();
          details.forEach((detail: any) => {
            if (detail && Array.isArray(detail.students)) {
              detail.students.forEach((s: any) => {
                if (s.id && s.id !== myId) {
                  studentsMap.set(s.id, s.name || s.email || `Student …${s.id.slice(-6)}`);
                }
              });
            }
          });

          const list = Array.from(studentsMap.entries()).map(([id, name]) => ({ id, name }));
          this._discoverableContacts.set(list);

          const nameMap = new Map(this._userNames());
          list.forEach(item => nameMap.set(item.id, item.name));
          this._userNames.set(nameMap);

          this.loading.set(false);
        });
      });
    } else {
      this.loading.set(false);
    }
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
