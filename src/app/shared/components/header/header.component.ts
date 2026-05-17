import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthStore } from '@features/auth/store/auth.store';
import { AvatarComponent } from '../avatar/avatar.component';
import { ButtonComponent } from '../button/button.component';
import { NotificationBellComponent } from '@features/shared/notifications/notification-bell.component';

@Component({
  selector: 'app-header',
  host: { style: 'display: block' },
  imports: [
    CommonModule,
    AvatarComponent,
    ButtonComponent,
    RouterModule,
    NotificationBellComponent,
  ],
  template: `
    <header
      class="bg-white border-b-4 border-black px-6 py-4 flex justify-between items-center sticky top-0 z-50"
    >
      <div class="flex items-center space-x-4 cursor-pointer" routerLink="/">
        <div
          class="w-12 h-12 bg-[#0ABAB5] rounded-2xl border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <span class="material-icons text-white text-2xl">school</span>
        </div>
        <h1 class="text-2xl font-black text-black hidden sm:block tracking-tight uppercase italic">
          E-Learning
        </h1>
      </div>

      @if (authStore.isAuthenticated()) {
        <div class="flex items-center space-x-4">
          <app-notification-bell />

          <div
            class="flex items-center space-x-4 cursor-pointer group outline-none focus:ring-4 focus:ring-[#0ABAB5] rounded-xl p-1"
            (click)="navigateToProfile()"
            (keydown.enter)="navigateToProfile()"
            (keydown.space)="navigateToProfile(); $event.preventDefault()"
            tabindex="0"
            aria-label="View Profile"
          >
            <div class="text-right hidden sm:block">
              <p
                class="text-base font-bold text-black group-hover:text-[#0ABAB5] transition-colors"
              >
                {{ authStore.user()?.name || 'User' }}
              </p>
              <p class="text-xs font-black text-gray-400 uppercase tracking-widest">
                {{ authStore.role() }}
              </p>
            </div>

            <app-avatar
              size="md"
              [initials]="getInitials(authStore.user()?.name)"
              class="group-hover:-translate-y-1 transition-transform shadow-none"
            />
          </div>

          <app-button variant="secondary" size="sm" icon="logout" (btnClick)="logout()">
            Logout
          </app-button>
        </div>
      }
    </header>
  `,
})
export class HeaderComponent {
  protected authStore = inject(AuthStore);
  private router = inject(Router);

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authStore.logout();
    this.router.navigate(['/auth/login']);
  }

  getInitials(name?: string): string {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.substring(0, 2).toUpperCase();
  }
}
