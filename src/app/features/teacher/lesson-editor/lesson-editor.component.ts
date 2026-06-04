/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
  effect,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  CdkDragPreview,
} from '@angular/cdk/drag-drop';
import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

import { LessonEditorStore, LessonModuleDraft, ModuleType } from '../state/lesson-editor.store';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MediaUploadComponent, UploadedMedia } from './media-upload/media-upload.component';
import { QuestionManagerComponent } from '../quiz-builder/question-manager.component';
import { UnsavedChangesGuarded } from './unsaved-changes.guard';

const SUBJECTS = ['Math', 'Science', 'History', 'English', 'Geography', 'Art', 'Music'];
const DIFFICULTIES = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
const MODULE_TYPES: ModuleType[] = ['text', 'video', 'image', 'audio', 'quiz', 'interactive'];
export const AUTO_SAVE_DEBOUNCE_MS = 30_000;

interface MetadataForm {
  title: string;
  subject: string;
  difficulty_level: string;
  short_description: string;
  /** true = lesson is paid */
  price_paid: boolean;
  price_ron: number | null;
}

@Component({
  selector: 'app-lesson-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    CdkDragPreview,
    EditorModule,
    DialogModule,
    ToastModule,
    ButtonComponent,
    CardComponent,
    MediaUploadComponent,
    QuestionManagerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      ::ng-deep .cdk-drag-preview {
        box-shadow: none !important;
        background: transparent !important;
        border: none !important;
        border-radius: 0 !important;
      }
      ::ng-deep .cdk-drag-placeholder {
        opacity: 0.2 !important;
        border: 4px dashed black !important;
        background: #f9fafb !important;
      }
      ::ng-deep .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
  template: `
    <p-toast
      position="top-right"
      [style]="{ position: 'fixed', top: '20px', right: '20px', 'z-index': '99999' }"
    >
    </p-toast>

    <div class="p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto space-y-6">
      <div
        class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-5 sm:p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <div class="w-full lg:w-auto">
          <h1 class="text-2xl sm:text-3xl font-black tracking-tight break-words">
            {{ store.lesson().id ? 'Edit Lesson' : 'Create Lesson' }}
          </h1>
          <p class="text-gray-600 font-medium" data-testid="status-indicator">
            @switch (store.saveState()) {
              @case ('saving') {
                Saving…
              }
              @case ('saved') {
                Saved ✓
              }
              @case ('unsaved') {
                Unsaved changes
              }
              @case ('error') {
                @if (autoSaveFailed()) {
                  Auto-save failed — manual save required
                } @else {
                  Save failed
                }
              }
              @default {
                Ready
              }
            }
          </p>
        </div>

        <div class="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
          <div class="w-full sm:w-auto flex flex-col">
            <app-button
              variant="secondary"
              icon="save"
              (btnClick)="onSaveDraft()"
              [disabled]="store.saveState() === 'saving'"
            >
              {{ saveButtonLabel() }}
            </app-button>
          </div>

          @if (store.lesson().status === 'PUBLISHED') {
            <div class="w-full sm:w-auto flex flex-col">
              <app-button variant="secondary" icon="cloud_off" (btnClick)="onUnpublish()"
              >Unpublish</app-button
              >
            </div>
          } @else {
            <div class="w-full sm:w-auto flex flex-col">
              <app-button
                variant="primary"
                icon="cloud_upload"
                [disabled]="!store.canPublish()"
                (btnClick)="onPublishClicked()"
              >Publish</app-button
              >
            </div>
          }
        </div>
      </div>

      <app-card header="Lesson Details">
        <form [formGroup]="metaForm" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <label class="flex flex-col text-sm font-bold col-span-1">
            <span class="mb-1">Title <span aria-hidden="true">*</span></span>
            <input
              formControlName="title"
              class="px-3 py-2 border-2 border-black rounded-xl font-medium"
              placeholder="e.g. Intro to Fractions"
            />
          </label>
          <label class="flex flex-col text-sm font-bold col-span-1">
            <span class="mb-1">Subject <span aria-hidden="true">*</span></span>
            <select
              formControlName="subject"
              class="px-3 py-2 border-2 border-black rounded-xl font-medium bg-white"
            >
              <option value="">Select subject…</option>
              @for (subject of subjectOptions; track subject) {
                <option [value]="subject">{{ subject }}</option>
              }
            </select>
          </label>
          <label class="flex flex-col text-sm font-bold col-span-1">
            <span class="mb-1">Difficulty Level <span aria-hidden="true">*</span></span>
            <select
              formControlName="difficulty_level"
              class="px-3 py-2 border-2 border-black rounded-xl font-medium bg-white"
            >
              <option value="">Select difficulty…</option>
              @for (difficulty of difficultyOptions; track difficulty) {
                <option [value]="difficulty">{{ difficulty }}</option>
              }
            </select>
          </label>
          <label class="flex flex-col text-sm font-bold col-span-1 lg:col-span-2">
            <span class="mb-1">Short Description (optional)</span>
            <textarea
              formControlName="short_description"
              rows="3"
              class="px-3 py-2 border-2 border-black rounded-xl font-medium"
            ></textarea>
          </label>

          <!-- ── Lesson Pricing ──────────────────────────────────── -->
          <div class="col-span-1 lg:col-span-2 mt-2 p-5 rounded-2xl border-4 border-black bg-gray-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl border-2 border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span class="material-icons text-[#0ABAB5]">monetization_on</span>
                </div>
                <div>
                  <p class="font-black text-black">Lesson Pricing</p>
                  <p class="text-xs text-gray-500 font-medium">Set a price to require payment from students</p>
                </div>
              </div>
              <!-- Toggle -->
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  formControlName="price_paid"
                  class="sr-only peer"
                />
                <div class="w-12 h-6 bg-gray-300 peer-checked:bg-[#0ABAB5] rounded-full border-2 border-black transition-colors after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white after:border-2 after:border-black after:transition-transform peer-checked:after:translate-x-6"></div>
                <span class="ml-3 text-sm font-black" [class]="metaForm.value.price_paid ? 'text-[#0ABAB5]' : 'text-gray-500'">
                  {{ metaForm.value.price_paid ? 'Paid' : 'Free' }}
                </span>
              </label>
            </div>

            @if (metaForm.value.price_paid) {
              <div class="flex items-center gap-3 mt-2">
                <label class="flex flex-col text-sm font-bold flex-1">
                  <span class="mb-1">Price (RON)</span>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 font-black text-gray-500">RON</span>
                    <input
                      type="number"
                      formControlName="price_ron"
                      min="0"
                      step="0.01"
                      class="w-full pl-14 pr-3 py-2 border-2 border-black rounded-xl font-medium outline-none focus:ring-2 focus:ring-[#0ABAB5]"
                      placeholder="e.g. 29.99"
                    />
                  </div>
                </label>
                <div class="text-xs text-gray-500 font-medium mt-5 max-w-[140px]">
                  Students will pay this amount to unlock the lesson.
                </div>
              </div>
            } @else {
              <div class="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <span class="material-icons text-green-500 text-base">check_circle</span>
                All students can access this lesson for free.
              </div>
            }
          </div>
        </form>
      </app-card>

      <app-card header="Modules">
        @if (modules().length === 0) {
          <p class="text-gray-600">No modules yet. Add one to get started.</p>
        }
        <ul cdkDropList (cdkDropListDropped)="onModuleDrop($event)" class="space-y-4">
          @for (module of modules(); track module.id) {
            <li
              cdkDrag
              class="border-2 border-black rounded-2xl bg-gray-50 overflow-hidden"
              [attr.data-module-id]="module.id"
            >
              <ng-template cdkDragPreview [matchSize]="true">
                <div
                  class="w-full !h-fit !bg-white !border-2 !border-solid !border-black !rounded-2xl flex flex-wrap md:flex-nowrap items-center gap-2 sm:gap-3 !p-3 relative z-50 box-border"
                >
                  <div
                    class="!p-2 !rounded-lg !border-2 !border-solid !border-black !bg-gray-100 shrink-0 flex items-center justify-center"
                  >
                    <span class="material-icons">drag_indicator</span>
                  </div>
                  <div
                    class="flex-1 min-w-[120px] !px-2 !py-1 !border-2 !border-solid !border-black !rounded-lg font-bold !bg-white text-black opacity-70 truncate"
                  >
                    {{ module.title || 'Module Title' }}
                  </div>
                  <div
                    class="!px-2 !py-1 !border-2 !border-solid !border-black !rounded-lg font-bold !bg-white shrink-0 text-black flex items-center"
                  >
                    {{ module.type }}
                    <span class="material-icons text-sm align-middle ml-1">arrow_drop_down</span>
                  </div>
                  <div
                    class="!p-2 !rounded-lg !border-2 !border-solid !border-black !bg-white shrink-0 flex items-center justify-center"
                  >
                    <span class="material-icons">{{
                        isCollapsed(module.id) ? 'expand_more' : 'expand_less'
                      }}</span>
                  </div>
                  <div
                    class="!p-2 !rounded-lg !border-2 !border-solid !border-red-700 !bg-red-500 text-white shrink-0 flex items-center justify-center"
                  >
                    <span class="material-icons">delete</span>
                  </div>
                </div>
              </ng-template>

              <div
                class="flex flex-wrap md:flex-nowrap items-center gap-2 sm:gap-3 p-3 bg-white border-b-2 border-black"
              >
                <button
                  type="button"
                  cdkDragHandle
                  class="cursor-grab p-2 rounded-lg border-2 border-black bg-white hover:bg-gray-100 shrink-0 flex items-center justify-center"
                >
                  <span class="material-icons" aria-hidden="true">drag_indicator</span>
                </button>
                <input
                  type="text"
                  [value]="module.title"
                  (input)="onModuleTitleChange(module.id, $event)"
                  class="flex-1 min-w-[120px] px-2 py-1 border-2 border-black rounded-lg font-bold outline-none focus:ring-2 focus:ring-[#0ABAB5]"
                  placeholder="Module Title"
                />
                <select
                  [value]="module.type"
                  (change)="onModuleTypeChange(module.id, $event)"
                  class="px-2 py-1 border-2 border-black rounded-lg font-bold bg-white shrink-0 outline-none focus:ring-2 focus:ring-[#0ABAB5]"
                >
                  @for (type of moduleTypes; track type) {
                    <option [value]="type">{{ type }}</option>
                  }
                </select>
                <button
                  type="button"
                  (click)="toggleCollapsed(module.id)"
                  class="p-2 rounded-lg border-2 border-black bg-white hover:bg-gray-100 shrink-0 flex items-center justify-center"
                >
                  <span class="material-icons" aria-hidden="true">{{
                      isCollapsed(module.id) ? 'expand_more' : 'expand_less'
                    }}</span>
                </button>
                <button
                  type="button"
                  (click)="confirmRemove(module.id)"
                  class="p-2 rounded-lg border-2 border-red-700 bg-red-500 text-white hover:bg-red-600 shrink-0 flex items-center justify-center"
                >
                  <span class="material-icons" aria-hidden="true">delete</span>
                </button>
              </div>

              @if (!isCollapsed(module.id)) {
                <div class="p-3 sm:p-4 space-y-3">
                  <p-editor
                    [ngModel]="module.content"
                    (ngModelChange)="onModuleContentChange(module.id, $event)"
                    (onBlur)="onModuleBlur(module.id)"
                    [style]="{ height: '180px' }"
                  ></p-editor>

                  <div class="mt-4 w-full">
                    <app-media-upload
                      [media]="module.media || []"
                      (mediaChange)="onModuleMediaChange(module.id, $event)"
                      (mediaRemoved)="onModuleMediaRemoved($event)"
                    ></app-media-upload>
                  </div>

                  <div
                    class="mt-4 w-full bg-gray-50 p-4 border-2 border-black rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div
                      class="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto"
                    >
                      <div
                        class="w-12 h-12 shrink-0 bg-white border-2 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <span class="material-icons text-[#0ABAB5] text-2xl">fact_check</span>
                      </div>
                      <div>
                        <p class="text-base sm:text-lg font-black text-black leading-tight">
                          Module Check Quiz
                        </p>
                        <p class="text-xs sm:text-sm text-gray-600 font-bold m-0 mt-1">
                          Add quick questions to test student focus.
                        </p>
                      </div>
                    </div>
                    <div class="w-full sm:w-auto flex flex-col">
                      <app-button
                        variant="secondary"
                        icon="edit"
                        (btnClick)="openCheckQuiz(module.id)"
                      >
                        Manage Questions
                      </app-button>
                    </div>
                  </div>
                </div>
              }
            </li>
          }
        </ul>
        <div class="mt-4 flex flex-col sm:inline-flex">
          <app-button variant="secondary" icon="add" (btnClick)="onAddModule()">
            Add Module
          </app-button>
        </div>
      </app-card>

      @if (store.lesson().id) {
        <app-card header="Final Quiz Management">
          <app-question-manager
            quizType="final"
            [parentId]="store.lesson().id!"
          ></app-question-manager>
        </app-card>
      }
    </div>

    <p-dialog
      header="Manage Check Quiz"
      [visible]="!!activeCheckQuizModuleId()"
      (visibleChange)="closeCheckQuiz()"
      [modal]="true"
      [style]="{ width: '95vw', maxWidth: '1000px' }"
      [draggable]="false"
      [resizable]="false"
    >
      @if (activeCheckQuizModuleId()) {
        <app-question-manager
          quizType="check"
          [parentId]="activeCheckQuizModuleId()!"
        ></app-question-manager>
      }
    </p-dialog>
  `,
  schemas: [NO_ERRORS_SCHEMA],
})
export class LessonEditorComponent implements OnInit, OnDestroy, UnsavedChangesGuarded {
  protected readonly store = inject(LessonEditorStore);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();
  private readonly autoSave$ = new Subject<void>();

