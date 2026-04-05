// src/app/core/guards/role.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { AuthStore } from '../../features/auth/store/auth.store';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const requiredRoles = route.data['roles'] as string[];

  if (!authStore.isAuthenticated()) {
    return router.parseUrl('/auth/login');
  }

  if (requiredRoles && requiredRoles.includes(authStore.role() || '')) {
    return true;
  }

  // Redirect to appropriate dashboard if role doesn't match
  const role = authStore.role();
  if (role === 'STUDENT') return router.parseUrl('/student/dashboard');
  if (role === 'TEACHER') return router.parseUrl('/teacher/dashboard');
  if (role === 'ADMIN') return router.parseUrl('/admin/dashboard');

  return router.parseUrl('/auth/login');
};
