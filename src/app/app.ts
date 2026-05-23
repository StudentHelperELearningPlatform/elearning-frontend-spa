import { Component, inject, effect } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
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

  // Track the current route path reliably via NavigationEnd events.
  // startWith('') ensures the signal has an initial value immediately.
  // We strip query params/fragments so that '/auth/login?state=...' is
  // treated the same as '/auth/login'.
  private currentPath = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects.split('?')[0].split('#')[0]),
      startWith(''),
    ),
    { initialValue: '' },
  );

  constructor() {
    // Single effect — only fires when BOTH authenticated AND fully loaded.
    // Redirects away from public/auth pages to the correct dashboard.
    effect(() => {
      const isAuth = this.authStore.isAuthenticated();
      const isReady = this.authStore.isFullyLoaded();
      const path = this.currentPath();

      if (!isAuth || !isReady) return;

      const isOnPublicPage =
        path === '/' ||
        path === '' ||
        path.startsWith('/auth') ||
        path.startsWith('/for-');

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