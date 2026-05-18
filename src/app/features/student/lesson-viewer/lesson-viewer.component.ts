import { Component, inject, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LessonsStore, Subcapitol, Module } from '../store/lessons.store';
import { ProgressStore } from '../store/progress.store';
import { AuthStore } from '../../auth/store/auth.store';
import { MediaPlayerComponent } from '../../../shared/components/media-player/media-player.component';
import { ModuleContentComponent } from './module-content/module-content.component';

import { ButtonComponent } from '@shared/components/button/button.component';
import { CardComponent } from '@shared/components/card/card.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '@shared/components/error-state/error-state.component';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { CheckoutModalComponent } from '../payments/checkout-modal.component';

@Component({
  selector: 'app-lesson-viewer',
  imports: [
    CommonModule,
    RouterModule,
    MediaPlayerComponent,
    ModuleContentComponent,
    ButtonComponent,
    CardComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    BadgeComponent,
    CheckoutModalComponent,
  ],
  template: `
    <div class="h-auto md:h-[calc(100vh-80px)] flex flex-col md:flex-row bg-gray-50 overflow-y-auto md:overflow-hidden">
      <!-- Sidebar / Modules List -->
      <div
        class="w-full md:w-80 bg-white border-r-4 border-black flex flex-col h-auto md:h-full z-10 shadow-[4px_0px_0px_0px_rgba(0,0,0,1)]"
      >
        <div class="p-6 border-b-4 border-black bg-[#0ABAB5]/10">
          <button
            (click)="goBack()"
            class="flex items-center text-black font-bold hover:text-[#0ABAB5] transition-colors mb-4"
          >
            <span class="material-icons mr-2">arrow_back</span>
            Back to Lessons
          </button>
          <h2 class="text-2xl font-black text-black leading-tight">
            {{ store.currentLesson()?.title || 'Loading...' }}
          </h2>
          <div class="flex items-center mt-3 space-x-2">
            <app-badge variant="primary" icon="category">{{
              store.currentLesson()?.subject
            }}</app-badge>
            <app-badge variant="secondary" icon="schedule"
              >{{ store.currentLesson()?.duration }}m</app-badge
            >
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-6">
          @if (store.loading()) {
            @for (i of [1, 2, 3]; track i) {
              <div
                class="h-20 bg-gray-200 rounded-2xl border-2 border-gray-300 animate-pulse"
              ></div>
            }
          } @else {
            @for (sub of store.currentLesson()?.subcapitols; track sub.id) {
              <div class="space-y-3">
                <h3
                  class="font-black text-black uppercase tracking-wider text-xs mb-2 px-2 opacity-50"
                >
                  {{ sub.title }}
                </h3>

                @for (module of sub.blocks; track module.id) {
                  @let globalIdx = getGlobalIndex(sub, module);
                  <div
                    (click)="selectModule(globalIdx)"
                    (keydown.enter)="selectModule(globalIdx)"
                    tabindex="0"
                    class="p-4 rounded-2xl border-4 cursor-pointer transition-all duration-200 flex items-center group relative overflow-hidden"
                    [ngClass]="{
                      'border-black bg-[#0ABAB5] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]':
                        currentModuleIndex() === globalIdx,
                      'border-gray-300 bg-white hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]':
                        currentModuleIndex() !== globalIdx,
                    }"
                  >
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm mr-3 border-2"
                      [ngClass]="{
                        'bg-white text-[#0ABAB5] border-black': currentModuleIndex() === globalIdx,
                        'bg-gray-100 text-gray-500 border-gray-300 group-hover:border-black group-hover:text-black':
                          currentModuleIndex() !== globalIdx,
                      }"
                    >
                      {{ globalIdx + 1 }}
                    </div>

                    <div class="flex-1">
                      <h4
                        class="font-bold text-base leading-tight"
                        [ngClass]="{
                          'text-white': currentModuleIndex() === globalIdx,
                          'text-black': currentModuleIndex() !== globalIdx,
                        }"
                      >
                        {{ module.title }}
                      </h4>
                      <div
                        class="flex items-center mt-1 text-xs font-medium opacity-80"
                        [ngClass]="{
                          'text-white': currentModuleIndex() === globalIdx,
                          'text-gray-500': currentModuleIndex() !== globalIdx,
                        }"
                      >
                        <span class="material-icons text-sm mr-1">{{
                          getModuleIcon(module.type)
                        }}</span>
                        <span class="capitalize">{{ module.type }}</span>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          }
        </div>
      </div>

      <div class="flex-1 flex flex-col h-auto md:h-full overflow-y-visible md:overflow-hidden bg-white relative">
        <!-- Decorative Background Pattern -->
        <div
          class="absolute inset-0 opacity-5 pointer-events-none"
          style="background-image: radial-gradient(#000 2px, transparent 2px); background-size: 30px 30px;"
        ></div>

        <div class="flex-1 overflow-y-auto p-6 md:p-12 relative z-10">
          @if (store.loading()) {
            <div class="max-w-4xl mx-auto space-y-6">
              <div class="h-10 bg-gray-200 rounded-xl w-1/2 animate-pulse"></div>
              <div
                class="h-64 bg-gray-200 rounded-3xl border-4 border-gray-300 animate-pulse"
              ></div>
              <div class="space-y-3">
                <div class="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
          } @else if (store.error()?.kind === 'not-found') {
            <div class="max-w-2xl mx-auto py-12">
              <app-empty-state
                [title]="'Lesson not found'"
                [description]="
                  'We could not find the lesson you are looking for. It may have been removed.'
                "
                icon="search_off"
              ></app-empty-state>
            </div>
          } @else if (store.error()) {
            <div class="max-w-2xl mx-auto py-12">
              <app-error-state
                [title]="'Could not load lesson'"
                [message]="store.error()?.message || 'Unknown error'"
                retryLabel="Retry"
                (retryClick)="reloadLesson()"
              ></app-error-state>
            </div>
          } @else if (currentModule()) {
            <div class="max-w-4xl mx-auto">
              <div class="mb-8">
                <h1 class="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">
                  {{ currentModule()?.title }}
                </h1>
                <div class="h-2 w-24 bg-[#0ABAB5] rounded-full"></div>
              </div>

              @if (
                currentModule()?.type === 'video' ||
                currentModule()?.type === 'image' ||
                currentModule()?.type === 'audio'
              ) {
                <div class="mb-10">
                  <app-media-player
                    [url]="currentModule()?.mediaUrl || 'https://picsum.photos/seed/lesson/800/450'"
                    [type]="
                      currentModule()?.type === 'video'
                        ? 'video'
                        : currentModule()?.type === 'audio'
                          ? 'audio'
                          : 'image'
                    "
                    [title]="currentModule()?.title || 'Media'"
                  >
                  </app-media-player>
                </div>
              }

              <app-card class="mb-10 block">
                <div class="p-8">
                  <app-module-content
                    [content]="currentModule()?.content || ''"
                  ></app-module-content>
                </div>
              </app-card>
            </div>
          } @else {
            <div class="h-full flex items-center justify-center">
              <app-empty-state
                [title]="'Select a Module'"
                [description]="'Choose a module from the sidebar to start learning.'"
                [icon]="'menu_book'"
              ></app-empty-state>
            </div>
          }
        </div>

        @if (store.allModulesComplete() && hasAccess()) {
          @if (store.lastQuizAttempt(); as attempt) {
            <div
              class="mx-6 mb-4 p-5 rounded-2xl border-4 border-[#0ABAB5] bg-[#0ABAB5]/10 flex flex-col md:flex-row items-center justify-between gap-4"
              data-testid="quiz-completed-banner"
            >
              <div class="flex items-center gap-3">
                <span class="material-icons text-[#0ABAB5] text-4xl">emoji_events</span>
                <div>
                  <p class="font-black text-black text-lg">Final Quiz Completed!</p>
                  <p class="text-gray-600 font-medium text-sm">
                    Last score:
                    <span class="font-black text-[#0ABAB5]"
                      >{{ attempt.score }}/{{ attempt.totalPoints }} ({{
                        attempt.percentage
                      }}%)</span
                    >
                    &nbsp;&bull;&nbsp;{{ attempt.passed ? '✓ Passed' : '✕ Not passed' }}
                  </p>
                </div>
              </div>
              <app-button variant="secondary" icon="refresh" (btnClick)="startFinalQuiz()">
                Retake Quiz
              </app-button>
            </div>
          } @else {
            <div
              class="mx-6 mb-4 p-5 rounded-2xl border-4 border-black bg-[#FFD700]/20 flex flex-col md:flex-row items-center justify-between gap-4"
              data-testid="final-quiz-cta-banner"
            >
              <div class="flex items-center gap-3">
                <span class="text-3xl" aria-hidden="true">🎉</span>
                <div>
                  <p class="font-black text-black text-lg">
                    Lesson complete! Ready for the final quiz?
                  </p>
                  <p class="text-gray-600 font-medium text-sm">
                    Test your knowledge across all modules.
                  </p>
                </div>
              </div>
              <app-button
                variant="primary"
                icon="quiz"
                iconPosition="right"
                (btnClick)="startFinalQuiz()"
              >
                Start Final Quiz
              </app-button>
            </div>
          }
        }

        <!-- Bottom Navigation Bar -->
        @if (hasAccess()) {
          <div
            class="bg-white border-t-4 border-black p-4 md:p-6 flex items-center justify-between z-20 shadow-[0px_-4px_0px_0px_rgba(0,0,0,1)]"
          >
            <app-button
              variant="secondary"
              icon="arrow_back"
              [disabled]="currentModuleIndex() === 0"
              (btnClick)="previousModule()"
            >
              Previous
            </app-button>

            <div class="hidden md:flex items-center space-x-2">
              @for (module of store.currentLesson()?.modules; track module.id; let idx = $index) {
                <div
                  class="w-3 h-3 rounded-full border-2 border-black transition-colors"
                  [ngClass]="{
                    'bg-[#0ABAB5]': idx <= currentModuleIndex(),
                    'bg-gray-200': idx > currentModuleIndex(),
                  }"
                ></div>
              }
            </div>

            @if (currentModuleIndex() < (store.currentLesson()?.modules?.length || 0) - 1) {
              <app-button
                variant="primary"
                icon="arrow_forward"
                iconPosition="right"
                (btnClick)="nextModule()"
              >
                Next Module
              </app-button>
            } @else {
              <app-button
                variant="primary"
                icon="check_circle"
                iconPosition="right"
                (btnClick)="completeLastModule()"
              >
                Finish Lesson
              </app-button>
            }
          </div>
        }
      </div>

      <app-checkout-modal
        [isOpen]="checkoutOpen()"
        [lessonId]="store.currentLesson()?.id ?? ''"
        [lessonTitle]="store.currentLesson()?.title ?? ''"
        (closed)="checkoutOpen.set(false)"
      />
    </div>
  `,
})
export class LessonViewerComponent implements OnInit, OnDestroy {
  store = inject(LessonsStore);
  progressStore = inject(ProgressStore);
  authStore = inject(AuthStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  currentModuleIndex = signal(0);
  private readonly lessonId = signal<string | null>(null);
  protected readonly checkoutOpen = signal(false);

  hasAccess = computed(() => true);

  ngOnInit() {
    this.reloadLesson();
  }

  ngOnDestroy() {
    this.store.clearCompletionState();
  }

  unlockLesson() {
    this.checkoutOpen.set(true);
  }

  reloadLesson() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.lessonId.set(id);
      this.store.loadLesson(id);
      this.store.loadFinalQuizAttempts(id);
    }
  }

  currentModule = computed(() => {
    const lesson = this.store.currentLesson();
    if (!lesson || !lesson.modules || lesson.modules.length === 0) return null;
    const index = this.currentModuleIndex();
    if (index < 0 || index >= lesson.modules.length) return null;
    return lesson.modules[index];
  });

  selectModule(index: number) {
    this.currentModuleIndex.set(index);
  }

  nextModule() {
    const lesson = this.store.currentLesson();
    const module = this.currentModule();
    if (lesson && module) {
      this.store.markModuleComplete(lesson.id, module.id);
    }

    if (lesson && lesson.modules && this.currentModuleIndex() < lesson.modules.length - 1) {
      this.currentModuleIndex.update((i) => i + 1);
    }
  }

  previousModule() {
    if (this.currentModuleIndex() > 0) {
      this.currentModuleIndex.update((i) => i - 1);
    }
  }

  completeLastModule() {
    const lesson = this.store.currentLesson();
    const module = this.currentModule();
    if (lesson) {
      if (module) {
        this.store.markModuleComplete(lesson.id, module.id);
      }
      this.startFinalQuiz();
    }
  }

  finishLesson() {
    this.router.navigate(['/student/lessons']);
  }

  startFinalQuiz() {
    const id = this.lessonId();
    if (id) {
      this.router.navigate(['/student/quiz-player', id]);
    }
  }

  goBack() {
    this.router.navigate(['/student/lessons']);
  }

  getGlobalIndex(sub: Subcapitol, module: Module): number {
    const lesson = this.store.currentLesson();
    if (!lesson) return -1;

    let index = 0;
    for (const s of lesson.subcapitols ?? []) {
      if (s.id === sub.id) {
        const moduleIdx = s.blocks.findIndex((b) => b.id === module.id);
        return index + moduleIdx;
      }
      index += s.blocks.length;
    }
    return -1;
  }

  getModuleIcon(type: string): string {
    switch (type) {
      case 'video':
        return 'play_circle';
      case 'text':
        return 'article';
      case 'quiz':
        return 'quiz';
      case 'interactive':
        return 'touch_app';
      case 'audio':
        return 'headphones';
      default:
        return 'menu_book';
    }
  }
}