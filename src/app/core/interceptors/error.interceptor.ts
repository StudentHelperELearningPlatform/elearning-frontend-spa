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
        // Only logout if it's a genuine auth failure, not a transient error
        authStore.logout();
        router.navigate(['/auth/login']);
      } else if (error.status === 403) {
        // Access Denied - don't logout, just inform the user or redirect to unauthorized
        router.navigate(['/unauthorized']);
      }

      const errorMessage = error.error?.message || error.statusText;
      notificationService.error(errorMessage);
      return throwError(() => error);
    }),
  );
};
