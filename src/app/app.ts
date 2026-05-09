import { Component, inject, effect } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthStore } from './features/auth/store/auth.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [`
    :host {
      display: block;
      height: 100dvh;
    }
  `],
})
export class App {
  private authStore = inject(AuthStore);
  private router = inject(Router);

  constructor() {
    // Single effect — only fires when BOTH authenticated AND fully loaded.
    // Redirects away from public/auth pages to the correct dashboard.
    effect(() => {
      const isAuth = this.authStore.isAuthenticated();
      const isReady = this.authStore.isFullyLoaded();

      if (!isAuth || !isReady) return;

      const currentUrl = this.router.url;
      const isOnPublicPage =
        currentUrl === '/' ||
        currentUrl.startsWith('/auth') ||
        currentUrl.startsWith('/for-');

      if (isOnPublicPage) {
        this.performRedirect();
      }
    });
  }

  private performRedirect() {
    const user = this.authStore.user();
    if (!user) return;

    const role = user.role.toLowerCase();
    if (role === 'student') {
      this.router.navigate(['/student/dashboard']);
    } else if (role === 'teacher' || role === 'professor') {
      this.router.navigate(['/teacher/dashboard']);
    } else if (role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    }
  }
}