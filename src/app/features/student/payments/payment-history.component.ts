import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from '@features/auth/store/auth.store';
import { PaymentRecord, PaymentStore } from './payment.store';

@Component({
  selector: 'app-payment-history',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <header
        class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-14 h-14 bg-[#0ABAB5]/20 rounded-2xl border-4 border-black flex items-center justify-center"
            aria-hidden="true"
          >
            <span class="material-icons text-[#0ABAB5] text-3xl">payments</span>
          </div>
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">Payments</h1>
            <p class="text-gray-600 font-medium">Your purchase history</p>
          </div>
        </div>
        <div class="bg-[#0ABAB5]/10 p-4 border-4 border-black rounded-2xl">
          <p class="text-xs font-black uppercase tracking-widest text-gray-500">Total spent</p>
          <p class="text-2xl font-black text-black">{{ formatAmount(totalSpent()) }}</p>
        </div>
      </header>

      @if (store.historyLoading()) {
        <div class="space-y-3">
          @for (i of [1, 2, 3]; track i) {
            <div class="h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
          }
        </div>
      } @else if (store.historyError()) {
        <div
          class="p-6 bg-red-50 border-4 border-red-300 rounded-2xl text-red-700 font-medium"
          role="alert"
        >
          {{ store.historyError() }}
        </div>
      } @else if (store.history().length === 0) {
        <div
          class="p-10 bg-white rounded-3xl border-4 border-black text-center"
        >
          <span class="material-icons text-5xl text-gray-300" aria-hidden="true">receipt_long</span>
          <p class="mt-3 font-bold text-gray-700">No purchases yet.</p>
        </div>
      } @else {
        <div
          class="bg-white rounded-3xl border-4 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          <table class="w-full">
            <thead class="bg-gray-100 border-b-4 border-black">
              <tr class="text-left">
                <th scope="col" class="p-3 font-black">Type</th>
                <th scope="col" class="p-3 font-black">Amount</th>
                <th scope="col" class="p-3 font-black">Date</th>
              </tr>
            </thead>
            <tbody>
              @for (p of store.history(); track p.purchaseId) {
                <tr class="border-b-2 border-black/10 hover:bg-[#0ABAB5]/5">
                  <td class="p-3 font-bold uppercase">{{ p.itemType }}</td>
                  <td class="p-3 font-bold">{{ formatAmount(p.amountPaid) }}</td>
                  <td class="p-3 text-sm">{{ p.purchasedAt | date: 'mediumDate' }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
})
export class PaymentHistoryComponent implements OnInit {
  protected readonly store = inject(PaymentStore);
  private readonly authStore = inject(AuthStore);

  protected readonly totalSpent = computed(() => this.store.totalSpent());

  ngOnInit() {
    const studentId = this.authStore.user()?.id;
    if (studentId) {
      this.store.loadHistory();
    }
  }

  formatAmount(value: number, currency = 'RON'): string {
    try {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
    } catch {
      return `${value.toFixed(2)} ${currency}`;
    }
  }

  protected trackById(_: number, p: PaymentRecord) {
    return p.purchaseId;
  }
}
