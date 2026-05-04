import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../store/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-white p-4 font-sans">
      <div
        class="w-full max-w-md bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10 flex flex-col items-center gap-8"
      >
        <div class="text-center">
          <h2 class="text-4xl font-black text-black uppercase italic tracking-tighter mb-2">
            Welcome Back
          </h2>
          <p class="text-gray-500 font-medium">Choose how you'd like to continue</p>
        </div>

        @if (authStore.error()) {
          <div
            class="w-full p-4 bg-red-100 border-2 border-red-500 text-red-700 rounded-xl font-bold text-sm uppercase"
          >
            {{ authStore.error() }}
          </div>
        }

        <div class="w-full flex flex-col gap-4">
          <button
            (click)="login()"
            [disabled]="authStore.loading()"
            class="w-full py-4 px-6 bg-[#0ABAB5] text-white font-black rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-lg"
          >
            {{ authStore.loading() ? 'Redirecting...' : 'Log In' }}
          </button>

          <a
            routerLink="/auth/register"
            class="block w-full py-4 px-6 bg-white text-black font-black rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-widest text-lg text-center"
          >
            Create Account
          </a>
        </div>

        <p class="text-xs text-gray-400 font-medium text-center">
          You'll be redirected to our secure sign-in page
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  authStore = inject(AuthStore);

  login() {
    this.authStore.login();
  }
}
