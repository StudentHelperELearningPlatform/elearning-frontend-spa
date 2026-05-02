import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';

export interface Block {
  id: string;
  title: string;
  blockType: 'VIDEO' | 'TEXT' | 'QUIZ' | 'INTERACTIVE' | 'AUDIO' | 'IMAGE';
  content: string;
  mediaUrl?: string;
}

export interface Subcapitol {
  id: string;
  title: string;
  blocks: Block[];
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
        subcapitols: [
          {
            id: 'sc1',
            title: 'Introduction',
            blocks: [
              { id: 'm1', title: 'What are fractions?', blockType: 'VIDEO', content: 'Fractions represent parts of a whole.', mediaUrl: 'https://example.com/video1.mp4' }
            ]
          }
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
        subcapitols: [
          {
            id: 'sc2',
            title: 'Adding like fractions',
            blocks: [
              { id: 'm2', title: 'Adding like fractions', blockType: 'TEXT', content: 'To add fractions with the same denominator, add the numerators.' },
              { id: 'm3', title: 'Practice Quiz', blockType: 'QUIZ', content: 'Solve these problems.' }
            ]
          }
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
  withMethods((store) => ({
    loadLessons() {
      patchState(store, { loading: true });
      setTimeout(() => patchState(store, { loading: false }), 500);
    },
    loadLesson(id: string) {
      patchState(store, { loading: true });
      setTimeout(() => {
        const lesson = store.lessons().find(l => l.id === id);
        patchState(store, { currentLesson: lesson, loading: false });
      }, 500);
    }
  }))
);
