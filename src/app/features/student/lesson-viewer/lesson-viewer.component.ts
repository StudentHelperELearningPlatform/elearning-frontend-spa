import { Component, inject, OnInit, OnDestroy, signal, computed, effect } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LessonsStore, Subcapitol, Module } from '../store/lessons.store';
import { ProgressStore } from '../store/progress.store';
import { AuthStore } from '../../auth/store/auth.store';
import { MediaPlayerComponent } from '../../../shared/components/media-player/media-player.component';
import { ModuleContentComponent } from './module-content/module-content.component';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { QUIZ_API_URL } from '@core/tokens/api.token';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ButtonComponent } from '@shared/components/button/button.component';
import { CardComponent } from '@shared/components/card/card.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '@shared/components/error-state/error-state.component';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { ModalComponent } from '@shared/components/modal/modal.component';

type ViewerMediaType = 'image' | 'video' | 'pdf';

interface ViewerMedia {
  name: string;
  url: string;
  type: ViewerMediaType;
  mediaId?: string;
}

interface QuizAttempt {
  attemptId?: string;
  id?: string;
  score?: number;
  submittedAt?: number | string;
  passed?: boolean;
  percentage?: number;
}

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
    ModalComponent,
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
            <app-badge variant="primary" icon="category">
              {{ store.currentLesson()?.subject }}
            </app-badge>

            <app-badge variant="secondary" icon="schedule">
              {{ store.currentLesson()?.duration }}
            </app-badge>
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
                <div class="flex items-center justify-between mb-2 px-2">
                  <h3 class="font-black text-black uppercase tracking-wider text-xs opacity-75 truncate max-w-[150px]" [title]="sub.title">
                    {{ sub.title }}
                  </h3>

                  @let exists = subcapitolQuizzesExist()[sub.id] !== false;
                  @if (exists) {
                    <div class="flex items-center gap-1.5 shrink-0">
                      @let bestAttempt = getBestAttempt(sub.id);
                      @if (bestAttempt) {
                        <span
                          class="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wide border bg-gray-100 text-gray-700 border-gray-300"
                        >
                          {{ bestAttempt.score ?? 0 }} pts
                        </span>
                      }

                      <button
                        (click)="startCheckQuiz(sub.id)"
                        class="flex items-center justify-center p-1 rounded-lg border-2 border-black bg-white text-black hover:bg-[#0ABAB5]/10 hover:text-[#0ABAB5] active:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none duration-150"
                        [title]="bestAttempt ? 'Retake Check Quiz' : 'Start Check Quiz'"
                      >
                        <span class="material-icons text-[14px]">quiz</span>
                      </button>
                    </div>
                  }
                </div>

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
                        currentModuleIndex() !== globalIdx
                    }"
                  >
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm mr-3 border-2"
                      [ngClass]="{
                        'bg-white text-[#0ABAB5] border-black': currentModuleIndex() === globalIdx,
                        'bg-gray-100 text-gray-500 border-gray-300 group-hover:border-black group-hover:text-black':
                          currentModuleIndex() !== globalIdx
                      }"
                    >
                      {{ globalIdx + 1 }}
                    </div>

                    <div class="flex-1">
                      <h4
                        class="font-bold text-base leading-tight"
                        [ngClass]="{
                          'text-white': currentModuleIndex() === globalIdx,
                          'text-black': currentModuleIndex() !== globalIdx
                        }"
                      >
                        {{ module.title }}
                      </h4>
                      <div
                        class="flex items-center mt-1 text-xs font-medium opacity-80"
                        [ngClass]="{
                          'text-white': currentModuleIndex() === globalIdx,
                          'text-gray-500': currentModuleIndex() !== globalIdx
                        }"
                      >
                        <span class="material-icons text-sm mr-1">
                          {{ getModuleIcon(module.type) }}
                        </span>
                        <span class="capitalize">{{ getModuleLabel(module.type) }}</span>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          }
        </div>
      </div>

      <div class="flex-1 flex flex-col h-auto md:h-full overflow-y-auto md:overflow-hidden bg-white relative">
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

              @if (isMediaModule(currentModule())) {
                @if (currentMedia(); as media) {
                  @if (media.url) {
                    <div class="mb-10">
                      <app-media-player
                        [url]="media.url"
                        [type]="media.type"
                        [title]="media.name"
                      ></app-media-player>
                    </div>
                  } @else {
                    <app-card class="mb-6 block">
                      <div class="p-8 text-center">
                        <span class="material-icons text-5xl text-red-500 mb-3">broken_image</span>
                        <p class="font-black text-black mb-2">Media URL missing</p>
                        <p class="text-gray-600 font-medium">
                          This media block does not contain a valid URL.
                        </p>
                      </div>
                    </app-card>
                  }
                }
              } @else {
                <app-card class="mb-6 block">
                  <div class="p-8">
                    <app-module-content
                      [content]="currentModule()?.content || ''"
                    ></app-module-content>
                  </div>
                </app-card>
              }

              @if (currentModule()?.type === 'text') {
                <div class="mb-10 flex justify-end">
                  <app-button
                    variant="secondary"
                    icon="auto_awesome"
                    [loading]="store.explanationLoading()"
                    (btnClick)="explainCurrentModule()"
                  >
                    Explain with AI
                  </app-button>
                </div>
              }
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

        @if (store.allModulesComplete() && store.hasFinalQuiz() !== false) {
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
                    <span class="font-black text-[#0ABAB5]">
                      {{ attempt.score }}/{{ attempt.totalPoints }} ({{ attempt.percentage }}%)
                    </span>
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
                    'bg-gray-200': idx > currentModuleIndex()
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
      </div>

      <!-- AI Explanation Modal -->
      <app-modal
        [isOpen]="explanationOpen()"
        title="✨ AI Explanation"
        [showFooter]="false"
        (closeModal)="closeExplanation()"
      >
        @if (store.explanationLoading()) {
          <div class="space-y-3 animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded w-4/6"></div>
            <div class="h-4 bg-gray-200 rounded w-full mt-4"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        } @else if (store.explanation(); as exp) {
          <div class="max-h-[55vh] overflow-y-auto space-y-4 text-sm text-gray-800 leading-relaxed pr-1">
            <!-- Header -->
            <div class="flex items-center gap-2 pb-3 border-b-2 border-black/10 sticky top-0 bg-white">
              <span class="material-icons text-[#0ABAB5]">psychology</span>
              <p class="text-xs font-bold uppercase tracking-wider text-gray-400 m-0">
                Generated by AI · Not a substitute for the lesson
              </p>
            </div>

            <!-- Simplified Explanation -->
            <div>
              <p class="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                Simplified Explanation
              </p>
              <p
                class="whitespace-pre-wrap text-gray-800"
                [innerHTML]="boldify(exp.simplified_explanation)"
              ></p>
            </div>

            <!-- Analogy -->
            @if (exp.analogy) {
              <div class="rounded-xl border-2 border-[#0ABAB5] bg-[#0ABAB5]/5 p-4">
                <p class="text-xs font-black uppercase tracking-wider text-[#0ABAB5] mb-2 flex items-center gap-1">
                  <span class="material-icons text-sm">lightbulb</span>
                  Analogy
                </p>
                <p
                  class="whitespace-pre-wrap text-gray-700 m-0"
                  [innerHTML]="boldify(exp.analogy)"
                ></p>
              </div>
            }

            <!-- Check for Understanding -->
            @if (exp.check_for_understanding_question) {
              <div class="rounded-xl border-2 border-black bg-gray-50 p-4">
                <p class="text-xs font-black uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1">
                  <span class="material-icons text-sm">quiz</span>
                  Check Your Understanding
                </p>
                <p
                  class="text-gray-800 font-medium m-0"
                  [innerHTML]="boldify(exp.check_for_understanding_question)"
                ></p>
              </div>
            }
          </div>
        }
      </app-modal>
    </div>
  `,
})
export class LessonViewerComponent implements OnInit, OnDestroy {
  store = inject(LessonsStore);
  progressStore = inject(ProgressStore);
  authStore = inject(AuthStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly messageService = inject(MessageService);
  private readonly http = inject(HttpClient);
  private readonly quizApi = inject(QUIZ_API_URL);

  currentModuleIndex = signal(0);
  private readonly lessonId = signal<string | null>(null);
  protected readonly explanationOpen = signal(false);

  hasAccess = computed(() => true);

  subcapitolAttempts = signal<Record<string, QuizAttempt[]>>({});
  subcapitolQuizzesExist = signal<Record<string, boolean>>({});

  constructor() {
    effect(() => {
      const lesson = this.store.currentLesson();
      if (lesson && lesson.subcapitols) {
        this.loadSubcapitolAttempts(lesson.subcapitols);
      }
    });
  }

  currentModule = computed(() => {
    const lesson = this.store.currentLesson();

    if (!lesson || !lesson.modules || lesson.modules.length === 0) {
      return null;
    }

    const index = this.currentModuleIndex();

    if (index < 0 || index >= lesson.modules.length) {
      return null;
    }

    return lesson.modules[index];
  });

  protected readonly currentMedia = computed<ViewerMedia | null>(() => {
    const module = this.currentModule();

    if (!module || !this.isMediaModule(module)) {
      return null;
    }

    return this.parseMediaContent(module);
  });

  ngOnInit() {
    this.reloadLesson();
  }

  ngOnDestroy() {
    this.store.clearCompletionState();
    this.store.clearExplanation();
  }

  reloadLesson() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.lessonId.set(id);
      this.store.loadLesson(id);
      this.store.loadFinalQuizAttempts(id);
      this.progressStore.loadMyLessonStats({ lessonId: id });
    }
  }

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
      this.currentModuleIndex.update((index) => index + 1);
    }
  }

  previousModule() {
    if (this.currentModuleIndex() > 0) {
      this.currentModuleIndex.update((index) => index - 1);
    }
  }

  completeLastModule() {
    const lesson = this.store.currentLesson();
    const module = this.currentModule();
    if (lesson) {
      if (module) {
        this.store.markModuleComplete(lesson.id, module.id);
      }
      if (this.store.hasFinalQuiz() === false) {
        this.store.completeLesson(lesson.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Lesson Completed',
          detail: 'Congratulations! You have completed this lesson.',
        });
        this.router.navigate(['/student/lessons']);
      } else {
        this.startFinalQuiz();
      }
    }
  }

  finishLesson() {
    const id = this.lessonId();

    if (!id) {
      return;
    }

    const attempts = this.store.finalQuizAttempts() || [];

    if (attempts.length === 0) {
      this.router.navigate(['/student/quiz-player', id]);
      return;
    }

    const hasPassed = attempts.some((attempt) => attempt.passed === true);

    // Daca a dat quiz si a trecut -> complete lesson
    if (hasPassed) {
      this.store.completeLesson(id);
      this.router.navigate(['/student/lessons']);
    } else {
      // Daca a dat quiz dar nu a trecut -> afiseaza mesaj
      this.messageService.add({
        severity: 'error',
        summary: 'Test Final Nefinalizat',
        detail: 'Trebuie sa treci testul final inainte sa finalizezi lectia',
      });
    }
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

  loadSubcapitolAttempts(subcapitols: Subcapitol[]) {
    const requests = subcapitols.map(sub => {
      const url = `${this.quizApi}/subcapitols/${sub.id}/check-quiz/attempts`;
      return this.http.get<unknown>(url).pipe(
        map(res => {
          let attempts: QuizAttempt[] = [];
          if (Array.isArray(res)) {
            attempts = res;
          } else if (res && typeof res === 'object') {
            const obj = res as Record<string, unknown>;
            attempts = (obj['attempts'] || obj['content'] || obj['attemptsList'] || []) as QuizAttempt[];
          }
          return { id: sub.id, attempts, exists: true };
        }),
        catchError((err: { status?: number }) => {
          const exists = err?.status !== 404;
          return of({ id: sub.id, attempts: [], exists });
        })
      );
    });

    if (requests.length > 0) {
      forkJoin(requests).subscribe({
        next: (results) => {
          const nextAttempts: Record<string, QuizAttempt[]> = {};
          const nextExists: Record<string, boolean> = {};
          results.forEach(r => {
            nextAttempts[r.id] = r.attempts;
            nextExists[r.id] = r.exists ?? true;
          });
          this.subcapitolAttempts.set(nextAttempts);
          this.subcapitolQuizzesExist.set(nextExists);
        },
        error: (err) => console.error('[LessonViewerComponent] Failed to load subcapitol attempts:', err)
      });
    }
  }

  getBestAttempt(subcapitolId: string): QuizAttempt | null {
    const attempts = this.subcapitolAttempts()[subcapitolId] || [];
    if (attempts.length === 0) return null;
    return attempts.reduce((best, cur) => {
      const bestScore = best.score ?? 0;
      const curScore = cur.score ?? 0;
      return curScore > bestScore ? cur : best;
    }, attempts[0]);
  }

  isSubcapitolPassed(subcapitolId: string): boolean {
    const attempts = this.subcapitolAttempts()[subcapitolId] || [];
    return attempts.some(a => a.passed === true);
  }

  startCheckQuiz(subcapitolId: string) {
    const lessonId = this.lessonId();
    this.router.navigate(['/student/quiz-player', subcapitolId], {
      queryParams: {
        type: 'check',
        lessonId: lessonId
      }
    });
  }

  /**
   * Converts **bold** markdown syntax to <strong> HTML and sanitizes.
   * Safe: content originates from our own AI service, not user input.
   */
  boldify(text: string): SafeHtml {
    const html = (text ?? '').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  explainCurrentModule() {
    const module = this.currentModule();
    if (module) {
      this.explanationOpen.set(true);
      this.store.explainBlock(module.id);
    }
  }

  closeExplanation() {
    this.explanationOpen.set(false);
    this.store.clearExplanation();
  }

  getGlobalIndex(sub: Subcapitol, module: Module): number {
    const lesson = this.store.currentLesson();

    if (!lesson) {
      return -1;
    }

    let index = 0;

    for (const currentSubcapitol of lesson.subcapitols ?? []) {
      if (currentSubcapitol.id === sub.id) {
        const moduleIndex = currentSubcapitol.blocks.findIndex((block) => block.id === module.id);
        return index + moduleIndex;
      }

      index += currentSubcapitol.blocks.length;
    }
    return -1;
  }

  getModuleIcon(type: string): string {
    const normalizedType = String(type || '').toLowerCase();

    switch (normalizedType) {
      case 'video':
        return 'play_circle';

      case 'image':
        return 'image';

      case 'audio':
        return 'headphones';

      case 'pdf':
      case 'file':
        return 'picture_as_pdf';

      case 'text':
        return 'article';

      case 'quiz':
        return 'quiz';

      case 'interactive':
        return 'touch_app';

      default:
        return 'menu_book';
    }
  }

  protected getModuleLabel(type: string): string {
    if (type === 'pdf' || type === 'file') {
      return 'PDF';
    }

    return type;
  }

  protected isMediaModule(module: Module | null | undefined): boolean {
    if (!module) {
      return false;
    }

    const type = String(module.type);

    return type === 'image' || type === 'video' || type === 'pdf' || type === 'file';
  }

  private parseMediaContent(module: Module): ViewerMedia {
    const rawContent = module.content || '';
    const fallbackUrl = module.mediaUrl || '';
    const fallbackName = module.title || 'Media';

    try {
      const parsed = JSON.parse(rawContent) as {
        name?: string;
        url?: string;
        type?: ViewerMediaType | 'file';
        mediaId?: string;
      };

      return {
        name: parsed.name || fallbackName,
        url: parsed.url || fallbackUrl,
        type: this.normalizeMediaType(parsed.type || module.type),
        mediaId: parsed.mediaId,
      };
    } catch {
      return {
        name: fallbackName,
        url: fallbackUrl || rawContent,
        type: this.normalizeMediaType(module.type),
      };
    }
  }

  private normalizeMediaType(type: string | undefined): ViewerMediaType {
    const normalizedType = String(type || '').toLowerCase();

    if (normalizedType === 'video') {
      return 'video';
    }

    if (normalizedType === 'pdf' || normalizedType === 'file') {
      return 'pdf';
    }

    return 'image';
  }
}
