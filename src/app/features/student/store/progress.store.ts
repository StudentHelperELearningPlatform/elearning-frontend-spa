import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tapResponse } from '@ngrx/operators';
import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

// Domain models
export interface LessonProgress {
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score: number | null;
  dateCompleted: string | null;
}

export interface DashboardData {
  totalLessons: number;
  completedLessons: number;
  averageScore: number;
  lastActive: string | null;
  recentActivity: LessonProgress[];
}

export interface LessonStats {
  lessonId: string;
  classId: string;
  totalStudents: number;
  completedCount: number;
  averageScore: number;
  completionRate: number;
}

export interface StudentSummary {
  studentId: string;
  studentName: string;
  classesEnrolled: number;
  totalLessonsCompleted: number;
  averageScore: number;
  lastActive: string | null;
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
  // Student dashboard
  dashboard: DashboardData | null;
  dashboardLoading: boolean;
  dashboardError: string | null;

  // Lesson stats (for Stelica)
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
};

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const ProgressStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    completionRate: computed(() => {
      const dash = store.dashboard();
      if (!dash || dash.totalLessons === 0) return 0;
      return Math.round((dash.completedLessons / dash.totalLessons) * 100);
    }),

    studentsFiltered: computed(() => store.students()),
  })),

 withMethods((store, http = inject(HttpClient)) => ({
    markLessonComplete: rxMethod<{ lessonId: string; score?: number }>(
      pipe(
        tap(() => patchState(store, { markCompleteLoading: true, markCompleteError: null })),
        switchMap(({ lessonId, score }) =>
          http
            .put<LessonProgress>(
              `${environment.apiBase}/lessons/${lessonId}/progress`,
              { status: 'completed', score: score ?? null },
            )
            .pipe(
              tapResponse({
                next: () => patchState(store, { markCompleteLoading: false }),
                error: (err: { message?: string }) =>
                  patchState(store, {
                    markCompleteLoading: false,
                    markCompleteError: err?.message ?? 'Failed to mark lesson complete',
                  }),
              }),
            ),
        ),
      ),
    ),

    loadDashboard: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { dashboardLoading: true, dashboardError: null })),
        switchMap(() =>
          http
            .get<DashboardData>(`${environment.apiBase}/progress/me/dashboard`)
            .pipe(
              tapResponse({
                next: (dashboard) =>
                  patchState(store, { dashboard, dashboardLoading: false }),
                error: (err: { message?: string }) =>
                  patchState(store, {
                    dashboardLoading: false,
                    dashboardError: err?.message ?? 'Failed to load dashboard',
                  }),
              }),
            ),
        ),
      ),
    ),

    loadLessonStats: rxMethod<{ classId: string; lessonId: string }>(
      pipe(
        tap(() => patchState(store, { lessonStatsLoading: true, lessonStatsError: null })),
        switchMap(({ classId, lessonId }) =>
          http
            .get<LessonStats>(
              `${environment.apiBase}/progress/classes/${classId}/lessons/${lessonId}/stats`,
            )
            .pipe(
              tapResponse({
                next: (lessonStats) =>
                  patchState(store, { lessonStats, lessonStatsLoading: false }),
                error: (err: { message?: string }) =>
                  patchState(store, {
                    lessonStatsLoading: false,
                    lessonStatsError: err?.message ?? 'Failed to load lesson stats',
                  }),
              }),
            ),
        ),
      ),
    ),

    loadStudents: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { studentsLoading: true, studentsError: null })),
        switchMap(() =>
          http
            .get<StudentSummary[]>(`${environment.apiBase}/progress/professor/students`)
            .pipe(
              tapResponse({
                next: (students) =>
                  patchState(store, { students, studentsLoading: false }),
                error: (err: { message?: string }) =>
                  patchState(store, {
                    studentsLoading: false,
                    studentsError: err?.message ?? 'Failed to load students',
                  }),
              }),
            ),
        ),
      ),
    ),

    loadStudentDetail: rxMethod<{ studentId: string }>(
      pipe(
        tap(({ studentId }) =>
          patchState(store, {
            selectedStudentLoading: true,
            selectedStudentError: null,
            selectedStudentId: studentId,
          }),
        ),
        switchMap(({ studentId }) =>
          http
            .get<StudentDetailEntry[]>(
              `${environment.apiBase}/progress/professor/students/${studentId}`,
            )
            .pipe(
              tapResponse({
                next: (selectedStudent) =>
                  patchState(store, { selectedStudent, selectedStudentLoading: false }),
                error: (err: { message?: string }) =>
                  patchState(store, {
                    selectedStudentLoading: false,
                    selectedStudentError: err?.message ?? 'Failed to load student detail',
                  }),
              }),
            ),
        ),
      ),
    ),

    loadStudentHistory: rxMethod<{ studentId: string }>(
      pipe(
        tap(() => patchState(store, { studentHistoryLoading: true, studentHistoryError: null })),
        switchMap(({ studentId }) =>
          http
            .get<StudentHistory>(
              `${environment.apiBase}/progress/professor/students/${studentId}/history`,
            )
            .pipe(
              tapResponse({
                next: (studentHistory) =>
                  patchState(store, { studentHistory, studentHistoryLoading: false }),
                error: (err: { message?: string }) =>
                  patchState(store, {
                    studentHistoryLoading: false,
                    studentHistoryError: err?.message ?? 'Failed to load student history',
                  }),
              }),
            ),
        ),
      ),
    ),
  })),
);