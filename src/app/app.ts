import { Component, signal, inject, effect } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthStore } from './features/auth/store/auth.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100dvh;
      }
    `,
  ],
})
export class App {
  title = signal('E-Learning Platform');
  private authStore = inject(AuthStore);
  private router = inject(Router);

  constructor() {
    effect(() => {
      const user = this.authStore.user();
      const isAuth = this.authStore.isAuthenticated();
      const currentUrl = this.router.url;

      if (isAuth && user && (currentUrl === '/' || currentUrl.startsWith('/auth'))) {
        const role = user.role.toLowerCase();
        if (role === 'student') {
          this.router.navigate(['/student/dashboard']);
        } else if (role === 'teacher' || role === 'professor') {
          this.router.navigate(['/teacher/dashboard']);
        } else if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        }
      }
    });
  }
}
