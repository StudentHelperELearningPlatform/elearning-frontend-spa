import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  // Ensure the class name matches your imports exactly
  success(message: string) {
    console.log('Success:', message);
  }
  error(message: string) {
    console.error('Error:', message);
  }
  info(message: string) {
    console.info('Info:', message);
  }
  warning(message: string) {
    console.warn('Warning:', message);
  }
}
