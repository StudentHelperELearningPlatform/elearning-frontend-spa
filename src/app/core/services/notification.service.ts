import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly messageService = inject(MessageService);

  success(message: string, summary = 'Success') {
    this.messageService.add({ severity: 'success', summary, detail: message, life: 3000 });
  }

  error(message: string, summary = 'Error') {
    this.messageService.add({ severity: 'error', summary, detail: message, life: 4000 });
  }

  info(message: string, summary = 'Info') {
    this.messageService.add({ severity: 'info', summary, detail: message, life: 3000 });
  }

  warning(message: string, summary = 'Warning') {
    this.messageService.add({ severity: 'warn', summary, detail: message, life: 3500 });
  }
}
