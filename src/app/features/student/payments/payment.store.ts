import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

export interface PaymentRecord {
  purchaseId: string;
  studentId: string;
  itemType: string;
  itemId: string;
  purchasedAt: string;
  amountPaid: number;
}

export interface CheckoutSession {
  transactionId: string;
  status: string;
  checkoutUrl: string;
  errorMessage?: string;
}

interface CheckoutParams {
  studentId: string;
  itemType: string;
  itemId: string;
  bundleId?: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentStore {
  private readonly http = inject(HttpClient);
  private readonly apiBase = inject(USER_PLATFORM_API_URL);

  history = signal<PaymentRecord[]>([]);
  historyLoading = signal(false);
  historyError = signal<string | null>(null);

  checkoutLoading = signal(false);
  checkoutError = signal<string | null>(null);

  totalSpent = computed(() =>
    this.history().reduce((sum, p) => sum + p.amountPaid, 0),
  );

  loadHistory() {
    this.historyLoading.set(true);
    this.historyError.set(null);
    this.http
      .get<PaymentRecord[]>(`${this.apiBase}/payments/history`)
      .subscribe({
        next: (data) => {
          this.history.set(Array.isArray(data) ? data : []);
          this.historyLoading.set(false);
        },
        error: () => {
          this.historyLoading.set(false);
          this.historyError.set('Failed to load payment history');
        },
      });
  }

  checkout(params: CheckoutParams): Promise<CheckoutSession | null> {
    this.checkoutLoading.set(true);
    this.checkoutError.set(null);

    let httpParams = new HttpParams()
      .set('studentId', params.studentId)
      .set('itemType', params.itemType)
      .set('itemId', params.itemId);
    if (params.bundleId) {
      httpParams = httpParams.set('bundleId', params.bundleId);
    }

    return new Promise((resolve) => {
      this.http
        .post<CheckoutSession>(`${this.apiBase}/payments/checkout`, null, {
          params: httpParams,
        })
        .subscribe({
          next: (session) => {
            this.checkoutLoading.set(false);
            resolve(session);
          },
          error: () => {
            this.checkoutLoading.set(false);
            this.checkoutError.set('Failed to start checkout');
            resolve(null);
          },
        });
    });
  }

  hasPurchased(itemId: string): boolean {
    return this.history().some((p) => p.itemId === itemId);
  }
}
