import { Component, inject, OnInit, signal, effect, untracked, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsStore, Lesson } from '../../store/lessons.store';
import { ProgressStore } from '../../store/progress.store';
import { AuthStore } from '../../../auth/store/auth.store';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { HistoryComponent } from '../../history/history.component';
import { BundlesPageComponent } from '../../payments/bundles-page.component';
import { CheckoutModalComponent } from '../../payments/checkout-modal.component';
import { PaymentStore } from '../../payments/payment.store';

type ActiveTab = 'browser' | 'my-lessons' | 'history' | 'bundles';

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
    CheckoutModalComponent,
  ],
  styles: [`
    /* ─── Premium border animations ─────────────────────────────────────── */
    @keyframes shimmer-silver {
      0%, 100% { box-shadow: 0 0 0 0 transparent, 4px 4px 0px 0px rgba(0,0,0,1); border-color: #c0c0c0; }
      50%       { box-shadow: 0 0 12px 3px rgba(192,192,192,0.5), 4px 4px 0px 0px rgba(0,0,0,1); border-color: #e8e8e8; }
    }
    @keyframes shimmer-gold {
      0%, 100% { box-shadow: 0 0 0 0 transparent, 4px 4px 0px 0px rgba(0,0,0,1); border-color: #FFD700; }
      50%       { box-shadow: 0 0 18px 4px rgba(255,215,0,0.6), 4px 4px 0px 0px rgba(0,0,0,1); border-color: #ffe45e; }
    }
    @keyframes shimmer-diamond {
      0%, 100% { box-shadow: 0 0 0 0 transparent, 4px 4px 0px 0px rgba(0,0,0,1); border-color: #8b5cf6; }
      50%       { box-shadow: 0 0 24px 6px rgba(139,92,246,0.6), 4px 4px 0px 0px rgba(0,0,0,1); border-color: #a78bfa; }
    }
    .tier-silver  { animation: shimmer-silver  2.8s ease-in-out infinite; border-width: 4px; }
    .tier-gold    { animation: shimmer-gold    2.2s ease-in-out infinite; border-width: 4px; }
    .tier-diamond { animation: shimmer-diamond 1.8s ease-in-out infinite; border-width: 4px; }
    .tier-free    { border-width: 4px; border-color: rgba(0,0,0,0.2); }
  `],
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
              <!-- Legend -->
              <div class="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-2xl border-2 border-black/10">
                <span class="text-xs font-black uppercase tracking-widest text-gray-500">Border tiers:</span>
                <div class="flex items-center gap-1.5"><div class="w-5 h-5 rounded border-4 border-[#0ABAB5]"></div><span class="text-xs font-bold text-gray-600">Free / Accessible</span></div>
                <div class="flex items-center gap-1.5"><div class="w-5 h-5 rounded border-4 border-[#c0c0c0]"></div><span class="text-xs font-bold text-gray-600">Beginner (paid)</span></div>
                <div class="flex items-center gap-1.5"><div class="w-5 h-5 rounded border-4 border-[#FFD700]"></div><span class="text-xs font-bold text-gray-600">Intermediate (paid)</span></div>
                <div class="flex items-center gap-1.5"><div class="w-5 h-5 rounded border-4 border-[#8b5cf6]"></div><span class="text-xs font-bold text-gray-600">Advanced (paid)</span></div>
              </div>

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
    <ng-template #lessonCard let-lesson let-type="type">
      @let accessible = isAccessible(lesson.id);
      @let tier = getPriceTier(lesson, accessible);
      @let status = getLessonStatus(lesson.id);

      <div
        class="bg-white rounded-3xl flex flex-col transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 overflow-hidden"
        [class]="tier === 'free' ? 'border-4 border-[#0ABAB5] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : 'tier-' + tier"
      >
        <!-- Card image area -->
        <div
          class="relative h-40 flex items-center justify-center overflow-hidden"
          [class]="accessible ? 'bg-[#0ABAB5]/20' : getTierBg(tier)"
        >
          <img
            [src]="'https://api.dicebear.com/7.x/shapes/svg?seed=' + lesson.id"
            alt="Lesson Cover"
            class="absolute inset-0 w-full h-full object-cover"
            [class]="accessible ? 'opacity-50' : 'opacity-20'"
            referrerpolicy="no-referrer"
          />

          @if (!accessible) {
            <!-- Lock overlay -->
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-1 z-10">
              <span class="material-icons text-5xl drop-shadow-lg" [class]="getTierIconColor(tier)">lock</span>
              @if (lesson.priceInCents) {
                <span class="font-black text-sm px-3 py-1 rounded-full border-2 border-black bg-white/90 shadow-sm">
                  {{ formatPrice(lesson.priceInCents, lesson.currency) }}
                </span>
              }
            </div>
            <!-- Tier badge top-right -->
            <div class="absolute top-2 right-2 z-10">
              <span
                class="text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-black"
                [class]="getTierBadgeClass(tier)"
              >{{ getTierLabel(tier) }}</span>
            </div>
          } @else {
            <!-- Accessible indicator -->
            <span class="material-icons text-black text-6xl relative z-10 drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">menu_book</span>
          }
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
            @if (!accessible) {
              <app-button
                variant="primary"
                size="sm"
                (btnClick)="openUnlockModal(lesson)"
              >
                🔓 Unlock
              </app-button>
            } @else {
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
            }
          </div>
        </div>
      </div>
    </ng-template>

    <!-- Checkout modal (for individual lesson unlock from browser) -->
    <app-checkout-modal
      [isOpen]="unlockModalOpen()"
      [itemId]="unlockLesson()?.id ?? ''"
      [itemTitle]="unlockLesson()?.title ?? ''"
      itemType="LESSON"
      [price]="unlockLessonPrice()"
      (closed)="closeUnlockModal()"
    />
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

  // For the unlock modal triggered from browser tab
  protected readonly unlockModalOpen = signal(false);
  protected readonly unlockLesson = signal<Lesson | null>(null);
  protected readonly unlockLessonPrice = computed(() => {
    const l = this.unlockLesson();
    return l?.priceInCents ? this.formatPrice(l.priceInCents, l.currency) : '';
  });

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
      if (tab && ['browser', 'my-lessons', 'bundles', 'history'].includes(tab)) {
        this.activeTab.set(tab);
        // Clean up the URL after reading
        this.router.navigate([], { queryParams: {}, replaceUrl: true });
      }
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

  isAccessible(lessonId: string): boolean {
    // Seed lessons (non-UUID IDs) are always accessible
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(lessonId)) return true;
    return this.lessonsStore.accessibleLessonIds().has(lessonId);
  }

  getPriceTier(lesson: Lesson, accessible: boolean): 'free' | 'silver' | 'gold' | 'diamond' {
    if (accessible || lesson.priceInCents === null) return 'free';
    const diff = lesson.difficulty?.toLowerCase() ?? '';
    if (diff === 'advanced' || diff === 'hard') return 'diamond';
    if (diff === 'intermediate' || diff === 'medium') return 'gold';
    return 'silver';
  }

  getTierBg(tier: string): string {
    switch (tier) {
      case 'diamond': return 'bg-violet-100';
      case 'gold':    return 'bg-amber-50';
      case 'silver':  return 'bg-gray-100';
      default:        return 'bg-[#0ABAB5]/20';
    }
  }

  getTierIconColor(tier: string): string {
    switch (tier) {
      case 'diamond': return 'text-violet-500';
      case 'gold':    return 'text-amber-500';
      case 'silver':  return 'text-gray-500';
      default:        return 'text-[#0ABAB5]';
    }
  }

  getTierBadgeClass(tier: string): string {
    switch (tier) {
      case 'diamond': return 'bg-violet-100 text-violet-700 border-violet-400';
      case 'gold':    return 'bg-amber-100 text-amber-700 border-amber-400';
      case 'silver':  return 'bg-gray-100 text-gray-700 border-gray-400';
      default:        return 'bg-[#0ABAB5]/10 text-[#0ABAB5] border-[#0ABAB5]';
    }
  }

  getTierLabel(tier: string): string {
    switch (tier) {
      case 'diamond': return '💎 Premium';
      case 'gold':    return '🥇 Gold';
      case 'silver':  return '🥈 Silver';
      default:        return '✓ Free';
    }
  }

  formatPrice(priceInCents: number, currency = 'RON'): string {
    const value = priceInCents / 100;
    try {
      return new Intl.NumberFormat('ro-RO', { style: 'currency', currency }).format(value);
    } catch {
      return `${value.toFixed(2)} ${currency}`;
    }
  }

  openUnlockModal(lesson: Lesson): void {
    this.unlockLesson.set(lesson);
    this.unlockModalOpen.set(true);
  }

  closeUnlockModal(): void {
    this.unlockModalOpen.set(false);
    this.unlockLesson.set(null);
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
