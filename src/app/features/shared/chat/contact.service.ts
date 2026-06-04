import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

export interface InboxMessage {
  id: string;
  senderId: string;
  subject: string;
  body: string;
  isRead: boolean;
  sentAt: string;
  /** Not from API — injected locally for optimistic sent messages */
  receiverId?: string;
}

export interface SendMessageRequest {
  senderId: string;
  receiverId: string;
  subject: string;
  body: string;
}

export interface UserProfile {
  id: string;
  /** Backend `UserResponse` shape */
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  profilePictureUrl?: string;
  /** Legacy field, kept for callers that still set it manually */
  name?: string;
  username?: string;
}

/** Build a display name from a backend `UserResponse`, with fallback. */
export function displayNameOf(p: { firstName?: string; lastName?: string; name?: string; email?: string; username?: string; id?: string }): string {
  const full = `${p.firstName ?? ''} ${p.lastName ?? ''}`.trim();
  if (full) return full;
  return p.name ?? p.username ?? p.email ?? (p.id ? `User …${p.id.slice(-6)}` : 'Unknown');
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly apiBase = inject(USER_PLATFORM_API_URL);

  getInbox() {
    return this.http.get<InboxMessage[]>(`${this.apiBase}/contact/me/inbox`);
  }

  getSent() {
    return this.http.get<InboxMessage[]>(`${this.apiBase}/contact/me/sent`);
  }

  sendMessage(payload: SendMessageRequest) {
    return this.http.post<string>(`${this.apiBase}/contact/send`, payload);
  }

  getUser(userId: string) {
    return this.http.get<UserProfile>(`${this.apiBase}/users/${userId}`);
  }
}
