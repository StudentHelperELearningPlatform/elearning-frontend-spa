import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
  effect,
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
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

import { LessonEditorStore, LessonModuleDraft, ModuleType } from '../state/lesson-editor.store';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MediaUploadComponent } from './media-upload/media-upload.component';
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
    EditorModule,
    DialogModule,
    ToastModule,
    ButtonComponent,
    CardComponent,
    MediaUploadComponent,
    QuestionManagerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-toast
      position="top-right"
      [style]="{ position: 'fixed', top: '20px', right: '20px', 'z-index': '99999' }"
    >
    </p-toast>

    <div class="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <div>
          <h1 class="text-3xl font-black tracking-tight">
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
                Save failed
              }
              @default {
                Ready
              }
            }
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <app-button
            variant="secondary"
            icon="save"
            (btnClick)="onSaveDraft()"
            [disabled]="store.saveState() === 'saving'"
          >
            Save Draft
          </app-button>
          @if (store.lesson().status === 'PUBLISHED') {
            <app-button variant="secondary" icon="cloud_off" (btnClick)="onUnpublish()"
              >Unpublish</app-button
            >
          } @else {
            <app-button
              variant="primary"
              icon="cloud_upload"
              [disabled]="!store.canPublish()"
              (btnClick)="onPublishClicked()"
              >Publish</app-button
            >
          }
        </div>
      </div>

      <app-card header="Lesson Details">
        <form [formGroup]="metaForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              @for (s of subjectOptions; track s) {
                <option [value]="s">{{ s }}</option>
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
              @for (d of difficultyOptions; track d) {
                <option [value]="d">{{ d }}</option>
              }
            </select>
          </label>
          <label class="flex flex-col text-sm font-bold col-span-1 md:col-span-2">
            <span class="mb-1">Short Description (optional)</span>
            <textarea
              formControlName="short_description"
              rows="3"
              class="px-3 py-2 border-2 border-black rounded-xl font-medium"
            ></textarea>
          </label>
        </form>
      </app-card>

      <app-card header="Modules">
        @if (modules().length === 0) {
          <p class="text-gray-600">No modules yet. Add one to get started.</p>
        }
        <ul cdkDropList (cdkDropListDropped)="onModuleDrop($event)" class="space-y-3">
          @for (module of modules(); track module.id; let idx = $index) {
            <li cdkDrag class="border-2 border-black rounded-2xl bg-gray-50 overflow-hidden">
              <div class="flex items-center gap-3 p-3 bg-white border-b-2 border-black">
                <button
                  type="button"
                  cdkDragHandle
                  class="cursor-grab p-2 rounded-lg border-2 border-black bg-white hover:bg-gray-100"
                >
                  <span class="material-icons" aria-hidden="true">drag_indicator</span>
                </button>
                <input
                  type="text"
                  [value]="module.title"
                  (input)="onModuleTitleChange(module.id, $event)"
                  class="flex-1 px-2 py-1 border-2 border-black rounded-lg font-bold"
                  placeholder="Module Title"
                />
                <select
                  [value]="module.type"
                  (change)="onModuleTypeChange(module.id, $event)"
                  class="px-2 py-1 border-2 border-black rounded-lg font-bold bg-white"
                >
                  @for (t of moduleTypes; track t) {
                    <option [value]="t">{{ t }}</option>
                  }
                </select>
                <button
                  type="button"
                  (click)="toggleCollapsed(module.id)"
                  class="p-2 rounded-lg border-2 border-black bg-white hover:bg-gray-100"
                >
                  <span class="material-icons" aria-hidden="true">{{
                    isCollapsed(module.id) ? 'expand_more' : 'expand_less'
                  }}</span>
                </button>
                <button
                  type="button"
                  (click)="confirmRemove(module.id)"
                  class="p-2 rounded-lg border-2 border-red-700 bg-red-500 text-white hover:bg-red-600"
                >
                  <span class="material-icons" aria-hidden="true">delete</span>
                </button>
              </div>

              @if (!isCollapsed(module.id)) {
                <div class="p-4 space-y-3">
                  <p-editor
                    [ngModel]="module.content"
                    (ngModelChange)="onModuleContentChange(module.id, $event)"
                    (onBlur)="onModuleBlur()"
                    [style]="{ height: '180px' }"
                  ></p-editor>
                  <div class="mt-4 w-full">
                    <app-media-upload></app-media-upload>
                  </div>

                  <div
                    class="mt-4 w-full bg-purple-50 p-4 border-2 border-purple-200 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4"
                  >
                    <div class="flex items-center gap-3">
                      <span class="material-icons text-purple-500 text-3xl">fact_check</span>
                      <div>
                        <p class="text-lg font-black text-purple-900 leading-tight">
                          Module Check Quiz
                        </p>
                        <p class="text-sm text-purple-700 font-medium m-0">
                          Add quick questions to test student focus here.
                        </p>
                      </div>
                    </div>
                    <app-button
                      variant="secondary"
                      icon="edit"
                      (btnClick)="openCheckQuiz(module.id)"
                    >
                      Manage Questions
                    </app-button>
                  </div>
                </div>
              }
            </li>
          }
        </ul>
        <div class="mt-4">
          <app-button variant="secondary" icon="add" (btnClick)="onAddModule()"
            >Add Module</app-button
          >
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
      [style]="{ width: '90vw', maxWidth: '800px' }"
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

  protected readonly metaForm: FormGroup<{
    title: AbstractControl<string>;
    subject: AbstractControl<string>;
    difficulty_level: AbstractControl<string>;
    short_description: AbstractControl<string>;
  }> = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    difficulty_level: ['BEGINNER', [Validators.required]],
    short_description: [''],
  }) as never;

  private readonly collapsed = new Set<string>();
  private syncing = false;

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
            },
            { emitEvent: false },
          );
          this.syncing = false;
        }
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.reset();
    if (id) this.store.loadLesson(id);

    this.metaForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (this.syncing) return;
      const v = value as Partial<MetadataForm>;
      this.store.updateMetadata({
        title: v.title ?? '',
        subject: v.subject ?? '',
        difficulty_level: v.difficulty_level ?? 'BEGINNER',
        short_description: v.short_description ?? '',
      });
      this.autoSave$.next();
    });

    this.autoSave$
      .pipe(debounceTime(AUTO_SAVE_DEBOUNCE_MS), takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.store.saveState() === 'unsaved') this.store.save();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onModuleBlur(): void {
    this.store.save();
  }
  protected onAddModule(): void {
    this.store.addModule();
    this.autoSave$.next();
  }
  protected confirmRemove(id: string): void {
    if (!globalThis.confirm('Delete this module? This cannot be undone.')) return;
    this.store.removeModule(id);
    this.autoSave$.next();
  }
  protected onModuleTitleChange(id: string, event: Event): void {
    this.store.updateModule(id, { title: (event.target as HTMLInputElement).value });
    this.autoSave$.next();
  }
  protected onModuleTypeChange(id: string, event: Event): void {
    this.store.updateModule(id, { type: (event.target as HTMLSelectElement).value as ModuleType });
    this.autoSave$.next();
  }
  protected onModuleContentChange(id: string, value: string): void {
    this.store.updateModule(id, { content: value ?? '' });
    this.autoSave$.next();
  }
  protected onModuleDrop(event: CdkDragDrop<LessonModuleDraft[]>): void {
    if (event.previousIndex === event.currentIndex) return;
    this.store.reorderModules(event.previousIndex, event.currentIndex);
    this.autoSave$.next();
  }
  protected toggleCollapsed(id: string): void {
    if (this.collapsed.has(id)) this.collapsed.delete(id);
    else this.collapsed.add(id);
  }
  protected isCollapsed(id: string): boolean {
    return this.collapsed.has(id);
  }
  protected onSaveDraft(): void {
    this.store.save();
  }
  protected onPublishClicked(): void {
    if (!this.store.canPublish()) {
      this.metaForm.markAllAsTouched();
      return;
    }
    if (!globalThis.confirm('Publish this lesson? Students will be able to see it.')) return;
    this.store.publish(() => {
      void this.router.navigate(['/teacher/lessons']);
    });
  }
  protected onUnpublish(): void {
    if (!globalThis.confirm('Unpublish this lesson?')) return;
    this.store.unpublish();
  }
  protected openCheckQuiz(moduleId: string) {
    if (moduleId.startsWith('module-') || !this.store.lesson().id) {
      alert('Please save the lesson draft first before managing quiz questions for this module.');
      this.store.save();
      return;
    }
    this.activeCheckQuizModuleId.set(moduleId);
  }
  protected closeCheckQuiz() {
    this.activeCheckQuizModuleId.set(null);
  }
}
