// src/app/features/student/store/lessons.store.ts
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CONTENT_API_URL, USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { BackendLesson, mapLessonResponse } from '../../../api/adapters/lesson.adapter';

export interface FinalQuizAttempt {
  attemptId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
}


export interface Module {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'interactive' | 'image' | 'pdf';
  content: string;
  mediaUrl?: string;
  blockType?: string;
  orderIndex?: number;
}

export interface Subcapitol {
  id: string;
  title: string;
  orderIndex?: number;
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
  /** Price in smallest currency unit (e.g. bani for RON). null = free */
  priceInCents: number | null;
  currency: string;
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
    priceInCents: null,
    currency: 'RON',
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
    priceInCents: null,
    currency: 'RON',
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
    priceInCents: null,
    currency: 'RON',
  },
];

/** Parsed AI explanation returned by POST /api/v1/blocks/{id}/explain */
export interface BlockExplanation {
  simplified_explanation: string;
  analogy: string;
  check_for_understanding_question: string;
}

interface LessonsState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  loading: boolean;
  error: LessonLoadError | null;
  /** Set of module IDs the student has completed in the current session */
  completedModuleIds: Set<string>;
  /** Final quiz attempts for the current lesson; null = not yet loaded */
  finalQuizAttempts: FinalQuizAttempt[] | null;
  attemptsLoading: boolean;
  hasFinalQuiz: boolean | null;
  /** Parsed AI explanation for the currently viewed block */
  explanation: BlockExplanation | null;
  explanationLoading: boolean;
  /** Block ID for which the explanation was last requested */
  explanationBlockId: string | null;
  /** Set of lesson IDs the user has access to */
  accessibleLessonIds: Set<string>;
  accessibleLessonsLoading: boolean;
}

