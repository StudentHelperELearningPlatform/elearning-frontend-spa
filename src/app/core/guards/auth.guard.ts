// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import {
  Router,
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';
import { AuthStore } from '../../features/auth/store/auth.store';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  // If already settled (not loading), decide immediately
  if (!authStore.loading()) {
    if (authStore.isAuthenticated() && authStore.isFullyLoaded()) {
      return true;
    }
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
  }

  // Still loading — wait for loading to finish, then decide
  return toObservable(authStore.loading).pipe(
    filter((loading) => !loading),   // wait until loading becomes false
    take(1),                          // only need one emission
    map(() => {
      if (authStore.isAuthenticated() && authStore.isFullyLoaded()) {
        return true;
      }
      return router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: state.url },
      });
    }),
  );
};