import { Component, ElementRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationStore } from './notification.store';
import { AppNotification, NotificationType } from './notification.types';

@Component({
  selector: 'app-notification-bell',
  imports: [CommonModule],
  host: {
    style: 'display: contents',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'onEscape()',
  },
  template: `
    <div class="relative">
      <button
        type="button"
        class="relative w-12 h-12 rounded-2xl border-2 border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/30"
        aria-label="Notifications"
        (click)="toggle($event)"
      >
        <span class="material-icons text-black text-2xl">notifications</span>
        @if (store.unreadCount() > 0) {
          <span
            class="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-black"
            aria-label="unread notifications"
          >
            {{ store.unreadCount() > 99 ? '99+' : store.unreadCount() }}
          </span>
        }
      </button>

      @if (open()) {
        <div
          class="absolute right-0 mt-3 w-96 max-w-[90vw] bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 overflow-hidden"
          role="dialog"
          aria-label="Notification list"
          (click)="$event.stopPropagation()"
          (keydown)="$event.stopPropagation()"
        >
          <div class="p-4 border-b-4 border-black flex items-center justify-between bg-gray-50">
            <h3 class="font-black text-lg">Notifications</h3>
            @if (store.hasUnread()) {
              <button
                type="button"
                class="text-xs font-black uppercase tracking-wider text-[#0ABAB5] hover:underline"
                (click)="markAllRead()"
              >
                Mark all as read
              </button>
            }
          </div>

          <div class="max-h-96 overflow-y-auto">
            @if (store.loading()) {
              <div class="p-6 text-center text-gray-500 font-bold">Loading…</div>
            } @else if (store.sorted().length === 0) {
              <div class="p-8 text-center">
                <span class="material-icons text-4xl text-gray-300">notifications_off</span>
                <p class="mt-2 text-gray-500 font-bold">No notifications yet</p>
              </div>
            } @else {
              @for (n of store.sorted(); track n.id) {
                <div
                  class="p-4 border-b-2 border-gray-100 hover:bg-gray-50 transition-colors flex gap-3 group cursor-pointer"
                  [class.bg-[#0ABAB5]/5]="!n.read"
                  (click)="openNotification(n)"
                  (keydown.enter)="openNotification(n)"
                  tabindex="0"
                >
                  <div
                    class="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0"
                    [class.bg-[#0ABAB5]/20]="!n.read"
                    [class.bg-gray-100]="n.read"
                  >
                    <span class="material-icons text-lg">{{ iconFor(n.type) }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-black text-sm text-black truncate">{{ n.title }}</p>
                    <p class="text-sm text-gray-600 line-clamp-2">{{ n.message }}</p>
                    <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                      {{ n.createdAt | date: 'short' }}
                    </p>
                  </div>
                  <button
                    type="button"
                    class="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-all"
                    aria-label="Delete notification"
                    (click)="remove($event, n.id)"
                  >
                    <span class="material-icons text-sm">close</span>
                  </button>
                </div>
              }
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class NotificationBellComponent implements OnInit {
  store = inject(NotificationStore);
  private router = inject(Router);
  private hostRef = inject(ElementRef<HTMLElement>);

  open = signal(false);

  ngOnInit() {
    this.store.load();
  }

  toggle(event: Event) {
    event.stopPropagation();
    this.open.update((v) => !v);
  }

  markAllRead() {
    this.store.markAllRead();
  }

  openNotification(n: AppNotification) {
    if (!n.read) this.store.markRead(n.id);
    if (n.linkUrl) {
      this.router.navigateByUrl(n.linkUrl);
      this.open.set(false);
    }
  }

  remove(event: Event, id: string) {
    event.stopPropagation();
    this.store.remove(id);
  }

  iconFor(type: NotificationType): string {
    switch (type) {
      case 'lesson_complete':
        return 'menu_book';
      case 'quiz_result':
        return 'quiz';
      case 'milestone':
        return 'emoji_events';
      case 'class_invite':
        return 'groups';
      case 'announcement':
        return 'campaign';
      case 'payment':
        return 'payments';
      default:
        return 'notifications';
    }
  }

  onDocumentClick(event: MouseEvent) {
    if (!this.open()) return;
    if (!this.hostRef.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  onEscape() {
    this.open.set(false);
  }
}
