import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, forkJoin, of } from 'rxjs';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { PaymentStore } from './payment.store';
import { AuthStore } from '@features/auth/store/auth.store';

// ─── API response shape (ce vine efectiv din backend) ─────────────────────────

export interface BundleApiItem {
  id: string;
  name: string;
  description: string;
  price: number;
  teacherId: string;
  lessonIds: string[];
}

interface LessonApiResponse {
  id: string;
  title: string;
  subject: string;
  difficultyLevel: string;   // 'EASY' | 'MEDIUM' | 'HARD' etc.
  estimatedDurationMinutes: number;
  status: string;
  shortDescription: string;
}

interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

// ─── Model intern ─────────────────────────────────────────────────────────────

export interface BundleLessonRef {
  id: string;
  title?: string;
  subject?: string;
  duration?: string;
  difficulty?: string;
  grade?: number;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  price: number;
  teacherId: string;
  lessonIds: string[];
  priceInCents: number;
  currency: string;
  lessons: BundleLessonRef[];
  isPopular: boolean;
  grade: number | null;
  subjects: string[];
}

export interface BundleLesson {
  id: string;
  title: string;
  subject: string;
  grade: number;
  difficulty: string;
  duration: string;
}

export type CreateBundlePayload = Pick<Bundle, 'name' | 'description' | 'price'> & {
  lessonIds?: string[];
};
export type UpdateBundlePayload = Partial<CreateBundlePayload>;

export interface BundlePage {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  isLast: boolean;
}

// ─── Mapping ──────────────────────────────────────────────────────────────────

function mapBundle(item: BundleApiItem): Bundle {
  const lessonIds = item.lessonIds ?? [];
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    teacherId: item.teacherId,
    lessonIds,
    priceInCents: Math.round(item.price * 100),
    currency: 'RON',
    lessons: lessonIds.map((id) => ({ id })),
    isPopular: false,
    grade: null,
    subjects: [],
  };
}

function mapLesson(r: LessonApiResponse): BundleLessonRef {
  return {
    id: r.id,
    title: r.title,
    subject: r.subject,
    difficulty: r.difficultyLevel,
    duration: r.estimatedDurationMinutes
      ? `${r.estimatedDurationMinutes} min`
      : undefined,
  };
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

  // ─── Încarcă lecțiile pentru o listă de bundle-uri ────────────────────────

  private async fetchLessonWithRetry(
    id: string,
    retries = 3,
    delayMs = 1000,
  ): Promise<LessonApiResponse | null> {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        return await firstValueFrom(
          this.http.get<LessonApiResponse>(`${this.apiBase}/lessons/${id}`),
        );
      } catch {
        if (attempt < retries - 1) {
          // Exponential backoff: 1s, 2s, 4s
          await new Promise((res) => setTimeout(res, delayMs * Math.pow(2, attempt)));
        }
      }
    }
    return null;
  }

  private async populateLessons(bundles: Bundle[]): Promise<Bundle[]> {
    const allLessonIds = [...new Set(bundles.flatMap((b) => b.lessonIds))];

    if (allLessonIds.length === 0) return bundles;

    // Fetch în paralel cu retry pentru fiecare lecție
    const lessonResults = await Promise.all(
      allLessonIds.map((id) => this.fetchLessonWithRetry(id)),
    );

    const lessonMap = new Map<string, BundleLessonRef>();
    lessonResults.forEach((result, index) => {
      if (result) {
        lessonMap.set(allLessonIds[index], mapLesson(result));
      }
    });

    return bundles.map((bundle) => ({
      ...bundle,
      lessons: bundle.lessonIds.map(
        (id) => lessonMap.get(id) ?? { id },
      ),
    }));
  }

  // ─── GET /api/v1/bundles ───────────────────────────────────────────────────

  loadBundles(page = 0, size = 10): void {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<PagedResponse<BundleApiItem>>(`${this.apiBase}/bundles`, {
        params: { page: String(page), size: String(size) },
      })
      .subscribe({
        next: async (res) => {
          const items = Array.isArray(res.content) ? res.content : [];
          const bundles = items.map(mapBundle);

          // Populează lecțiile în paralel
          const populated = await this.populateLessons(bundles);

          this.bundles.set(populated);
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

  // ─── GET /api/v1/bundles/my ────────────────────────────────────────────────

  loadMyBundles(page = 0, size = 10): void {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<PagedResponse<BundleApiItem>>(`${this.apiBase}/bundles/my`, {
        params: { page: String(page), size: String(size) },
      })
      .subscribe({
        next: async (res) => {
          const items = Array.isArray(res.content) ? res.content : [];
          const bundles = items.map(mapBundle);
          const populated = await this.populateLessons(bundles);

          this.bundles.set(populated);
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

  // ─── GET /api/v1/bundles/{id} ──────────────────────────────────────────────

  async getBundle(bundleId: string): Promise<Bundle | null> {
    try {
      const item = await firstValueFrom(
        this.http.get<BundleApiItem>(`${this.apiBase}/bundles/${bundleId}`),
      );
      const bundle = mapBundle(item);
      const [populated] = await this.populateLessons([bundle]);
      return populated;
    } catch {
      this.error.set('Failed to fetch bundle.');
      return null;
    }
  }

  // ─── POST /api/v1/bundles ──────────────────────────────────────────────────

  async createBundle(payload: CreateBundlePayload): Promise<Bundle | null> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const item = await firstValueFrom(
        this.http.post<BundleApiItem>(`${this.apiBase}/bundles`, payload),
      );
      const bundle = mapBundle(item);
      const [populated] = await this.populateLessons([bundle]);
      this.bundles.update((list) => [...list, populated]);
      return populated;
    } catch {
      this.error.set('Failed to create bundle.');
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  // ─── PUT /api/v1/bundles/{id} ──────────────────────────────────────────────

  async updateBundle(bundleId: string, payload: UpdateBundlePayload): Promise<Bundle | null> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const item = await firstValueFrom(
        this.http.put<BundleApiItem>(`${this.apiBase}/bundles/${bundleId}`, payload),
      );
      const bundle = mapBundle(item);
      const [populated] = await this.populateLessons([bundle]);
      this.bundles.update((list) =>
        list.map((b) => (b.id === bundleId ? populated : b)),
      );
      return populated;
    } catch {
      this.error.set('Failed to update bundle.');
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  // ─── DELETE /api/v1/bundles/{id} ──────────────────────────────────────────

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

  // ─── Checkout ──────────────────────────────────────────────────────────────

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

  // ─── Helpers ──────────────────────────────────────────────────────────────

  formatPrice(priceOrCents: number, currency = 'RON'): string {
    const value = priceOrCents > 500 ? priceOrCents / 100 : priceOrCents;
    try {
      return new Intl.NumberFormat('ro-RO', { style: 'currency', currency }).format(value);
    } catch {
      return `${value.toFixed(2)} ${currency}`;
    }
  }
}