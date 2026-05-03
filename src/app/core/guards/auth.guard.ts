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

  // If Keycloak has already finished initializing, check immediately.
  if (authStore.isAuthReady()) {
    if (authStore.isAuthenticated()) {
      return true;
    }
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
  }

  // Keycloak is still initializing (e.g. app just loaded after a redirect).
  // Wait for isAuthReady to flip true before making a decision.
  return toObservable(authStore.isAuthReady).pipe(
    filter((ready) => ready),
    take(1),
    map(() => {
      if (authStore.isAuthenticated()) {
        return true;
      }
      return router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: state.url },
      });
    }),
  );
};
