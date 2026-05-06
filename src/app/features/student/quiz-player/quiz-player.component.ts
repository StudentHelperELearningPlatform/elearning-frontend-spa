import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QuizzesStore } from '../store/quizzes.store';
import { Question } from '../../../shared/models/quiz.types';
import { QuestionCardComponent } from './question-card/question-card.component';
import { TimerComponent } from './timer/timer.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-quiz-player',
  standalone: true,
  imports: [
    CommonModule,
    QuestionCardComponent,
    TimerComponent,
    ButtonComponent,
    ModalComponent,
  ],
  templateUrl: './quiz-player.component.html',
})
export class QuizPlayerComponent implements OnInit {
  store = inject(QuizzesStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  private timerSubscription: Subscription | null = null;
  started = signal(false);
  paletteOpen = signal(false);
  showSubmitModal = signal(false);
  quizId = signal('1');
  private readonly resultsNavigated = signal(false);

  selectedOptionId = signal<string | null>(null);

  currentQuestion = computed<Question | undefined>(() => {
    const quiz = this.store.currentQuiz();
    if (!quiz || !quiz.questions) return undefined;
    return quiz.questions[this.store.currentQuestionIndex()];
  });

  progressPercentage = computed(() => {
    const total = this.store.currentQuiz()?.questions?.length || 1;
    const current = this.store.currentQuestionIndex() + 1;
    return (current / total) * 100;
  });

  totalQuestions = computed(() => this.store.currentQuiz()?.questions?.length || 0);

  isLastQuestion = computed(() => this.store.currentQuestionIndex() >= this.totalQuestions() - 1);

  constructor() {
    effect(() => {
      const shouldRunTimer =
        this.started() && !this.store.submitted() && this.store.timeRemaining() !== null;

      if (shouldRunTimer && !this.timerSubscription) {
        this.timerSubscription = interval(1000)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => this.store.tickTimer());
      }

      if (!shouldRunTimer && this.timerSubscription) {
        this.timerSubscription.unsubscribe();
        this.timerSubscription = null;
      }
    });

    effect(() => {
      const questionId = this.currentQuestion()?.id;
      if (!questionId) {
        this.selectedOptionId.set(null);
        return;
      }

      const answer = this.store.answers()[questionId] ?? null;
      this.selectedOptionId.set(answer);
    });

    effect(() => {
      const attemptId = this.store.result()?.attemptId;
      if (!attemptId || this.resultsNavigated()) return;
      this.resultsNavigated.set(true);
      this.router.navigate([
        '/student/quizzes',
        this.quizId(),
        'results',
        attemptId,
      ]);
    });
  }

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('id') ?? '1';
    this.quizId.set(quizId);
    this.store.loadQuizById(quizId);
  }

  startQuiz() {
    this.store.startQuiz(this.quizId());
    this.started.set(true);
    this.paletteOpen.set(false);
    this.showSubmitModal.set(false);
    this.selectedOptionId.set(null);
  }

  selectOption(optionId: string) {
    this.selectedOptionId.set(optionId);
    // Save answer to store
    const qId = this.currentQuestion()?.id;
    if (qId) {
      this.store.answerQuestion(qId, optionId);
    }
  }

  nextQuestion() {
    this.store.nextQuestion();
    this.restoreSelectedOption();
  }

  previousQuestion() {
    this.store.prevQuestion();
    this.restoreSelectedOption();
  }

  navigateTo(index: number) {
    this.store.navigateTo(index);
    this.restoreSelectedOption();
  }

  private restoreSelectedOption() {
    const qId = this.currentQuestion()?.id;
    if (qId) {
      const answer = this.store.answers()[qId];
      this.selectedOptionId.set(answer || null);
    } else {
      this.selectedOptionId.set(null);
    }
  }

  submitQuiz() {
    this.showSubmitModal.set(true);
  }

  submitConfirmed() {
    this.showSubmitModal.set(false);
    this.store.submitQuiz();
  }

  onNextOrSubmit() {
    if (this.isLastQuestion()) {
      this.submitQuiz();
      return;
    }
    this.nextQuestion();
  }

  togglePalette() {
    this.paletteOpen.set(!this.paletteOpen());
  }

  handleTimeUp() {
    this.store.submitQuiz();
  }

  retryQuiz() {
    this.store.resetQuiz();
    this.store.loadQuizById(this.quizId());
    this.started.set(false);
    this.paletteOpen.set(false);
    this.showSubmitModal.set(false);
    this.selectedOptionId.set(null);
    this.resultsNavigated.set(false);
  }

  getPaletteClass(index: number): string {
    const classes = [
      'w-10',
      'h-10',
      'rounded-lg',
      'border-2',
      'font-bold',
      'text-sm',
      'transition-colors',
    ];

    const question = this.store.currentQuiz()?.questions[index];
    const isCurrent = this.store.currentQuestionIndex() === index;
    const isAnswered = question ? this.store.isAnswered(question.id)() : false;
    const isFlagged = question ? this.store.isFlagged(question.id)() : false;

    if (isAnswered) {
      classes.push('answered', 'bg-[#0ABAB5]/20');
    } else {
      classes.push('unanswered', 'bg-gray-200');
    }

    if (isFlagged) {
      classes.push('flagged', 'ring-2', 'ring-amber-500');
    }

    if (isCurrent) {
      classes.push('current', 'border-black');
    } else {
      classes.push('border-gray-400');
    }

    return classes.join(' ');
  }

  goBack() {
    this.router.navigate(['/student/dashboard']);
  }
}

