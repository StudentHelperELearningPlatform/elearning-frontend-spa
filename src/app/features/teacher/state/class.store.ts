import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';

import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

import { TeacherClass } from '../models/class.model';
import {
  TeacherClassDetail,
  ClassStudent,
  ClassLesson,
} from '../models/class-detail.model';

interface ClassState {
  classes: TeacherClass[];
  currentClass: TeacherClassDetail | null;

  students: ClassStudent[];
  lessons: ClassLesson[];

  loading: boolean;
  error: string | null;
}

const initialState: ClassState = {
  classes: [],
  currentClass: null,

  students: [],
  lessons: [],

  loading: false,
  error: null,
};

export const ClassStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed((store) => ({
    totalClasses: computed(() => store.classes().length),

    totalStudents: computed(() =>
      store.classes().reduce(
        (sum, current) => sum + current.studentCount,
        0,
      ),
    ),
  })),

  withMethods((
    store,
    http = inject(HttpClient),
    userApi = inject(USER_PLATFORM_API_URL),
  ) => ({

    loadClasses() {
      patchState(store, {
        loading: true,
        error: null,
      });

      http
        .get<TeacherClass[]>(`${userApi}/teachers/classes`)
        .subscribe({
          next: (classes) => {
            patchState(store, {
              classes,
              loading: false,
            });
          },

          error: (err: Error) => {
            patchState(store, {
              loading: false,
              error: err.message,
            });
          },
        });
    },

    loadClassDetail(classId: string) {
      patchState(store, {
        loading: true,
        error: null,
      });

      http
        .get<TeacherClassDetail>(
          `${userApi}/teachers/classes/${classId}`,
        )
        .subscribe({
          next: (classDetail) => {
            patchState(store, {
              currentClass: classDetail,
              students: classDetail.students ?? [],
              lessons: classDetail.lessons ?? [],
              loading: false,
            });
          },

          error: (err: Error) => {
            patchState(store, {
              loading: false,
              error: err.message,
            });
          },
        });
    },

    createClass(payload: {
      name: string;
      description?: string;
    }) {
      patchState(store, {
        loading: true,
        error: null,
      });

      http
        .post<TeacherClass>(
          `${userApi}/teachers/classes`,
          payload,
        )
        .subscribe({
          next: (newClass) => {
            patchState(store, {
              classes: [...store.classes(), newClass],
              loading: false,
            });
          },

          error: (err: Error) => {
            patchState(store, {
              loading: false,
              error: err.message,
            });
          },
        });
    },

    addStudent(classId: string, studentId: string) {
      http
        .post(
          `${userApi}/teachers/classes/${classId}/students/${studentId}`,
          {},
        )
        .subscribe();
    },

    removeStudent(classId: string, studentId: string) {
      patchState(store, {
        students: store
          .students()
          .filter((student) => student.id !== studentId),
      });

      http
        .delete(
          `${userApi}/teachers/classes/${classId}/students/${studentId}`,
        )
        .subscribe();
    },

    addLesson(classId: string, lessonId: string) {
      http
        .post(
          `${userApi}/teachers/classes/${classId}/lessons/${lessonId}`,
          {},
        )
        .subscribe();
    },

    removeLesson(classId: string, lessonId: string) {

      patchState(store, {
        lessons: store
          .lessons()
          .filter((lesson) => lesson.id !== lessonId),
      });

      http
        .delete(
          `${userApi}/teachers/classes/${classId}/lessons/${lessonId}`,
        )
        .subscribe();
    },
  })),
);