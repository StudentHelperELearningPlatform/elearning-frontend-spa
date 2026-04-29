import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

import { QuizzesStore } from '../store/quizzes.store';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { QuizAttempt } from '../../../shared/models/quiz.types';



@Component({
  selector: 'app-quiz-history',
  standalone: true,
  templateUrl: './quiz-history.component.html',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TableModule,
    BadgeComponent,
  ],
})

export class QuizHistoryComponent implements OnInit {
  store = inject(QuizzesStore);
  selectedSubject = signal<string | null>(null);

  subjectOptions = [
    { label: 'All', value: null },
    { label: 'Math', value: 'Math' },
    { label: 'Science', value: 'Science' },
    { label: 'English', value: 'English' },
  ];

  filteredAttempts = computed(() => {
    const subject = this.selectedSubject();
    const attempts = this.store.attempts();
    if (!subject) return attempts;
    return attempts.filter((a: QuizAttempt) => a.subject === subject);
  });

  ngOnInit(): void {
    this.store.loadAttempts();
  }

  getBadgeVariant(percentage: number): 'success' | 'danger' {
    return percentage >= 60 ? 'success' : 'danger';
  }

  getPassFailVariant(passed: boolean): 'success' | 'danger' {
    return passed ? 'success' : 'danger';
  }

  formatTime(seconds: number): string {
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  }
}
