import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

import { TeacherClass } from '../models/class.model';
import {
  TeacherClassDetail,
} from '../models/class-detail.model';
import {
  mapClass,
  mapClassDetail,
  TeacherClassRaw,
} from '@core/services/teacher-class.service';

interface ClassState {
  classes: TeacherClass[];
  currentClass: TeacherClassDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClassState = {
  classes: [],
  currentClass: null,

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
        .get<TeacherClassRaw[]>(`${userApi}/teachers/classes`)
        .subscribe({
          next: (rawClasses) => {
            patchState(store, {
              classes: rawClasses.map(mapClass),
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
        currentClass: null,
      });

      forkJoin({
        detail: http.get<TeacherClassRaw>(`${userApi}/teachers/classes/${classId}`),
        lessons: http
          .get<{ id: string; title: string }[]>(`${userApi}/teachers/classes/${classId}/lessons`)
          .pipe(catchError(() => of([]))),
        enrolledIds: http
          .get<string[]>(`${userApi}/teachers/classes/${classId}/students`)
          .pipe(catchError(() => of([]))),
        allStudents: http
          .get<{ id: string; firstName: string; lastName: string; email?: string }[]>(
            `${userApi}/students`,
          )
          .pipe(catchError(() => of([]))),
      }).subscribe({
        next: ({ detail, lessons, enrolledIds, allStudents }) => {
          const studentMap = new Map(allStudents.map((s) => [s.id, s]));
          patchState(store, {
            currentClass: {
              ...mapClassDetail(detail),
              lessons,
              students: enrolledIds.map((id) => {
                const s = studentMap.get(id);
                return {
                  id,
                  name: s ? `${s.firstName} ${s.lastName}`.trim() : id,
                  email: s?.email ?? '',
                };
              }),
            },
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

      const body = {
        name: payload.name,
        bio: payload.description ?? '',
      };

      http
        .post<TeacherClassRaw>(
          `${userApi}/teachers/classes`,
          body,
        )
        .subscribe({
          next: (rawClass) => {
            const newClass = mapClass(rawClass);
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

    updateClass(
      classId: string,
      payload: {
        name?: string;
        description?: string;
      },
    ) {
      patchState(store, {
        loading: true,
        error: null,
      });

      const body: Record<string, unknown> = {};
      if (payload.name !== undefined) {
        body['name'] = payload.name;
      }
      if (payload.description !== undefined) {
        body['bio'] = payload.description;
      }

      http
        .put<TeacherClassRaw>(
          `${userApi}/teachers/classes/${classId}`,
          body,
        )
        .subscribe({
          next: (rawClass) => {
            const updatedClass = mapClass(rawClass);
            patchState(store, {
              classes: store.classes().map((c) =>
                c.id === classId ? updatedClass : c,
              ),

              currentClass:
                store.currentClass()?.id === classId
                  ? {
                      ...store.currentClass()!,
                      ...updatedClass,
                    }
                  : store.currentClass(),

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


   deleteClass(classId: string) {
  patchState(store, {
    classes: store
      .classes()
      .filter((c) => c.id !== classId),
  });

  http
    .delete(
      `${userApi}/teachers/classes/${classId}`,
    )
    .subscribe();
},

    addStudent(classId: string, studentId: string) {
      return http.post(
        `${userApi}/teachers/classes/${classId}/students/${studentId}`,
        {},
      );
    },

    removeStudent(classId: string, studentId: string) {
  const current = store.currentClass();

  if (!current) return;

  patchState(store, {
    currentClass: {
      ...current,
      students: current.students.filter(s => s.id !== studentId),
    },
  });

  http.delete(
    `${userApi}/teachers/classes/${classId}/students/${studentId}`,
  ).subscribe();
},

    addLesson(classId: string, lessonId: string) {
      return http.post(
        `${userApi}/teachers/classes/${classId}/lessons/${lessonId}`,
        {},
      );
    },

    removeLesson(classId: string, lessonId: string) {
  const current = store.currentClass();

  if (!current) return;

  patchState(store, {
    currentClass: {
      ...current,
      lessons: current.lessons.filter(l => l.id !== lessonId),
    },
  });

  http.delete(
    `${userApi}/teachers/classes/${classId}/lessons/${lessonId}`,
  ).subscribe();
   }
  })),
);