import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../../shared/models/user.model';

/**
 * Usage in routes:
 *   {
 *     path: 'teacher',
 *     canActivate: [authGuard, roleGuard],
 *     data: { roles: ['TEACHER', 'ADMIN'] },
 *     ...
 *   }
 */
export const roleGuard: CanActivateFn = (route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles: UserRole[] = route.data?.['roles'] ?? [];
  const currentUser = authService.currentUser()();

  if (!currentUser) {
    return router.createUrlTree(['/auth/login']);
  }

  if (allowedRoles.length === 0 || allowedRoles.includes(currentUser.role)) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
