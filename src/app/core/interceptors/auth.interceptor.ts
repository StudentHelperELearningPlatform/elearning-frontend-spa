import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector);
  const authService = injector.get(AuthService);

  // Skip interceptor for public endpoints
  if (req.url.includes('/api/auth/') || req.url.includes('/api/v1/users')) {
    return next(req);
  }

  const token = authService.getAccessToken();

  if (token) {
    const user = authService.currentUser()();
    const role = user?.roles.find(r => ['STUDENT', 'PROFESSOR', 'ADMIN'].includes(r)) || 'STUDENT';
    
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'X-User-Id': user?.id || '',
        'X-User-Role': role
      },
    });
    return next(authReq);
  }

  return next(req);
};
