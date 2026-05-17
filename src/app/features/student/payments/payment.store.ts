import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { MANAGEMENT_API_URL } from '@core/tokens/api.token';
import {
  CheckoutRequest,
  CheckoutResponse,
  PaymentRecord,
} from './payment.types';

interface PaymentState {
  history: PaymentRecord[];
  checkoutLoading: boolean;
  historyLoading: boolean;
  error: string | null;
  lastSession: CheckoutResponse | null;
}

export const PaymentStore = signalStore(
  { providedIn: 'root' },
  withState<PaymentState>({
    history: [],
    checkoutLoading: false,
    historyLoading: false,
    error: null,
    lastSession: null,
  }),
  withComputed((state) => ({
    successfulPayments: computed(() => state.history().filter((p) => p.status === 'SUCCESS')),
    totalSpentCents: computed(() =>
      state
        .history()
        .filter((p) => p.status === 'SUCCESS')
        .reduce((sum, p) => sum + p.amount, 0),
    ),
    purchasedItemIds: computed(
      () =>
        new Set(
          state
            .history()
            .filter((p) => p.status === 'SUCCESS')
            .map((p) => p.itemId),
        ),
    ),
  })),
  withMethods((store, http = inject(HttpClient), apiBase = inject(MANAGEMENT_API_URL)) => ({
    loadHistory(studentId: string) {
      patchState(store, { historyLoading: true, error: null });
      http
        .get<PaymentRecord[]>(`${apiBase}/payments/history/${studentId}`)
        .subscribe({
          next: (history) => patchState(store, { history: history ?? [], historyLoading: false }),
          error: (err: unknown) => {
            const message = err instanceof Error ? err.message : 'Failed to load payment history';
            patchState(store, { historyLoading: false, error: message });
          },
        });
    },
    checkout(request: CheckoutRequest) {
      patchState(store, { checkoutLoading: true, error: null, lastSession: null });
      http.post<CheckoutResponse>(`${apiBase}/payments/checkout`, request).subscribe({
        next: (session) => {
          patchState(store, { checkoutLoading: false, lastSession: session });
          if (session?.checkoutUrl) {
            globalThis.location.href = session.checkoutUrl;
          }
        },
        error: (err: unknown) => {
          const message = err instanceof Error ? err.message : 'Failed to initiate checkout';
          patchState(store, { checkoutLoading: false, error: message });
        },
      });
    },
    hasPurchased(itemId: string): boolean {
      return store
        .history()
        .some((p) => p.itemId === itemId && p.status === 'SUCCESS');
    },
    clearSession() {
      patchState(store, { lastSession: null, error: null });
    },
  })),
);
