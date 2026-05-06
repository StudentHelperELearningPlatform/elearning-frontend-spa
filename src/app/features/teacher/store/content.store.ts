import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { Question } from '@shared/models/quiz.types';

export type { Question };

export interface ContentItem {
  id: string;
  title: string;
  subject: string;
  status: 'PUBLISHED' | 'DRAFT';
  lastModified: Date;
  content?: string;
  media?: string[];
  questions?: Question[];
}

interface ContentState {
  lessons: ContentItem[];
  quizzes: ContentItem[];
  loading: boolean;
}

export const ContentStore = signalStore(
  { providedIn: 'root' },
  withState<ContentState>({
    lessons: [
      { id: '1', title: 'Intro to Fractions', subject: 'Math', status: 'PUBLISHED', lastModified: new Date() },
      { id: '2', title: 'Photosynthesis', subject: 'Science', status: 'DRAFT', lastModified: new Date() },
      { id: '3', title: 'World War II', subject: 'History', status: 'PUBLISHED', lastModified: new Date() }
    ],
    quizzes: [
      { id: '1', title: 'Fractions Quiz', subject: 'Math', status: 'DRAFT', lastModified: new Date() }
    ],
    loading: false,
  }),
  withComputed((state) => ({
    publishedLessons: computed(() => state.lessons().filter(l => l.status === 'PUBLISHED')),
    draftLessons: computed(() => state.lessons().filter(l => l.status === 'DRAFT')),
    publishedQuizzes: computed(() => state.quizzes().filter(q => q.status === 'PUBLISHED')),
    draftQuizzes: computed(() => state.quizzes().filter(q => q.status === 'DRAFT')),
  })),
  withMethods((store) => ({
    loadContent() {
      patchState(store, { loading: true });
      setTimeout(() => patchState(store, { loading: false }), 500);
    },
    createLesson(lesson: Omit<ContentItem, 'id' | 'lastModified'>) {
      patchState(store, (state) => ({
        lessons: [...state.lessons, { ...lesson, id: crypto.randomUUID(), lastModified: new Date() }]
      }));
    },
    updateLesson(id: string, updates: Partial<Omit<ContentItem, 'id' | 'lastModified'>>) {
      patchState(store, (state) => ({
        lessons: state.lessons.map((l: ContentItem) => l.id === id ? { ...l, ...updates, lastModified: new Date() } : l)
      }));
    },
    deleteLesson(id: string) {
      patchState(store, (state) => ({
        lessons: state.lessons.filter((l: ContentItem) => l.id !== id)
      }));
    },
    createQuiz(quiz: Omit<ContentItem, 'id' | 'lastModified'>) {
      patchState(store, (state) => ({
        quizzes: [...state.quizzes, { ...quiz, id: crypto.randomUUID(), lastModified: new Date() }]
      }));
    },
    updateQuiz(id: string, updates: Partial<Omit<ContentItem, 'id' | 'lastModified'>>) {
      patchState(store, (state) => ({
        quizzes: state.quizzes.map((q: ContentItem) => q.id === id ? { ...q, ...updates, lastModified: new Date() } : q)
      }));
    },
    deleteQuiz(id: string) {
      patchState(store, (state) => ({
        quizzes: state.quizzes.filter((q: ContentItem) => q.id !== id)
      }));
    }
  }))
);
