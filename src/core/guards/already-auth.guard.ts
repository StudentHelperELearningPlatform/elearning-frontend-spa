import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStore } from '../../features/auth/store/auth.store';
import { UserRole } from '../../shared/models/user.model';

const ROLE_REDIRECT: Record<UserRole, string> = {
  STUDENT: '/student',
  TEACHER: '/teacher',
  PARENT: '/parent',
  ADMIN: '/admin',
};

/**
 * Prevents authenticated users from hitting the login page again.
 * If already logged in, redirect to their role-appropriate dashboard.
 */
export const alreadyAuthGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()()) {
    return true; // not logged in — let them see the login page
  }

  const role = authService.currentUser()()?.role;
  const destination = role ? ROLE_REDIRECT[role] : '/';
  return router.createUrlTree([destination]);
};
