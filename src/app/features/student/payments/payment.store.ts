import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { PaymentRecord } from './payment.types';

// Checkout itself is handled by `LessonsStore.checkout()` (already on develop).
// This store covers the payment-history page surfaced under /student/payments.

interface PaymentState {
  history: PaymentRecord[];
  loading: boolean;
  error: string | null;
}

export const PaymentStore = signalStore(
  { providedIn: 'root' },
  withState<PaymentState>({
    history: [],
    loading: false,
    error: null,
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
  withMethods((store, http = inject(HttpClient), apiBase = inject(USER_PLATFORM_API_URL)) => ({
    loadHistory(studentId: string) {
      patchState(store, { loading: true, error: null });
      http.get<PaymentRecord[]>(`${apiBase}/payments/history/${studentId}`).subscribe({
        next: (history) => patchState(store, { history: history ?? [], loading: false }),
        error: (err: unknown) => {
          const message = err instanceof Error ? err.message : 'Failed to load payment history';
          patchState(store, { loading: false, error: message });
        },
      });
    },
    hasPurchased(itemId: string): boolean {
      return store.history().some((p) => p.itemId === itemId && p.status === 'SUCCESS');
    },
  })),
);
