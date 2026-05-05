import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {
  QuestionDifficulty,
  QuestionResultBreakdown,
} from '@shared/models/quiz.types';
import { QuizzesStore } from '../../store/quizzes.store';

const PASS_THRESHOLD = 60;
const COUNTER_DURATION_MS = 900;
const COUNTER_FRAMES = 30;
const CONFETTI_COUNT = 14;

interface ConfettiPiece {
  id: number;
  leftPercent: number;
  delayMs: number;
  rotation: number;
  color: string;
}

interface DifficultySlice {
  difficulty: QuestionDifficulty;
  total: number;
  correct: number;
  accuracy: number;
  startAngle: number;
  endAngle: number;
  arcPath: string;
  color: string;
  legendLabel: string;
}

interface BarRow {
  questionId: string;
  label: string;
  fullLabel: string;
  seconds: number;
  widthPercent: number;
  isCorrect: boolean;
}

const CONFETTI_COLORS = ['#0ABAB5', '#FFC857', '#E94F37', '#3D5A80', '#84A98C', '#F7B538'];
const DIFFICULTY_COLORS: Record<QuestionDifficulty, string> = {
  EASY: '#16a34a',
  MEDIUM: '#f59e0b',
  HARD: '#dc2626',
};

@Component({
  selector: 'app-results-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './results-summary.component.html',
  styleUrl: './results-summary.component.css',
})
export class ResultsSummaryComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  store = inject(QuizzesStore);

  expandedQuestions = signal<Set<string>>(new Set());
  expandedExplanations = signal<Set<string>>(new Set());
  displayedScore = signal(0);
  attemptId = signal<string | null>(null);
  quizId = signal<string | null>(null);

  private readonly counterStarted = signal(false);

  detail = computed(() => this.store.resultDetail());
  loading = computed(() => this.store.resultDetailLoading());
  error = computed(() => this.store.resultDetailError());

  scoreLabel = computed(() => {
    const d = this.detail();
    if (!d) return '0/0';
    return `${d.score}/${d.totalPoints}`;
  });

  percentage = computed(() => this.detail()?.percentage ?? 0);
  passed = computed(() => this.detail()?.passed ?? false);

  formattedTime = computed(() => this.formatTime(this.detail()?.timeSpent ?? 0));

  confettiPieces = computed<ConfettiPiece[]>(() => {
    if (!this.passed()) return [];
    return Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
      id: i,
      leftPercent: Math.round((i / CONFETTI_COUNT) * 100 + ((i * 37) % 6)),
      delayMs: (i * 73) % 600,
      rotation: (i * 47) % 360,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    }));
  });

  donutSlices = computed<DifficultySlice[]>(() => {
    const breakdown = this.detail()?.questionBreakdown ?? [];
    if (breakdown.length === 0) return [];

    const buckets: Record<QuestionDifficulty, { total: number; correct: number }> = {
      EASY: { total: 0, correct: 0 },
      MEDIUM: { total: 0, correct: 0 },
      HARD: { total: 0, correct: 0 },
    };

    for (const q of breakdown) {
      buckets[q.difficulty].total += 1;
      if (q.isCorrect) buckets[q.difficulty].correct += 1;
    }

    const order: QuestionDifficulty[] = ['EASY', 'MEDIUM', 'HARD'];
    const present = order.filter((d) => buckets[d].total > 0);
    const sweepEach = present.length > 0 ? 360 / present.length : 0;

    return present.map((difficulty, idx) => {
      const { total, correct } = buckets[difficulty];
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
      const startAngle = idx * sweepEach;
      const endAngle = startAngle + sweepEach;
      return {
        difficulty,
        total,
        correct,
        accuracy,
        startAngle,
        endAngle,
        arcPath: this.describeArc(80, 80, 60, startAngle, endAngle),
        color: DIFFICULTY_COLORS[difficulty],
        legendLabel: `${this.capitalize(difficulty)}: ${correct}/${total} correct (${accuracy}%)`,
      };
    });
  });

  barRows = computed<BarRow[]>(() => {
    const breakdown = this.detail()?.questionBreakdown ?? [];
    if (breakdown.length === 0) return [];
    const max = Math.max(...breakdown.map((b) => b.timeSpentSeconds), 1);
    return breakdown.map((q, i) => ({
      questionId: q.questionId,
      label: `Q${i + 1}`,
      fullLabel: this.truncate(q.questionText, 40),
      seconds: q.timeSpentSeconds,
      widthPercent: Math.max(4, Math.round((q.timeSpentSeconds / max) * 100)),
      isCorrect: q.isCorrect,
    }));
  });

  hasNextLesson = computed(() => !!this.detail()?.nextLessonId);

  constructor() {
    effect(() => {
      const d = this.detail();
      if (d && !this.counterStarted()) {
        this.counterStarted.set(true);
        this.runScoreCounter(d.score);
      }
    });
  }

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('id');
    const attemptId = this.route.snapshot.paramMap.get('attemptId');

    if (!quizId || !attemptId) return;

    this.quizId.set(quizId);
    this.attemptId.set(attemptId);
    this.store.loadResultDetail(quizId, attemptId);
  }

  expandAll() {
    const ids = (this.detail()?.questionBreakdown ?? []).map((q) => q.questionId);
    this.expandedQuestions.set(new Set(ids));
  }

  collapseAll() {
    this.expandedQuestions.set(new Set());
    this.expandedExplanations.set(new Set());
  }

  toggleQuestion(id: string) {
    const next = new Set(this.expandedQuestions());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this.expandedQuestions.set(next);
  }

  isExpanded(id: string) {
    return this.expandedQuestions().has(id);
  }

  toggleExplanation(id: string) {
    const next = new Set(this.expandedExplanations());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this.expandedExplanations.set(next);
  }

  isExplanationExpanded(id: string) {
    return this.expandedExplanations().has(id);
  }

  retryQuiz() {
    const quizId = this.quizId();
    if (!quizId) return;
    this.store.resetQuiz();
    this.store.clearResultDetail();
    this.router.navigate(['/student/quizzes', quizId]);
  }

  backToLesson() {
    const lessonId = this.detail()?.lessonId;
    if (!lessonId) {
      this.router.navigate(['/student/lessons']);
      return;
    }
    this.router.navigate(['/student/lesson-viewer', lessonId]);
  }

  nextLesson() {
    const nextLessonId = this.detail()?.nextLessonId;
    if (!nextLessonId) return;
    this.router.navigate(['/student/lesson-viewer', nextLessonId]);
  }

  questionPreview(q: QuestionResultBreakdown): string {
    return q.questionText.length > 60 ? `${q.questionText.slice(0, 60)}…` : q.questionText;
  }

  formatTime(seconds: number): string {
    const safe = Math.max(0, Math.round(seconds));
    const m = Math.floor(safe / 60);
    const s = safe % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  difficultyBadgeClasses(difficulty: QuestionDifficulty): string {
    switch (difficulty) {
      case 'EASY':
        return 'bg-green-100 text-green-800 border-green-700';
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800 border-amber-700';
      case 'HARD':
        return 'bg-red-100 text-red-800 border-red-700';
    }
  }

  isPassing(percentage: number): boolean {
    return percentage >= PASS_THRESHOLD;
  }

  private runScoreCounter(target: number) {
    if (target <= 0) {
      this.displayedScore.set(0);
      return;
    }
    const stepDuration = COUNTER_DURATION_MS / COUNTER_FRAMES;
    let frame = 0;
    this.displayedScore.set(0);
    interval(stepDuration)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          frame += 1;
          const ratio = Math.min(1, frame / COUNTER_FRAMES);
          this.displayedScore.set(Math.round(ratio * target));
          if (frame >= COUNTER_FRAMES) {
            this.displayedScore.set(target);
          }
        },
      });
  }

  private describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
    const start = this.polarToCartesian(cx, cy, r, endAngle);
    const end = this.polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M',
      start.x,
      start.y,
      'A',
      r,
      r,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(' ');
  }

  private polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
  }

  private truncate(text: string, max: number): string {
    return text.length > max ? `${text.slice(0, max)}…` : text;
  }

  private capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
