import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

export type NotificationType =
  | 'lesson_complete'
  | 'quiz_result'
  | 'milestone'
  | 'class_invite'
  | 'announcement'
  | 'payment';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  linkUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationStore {
  private readonly http = inject(HttpClient);
  private readonly apiBase = inject(USER_PLATFORM_API_URL);

  notifications = signal<AppNotification[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  unread = computed(() => this.notifications().filter((n) => !n.read));
  unreadCount = computed(() => this.unread().length);

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<AppNotification[]>(`${this.apiBase}/notifications/me/unread`).subscribe({
      next: (data) => {
        this.notifications.set(Array.isArray(data) ? data : []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Failed to load notifications');
      },
    });
  }

  markRead(id: string) {
    this.notifications.update((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
    this.http.put(`${this.apiBase}/notifications/${id}/read`, {}).subscribe({
      error: () => {
        // Roll back on error
        this.notifications.update((list) =>
          list.map((n) => (n.id === id ? { ...n, read: false } : n)),
        );
      },
    });
  }

  markAllRead() {
    const previous = this.notifications();
    this.notifications.update((list) => list.map((n) => ({ ...n, read: true })));
    this.http.put(`${this.apiBase}/notifications/me/read-all`, {}).subscribe({
      error: () => this.notifications.set(previous),
    });
  }

  remove(id: string) {
    const previous = this.notifications();
    this.notifications.update((list) => list.filter((n) => n.id !== id));
    this.http.delete(`${this.apiBase}/notifications/${id}`).subscribe({
      error: () => this.notifications.set(previous),
    });
  }
}
