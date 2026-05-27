import { Component, inject, OnInit, signal, computed, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsStore } from '../../store/lessons.store';
import { ProgressStore } from '../../store/progress.store';
import { AuthStore } from '../../../auth/store/auth.store';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardComponent,
    ButtonComponent,
    BadgeComponent,
    EmptyStateComponent,
  ],
  template: `
    <div class="p-6 max-w-7xl mx-auto space-y-8">
      <div
        class="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <h1 class="text-4xl font-black text-black tracking-tight">Lesson Catalog</h1>
          <p class="text-gray-600 mt-2 text-lg font-medium">
            Browse, learn, and track your progress in English.
          </p>
        </div>
        <img
          src="https://api.dicebear.com/7.x/bottts/svg?seed=learn"
          alt="Mascot"
          class="w-24 h-24 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
          referrerpolicy="no-referrer"
        />
      </div>

      <div class="flex flex-wrap gap-4 border-b-4 border-black pb-4">
        <button
          (click)="activeTab.set('browser')"
          [class]="activeTab() === 'browser' ? 'bg-[#0ABAB5] text-white' : 'bg-white text-black'"
          class="px-6 py-3 rounded-xl border-4 border-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          Lesson Browser
        </button>
        <button
          (click)="activeTab.set('my-lessons')"
          [class]="activeTab() === 'my-lessons' ? 'bg-[#FFD700] text-black' : 'bg-white text-black'"
          class="px-6 py-3 rounded-xl border-4 border-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          My Lessons
        </button>
        <button
          (click)="activeTab.set('history')"
          [class]="activeTab() === 'history' ? 'bg-[#FF6B6B] text-white' : 'bg-white text-black'"
          class="px-6 py-3 rounded-xl border-4 border-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          Lesson History
        </button>
      </div>

      @if (lessonsStore.loading()) {
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (i of [1, 2, 3]; track i) {
            <div class="bg-gray-200 animate-pulse h-80 rounded-3xl border-4 border-black"></div>
          }
        </div>
      } @else {
        @switch (activeTab()) {
          @case ('browser') {
            @if (lessonsStore.publishedLessons().length === 0) {
              <app-empty-state
                [title]="'No lessons found'"
                [description]="'Check back later for new content!'"
                [icon]="'menu_book'"
              ></app-empty-state>
            } @else {
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @for (lesson of lessonsStore.publishedLessons(); track lesson.id) {
                  <ng-container
                    *ngTemplateOutlet="lessonCard; context: { $implicit: lesson, type: 'browser' }"
                  />
                }
              </div>
            }
          }
          @case ('my-lessons') {
            @if (lessonsStore.accessibleLessonsLoading()) {
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @for (i of [1, 2, 3]; track i) {
                  <div class="bg-gray-200 animate-pulse h-80 rounded-3xl border-4 border-black"></div>
                }
              </div>
            } @else if (lessonsStore.myLessons().length === 0) {
              <app-empty-state
                [title]="'No active lessons'"
                [description]="'Start or unlock a lesson from the catalog to see it here!'"
                [icon]="'school'"
              ></app-empty-state>
            } @else {
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @for (lesson of lessonsStore.myLessons(); track lesson.id) {
                  <ng-container
                    *ngTemplateOutlet="lessonCard; context: { $implicit: lesson, type: 'my' }"
                  />
                }
              </div>
            }
          }
          @case ('history') {
            @if (completedLessons().length === 0) {
              <app-empty-state
                [title]="'No history yet'"
                [description]="'Finish a lesson to see your achievements here!'"
                [icon]="'history'"
              ></app-empty-state>
            } @else {
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @for (lesson of completedLessons(); track lesson.id) {
                  <ng-container
                    *ngTemplateOutlet="lessonCard; context: { $implicit: lesson, type: 'history' }"
                  />
                }
              </div>
            }
          }
        }
      }
    </div>

    <ng-template #lessonCard let-lesson let-type="type">
      <app-card [hoverable]="true" [routerLink]="['/student/lessons', lesson.id]" class="h-full flex flex-col transition-all duration-300">
        <div
          class="-mx-6 -mt-6 mb-6 h-40 bg-[#0ABAB5]/20 border-b-4 border-black flex items-center justify-center relative overflow-hidden"
        >
          <img
            [src]="'https://api.dicebear.com/7.x/shapes/svg?seed=' + lesson.id"
            alt="Lesson Cover"
            class="absolute inset-0 w-full h-full object-cover opacity-50"
            referrerpolicy="no-referrer"
          />
          <span
            class="material-icons text-black text-6xl relative z-10 drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]"
            >menu_book</span
          >
        </div>

        <div class="flex-1 flex flex-col">
          <div class="flex justify-between items-start mb-4">
            <app-badge variant="primary">{{ lesson.subject }}</app-badge>
            <span
              class="text-sm font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg border-2 border-black"
              >{{ lesson.duration }}</span
            >
          </div>
          <h3 class="text-2xl font-black text-black mb-2 leading-tight">{{ lesson.title }}</h3>
          <p class="text-base font-bold text-gray-600 mb-2">
            Grade {{ lesson.grade }} &bull; {{ lesson.difficulty }}
          </p>
          <p class="text-sm font-medium text-gray-500 mb-6 line-clamp-3 flex-1 italic">
            {{ lesson.description }}
          </p>

          <div class="flex justify-between items-center mt-auto pt-4 border-t-4 border-black/10">
            @switch (getLessonStatus(lesson.id)) {
              @case ('in-progress') {
                <span class="text-base font-black uppercase tracking-wide text-[#0ABAB5]"
                  >In Progress</span
                >
              }
              @case ('quiz-ready') {
                <span class="text-base font-black uppercase tracking-wide text-amber-600"
                  >Quiz Ready</span
                >
              }
              @case ('quiz-submitted') {
                <span class="text-base font-black uppercase tracking-wide text-green-600"
                  >Completed ✓</span
                >
              }
              @default {
                <span class="text-base font-black uppercase tracking-wide text-gray-400"
                  >Not Started</span
                >
              }
            }

            @switch (getLessonStatus(lesson.id)) {
              @case ('in-progress') {
                <app-button
                  variant="primary"
                  size="sm"
                  [routerLink]="['/student/lessons', lesson.id]"
                >
                  Continue
                </app-button>
              }
              @case ('quiz-submitted') {
                <app-button
                  variant="secondary"
                  size="sm"
                  [routerLink]="['/student/lessons', lesson.id]"
                >
                  Review
                </app-button>
              }
              @default {
                <app-button
                  variant="primary"
                  size="sm"
                  [routerLink]="['/student/lessons', lesson.id]"
                >
                  @if (getLessonStatus(lesson.id) === 'quiz-ready') {
                    Go to Lesson
                  } @else {
                    Start Lesson
                  }
                </app-button>
              }
            }
          </div>
        </div>
      </app-card>
    </ng-template>
  `,
})
export class LessonListComponent implements OnInit {
  lessonsStore = inject(LessonsStore);
  progressStore = inject(ProgressStore);
  authStore = inject(AuthStore);
  activeTab = signal<'browser' | 'my-lessons' | 'history'>('browser');

