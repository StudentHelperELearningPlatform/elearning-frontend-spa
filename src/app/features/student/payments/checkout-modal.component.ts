import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from '@features/auth/store/auth.store';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PaymentStore } from './payment.store';

@Component({
  selector: 'app-checkout-modal',
  imports: [CommonModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen()) {
      <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        tabindex="-1"
        (click)="onBackdrop($event)"
        (keydown.escape)="cancel()"
      >
        <div
          class="bg-white p-6 md:p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full"
        >
          <div class="flex items-center gap-3 mb-4">
            <span class="material-icons text-4xl text-[#0ABAB5]" aria-hidden="true">lock</span>
            <h2 id="checkout-title" class="text-2xl font-black">Unlock this lesson</h2>
          </div>

          <p class="text-gray-700 mb-2 font-medium">
            You're about to purchase access to:
          </p>
          <p class="font-black text-lg mb-6">{{ lessonTitle() }}</p>

          @if (store.checkoutError()) {
            <p class="text-sm text-red-600 font-medium mb-4" role="alert">
              {{ store.checkoutError() }}
            </p>
          }

          <div class="flex flex-col sm:flex-row gap-3 justify-end">
            <app-button variant="secondary" (btnClick)="cancel()">Cancel</app-button>
            <app-button
              variant="primary"
              icon="payments"
              [disabled]="store.checkoutLoading()"
              (btnClick)="proceed()"
            >
              {{ store.checkoutLoading() ? 'Starting…' : 'Continue to payment' }}
            </app-button>
          </div>
        </div>
      </div>
    }
  `,
})
export class CheckoutModalComponent {
  isOpen = input<boolean>(false);
  lessonId = input<string>('');
  lessonTitle = input<string>('');

  @Output() closed = new EventEmitter<void>();

  protected readonly store = inject(PaymentStore);
  private readonly authStore = inject(AuthStore);

  cancel() {
    this.closed.emit();
  }

  onBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.cancel();
    }
  }

  async proceed() {
    const studentId = this.authStore.user()?.id;
    const itemId = this.lessonId();
    if (!studentId || !itemId) return;

    const session = await this.store.checkout({
      studentId,
      itemType: 'LESSON',
      itemId,
      bundleId: itemId,
    });
    if (session?.checkoutUrl) {
      window.location.href = session.checkoutUrl;
    }
  }
}
