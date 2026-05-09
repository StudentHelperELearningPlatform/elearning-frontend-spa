// src/app/core/guards/role.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';
import { AuthStore } from '../../features/auth/store/auth.store';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const requiredRoles = route.data['roles'] as string[];

  // If no roles required, allow immediately
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  const checkRole = (): boolean => {
    if (!authStore.isAuthenticated() || !authStore.isFullyLoaded()) {
      return false;
    }

    const userRole = (authStore.role() || '').toUpperCase();

    return requiredRoles.some((role) => {
      const target = role.toUpperCase();
      if (target === 'STUDENT') return authStore.isStudent();
      if (target === 'TEACHER' || target === 'PROFESSOR') return authStore.isTeacher();
      if (target === 'ADMIN') return authStore.isAdmin();
      return userRole === target;
    });
  };

  // If already settled, decide immediately
  if (!authStore.loading()) {
    return checkRole() ? true : router.createUrlTree(['/unauthorized']);
  }

  // Still loading — wait for it to finish, then check role
  return toObservable(authStore.loading).pipe(
    filter((loading) => !loading),
    take(1),
    map(() => checkRole() ? true : router.createUrlTree(['/unauthorized'])),
  );
};