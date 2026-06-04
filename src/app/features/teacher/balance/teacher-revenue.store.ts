import { computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

// ─── Backend DTO ─────────────────────────────────────────────────────────────

interface BundleRevenueApiResponse {
  bundleId: string;
  generatedRevenue: number;
}

// ─── Internal model ──────────────────────────────────────────────────────────

export interface BundleRevenue {
  bundleId: string;
  generatedRevenue: number;
}

interface TeacherRevenueState {
  revenues: BundleRevenue[];
  loading: boolean;
  error: string | null;
}

const initialState: TeacherRevenueState = {
  revenues: [],
  loading: false,
  error: null,
};

function describeError(err: unknown): string {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 404) return 'No revenue data available yet.';
    if (err.status === 0) return 'Cannot reach the server. Check your connection.';
    return `Server error (${err.status}). Please try again later.`;
  }
  if (err instanceof Error && err.message) return err.message;
  return 'Failed to load revenues.';
}

export const TeacherRevenueStore = signalStore(
  { providedIn: 'root' },
  withState<TeacherRevenueState>(initialState),
  withComputed((state) => ({
    totalRevenue: computed(() =>
      state.revenues().reduce((sum, r) => sum + (Number(r.generatedRevenue) || 0), 0),
    ),
    bundleCount: computed(() => state.revenues().length),
  })),
  withMethods((
    store,
    http = inject(HttpClient),
    apiBase = inject(USER_PLATFORM_API_URL),
  ) => ({
    loadRevenues() {
      patchState(store, { loading: true, error: null });

      http.get<BundleRevenueApiResponse[]>(`${apiBase}/payments/revenues`).subscribe({
        next: (items) => {
          const revenues: BundleRevenue[] = Array.isArray(items)
            ? items.map((r) => ({
                bundleId: r.bundleId,
                generatedRevenue: Number(r.generatedRevenue) || 0,
              }))
            : [];

          patchState(store, { revenues, loading: false });
        },
        error: (err: unknown) => {
          console.error('Failed to load revenues', err);
          patchState(store, { error: describeError(err), loading: false });
        },
      });
    },
  })),
);
