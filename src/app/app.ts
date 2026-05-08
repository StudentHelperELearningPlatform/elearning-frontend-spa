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
    const router = inject(Router);
    
    // 1. Initial redirect for users on landing pages
    effect(() => {
      const isAuth = this.authStore.isAuthenticated();
      const isReady = this.authStore.isFullyLoaded();
      const currentUrl = router.url;

      if (isAuth && isReady && (currentUrl === '/' || currentUrl.startsWith('/auth'))) {
        this.performRedirect(router);
      }
    });

    // 2. Watch for future navigation to landing pages
    router.events.subscribe(() => {
      const isAuth = this.authStore.isAuthenticated();
      const isReady = this.authStore.isFullyLoaded();
      const currentUrl = router.url;

      if (isAuth && isReady && (currentUrl === '/' || currentUrl.startsWith('/auth') || currentUrl.startsWith('/for-'))) {
        this.performRedirect(router);
      }
    });
  }

  private performRedirect(router: Router) {
    const user = this.authStore.user();
    if (!user) return;
    
    const role = user.role.toLowerCase();
    if (role === 'student') {
      router.navigate(['/student/dashboard']);
    } else if (role === 'teacher' || role === 'professor') {
      router.navigate(['/teacher/dashboard']);
    } else if (role === 'admin') {
      router.navigate(['/admin/dashboard']);
    }
  }
}
