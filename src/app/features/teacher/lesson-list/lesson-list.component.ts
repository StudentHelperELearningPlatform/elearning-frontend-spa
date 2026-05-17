import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ContentStore, ContentItem } from '../store/content.store';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-teacher-lesson-list',
  imports: [CommonModule, RouterModule, CardComponent, ButtonComponent, BadgeComponent, EmptyStateComponent],
  template: `
    <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <div class="flex items-center space-x-4">
          <div
            class="w-16 h-16 bg-[#0ABAB5]/20 rounded-2xl border-4 border-black flex items-center justify-center"
          >
            <span class="material-icons text-[#0ABAB5] text-3xl">library_books</span>
          </div>
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">All Lessons</h1>
            <p class="text-gray-600 font-medium">Manage and edit your lesson catalog</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <app-button variant="primary" icon="add" (btnClick)="createLesson()">New Lesson</app-button>
        </div>
      </div>

      <!-- Status Filter -->
      <div class="flex flex-wrap gap-3">
        @for (filter of filters; track filter) {
          <button
            (click)="selectedFilter.set(filter)"
            class="px-5 py-2 border-4 border-black rounded-xl font-black uppercase tracking-tight transition-all"
            [class.bg-[#0ABAB5]]="selectedFilter() === filter"
            [class.text-white]="selectedFilter() === filter"
            [class.shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]]="selectedFilter() === filter"
            [class.bg-white]="selectedFilter() !== filter"
            [class.text-black]="selectedFilter() !== filter"
            [class.hover:bg-gray-50]="selectedFilter() !== filter"
          >
            {{ filter }}
          </button>
        }
      </div>

      @if (store.loading()) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (i of [1, 2, 3]; track i) {
            <div class="bg-gray-200 animate-pulse h-64 rounded-3xl border-4 border-black"></div>
          }
        </div>
      } @else if (visibleLessons().length === 0) {
        <app-empty-state
          title="No lessons yet"
          description="Create your first lesson to get started teaching!"
          icon="library_books"
        />
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (lesson of visibleLessons(); track lesson.id) {
            <app-card [hoverable]="true" class="h-full flex flex-col">
              <div class="flex-1 flex flex-col">
                <div class="flex justify-between items-start mb-4">
                  <app-badge variant="primary">{{ lesson.subject }}</app-badge>
                  <app-badge [variant]="lesson.status === 'PUBLISHED' ? 'success' : 'warning'">
                    {{ lesson.status }}
                  </app-badge>
                </div>
                <h3 class="text-xl font-black text-black mb-2 leading-tight">{{ lesson.title }}</h3>
                <p class="text-sm font-bold text-gray-500 mb-6 flex-1">
                  Last updated {{ lesson.lastModified | date: 'mediumDate' }}
                </p>

                <div class="flex justify-between items-center mt-auto pt-4 border-t-4 border-black/10 gap-2">
                  <app-button variant="secondary" size="sm" icon="edit" (btnClick)="editLesson(lesson.id)">
                    Edit
                  </app-button>
                  <app-button variant="danger" size="sm" icon="delete" (btnClick)="deleteLesson(lesson.id)">
                    Delete
                  </app-button>
                </div>
              </div>
            </app-card>
          }
        </div>
      }
    </div>
  `,
})
export class LessonListComponent implements OnInit {
  store = inject(ContentStore);
  private router = inject(Router);

  filters = ['ALL', 'PUBLISHED', 'DRAFT'] as const;
  selectedFilter = signal<(typeof this.filters)[number]>('ALL');

  visibleLessons = computed<ContentItem[]>(() => {
    const filter = this.selectedFilter();
    const lessons = this.store.lessons();
    if (filter === 'ALL') return lessons;
    return lessons.filter((l) => l.status === filter);
  });

  ngOnInit() {
    this.store.loadContent();
  }

  createLesson() {
    this.router.navigate(['/teacher/lesson-builder']);
  }

  editLesson(id: string) {
    this.router.navigate(['/teacher/lesson-builder', id]);
  }

  deleteLesson(id: string) {
    if (confirm('Are you sure you want to delete this lesson?')) {
      this.store.deleteLesson(id);
    }
  }
}
