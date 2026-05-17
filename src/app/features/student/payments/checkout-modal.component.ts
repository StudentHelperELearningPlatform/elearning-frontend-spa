import { Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { PaymentStore } from './payment.store';
import { AuthStore } from '../../auth/store/auth.store';
import { PaymentItemType } from './payment.types';

@Component({
  selector: 'app-checkout-modal',
  imports: [CommonModule, ModalComponent, ButtonComponent],
  host: { style: 'display: contents' },
  template: `
    <app-modal
      [isOpen]="isOpen()"
      [title]="'Unlock ' + (itemTitle() || 'Content')"
      [showFooter]="false"
      (closeModal)="closed.emit()"
    >
      <div class="space-y-6">
        <div class="flex items-center gap-4">
          <div
            class="w-16 h-16 rounded-2xl border-4 border-black bg-[#0ABAB5]/10 flex items-center justify-center"
          >
            <span class="material-icons text-[#0ABAB5] text-3xl">lock_open</span>
          </div>
          <div>
            <p class="text-sm font-black uppercase tracking-widest text-gray-500">
              {{ itemType() }}
            </p>
            <p class="text-xl font-black text-black">{{ itemTitle() }}</p>
          </div>
        </div>

        <div class="bg-gray-50 border-4 border-black rounded-2xl p-6 space-y-3">
          <div class="flex justify-between items-center">
            <span class="font-bold text-gray-600">Subtotal</span>
            <span class="font-black text-black">{{ priceDisplay() }}</span>
          </div>
          <div class="border-t-2 border-black/10 pt-3 flex justify-between items-center">
            <span class="font-black text-lg">Total</span>
            <span class="font-black text-lg text-[#0ABAB5]">{{ priceDisplay() }}</span>
          </div>
        </div>

        @if (store.error()) {
          <div class="bg-red-50 border-4 border-red-500 rounded-2xl p-4 text-red-700 font-bold text-sm">
            {{ store.error() }}
          </div>
        }

        <p class="text-sm font-bold text-gray-500 text-center">
          You will be redirected to a secure checkout page to complete your purchase.
        </p>

        <div class="flex flex-col-reverse md:flex-row md:justify-end gap-3">
          <app-button variant="secondary" (btnClick)="closed.emit()" [disabled]="store.checkoutLoading()">
            Cancel
          </app-button>
          <app-button
            variant="primary"
            icon="credit_card"
            [loading]="store.checkoutLoading()"
            [disabled]="store.checkoutLoading() || !itemId()"
            (btnClick)="startCheckout()"
          >
            Continue to Payment
          </app-button>
        </div>
      </div>
    </app-modal>
  `,
})
export class CheckoutModalComponent {
  isOpen = input<boolean>(false);
  itemId = input<string>('');
  itemTitle = input<string>('');
  itemType = input<PaymentItemType>('LESSON');
  bundleId = input<string | undefined>(undefined);
  priceCents = input<number>(0);
  currency = input<string>('RON');

  closed = output<void>();

  store = inject(PaymentStore);
  private authStore = inject(AuthStore);

  priceDisplay = computed(() => {
    const value = (this.priceCents() / 100).toFixed(2);
    return `${value} ${this.currency()}`;
  });

  startCheckout() {
    const studentId = this.authStore.user()?.id;
    if (!studentId || !this.itemId()) return;

    this.store.checkout({
      studentId,
      itemType: this.itemType(),
      itemId: this.itemId(),
      bundleId: this.bundleId(),
    });
  }
}
