import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthStore } from '../../store/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-white p-4 font-sans">
      <div
        class="w-full max-w-md bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8"
      >
        <h2
          class="text-4xl font-black text-black mb-8 text-center uppercase italic tracking-tighter"
        >
          Welcome Back
        </h2>

        @if (authStore.error()) {
          <div
            class="mb-6 p-4 bg-red-100 border-2 border-red-500 text-red-700 rounded-xl font-bold text-sm uppercase"
          >
            {{ authStore.error() }}
          </div>
        }

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label
              for="email"
              class="block text-lg font-black text-black mb-2 uppercase tracking-tight"
              >Email Address</label
            >
            <input
              id="email"
              type="email"
              formControlName="email"
              placeholder="john@example.com"
              class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[var(--color-primary)]/5 font-bold transition-all"
            />
          </div>
          <div>
            <label
              for="password"
              class="block text-lg font-black text-black mb-2 uppercase tracking-tight"
              >Password</label
            >
            <div class="relative">
              <input
                id="password"
                [type]="showPassword ? 'text' : 'password'"
                formControlName="password"
                placeholder="••••••••"
                class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[var(--color-primary)]/5 font-bold transition-all"
              />
              <button
                type="button"
                (click)="togglePassword()"
                class="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-sm uppercase text-gray-500 hover:text-black"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <div class="flex gap-2 justify-between pt-2">
            <button
              type="button"
              class="btn-dev text-xs font-bold uppercase text-gray-500 hover:text-black"
              (click)="fillMockUser('student@test.com')"
            >
              Fill Student
            </button>
            <button
              type="button"
              class="btn-dev text-xs font-bold uppercase text-gray-500 hover:text-black"
              (click)="fillMockUser('teacher@test.com')"
            >
              Fill Teacher
            </button>
            <button
              type="button"
              class="btn-dev text-xs font-bold uppercase text-gray-500 hover:text-black"
              (click)="fillMockUser('admin@test.com')"
            >
              Fill Admin
            </button>
          </div>

          <div class="flex items-center justify-between pt-2">
            <a
              routerLink="/auth/forgot-password"
              class="text-sm font-bold text-gray-500 hover:text-black transition-colors"
              >Forgot Password?</a
            >
          </div>

          <button
            type="submit"
            [disabled]="loginForm.invalid || authStore.loading()"
            class="w-full py-4 px-6 bg-[var(--color-primary)] text-white font-black rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-lg"
          >
            {{ authStore.loading() ? 'Authenticating...' : 'Log In' }}
          </button>
        </form>

        <div class="mt-10 pt-8 border-t-4 border-black/10 text-center">
          <a
            routerLink="/auth/register"
            class="text-black font-black uppercase tracking-widest text-sm hover:text-[var(--color-primary)] transition-colors"
            >Create New Account</a
          >
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  authStore = inject(AuthStore);

  // Added missing state
  showPassword = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['STUDENT'], // Removed Validators.required to allow mock user testing without breaking validity
  });

  // Added getters that the test relies on
  get emailControl() {
    return this.loginForm.get('email');
  }
  get passwordControl() {
    return this.loginForm.get('password');
  }

  constructor() {
    effect(() => {
      const role = this.authStore.role();
      const isAuthenticated = this.authStore.isAuthenticated();

      if (isAuthenticated && role) {
        switch (role) {
          case 'STUDENT':
            this.router.navigate(['/student/dashboard']);
            break;
          case 'TEACHER':
            this.router.navigate(['/teacher/dashboard']);
            break;
          case 'ADMIN':
            this.router.navigate(['/admin/user-management']);
            break;
        }
      }
    });
  }

  // Added missing methods from the test block
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  fillMockUser(email: string) {
    this.loginForm.patchValue({
      email,
      password: 'password',
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // Just pass the object directly!
      this.authStore.login({ email: email!, password: password! });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

