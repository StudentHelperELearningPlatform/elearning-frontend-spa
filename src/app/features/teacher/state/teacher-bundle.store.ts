import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
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

// ─── Backend DTOs ────────────────────────────────────────────────────────────

interface BundleApiResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  teacherId: string;
  lessonIds: string[];
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

export interface CreateBundlePayload {
  name: string;
  description: string;
  price: number;
  teacherId: string;
  lessonIds: string[];
  // Local-only metadata (not persisted on the backend, used for listing UI)
  grade?: number | null;
  subjects?: string[];
  lessonsMetadata?: BundleLesson[];
}

export interface UpdateBundlePayload {
  name?: string;
  description?: string;
  price?: number;
  lessonIds?: string[];
  grade?: number | null;
  subjects?: string[];
  lessonsMetadata?: BundleLesson[];
}

interface TeacherBundleState {
  bundles: TeacherBundle[];
  loading: boolean;
  saving: boolean;
  error: string | null;
}

const initialState: TeacherBundleState = {
  bundles: [],
  loading: false,
  saving: false,
  error: null,
};

function mapBundle(item: BundleApiResponse, hint?: Partial<TeacherBundle>): TeacherBundle {
  const lessonIds = item.lessonIds ?? [];
  const lessonsFromHint = hint?.lessons ?? [];
  const lessons: BundleLesson[] = lessonIds.map((id) => {
    const match = lessonsFromHint.find((l) => l.id === id);
    return match ?? { id, title: '', subject: '' };
  });

  return {
    id: item.id,
    name: item.name,
    description: item.description ?? '',
    price: item.price,
    grade: hint?.grade ?? null,
    subjects: hint?.subjects ?? [],
    lessons,
  };
}

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

      http.get<PagedResponse<BundleApiResponse> | BundleApiResponse[]>(
        `${apiBase}/bundles/my`,
        { params: { page: '0', size: '100' } },
      ).subscribe({
        next: (res) => {
          const items: BundleApiResponse[] = Array.isArray(res)
            ? res
            : Array.isArray(res?.content)
              ? res.content
              : [];

          patchState(store, {
            bundles: items.map((item) => mapBundle(item)),
            loading: false,
          });
        },
        error: (err) => {
          console.error('Failed to load bundles', err);
          patchState(store, { error: 'Failed to load bundles', loading: false });
        },
      });
    },

    async createBundle(payload: CreateBundlePayload): Promise<TeacherBundle | null> {
      patchState(store, { saving: true, error: null });

      const body = {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        teacherId: payload.teacherId,
        lessonIds: payload.lessonIds,
      };

      try {
        const item = await firstValueFrom(
          http.post<BundleApiResponse>(`${apiBase}/bundles`, body),
        );

        const hint: Partial<TeacherBundle> = {
          grade: payload.grade ?? null,
          subjects: payload.subjects ?? [],
          lessons: payload.lessonsMetadata ?? [],
        };
        const bundle = mapBundle(item, hint);

        patchState(store, (state) => ({
          bundles: [...state.bundles, bundle],
          saving: false,
        }));

        return bundle;
      } catch (err) {
        console.error('Failed to create bundle', err);
        patchState(store, {
          saving: false,
          error: 'Failed to create bundle',
        });
        return null;
      }
    },

    async updateBundle(id: string, payload: UpdateBundlePayload): Promise<TeacherBundle | null> {
      patchState(store, { saving: true, error: null });

      const body: Record<string, unknown> = {};
      if (payload.name !== undefined) body['name'] = payload.name;
      if (payload.description !== undefined) body['description'] = payload.description;
      if (payload.price !== undefined) body['price'] = payload.price;
      if (payload.lessonIds !== undefined) body['lessonIds'] = payload.lessonIds;

      try {
        const item = await firstValueFrom(
          http.put<BundleApiResponse>(`${apiBase}/bundles/${id}`, body),
        );

        const hint: Partial<TeacherBundle> = {
          grade: payload.grade ?? null,
          subjects: payload.subjects ?? [],
          lessons: payload.lessonsMetadata ?? [],
        };
        const updated = mapBundle(item, hint);

        patchState(store, (state) => ({
          bundles: state.bundles.map((b) => (b.id === id ? updated : b)),
          saving: false,
        }));

        return updated;
      } catch (err) {
        console.error('Failed to update bundle', err);
        patchState(store, {
          saving: false,
          error: 'Failed to update bundle',
        });
        return null;
      }
    },

    deleteBundle(id: string) {
      patchState(store, { loading: true, error: null });

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
