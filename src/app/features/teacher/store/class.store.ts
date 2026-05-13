import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, of } from 'rxjs';
import { CONTENT_API_URL } from '@core/tokens/api.token';

/* ================= MODELS ================= */

export interface ClassItem {
  id: string;
  name: string;
  description?: string;
  studentCount: number;
  lessonCount: number;
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface Lesson {
  id: string;
  title: string;
}

export interface ClassDetail extends ClassItem {
  students: Student[];
  lessons: Lesson[];
}

/* ================= STATE ================= */

interface ClassState {
  classes: ClassItem[];
  currentClass: ClassDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClassState = {
  classes: [],
  currentClass: null,
  loading: false,
  error: null,
};

/* ================= STORE ================= */

export const ClassStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed((state) => ({
    totalClasses: computed(() => state.classes().length),
  })),

  withMethods((store, http = inject(HttpClient), api = inject(CONTENT_API_URL)) => ({

    /* ================= LOAD ALL CLASSES ================= */
    loadClasses() {
      patchState(store, { loading: true, error: null });

      http.get<ClassItem[]>(`${api}/teachers/classes`)
        .pipe(
          catchError(() => of([]))
        )
        .subscribe({
          next: (data) => {
            patchState(store, {
              classes: data,
              loading: false,
            });
          },
          error: (err) => {
            patchState(store, {
              loading: false,
              error: err?.message ?? 'Failed to load classes',
            });
          },
        });
    },

    /* ================= CREATE CLASS ================= */
    createClass(payload: { name: string; description?: string }) {
      return http.post<ClassItem>(`${api}/teachers/classes`, payload)
        .subscribe({
          next: (newClass) => {
            patchState(store, (state) => ({
              classes: [...state.classes, newClass],
            }));
          },
        });
    },

    /* ================= LOAD CLASS DETAIL ================= */
    loadClassDetail(classId: string) {
      patchState(store, { loading: true });

      forkJoin({
        class: http.get<ClassItem>(`${api}/teachers/classes/${classId}`),
        students: http.get<Student[]>(`${api}/teachers/classes/${classId}/students`),
        lessons: http.get<Lesson[]>(`${api}/teachers/classes/${classId}/lessons`),
      })
        .pipe(
          catchError(() =>
            of({ class: null, students: [], lessons: [] })
          )
        )
        .subscribe({
          next: (res: any) => {
            if (!res.class) {
              patchState(store, { loading: false });
              return;
            }

            patchState(store, {
              currentClass: {
                ...res.class,
                students: res.students ?? [],
                lessons: res.lessons ?? [],
              },
              loading: false,
            });
          },
        });
    },

    /* ================= DELETE CLASS ================= */
    deleteClass(classId: string) {
      http.delete(`${api}/teachers/classes/${classId}`)
        .subscribe({
          next: () => {
            patchState(store, (state) => ({
              classes: state.classes.filter(c => c.id !== classId),
            }));
          },
        });
    },

    /* ================= STUDENTS ================= */
    addStudent(classId: string, studentId: string) {
      http.post(
        `${api}/teachers/classes/${classId}/students/${studentId}`,
        {}
      ).subscribe({
        next: () => {
          this.loadClassDetail(classId);
        },
      });
    },

    removeStudent(classId: string, studentId: string) {
      http.delete(
        `${api}/teachers/classes/${classId}/students/${studentId}`
      ).subscribe({
        next: () => {
          this.loadClassDetail(classId);
        },
      });
    },

    /* ================= LESSONS ================= */
    addLesson(classId: string, lessonId: string) {
      http.post(
        `${api}/teachers/classes/${classId}/lessons/${lessonId}`,
        {}
      ).subscribe({
        next: () => {
          this.loadClassDetail(classId);
        },
      });
    },

    removeLesson(classId: string, lessonId: string) {
      http.delete(
        `${api}/teachers/classes/${classId}/lessons/${lessonId}`
      ).subscribe({
        next: () => {
          this.loadClassDetail(classId);
        },
      });
    },

    /* ================= RESET ================= */
    reset() {
      patchState(store, initialState);
    },
  }))
);