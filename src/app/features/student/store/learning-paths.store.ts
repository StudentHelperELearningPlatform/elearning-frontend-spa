import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { LearningPath } from '@shared/models/learning-path.model';

export type { LearningPath };

interface LearningPathsState {
  currentPath: LearningPath | null;
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
    completedCount: computed(
      () => state.currentPath()?.lessons.filter((l) => l.status === 'COMPLETED').length ?? 0,
    ),
    totalCount: computed(() => state.currentPath()?.lessons.length ?? 0),
    progressPercent: computed(() => {
      const total = state.currentPath()?.lessons.length ?? 0;
      if (total === 0) return 0;
      const completed = state.currentPath()!.lessons.filter((l) => l.status === 'COMPLETED').length;
      return Math.round((completed / total) * 100);
    }),
    nextAvailableLesson: computed(
      () => state.currentPath()?.lessons.find((l) => l.status === 'AVAILABLE') ?? null,
    ),
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    loadPath(id: string) {
      patchState(store, { loading: true, error: null });
      http.get<LearningPath>(`/api/v1/learning-paths/${id}`).subscribe({
        next: (path) => patchState(store, { currentPath: path, loading: false }),
        error: (err: unknown) => {
          const message = err instanceof Error ? err.message : 'Failed to load learning path';
          patchState(store, { loading: false, error: message });
        },
      });
    },
  })),
);