  private readonly lessonStatusMap = signal<Record<string, string>>({});

  completedLessons = computed(() => {
    const history = this.progressStore.myHistory();
    const completedHistoryIds = new Set(
      history
        .filter((h) => h.status === 'completed' || h.dateCompleted != null || (h.status !== 'in_progress' && h.status !== 'not_started'))
        .map((h) => h.lessonId)
    );
    return this.lessonsStore.publishedLessons().filter((l) => completedHistoryIds.has(l.id));
  });
  
  constructor() {
    effect(() => {
      const lessons = this.lessonsStore.publishedLessons();
      const studentId = this.authStore.user()?.id;
      if (lessons.length > 0 && studentId) {
        untracked(() => {
          this.lessonsStore.loadAccessibleLessons(studentId);
        });
      }
    });
  }

  ngOnInit() {
    this.lessonsStore.loadLessons();
    this.progressStore.loadMyHistory();
  }

  getLessonStatus(lessonId: string): string {
    const testMapStatus = this.lessonStatusMap()[lessonId];
    if (testMapStatus) {
      return testMapStatus;
    }

    const lesson = this.lessonsStore.lessons().find(l => l.id === lessonId);
    if (lesson) {
      const status = (lesson.status || '').toLowerCase().trim();
      if (status === 'finished' || status === 'completed' || status === 'quiz-submitted') {
        return 'quiz-submitted';
      }
      if (status === 'in progress' || status === 'in-progress') {
        return 'in-progress';
      }
      if (status === 'quiz-ready') {
        return 'quiz-ready';
      }
    }

    // Fallback to history entry if available
    const history = this.progressStore.myHistory();
    const entry = history.find(h => h.lessonId === lessonId);
    if (entry) {
      if (entry.status === 'completed' || entry.dateCompleted || (entry.status !== 'in_progress' && entry.status !== 'not_started')) {
        return 'quiz-submitted';
      }
      return 'in-progress';
    }

    return 'not-started';
  }

  hasAccess(): boolean {
    return true;
  }
}