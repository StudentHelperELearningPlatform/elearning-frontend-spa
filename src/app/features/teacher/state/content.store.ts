import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
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

interface DashboardResponse {
  lessons: ContentItem[];
  quizzes: ContentItem[];
  recentActivity: RecentActivityItem[];
  classes: TeacherClassSummary[];
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

const reviveDates = (data: DashboardResponse): DashboardResponse => ({
  lessons: data.lessons.map((l) => ({ ...l, lastModified: new Date(l.lastModified) })),
  quizzes: data.quizzes.map((q) => ({ ...q, lastModified: new Date(q.lastModified) })),
  recentActivity: data.recentActivity.map((a) => ({
    ...a,
    timestamp: new Date(a.timestamp),
  })),
  classes: data.classes,
});

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
  withMethods((store, http = inject(HttpClient), apiBase = inject(USER_PLATFORM_API_URL)) => ({
    loadDashboard(teacherId: string) {
      patchState(store, { loading: true, error: null });
      http
        .get<DashboardResponse>(`${apiBase}/teachers/me/profile`) // Using profile as proxy for dashboard data for now
        .subscribe({
          next: (data: any) => {
            // Handle both DashboardResponse and TeacherProfileResponse
            const lessons = data.lessons || [];
            const quizzes = data.quizzes || [];
            const recentActivity = data.recentActivity || [];
            const classes = data.classes || [];

            const revivedLessons = lessons.map((l: any) => ({ ...l, lastModified: new Date(l.lastModified || Date.now()) }));
            const revivedQuizzes = quizzes.map((q: any) => ({ ...q, lastModified: new Date(q.lastModified || Date.now()) }));
            const revivedActivity = recentActivity.map((a: any) => ({ ...a, timestamp: new Date(a.timestamp || Date.now()) }));

            patchState(store, {
              lessons: revivedLessons,
              quizzes: revivedQuizzes,
              recentActivity: revivedActivity,
              classes: classes,
              loading: false,
            });
          },
          error: (err: unknown) => {
            const message = err instanceof Error ? err.message : 'Failed to load dashboard';
            patchState(store, { loading: false, error: message });
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
