import { Routes } from '@angular/router';

export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./analytics-dashboard/analytics-dashboard.component').then(
        (m) => m.TeacherDashboardComponent,
      ),
  },
];
