// Placeholder dashboard components for each role.
// Replace these with real feature modules in Sprint 2+.
//
// Each is a standalone component that:
//  - reads the current user from AuthStore
//  - shows a welcome message with the user's name
//  - has a Logout button wired to AuthStore.logout()

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../auth/store/auth.store';

function makeDashboard(role: string, emoji: string) {
  @Component({
    standalone: true,
    imports: [CommonModule],
    template: `
      <div class="dash-shell">
        <div class="dash-card">
          <span class="dash-emoji">{{ emoji }}</span>
          <h1 class="dash-title">{{ role }} Dashboard</h1>
          <p class="dash-greeting">
            Welcome, <strong>{{ authStore.user()?.name }}</strong>! 👋
          </p>
          <p class="dash-note">
            This is a Sprint 1 placeholder. Real features are coming in Sprint 2.
          </p>
          <button class="btn-logout" (click)="authStore.logout()">Log out</button>
        </div>
      </div>
    `,
    styles: [`
      .dash-shell {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-background, #f8f7f4);
        font-family: var(--font-body, sans-serif);
      }
      .dash-card {
        text-align: center;
        max-width: 480px;
        padding: 3rem 2rem;
        background: var(--color-surface, #fff);
        border-radius: 16px;
        box-shadow: var(--shadow-md, 0 4px 24px rgba(0,0,0,0.08));
      }
      .dash-emoji { font-size: 3rem; display: block; margin-bottom: 0.75rem; }
      .dash-title {
        font-family: var(--font-heading, sans-serif);
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-text, #111827);
        margin: 0 0 0.5rem;
      }
      .dash-greeting {
        font-size: 1.1rem;
        color: var(--color-text, #111827);
        margin-bottom: 0.5rem;
      }
      .dash-note {
        color: var(--color-text-muted, #6b7280);
        font-size: 0.875rem;
        margin-bottom: 2rem;
      }
      .btn-logout {
        background: transparent;
        color: var(--color-primary, #2563eb);
        border: 1.5px solid var(--color-primary, #2563eb);
        border-radius: 8px;
        padding: 0.5rem 1.25rem;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.15s, color 0.15s;
        &:hover {
          background: var(--color-primary, #2563eb);
          color: #fff;
        }
      }
    `],
  })
  class DashboardComponent {
    protected readonly emoji = emoji;
    protected readonly role = role;
    protected authStore = inject(AuthStore);
  }
  return DashboardComponent;
}

export const StudentDashboardComponent = makeDashboard('Student', '🎓');
export const TeacherDashboardComponent = makeDashboard('Teacher', '🏫');
export const ParentDashboardComponent  = makeDashboard('Parent',  '👨‍👩‍👧');
export const AdminDashboardComponent   = makeDashboard('Admin',   '🛡️');
