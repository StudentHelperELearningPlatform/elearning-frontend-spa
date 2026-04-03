import { Component, inject } from '@angular/core';
import { AuthStore } from '../../auth/store/auth.store';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard-placeholder">
      <div class="role-badge">Teacher</div>
      <h1>Welcome, {{ authStore.user()?.name }}!</h1>
      <p class="role-info">Teacher Dashboard</p>
      <p class="coming-soon">Feature development begins in Sprint 2. 🚀</p>
      <button class="logout-btn" (click)="authStore.logout()">Sign out</button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100dvh;
      }
      .dashboard-placeholder {
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        text-align: center;
        padding: 2rem;
        background: #f9fafb;
      }
      .role-badge {
        background: var(--color-primary, #4f46e5);
        color: white;
        padding: 0.25rem 1rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
      h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #111827;
        margin: 0;
      }
      .role-info {
        font-size: 1rem;
        color: #6b7280;
        margin: 0;
      }
      .coming-soon {
        font-size: 0.875rem;
        color: #9ca3af;
        margin: 0;
      }
      .logout-btn {
        margin-top: 1rem;
        padding: 0.625rem 1.5rem;
        background: #ef4444;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 0.9375rem;
        font-weight: 500;
        cursor: pointer;
      }
    `,
  ],
})
export class TeacherDashboardComponent {
  protected authStore = inject(AuthStore) as InstanceType<typeof AuthStore>;
}
