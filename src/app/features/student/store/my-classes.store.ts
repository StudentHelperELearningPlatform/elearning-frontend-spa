import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TeacherClassService } from '@core/services/teacher-class.service';
import { TeacherClass } from '@features/teacher/models/class.model';

// TODO: Replace MOCK_ENROLLED_CLASSES with the real backend payload once the
// student-enrollment endpoint is reliably available. The store already calls
// TeacherClassService.getStudentClasses() (GET /students/me/classes) — this
// mock is only used as a fallback when the request fails or returns an empty
// list so the page stays fully functional for demo/dev.
const MOCK_ENROLLED_CLASSES: TeacherClass[] = [
  {
    id: 'mock-class-1',
    name: 'Advanced English Literature',
    description: 'Dive into classic and modern literary works with Ms. Hawthorne.',
    studentCount: 24,
    lessonCount: 18,
    createdAt: '2025-09-02T09:00:00.000Z',
    code: 'ENG-204',
    averageGrade: 88,
  },
  {
    id: 'mock-class-2',
    name: 'Algebra II',
    description: 'Functions, polynomials, and the building blocks of higher mathematics.',
    studentCount: 31,
    lessonCount: 22,
    createdAt: '2025-09-04T09:00:00.000Z',
    code: 'MATH-301',
    averageGrade: 91,
  },
  {
    id: 'mock-class-3',
    name: 'World History: 1900 - Present',
    description: 'A century of conflict, culture, and change — taught by Mr. Avery.',
    studentCount: 28,
    lessonCount: 15,
    createdAt: '2025-09-10T09:00:00.000Z',
    code: 'HIST-150',
    averageGrade: 84,
  },
  {
    id: 'mock-class-4',
    name: 'Introductory Biology',
    description: 'Cells, ecosystems, and the science of living things.',
    studentCount: 26,
    lessonCount: 20,
    createdAt: '2025-09-12T09:00:00.000Z',
    code: 'BIO-101',
    averageGrade: 79,
  },
];

interface MyClassesState {
  classes: TeacherClass[];
  loading: boolean;
  error: string | null;
  usingMockData: boolean;
}

export const MyClassesStore = signalStore(
  { providedIn: 'root' },
  withState<MyClassesState>({
    classes: [],
    loading: false,
    error: null,
    usingMockData: false,
  }),
  withComputed((state) => ({
    classCount: computed(() => state.classes().length),
    hasClasses: computed(() => state.classes().length > 0),
  })),
  withMethods((store, classService = inject(TeacherClassService)) => ({
    loadMyClasses(): void {
      patchState(store, { loading: true, error: null });
      classService
        .getStudentClasses()
        .pipe(catchError(() => of<TeacherClass[] | null>(null)))
        .subscribe((classes) => {
          if (classes && classes.length > 0) {
            patchState(store, {
              classes,
              loading: false,
              usingMockData: false,
            });
            return;
          }

          // TODO: Remove this mock-data fallback once the enrollment endpoint
          // is guaranteed to return data in all environments.
          patchState(store, {
            classes: MOCK_ENROLLED_CLASSES,
            loading: false,
            usingMockData: true,
          });
        });
    },
  })),
);
