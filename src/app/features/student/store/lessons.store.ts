import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BackendLesson, mapLessonResponse } from '../../../api/adapters/lesson.adapter';

export interface Module {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'interactive' | 'audio' | 'image';
  content: string;
  mediaUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  grade: number;
  difficulty: string;
  duration: string;
  status: string;
  modules: Module[];
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
    lessons: [
      { 
        id: '1', 
        title: 'Intro to Fractions', 
        subject: 'Math', 
        grade: 5, 
        difficulty: 'Easy', 
        duration: '15 min', 
        status: 'Not Started',
        modules: [
          { id: 'm1', title: 'What are fractions?', type: 'video', content: 'Fractions represent parts of a whole.', mediaUrl: 'https://example.com/video1.mp4' }
        ]
      },
      { 
        id: '2', 
        title: 'Adding Fractions', 
        subject: 'Math', 
        grade: 5, 
        difficulty: 'Medium', 
        duration: '20 min', 
        status: 'In Progress',
        modules: [
          { id: 'm2', title: 'Adding like fractions', type: 'text', content: 'To add fractions with the same denominator, add the numerators.' },
          { id: 'm3', title: 'Practice Quiz', type: 'quiz', content: 'Solve these problems.' }
        ]
      }
    ],
    currentLesson: null,
    loading: false,
    error: null,
  }),
  withComputed((state) => ({
    publishedLessons: computed(() => state.lessons()),
    lessonCount: computed(() => state.lessons().length),
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    
    loadLessons(): void {
      patchState(store, { loading: true });
      setTimeout(() => patchState(store, { loading: false }), 500);
    },

    loadLesson(id: string): void {
      patchState(store, { loading: true, error: null });
      http.get<BackendLesson>(`${environment.apiUrl}/lessons/${id}`)
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

      http.put(`${environment.apiUrl}/lessons/${lessonId}/progress`, payload)
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