import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
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
import {
  LessonEditorStore,
  LessonModuleDraft,
  ModuleType,
} from '../state/lesson-editor.store';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';
import { UnsavedChangesGuarded } from './unsaved-changes.guard';

const SUBJECTS = ['Math', 'Science', 'History', 'English', 'Geography', 'Art', 'Music'];
const GRADES = [3, 4, 5, 6, 7, 8, 9];
const MODULE_TYPES: ModuleType[] = ['text', 'video', 'image', 'audio', 'quiz', 'interactive'];

export const AUTO_SAVE_DEBOUNCE_MS = 30_000;

interface MetadataForm {
  title: string;
  subject: string;
  grade: number | null;
  description: string;
}

@Component({
  selector: 'app-lesson-editor',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    EditorModule,
    ButtonComponent,
    CardComponent,
    ErrorStateComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <!-- Header / status -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <div>
          <h1 class="text-3xl font-black tracking-tight">
            {{ store.lesson().id ? 'Edit Lesson' : 'Create Lesson' }}
          </h1>
          <p class="text-gray-600 font-medium" data-testid="status-indicator">
            @switch (store.saveState()) {
              @case ('saving') { Saving… }
              @case ('saved') { Saved ✓ }
              @case ('unsaved') { Unsaved changes }
              @case ('error') { Save failed }
              @default { Ready }
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
            <app-button variant="secondary" icon="cloud_off" (btnClick)="onUnpublish()">
              Unpublish
            </app-button>
          } @else {
            <app-button
              variant="primary"
              icon="cloud_upload"
              [disabled]="!store.canPublish()"
              (btnClick)="onPublishClicked()"
            >
              Publish
            </app-button>
          }
        </div>
      </div>

      @if (store.saveError()) {
        <app-error-state
          title="Save error"
          [message]="store.saveError() || ''"
          retryLabel="Retry"
          (retryClick)="onSaveDraft()"
        />
      }

      <!-- Metadata -->
      <app-card header="Lesson Details">
        <form [formGroup]="metaForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="flex flex-col text-sm font-bold col-span-1">
            <span class="mb-1">Title <span aria-hidden="true">*</span></span>
            <input
              formControlName="title"
              class="px-3 py-2 border-2 border-black rounded-xl font-medium"
              placeholder="e.g. Intro to Fractions"
              aria-required="true"
              [attr.aria-invalid]="
                metaForm.controls.title.invalid && metaForm.controls.title.touched
              "
            />
            @if (metaForm.controls.title.invalid && metaForm.controls.title.touched) {
              <span class="text-red-600 text-sm mt-1">Title is required.</span>
            }
          </label>

          <label class="flex flex-col text-sm font-bold col-span-1">
            <span class="mb-1">Subject <span aria-hidden="true">*</span></span>
            <select
              formControlName="subject"
              class="px-3 py-2 border-2 border-black rounded-xl font-medium bg-white"
              aria-required="true"
            >
              <option value="">Select subject…</option>
              @for (s of subjectOptions; track s) {
                <option [value]="s">{{ s }}</option>
              }
            </select>
            @if (metaForm.controls.subject.invalid && metaForm.controls.subject.touched) {
              <span class="text-red-600 text-sm mt-1">Subject is required.</span>
            }
          </label>

          <label class="flex flex-col text-sm font-bold col-span-1">
            <span class="mb-1">Grade Level <span aria-hidden="true">*</span></span>
            <select
              formControlName="grade"
              class="px-3 py-2 border-2 border-black rounded-xl font-medium bg-white"
              aria-required="true"
            >
              <option [ngValue]="null">Select grade…</option>
              @for (g of gradeOptions; track g) {
                <option [ngValue]="g">Grade {{ g }}</option>
              }
            </select>
            @if (metaForm.controls.grade.invalid && metaForm.controls.grade.touched) {
              <span class="text-red-600 text-sm mt-1">Grade is required.</span>
            }
          </label>

          <label class="flex flex-col text-sm font-bold col-span-1 md:col-span-2">
            <span class="mb-1">Description (optional)</span>
            <textarea
              formControlName="description"
              rows="3"
              class="px-3 py-2 border-2 border-black rounded-xl font-medium"
            ></textarea>
          </label>
        </form>
      </app-card>

      <!-- Modules -->
      <app-card header="Modules">
        @if (modules().length === 0) {
          <p class="text-gray-600">No modules yet. Add one to get started.</p>
        }
        <ul
          cdkDropList
          (cdkDropListDropped)="onModuleDrop($event)"
          class="space-y-3"
          aria-label="Lesson modules"
        >
          @for (module of modules(); track module.id; let idx = $index) {
            <li
              cdkDrag
              class="border-2 border-black rounded-2xl bg-gray-50 overflow-hidden"
              [attr.aria-label]="'Module ' + (idx + 1) + ': ' + module.title"
            >
              <div class="flex items-center gap-3 p-3 bg-white border-b-2 border-black">
                <button
                  type="button"
                  cdkDragHandle
                  class="cursor-grab p-2 rounded-lg border-2 border-black bg-white hover:bg-gray-100"
                  [attr.aria-label]="'Drag module ' + (idx + 1)"
                >
                  <span class="material-icons" aria-hidden="true">drag_indicator</span>
                </button>
                <input
                  type="text"
                  [value]="module.title"
                  (input)="onModuleTitleChange(module.id, $event)"
                  class="flex-1 px-2 py-1 border-2 border-black rounded-lg font-bold"
                  [attr.aria-label]="'Module ' + (idx + 1) + ' title'"
                />
                <select
                  [value]="module.type"
                  (change)="onModuleTypeChange(module.id, $event)"
                  class="px-2 py-1 border-2 border-black rounded-lg font-bold bg-white"
                  [attr.aria-label]="'Module ' + (idx + 1) + ' type'"
                >
                  @for (t of moduleTypes; track t) {
                    <option [value]="t">{{ t }}</option>
                  }
                </select>
                <button
                  type="button"
                  (click)="toggleCollapsed(module.id)"
                  class="p-2 rounded-lg border-2 border-black bg-white hover:bg-gray-100"
                  [attr.aria-label]="
                    isCollapsed(module.id) ? 'Expand module ' + (idx + 1) : 'Collapse module ' + (idx + 1)
                  "
                  [attr.aria-expanded]="!isCollapsed(module.id)"
                >
                  <span class="material-icons" aria-hidden="true">{{
                    isCollapsed(module.id) ? 'expand_more' : 'expand_less'
                  }}</span>
                </button>
                <button
                  type="button"
                  (click)="confirmRemove(module.id)"
                  class="p-2 rounded-lg border-2 border-red-700 bg-red-500 text-white hover:bg-red-600"
                  [attr.aria-label]="'Delete module ' + (idx + 1)"
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
                  <div
                    class="p-3 rounded-xl border-2 border-dashed border-black/30 text-gray-600 text-sm"
                  >
                    Media upload area — provided by E5-04.
                  </div>
                </div>
              }
            </li>
          }
        </ul>
        <div class="mt-4">
          <app-button variant="secondary" icon="add" (btnClick)="onAddModule()">
            Add Module
          </app-button>
        </div>
      </app-card>
    </div>
  `,
})
export class LessonEditorComponent implements OnInit, OnDestroy, UnsavedChangesGuarded {
  protected readonly store = inject(LessonEditorStore);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();
  private readonly autoSave$ = new Subject<void>();

  protected readonly subjectOptions = SUBJECTS;
  protected readonly gradeOptions = GRADES;
  protected readonly moduleTypes = MODULE_TYPES;
  protected readonly modules = computed(() => this.store.lesson().modules);

  protected readonly metaForm: FormGroup<{
    title: AbstractControl<string>;
    subject: AbstractControl<string>;
    grade: AbstractControl<number | null>;
    description: AbstractControl<string>;
  }> = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    grade: this.fb.control<number | null>(null, { validators: [Validators.required] }),
    description: [''],
  }) as never;

  private readonly collapsed = new Set<string>();
  private syncing = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.loadLesson(id);
    } else {
      this.store.reset();
    }

    // Sync form -> store
    this.metaForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (this.syncing) return;
        const v = value as Partial<MetadataForm>;
        this.store.updateMetadata({
          title: v.title ?? '',
          subject: v.subject ?? '',
          grade: v.grade ?? null,
          description: v.description ?? '',
        });
        this.autoSave$.next();
      });

    // Sync store -> form
    queueMicrotask(() => this.refreshFormFromStore());

    // Auto-save debounced
    this.autoSave$
      .pipe(debounceTime(AUTO_SAVE_DEBOUNCE_MS), takeUntil(this.destroy$))
      .subscribe(() => this.autoSaveTick());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  hasUnsavedChanges(): boolean {
    return this.store.isDirty();
  }

  private refreshFormFromStore(): void {
    const l = this.store.lesson();
    this.syncing = true;
    this.metaForm.patchValue(
      {
        title: l.title,
        subject: l.subject,
        grade: l.grade,
        description: l.description,
      },
      { emitEvent: false },
    );
    this.syncing = false;
  }

  /** Called by the debounced auto-save effect — exposed for unit tests. */
  autoSaveTick(): void {
    if (this.store.saveState() === 'unsaved') {
      this.store.save();
    }
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
    const value = (event.target as HTMLInputElement).value;
    this.store.updateModule(id, { title: value });
    this.autoSave$.next();
  }

  protected onModuleTypeChange(id: string, event: Event): void {
    const value = (event.target as HTMLSelectElement).value as ModuleType;
    this.store.updateModule(id, { type: value });
    this.autoSave$.next();
  }

  protected onModuleContentChange(id: string, value: string): void {
    this.store.updateModule(id, { content: value ?? '' });
    this.autoSave$.next();
  }

  protected onModuleDrop(event: CdkDragDrop<LessonModuleDraft[]>): void {
    if (event.previousIndex === event.currentIndex) return;
    const next = [...this.modules()];
    moveItemInArray(next, event.previousIndex, event.currentIndex);
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
}
