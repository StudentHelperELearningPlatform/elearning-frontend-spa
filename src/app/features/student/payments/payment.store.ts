import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

export type PaymentStatus = 'SUCCESS' | 'PENDING' | 'FAILED' | 'REFUNDED';

export interface PaymentRecord {
  id: string;
  itemType: string;
  itemId: string;
  itemTitle: string;
  amount: number;
  currency: string;
  status: PaymentStatus | string;
  createdAt: string;
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

// ─── Forma brută returnată de backend ────────────────────────────────────────
interface PaymentApiRecord {
  purchaseId: string;
  studentId: string;
  itemType: string;
  itemId: string;
  purchasedAt: string;
  amountPaid: number;
  status?: string;   // backend-ul trimite status (SUCCESS / PENDING / etc.)
  currency?: string;
}

function mapPaymentRecord(r: PaymentApiRecord): PaymentRecord {
  return {
    id:        r.purchaseId,
    itemType:  r.itemType,
    itemId:    r.itemId,
    itemTitle: '',
    amount:    r.amountPaid,
    currency:  r.currency ?? 'RON',
    status:    r.status   ?? 'SUCCESS',  // fallback doar dacă lipsește complet
    createdAt: r.purchasedAt,
  };
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
    this.history()
      .filter((p) => p.status === 'SUCCESS')
      .reduce((sum, p) => sum + p.amount, 0),
  );

  loadHistory() {
    this.historyLoading.set(true);
    this.historyError.set(null);
    this.http
      .get<PaymentApiRecord[]>(`${this.apiBase}/payments/history`)
      .subscribe({
        next: (data) => {
          this.history.set(Array.isArray(data) ? data.map(mapPaymentRecord) : []);
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
    return this.history().some(
      (p) => p.itemId === itemId && p.status === 'SUCCESS',
    );
  }
}