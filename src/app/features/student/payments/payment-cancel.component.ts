import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

@Component({
  selector: 'app-payment-cancel',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div class="max-w-lg w-full">
        <div class="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <!-- Orange strip -->
          <div class="h-2 bg-gradient-to-r from-orange-400 to-amber-400"></div>

          <div class="p-8 md:p-12 text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 border-4 border-orange-400 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span class="material-icons text-4xl text-orange-500">shopping_cart</span>
            </div>

            <h1 class="text-3xl font-black text-black mb-3">Payment Cancelled</h1>
            <p class="text-gray-600 font-medium text-lg mb-2">No worries — nothing was charged.</p>
            <p class="text-gray-400 text-sm mb-8">
              Your payment was cancelled. You can try again whenever you're ready.
            </p>

            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                (click)="goToBundles()"
                class="px-8 py-4 bg-[#0ABAB5] text-white font-black rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <span class="material-icons">shopping_bag</span>
                Browse Bundles
              </button>
              <button
                (click)="goToLessons()"
                class="px-6 py-4 bg-white text-black font-black rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                Back to Lessons
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PaymentCancelComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly apiBase = inject(USER_PLATFORM_API_URL);

  ngOnInit(): void {
    // Ping backend cancel endpoint (fire-and-forget)
    this.http.get(`${this.apiBase}/payments/cancel`).subscribe({ error: (e) => console.debug('cancel ping:', e) });
  }

  goToBundles(): void {
    this.router.navigate(['/student/lessons'], { queryParams: { tab: 'bundles' } });
  }

  goToLessons(): void {
    this.router.navigate(['/student/lessons']);
  }
}
