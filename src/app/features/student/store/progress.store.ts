import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tapResponse } from '@ngrx/operators';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

// ---------------------------------------------------------------------------
// Domain models (Sprint 6 & Legacy)
// ---------------------------------------------------------------------------

export {
  type ProgressRecord,
  type SkillLevel,
  type StreakData,
  type Milestone,
  type ActivityItem,
  type UpcomingQuiz,
  type StudentSummary,
} from '@shared/models/progress.model';

import {
  ProgressRecord,
  SkillLevel,
  StreakData,
  Milestone,
  ActivityItem,
  UpcomingQuiz,
  StudentSummary,
} from '@shared/models/progress.model';

export interface LessonProgress {
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score: number | null;
  dateCompleted: string | null;
}

export interface DashboardData {
  student: StudentSummary | null;
  skillLevels: SkillLevel[];
  streak: StreakData | null;
  progressRecords: ProgressRecord[];
  recentActivity: ActivityItem[];
  milestones: Milestone[];
  upcomingQuizzes: UpcomingQuiz[];
  
  // Proprietăți din vechiul tău DashboardData (Sprint 6 live endpoints)
  totalLessons?: number;
  completedLessons?: number;
  averageScore?: number;
  lastActive?: string | null;
}

export interface LessonStats {
  lessonId: string;
  classId: string;
  totalStudents: number;
  completedCount: number;
  averageScore: number;
  completionRate: number;
}

export interface StudentDetailEntry {
  className: string;
  lessonTitle: string;
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score: number | null;
  dateCompleted: string | null;
}

export interface StudentHistory {
  studentId: string;
  studentName: string;
  history: StudentDetailEntry[];
}

// ---------------------------------------------------------------------------
// Store state
// ---------------------------------------------------------------------------

export interface ProgressState {
  // Student dashboard (S6 Live)
  dashboard: DashboardData | null;
  dashboardLoading: boolean;
  dashboardError: string | null;

  // Lesson stats
  lessonStats: LessonStats | null;
  lessonStatsLoading: boolean;
  lessonStatsError: string | null;

  // Mark complete
  markCompleteLoading: boolean;
  markCompleteError: string | null;

  // Professor: all students
  students: StudentSummary[];
  studentsLoading: boolean;
  studentsError: string | null;

  // Professor: single student detail
  selectedStudent: StudentDetailEntry[] | null;
  selectedStudentId: string | null;
  selectedStudentLoading: boolean;
  selectedStudentError: string | null;

  // Professor: student history
  studentHistory: StudentHistory | null;
  studentHistoryLoading: boolean;
  studentHistoryError: string | null;

  // Legacy state (develop — used by progress-dashboard component)
  student: StudentSummary | null;
  skillLevels: SkillLevel[];
  streak: StreakData | null;
  progressRecords: ProgressRecord[];
  recentActivity: ActivityItem[];
  milestones: Milestone[];
  upcomingQuizzes: UpcomingQuiz[];
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  dashboard: null,
  dashboardLoading: false,
  dashboardError: null,

  lessonStats: null,
  lessonStatsLoading: false,
  lessonStatsError: null,

  markCompleteLoading: false,
  markCompleteError: null,

  students: [],
  studentsLoading: false,
  studentsError: null,

  selectedStudent: null,
  selectedStudentId: null,
  selectedStudentLoading: false,
  selectedStudentError: null,

  studentHistory: null,
  studentHistoryLoading: false,
  studentHistoryError: null,

