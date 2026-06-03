import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { PaymentStore } from './payment.store';
import { AuthStore } from '@features/auth/store/auth.store';

// ─── API response shape (ce vine efectiv din backend) ─────────────────────────

export interface BundleApiItem {
  id: string;
  name: string;
  description: string;
  price: number;           // RON cu zecimale, NU în cenți
  teacherId: string;
  lessonIds: string[];
}

interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;         // pageNumber curent
  size: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

// ─── Model intern (folosit în UI) ─────────────────────────────────────────────

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
  price: number;           // RON cu zecimale (ex: 150.00)
  teacherId: string;
  lessonIds: string[];

  // ── Câmpuri de compatibilitate cu componenta existentă ──────────────────────
  /** price × 100, pentru logica de tier din bundles-page (≥ 4000, ≥ 6000 cenți) */
  priceInCents: number;
  /** Mereu 'RON' — backend-ul nu returnează currency, dar componenta îl cere */
  currency: string;
  /** Alias pentru lessonIds — componenta iterează bundle.lessons */
  lessons: BundleLessonRef[];

  // ── Câmpuri opționale / viitor ───────────────────────────────────────────────
  isPopular: boolean;
  grade: number | null;
  subjects: string[];
}

/** Referință minimă la o lecție — conține doar id-ul până când /bundles/{id} va returna obiecte complete */
export interface BundleLessonRef {
  id: string;
}

/** Mapează răspunsul brut al API-ului la modelul intern */
function mapBundle(item: BundleApiItem): Bundle {
  const lessonIds = item.lessonIds ?? [];
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    teacherId: item.teacherId,
    lessonIds,
    // ── câmpuri de compatibilitate ───────────────────────────────────────────
    priceInCents: Math.round(item.price * 100),
    currency: 'RON',
    lessons: lessonIds.map((id) => ({ id })),
    // ── valori default ───────────────────────────────────────────────────────
    isPopular: false,
    grade: null,
    subjects: [],
  };
}

export type CreateBundlePayload = Pick<Bundle, 'name' | 'description' | 'price'> & {
  lessonIds?: string[];
};
export type UpdateBundlePayload = Partial<CreateBundlePayload>;

// ─── Pagination state ─────────────────────────────────────────────────────────

export interface BundlePage {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  isLast: boolean;
}

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
  pagination = signal<BundlePage | null>(null);

  /** Bundle IDs pe care studentul le-a cumpărat deja */
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

  loadBundles(page = 0, size = 10): void {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<PagedResponse<BundleApiItem>>(`${this.apiBase}/bundles`, {
        params: { page: String(page), size: String(size) },
      })
      .subscribe({
        next: (res) => {
          // extrage array-ul din wrapper-ul paginat
          const items = Array.isArray(res.content) ? res.content : [];
          this.bundles.set(items.map(mapBundle));
          this.pagination.set({
            totalElements: res.totalElements,
            totalPages: res.totalPages,
            currentPage: res.number,
            pageSize: res.size,
            isLast: res.last,
          });
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.error.set('Failed to load bundles. Please try again.');
        },
      });
  }

  // ─── GET /api/v1/bundles/my ─────────────────────────────────────────────────

  loadMyBundles(page = 0, size = 10): void {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<PagedResponse<BundleApiItem>>(`${this.apiBase}/bundles/my`, {
        params: { page: String(page), size: String(size) },
      })
      .subscribe({
        next: (res) => {
          const items = Array.isArray(res.content) ? res.content : [];
          this.bundles.set(items.map(mapBundle));
          this.pagination.set({
            totalElements: res.totalElements,
            totalPages: res.totalPages,
            currentPage: res.number,
            pageSize: res.size,
            isLast: res.last,
          });
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
      const item = await firstValueFrom(
        this.http.get<BundleApiItem>(`${this.apiBase}/bundles/${bundleId}`),
      );
      return mapBundle(item);
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
      const item = await firstValueFrom(
        this.http.post<BundleApiItem>(`${this.apiBase}/bundles`, payload),
      );
      const created = mapBundle(item);
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
      const item = await firstValueFrom(
        this.http.put<BundleApiItem>(`${this.apiBase}/bundles/${bundleId}`, payload),
      );
      const updated = mapBundle(item);
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

  /**
   * Formatează prețul pentru afișare.
   * Acceptă atât `bundle.price` (RON zecimale) cât și `bundle.priceInCents` (cenți).
   * Dacă valoarea e > 500 se presupune că e în cenți și se împarte la 100 automat.
   */
  formatPrice(priceOrCents: number, currency = 'RON'): string {
    const value = priceOrCents > 500 ? priceOrCents / 100 : priceOrCents;
    try {
      return new Intl.NumberFormat('ro-RO', { style: 'currency', currency }).format(value);
    } catch {
      return `${value.toFixed(2)} ${currency}`;
    }
  }
}
