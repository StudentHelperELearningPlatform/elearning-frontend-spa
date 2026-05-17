import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { PlatformSettingsComponent } from './platform-settings/platform-settings.component';

export default [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'platform-settings', component: PlatformSettingsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
] as Routes;
