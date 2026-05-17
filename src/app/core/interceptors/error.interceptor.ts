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

      // HttpClient surfaces 2xx responses with non-JSON / empty bodies as
      // errors (statusText "OK"). The network call succeeded — don't pop a
      // misleading "Error: OK" toast. Let the caller's catchError still see
      // the parse failure via the rethrow below.
      const isSuccessfulStatus = error.status >= 200 && error.status < 300;
      if (!isSuccessfulStatus) {
        let errorMessage = 'An unexpected error occurred';

        if (error.error) {
          if (typeof error.error === 'string') {
            if (!error.error.trim().startsWith('<!DOCTYPE')) {
              errorMessage = error.error;
            }
          } else if (typeof error.error === 'object') {
            errorMessage =
              error.error.message ||
              error.error.error ||
              error.error.detail ||
              error.error.title ||
              errorMessage;
          }
        }

        if (errorMessage === 'An unexpected error occurred') {
          if (error.statusText && error.statusText !== 'OK') {
            errorMessage = error.statusText;
          } else {
            const statusMap: Record<number, string> = {
              400: 'Bad Request',
              401: 'Unauthorized',
              403: 'Forbidden (Access Denied)',
              404: 'Not Found',
              405: 'Method Not Allowed',
              408: 'Request Timeout',
              409: 'Conflict',
              422: 'Unprocessable Entity',
              500: 'Internal Server Error',
              502: 'Bad Gateway',
              503: 'Service Unavailable',
              504: 'Gateway Timeout',
            };
            errorMessage = statusMap[error.status] || `Error: ${error.status}`;
          }
        }

        notificationService.error(errorMessage);
      }
      return throwError(() => error);
    }),
  );
};