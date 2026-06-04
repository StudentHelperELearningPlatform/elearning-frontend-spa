import { Injectable, computed, inject, signal } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  ContactService,
  InboxMessage,
  UserProfile,
  displayNameOf,
} from './contact.service';
import { AuthStore } from '@features/auth/store/auth.store';
import { TeacherClassService } from '@core/services/teacher-class.service';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface Conversation {
  contactId: string;
  contactName: string;
  messages: InboxMessage[];
  lastMessage: InboxMessage;
}

export interface UserSearchResult {
  id: string;
  name: string;
  email: string;
  role: string;
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

  readonly searchLoading = signal(false);
  readonly searchResults = signal<UserSearchResult[]>([]);
  private _searchCounter = 0;

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
        const contactName = names.get(contactId) ?? `User …${contactId.slice(-6)}`;
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

    if (activeConvs.length > 0) return activeConvs;

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

        // Dedupe by id so optimistic + persisted copies don't double up.
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
    // Partner is the other party: senderId for received, receiverId for sent.
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
        if (p) map.set(uniqueIds[i], displayNameOf({ ...p, id: uniqueIds[i] }));
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
      this.classService.getClasses().pipe(catchError(() => of([]))).subscribe((classes) => {
        if (classes.length === 0) {
          this.loading.set(false);
          return;
        }
        const requests = classes.map((c) =>
          this.classService.getStudents(c.id).pipe(catchError(() => of([]))),
        );
        forkJoin(requests).subscribe((rosters) => {
          const map = new Map<string, string>();
          for (const roster of rosters) {
            for (const s of roster) {
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
      this._discoverableContacts.set([]);
      this.loading.set(false);
    }
  }

  /**
   * Live-search students and teachers by name via GET /api/v1/users/search.
   * Empty/short queries clear results. Concurrent calls are guarded with a
   * monotonic counter so the latest query wins regardless of network order.
   */
  searchUsersByName(query: string): void {
    const q = query.trim();
    if (q.length < 2) {
      this.searchResults.set([]);
      this.searchLoading.set(false);
      return;
    }
    const me = this.authStore.user()?.id;
    const ticket = ++this._searchCounter;
    this.searchLoading.set(true);
    this.contactService.searchUsers(q).pipe(catchError(() => of(null))).subscribe((res) => {
      if (ticket !== this._searchCounter) return; // stale response
      const list: UserSearchResult[] = (res?.users ?? [])
        .map((u) => ({
          id: u.id,
          name: displayNameOf(u),
          email: u.email ?? '',
          role: u.role ?? '',
        }))
        .filter((u) => u.id && u.id !== me);
      this.searchResults.set(list);
      this.searchLoading.set(false);
    });
  }

  clearSearch(): void {
    this._searchCounter++;
    this.searchResults.set([]);
    this.searchLoading.set(false);
    this.startChatError.set(null);
  }

  /** Start a conversation with one of the search results. */
  selectSearchResult(r: UserSearchResult): void {
    const nameMap = new Map(this._userNames());
    nameMap.set(r.id, r.name);
    this._userNames.set(nameMap);

    const discoverable = this._discoverableContacts();
    if (!discoverable.some((c) => c.id === r.id)) {
      this._discoverableContacts.set([...discoverable, { id: r.id, name: r.name }]);
    }
    this.selectedContactId.set(r.id);
    this.clearSearch();
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
    return this._userNames().get(contactId) ?? `User …${contactId.slice(-6)}`;
  }

  /**
   * Live-search students and teachers by name via GET /api/v1/users/search.
   * Empty / short queries clear results; out-of-order responses can't clobber
   * the latest query thanks to the monotonic counter.
   */
  searchUsersByName(query: string): void {
    const q = query.trim();
    if (q.length < 2) {
      this.searchResults.set([]);
      this.searchLoading.set(false);
      return;
    }
    const me = this.authStore.user()?.id;
    const ticket = ++this._searchCounter;
    this.searchLoading.set(true);
    this.contactService.searchUsers(q).pipe(catchError(() => of(null))).subscribe((res) => {
      if (ticket !== this._searchCounter) return;
      const list: UserSearchResult[] = (res?.users ?? [])
        .map((u) => ({
          id: u.id,
          name: displayNameOf(u),
          email: u.email ?? '',
          role: u.role ?? '',
        }))
        .filter((u) => u.id && u.id !== me);
      this.searchResults.set(list);
      this.searchLoading.set(false);
    });
  }

  clearSearch(): void {
    this._searchCounter++;
    this.searchResults.set([]);
    this.searchLoading.set(false);
    this.startChatError.set(null);
  }

  selectSearchResult(r: UserSearchResult): void {
    const nameMap = new Map(this._userNames());
    nameMap.set(r.id, r.name);
    this._userNames.set(nameMap);

    const discoverable = this._discoverableContacts();
    if (!discoverable.some((c) => c.id === r.id)) {
      this._discoverableContacts.set([...discoverable, { id: r.id, name: r.name }]);
    }
    this.selectedContactId.set(r.id);
    this.clearSearch();
  }

  /** Legacy entry: paste a UUID and start a chat. Kept for callers/tests. */
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
    if (this._userNames().get(id)) {
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

  sendMessage(receiverId: string, body: string, subject = 'Chat') {
    const me = this.authStore.user();
    if (!me || !body.trim()) return;

    this.sending.set(true);
    this.sendError.set(null);
    const trimmedBody = body.trim();
    const optimistic: InboxMessage = {
      id: crypto.randomUUID(),
      senderId: me.id,
      receiverId,
      subject,
      body: trimmedBody,
      isRead: true,
      sentAt: new Date().toISOString(),
    };

    // Show the message immediately; we'll dedupe against the persisted copy
    // when /me/sent returns. We do this BEFORE the network call so the user
    // sees their message even if the gateway 503s — the DB write goes
    // through regardless.
    this._allMessages.update((list) => [...list, optimistic]);

    this.contactService
      .sendMessage({
        senderId: me.id,
        receiverId,
        subject,
        body: trimmedBody,
      })
      .subscribe({
        next: () => {
          this.sending.set(false);
        },
        error: () => {
          // The gateway's circuit breaker frequently returns 503 even when
          // the user-platform-service persisted the message. Confirm by
          // re-fetching /me/sent; if our message is there, treat as success.
          // If the re-fetch also fails, leave the optimistic message in place
          // and don't surface an error — a future loadInbox() will reconcile.
          this.contactService.getSent().pipe(catchError(() => of(null))).subscribe((sent) => {
            const list = Array.isArray(sent) ? sent : null;
            const persisted = list?.find(
              (m) =>
                m.senderId === me.id &&
                m.receiverId === receiverId &&
                m.body === trimmedBody,
            );
            if (persisted) {
              // Replace the optimistic copy with the persisted one (dedupe by id).
              this._allMessages.update((curr) => {
                const byId = new Map<string, InboxMessage>();
                for (const m of curr) {
                  if (m.id === optimistic.id) continue;
                  byId.set(m.id, m);
                }
                byId.set(persisted.id, persisted);
                return [...byId.values()];
              });
              this.sending.set(false);
              return;
            }
            if (list === null) {
              // Re-fetch failed too; keep the optimistic message visible and
              // don't show a misleading "Failed to send".
              this.sending.set(false);
              return;
            }
            // Re-fetch succeeded but our message isn't there — likely a real
            // failure. Roll back the optimistic copy and tell the user.
            this._allMessages.update((curr) => curr.filter((m) => m.id !== optimistic.id));
            this.sending.set(false);
            this.sendError.set('Failed to send. Try again.');
          });
        },
      });
  }
}
