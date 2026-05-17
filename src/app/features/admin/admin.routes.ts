import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { PlatformSettingsComponent } from './platform-settings/platform-settings.component';

export default [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'platform-settings', component: PlatformSettingsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
] as Routes;
