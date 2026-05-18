import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';

import { ProgressStore, StudentDetailEntry } from '../../student/store/progress.store';

interface GroupedByClass {
  className: string;
  lessons: StudentDetailEntry[];
  avgScore: number;
  completedCount: number;
}

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, ToastModule, TableModule, TagModule, ButtonModule, ProgressSpinnerModule],
  providers: [MessageService],
  templateUrl: './student-detail.component.html',
})
export class StudentDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly store = inject(ProgressStore);

  readonly studentId = this.route.snapshot.paramMap.get('studentId') ?? '';
  /** Only present when navigated via classes/:classId/students/:studentId */
  readonly classId = this.route.snapshot.parent?.paramMap.get('classId') ?? null;

  /** Lessons grouped by class name */
  readonly groupedByClass = computed<GroupedByClass[]>(() => {
    const entries = this.store.selectedStudent() ?? [];
    const map = new Map<string, StudentDetailEntry[]>();

    for (const entry of entries) {
      const group = map.get(entry.className) ?? [];
      group.push(entry);
      map.set(entry.className, group);
    }

    return Array.from(map.entries()).map(([className, lessons]) => {
      const scores = lessons
        .filter((l: StudentDetailEntry) => l.score !== null)
        .map((l: StudentDetailEntry) => l.score as number);
      const avgScore =
        scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
      const completedCount = lessons.filter(
        (l: StudentDetailEntry) => l.status === 'completed',
      ).length;
      return { className, lessons, avgScore, completedCount };
    });
  });

  readonly totalCompleted = computed(
    () =>
      (this.store.selectedStudent() ?? []).filter(
        (l: StudentDetailEntry) => l.status === 'completed',
      ).length,
  );

  readonly overallAvgScore = computed(() => {
    const entries = this.store.selectedStudent() ?? [];
    const scores = entries
      .filter((l: StudentDetailEntry) => l.score !== null)
      .map((l: StudentDetailEntry) => l.score as number);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  });

  ngOnInit(): void {
    if (this.studentId) {
      this.store.loadStudentDetail({ studentId: this.studentId });
      this.store.loadStudentHistory({ studentId: this.studentId });
    }
  }

  goBack(): void {
    if (this.classId) {
      this.router.navigate(['/teacher/classes', this.classId, 'stats']);
    } else {
      this.router.navigate(['/teacher/students']);
    }
  }

  statusSeverity(status: StudentDetailEntry['status']): 'success' | 'warn' | 'danger' {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warn';
      default:
        return 'danger';
    }
  }

  statusLabel(status: StudentDetailEntry['status']): string {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  }
}
