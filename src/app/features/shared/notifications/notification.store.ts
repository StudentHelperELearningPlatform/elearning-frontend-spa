import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { MANAGEMENT_API_URL } from '@core/tokens/api.token';
import { AppNotification } from './notification.types';

interface NotificationState {
  notifications: AppNotification[];
  loading: boolean;
  error: string | null;
}

export const NotificationStore = signalStore(
  { providedIn: 'root' },
  withState<NotificationState>({
    notifications: [],
    loading: false,
    error: null,
  }),
  withComputed((state) => ({
    unreadCount: computed(() => state.notifications().filter((n) => !n.read).length),
    sorted: computed(() =>
      [...state.notifications()].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    ),
    hasUnread: computed(() => state.notifications().some((n) => !n.read)),
  })),
  withMethods((store, http = inject(HttpClient), apiBase = inject(MANAGEMENT_API_URL)) => ({
    load() {
      patchState(store, { loading: true, error: null });
      http.get<AppNotification[]>(`${apiBase}/notifications/me/unread`).subscribe({
        next: (notifications) =>
          patchState(store, { notifications: notifications ?? [], loading: false }),
        error: (err: unknown) => {
          const message = err instanceof Error ? err.message : 'Failed to load notifications';
          patchState(store, { loading: false, error: message });
        },
      });
    },
    markRead(id: string) {
      patchState(store, (state) => ({
        notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      }));
      http.put(`${apiBase}/notifications/${id}/read`, {}).subscribe({
        error: () => {
          patchState(store, (state) => ({
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, read: false } : n,
            ),
          }));
        },
      });
    },
    markAllRead() {
      const previous = store.notifications();
      patchState(store, (state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      }));
      http.put(`${apiBase}/notifications/me/read-all`, {}).subscribe({
        error: () => patchState(store, { notifications: previous }),
      });
    },
    remove(id: string) {
      const previous = store.notifications();
      patchState(store, (state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
      http.delete(`${apiBase}/notifications/${id}`).subscribe({
        error: () => patchState(store, { notifications: previous }),
      });
    },
  })),
);
