import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CONTENT_API_URL, USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { BackendLesson, mapLessonResponse } from '../../../api/adapters/lesson.adapter';

export interface Module {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'interactive' | 'audio' | 'image';
  content: string;
  mediaUrl?: string;
  blockType?: string;
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
  description: string;
  subcapitols?: Subcapitol[];
  modules: Module[];
}

export interface LessonHistoryItem {
  id: string;
  lessonId: string;
  startedAt: string;
  completedAt: string | null;
}

export interface LessonLoadError {
  kind: 'not-found' | 'server' | 'unknown';
  message: string;
}

// Seed lessons keep the catalog populated before the first API call completes,
// so the lesson-list UI shows content immediately rather than an empty state.
const SEED_LESSONS: Lesson[] = [
  {
    id: 'seed-1',
    title: 'Introduction to Fractions',
    subject: 'Math',
    grade: 5,
    difficulty: 'Easy',
    duration: '15 min',
    status: 'Not Started',
    description: 'Learn the basics of fractions, including numerators and denominators.',
    modules: [],
  },
  {
    id: 'seed-2',
    title: 'The Water Cycle',
    subject: 'Science',
    grade: 4,
    difficulty: 'Medium',
    duration: '20 min',
    status: 'Not Started',
    description: 'Explore how water moves through our planet in this engaging science lesson.',
    modules: [],
  },
  {
    id: 'seed-3',
    title: 'World War II Overview',
    subject: 'History',
    grade: 6,
    difficulty: 'Medium',
    duration: '25 min',
    status: 'Not Started',
    description: 'A comprehensive look at the key events and figures of the second World War.',
    modules: [],
  },
];


interface LessonsState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  loading: boolean;
  error: LessonLoadError | null;
}

export const LessonsStore = signalStore(
  { providedIn: 'root' },
  withState<LessonsState>({
    lessons: SEED_LESSONS,
    currentLesson: null,
    loading: false,
    error: null,
  }),

  withComputed((state) => ({
    publishedLessons: computed(() => state.lessons()),
    lessonCount: computed(() => state.lessons().length),
    // Since history is removed, these will be empty for now
    completedLessons: computed(() => [] as Lesson[]),
    myLessons: computed(() => state.lessons()),
  })),

  withMethods((
    store, 
    http = inject(HttpClient), 
    apiBase = inject(CONTENT_API_URL)
  ) => ({

    loadLessons(): void {
      patchState(store, { loading: true });
      http.get<unknown>(`${apiBase}/lessons`).subscribe({
        next: (response) => {
          console.log('[LessonsStore] API Response:', response);
          let data: BackendLesson[] = [];
          
          if (Array.isArray(response)) {
            data = response as BackendLesson[];
          } else if (response && Array.isArray((response as Record<string, unknown>)['content'])) {
            data = (response as Record<string, unknown>)['content'] as BackendLesson[];
          } else if (response && Array.isArray((response as Record<string, unknown>)['lessons'])) {
            data = (response as Record<string, unknown>)['lessons'] as BackendLesson[];
          } else if (response && typeof response === 'object' && (response as Record<string, unknown>)['id']) {
            data = [response as unknown as BackendLesson];
          }

          console.log('[LessonsStore] Parsed data array length:', data.length);
          const lessons = data.map(mapLessonResponse);
          patchState(store, { lessons, loading: false });
        },
        error: (err) => {
          console.error('[LessonsStore] Failed to load lessons:', err);
          patchState(store, { loading: false });
        },
      });
    },

    checkout(studentId: string, lessonId: string): void {
      patchState(store, { loading: true });
      http.post(`${inject(USER_PLATFORM_API_URL)}/payments/checkout`, null, {
        params: { 
          studentId, 
          bundleId: lessonId, 
          itemType: 'LESSON', 
          itemId: lessonId 
        }
      }).subscribe({
        next: () => {
          patchState(store, { loading: false });
        },
        error: () => {
          patchState(store, { 
            loading: false, 
            error: { kind: 'unknown', message: 'Failed to initiate unlock. Please try again.' } 
          });
        }
      });
    },

    loadLesson(id: string): void {
      patchState(store, { loading: true, error: null, currentLesson: null });
      http.get<unknown>(`${apiBase}/lessons/${id}`)
        .subscribe({
          next: (response) => {
            console.log(`[LessonsStore] Single Lesson API Response (${id}):`, response);
            let data = response;
            if (response && (response as Record<string, unknown>)['lesson']) {
              data = (response as Record<string, unknown>)['lesson'];
            } else if (response && (response as Record<string, unknown>)['content'] && !Array.isArray((response as Record<string, unknown>)['content'])) {
              data = (response as Record<string, unknown>)['content'];
            }

            const currentLesson = mapLessonResponse(data as unknown as BackendLesson);
            patchState(store, { currentLesson, loading: false });
          },
          error: (err: HttpErrorResponse) => {
            console.error(`[LessonsStore] Failed to load lesson ${id}:`, err);
            let kind: LessonLoadError['kind'] = 'unknown';
            let message = 'Unknown error';
            if (err.status === 404) {
              kind = 'not-found';
              message = 'Lesson not found';
            } else if (err.status >= 500) {
              kind = 'server';
              message = 'Server error';
            }
            
            patchState(store, { 
              loading: false, 
              error: { kind, message } 
            });
          },
        });
    },

    markModuleComplete(lessonId: string, moduleId: string): void {
      http.put(`${apiBase}/lessons/${lessonId}/progress`, {
        moduleId,
        completedAt: new Date().toISOString(),
      }).subscribe({
        next: () => { /* progress saved — no state change needed */ },
        error: (err) => {
          console.error('Failed to save module progress', err);
        },
      });
    },
  }))
);