import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProgressStore, HistoryEntry } from '../store/progress.store';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';

const PAGE_SIZE = 20;

@Component({
  selector: 'app-student-history',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, RouterModule, EmptyStateComponent],
  template: `
    <div class="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <header class="flex flex-col gap-2">
        <h1 class="text-3xl font-black tracking-tight">Lesson history</h1>
        <p class="text-gray-600 font-medium">
          Every lesson you've completed, with score and date.
        </p>
      </header>

      <!-- Date range filter -->
      <section
        class="bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row gap-3 sm:items-end"
        aria-label="Filter completion history by date range"
      >
        <label class="flex flex-col text-sm font-bold flex-1 min-w-[160px]">
          <span class="mb-1">From</span>
          <input
            type="date"
            class="px-3 py-2 border-2 border-black rounded-xl font-medium"
            [(ngModel)]="fromDate"
            (ngModelChange)="onDateChange()"
            aria-label="Filter from date"
          />
        </label>
        <label class="flex flex-col text-sm font-bold flex-1 min-w-[160px]">
          <span class="mb-1">To</span>
          <input
            type="date"
            class="px-3 py-2 border-2 border-black rounded-xl font-medium"
            [(ngModel)]="toDate"
            (ngModelChange)="onDateChange()"
            aria-label="Filter to date"
          />
        </label>
        <button
          type="button"
          class="px-4 py-2 border-2 border-black rounded-xl font-black bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          [disabled]="!fromDate && !toDate"
          (click)="clearFilters()"
        >
          Clear
        </button>
      </section>

      @if (progressStore.myHistoryLoading()) {
        <div class="space-y-3" data-testid="history-loading">
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <div class="h-14 rounded-xl border-2 border-gray-200 bg-gray-100 animate-pulse"></div>
          }
        </div>
      } @else if (progressStore.myHistoryError()) {
        <div
          class="bg-white border-2 border-red-500 rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm text-red-700 font-medium"
          role="alert"
        >
          Could not load history: {{ progressStore.myHistoryError() }}
        </div>
      } @else if (filteredHistory().length === 0) {
        <app-empty-state
          title="No lessons in this range"
          description="You haven't completed any lessons in the selected date range yet."
          icon="history"
        ></app-empty-state>
      } @else {
        <section
          class="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          aria-label="Completion history"
        >
          <table class="w-full text-left" data-testid="history-table">
            <caption class="sr-only">Your completed lessons</caption>
            <thead class="bg-gray-50 border-b-2 border-black">
              <tr>
                <th scope="col" class="px-4 py-3 text-xs font-black uppercase tracking-wider">
                  Lesson
                </th>
                <th scope="col" class="px-4 py-3 text-xs font-black uppercase tracking-wider">
                  Subject
                </th>
                <th scope="col" class="px-4 py-3 text-xs font-black uppercase tracking-wider">
                  Date completed
                </th>
                <th scope="col" class="px-4 py-3 text-xs font-black uppercase tracking-wider text-right">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              @for (entry of pagedHistory(); track entry.lessonId + entry.dateCompleted) {
                <tr class="border-b border-gray-200 last:border-0">
                  <td class="px-4 py-3 font-bold">
                    <a
                      [routerLink]="['/student/lesson-viewer', entry.lessonId]"
                      class="text-black hover:text-[#0ABAB5] underline-offset-2 hover:underline"
                    >
                      {{ entry.lessonTitle }}
                    </a>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 font-medium">
                    {{ entry.subject || '—' }}
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 font-medium">
                    @if (entry.dateCompleted) {
                      {{ entry.dateCompleted | date: 'mediumDate' }}
                    } @else {
                      —
                    }
                  </td>
                  <td class="px-4 py-3 text-right font-black">
                    @if (entry.score !== null && entry.score !== undefined) {
                      <span class="text-[#0ABAB5]">{{ entry.score }}%</span>
                    } @else {
                      <span class="text-gray-400">—</span>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </section>

        @if (totalPages() > 1) {
          <nav
            class="flex items-center justify-between gap-3"
            aria-label="History pagination"
          >
            <button
              type="button"
              class="px-4 py-2 border-2 border-black rounded-xl font-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-40"
              [disabled]="page() === 1"
              (click)="prevPage()"
            >
              Previous
            </button>
            <span class="text-sm font-bold text-gray-600">
              Page {{ page() }} of {{ totalPages() }}
            </span>
            <button
              type="button"
              class="px-4 py-2 border-2 border-black rounded-xl font-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-40"
              [disabled]="page() === totalPages()"
              (click)="nextPage()"
            >
              Next
            </button>
          </nav>
        }
      }
    </div>
  `,
})
export class HistoryComponent implements OnInit {
  protected readonly progressStore = inject(ProgressStore);

  protected readonly page = signal(1);
  protected readonly fromDateSignal = signal<string | null>(null);
  protected readonly toDateSignal = signal<string | null>(null);

  protected fromDate = '';
  protected toDate = '';

  protected readonly filteredHistory = computed<HistoryEntry[]>(() => {
    const history = this.progressStore.myHistory();
    const from = this.fromDateSignal();
    const to = this.toDateSignal();
    if (!from && !to) return history;
    const fromTime = from ? Date.parse(from) : Number.NEGATIVE_INFINITY;
    const toTime = to ? Date.parse(to) + 86_399_999 : Number.POSITIVE_INFINITY;
    return history.filter((entry) => {
      if (!entry.dateCompleted) return false;
      const t = Date.parse(entry.dateCompleted);
      return t >= fromTime && t <= toTime;
    });
  });

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredHistory().length / PAGE_SIZE)),
  );

  protected readonly pagedHistory = computed(() => {
    const all = this.filteredHistory();
    const start = (this.page() - 1) * PAGE_SIZE;
    return all.slice(start, start + PAGE_SIZE);
  });

  ngOnInit(): void {
    this.progressStore.loadMyHistory();
  }

  protected onDateChange(): void {
    this.fromDateSignal.set(this.fromDate || null);
    this.toDateSignal.set(this.toDate || null);
    this.page.set(1);
  }

  protected clearFilters(): void {
    this.fromDate = '';
    this.toDate = '';
    this.fromDateSignal.set(null);
    this.toDateSignal.set(null);
    this.page.set(1);
  }

  protected nextPage(): void {
    this.page.update((p) => Math.min(p + 1, this.totalPages()));
  }

  protected prevPage(): void {
    this.page.update((p) => Math.max(1, p - 1));
  }
}
