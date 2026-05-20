import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ClassStore } from '../../../state/class.store';
import { TeacherLessonsStore } from '../../../state/teacher-lessons.store';
import { USER_PLATFORM_API_URL, CONTENT_API_URL } from '@core/tokens/api.token';

export interface StudentRow {
  studentId: string;
  firstName: string;
  lastName: string;
  streakValue?: number;
  lastActiveAt?: string | null;
}

export interface FinalQuizAttempt {
  attemptId: string;
  studentId: string;
  studentName: string;
  lessonId: string;
  lessonTitle: string;
  score: number;
  submittedAt: string;
}

@Component({
  selector: 'app-class-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss'],
})
export class ClassDetailComponent implements OnInit {
  readonly route = inject(ActivatedRoute);
  readonly store = inject(ClassStore);
  readonly lessonsStore = inject(TeacherLessonsStore);
  readonly http = inject(HttpClient);
  readonly userApi = inject(USER_PLATFORM_API_URL);
  readonly contentApi = inject(CONTENT_API_URL);

  classId!: string;

  // ─── Students panel ───────────────────────────────
  readonly students = computed(() => this.store.currentClass()?.students ?? []);

  // ─── Lessons panel ────────────────────────────────
  readonly lessons = computed(() => this.store.currentClass()?.lessons ?? []);

  // ─── Invite modal ─────────────────────────────────
  showInviteModal = signal(false);
  allStudents = signal<StudentRow[]>([]);
  studentSearch = signal('');
  addingStudentId = signal<string | null>(null);
  addStudentError = signal<string | null>(null);

  readonly filteredStudents = computed(() => {
    const q = this.studentSearch().toLowerCase().trim();
    const enrolled = new Set(this.students().map((s) => s.id));
    return this.allStudents()
      .filter((s) => !enrolled.has(s.studentId))
      .filter(
        (s) =>
          !q ||
          `${s.firstName} ${s.lastName}`.toLowerCase().includes(q),
      );
  });

  // ─── Add lesson modal ─────────────────────────────
  showLessonsModal = signal(false);
  lessonSearch = signal('');
  addingLessonId = signal<string | null>(null);
  addLessonError = signal<string | null>(null);

  readonly filteredLessons = computed(() => {
    const q = this.lessonSearch().toLowerCase().trim();
    const enrolled = new Set(this.lessons().map((l) => l.id));
    return this.lessonsStore
      .items()
      .filter((l) => !enrolled.has(l.id))
      .filter((l) => !q || l.title.toLowerCase().includes(q) || l.subject.toLowerCase().includes(q));
  });

  // ─── Final quiz attempts ──────────────────────────
  quizAttempts = signal<FinalQuizAttempt[]>([]);
  quizLoading = signal(false);
  quizError = signal<string | null>(null);

  ngOnInit(): void {
    this.classId = this.route.snapshot.params['classId'];
    this.store.loadClassDetail(this.classId);
    this.lessonsStore.load();
  }

  // ─── Student remove ───────────────────────────────
  removeStudent(studentId: string): void {
    this.store.removeStudent(this.classId, studentId);
  }

  // ─── Lesson remove ────────────────────────────────
  removeLesson(lessonId: string): void {
    this.store.removeLesson(this.classId, lessonId);
  }

  // ─── Invite modal logic ───────────────────────────
  openInviteModal(): void {
    this.showInviteModal.set(true);
    this.studentSearch.set('');
    this.addStudentError.set(null);
    if (this.allStudents().length === 0) {
      this.http
        .get<StudentRow[]>(`${this.userApi}/progress/professor/students`)
        .pipe(catchError(() => of([] as StudentRow[])))
        .subscribe((rows) => this.allStudents.set(rows));
    }
  }

  closeInviteModal(): void {
    this.showInviteModal.set(false);
    this.addingStudentId.set(null);
    this.addStudentError.set(null);
  }

  addStudent(student: StudentRow): void {
    this.addingStudentId.set(student.studentId);
    this.addStudentError.set(null);
    this.store.addStudent(this.classId, student.studentId).subscribe({
      next: () => {
        this.store.loadClassDetail(this.classId);
        this.addingStudentId.set(null);
      },
      error: () => {
        this.addStudentError.set('Failed to add student. They may already be in this class.');
        this.addingStudentId.set(null);
      },
    });
  }

  // ─── Add lesson modal logic ───────────────────────
  openLessonsModal(): void {
    this.showLessonsModal.set(true);
    this.lessonSearch.set('');
    this.addLessonError.set(null);
    this.lessonsStore.load();
  }

  closeLessonsModal(): void {
    this.showLessonsModal.set(false);
    this.addingLessonId.set(null);
    this.addLessonError.set(null);
  }

  addLesson(lessonId: string): void {
    this.addingLessonId.set(lessonId);
    this.addLessonError.set(null);
    this.store.addLesson(this.classId, lessonId).subscribe({
      next: () => {
        this.store.loadClassDetail(this.classId);
        this.addingLessonId.set(null);
      },
      error: () => {
        this.addLessonError.set('Failed to add lesson. It may already be in this class.');
        this.addingLessonId.set(null);
      },
    });
  }

  // ─── Final quiz attempts ──────────────────────────
  loadQuizAttempts(): void {
    if (this.quizLoading()) return;

    const lessonIds = this.lessons().map((l) => l.id);
    const studentIds = this.students().map((s) => s.id);

    if (lessonIds.length === 0 || studentIds.length === 0) {
      this.quizAttempts.set([]);
      return;
    }

    this.quizLoading.set(true);
    this.quizError.set(null);

    // Fetch attempts for each lesson's final quiz in parallel
    const requests = lessonIds.map((lessonId) =>
      this.http
        .get<unknown[]>(`${this.contentApi}/lessons/${lessonId}/final-quiz/attempts`)
        .pipe(
          map((attempts) =>
            attempts
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .filter((a: any) => studentIds.includes(a.studentId))
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .map((a: any) => ({
                attemptId: a.id ?? a.attemptId ?? '',
                studentId: a.studentId ?? '',
                studentName: this.resolveStudentName(a.studentId),
                lessonId,
                lessonTitle: this.lessons().find((l) => l.id === lessonId)?.title ?? lessonId,
                score: a.score ?? a.totalScore ?? 0,
                submittedAt: a.submittedAt ?? a.completedAt ?? '',
              })),
          ),
          catchError(() => of([] as FinalQuizAttempt[])),
        ),
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        const all = results.flat().sort(
          (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
        );
        this.quizAttempts.set(all);
        this.quizLoading.set(false);
      },
      error: () => {
        this.quizError.set('Failed to load quiz attempts');
        this.quizLoading.set(false);
      },
    });
  }

  private resolveStudentName(studentId: string): string {
    const enrolled = this.students().find((s) => s.id === studentId);
    if (enrolled?.name) return enrolled.name;
    const cached = this.allStudents().find((s) => s.studentId === studentId);
    if (cached) return `${cached.firstName} ${cached.lastName}`;
    return studentId;
  }
}