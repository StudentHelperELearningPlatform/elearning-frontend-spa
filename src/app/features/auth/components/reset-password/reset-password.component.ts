import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent, CardComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-white p-4 font-sans text-black">
      <app-card class="w-full max-w-md p-8 md:p-10 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-[var(--color-primary)]/10 rounded-full border-4 border-black mb-4">
            <span class="material-icons text-4xl text-[var(--color-primary)]">vpn_key</span>
          </div>
          <h2 class="text-4xl font-black text-black tracking-tighter uppercase italic">Reset Password</h2>
          <p class="text-gray-600 font-bold mt-2">Enter your new password below.</p>
        </div>

        <form [formGroup]="resetForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label for="password" class="block text-lg font-black text-black mb-2 uppercase tracking-tight">New Password</label>
            <input 
              id="password" 
              type="password" 
              formControlName="password" 
              placeholder="••••••••"
              class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[var(--color-primary)]/5 font-bold transition-all"
            >
            <div class="mt-2 flex gap-1 h-2">
              @for (i of [1,2,3,4]; track i) {
                <div class="flex-1 rounded-full border-2 border-black" [ngClass]="getPasswordStrengthClass(i)"></div>
              }
            </div>
            <p class="text-xs font-bold mt-1 text-gray-500 uppercase">Min 8 chars, 1 uppercase, 1 number</p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-lg font-black text-black mb-2 uppercase tracking-tight">Confirm Password</label>
            <input 
              id="confirmPassword" 
              type="password" 
              formControlName="confirmPassword" 
              placeholder="••••••••"
              class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[var(--color-primary)]/5 font-bold transition-all"
            >
            @if (resetForm.errors?.['passwordMismatch'] && resetForm.get('confirmPassword')?.touched) {
              <p class="text-red-500 text-xs font-bold mt-1 uppercase">Passwords do not match</p>
            }
          </div>

          <app-button type="submit" [disabled]="resetForm.invalid || loading()" variant="primary" class="w-full py-4 text-xl">
            @if (loading()) {
              <span class="animate-spin material-icons mr-2">sync</span> Resetting...
            } @else {
              Update Password <span class="material-icons ml-2">check_circle</span>
            }
          </app-button>
        </form>

        <div class="mt-8 pt-6 border-t-4 border-black/10 text-center">
          <a routerLink="/auth/login" class="inline-flex items-center text-black font-black uppercase tracking-widest text-sm hover:text-[var(--color-primary)] transition-colors">
            <span class="material-icons text-sm mr-2">arrow_back</span> Back to Login
          </a>
        </div>
      </app-card>
    </div>
  `
})
export class ResetPasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  resetForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  loading = signal(false);
  token = signal<string | null>(null);

  ngOnInit() {
    this.token.set(this.route.snapshot.queryParamMap.get('token'));
    if (!this.token()) {
      this.notificationService.error('Invalid or missing reset token.');
      this.router.navigate(['/auth/login']);
    }
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    
    if (!hasUpperCase || !hasNumber) {
      return { passwordStrength: true };
    }
    return null;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  getPasswordStrengthClass(index: number) {
    const password = this.resetForm.get('password')?.value || '';
    const length = password.length;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    let strength = 0;
    if (length >= 4) strength++;
    if (length >= 8) strength++;
    if (hasUpperCase) strength++;
    if (hasNumber) strength++;

    if (index <= strength) {
      if (strength <= 1) return 'bg-red-500';
      if (strength <= 2) return 'bg-yellow-500';
      if (strength <= 3) return 'bg-[var(--color-primary)]/60';
      return 'bg-[var(--color-primary)]';
    }
    return 'bg-gray-100';
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.loading.set(true);
      // Simulate API call
      setTimeout(() => {
        this.loading.set(false);
        this.notificationService.success('Password reset successful. You can now log in.');
        this.router.navigate(['/auth/login']);
      }, 1500);
    }
  }
}

