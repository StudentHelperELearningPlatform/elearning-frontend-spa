import { Component, inject, OnInit, signal, effect, untracked, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsStore } from '../../store/lessons.store';
import { ProgressStore } from '../../store/progress.store';
import { AuthStore } from '../../../auth/store/auth.store';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { HistoryComponent } from '../../history/history.component';
import { BundlesPageComponent } from '../../payments/bundles-page.component';
import { PaymentStore } from '../../payments/payment.store';

type ActiveTab = 'browser' | 'my-lessons' | 'history' | 'bundles' | 'purchased';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    BadgeComponent,
    EmptyStateComponent,
    HistoryComponent,
    BundlesPageComponent,
  ],
  template: `
    <div class="p-6 max-w-7xl mx-auto space-y-8">
      <!-- Header -->
      <div
        class="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <h1 class="text-4xl font-black text-black tracking-tight">Lesson Catalog</h1>
          <p class="text-gray-600 mt-2 text-lg font-medium">
            Browse, learn, and track your progress.
          </p>
        </div>
        <img
          src="https://api.dicebear.com/7.x/bottts/svg?seed=learn"
          alt="Mascot"
          class="w-24 h-24 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
          referrerpolicy="no-referrer"
        />
      </div>

      <!-- Tabs -->
      <div class="flex flex-wrap gap-3 border-b-4 border-black pb-4">
        <button
          id="tab-browser"
          (click)="setTab('browser')"
          [class]="activeTab() === 'browser' ? 'bg-[#0ABAB5] text-white' : 'bg-white text-black'"
          class="px-5 py-3 rounded-xl border-4 border-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-sm"
        >
          📚 Lesson Browser
        </button>
        <button
          id="tab-my-lessons"
          (click)="setTab('my-lessons')"
          [class]="activeTab() === 'my-lessons' ? 'bg-[#FFD700] text-black' : 'bg-white text-black'"
          class="px-5 py-3 rounded-xl border-4 border-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-sm"
        >
          🎒 My Lessons
        </button>
        <button
          id="tab-bundles"
          (click)="setTab('bundles')"
          [class]="activeTab() === 'bundles' ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white' : 'bg-white text-black'"
          class="px-5 py-3 rounded-xl border-4 border-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-sm relative"
        >
          🎁 Bundles
          <span class="absolute -top-2 -right-2 bg-[#FFD700] text-black text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-black">
            NEW
          </span>
        </button>
        <button
          id="tab-purchased"
          (click)="setTab('purchased')"
          [class]="activeTab() === 'purchased' ? 'bg-emerald-500 text-white' : 'bg-white text-black'"
          class="px-5 py-3 rounded-xl border-4 border-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-sm"
        >
          📦 Purchased
        </button>
        <button
          id="tab-history"
          (click)="setTab('history')"
          [class]="activeTab() === 'history' ? 'bg-[#FF6B6B] text-white' : 'bg-white text-black'"
          class="px-5 py-3 rounded-xl border-4 border-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-sm"
        >
          📋 History
        </button>
      </div>

      <!-- Tab Content -->
      @if (lessonsStore.loading()) {
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (i of [1, 2, 3]; track i) {
            <div class="bg-gray-200 animate-pulse h-80 rounded-3xl border-4 border-black"></div>
          }
        </div>
      } @else {
        @switch (activeTab()) {

          <!-- ── Lesson Browser ──────────────────────────────────────── -->
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
                  <ng-container *ngTemplateOutlet="lessonCard; context: { $implicit: lesson, type: 'browser' }"/>
                }
              </div>
            }
          }

          <!-- ── My Lessons ──────────────────────────────────────────── -->
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
                  <ng-container *ngTemplateOutlet="lessonCard; context: { $implicit: lesson, type: 'my' }"/>
                }
              </div>
            }
          }

          <!-- ── Bundles ─────────────────────────────────────────────── -->
          @case ('bundles') {
            <app-bundles-page></app-bundles-page>
          }

          <!-- ── Purchased ───────────────────────────────────────────── -->
          @case ('purchased') {
            @if (lessonsStore.purchasedLessonsLoading()) {
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @for (i of [1, 2, 3]; track i) {
                  <div class="bg-gray-200 animate-pulse h-80 rounded-3xl border-4 border-black"></div>
                }
              </div>
            } @else if (purchasedBundleIds().length === 0) {
              <app-empty-state
                [title]="'No purchased bundles'"
                [description]="'Buy a bundle to unlock lessons here.'"
                [icon]="'inventory_2'"
              ></app-empty-state>
            } @else if (lessonsStore.purchasedLessons().length === 0) {
              <app-empty-state
                [title]="'No lessons in your bundles yet'"
                [description]="'Bundles you have purchased do not contain any lessons.'"
                [icon]="'inventory_2'"
              ></app-empty-state>
            } @else {
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @for (lesson of lessonsStore.purchasedLessons(); track lesson.id) {
                  <ng-container *ngTemplateOutlet="lessonCard; context: { $implicit: lesson, type: 'purchased' }"/>
                }
              </div>
            }
          }

          <!-- ── History ─────────────────────────────────────────────── -->
          @case ('history') {
            <div class="-mx-4 md:-mx-6 -mt-4 md:-mt-6 -mb-6">
              <app-student-history [showHeader]="false"></app-student-history>
            </div>
          }
        }
      }
    </div>

    <!-- ── Lesson Card Template ────────────────────────────────────────── -->
    <ng-template #lessonCard let-lesson>
      @let status = getLessonStatus(lesson.id);

      <div class="bg-white rounded-3xl flex flex-col transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 overflow-hidden border-4 border-[#0ABAB5] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <!-- Card image area -->
        <div class="relative h-40 flex items-center justify-center overflow-hidden bg-[#0ABAB5]/20">
          <img
            [src]="'https://api.dicebear.com/7.x/shapes/svg?seed=' + lesson.id"
            alt="Lesson Cover"
            class="absolute inset-0 w-full h-full object-cover opacity-50"
            referrerpolicy="no-referrer"
          />
          <span class="material-icons text-black text-6xl relative z-10 drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">menu_book</span>
        </div>

        <!-- Card body -->
        <div class="p-5 flex-1 flex flex-col">
          <div class="flex justify-between items-start mb-3">
            <app-badge variant="primary">{{ lesson.subject }}</app-badge>
            <span class="text-sm font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg border-2 border-black">{{ lesson.duration }}</span>
          </div>
          <h3 class="text-xl font-black text-black mb-1 leading-tight">{{ lesson.title }}</h3>
          <p class="text-sm font-bold text-gray-600 mb-1">Grade {{ lesson.grade }} · {{ lesson.difficulty }}</p>
          <p class="text-sm font-medium text-gray-500 mb-4 line-clamp-2 flex-1 italic">{{ lesson.description }}</p>

          <div class="flex justify-between items-center mt-auto pt-3 border-t-2 border-black/10">
            <!-- Status label -->
            <div>
              @switch (status) {
                @case ('in-progress') {
                  <span class="text-sm font-black uppercase text-[#0ABAB5]">In Progress</span>
                }
                @case ('quiz-ready') {
                  <span class="text-sm font-black uppercase text-amber-600">Quiz Ready</span>
                }
                @case ('quiz-submitted') {
                  <span class="text-sm font-black uppercase text-green-600">Completed ✓</span>
                }
              }
            </div>

            <!-- CTA button -->
            @switch (status) {
              @case ('in-progress') {
                <app-button variant="primary" size="sm" [routerLink]="['/student/lessons', lesson.id]">Continue</app-button>
              }
              @case ('quiz-submitted') {
                <app-button variant="secondary" size="sm" [routerLink]="['/student/lessons', lesson.id]">Review</app-button>
              }
              @default {
                <app-button variant="primary" size="sm" [routerLink]="['/student/lessons', lesson.id]">
                  {{ status === 'quiz-ready' ? 'Go to Lesson' : 'Start Lesson' }}
                </app-button>
              }
            }
          </div>
        </div>
      </div>
    </ng-template>
  `,
})
export class LessonListComponent implements OnInit {
  lessonsStore = inject(LessonsStore);
  progressStore = inject(ProgressStore);
  authStore = inject(AuthStore);
  paymentStore = inject(PaymentStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  activeTab = signal<ActiveTab>('browser');

  /** UUIDs of bundles the student has successfully purchased. */
  protected readonly purchasedBundleIds = computed(() =>
    Array.from(
      new Set(
        this.paymentStore
          .history()
          .filter((p) => p.itemType === 'BUNDLE' && p.status === 'SUCCESS')
          .map((p) => p.itemId),
      ),
    ),
  );

  private readonly lessonStatusMap = signal<Record<string, string>>({});

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

    // Sync tab from query param (?tab=bundles from payment redirect)
    effect(() => {
      const tab = this.route.snapshot.queryParamMap.get('tab') as ActiveTab | null;
      if (tab && ['browser', 'my-lessons', 'bundles', 'history', 'purchased'].includes(tab)) {
        this.activeTab.set(tab);
        // Clean up the URL after reading
        this.router.navigate([], { queryParams: {}, replaceUrl: true });
      }
    });

    // When the Purchased tab is active and payment history is ready,
    // refetch lessons whenever the set of purchased bundle IDs changes.
    effect(() => {
      if (this.activeTab() !== 'purchased') return;
      const ids = this.purchasedBundleIds();
      untracked(() => this.lessonsStore.loadPurchasedLessons(ids));
    });
  }

  ngOnInit() {
    this.lessonsStore.loadLessons();
    this.progressStore.loadMyHistory();
    this.paymentStore.loadHistory();
  }

  setTab(tab: ActiveTab): void {
    this.activeTab.set(tab);
  }

  getLessonStatus(lessonId: string): string {
    const testMapStatus = this.lessonStatusMap()[lessonId];
    if (testMapStatus) return testMapStatus;

    const lesson = this.lessonsStore.lessons().find((l) => l.id === lessonId);
    if (lesson) {
      const status = (lesson.status || '').toLowerCase().trim();
      if (status === 'finished' || status === 'completed' || status === 'quiz-submitted') return 'quiz-submitted';
      if (status === 'in progress' || status === 'in-progress') return 'in-progress';
      if (status === 'quiz-ready') return 'quiz-ready';
    }

    const history = this.progressStore.myHistory();
    const entry = history.find((h) => h.lessonId === lessonId);
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