  protected activeCheckQuizModuleId = signal<string | null>(null);
  protected readonly subjectOptions = SUBJECTS;
  protected readonly difficultyOptions = DIFFICULTIES;
  protected readonly moduleTypes = MODULE_TYPES;
  protected readonly modules = computed(() => this.store.lesson().modules);
  protected readonly isEditRoute = signal<boolean>(false);
  protected readonly saveButtonLabel = computed(() =>
    this.isEditRoute() || !!this.store.lesson().id ? 'Save Edit' : 'Save Draft',
  );
  protected readonly autoSaveFailed = signal<boolean>(false);

  protected readonly metaForm: FormGroup<{
    title: AbstractControl<string>;
    subject: AbstractControl<string>;
    difficulty_level: AbstractControl<string>;
    short_description: AbstractControl<string>;
    price_paid: AbstractControl<boolean>;
    price_ron: AbstractControl<number | null>;
  }> = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    difficulty_level: ['BEGINNER', [Validators.required]],
    short_description: [''],
    price_paid: [false],
    price_ron: [null as number | null],
  }) as never;

  private readonly collapsed = new Set<string>();
  private syncing = false;
  private autoSaveInFlight = false;

  hasUnsavedChanges(): boolean {
    return this.store.isDirty();
  }

  constructor() {
    effect(() => {
      const lesson = this.store.lesson();
      if (!this.syncing) {
        const current = this.metaForm.value;
        if (
          current.title !== lesson.title ||
          current.short_description !== lesson.short_description
        ) {
          this.syncing = true;
          this.metaForm.patchValue(
            {
              title: lesson.title || '',
              subject: lesson.subject || '',
              difficulty_level: lesson.difficulty_level || 'BEGINNER',
              short_description: lesson.short_description || '',
              price_paid: lesson.priceInCents !== null && lesson.priceInCents > 0,
              price_ron: lesson.priceInCents !== null ? lesson.priceInCents / 100 : null,
            },
            { emitEvent: false },
          );
          this.syncing = false;
        }
      }
    });

    // When an auto-save tick lands the store in 'error', surface a specific
    // toolbar message so the teacher knows the silent retry failed and they
    // need to click Save manually.
    effect(() => {
      const state = this.store.saveState();
      if (state === 'error' && this.autoSaveInFlight) {
        this.autoSaveFailed.set(true);
        this.autoSaveInFlight = false;
      } else if (state === 'saved' || state === 'saving') {
        this.autoSaveFailed.set(false);
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.reset();
    this.isEditRoute.set(!!id);

    if (id) {
      this.store.loadLesson(id);
    }

    this.metaForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (this.syncing) {
        return;
      }

      const v = value as Partial<MetadataForm>;
      const priceInCents = v.price_paid && v.price_ron != null && v.price_ron > 0
        ? Math.round(v.price_ron * 100)
        : 0;
      this.store.updateMetadata({
        title: v.title ?? '',
        subject: v.subject ?? '',
        difficulty_level: v.difficulty_level ?? 'BEGINNER',
        short_description: v.short_description ?? '',
        priceInCents,
      });
      this.autoSave$.next();
    });

    this.autoSave$
      .pipe(debounceTime(AUTO_SAVE_DEBOUNCE_MS), takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.store.saveState() === 'unsaved') {
          this.autoSaveInFlight = true;
          this.store.save(() => {
            this.autoSaveInFlight = false;
            this.autoSaveFailed.set(false);
          }, true);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onModuleBlur(moduleId: string): void {
    // Delay the save slightly to allow the browser's focus to settle
    setTimeout(() => {
      // Check if the newly focused element is anywhere inside the current module's card
      // (e.g., they clicked the module title, media upload, or a formatting button)
      const isInsideModule = document.activeElement?.closest(`[data-module-id="${moduleId}"]`);

      // Quill (the engine behind p-editor) sometimes renders floating tooltips
      // (like the link URL input) directly to the <body>. We protect those too.
      const isFloatingTooltip = document.activeElement?.closest('.ql-tooltip, .p-overlaypanel');

      // If the user is still interacting with this module or its popups, cancel the save
      if (isInsideModule || isFloatingTooltip) {
        return;
      }

      // Focus genuinely left the module card entirely. Proceed with background save.
      if (this.store.canSave()) {
        this.store.save(undefined, true);
      }
    }, 200);
  }
  protected onAddModule(): void {
    this.store.addModule();
    this.autoSave$.next();
  }
  protected confirmRemove(id: string): void {
    if (!globalThis.confirm('Delete this module? This cannot be undone.')) {
      return;
    }

    this.store.removeModule(id);
    this.autoSave$.next();
  }
  protected onModuleTitleChange(id: string, event: Event): void {
    this.store.updateModule(id, {
      title: (event.target as HTMLInputElement).value,
    });

    this.autoSave$.next();
  }
  protected onModuleTypeChange(id: string, event: Event): void {
    this.store.updateModule(id, {
      type: (event.target as HTMLSelectElement).value as ModuleType,
    });

    this.autoSave$.next();
  }
  protected onModuleContentChange(id: string, value: string | Event): void {
    // Normalize content: p-editor typically emits a string, but template typing
    // can present it as Event under strictTemplates. Extract safely.
    let content: string;
    if (typeof value === 'string') {
      content = value;
    } else {
      const ev = value as unknown;
      // Try common shapes: event.target.value (input-like), detail (custom events), or direct payload
      if (ev && typeof ev === 'object') {
        const target = (ev as { target?: { value?: unknown } }).target;
        const detail = (ev as { detail?: unknown }).detail;
        if (target && typeof target.value === 'string') {
          content = target.value;
        } else if (typeof detail === 'string') {
          content = detail;
        } else {
          content = '';
        }
      } else {
        content = '';
      }
    }

    this.store.updateModule(id, {
      content: content ?? '',
    });

    this.autoSave$.next();
  }

  protected onModuleMediaChange(moduleId: string, media: UploadedMedia[]): void {
    this.store.updateModule(moduleId, { media });

    const hasUploadingMedia = media.some((item) => item.status === 'uploading');

    if (!hasUploadingMedia) {
      this.autoSave$.next();
    }
  }

  protected onModuleMediaRemoved(media: UploadedMedia): void {
    this.store.removeMediaBlock(media);
    this.autoSave$.next();
  }

  protected onModuleDrop(event: Event | CdkDragDrop<LessonModuleDraft[]>): void {
    // Accept either a proper CdkDragDrop or a generic Event (template strict typing).
    const dropCandidate = event as unknown;
    let prevIdx: number | undefined;
    let currIdx: number | undefined;
    if (dropCandidate && typeof dropCandidate === 'object') {
      const partial = dropCandidate as Partial<CdkDragDrop<LessonModuleDraft[]>>;
      if (typeof partial.previousIndex === 'number' && typeof partial.currentIndex === 'number') {
        prevIdx = partial.previousIndex;
        currIdx = partial.currentIndex;
      }
    }

    // If we couldn't extract indexes, do nothing (safe no-op).
    if (prevIdx === undefined || currIdx === undefined) {
      return;
    }

    if (prevIdx === currIdx) {
      return;
    }

    this.store.reorderModules(prevIdx, currIdx);
    this.autoSave$.next();
  }
  protected toggleCollapsed(id: string): void {
    if (this.collapsed.has(id)) {
      this.collapsed.delete(id);
    } else {
      this.collapsed.add(id);
    }
  }
  protected isCollapsed(id: string): boolean {
    return this.collapsed.has(id);
  }
  protected onSaveDraft(): void {
    const wasNewLesson = !this.store.lesson().id;
    this.autoSaveFailed.set(false);
    this.store.save((saved) => {
      if (wasNewLesson && saved.id) {
        this.isEditRoute.set(true);
        this.router.navigate(['/teacher/lessons', saved.id, 'edit'], {
          replaceUrl: true,
        });
      }
    });
  }

  protected onPublishClicked(): void {
    if (!this.store.canPublish()) {
      this.metaForm.markAllAsTouched();
      return;
    }

    if (!globalThis.confirm('Publish this lesson? Students will be able to see it.')) {
      return;
    }

    this.store.publish();
  }

  protected onUnpublish(): void {
    if (!globalThis.confirm('Unpublish this lesson?')) {
      return;
    }

    this.store.unpublish();
  }

  protected openCheckQuiz(moduleId: string): void {
    if (moduleId.startsWith('module-') || !this.store.lesson().id) {
      alert('Please save the lesson draft first before managing quiz questions for this module.');
      this.store.save();
      return;
    }
    this.activeCheckQuizModuleId.set(moduleId);
  }

  protected closeCheckQuiz(): void {
    this.activeCheckQuizModuleId.set(null);
  }
}
