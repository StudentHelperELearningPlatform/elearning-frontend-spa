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

// PrimeNG
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// IMPORT CORECTAT
import { ProgressStore, StudentSummary } from '../../student/store/progress.store';

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

  readonly filteredStudents = computed<StudentSummary[]>(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.store.students();
    return this.store.students().filter((s) =>
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

    // Show toast if error occurs
    const checkError = () => {
      const err = this.store.studentsError();
      if (err) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err,
        });
      }
    };

    // effect-like: run after store has loaded
    checkError();
  }

  onSearchChange(value: string): void {
    this.searchInput$.next(value);
  }

  onRowSelect(student: StudentSummary): void {
    void this.router.navigate(['/teacher/students', student.studentId]);
  }
}