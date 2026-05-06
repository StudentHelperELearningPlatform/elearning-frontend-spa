import { ErrorHandler, Injectable, inject } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  private readonly notificationService = inject(NotificationService);

  handleError(error: Error): void {
    const message = error.message || 'An unexpected error occurred';
    this.notificationService.error(message);
    console.error('Global Error Handler:', error);
  }
}
