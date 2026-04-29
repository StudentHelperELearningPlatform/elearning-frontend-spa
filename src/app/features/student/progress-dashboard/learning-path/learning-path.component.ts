import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { LearningPathsStore } from '../../store/learning-paths.store';
import { PathLesson } from '../../../../shared/models/learning-path.model';

@Component({
  selector: 'app-learning-path',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardComponent,
    BadgeComponent,
    ButtonComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    SkeletonComponent,
  ],
  template: `
    <div class="p-6 max-w-4xl mx-auto font-sans text-black">
      <!-- Loading skeleton -->
      @if (store.loading()) {
        <div class="space-y-6" aria-busy="true" aria-label="Loading learning path">
          <div
            class="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <app-skeleton height="2.5rem" width="60%" />
            <app-skeleton height="1rem" width="80%" className="mt-4" />
            <app-skeleton height="1rem" width="40%" className="mt-2" />
          </div>
          @for (i of [1, 2, 3]; track i) {
            <div class="flex gap-8 items-center">
              <div
                class="flex-1 bg-white border-4 border-gray-200 rounded-3xl p-6 h-32 animate-pulse"
              ></div>
              <div
                class="w-12 h-12 rounded-full bg-gray-200 border-4 border-gray-300 animate-pulse"
              ></div>
              <div class="flex-1 hidden md:block"></div>
            </div>
          }
        </div>
      }

      <!-- Error state -->
      @else if (store.error()) {
        <app-error-state
          title="Failed to load learning path"
          [message]="store.error()!"
          retryLabel="Try again"
          (retryClick)="reload()"
        />
      }

      <!-- Empty state -->
      @else if (store.currentPath() && store.totalCount() === 0) {
        <app-empty-state
          title="No lessons yet"
          description="This learning path has no lessons. Check back soon!"
          icon="school"
        />
      }

      <!-- Loaded -->
      @else if (store.currentPath(); as path) {
        <!-- Path header -->
        <div
          class="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12"
        >
          <div class="flex-1">
            <h1 class="text-4xl font-black text-black tracking-tight uppercase italic">
              {{ path.title }}
            </h1>
            <p class="text-gray-600 mt-2 text-base font-medium max-w-xl">{{ path.description }}</p>

            <div class="mt-4 flex flex-wrap gap-4 text-sm font-bold text-gray-500">
              <span class="flex items-center gap-1">
                <span class="material-icons text-base" aria-hidden="true">menu_book</span>
                {{ path.totalLessons }} lessons
              </span>
              <span class="flex items-center gap-1">
                <span class="material-icons text-base" aria-hidden="true">schedule</span>
                {{ path.estimatedTotalTime }}
              </span>
            </div>

            <!-- Overall progress bar -->
            <div class="mt-6">
              <div class="flex items-center justify-between mb-1 text-sm font-bold">
                <span
                  >{{ store.completedCount() }} of {{ store.totalCount() }} lessons completed</span
                >
                <span>{{ store.progressPercent() }}%</span>
              </div>
              <div class="h-4 bg-gray-100 border-2 border-black rounded-full overflow-hidden">
                <div
                  class="h-full bg-[#0ABAB5] transition-all duration-500"
                  [style.width.%]="store.progressPercent()"
                  role="progressbar"
                  [attr.aria-valuenow]="store.progressPercent()"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>

          @if (store.nextAvailableLesson(); as next) {
            <app-button
              variant="primary"
              size="lg"
              icon="play_arrow"
              [routerLink]="['/student/lessons', next.id]"
              aria-label="Continue learning"
            >
              Continue Learning
            </app-button>
          }
        </div>

        <!-- Timeline -->
        <div class="relative space-y-16 pb-20">
          <!-- Vertical line (desktop) -->
          <div
            class="absolute left-1/2 top-0 bottom-0 w-1 bg-black -translate-x-1/2 hidden md:block"
            aria-hidden="true"
          ></div>

          @for (lesson of path.lessons; track lesson.id; let i = $index) {
            <div
              class="relative flex flex-col md:flex-row items-center gap-8"
              [class.md:flex-row-reverse]="i % 2 !== 0"
            >
              <!-- Card -->
              <div class="flex-1 w-full md:w-auto">
                <app-card
                  [hoverable]="lesson.status !== 'LOCKED'"
                  [customClass]="cardClass(lesson)"
                >
                  <div class="flex gap-4">
                    <!-- Thumbnail -->
                    <div
                      class="w-20 h-20 rounded-xl border-4 border-black overflow-hidden flex-shrink-0 bg-gray-100 relative"
                    >
                      @if (lesson.thumbnail) {
                        <img
                          [src]="lesson.thumbnail"
                          [alt]="lesson.title + ' thumbnail'"
                          class="w-full h-full object-cover"
                          referrerpolicy="no-referrer"
                        />
                      }
                      @if (lesson.status === 'LOCKED') {
                        <div class="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span class="material-icons text-white" aria-hidden="true">lock</span>
                        </div>
                      }
                    </div>

                    <!-- Body -->
                    <div class="flex-1 min-w-0">
                      <div class="flex justify-between items-start mb-1 gap-2">
                        <h3 class="text-lg font-black leading-tight">
                          <span class="text-[#0ABAB5] mr-1">{{ i + 1 }}.</span>{{ lesson.title }}
                        </h3>
                        @if (lesson.status === 'COMPLETED') {
                          <span
                            class="material-icons text-[#0ABAB5] flex-shrink-0"
                            aria-label="Completed"
                            >check_circle</span
                          >
                        }
                      </div>

                      <div class="flex flex-wrap gap-2 mb-3">
                        <app-badge variant="secondary" icon="category">{{
                          lesson.subject
                        }}</app-badge>
                        <app-badge variant="neutral" icon="schedule">{{
                          lesson.duration
                        }}</app-badge>
                      </div>

                      @if (lesson.status === 'LOCKED') {
                        <p class="text-xs font-bold text-red-500 uppercase tracking-tight">
                          <span class="material-icons text-xs align-middle" aria-hidden="true"
                            >lock</span
                          >
                          Complete &ldquo;{{ lesson.prerequisiteTitle }}&rdquo; first
                        </p>
                      } @else if (lesson.status === 'COMPLETED' && lesson.score !== null) {
                        <app-badge variant="success" icon="emoji_events"
                          >Score: {{ lesson.score }}%</app-badge
                        >
                      }

                      <div class="mt-4 flex justify-end">
                        @if (lesson.status === 'AVAILABLE') {
                          <app-button
                            variant="primary"
                            size="sm"
                            icon="play_arrow"
                            [routerLink]="['/student/lessons', lesson.id]"
                            [attr.aria-label]="'Start ' + lesson.title"
                          >
                            Start
                          </app-button>
                        } @else if (lesson.status === 'COMPLETED') {
                          <app-button
                            variant="secondary"
                            size="sm"
                            icon="replay"
                            [routerLink]="['/student/lessons', lesson.id]"
                            [attr.aria-label]="'Review ' + lesson.title"
                          >
                            Review
                          </app-button>
                        }
                      </div>
                    </div>
                  </div>
                </app-card>
              </div>

              <!-- Timeline dot -->
              <div
                class="relative z-10 w-12 h-12 rounded-full border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors flex-shrink-0"
                [ngClass]="{
                  'bg-[#0ABAB5] text-white': lesson.status === 'COMPLETED',
                  'bg-white text-black': lesson.status === 'AVAILABLE',
                  'bg-gray-200 text-gray-400': lesson.status === 'LOCKED',
                }"
                [attr.aria-label]="'Lesson ' + (i + 1) + ' – ' + lesson.status"
              >
                <span class="font-black text-lg">{{ i + 1 }}</span>
              </div>

              <!-- Spacer (alternating layout) -->
              <div class="flex-1 hidden md:block"></div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class LearningPathComponent implements OnInit {
  store = inject(LearningPathsStore);
  private route = inject(ActivatedRoute);

  private pathId = '';

  ngOnInit() {
    this.pathId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.pathId) {
      this.store.loadPath(this.pathId);
    }
  }

  reload() {
    if (this.pathId) {
      this.store.loadPath(this.pathId);
    }
  }

  cardClass(lesson: PathLesson): string {
    const parts: string[] = [];
    if (lesson.status === 'LOCKED') parts.push('opacity-60 grayscale');
    if (lesson.status === 'COMPLETED') parts.push('border-[#0ABAB5]');
    return parts.join(' ');
  }
}