  // Legacy
  student: null,
  skillLevels: [],
  streak: null,
  progressRecords: [],
  recentActivity: [],
  milestones: [],
  upcomingQuizzes: [],
  loading: false,
  error: null,
};

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const ProgressStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    // Sprint 6 (Cu fallback inteligent spre Legacy)
    completionRate: computed(() => {
      // Prioritizează datele live din dashboard (S6)
      const dash = store.dashboard();
      if (dash && dash.totalLessons) {
        return Math.round(((dash.completedLessons ?? 0) / dash.totalLessons) * 100);
      }
      
      // Fallback la datele vechi (student)
      const s = store.student();
      if (!s || !s.totalLessons) return 0;
      return Math.round((s.completedLessons / s.totalLessons) * 100);
    }),

    studentsFiltered: computed(() => store.students()),

    // Legacy (develop)
    firstName: computed(() => store.student()?.firstName ?? null),

    overallProgressPercent: computed(() => {
      const s = store.student();
      if (!s || !s.totalLessons) return 0;
      return Math.round((s.completedLessons / s.totalLessons) * 100);
    }),

    activeStreak: computed(() => store.streak()?.currentStreak ?? 0),

    recentMilestones: computed(() => {
  return [...store.milestones()]
    .filter((m) => m.earnedAt != null)
    .sort((a, b) => new Date(b.earnedAt ?? '').getTime() - new Date(a.earnedAt ?? '').getTime())
    .slice(0, 3);
}),

    continueLesson: computed((): ProgressRecord | null => {
      const inProgress = store.progressRecords().filter((r) => r.status === 'IN_PROGRESS');
      if (!inProgress.length) return null;
      return inProgress.reduce((latest, r) =>
        new Date(r.lastAccessedAt).getTime() > new Date(latest.lastAccessedAt).getTime() ? r : latest
      );
    }),
  })),

  withMethods((store, http = inject(HttpClient), apiBase = inject(USER_PLATFORM_API_URL)) => ({
    
    // ── Legacy (apelat de progress-dashboard.component.ts) ─────────────
    loadDashboard(studentId: string) {
      patchState(store, { loading: true, error: null, dashboardLoading: true });
      http.get<DashboardData>(`${apiBase}/students/${studentId}/dashboard`).subscribe({
        next: (data) => {
          patchState(store, {
            student: data.student ?? null,
            skillLevels: data.skillLevels ?? [],
            streak: data.streak ?? null,
            progressRecords: data.progressRecords ?? [],
            recentActivity: data.recentActivity ?? [],
            milestones: data.milestones ?? [],
            upcomingQuizzes: data.upcomingQuizzes ?? [],
            loading: false,
            dashboardLoading: false,
            error: null,
          });
        },
        error: () => {
          patchState(store, { loading: false, dashboardLoading: false, error: 'Failed to load dashboard data.' });
        },
      });
    },

    // ── Sprint 6 live endpoints ──────────────────────────────────────────────

    loadMyDashboard: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { dashboardLoading: true, dashboardError: null })),
        switchMap(() =>
          http.get<DashboardData>(`${apiBase}/progress/me/dashboard`).pipe(
            tapResponse({
              next: (dashboard) => patchState(store, { dashboard, dashboardLoading: false }),
              error: (err: { message?: string }) => patchState(store, { dashboardLoading: false, dashboardError: err?.message ?? 'Failed to load dashboard' }),
            })
          )
        )
      )
    ),

    markLessonComplete: rxMethod<{ lessonId: string; score?: number }>(
      pipe(
        tap(() => patchState(store, { markCompleteLoading: true, markCompleteError: null })),
        switchMap(({ lessonId, score }) =>
          http.put<LessonProgress>(`${apiBase}/lessons/${lessonId}/progress`, { status: 'completed', score: score ?? null }).pipe(
            tapResponse({
              next: () => patchState(store, { markCompleteLoading: false }),
              error: (err: { message?: string }) => patchState(store, { markCompleteLoading: false, markCompleteError: err?.message ?? 'Failed to mark lesson complete' }),
            })
          )
        )
      )
    ),

    loadLessonStats: rxMethod<{ classId: string; lessonId: string }>(
      pipe(
        tap(() => patchState(store, { lessonStatsLoading: true, lessonStatsError: null })),
        switchMap(({ classId, lessonId }) =>
          http.get<LessonStats>(`${apiBase}/progress/classes/${classId}/lessons/${lessonId}/stats`).pipe(
            tapResponse({
              next: (lessonStats) => patchState(store, { lessonStats, lessonStatsLoading: false }),
              error: (err: { message?: string }) => patchState(store, { lessonStatsLoading: false, lessonStatsError: err?.message ?? 'Failed to load lesson stats' }),
            })
          )
        )
      )
    ),

    loadStudents: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { studentsLoading: true, studentsError: null })),
        switchMap(() =>
          http.get<StudentSummary[]>(`${apiBase}/progress/professor/students`).pipe(
            tapResponse({
              next: (students) => patchState(store, { students, studentsLoading: false }),
              error: (err: { message?: string }) => patchState(store, { studentsLoading: false, studentsError: err?.message ?? 'Failed to load students' }),
            })
          )
        )
      )
    ),

    loadStudentDetail: rxMethod<{ studentId: string }>(
      pipe(
        tap(({ studentId }) => patchState(store, { selectedStudentLoading: true, selectedStudentError: null, selectedStudentId: studentId })),
        switchMap(({ studentId }) =>
          http.get<StudentDetailEntry[]>(`${apiBase}/progress/professor/students/${studentId}`).pipe(
            tapResponse({
              next: (selectedStudent) => patchState(store, { selectedStudent, selectedStudentLoading: false }),
              error: (err: { message?: string }) => patchState(store, { selectedStudentLoading: false, selectedStudentError: err?.message ?? 'Failed to load student detail' }),
            })
          )
        )
      )
    ),

    loadStudentHistory: rxMethod<{ studentId: string }>(
      pipe(
        tap(() => patchState(store, { studentHistoryLoading: true, studentHistoryError: null })),
        switchMap(({ studentId }) =>
          http.get<StudentHistory>(`${apiBase}/progress/professor/students/${studentId}/history`).pipe(
            tapResponse({
              next: (studentHistory) => patchState(store, { studentHistory, studentHistoryLoading: false }),
              error: (err: { message?: string }) => patchState(store, { studentHistoryLoading: false, studentHistoryError: err?.message ?? 'Failed to load student history' }),
            })
          )
        )
      )
    ),
  }))
);