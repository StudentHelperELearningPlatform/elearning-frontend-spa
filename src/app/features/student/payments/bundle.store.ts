import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

// ─── Mock data (used while backend endpoint is not yet available) ─────────────

const MOCK_BUNDLES: Bundle[] = [
  {
    id: 'bundle-math-5',
    name: 'Math Starter Pack – Grade 5',
    description: 'Everything a 5th grader needs to master fractions, decimals, and basic geometry.',
    priceInCents: 2999,
    currency: 'RON',
    isPopular: true,
    grade: 5,
    subjects: ['Math'],
    lessons: [
      { id: 'seed-1', title: 'Introduction to Fractions', subject: 'Math', grade: 5, difficulty: 'Easy', duration: '15m' },
      { id: 'lesson-dec', title: 'Decimals & Percentages', subject: 'Math', grade: 5, difficulty: 'Medium', duration: '20m' },
      { id: 'lesson-geo', title: 'Geometry Basics', subject: 'Math', grade: 5, difficulty: 'Medium', duration: '18m' },
    ],
  },
  {
    id: 'bundle-science-4',
    name: 'Science Explorer – Grade 4',
    description: 'Hands-on science topics: the water cycle, ecosystems, and matter & energy.',
    priceInCents: 3499,
    currency: 'RON',
    isPopular: false,
    grade: 4,
    subjects: ['Science'],
    lessons: [
      { id: 'seed-2', title: 'The Water Cycle', subject: 'Science', grade: 4, difficulty: 'Medium', duration: '20m' },
      { id: 'lesson-eco', title: 'Ecosystems & Habitats', subject: 'Science', grade: 4, difficulty: 'Easy', duration: '22m' },
      { id: 'lesson-mat', title: 'Matter & Energy', subject: 'Science', grade: 4, difficulty: 'Hard', duration: '25m' },
    ],
  },
  {
    id: 'bundle-history-6',
    name: 'History Deep Dive – Grade 6',
    description: 'World War II, Ancient Civilizations, and the Renaissance — all in one premium bundle.',
    priceInCents: 4499,
    currency: 'RON',
    isPopular: false,
    grade: 6,
    subjects: ['History'],
    lessons: [
      { id: 'seed-3', title: 'World War II Overview', subject: 'History', grade: 6, difficulty: 'Medium', duration: '25m' },
      { id: 'lesson-anc', title: 'Ancient Civilizations', subject: 'History', grade: 6, difficulty: 'Easy', duration: '20m' },
      { id: 'lesson-ren', title: 'The Renaissance', subject: 'History', grade: 6, difficulty: 'Hard', duration: '30m' },
    ],
  },
  {
    id: 'bundle-full-5',
    name: 'Complete Grade 5 Bundle',
    description: 'All subjects for Grade 5 at a discounted price. The best value for a full school year.',
    priceInCents: 7999,
    currency: 'RON',
    isPopular: false,
    grade: 5,
    subjects: ['Math', 'Science', 'History', 'English'],
    lessons: [
      { id: 'seed-1', title: 'Introduction to Fractions', subject: 'Math', grade: 5, difficulty: 'Easy', duration: '15m' },
      { id: 'lesson-dec', title: 'Decimals & Percentages', subject: 'Math', grade: 5, difficulty: 'Medium', duration: '20m' },
      { id: 'lesson-eco', title: 'Ecosystems & Habitats', subject: 'Science', grade: 5, difficulty: 'Easy', duration: '22m' },
      { id: 'lesson-eng', title: 'English Grammar Foundations', subject: 'English', grade: 5, difficulty: 'Easy', duration: '18m' },
      { id: 'lesson-wri', title: 'Creative Writing', subject: 'English', grade: 5, difficulty: 'Medium', duration: '20m' },
    ],
  },
];

// ─── Store ────────────────────────────────────────────────────────────────────

/**
 * Set to false once the backend delivers GET /api/v1/payments/bundles.
 * While true, the store loads the mock data above instead of calling the API.
 */
const USE_MOCK_BUNDLES = true;

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

  loadBundles(): void {
    this.loading.set(true);
    this.error.set(null);

    if (USE_MOCK_BUNDLES) {
      // Simulate async load so the skeleton shows briefly
      setTimeout(() => {
        this.bundles.set(MOCK_BUNDLES);
        this.loading.set(false);
      }, 600);
      return;
    }

    this.http.get<Bundle[]>(`${this.apiBase}/payments/bundles`).subscribe({
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

  formatPrice(priceInCents: number, currency = 'RON'): string {
    const value = priceInCents / 100;
    try {
      return new Intl.NumberFormat('ro-RO', { style: 'currency', currency }).format(value);
    } catch {
      return `${value.toFixed(2)} ${currency}`;
    }
  }
}
