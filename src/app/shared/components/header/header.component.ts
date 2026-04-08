import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../../features/auth/store/auth.store';
import { Router } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  host: { style: 'display: block' },
  imports: [CommonModule, AvatarComponent],
  template: `
    <header class="bg-white border-b-4 border-black px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 bg-[var(--color-primary)] rounded-2xl border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span class="material-icons text-white text-2xl">school</span>
        </div>
        <h1 class="text-2xl font-black text-black hidden sm:block tracking-tight">E-Learning Tutor</h1>
      </div>
      
      @if (authStore.isAuthenticated()) {
        <div class="flex items-center space-x-6">
          <button class="relative w-12 h-12 rounded-2xl border-2 border-black flex items-center justify-center bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
            <span class="material-icons text-black">notifications</span>
            <span class="absolute -top-2 -right-2 w-4 h-4 bg-[var(--color-primary)] rounded-full border-2 border-black"></span>
          </button>
          
          <div class="flex items-center space-x-4 cursor-pointer group" (click)="logout()" tabindex="0" (keydown.enter)="logout()">
            <div class="text-right hidden sm:block">
              <p class="text-base font-bold text-black group-hover:text-[var(--color-primary)] transition-colors">User</p>
              <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">{{ authStore.role() }}</p>
            </div>
            <app-avatar size="md" initials="U" class="group-hover:-translate-y-1 transition-transform"></app-avatar>
          </div>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  authStore = inject(AuthStore);
  router = inject(Router);

  logout() {
    this.authStore.logout();
    this.router.navigate(['/auth/login']);
  }
}

