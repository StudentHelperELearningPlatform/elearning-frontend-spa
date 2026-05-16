import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

import {
  CONTENT_API_URL,
  USER_PLATFORM_API_URL,
} from '@core/tokens/api.token';

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

interface RawProfile {
  classes?: TeacherClassSummary[];
  recentActivity?: {
    id?: string;
    type?: 'created' | 'updated' | 'published' | 'archived' | 'deleted';
    contentTitle?: string;
    contentType?: 'lesson' | 'quiz';
    timestamp?: unknown;
  }[];
}

interface RawLesson {
  id?: string;
  title?: string;
  subject?: string;
  status?: ContentStatus;
  updatedAt?: unknown;
  lastModified?: unknown;
}

function safeDate(value: unknown): Date {
  if (!value) return new Date();

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return new Date(value);
  }

  return new Date();
}

export const ContentStore = signalStore(
  { providedIn: 'root' },

  withState<ContentState>(initialState),

  withComputed((state) => ({
    publishedLessons: computed(() =>
      state.lessons().filter((l) => l.status === 'PUBLISHED'),
    ),

    draftLessons: computed(() =>
      state.lessons().filter((l) => l.status === 'DRAFT'),
    ),

    archivedLessons: computed(() =>
      state.lessons().filter((l) => l.status === 'ARCHIVED'),
    ),

    publishedQuizzes: computed(() =>
      state.quizzes().filter((q) => q.status === 'PUBLISHED'),
    ),

    draftQuizzes: computed(() =>
      state.quizzes().filter((q) => q.status === 'DRAFT'),
    ),

    publishedLessonsCount: computed(
      () =>
        state.lessons().filter((l) => l.status === 'PUBLISHED').length,
    ),

    draftLessonsCount: computed(
      () =>
        state.lessons().filter((l) => l.status === 'DRAFT').length,
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

    loadDashboard() {
      patchState(store, {
        loading: true,
        error: null,
      });

      forkJoin({
        lessons: http.get<RawLesson[]>(
          `${contentApi}/lessons`,
        ),

        profile: http.get<RawProfile | null>(
          `${userApi}/teachers/me/profile`,
        ),
      }).subscribe({

        next: ({ lessons, profile }) => {

          const mappedLessons: ContentItem[] =
            (lessons ?? []).map((l) => ({
              id: l.id ?? '',
              title: l.title ?? '',
              subject: l.subject ?? '',
              status: l.status ?? 'DRAFT',

              // suportă și updatedAt și lastModified
              lastModified: safeDate(
                l.updatedAt ?? l.lastModified,
              ),
            }));

          const mappedActivity: RecentActivityItem[] =
            (profile?.recentActivity ?? []).map((a) => ({
              id: a.id ?? '',
              type: a.type ?? 'updated',
              contentTitle: a.contentTitle ?? '',
              contentType: a.contentType ?? 'lesson',
              timestamp: safeDate(a.timestamp),
            }));

          patchState(store, {
            lessons: mappedLessons,

            recentActivity:
              mappedActivity.length > 0
                ? mappedActivity
                : mappedLessons.map((lesson) => ({
                    id: lesson.id,
                    type: 'updated',
                    contentTitle: lesson.title,
                    contentType: 'lesson',
                    timestamp: lesson.lastModified,
                  })),

            classes: profile?.classes ?? [],

            loading: false,
            error: null,
          });
        },

        error: (err: unknown) => {

          const message =
            err instanceof Error
              ? err.message
              : 'Failed to load dashboard';

          patchState(store, {
            loading: false,
            error: message,
          });
        },
      });
    },

    loadContent() {
      patchState(store, { loading: true });

      setTimeout(() => {
        patchState(store, { loading: false });
      }, 300);
    },

    createLesson(
      lesson: Omit<ContentItem, 'id' | 'lastModified'>,
    ) {
      patchState(store, (state) => ({
        lessons: [
          ...state.lessons,
          {
            ...lesson,
            id: crypto.randomUUID(),
            lastModified: new Date(),
          },
        ],
      }));
    },

    updateLesson(
      id: string,
      updates: Partial<Omit<ContentItem, 'id' | 'lastModified'>>,
    ) {
      patchState(store, (state) => ({
        lessons: state.lessons.map((l) =>
          l.id === id
            ? {
                ...l,
                ...updates,
                lastModified: new Date(),
              }
            : l,
        ),
      }));
    },

    deleteLesson(id: string) {
      patchState(store, (state) => ({
        lessons: state.lessons.filter((l) => l.id !== id),
      }));
    },

    createQuiz(
      quiz: Omit<ContentItem, 'id' | 'lastModified'>,
    ) {
      patchState(store, (state) => ({
        quizzes: [
          ...state.quizzes,
          {
            ...quiz,
            id: crypto.randomUUID(),
            lastModified: new Date(),
          },
        ],
      }));
    },

    updateQuiz(
      id: string,
      updates: Partial<Omit<ContentItem, 'id' | 'lastModified'>>,
    ) {
      patchState(store, (state) => ({
        quizzes: state.quizzes.map((q) =>
          q.id === id
            ? {
                ...q,
                ...updates,
                lastModified: new Date(),
              }
            : q,
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