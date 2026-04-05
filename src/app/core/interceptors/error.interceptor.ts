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
      if ([401, 403].includes(error.status)) {
        authStore.logout();
        router.navigate(['/auth/login']);
      }

      const errorMessage = error.error?.message || error.statusText;
      notificationService.error(errorMessage);
      return throwError(() => error);
    }),
  );
};
