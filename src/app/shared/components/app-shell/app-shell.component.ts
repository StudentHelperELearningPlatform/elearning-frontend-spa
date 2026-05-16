import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <app-header class="shrink-0" />
      <div class="flex flex-1 overflow-hidden">
        <app-sidebar class="h-full shrink-0" />
        <main class="flex-1 overflow-y-auto p-6">
          <router-outlet />
        </main>
      </div>
    </div>
  `
})
export class AppShellComponent {}