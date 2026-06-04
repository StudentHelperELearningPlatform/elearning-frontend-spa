import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LessonsStore } from '../store/lessons.store';
import { ProgressStore } from '../store/progress.store';

import { ButtonComponent } from '@shared/components/button/button.component';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '@shared/components/error-state/error-state.component';

@Component({
  selector: 'app-lesson-overview',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    BadgeComponent,
    EmptyStateComponent,
    ErrorStateComponent,
  ],
  template: `
    <div class="h-auto min-h-[calc(100vh-80px)] bg-gray-50 p-6 md:p-12 relative overflow-y-auto">
      <!-- Decorative Background Pattern -->
      <div
        class="absolute inset-0 opacity-5 pointer-events-none"
        style="background-image: radial-gradient(#000 2px, transparent 2px); background-size: 30px 30px;"
      ></div>

      <div class="max-w-5xl mx-auto relative z-10">
        <!-- Back Button -->
        <button
          (click)="goBack()"
          class="flex items-center text-black font-bold hover:text-[#0ABAB5] transition-colors mb-6"
        >
          <span class="material-icons mr-2">arrow_back</span>
          Back to Lessons
        </button>

        @if (lessonsStore.loading() || progressStore.myLessonStatsLoading()) {
          <div class="space-y-6">
            <div class="h-10 bg-gray-200 rounded-xl w-1/3 animate-pulse"></div>
            <div class="h-64 bg-gray-200 rounded-3xl border-4 border-gray-300 animate-pulse"></div>
          </div>
        } @else if (lessonsStore.error()?.kind === 'not-found') {
          <div class="py-12">
            <app-empty-state
              [title]="'Lesson not found'"
              [description]="'We could not find the lesson you are looking for. It may have been removed.'"
              icon="search_off"
            ></app-empty-state>
          </div>
        } @else if (lessonsStore.error() || progressStore.myLessonStatsError()) {
          <div class="py-12">
            <app-error-state
              [title]="'Could not load lesson overview'"
              [message]="lessonsStore.error()?.message || progressStore.myLessonStatsError() || 'Unknown error'"
              retryLabel="Retry"
              (retryClick)="reloadLesson()"
            ></app-error-state>
          </div>
        } @else if (lessonsStore.currentLesson()) {

          <!-- Header Card -->
          <div class="bg-white rounded-3xl border-4 border-black p-8 md:p-12 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
            <div class="flex-1">
              <div class="flex flex-wrap items-center gap-3 mb-4">
                <app-badge variant="primary" icon="category">{{ lessonsStore.currentLesson()?.subject }}</app-badge>
                <app-badge variant="secondary" icon="schedule">{{ lessonsStore.currentLesson()?.duration }}</app-badge>
                <app-badge variant="neutral" icon="bar_chart">{{ lessonsStore.currentLesson()?.difficulty }}</app-badge>
              </div>
              <h1 class="text-4xl md:text-6xl font-black text-black mb-6 tracking-tight leading-none">
                {{ lessonsStore.currentLesson()?.title }}
              </h1>
              <p class="text-lg text-gray-700 font-medium leading-relaxed max-w-3xl mb-8">
                {{ lessonsStore.currentLesson()?.description }}
              </p>
              <div class="flex gap-4 items-center">
                <app-button
                  variant="primary"
                  icon="play_arrow"
                  iconPosition="left"
                  (btnClick)="startLesson()"
                  [ngClass]="'!text-lg !px-8 !py-4'"
                >
                  {{ (progressStore.myLessonStats()?.completedModules || 0) > 0 ? 'Continue Lesson' : 'Start Lesson' }}
                </app-button>
              </div>
            </div>

            <!-- Stats/Progress Widget -->
            <div class="w-full md:w-80 bg-gray-50 rounded-2xl border-4 border-black p-6 shrink-0 relative overflow-hidden group hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              <h3 class="font-black text-xl mb-4 text-black flex items-center">
                <span class="material-icons mr-2 text-[#0ABAB5]">assessment</span>
                Your Progress
              </h3>

              <div class="mb-6">
                <div class="flex justify-between items-end mb-2">
                  <span class="font-bold text-gray-600 text-sm">Completion</span>
                  <span class="font-black text-3xl text-black leading-none">{{ progressStore.myLessonStats()?.completionPercentage || 0 }}%</span>
                </div>
                <div class="h-4 bg-white border-2 border-black rounded-full overflow-hidden">
                  <div class="h-full bg-[#0ABAB5]" [style.width.%]="progressStore.myLessonStats()?.completionPercentage || 0"></div>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex justify-between items-center py-2 border-b-2 border-gray-200">
                  <span class="font-bold text-gray-600 text-sm">Modules Done</span>
                  <span class="font-black text-black">{{ progressStore.myLessonStats()?.completedModules || 0 }} / {{ lessonsStore.currentLesson()?.modules?.length || progressStore.myLessonStats()?.totalModules || 0 }}</span>
                </div>
                @if (progressStore.myLessonStats()?.timeSpentMinutes !== null) {
                  <div class="flex justify-between items-center py-2 border-b-2 border-gray-200">
                    <span class="font-bold text-gray-600 text-sm">Time Spent</span>
                    <span class="font-black text-black">{{ progressStore.myLessonStats()?.timeSpentMinutes }} min</span>
                  </div>
                }
                @if (progressStore.myLessonStats()?.quizScore !== null) {
                  <div class="flex justify-between items-center py-2 border-b-2 border-gray-200">
                    <span class="font-bold text-gray-600 text-sm">Quiz Score</span>
                    <span class="font-black text-black">{{ progressStore.myLessonStats()?.quizScore }} pts</span>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Modules List -->
          <div>
            <h2 class="text-3xl font-black text-black mb-6">Lesson Contents</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (sub of lessonsStore.currentLesson()?.subcapitols; track sub.id) {
                @for (module of sub.blocks; track module.id) {
                  <div class="bg-white rounded-2xl border-4 border-gray-300 p-6 flex flex-col hover:border-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200">
                    <div class="flex items-center justify-between mb-4">
                      <div class="w-10 h-10 rounded-full flex items-center justify-center font-black text-lg bg-gray-100 text-black border-2 border-gray-300">
                        {{ getGlobalIndex(sub.id, module.id) + 1 }}
                      </div>
                      <div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#0ABAB5]/10 text-[#0ABAB5]">
                        <span class="material-icons">{{ getModuleIcon(module.type) }}</span>
                      </div>
                    </div>
                    <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 line-clamp-1">{{ sub.title }}</div>
                    <h4 class="font-black text-lg text-black leading-tight mb-2 flex-1">{{ module.title }}</h4>
                    <div class="mt-auto pt-2 border-t-2 border-gray-100">
                      <span class="text-xs font-bold uppercase tracking-widest text-gray-500">{{ module.type }}</span>
                    </div>
                  </div>
                }
              }
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class LessonOverviewComponent implements OnInit, OnDestroy {
  lessonsStore = inject(LessonsStore);
  progressStore = inject(ProgressStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected lessonId: string | null = null;

  ngOnInit() {
    this.reloadLesson();
  }

  ngOnDestroy() {
    this.lessonsStore.clearCompletionState();
  }

  reloadLesson() {
    this.lessonId = this.route.snapshot.paramMap.get('id');
    if (this.lessonId) {
      this.lessonsStore.loadLesson(this.lessonId);
      this.progressStore.loadMyLessonStats({ lessonId: this.lessonId });
    }
  }

  goBack() {
    this.router.navigate(['/student/lessons']);
  }

  startLesson() {
    if (this.lessonId) {
      this.router.navigate(['/student/lesson-viewer', this.lessonId]);
    }
  }

  getGlobalIndex(subId: string, moduleId: string): number {
    const lesson = this.lessonsStore.currentLesson();
    if (!lesson) return -1;
    let index = 0;
    for (const s of lesson.subcapitols ?? []) {
      if (s.id === subId) {
        const moduleIdx = s.blocks.findIndex((b) => b.id === moduleId);
        return index + moduleIdx;
      }
      index += s.blocks.length;
    }
    return -1;
  }

  getModuleIcon(type: string): string {
    switch (type) {
      case 'video': return 'play_circle';
      case 'text': return 'article';
      case 'quiz': return 'quiz';
      case 'interactive': return 'touch_app';
      case 'audio': return 'headphones';
      default: return 'menu_book';
    }
  }
}
