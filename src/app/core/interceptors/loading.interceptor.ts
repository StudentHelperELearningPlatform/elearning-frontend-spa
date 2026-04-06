import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // Placeholder for global loading state logic
  return next(req).pipe(
    finalize(() => {
      // Global loading counter decrement logic would go here
    }),
  );
};
