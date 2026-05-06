import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core'; // Adăugat inject
import { HttpClient } from '@angular/common/http'; // Adăugat HttpClient
import { catchError, EMPTY } from 'rxjs'; // Adăugate importurile RxJS
import { environment } from '../../../../environments/environment'; 

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

interface LessonsState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  loading: boolean;
  error: string | null;
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
      patchState(store, { loading: true, error: null });
      http.get<Lesson[]>(`${environment.apiUrl}/lessons`)
        .pipe(
          catchError((err: unknown) => {
            patchState(store, { loading: false, error: 'Failed to load lessons' });
            return EMPTY;
          })
        )
        .subscribe((lessons) => {
          patchState(store, { lessons, loading: false });
        });
    },

    // Metoda restaurată pentru a încărca o singură lecție
    loadLesson(id: string): void {
      patchState(store, { loading: true, error: null });
      http.get<Lesson>(`${environment.apiUrl}/lessons/${id}`)
        .pipe(
          catchError((err: unknown) => {
            patchState(store, { loading: false, error: 'Failed to load lesson' });
            return EMPTY;
          })
        )
        .subscribe((lesson) => {
          patchState(store, { currentLesson: lesson, loading: false });
        });
    },

    // Metoda nouă pentru progres (INT-02)
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