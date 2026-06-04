import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from '@features/auth/store/auth.store';
import { AppNotification, NotificationStore } from './notification.store';

@Component({
  selector: 'app-notification-bell',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative inline-block' },
  template: `
    <button
      type="button"
      class="relative inline-flex items-center justify-center w-11 h-11 rounded-2xl border-2 border-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]"
      (click)="toggle()"
      [attr.aria-expanded]="open()"
      aria-haspopup="true"
      aria-label="Notifications"
    >
      <span class="material-icons text-2xl text-black" aria-hidden="true">notifications</span>
      @if (unreadCount() > 0) {
        <span
          class="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1 rounded-full bg-red-600 text-white text-xs font-black flex items-center justify-center border-2 border-white"
          aria-live="polite"
        >
          {{ displayCount() }}
        </span>
      }
    </button>

    @if (open()) {
      <div
        class="absolute right-0 mt-3 w-80 max-h-96 overflow-hidden bg-white rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-50 flex flex-col"
        role="dialog"
        aria-label="Notifications panel"
      >
        <div class="flex items-center justify-between px-4 py-3 border-b-2 border-black bg-[#0ABAB5]/10">
          <h2 class="text-base font-black">Notifications</h2>
          @if (store.unreadCount() > 0) {
            <button
              type="button"
              class="text-xs font-bold text-[#0ABAB5] hover:underline"
              (click)="markAll()"
            >
              Mark all read
            </button>
          }
        </div>

        <div class="flex-1 overflow-y-auto">
          @if (store.loading()) {
            <div class="p-4 text-sm text-gray-500 font-medium">Loading…</div>
          } @else if (store.error()) {
            <div class="p-4 text-sm text-red-600 font-medium" role="alert">
              {{ store.error() }}
            </div>
          } @else if (store.notifications().length === 0) {
            <div class="p-6 text-center text-sm text-gray-500 font-medium">
              You're all caught up.
            </div>
          } @else {
            <ul class="divide-y-2 divide-black/10">
              @for (n of store.notifications(); track n.id) {
                <li
                  class="p-3 hover:bg-gray-50"
                  [class.bg-[#0ABAB5]/5]="!n.read"
                >
                  <div class="flex gap-3">
                    <span class="material-icons text-[#0ABAB5] mt-0.5" aria-hidden="true">
                      {{ iconFor(n.type) }}
                    </span>
                    <div class="flex-1 min-w-0">
                      <p class="font-bold text-sm truncate">{{ n.title }}</p>
                      <p class="text-xs text-gray-600 mt-0.5 line-clamp-2">{{ n.message }}</p>
                      <p class="text-xs text-gray-400 mt-1 font-medium">
                        {{ n.createdAt | date: 'short' }}
                      </p>
                    </div>
                    <button
                      type="button"
                      class="text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-[#0ABAB5] rounded"
                      (click)="dismiss(n)"
                      [attr.aria-label]="'Dismiss ' + n.title"
                    >
                      <span class="material-icons text-base" aria-hidden="true">close</span>
                    </button>
                  </div>
                </li>
              }
            </ul>
          }
        </div>
      </div>
    }
  `,
})
export class NotificationBellComponent {
  protected readonly store = inject(NotificationStore);
  private readonly authStore = inject(AuthStore);

  protected readonly open = signal(false);
  protected readonly unreadCount = computed(() => this.store.unreadCount());
  protected readonly displayCount = computed(() => {
    const c = this.unreadCount();
    return c > 9 ? '9+' : String(c);
  });

  toggle() {
    const next = !this.open();
    this.open.set(next);
    if (next && this.authStore.isAuthenticated()) {
      this.store.load();
    }
  }

  markAll() {
    this.store.markAllRead();
  }

  openNotification(n: AppNotification) {
    if (!n.read) {
      this.store.markRead(n.id);
    }
  }

  iconFor(type: AppNotification['type']): string {
    switch (type) {
      case 'PROGRESS':
        return 'menu_book';
      case 'ACHIEVEMENT':
        return 'emoji_events';
      case 'CLASS':
        return 'group_add';
      case 'PAYMENT':
        return 'payments';
      case 'SYSTEM':
      default:
        return 'campaign';
    }
  }
}
