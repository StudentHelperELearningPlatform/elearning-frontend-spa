import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MANAGEMENT_API_URL } from '@core/tokens/api.token';

export interface ClassItem {
  id: string;
  name: string;
  code: string;
  description?: string;
  studentCount: number;
  averageGrade: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  grade: number;
  progress: number;
  lastActive: Date;
}

export interface CreateClassPayload {
  name: string;
  description?: string;
}

interface ClassState {
  classes: ClassItem[];
  currentClass: ClassItem | null;
  students: Student[];
  loading: boolean;
  error: string | null;
}

export const ClassStore = signalStore(
  { providedIn: 'root' },
  withState<ClassState>({
    classes: [],
    currentClass: null,
    students: [],
    loading: false,
    error: null,
  }),
  withComputed((state) => ({
    activeClasses: computed(() => state.classes()),
    topStudents: computed(() =>
      [...state.students()].sort((a, b) => b.grade - a.grade).slice(0, 5),
    ),
  })),
  withMethods((store, http = inject(HttpClient), apiBase = inject(MANAGEMENT_API_URL)) => ({
    loadClasses() {
      patchState(store, { loading: true, error: null });
      http.get<ClassItem[]>(`${apiBase}/teachers/classes`).subscribe({
        next: (classes) => patchState(store, { classes, loading: false }),
        error: (err: unknown) => {
          const message = err instanceof Error ? err.message : 'Failed to load classes';
          patchState(store, { loading: false, error: message });
        },
      });
    },
    loadStudents(classId: string) {
      patchState(store, { loading: true });
      http.get<Student[]>(`${apiBase}/teachers/classes/${classId}/students`).subscribe({
        next: (students) => patchState(store, { students, loading: false }),
        error: () => patchState(store, { loading: false, students: [] }),
      });
    },
    createClass(payload: CreateClassPayload) {
      patchState(store, { loading: true, error: null });
      http.post<ClassItem>(`${apiBase}/teachers/classes`, payload).subscribe({
        next: (created) => {
          patchState(store, (state) => ({
            classes: [...state.classes, created],
            loading: false,
          }));
        },
        error: (err: unknown) => {
          const message = err instanceof Error ? err.message : 'Failed to create class';
          patchState(store, { loading: false, error: message });
        },
      });
    },
    addStudent(classId: string, studentId: string) {
      patchState(store, { loading: true, error: null });
      http
        .post<Student>(`${apiBase}/teachers/classes/${classId}/students/${studentId}`, {})
        .subscribe({
          next: (student) => {
            patchState(store, (state) => ({
              students: [...state.students, student],
              loading: false,
            }));
          },
          error: (err: unknown) => {
            const message = err instanceof Error ? err.message : 'Failed to add student';
            patchState(store, { loading: false, error: message });
          },
        });
    },
    removeStudent(classId: string, studentId: string) {
      http
        .delete(`${apiBase}/teachers/classes/${classId}/students/${studentId}`)
        .subscribe({
          next: () => {
            patchState(store, (state) => ({
              students: state.students.filter((s: Student) => s.id !== studentId),
            }));
          },
        });
    },
  })),
);
