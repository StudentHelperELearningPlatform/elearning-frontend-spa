import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly messageService = inject(MessageService, { optional: true });

  success(message: string, title = 'Success') {
    this.messageService?.add({
      severity: 'success',
      summary: title,
      detail: message,
      life: 4000,
    });
  }

  error(message: string, title = 'Error') {
    this.messageService?.add({
      severity: 'error',
      summary: title,
      detail: message,
      life: 5000,
    });
  }

  info(message: string, title = 'Info') {
    this.messageService?.add({
      severity: 'info',
      summary: title,
      detail: message,
      life: 4000,
    });
  }

  warning(message: string, title = 'Warning') {
    this.messageService?.add({
      severity: 'warn',
      summary: title,
      detail: message,
      life: 4500,
    });
  }
}
