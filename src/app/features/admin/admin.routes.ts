import { Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { PlatformSettingsComponent } from './platform-settings/platform-settings.component';

export default [
  { path: 'user-management', component: UserManagementComponent },
  { path: 'platform-settings', component: PlatformSettingsComponent },
  { path: '', redirectTo: 'user-management', pathMatch: 'full' }
] as Routes;
