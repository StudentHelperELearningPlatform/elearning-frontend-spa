import { ErrorHandler, Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  private notificationService = inject(NotificationService);

  handleError(error: unknown): void {
    // Safely cast to an object to check for Angular's Promise rejection wrapper
    const errorObj = error as { rejection?: unknown; name?: string; message?: string };
    const unhandledError = errorObj?.rejection ? errorObj.rejection : error;

    // Skip HTTP errors because the error.interceptor already shows a toast for them
    const isHttpError =
      unhandledError instanceof HttpErrorResponse ||
      (unhandledError as { name?: string })?.name === 'HttpErrorResponse';

    if (isHttpError) {
      console.error('Unhandled HTTP Error:', unhandledError);
      return;
    }

    // Safely extract the message or fallback to default
    const message =
      (unhandledError as { message?: string })?.message || 'An unexpected error occurred';
    this.notificationService.error(message);
    console.error('Global Error Handler:', unhandledError);
  }
}
