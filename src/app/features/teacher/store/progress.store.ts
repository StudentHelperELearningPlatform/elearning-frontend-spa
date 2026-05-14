import { HttpClient } from '@angular/common/http';
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
  studentId: string;
  studentName: string;
  lessonsCompleted: number;
  averageScore: number;
  lastActive: string | Date;
}

export interface LessonBreakdown {
  lessonId: string;
  lessonTitle: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
  score: number | null;
  dateCompleted: string | Date | null;
}

export interface StudentDetail {
  studentId: string;
  studentName: string;
  totalLessonsCompleted: number;
  averageScore: number;
  lastActive: string | Date;
  history: LessonBreakdown[];
}

interface TeacherProgressState {
  classSummary: ClassStatsSummary | null;
  classStudents: StudentProgressRow[];
  selectedStudentDetail: StudentDetail | null;
  
  // Melora's properties for S6-stats-03 (stubbed out for coordination)
  allStudents: StudentProgressRow[];
  
  loading: boolean;
  error: string | null;
}

export const TeacherProgressStore = signalStore(
  { providedIn: 'root' },
  withState<TeacherProgressState>({
    classSummary: null,
    classStudents: [],
    selectedStudentDetail: null,
    allStudents: [],
    loading: false,
    error: null,
  }),
  withMethods((store, http = inject(HttpClient), apiBase = inject(USER_PLATFORM_API_URL)) => ({
    loadClassStats: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((classId) =>
          // Assuming classId is passed as query param per typical Spring controllers
          http.get<{ summary: ClassStatsSummary; students: StudentProgressRow[] }>(`${apiBase}/progress/professor/class-stats`, { params: { classId } }).pipe(
            tapResponse({
              next: (response) => patchState(store, { 
                classSummary: response.summary,
                classStudents: response.students,
                loading: false 
              }),
              error: (err: any) => patchState(store, { error: err.message || 'Failed to load class stats', loading: false }),
            })
          )
        )
      )
    ),

    loadStudentDetail: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null, selectedStudentDetail: null })),
        switchMap((studentId) =>
          http.get<StudentDetail>(`${apiBase}/progress/professor/students/${studentId}`).pipe(
            tapResponse({
              next: (detail) => patchState(store, { selectedStudentDetail: detail, loading: false }),
              error: (err: any) => patchState(store, { error: err.message || 'Failed to load student detail', loading: false }),
            })
          )
        )
      )
    ),

    // S6-stats-03 stub for Melora
    loadAllStudents: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          http.get<StudentProgressRow[]>(`${apiBase}/progress/professor/students`).pipe(
            tapResponse({
              next: (students) => patchState(store, { allStudents: students, loading: false }),
              error: (err: any) => patchState(store, { error: err.message || 'Failed to load all students', loading: false }),
            })
          )
        )
      )
    )
  }))
);
