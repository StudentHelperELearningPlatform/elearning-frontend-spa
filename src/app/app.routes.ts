import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // Default redirect
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },

  // Auth feature (public)
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  // Student area (protected, role-restricted)
  {
    path: 'student',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['STUDENT'] },
    loadChildren: () => import('./features/student/student.routes').then((m) => m.STUDENT_ROUTES),
  },

  // Teacher area (protected, role-restricted)
  {
    path: 'teacher',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['TEACHER'] },
    loadChildren: () => import('./features/teacher/teacher.routes').then((m) => m.TEACHER_ROUTES),
  },

  // Admin area (protected, role-restricted)
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },

  // Unauthorized page
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./shared/components/unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent,
      ),
  },

  // 404 — catch-all
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];
