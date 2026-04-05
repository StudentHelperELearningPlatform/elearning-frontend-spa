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

  // 2. If the user is authenticated and has a matching role, allow access
  if (authStore.isAuthenticated() && requiredRoles.includes(authStore.role() || '')) {
    return true;
  }

  // 3. Otherwise (unauthenticated or wrong role), redirect to /unauthorized
  return router.createUrlTree(['/unauthorized']);
};
