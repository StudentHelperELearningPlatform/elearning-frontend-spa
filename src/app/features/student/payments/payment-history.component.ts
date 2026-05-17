import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { PaymentStore } from './payment.store';
import { AuthStore } from '../../auth/store/auth.store';
import { PaymentStatus } from './payment.types';

@Component({
  selector: 'app-payment-history',
  imports: [CommonModule, CardComponent, BadgeComponent, EmptyStateComponent],
  template: `
    <div class="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div
        class="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div class="flex items-center space-x-4">
          <div
            class="w-16 h-16 bg-[#0ABAB5]/20 rounded-2xl border-4 border-black flex items-center justify-center"
          >
            <span class="material-icons text-[#0ABAB5] text-3xl">payments</span>
          </div>
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">Payments</h1>
            <p class="text-gray-600 font-medium">Your purchase history and receipts</p>
          </div>
        </div>
        <div
          class="bg-[#0ABAB5]/10 px-6 py-4 rounded-2xl border-4 border-black text-center"
        >
          <p class="text-xs font-black uppercase tracking-widest text-gray-500">Total Spent</p>
          <p class="text-2xl font-black text-black">{{ totalSpentDisplay() }}</p>
        </div>
      </div>

      @if (store.loading()) {
        <div class="space-y-4">
          @for (i of [1, 2, 3]; track i) {
            <div class="h-24 bg-gray-200 rounded-2xl border-4 border-black animate-pulse"></div>
          }
        </div>
      } @else if (store.error()) {
        <div class="bg-red-50 border-4 border-red-500 rounded-2xl p-6 text-red-700 font-bold">
          {{ store.error() }}
        </div>
      } @else if (store.history().length === 0) {
        <app-empty-state
          title="No transactions yet"
          description="Your purchase history will appear here once you buy a lesson."
          icon="receipt_long"
        />
      } @else {
        <div class="space-y-4">
          @for (payment of store.history(); track payment.id) {
            <app-card>
              <div
                class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div class="flex items-start gap-4 flex-1">
                  <div
                    class="w-12 h-12 rounded-xl border-4 border-black bg-[#0ABAB5]/10 flex items-center justify-center flex-shrink-0"
                  >
                    <span class="material-icons text-[#0ABAB5]">{{
                      iconFor(payment.itemType)
                    }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-black text-lg text-black">{{ payment.itemTitle }}</p>
                    <p class="text-sm font-bold text-gray-500">
                      {{ payment.itemType }} • {{ payment.createdAt | date: 'medium' }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-4 self-end md:self-auto">
                  <span class="text-xl font-black text-black">
                    {{ formatAmount(payment.amount, payment.currency) }}
                  </span>
                  <app-badge [variant]="statusVariant(payment.status)">
                    {{ payment.status }}
                  </app-badge>
                </div>
              </div>
            </app-card>
          }
        </div>
      }
    </div>
  `,
})
export class PaymentHistoryComponent implements OnInit {
  store = inject(PaymentStore);
  private authStore = inject(AuthStore);

  totalSpentDisplay = computed(() => {
    const cents = this.store.totalSpentCents();
    const currency = this.store.history()[0]?.currency ?? 'RON';
    return this.formatAmount(cents, currency);
  });

  ngOnInit() {
    const studentId = this.authStore.user()?.id;
    if (studentId) {
      this.store.loadHistory(studentId);
    }
  }

  formatAmount(amountCents: number, currency: string): string {
    const value = (amountCents / 100).toFixed(2);
    return `${value} ${currency}`;
  }

  iconFor(type: string): string {
    switch (type) {
      case 'LESSON':
        return 'menu_book';
      case 'BUNDLE':
        return 'inventory_2';
      case 'SUBSCRIPTION':
        return 'autorenew';
      default:
        return 'receipt';
    }
  }

  statusVariant(status: PaymentStatus): 'success' | 'warning' | 'danger' | 'neutral' {
    switch (status) {
      case 'SUCCESS':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'FAILED':
        return 'danger';
      case 'REFUNDED':
        return 'neutral';
      default:
        return 'neutral';
    }
  }
}
