import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

// ─── Models ──────────────────────────────────────────────────────────────────

export interface BundleLesson {
  id: string;
  title: string;
  subject: string;
  grade?: number;
  difficulty?: string;
  duration?: string;
}

export interface TeacherBundle {
  id: string;
  name: string;
  description: string;
  price: number;
  grade: number | null;
  subjects: string[];
  lessons: BundleLesson[];
}

interface TeacherBundleState {
  bundles: TeacherBundle[];
  loading: boolean;
  error: string | null;
}

const initialState: TeacherBundleState = {
  bundles: [],
  loading: false,
  error: null,
};

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_TEACHER_BUNDLES: TeacherBundle[] = [
  {
    id: 'bundle-math-5',
    name: 'Math Starter Pack – Grade 5',
    description: 'Everything a 5th grader needs to master fractions, decimals, and basic geometry.',
    price: 29.99,
    grade: 5,
    subjects: ['Math'],
    lessons: [
      { id: 'seed-1', title: 'Introduction to Fractions', subject: 'Math' },
    ],
  },
];

const USE_MOCK_BUNDLES = true;

// ─── Store ───────────────────────────────────────────────────────────────────

export const TeacherBundleStore = signalStore(
  { providedIn: 'root' },
  withState<TeacherBundleState>(initialState),
  withComputed((state) => ({
    totalBundlesCount: computed(() => state.bundles().length),
  })),
  withMethods((
    store,
    http = inject(HttpClient),
    apiBase = inject(USER_PLATFORM_API_URL),
  ) => ({

    loadBundles() {
      patchState(store, { loading: true, error: null });

      if (USE_MOCK_BUNDLES) {
        setTimeout(() => {
          patchState(store, { bundles: MOCK_TEACHER_BUNDLES, loading: false });
        }, 500);
        return;
      }

      http.get<TeacherBundle[]>(`${apiBase}/bundles`).subscribe({
        next: (data) => {
          patchState(store, { bundles: Array.isArray(data) ? data : [], loading: false });
        },
        error: (err) => {
          console.error('Failed to load bundles', err);
          patchState(store, { error: 'Failed to load bundles', loading: false });
        },
      });
    },

    deleteBundle(id: string) {
      patchState(store, { loading: true, error: null });

      if (USE_MOCK_BUNDLES) {
        setTimeout(() => {
          patchState(store, (state) => ({
            bundles: state.bundles.filter((b) => b.id !== id),
            loading: false,
          }));
        }, 300);
        return;
      }

      http.delete<void>(`${apiBase}/bundles/${id}`).subscribe({
        next: () => {
          patchState(store, (state) => ({
            bundles: state.bundles.filter((b) => b.id !== id),
            loading: false,
          }));
        },
        error: (err) => {
          console.error('Failed to delete bundle', err);
          patchState(store, { error: 'Failed to delete bundle', loading: false });
        },
      });
    },
  }))
);
