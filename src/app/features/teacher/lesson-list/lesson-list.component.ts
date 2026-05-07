import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { TableModule, TablePageEvent } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import {
  TeacherLesson,
  TeacherLessonsStore,
  TeacherLessonStatus,
} from '../state/teacher-lessons.store';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';

const SUBJECT_OPTIONS = ['Math', 'Science', 'History', 'English', 'Geography', 'Art', 'Music'];
const GRADE_OPTIONS = [3, 4, 5, 6, 7, 8, 9];

@Component({
  selector: 'app-teacher-lesson-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TableModule,
    CheckboxModule,
    ButtonComponent,
    BadgeComponent,
    EmptyStateComponent,
    ErrorStateComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <div class="flex items-center space-x-4">
          <div
            class="w-14 h-14 bg-[#0ABAB5]/20 rounded-2xl border-4 border-black flex items-center justify-center"
            aria-hidden="true"
          >
            <span class="material-icons text-[#0ABAB5] text-3xl">menu_book</span>
          </div>
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">My Lessons</h1>
            <p class="text-gray-600 font-medium">Create, edit, and publish your lessons</p>
          </div>
        </div>
        <app-button variant="primary" icon="add_circle" routerLink="/teacher/lessons/new">
          Create New Lesson
        </app-button>
      </div>

      <!-- Toolbar -->
      <div
        class="bg-white p-4 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-4 gap-3"
      >
        <label class="flex flex-col text-sm font-bold">
          <span class="mb-1">Search</span>
          <input
            type="search"
            class="px-3 py-2 border-2 border-black rounded-xl font-medium"
            placeholder="Search by title…"
            [(ngModel)]="searchInput"
            (ngModelChange)="onSearchChange($event)"
            aria-label="Search lessons by title"
          />
        </label>
        <label class="flex flex-col text-sm font-bold">
          <span class="mb-1">Status</span>
          <select
            class="px-3 py-2 border-2 border-black rounded-xl font-medium bg-white"
            [ngModel]="store.filters().status"
            (ngModelChange)="setFilter('status', $event)"
            aria-label="Filter by status"
          >
            <option value="">All</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </label>
        <label class="flex flex-col text-sm font-bold">
          <span class="mb-1">Subject</span>
          <select
            class="px-3 py-2 border-2 border-black rounded-xl font-medium bg-white"
            [ngModel]="store.filters().subject"
            (ngModelChange)="setFilter('subject', $event)"
            aria-label="Filter by subject"
          >
            <option value="">All</option>
            @for (s of subjectOptions; track s) {
              <option [value]="s">{{ s }}</option>
            }
          </select>
        </label>
        <label class="flex flex-col text-sm font-bold">
          <span class="mb-1">Grade</span>
          <select
            class="px-3 py-2 border-2 border-black rounded-xl font-medium bg-white"
            [ngModel]="store.filters().grade"
            (ngModelChange)="setFilter('grade', $event)"
            aria-label="Filter by grade"
          >
            <option value="">All</option>
            @for (g of gradeOptions; track g) {
              <option [value]="g">Grade {{ g }}</option>
            }
          </select>
        </label>
      </div>

      <!-- Bulk action toolbar -->
      @if (store.selectedCount() > 0) {
        <div
          class="flex flex-wrap items-center gap-3 p-4 bg-[#0ABAB5]/10 border-4 border-black rounded-2xl"
          role="toolbar"
          aria-label="Bulk actions"
        >
          <span class="font-bold">{{ store.selectedCount() }} selected</span>
          <app-button size="sm" variant="primary" icon="cloud_upload" (btnClick)="bulkPublish()">
            Publish
          </app-button>
          <app-button size="sm" variant="secondary" icon="archive" (btnClick)="bulkArchive()">
            Archive
          </app-button>
          <app-button size="sm" variant="danger" icon="delete" (btnClick)="bulkDelete()">
            Delete
          </app-button>
          <app-button size="sm" variant="secondary" (btnClick)="store.clearSelection()">
            Clear
          </app-button>
        </div>
      }

      <!-- Error -->
      @if (store.error()) {
        <app-error-state
          title="Could not load lessons"
          [message]="store.error() || ''"
          retryLabel="Retry"
          (retryClick)="store.load()"
        />
      }

      <!-- Table -->
      <div
        class="bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <p-table
          [value]="store.items()"
          [lazy]="true"
          [loading]="store.loading()"
          [paginator]="true"
          [rows]="store.pageSize()"
          [totalRecords]="store.total()"
          [first]="store.page() * store.pageSize()"
          [responsiveLayout]="'stack'"
          [breakpoint]="'960px'"
          (onPage)="onPage($event)"
          (sortFunction)="noopSort()"
          [customSort]="true"
          dataKey="id"
        >
          <ng-template pTemplate="header">
            <tr class="bg-gray-100 border-b-4 border-black">
              <th class="p-3" scope="col">
                <p-checkbox
                  [binary]="true"
                  [ngModel]="store.allSelected()"
                  (ngModelChange)="store.selectAll($event)"
                  ariaLabel="Select all visible lessons"
                />
              </th>
              <th class="p-3 cursor-pointer" scope="col" (click)="toggleSort('title')">
                Title
                <span class="material-icons text-sm align-middle">{{ sortIcon('title') }}</span>
              </th>
              <th class="p-3" scope="col">Subject</th>
              <th class="p-3" scope="col">Grade</th>
              <th class="p-3 cursor-pointer" scope="col" (click)="toggleSort('status')">
                Status
                <span class="material-icons text-sm align-middle">{{ sortIcon('status') }}</span>
              </th>
              <th class="p-3 cursor-pointer" scope="col" (click)="toggleSort('lastModified')">
                Last Modified
                <span class="material-icons text-sm align-middle">{{
                  sortIcon('lastModified')
                }}</span>
              </th>
              <th class="p-3 text-right" scope="col">Actions</th>
            </tr>
          </ng-template>

          <ng-template pTemplate="body" let-lesson>
            <tr class="border-b-2 border-black/10 hover:bg-[#0ABAB5]/5">
              <td class="p-3">
                <p-checkbox
                  [binary]="true"
                  [ngModel]="isSelected(lesson.id)"
                  (ngModelChange)="store.toggleSelected(lesson.id)"
                  [ariaLabel]="'Select ' + lesson.title"
                />
              </td>
              <td class="p-3 font-bold">{{ lesson.title }}</td>
              <td class="p-3">{{ lesson.subject }}</td>
              <td class="p-3">{{ lesson.grade }}</td>
              <td class="p-3">
                <app-badge [variant]="badgeVariant(lesson.status)">{{ lesson.status }}</app-badge>
              </td>
              <td class="p-3 text-sm">{{ formatDate(lesson.lastModified) }}</td>
              <td class="p-3">
                <div class="flex gap-2 justify-end">
                  <app-button
                    size="sm"
                    variant="secondary"
                    icon="edit"
                    (btnClick)="goToEdit(lesson.id)"
                  >
                    Edit
                  </app-button>
                  <app-button
                    size="sm"
                    variant="secondary"
                    icon="content_copy"
                    (btnClick)="duplicate(lesson.id)"
                  >
                    Duplicate
                  </app-button>
                  @if (lesson.status === 'DRAFT') {
                    <app-button
                      size="sm"
                      variant="primary"
                      icon="cloud_upload"
                      (btnClick)="publish(lesson.id)"
                    >
                      Publish
                    </app-button>
                  } @else if (lesson.status === 'PUBLISHED') {
                    <app-button
                      size="sm"
                      variant="secondary"
                      icon="cloud_off"
                      (btnClick)="unpublish(lesson.id)"
                    >
                      Unpublish
                    </app-button>
                    <app-button
                      size="sm"
                      variant="secondary"
                      icon="archive"
                      (btnClick)="archive(lesson.id)"
                    >
                      Archive
                    </app-button>
                  } @else {
                    <app-button
                      size="sm"
                      variant="secondary"
                      icon="unarchive"
                      (btnClick)="unpublish(lesson.id)"
                    >
                      Restore
                    </app-button>
                  }
                  <app-button
                    size="sm"
                    variant="danger"
                    icon="delete"
                    (btnClick)="confirmDelete(lesson)"
                  >
                    Delete
                  </app-button>
                </div>
              </td>
            </tr>
          </ng-template>

          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="7" class="p-6">
                <app-empty-state
                  title="No lessons yet"
                  description="Create your first lesson to get started."
                  icon="menu_book"
                />
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </div>

    <!-- Confirm dialog -->
    @if (lessonPendingDelete()) {
      <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
      >
        <div
          class="bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full"
        >
          <h2 id="confirm-delete-title" class="text-2xl font-black mb-2">Delete lesson?</h2>
          <p class="mb-6 text-gray-700">
            Are you sure you want to delete
            <strong>"{{ lessonPendingDelete()?.title }}"</strong>? This cannot be undone.
          </p>
          <div class="flex justify-end gap-3">
            <app-button variant="secondary" (btnClick)="cancelDelete()">Cancel</app-button>
            <app-button variant="danger" icon="delete" (btnClick)="performDelete()">
              Delete
            </app-button>
          </div>
        </div>
      </div>
    }
  `,
})
export class LessonListComponent implements OnInit, OnDestroy {
  protected readonly store = inject(TeacherLessonsStore);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();
  private readonly searchInput$ = new Subject<string>();

  protected readonly subjectOptions = SUBJECT_OPTIONS;
  protected readonly gradeOptions = GRADE_OPTIONS;
  protected searchInput = '';

  protected readonly lessonPendingDelete = signal<TeacherLesson | null>(null);
  protected readonly selectedSet = computed(() => new Set(this.store.selectedIds()));

  constructor() {
    effect(() => {
      this.searchInput = this.store.filters().search;
    });
  }

  ngOnInit(): void {
    this.searchInput$
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((value) => this.store.setSearch(value));
    this.store.load();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchChange(value: string): void {
    this.searchInput$.next(value);
  }

  setFilter(key: 'status' | 'subject' | 'grade', value: string): void {
    if (key === 'status') {
      this.store.setFilter('status', value as TeacherLessonStatus | '');
    } else {
      this.store.setFilter(key, value);
    }
  }

  toggleSort(field: 'title' | 'lastModified' | 'status'): void {
    const current = this.store.sort();
    const order: 'asc' | 'desc' =
      current.field === field && current.order === 'asc' ? 'desc' : 'asc';
    this.store.setSort(field, order);
  }

  sortIcon(field: 'title' | 'lastModified' | 'status'): string {
    const s = this.store.sort();
    if (s.field !== field) return 'unfold_more';
    return s.order === 'asc' ? 'expand_less' : 'expand_more';
  }

  onPage(event: TablePageEvent): void {
    const pageSize = event.rows ?? this.store.pageSize();
    const page = Math.floor((event.first ?? 0) / pageSize);
    if (pageSize !== this.store.pageSize()) this.store.setPageSize(pageSize);
    if (page !== this.store.page()) this.store.setPage(page);
  }

  noopSort(): void {
    /* sorting handled by store */
  }

  isSelected(id: string): boolean {
    return this.selectedSet().has(id);
  }

  badgeVariant(status: TeacherLessonStatus): 'success' | 'warning' | 'neutral' {
    if (status === 'PUBLISHED') return 'success';
    if (status === 'DRAFT') return 'warning';
    return 'neutral';
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString();
  }

  goToEdit(id: string): void {
    void this.router.navigate(['/teacher/lessons', id, 'edit']);
  }

  publish(id: string): void {
    this.store.publish(id);
  }
  unpublish(id: string): void {
    this.store.unpublish(id);
  }
  archive(id: string): void {
    this.store.archive(id);
  }
  duplicate(id: string): void {
    this.store.duplicate(id);
  }

  confirmDelete(lesson: TeacherLesson): void {
    this.lessonPendingDelete.set(lesson);
  }
  cancelDelete(): void {
    this.lessonPendingDelete.set(null);
  }
  performDelete(): void {
    const target = this.lessonPendingDelete();
    if (!target) return;
    this.store.remove(target.id);
    this.lessonPendingDelete.set(null);
  }

  bulkPublish(): void {
    this.store.bulkAction('publish');
  }
  bulkArchive(): void {
    this.store.bulkAction('archive');
  }
  bulkDelete(): void {
    this.store.bulkAction('delete');
  }
}
