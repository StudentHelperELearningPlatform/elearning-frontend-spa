import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./progress-dashboard/progress-dashboard.component').then(
        (m) => m.StudentDashboardComponent,
      ),
  },
];
