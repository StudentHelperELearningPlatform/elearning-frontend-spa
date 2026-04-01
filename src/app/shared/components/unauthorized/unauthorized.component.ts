import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="unauthorized-page">
      <div class="icon" aria-hidden="true">🔒</div>
      <h1>Access Denied</h1>
      <p>You don't have permission to view this page.</p>
      <a routerLink="/" class="home-link">Go to Home</a>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .unauthorized-page {
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
    .icon { font-size: 4rem; }
    h1 { font-size: 2rem; font-weight: 700; color: #111827; margin: 0; }
    p { font-size: 1rem; color: #6b7280; margin: 0; }
    .home-link {
      margin-top: 0.5rem;
      padding: 0.625rem 1.5rem;
      background: var(--color-primary, #4f46e5);
      color: white;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9375rem;
      transition: background 0.15s;
      &:hover { background: #4338ca; }
    }
  `]
})
export class UnauthorizedComponent {}
