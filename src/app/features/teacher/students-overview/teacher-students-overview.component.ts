import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  DestroyRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { ProgressStore } from '../../student/state/progress.store';

// Tipul local pentru teacher — câmpurile reale din backend S6
interface TeacherStudentSummary {
  studentId: string;
  studentName: string;
  classesEnrolled: number;
  totalLessonsCompleted: number;
  averageScore: number;
  lastActive: string | null;
}

@Component({
  selector: 'app-teacher-students-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './teacher-students-overview.component.html',
})
export class TeacherStudentsOverviewComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly messageService = inject(MessageService);
  readonly store = inject(ProgressStore);

  searchTerm = signal('');
  private readonly searchInput$ = new Subject<string>();

  readonly filteredStudents = computed<TeacherStudentSummary[]>(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const all = this.store.students() as unknown as TeacherStudentSummary[];
    if (!term) return all;
    return all.filter((s) =>
      s.studentName.toLowerCase().includes(term),
    );
  });

  ngOnInit(): void {
    this.store.loadStudents();

    this.searchInput$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((term) => this.searchTerm.set(term));

    const err = this.store.studentsError();
    if (err) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: err,
      });
    }
  }

  onSearchChange(value: string): void {
    this.searchInput$.next(value);
  }

  onRowSelect(student: TeacherStudentSummary): void {
  this.router.navigate(['/teacher/students', student.studentId]);
}
}