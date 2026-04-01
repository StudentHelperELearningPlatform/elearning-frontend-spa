import { Routes } from '@angular/router';

export const PARENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.ParentDashboardComponent),
  },
];
