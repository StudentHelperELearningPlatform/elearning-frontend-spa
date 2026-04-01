import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../../features/auth/store/auth.store';

export const roleGuard: CanActivateFn = (route) => {
  const authStore = inject(AuthStore) as InstanceType<typeof AuthStore>;
  const router = inject(Router);

  const requiredRoles: string[] = route.data['roles'] ?? [];

  if (requiredRoles.length === 0) {
    return true;
  }

  const userRoles = authStore.roles();
  const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));

  if (hasRequiredRole) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
