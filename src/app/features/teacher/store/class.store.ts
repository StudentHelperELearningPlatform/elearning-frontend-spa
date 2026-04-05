import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';

export interface ClassItem {
  id: string;
  name: string;
  code: string;
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
    classes: [
      { id: '1', name: 'Math 101', code: 'MATH101', studentCount: 24, averageGrade: 85 },
      { id: '2', name: 'Science 202', code: 'SCI202', studentCount: 18, averageGrade: 92 }
    ],
    currentClass: null,
    students: [
      { id: '1', name: 'Alice Smith', email: 'alice@example.com', grade: 95, progress: 80, lastActive: new Date() },
      { id: '2', name: 'Bob Johnson', email: 'bob@example.com', grade: 78, progress: 65, lastActive: new Date() },
      { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', grade: 88, progress: 90, lastActive: new Date() }
    ],
    loading: false,
    error: null
  }),
  withComputed((state) => ({
    activeClasses: computed(() => state.classes()),
    topStudents: computed(() => [...state.students()].sort((a, b) => b.grade - a.grade).slice(0, 5))
  })),
  withMethods((store) => ({
    loadClasses() {
      patchState(store, { loading: true });
      setTimeout(() => {
        patchState(store, { loading: false });
      }, 600);
    },
    loadStudents() {
      patchState(store, { loading: true });
      setTimeout(() => {
        patchState(store, { loading: false });
      }, 500);
    },
    addStudent(student: Omit<Student, 'id' | 'lastActive'>) {
      patchState(store, (state) => ({
        students: [...state.students, { ...student, id: Math.random().toString(), lastActive: new Date() }]
      }));
    },
    removeStudent(id: string) {
      patchState(store, (state) => ({
        students: state.students.filter((s: Student) => s.id !== id)
      }));
    }
  }))
);