export const LessonsStore = signalStore(
  { providedIn: 'root' },
  withState<LessonsState>({
    lessons: SEED_LESSONS,
    currentLesson: null,
    loading: false,
    error: null,
    completedModuleIds: new Set<string>(),
    finalQuizAttempts: null,
    attemptsLoading: false,
    hasFinalQuiz: null,
    explanation: null,
    explanationLoading: false,
    explanationBlockId: null,
    accessibleLessonIds: new Set<string>(),
    accessibleLessonsLoading: false,
  }),

  withComputed((state) => ({
    publishedLessons: computed(() => state.lessons()),
    lessonCount: computed(() => state.lessons().length),
    completedLessons: computed(() => [] as Lesson[]),
    myLessons: computed(() => {
      const ids = state.accessibleLessonIds();
      return state.lessons().filter((l) => ids.has(l.id));
    }),

    /** True when every module in the current lesson has been marked complete */
    allModulesComplete: computed(() => {
      const lesson = state.currentLesson();
      if (!lesson) return false;
      const allModules = lesson.modules;
      if (!allModules || allModules.length === 0) return true;
      const done = state.completedModuleIds();
      return allModules.every(m => done.has(m.id));
    }),

    /** Derive lesson-card status from completion state */
    lessonCardStatus: computed(() => {
      const lesson = state.currentLesson();
      if (!lesson) return 'not-started';
      const done = state.completedModuleIds();
      const allModules = lesson.modules ?? [];
      const attempts = state.finalQuizAttempts();
      if (attempts && attempts.length > 0) return 'quiz-submitted';
      if (allModules.length > 0 && allModules.every(m => done.has(m.id))) return 'quiz-ready';
      if (done.size > 0) return 'in-progress';
      return 'not-started';
    }),

    lastQuizAttempt: computed(() => {
      const attempts = state.finalQuizAttempts();
      if (!attempts || attempts.length === 0) return null;
      return attempts[attempts.length - 1];
    }),
  })),

  withMethods((
    store,
    http = inject(HttpClient),
    apiBase = inject(CONTENT_API_URL),
    userApiBase = inject(USER_PLATFORM_API_URL),
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

    loadAccessibleLessons(studentId: string): void {
      patchState(store, { accessibleLessonsLoading: true });
      const lessons = store.lessons();
      if (!lessons.length || !studentId) {
        patchState(store, { accessibleLessonsLoading: false });
        return;
      }
      
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const checks = lessons.map(l => {
        if (!uuidRegex.test(l.id)) {
          // If the lesson ID is not a valid UUID (e.g., mock data like "seed-1"),
          // bypass the real backend access check to avoid a 400 Bad Request and assume access is granted.
          return of({ id: l.id, hasAccess: true });
        }
        return http.get<boolean>(`${userApiBase}/payments/access-check`, {
          params: { studentId, lessonId: l.id }
        }).pipe(
          map(hasAccess => ({ id: l.id, hasAccess })),
          catchError(() => of({ id: l.id, hasAccess: false }))
        );
      });

      forkJoin(checks).subscribe({
        next: (results) => {
          const accessibleIds = new Set(results.filter(r => r.hasAccess).map(r => r.id));
          patchState(store, { accessibleLessonIds: accessibleIds, accessibleLessonsLoading: false });
        },
        error: () => {
          patchState(store, { accessibleLessonsLoading: false });
        }
      });
    },

    checkout(studentId: string, lessonId: string): void {
      patchState(store, { loading: true });
      http.post(`${userApiBase}/payments/checkout`, null, {
        params: {
          studentId,
          bundleId: lessonId,
          itemType: 'LESSON',
          itemId: lessonId,
        },
      }).subscribe({
        next: () => {
          patchState(store, { loading: false });
        },
        error: () => {
          patchState(store, {
            loading: false,
            error: { kind: 'unknown', message: 'Failed to initiate unlock. Please try again.' },
          });
        },
      });
    },

    loadLesson(id: string): void {
      patchState(store, { loading: true, error: null, currentLesson: null });
      http.get<unknown>(`${apiBase}/lessons/${id}`).subscribe({
        next: (response) => {
          console.log(`[LessonsStore] Single Lesson API Response (${id}):`, response);
          let data = response;
          if (response && (response as Record<string, unknown>)['lesson']) {
            data = (response as Record<string, unknown>)['lesson'];
          } else if (
            response &&
            (response as Record<string, unknown>)['content'] &&
            !Array.isArray((response as Record<string, unknown>)['content'])
          ) {
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
          patchState(store, { loading: false, error: { kind, message } });
        },
      });
    },

    markModuleCompleteLocally(moduleId: string): void {
      patchState(store, (s) => ({
        completedModuleIds: new Set([...s.completedModuleIds, moduleId]),
      }));
    },

    markModuleComplete(lessonId: string, moduleId: string): void {
      // Track locally so allModulesComplete updates immediately
      patchState(store, (s) => ({
        completedModuleIds: new Set([...s.completedModuleIds, moduleId]),
      }));
    },

    completeLesson(lessonId: string): void {
      http.post(`${apiBase}/lessons/${lessonId}/complete`, {}).subscribe({
        next: () => { /* lesson marked complete */ },
        error: (err) => {
          console.error('Failed to complete lesson', err);
        },
      });
    },

    /**
     * Load the final quiz attempt history for a lesson.
     * Used by the lesson viewer to check whether the student already submitted.
     * Endpoint: GET /api/v1/lessons/{id}/final-quiz/attempts
     */
    loadFinalQuizAttempts(lessonId: string): void {
      patchState(store, { attemptsLoading: true });
      http.get<FinalQuizAttempt[]>(`${apiBase}/lessons/${lessonId}/final-quiz/attempts`).subscribe({
        next: (attempts) => {
          patchState(store, { finalQuizAttempts: attempts, attemptsLoading: false, hasFinalQuiz: true });
        },
        error: (err) => {
          // Treat as no attempts on error — don't block the lesson viewer
          // If error status is 404, we know there is no final quiz.
          const is404 = err?.status === 404;
          patchState(store, {
            finalQuizAttempts: [],
            attemptsLoading: false,
            hasFinalQuiz: !is404,
          });
        },
      });
    },

    /** Reset completion tracking (e.g. when leaving the lesson) */
    clearCompletionState(): void {
      patchState(store, { completedModuleIds: new Set<string>(), finalQuizAttempts: null, hasFinalQuiz: null });
    },

    /**
     * Request an AI explanation for a text block.
     * Endpoint: POST /api/v1/blocks/{id}/explain  (no body)
     * Accessible by both students and teachers.
     */
    explainBlock(blockId: string): void {
      patchState(store, { explanationLoading: true, explanation: null, explanationBlockId: blockId });
      // Response shape: { content: "{\"simplified_explanation\":\"...\",\"analogy\":\"...\",\"check_for_understanding_question\":\"...\"}" }
      http.post<{ content: string }>(`${apiBase}/blocks/${blockId}/explain`, null).subscribe({
        next: (res) => {
          try {
            const parsed: BlockExplanation = JSON.parse(res.content);
            patchState(store, { explanation: parsed, explanationLoading: false });
          } catch {
            patchState(store, {
              explanation: {
                simplified_explanation: res.content ?? 'No explanation returned.',
                analogy: '',
                check_for_understanding_question: '',
              },
              explanationLoading: false,
            });
          }
        },
        error: () => {
          patchState(store, {
            explanation: {
              simplified_explanation: 'Could not load the explanation. Please try again.',
              analogy: '',
              check_for_understanding_question: '',
            },
            explanationLoading: false,
          });
        },
      });
    },

    /** Clear explanation state when closing the panel */
    clearExplanation(): void {
      patchState(store, { explanation: null, explanationBlockId: null });
    },
  }))
);