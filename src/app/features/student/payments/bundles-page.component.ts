import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bundle, BundleStore } from './bundle.store';
import { PaymentStore } from './payment.store';
import { CheckoutModalComponent } from './checkout-modal.component';

@Component({
  selector: 'app-bundles-page',
  standalone: true,
  imports: [CommonModule, CheckoutModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    @keyframes shimmer-silver {
      0%, 100% { box-shadow: 0 0 0 3px rgba(192,192,192,0.6), 0 0 18px rgba(192,192,192,0.3); }
      50%       { box-shadow: 0 0 0 3px rgba(220,220,220,0.9), 0 0 28px rgba(220,220,220,0.6); }
    }
    @keyframes shimmer-gold {
      0%, 100% { box-shadow: 0 0 0 3px rgba(255,215,0,0.7), 0 0 20px rgba(255,215,0,0.3); }
      50%       { box-shadow: 0 0 0 3px rgba(255,215,0,1.0), 0 0 32px rgba(255,215,0,0.7); }
    }
    @keyframes shimmer-diamond {
      0%, 100% { box-shadow: 0 0 0 3px rgba(139,92,246,0.7), 0 0 24px rgba(139,92,246,0.3); }
      50%       { box-shadow: 0 0 0 3px rgba(167,139,250,1.0), 0 0 40px rgba(167,139,250,0.8); }
    }
    .bundle-card-silver  { animation: shimmer-silver  2.4s ease-in-out infinite; }
    .bundle-card-gold    { animation: shimmer-gold    2.0s ease-in-out infinite; }
    .bundle-card-diamond { animation: shimmer-diamond 1.8s ease-in-out infinite; }
  `],
  template: `
    <!-- Hero Banner -->
    <div
      class="relative rounded-3xl border-4 border-black overflow-hidden mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
      style="background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);"
    >
      <!-- Star field decoration -->
      <div class="absolute inset-0 overflow-hidden opacity-30">
        @for (star of stars; track star.id) {
          <div
            class="absolute rounded-full bg-white"
            [style.width.px]="star.size"
            [style.height.px]="star.size"
            [style.left.%]="star.x"
            [style.top.%]="star.y"
            [style.opacity]="star.opacity"
          ></div>
        }
      </div>

      <div class="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
        <div class="flex-1">
          <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1 mb-4">
            <span class="material-icons text-yellow-400 text-sm">auto_awesome</span>
            <span class="text-white/80 text-xs font-bold uppercase tracking-widest">Premium Learning Bundles</span>
          </div>
          <h1 class="text-3xl md:text-5xl font-black text-white mb-3 leading-tight">
            Learn more,<br/><span class="text-[#0ABAB5]">pay less.</span>
          </h1>
          <p class="text-white/70 text-lg font-medium max-w-lg">
            Bundle multiple lessons together and save. Each bundle gives you lifetime access to hand-picked lessons covering a complete subject area.
          </p>
        </div>
        <div class="shrink-0 hidden md:flex flex-col items-center gap-2">
          <div class="w-28 h-28 rounded-3xl border-4 border-white/20 bg-white/10 flex items-center justify-center">
            <span class="material-icons text-6xl text-yellow-400">shopping_bag</span>
          </div>
          <span class="text-white/50 text-xs font-bold">Bundles Available</span>
          <span class="text-white font-black text-3xl">{{ bundleStore.bundles().length }}</span>
        </div>
      </div>
    </div>

    <!-- Loading Skeletons -->
    @if (bundleStore.loading()) {
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        @for (i of [1,2,3]; track i) {
          <div class="rounded-3xl border-4 border-gray-200 overflow-hidden animate-pulse">
            <div class="h-3 bg-gray-300"></div>
            <div class="p-6 space-y-4">
              <div class="h-7 bg-gray-200 rounded-xl w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              <div class="h-10 bg-gray-200 rounded-xl w-1/3 mt-4"></div>
              <div class="space-y-2 mt-4">
                @for (j of [1,2,3]; track j) {
                  <div class="h-10 bg-gray-100 rounded-xl"></div>
                }
              </div>
              <div class="h-12 bg-gray-200 rounded-2xl mt-4"></div>
            </div>
          </div>
        }
      </div>
    }

    <!-- Error State -->
    @else if (bundleStore.error()) {
      <div class="p-8 rounded-3xl border-4 border-red-300 bg-red-50 text-center">
        <span class="material-icons text-4xl text-red-400 mb-3">error_outline</span>
        <p class="font-bold text-red-700 mb-4">{{ bundleStore.error() }}</p>
        <button
          (click)="bundleStore.loadBundles()"
          class="px-6 py-3 bg-red-500 text-white font-black rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          Retry
        </button>
      </div>
    }

    <!-- Empty State -->
    @else if (bundleStore.bundles().length === 0) {
      <div class="p-12 rounded-3xl border-4 border-black text-center bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <span class="material-icons text-6xl text-gray-300 mb-4">inventory_2</span>
        <p class="font-black text-2xl text-black mb-2">No bundles yet</p>
        <p class="text-gray-500 font-medium">Check back soon — new bundles are added regularly!</p>
      </div>
    }

    <!-- Bundle Cards Grid -->
    @else {
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        @for (bundle of bundleStore.bundles(); track bundle.id) {
          <div
            class="rounded-3xl border-4 border-black overflow-hidden bg-white flex flex-col transition-all duration-300 hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] cursor-default"
            [class]="getBundleCardClass(bundle)"
          >
            <!-- Gradient top strip -->
            <div class="h-3 w-full" [style]="getBundleGradient(bundle)"></div>

            <!-- Ribbon -->
            @if (bundle.isPopular) {
              <div class="relative">
                <div class="absolute top-3 right-0 bg-[#FFD700] text-black text-xs font-black uppercase tracking-widest px-4 py-1 rounded-l-full border-l-4 border-b-4 border-black shadow-[-2px_2px_0px_rgba(0,0,0,1)]">
                  ⭐ Most Popular
                </div>
              </div>
            }
            @if (bundle.lessons.length >= 5) {
              <div class="relative">
                <div class="absolute top-3 right-0 bg-[#0ABAB5] text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-l-full border-l-4 border-b-4 border-black shadow-[-2px_2px_0px_rgba(0,0,0,1)]">
                  🏆 Best Value
                </div>
              </div>
            }

            <div class="p-6 flex flex-col flex-1" [class.mt-8]="bundle.isPopular || bundle.lessons.length >= 5">

              <!-- Header -->
              <div class="mb-4">
                <h2 class="text-xl font-black text-black leading-tight mb-2">{{ bundle.name }}</h2>
                <p class="text-sm text-gray-600 font-medium leading-relaxed">{{ bundle.description }}</p>
              </div>

              <!-- Subject + Grade chips -->
              <div class="flex flex-wrap gap-2 mb-4">
                @for (subject of bundle.subjects; track subject) {
                  <span class="px-3 py-1 rounded-full text-xs font-black border-2 border-black bg-[#0ABAB5]/10 text-[#0ABAB5]">
                    {{ subject }}
                  </span>
                }
                @if (bundle.grade) {
                  <span class="px-3 py-1 rounded-full text-xs font-black border-2 border-black bg-gray-100 text-gray-700">
                    Grade {{ bundle.grade }}
                  </span>
                }
                <span class="px-3 py-1 rounded-full text-xs font-black border-2 border-black bg-gray-100 text-gray-700">
                  {{ bundle.lessons.length }} lessons
                </span>
              </div>

              <!-- Price -->
              @if (isPurchased(bundle.id)) {
                <div class="flex items-center gap-2 mb-4 bg-green-50 border-2 border-green-400 rounded-2xl px-4 py-3">
                  <span class="material-icons text-green-600">verified</span>
                  <span class="font-black text-green-700">Purchased — Access granted!</span>
                </div>
              } @else {
                <div class="mb-4">
                  <p class="text-3xl font-black text-black">{{ bundleStore.formatPrice(bundle.priceInCents, bundle.currency) }}</p>
                  <p class="text-xs text-gray-500 font-medium">One-time · Lifetime access</p>
                </div>
              }

              <!-- Lessons list -->
              <div class="border-t-2 border-black/10 pt-4 mb-5 space-y-2 flex-1">
                <p class="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Included Lessons</p>
                @for (lesson of bundle.lessons; track lesson.id) {
                  <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border-2 border-gray-100 hover:border-black transition-all">
                    <span class="material-icons text-sm" [class]="getDifficultyIconColor(lesson.difficulty)">
                      {{ getDifficultyIcon(lesson.difficulty) }}
                    </span>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-bold text-black truncate">{{ lesson.title }}</p>
                      <p class="text-xs text-gray-500">{{ lesson.subject }} · {{ lesson.duration }}</p>
                    </div>
                    <span
                      class="text-xs font-black px-2 py-0.5 rounded-full border"
                      [class]="getDifficultyBadgeClass(lesson.difficulty)"
                    >{{ lesson.difficulty }}</span>
                  </div>
                }
              </div>

              <!-- CTA -->
              @if (isPurchased(bundle.id)) {
                <button
                  disabled
                  class="w-full py-3 rounded-2xl border-4 border-green-400 bg-green-50 text-green-700 font-black text-base cursor-default flex items-center justify-center gap-2"
                >
                  <span class="material-icons">check_circle</span>
                  Already Purchased
                </button>
              } @else {
                <button
                  (click)="openCheckout(bundle)"
                  [disabled]="paymentStore.checkoutLoading()"
                  class="w-full py-4 rounded-2xl border-4 border-black font-black text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  [class]="getBundleCTAClass(bundle)"
                >
                  <span class="material-icons">shopping_cart</span>
                  {{ paymentStore.checkoutLoading() ? 'Starting…' : 'Buy Bundle' }}
                </button>
              }
            </div>
          </div>
        }
      </div>
    }

    <!-- Checkout Modal -->
    <app-checkout-modal
      [isOpen]="checkoutOpen()"
      [itemId]="selectedBundle()?.id ?? ''"
      [itemTitle]="selectedBundle()?.name ?? ''"
      itemType="BUNDLE"
      [price]="selectedBundlePrice()"
      (closed)="closeCheckout()"
    />
  `,
})
export class BundlesPageComponent implements OnInit {
  protected readonly bundleStore = inject(BundleStore);
  protected readonly paymentStore = inject(PaymentStore);

  protected readonly checkoutOpen = signal(false);
  protected readonly selectedBundle = signal<Bundle | null>(null);
  protected readonly selectedBundlePrice = computed(() => {
    const b = this.selectedBundle();
    return b ? this.bundleStore.formatPrice(b.priceInCents, b.currency) : '';
  });

  // Decorative star field for hero banner
  protected readonly stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
  }));

  ngOnInit(): void {
    this.bundleStore.loadBundles();
  }

  isPurchased(bundleId: string): boolean {
    return this.bundleStore.hasPurchasedBundle(bundleId);
  }

  openCheckout(bundle: Bundle): void {
    this.selectedBundle.set(bundle);
    this.checkoutOpen.set(true);
  }

  closeCheckout(): void {
    this.checkoutOpen.set(false);
    this.selectedBundle.set(null);
  }

  getBundleCardClass(bundle: Bundle): string {
    // Tier visual based on price
    if (bundle.priceInCents >= 6000) return 'bundle-card-diamond';
    if (bundle.priceInCents >= 4000) return 'bundle-card-gold';
    return 'bundle-card-silver';
  }

  getBundleGradient(bundle: Bundle): string {
    const gradients: Record<string, string> = {
      Math: 'background: linear-gradient(90deg, #0ABAB5, #22d3ee)',
      Science: 'background: linear-gradient(90deg, #10b981, #34d399)',
      History: 'background: linear-gradient(90deg, #f59e0b, #fbbf24)',
      English: 'background: linear-gradient(90deg, #6366f1, #818cf8)',
      Geography: 'background: linear-gradient(90deg, #3b82f6, #60a5fa)',
      Art: 'background: linear-gradient(90deg, #ec4899, #f472b6)',
      Music: 'background: linear-gradient(90deg, #8b5cf6, #a78bfa)',
    };
    const firstSubject = bundle.subjects[0] ?? '';
    if (bundle.subjects.length > 1) {
      return 'background: linear-gradient(90deg, #0f0c29, #302b63, #24243e)';
    }
    return gradients[firstSubject] ?? 'background: linear-gradient(90deg, #0ABAB5, #14b8a6)';
  }

  getBundleCTAClass(bundle: Bundle): string {
    if (bundle.priceInCents >= 6000) {
      return 'bg-gradient-to-r from-violet-500 to-purple-600 text-white';
    }
    if (bundle.priceInCents >= 4000) {
      return 'bg-[#FFD700] text-black';
    }
    return 'bg-[#0ABAB5] text-white';
  }

  getDifficultyIcon(difficulty: string): string {
    switch (difficulty?.toLowerCase()) {
      case 'easy': case 'beginner': return 'emoji_nature';
      case 'medium': case 'intermediate': return 'trending_up';
      case 'hard': case 'advanced': return 'local_fire_department';
      default: return 'school';
    }
  }

  getDifficultyIconColor(difficulty: string): string {
    switch (difficulty?.toLowerCase()) {
      case 'easy': case 'beginner': return 'text-green-500';
      case 'medium': case 'intermediate': return 'text-amber-500';
      case 'hard': case 'advanced': return 'text-red-500';
      default: return 'text-gray-400';
    }
  }

  getDifficultyBadgeClass(difficulty: string): string {
    switch (difficulty?.toLowerCase()) {
      case 'easy': case 'beginner':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'medium': case 'intermediate':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'hard': case 'advanced':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  }
}
