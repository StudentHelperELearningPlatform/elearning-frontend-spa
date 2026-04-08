import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent, CardComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-white p-4 font-sans text-black">
      <app-card class="w-full max-w-md p-8 md:p-10 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl">
        @if (!emailSent()) {
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-[var(--color-primary)]/10 rounded-full border-4 border-black mb-4">
              <span class="material-icons text-4xl text-[var(--color-primary)]">lock_reset</span>
            </div>
            <h2 class="text-4xl font-black text-black tracking-tighter uppercase italic">Forgot Password?</h2>
            <p class="text-gray-600 font-bold mt-2">No worries, we'll send you reset instructions.</p>
          </div>

          <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label for="email" class="block text-lg font-black text-black mb-2 uppercase tracking-tight">Email Address</label>
              <input 
                id="email" 
                type="email" 
                formControlName="email" 
                placeholder="Enter your email"
                class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[var(--color-primary)]/5 font-bold transition-all"
              >
              @if (forgotForm.get('email')?.touched && forgotForm.get('email')?.errors?.['email']) {
                <p class="text-red-500 text-xs font-bold mt-1 uppercase">Please enter a valid email</p>
              }
            </div>

            <app-button type="submit" [disabled]="forgotForm.invalid || loading()" variant="primary" class="w-full py-4 text-xl">
              @if (loading()) {
                <span class="animate-spin material-icons mr-2">sync</span> Processing...
              } @else {
                Send Reset Link <span class="material-icons ml-2">send</span>
              }
            </app-button>
          </form>
        } @else {
          <div class="text-center py-6">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full border-4 border-black mb-6">
              <span class="material-icons text-4xl text-green-600">mark_email_read</span>
            </div>
            <h2 class="text-4xl font-black text-black tracking-tighter uppercase italic mb-4">Check Your Email</h2>
            <p class="text-gray-600 font-bold mb-8">
              We've sent a password reset link to <br>
              <span class="text-black font-black">{{ forgotForm.get('email')?.value }}</span>
            </p>
            <app-button (click)="emailSent.set(false)" variant="secondary" class="w-full mb-4">
              Try another email
            </app-button>
          </div>
        }

        <div class="mt-8 pt-6 border-t-4 border-black/10 text-center">
          <a routerLink="/auth/login" class="inline-flex items-center text-black font-black uppercase tracking-widest text-sm hover:text-[var(--color-primary)] transition-colors">
            <span class="material-icons text-sm mr-2">arrow_back</span> Back to Login
          </a>
        </div>
      </app-card>
    </div>
  `
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);

  forgotForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  loading = signal(false);
  emailSent = signal(false);

  onSubmit() {
    if (this.forgotForm.valid) {
      this.loading.set(true);
      // Simulate API call
      setTimeout(() => {
        this.loading.set(false);
        this.emailSent.set(true);
        this.notificationService.info('Reset link sent to your email.');
      }, 1500);
    }
  }
}

