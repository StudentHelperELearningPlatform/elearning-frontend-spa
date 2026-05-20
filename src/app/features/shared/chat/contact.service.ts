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
  name?: string;
  email?: string;
  username?: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly apiBase = inject(USER_PLATFORM_API_URL);

  getInbox() {
    return this.http.get<InboxMessage[]>(`${this.apiBase}/contact/me/inbox`);
  }

  sendMessage(payload: SendMessageRequest) {
    return this.http.post<string>(`${this.apiBase}/contact/send`, payload);
  }

  getUser(userId: string) {
    return this.http.get<UserProfile>(`${this.apiBase}/users/${userId}`);
  }
}
