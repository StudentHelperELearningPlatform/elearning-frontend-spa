import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../features/auth/store/auth.store';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authStore = inject(AuthStore);
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Genuine auth failure — token missing or expired
        authStore.logout();
        router.navigate(['/auth/login']);
      }
      // NOTE: 403 is intentionally NOT redirected to /unauthorized here.
      // A 403 means "authenticated but not permitted for this specific resource",
      // which is often a bad request (e.g. wrong classId) rather than a session
      // problem. Let individual components/stores handle 403s gracefully instead
      // of blowing up the entire session with a redirect.

      const errorMessage = error.error?.message || error.statusText;
      notificationService.error(errorMessage);
      return throwError(() => error);
    }),
  );
};