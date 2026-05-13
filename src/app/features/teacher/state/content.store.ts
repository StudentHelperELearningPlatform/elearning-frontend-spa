import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CONTENT_API_URL, USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { Question } from '@shared/models/quiz.types';

export type { Question };

export type ContentStatus = 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';

export interface ContentItem {
  id: string;
  title: string;
  subject: string;
  grade?: number | string;
  status: ContentStatus;
  lastModified: Date;
  content?: string;
  media?: string[];
  questions?: Question[];
}

export interface RecentActivityItem {
  id: string;
  type: 'created' | 'updated' | 'published' | 'archived' | 'deleted';
  contentTitle: string;
  contentType: 'lesson' | 'quiz';
  timestamp: Date;
}

export interface TeacherClassSummary {
  id: string;
  name: string;
  studentCount: number;
  averageProgress: number;
}

interface ContentState {
  lessons: ContentItem[];
  quizzes: ContentItem[];
  recentActivity: RecentActivityItem[];
  classes: TeacherClassSummary[];
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  lessons: [],
  quizzes: [],
  recentActivity: [],
  classes: [],
  loading: false,
  error: null,
};

export const ContentStore = signalStore(
  { providedIn: 'root' },
  withState<ContentState>(initialState),
  withComputed((state) => ({
    publishedLessons: computed(() => state.lessons().filter((l) => l.status === 'PUBLISHED')),
    draftLessons: computed(() => state.lessons().filter((l) => l.status === 'DRAFT')),
    archivedLessons: computed(() => state.lessons().filter((l) => l.status === 'ARCHIVED')),
    publishedQuizzes: computed(() => state.quizzes().filter((q) => q.status === 'PUBLISHED')),
    draftQuizzes: computed(() => state.quizzes().filter((q) => q.status === 'DRAFT')),
    publishedLessonsCount: computed(
      () => state.lessons().filter((l) => l.status === 'PUBLISHED').length,
    ),
    draftLessonsCount: computed(
      () => state.lessons().filter((l) => l.status === 'DRAFT').length,
    ),
    totalLessonsCount: computed(() => state.lessons().length),
    totalQuizzesCount: computed(() => state.quizzes().length),
  })),
  withMethods((
    store,
    http = inject(HttpClient),
    contentApi = inject(CONTENT_API_URL),
    userApi = inject(USER_PLATFORM_API_URL),
  ) => ({
 loadDashboard: () => {
  patchState(store, { loading: true, error: null });

  forkJoin({
    lessons: http.get<any[]>(`${contentApi}/lessons`).pipe(
      catchError(() => of([]))
    ),
    profile: http.get<any>(`${userApi}/teachers/me/profile`).pipe(
      catchError(() => of(null))
    ),
  }).subscribe({
    next: ({ lessons, profile }) => {
      const rawLessons = Array.isArray(lessons) ? lessons : [];

      const mappedLessons: ContentItem[] = rawLessons.map((l: any) => ({
        id: l.id,
        title: l.title,
        subject: l.subject,
        status: l.status ?? 'DRAFT',
        lastModified: new Date(l.updatedAt ?? Date.now()),
      }));

      patchState(store, {
        lessons: mappedLessons,
        classes: profile?.classes ?? [],
        loading: false,
        error: null,
      });
    },
    error: (err: any) => {
      patchState(store, {
        loading: false,
        error: err?.message ?? 'Failed to load dashboard',
      });
    },
  });
},
    loadContent() {
      patchState(store, { loading: true });
      setTimeout(() => patchState(store, { loading: false }), 300);
    },

    createLesson(lesson: Omit<ContentItem, 'id' | 'lastModified'>) {
      patchState(store, (state) => ({
        lessons: [
          ...state.lessons,
          { ...lesson, id: crypto.randomUUID(), lastModified: new Date() },
        ],
      }));
    },

    updateLesson(id: string, updates: Partial<Omit<ContentItem, 'id' | 'lastModified'>>) {
      patchState(store, (state) => ({
        lessons: state.lessons.map((l) =>
          l.id === id ? { ...l, ...updates, lastModified: new Date() } : l,
        ),
      }));
    },

    deleteLesson(id: string) {
      patchState(store, (state) => ({
        lessons: state.lessons.filter((l) => l.id !== id),
      }));
    },

    createQuiz(quiz: Omit<ContentItem, 'id' | 'lastModified'>) {
      patchState(store, (state) => ({
        quizzes: [
          ...state.quizzes,
          { ...quiz, id: crypto.randomUUID(), lastModified: new Date() },
        ],
      }));
    },

    updateQuiz(id: string, updates: Partial<Omit<ContentItem, 'id' | 'lastModified'>>) {
      patchState(store, (state) => ({
        quizzes: state.quizzes.map((q) =>
          q.id === id ? { ...q, ...updates, lastModified: new Date() } : q,
        ),
      }));
    },

    deleteQuiz(id: string) {
      patchState(store, (state) => ({
        quizzes: state.quizzes.filter((q) => q.id !== id),
      }));
    },

    reset() {
      patchState(store, initialState);
    },
  })),
);