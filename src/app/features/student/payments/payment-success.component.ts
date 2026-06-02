import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { PaymentStore } from './payment.store';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    @keyframes pop-in {
      0%   { transform: scale(0.4); opacity: 0; }
      70%  { transform: scale(1.15); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes confetti-fall {
      0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
    }
    .pop-in { animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
    .confetti { animation: confetti-fall 1.5s ease-in forwards; }
  `],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-6 relative overflow-hidden">

      <!-- Confetti pieces -->
      @for (c of confetti; track c.id) {
        <div
          class="confetti absolute w-3 h-3 rounded-sm"
          [style.left.%]="c.x"
          [style.top.%]="c.y"
          [style.background]="c.color"
          [style.animation-delay.ms]="c.delay"
          [style.animation-duration.ms]="c.duration"
        ></div>
      }

      <div class="relative z-10 max-w-lg w-full">
        <div class="bg-white rounded-3xl border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <!-- Green success strip -->
          <div class="h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400"></div>

          <div class="p-8 md:p-12 text-center">
            <!-- Animated checkmark -->
            <div class="pop-in inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 border-4 border-green-400 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span class="material-icons text-5xl text-green-600">check_circle</span>
            </div>

            <h1 class="text-3xl md:text-4xl font-black text-black mb-3">Payment Successful!</h1>
            <p class="text-gray-600 font-medium text-lg mb-2">
              🎉 You now have full access to your new content.
            </p>
            <p class="text-gray-400 text-sm mb-8">
              Your purchase has been confirmed. Happy learning!
            </p>

            @if (loading()) {
              <div class="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                <div class="w-4 h-4 border-2 border-[#0ABAB5] border-t-transparent rounded-full animate-spin"></div>
                Confirming your purchase…
              </div>
            }

            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                (click)="goToMyLessons()"
                class="px-8 py-4 bg-[#0ABAB5] text-white font-black rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <span class="material-icons">school</span>
                Go to My Lessons
              </button>
              <button
                (click)="goToBundles()"
                class="px-6 py-4 bg-white text-black font-black rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                Browse More Bundles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PaymentSuccessComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly apiBase = inject(USER_PLATFORM_API_URL);
  private readonly paymentStore = inject(PaymentStore);

  protected readonly loading = signal(true);

  protected readonly confetti = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 40,
    color: ['#0ABAB5', '#FFD700', '#FF6B6B', '#6366f1', '#10b981', '#f59e0b'][i % 6],
    delay: Math.random() * 800,
    duration: 1200 + Math.random() * 800,
  }));

  ngOnInit(): void {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');

    // Ping the backend success endpoint to finalize the session
    const url = sessionId
      ? `${this.apiBase}/payments/success?session_id=${sessionId}`
      : `${this.apiBase}/payments/success`;

    this.http.get(url).subscribe({
      next: () => {
        this.loading.set(false);
        // Refresh payment history so the new purchase appears immediately
        this.paymentStore.loadHistory();
      },
      error: () => {
        // Even on error, show the success page — Stripe already confirmed payment
        this.loading.set(false);
      },
    });
  }

  goToMyLessons(): void {
    this.router.navigate(['/student/lessons'], { queryParams: { tab: 'my-lessons' } });
  }

  goToBundles(): void {
    this.router.navigate(['/student/lessons'], { queryParams: { tab: 'bundles' } });
  }
}
