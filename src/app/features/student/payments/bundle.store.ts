import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { PaymentStore } from './payment.store';
import { AuthStore } from '@features/auth/store/auth.store';

// ─── Models ──────────────────────────────────────────────────────────────────

export interface BundleLesson {
  id: string;
  title: string;
  subject: string;
  grade: number;
  difficulty: string;
  duration: string;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  currency: string;
  /** If true, show a "Most Popular" ribbon */
  isPopular: boolean;
  grade: number | null;
  subjects: string[];
  lessons: BundleLesson[];
}

export type CreateBundlePayload = Omit<Bundle, 'id'>;
export type UpdateBundlePayload = Partial<Omit<Bundle, 'id'>>;

// ─── Store ────────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class BundleStore {
  private readonly http = inject(HttpClient);
  private readonly apiBase = inject(USER_PLATFORM_API_URL);
  private readonly paymentStore = inject(PaymentStore);
  private readonly authStore = inject(AuthStore);

  bundles = signal<Bundle[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  /** Bundle IDs the student has already purchased */
  private readonly purchasedBundleIds = computed(() =>
    new Set(
      this.paymentStore
        .history()
        .filter((p) => p.itemType === 'BUNDLE' && p.status === 'SUCCESS')
        .map((p) => p.itemId),
    ),
  );

  hasPurchasedBundle(bundleId: string): boolean {
    return this.purchasedBundleIds().has(bundleId);
  }

  // ─── GET /api/v1/bundles ────────────────────────────────────────────────────

  loadBundles(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Bundle[]>(`${this.apiBase}/bundles`).subscribe({
      next: (data) => {
        this.bundles.set(Array.isArray(data) ? data : []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Failed to load bundles. Please try again.');
      },
    });
  }

  // ─── GET /api/v1/bundles/my ─────────────────────────────────────────────────

  loadMyBundles(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Bundle[]>(`${this.apiBase}/bundles/my`).subscribe({
      next: (data) => {
        this.bundles.set(Array.isArray(data) ? data : []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Failed to load your bundles. Please try again.');
      },
    });
  }

  // ─── GET /api/v1/bundles/{id} ───────────────────────────────────────────────

  async getBundle(bundleId: string): Promise<Bundle | null> {
    try {
      return await firstValueFrom(
        this.http.get<Bundle>(`${this.apiBase}/bundles/${bundleId}`),
      );
    } catch {
      this.error.set('Failed to fetch bundle.');
      return null;
    }
  }

  // ─── POST /api/v1/bundles ───────────────────────────────────────────────────

  async createBundle(payload: CreateBundlePayload): Promise<Bundle | null> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const created = await firstValueFrom(
        this.http.post<Bundle>(`${this.apiBase}/bundles`, payload),
      );
      this.bundles.update((list) => [...list, created]);
      return created;
    } catch {
      this.error.set('Failed to create bundle.');
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  // ─── PUT /api/v1/bundles/{id} ───────────────────────────────────────────────

  async updateBundle(bundleId: string, payload: UpdateBundlePayload): Promise<Bundle | null> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const updated = await firstValueFrom(
        this.http.put<Bundle>(`${this.apiBase}/bundles/${bundleId}`, payload),
      );
      this.bundles.update((list) =>
        list.map((b) => (b.id === bundleId ? updated : b)),
      );
      return updated;
    } catch {
      this.error.set('Failed to update bundle.');
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  // ─── DELETE /api/v1/bundles/{id} ────────────────────────────────────────────

  async deleteBundle(bundleId: string): Promise<boolean> {
    this.loading.set(true);
    this.error.set(null);

    try {
      await firstValueFrom(
        this.http.delete<void>(`${this.apiBase}/bundles/${bundleId}`),
      );
      this.bundles.update((list) => list.filter((b) => b.id !== bundleId));
      return true;
    } catch {
      this.error.set('Failed to delete bundle.');
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  // ─── Checkout ───────────────────────────────────────────────────────────────

  async checkoutBundle(bundleId: string): Promise<void> {
    const studentId = this.authStore.user()?.id;
    if (!studentId) return;

    const session = await this.paymentStore.checkout({
      studentId,
      itemType: 'BUNDLE',
      itemId: bundleId,
      bundleId,
    });

    if (session?.checkoutUrl) {
      globalThis.location.href = session.checkoutUrl;
    }
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  formatPrice(priceInCents: number, currency = 'RON'): string {
    const value = priceInCents / 100;
    try {
      return new Intl.NumberFormat('ro-RO', { style: 'currency', currency }).format(value);
    } catch {
      return `${value.toFixed(2)} ${currency}`;
    }
  }
}
