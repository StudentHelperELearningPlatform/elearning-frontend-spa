import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="unauth-shell">
      <div class="unauth-card">
        <span class="unauth-icon">🔒</span>
        <h1 class="unauth-title">Access Denied</h1>
        <p class="unauth-body">
          You don't have permission to view this page.
          @if (authStore.user()) {
            You are signed in as <strong>{{ authStore.user()!.role }}</strong>.
          }
        </p>
        <button class="btn-go-back" (click)="goBack()">← Go back</button>
      </div>
    </div>
  `,
  styles: [`
    .unauth-shell {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-background, #f8f7f4);
      font-family: var(--font-body, sans-serif);
    }
    .unauth-card {
      text-align: center;
      max-width: 400px;
      padding: 3rem 2rem;
    }
    .unauth-icon { font-size: 3.5rem; display: block; margin-bottom: 1rem; }
    .unauth-title {
      font-family: var(--font-heading, sans-serif);
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--color-text, #111827);
      margin: 0 0 0.75rem;
    }
    .unauth-body {
      color: var(--color-text-muted, #6b7280);
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .btn-go-back {
      background: var(--color-primary, #2563eb);
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 0.625rem 1.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s;
      &:hover { background: var(--color-primary-dark, #1d4ed8); }
    }
  `],
})
export class UnauthorizedComponent {
  protected authStore = inject(AuthStore);
  private router = inject(Router);

  goBack(): void {
    this.router.navigate(['/']);
  }
}
