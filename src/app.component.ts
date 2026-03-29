import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthStore } from './features/auth/store/auth.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected authStore = inject(AuthStore);
  private router = inject(Router);

  readonly currentYear = new Date().getFullYear();

  // Track navigation events so hideShell recomputes on route change
  private _navEnd = toSignal(
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)),
    { initialValue: null }
  );

  // Hide the shell chrome on auth pages and the unauthorized page
  protected hideShell = computed(() => {
    this._navEnd(); // subscribe so signal re-evaluates after each navigation
    const url = this.router.url;
    return url.startsWith('/auth') || url === '/unauthorized' || url === '/';
  });

  protected sidebarOpen = false;

  protected navItems = computed(() => {
    const role = this.authStore.user()?.role;
    switch (role) {
      case 'STUDENT':
        return [
          { label: 'Dashboard',  icon: 'pi-home',        route: '/student' },
          { label: 'My Lessons', icon: 'pi-book',        route: '/student/lessons' },
          { label: 'My Quizzes', icon: 'pi-pencil',      route: '/student/quizzes' },
          { label: 'Progress',   icon: 'pi-chart-line',  route: '/student/progress' },
        ];
      case 'TEACHER':
        return [
          { label: 'Dashboard',  icon: 'pi-home',        route: '/teacher' },
          { label: 'Lessons',    icon: 'pi-book',        route: '/teacher/lessons' },
          { label: 'Quizzes',    icon: 'pi-pencil',      route: '/teacher/quizzes' },
          { label: 'Classes',    icon: 'pi-users',       route: '/teacher/classes' },
          { label: 'Analytics',  icon: 'pi-chart-bar',   route: '/teacher/analytics' },
        ];
      case 'PARENT':
        return [
          { label: 'Dashboard',       icon: 'pi-home',       route: '/parent' },
          { label: 'Child Progress',  icon: 'pi-chart-line', route: '/parent/progress' },
          { label: 'Subscription',    icon: 'pi-credit-card',route: '/parent/subscription' },
        ];
      case 'ADMIN':
        return [
          { label: 'Users',      icon: 'pi-users',      route: '/admin' },
          { label: 'Settings',   icon: 'pi-cog',        route: '/admin/settings' },
          { label: 'Analytics',  icon: 'pi-chart-bar',  route: '/admin/analytics' },
        ];
      default:
        return [];
    }
  });

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }
}
