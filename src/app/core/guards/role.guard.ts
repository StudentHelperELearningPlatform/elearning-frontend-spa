// src/app/core/guards/role.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { AuthStore } from '../../features/auth/store/auth.store';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const requiredRoles = route.data['roles'] as string[];

  // 1. If no roles are required, allow access immediately
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  // 2. If the user is authenticated and profile is ready
  if (authStore.isAuthenticated() && authStore.isFullyLoaded()) {
    const userRole = (authStore.role() || '').toUpperCase();
    
    // Check if user has any of the required roles (case-insensitive)
    const hasRequiredRole = requiredRoles.some(role => {
      const target = role.toUpperCase();
      if (target === 'STUDENT') return authStore.isStudent();
      if (target === 'TEACHER' || target === 'PROFESSOR') return authStore.isTeacher();
      if (target === 'ADMIN') return authStore.isAdmin();
      return userRole === target;
    });

    if (hasRequiredRole) {
      return true;
    }
  } else if (authStore.loading()) {
    return true;
  }

  // 3. Otherwise (unauthenticated or wrong role), redirect to /unauthorized
  return router.createUrlTree(['/unauthorized']);
};
