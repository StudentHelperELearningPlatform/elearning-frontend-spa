import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';
import { LEARNING_PATH_API_URL } from '@core/tokens/api.token';
import { BackendLesson, mapLessonResponse } from '../../../api/adapters/lesson.adapter';

export interface Module {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'interactive' | 'audio' | 'image';
  content: string;
  mediaUrl?: string;
  blockType?: string; // Align with backend naming
}

export interface Subcapitol {
  id: string;
  title: string;
  blocks: Module[];
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  grade: number;
  difficulty: string;
  duration: string;
  status: string;
  subcapitols: Subcapitol[];
  modules: Module[]; // Keep flat modules for backward compatibility in UI if needed
}


export interface LessonLoadError {
  kind: 'not-found' | 'server' | 'unknown';
  message: string;
}

interface LessonsState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  loading: boolean;
  error: LessonLoadError | null;
}

export const LessonsStore = signalStore(
  { providedIn: 'root' },
  withState<LessonsState>({
    lessons: [],
    currentLesson: null,
    loading: false,
    error: null,
  }),

  withComputed((state) => ({
    publishedLessons: computed(() => state.lessons()),
    lessonCount: computed(() => state.lessons().length),
  })),
  withMethods((store, http = inject(HttpClient), apiBase = inject(LEARNING_PATH_API_URL)) => ({
    
    loadLessons(): void {
      patchState(store, { loading: true });
      setTimeout(() => patchState(store, { loading: false }), 500);
    },

    loadLesson(id: string): void {
      patchState(store, { loading: true, error: null });
      http.get<BackendLesson>(`${apiBase}/lessons/${id}`)
        .subscribe({
          next: (backend) => {
            const lesson = mapLessonResponse(backend);
            patchState(store, { currentLesson: lesson, loading: false });
          },
          error: (err: unknown) => {
            const status = err instanceof HttpErrorResponse ? err.status : 0;
            const error: LessonLoadError =
              status === 404
                ? { kind: 'not-found', message: 'Lesson not found' }
                : status >= 500
                  ? { kind: 'server', message: 'Could not load lesson' }
                  : { kind: 'unknown', message: 'Could not load lesson' };
            patchState(store, { loading: false, error });
          },
        });
    },

    markModuleComplete(lessonId: string, moduleId: string | number): void {
      const payload = {
        moduleId,
        completedAt: new Date().toISOString(),
      };

      http.put(`${apiBase}/lessons/${lessonId}/progress`, payload)
        .pipe(
          catchError((err: unknown) => {
            console.error('Failed to save module progress', err);
            return EMPTY; 
          })
        )
        .subscribe((response) => { 
          console.log('Progress saved', response);
        });
    }
    
  }))
);