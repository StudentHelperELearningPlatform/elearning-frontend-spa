import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { alreadyAuthGuard } from './core/guards/already-auth.guard';

export const appRoutes: Routes = [
  // Default redirect
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  // ── Auth feature (no guards) ────────────────────────────────────────────────
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        canActivate: [alreadyAuthGuard],
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  // ── Unauthorized ─────────────────────────────────────────────────────────────
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/auth/unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent
      ),
  },

  // ── Student area ──────────────────────────────────────────────────────────────
  {
    path: 'student',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['STUDENT', 'ADMIN'] },
    loadComponent: () =>
      import('./features/dashboards/dashboard-placeholders').then(
        (m) => m.StudentDashboardComponent
      ),
  },

  // ── Teacher area ──────────────────────────────────────────────────────────────
  {
    path: 'teacher',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['TEACHER', 'ADMIN'] },
    loadComponent: () =>
      import('./features/dashboards/dashboard-placeholders').then(
        (m) => m.TeacherDashboardComponent
      ),
  },

  // ── Parent area ───────────────────────────────────────────────────────────────
  {
    path: 'parent',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['PARENT', 'ADMIN'] },
    loadComponent: () =>
      import('./features/dashboards/dashboard-placeholders').then(
        (m) => m.ParentDashboardComponent
      ),
  },

  // ── Admin area ────────────────────────────────────────────────────────────────
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () =>
      import('./features/dashboards/dashboard-placeholders').then(
        (m) => m.AdminDashboardComponent
      ),
  },

  // ── Catch-all ─────────────────────────────────────────────────────────────────
  { path: '**', redirectTo: '/auth/login' },
];
