import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export interface ClassStatsSummary {
  classId: string;
  className: string;
  totalStudents: number;
  activeStudents: number;
  averageScore: number;
  completionRate: number;
}

export interface StudentProgressRow {
  userId?: string;
  studentId: string;
  studentName: string;
  lessonsCompleted: number | null;
  averageScore: number | null;
  lastActive: string | Date | null;
}

export interface LessonBreakdown {
  lessonId: string;
  lessonTitle: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
  score: number | null;
  dateCompleted: string | Date | null;
}

export interface StudentDetail {
  userId?: string;
  studentId: string;
  studentName: string;
  totalLessonsCompleted: number | null;
  averageScore: number | null;
  lastActive: string | Date | null;
  history: LessonBreakdown[];
}

interface TeacherProgressState {
  classSummary: ClassStatsSummary | null;
  classStudents: StudentProgressRow[];

  selectedStudentDetail: StudentDetail | null;
  detailLoading: boolean;
  detailError: string | null;

  allStudents: StudentProgressRow[];

  loading: boolean;
  error: string | null;
}

function describeError(err: unknown): string {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 404) {
      return 'This data is not available yet.';
    }
    if (err.status === 0) {
      return 'Cannot reach the server. Check your connection and try again.';
    }
    return `Server error (${err.status}). Please try again later.`;
  }
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return 'Something went wrong.';
}

export const TeacherProgressStore = signalStore(
  { providedIn: 'root' },
  withState<TeacherProgressState>({
    classSummary: null,
    classStudents: [],
    selectedStudentDetail: null,
    detailLoading: false,
    detailError: null,
    allStudents: [],
    loading: false,
    error: null,
  }),
  withMethods((store, http = inject(HttpClient), apiBase = inject(USER_PLATFORM_API_URL)) => ({
    loadClassStats: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((classId) =>
          http.get<{ summary: ClassStatsSummary; students: StudentProgressRow[] }>(`${apiBase}/progress/professor/class-stats`, { params: { classId } }).pipe(
            tapResponse({
              next: (response) => patchState(store, {
                classSummary: response.summary,
                classStudents: response.students,
                loading: false
              }),
              error: (err: unknown) => patchState(store, { error: describeError(err), loading: false }),
            })
          )
        )
      )
    ),

    loadStudentDetail: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { detailLoading: true, detailError: null, selectedStudentDetail: null })),
        switchMap((studentId) =>
          http.get<StudentDetail>(`${apiBase}/progress/professor/students/${studentId}`).pipe(
            tapResponse({
              next: (detail) => patchState(store, { selectedStudentDetail: detail, detailLoading: false }),
              error: (err: unknown) => patchState(store, { detailError: describeError(err), detailLoading: false }),
            })
          )
        )
      )
    ),

    clearStudentDetail() {
      patchState(store, { selectedStudentDetail: null, detailError: null, detailLoading: false });
    },

    loadAllStudents: rxMethod<{ classId: string }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ classId }) =>
          http.get<StudentProgressRow[]>(`${apiBase}/progress/teacher/students`, { params: { classId } }).pipe(
            tapResponse({
              next: (students) => patchState(store, {
                allStudents: Array.isArray(students) ? students : [],
                loading: false,
              }),
              error: (err: unknown) => patchState(store, { error: describeError(err), loading: false }),
            })
          )
        )
      )
    )
  }))
);
