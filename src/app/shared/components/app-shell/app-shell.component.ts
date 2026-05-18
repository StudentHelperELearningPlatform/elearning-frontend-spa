import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthStore } from '../../../features/auth/store/auth.store';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, ToastModule],
  template: `
    <div class="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <p-toast position="top-right" />
      <app-header class="shrink-0" />
      <div class="flex flex-1 overflow-hidden">
        @if (!authStore.isAdmin()) {
          <app-sidebar class="h-full shrink-0" />
        }
        <main class="flex-1 overflow-y-auto p-6">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class AppShellComponent {
  authStore = inject(AuthStore);
}
