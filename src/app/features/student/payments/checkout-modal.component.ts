import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
  input,
  computed,
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
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="'checkout-title'"
        tabindex="-1"
        (click)="onBackdrop($event)"
        (keydown.escape)="cancel()"
      >
        <div
          class="bg-white p-6 md:p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full relative overflow-hidden"
        >
          <!-- Decorative gradient strip -->
          <div
            class="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
            [class]="isBundle() ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500' : 'bg-gradient-to-r from-[#0ABAB5] to-teal-400'"
          ></div>

          <div class="flex items-center gap-3 mb-4 mt-2">
            <div
              class="w-12 h-12 rounded-2xl border-4 border-black flex items-center justify-center"
              [class]="isBundle() ? 'bg-violet-100' : 'bg-[#0ABAB5]/20'"
            >
              <span
                class="material-icons text-3xl"
                [class]="isBundle() ? 'text-violet-600' : 'text-[#0ABAB5]'"
                aria-hidden="true"
              >{{ isBundle() ? 'shopping_bag' : 'lock' }}</span>
            </div>
            <div>
              <h2 id="checkout-title" class="text-xl font-black">
                {{ isBundle() ? 'Purchase Bundle' : 'Unlock this lesson' }}
              </h2>
              <p class="text-sm text-gray-500 font-medium">
                {{ isBundle() ? 'Get access to all included lessons' : 'One-time payment for lifetime access' }}
              </p>
            </div>
          </div>

          <div class="bg-gray-50 rounded-2xl border-2 border-black p-4 mb-5">
            <p class="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">
              {{ isBundle() ? 'Bundle' : 'Lesson' }}
            </p>
            <p class="font-black text-lg text-black leading-tight">{{ itemTitle() }}</p>
            @if (price()) {
              <p class="mt-2 text-2xl font-black" [class]="isBundle() ? 'text-violet-600' : 'text-[#0ABAB5]'">
                {{ price() }}
              </p>
            }
          </div>

          @if (store.checkoutError()) {
            <p class="text-sm text-red-600 font-medium mb-4" role="alert">
              {{ store.checkoutError() }}
            </p>
          }

          <div class="flex flex-col sm:flex-row gap-3 justify-end">
            <app-button variant="secondary" (btnClick)="cancel()">Cancel</app-button>
            <app-button
              [variant]="isBundle() ? 'primary' : 'primary'"
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
  /** For lessons: the lesson ID. For bundles: the bundle ID. */
  itemId = input<string>('');
  itemTitle = input<string>('');
  /** Defaults to LESSON for backward compatibility. */
  itemType = input<string>('LESSON');
  /** Optional formatted price string to display (e.g. "29.99 RON") */
  price = input<string>('');

  /** Kept for backward compat — maps to itemId */
  lessonId = input<string>('');
  /** Kept for backward compat — maps to itemTitle */
  lessonTitle = input<string>('');

  @Output() closed = new EventEmitter<void>();

  protected readonly store = inject(PaymentStore);
  private readonly authStore = inject(AuthStore);

  protected readonly isBundle = computed(() => this.itemType() === 'BUNDLE');

  /** Resolve item ID from new input or legacy lessonId */
  private get resolvedItemId(): string {
    return this.itemId() || this.lessonId();
  }

  /** Resolve item title from new input or legacy lessonTitle */
  protected get resolvedItemTitle(): string {
    return this.itemTitle() || this.lessonTitle();
  }

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
    const itemId = this.resolvedItemId;
    if (!studentId || !itemId) return;

    const isBundle = this.isBundle();

    const session = await this.store.checkout({
      studentId,
      itemType: this.itemType(),
      itemId,
      // bundleId is only sent when checking out a bundle
      bundleId: isBundle ? itemId : undefined,
    });

    if (session?.checkoutUrl) {
      globalThis.location.href = session.checkoutUrl;
    }
  }
}
