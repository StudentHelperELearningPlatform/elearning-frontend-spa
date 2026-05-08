import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { catchError, map, EMPTY } from 'rxjs';
import { API_URL } from '@core/tokens/api.token';
import { 
  mapLearningPathResponse, 
  BackendLearningPath, 
  LearningPathViewModel 
} from '../../../api/adapters/learning-path.adapter';

export type { LearningPathViewModel as LearningPath };

interface LearningPathsState {
  currentPath: LearningPathViewModel | null;
  loading: boolean;
  error: string | null;
}

export const LearningPathsStore = signalStore(
  { providedIn: 'root' },

  withState<LearningPathsState>({
    currentPath: null,
    loading: false,
    error: null,
  }),

  withComputed((state) => ({
    completedCount: computed(() => state.currentPath()?.lessons.filter((l) => l.status === 'COMPLETED').length ?? 0),
    totalCount: computed(() => state.currentPath()?.lessons.length ?? 0),

    progressPercent: computed(() => {
      const total = state.currentPath()?.lessons.length ?? 0;
      if (!total) return 0;

      const completed = state.currentPath()!.lessons.filter((l) => l.status === 'COMPLETED').length;
      return Math.round((completed / total) * 100);
    }),

    nextAvailableLesson: computed(() => state.currentPath()?.lessons.find((l) => l.status === 'AVAILABLE') ?? null),
  })),

  withMethods((store, http = inject(HttpClient), apiBase = inject(API_URL)) => ({
    loadPath(id: string): void {
      patchState(store, { loading: true, error: null });

      http.get<BackendLearningPath>(`${apiBase}/learning-paths/${id}`)
        .pipe(
          map((raw) => mapLearningPathResponse(raw)),
          catchError((err: unknown) => {
            const message = err instanceof Error ? err.message : 'Failed to load learning path';
            patchState(store, { loading: false, error: message });
            return EMPTY;
          })
        )
        .subscribe((path) => {
          patchState(store, { 
            currentPath: path, 
            loading: false, 
            error: null 
          });
        });
    },

    resetPath(): void {
      patchState(store, { currentPath: null, error: null });
    }
  }))
);