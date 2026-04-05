import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // Landing pages (public)
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'for-students',
    loadComponent: () => import('./features/landing/student-landing/student-landing.component').then(m => m.StudentLandingComponent)
  },
  {
    path: 'for-teachers',
    loadComponent: () => import('./features/landing/teacher-landing/teacher-landing.component').then(m => m.TeacherLandingComponent)
  },
  {
    path: 'for-parents',
    loadComponent: () => import('./features/landing/parent-landing/parent-landing.component').then(m => m.ParentLandingComponent)
  },

  // Auth feature (public) — uses default export
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes'),
  },

  // Student area (protected, role-restricted)
  {
    path: 'student',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['STUDENT'] },
    loadComponent: () => import('./shared/components/app-shell/app-shell.component').then(m => m.AppShellComponent),
    loadChildren: () => import('./features/student/student.routes'),
  },

  // Teacher area (protected, role-restricted)
  {
    path: 'teacher',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['TEACHER'] },
    loadComponent: () => import('./shared/components/app-shell/app-shell.component').then(m => m.AppShellComponent),
    loadChildren: () => import('./features/teacher/teacher.routes'),
  },

  // Admin area (protected, role-restricted)
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () => import('./shared/components/app-shell/app-shell.component').then(m => m.AppShellComponent),
    loadChildren: () => import('./features/admin/admin.routes'),
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
  { path: '**', redirectTo: '' },
];
