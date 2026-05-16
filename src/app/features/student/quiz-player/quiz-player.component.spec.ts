import { TestBed } from '@angular/core/testing';
import { patchStore } from '../../../../test-utils/patch-store';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { QuizzesStore } from '../store/quizzes.store';
import { computed, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { QuizPlayerComponent } from './quiz-player.component';

const MOCK_QUIZ = {
  id: 'quiz-1',
  title: 'Sample Quiz',
  subject: 'Mathematics',
  timeLimit: 900,
  timeLimitSeconds: 900,
  questions: [
    {
      id: 'q1',
      type: 'MULTIPLE_CHOICE' as const,
      text: 'What is 2 + 2?',
      points: 10,
      options: [
        { id: 'q1-o1', text: '3' },
        { id: 'q1-o2', text: '4' },
      ],
    },
    {
      id: 'q2',
      type: 'TRUE_FALSE' as const,
      text: 'The earth is flat.',
      points: 10,
      options: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
    },
  ],
};

describe('QuizPlayerComponent', () => {
  let store: InstanceType<typeof QuizzesStore>;
  let component: QuizPlayerComponent;
  let injector: EnvironmentInjector;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'quiz-1' } } },
        },
      ],
    });

    store = TestBed.inject(QuizzesStore);
    injector = TestBed.inject(EnvironmentInjector);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);

    patchStore(store, {
      currentQuiz: MOCK_QUIZ,
      currentQuestionIndex: 0,
      answers: {},
      flaggedQuestions: new Set<string>(),
      startedAt: null,
      timeRemaining: 900,
      submitted: false,
      result: null,
      loading: false,
    });

    component = runInInjectionContext(injector, () => new QuizPlayerComponent());
    component.ngOnInit();
  });

  afterEach(() => vi.restoreAllMocks());

  describe('Component Initialization & Core Logic', () => {
    it('ngOnInit defaults to quiz "1" if route param is null', () => {
      route.snapshot.paramMap.get = () => null;
      component.ngOnInit();
      expect(component.quizId()).toBe('1');
    });

    it('currentQuestion returns the question at currentQuestionIndex', () => {
      expect(component.currentQuestion()?.id).toBe('q1');
    });

    it('currentQuestion returns undefined when quiz is null', () => {
      patchStore(store, { currentQuiz: null });
      expect(component.currentQuestion()).toBeUndefined();
    });

    it('totalQuestions reflects quiz question count', () => {
      expect(component.totalQuestions()).toBe(2);

      patchStore(store, {
        currentQuiz: {
          ...MOCK_QUIZ,
          questions: undefined as unknown as typeof MOCK_QUIZ.questions,
        },
      });
      expect(component.totalQuestions()).toBe(0);
    });

    it('isLastQuestion boundaries', () => {
      patchStore(store, { currentQuestionIndex: 0 });
      expect(component.isLastQuestion()).toBe(false);

      patchStore(store, { currentQuestionIndex: 1 });
      expect(component.isLastQuestion()).toBe(true);
    });

    it('calculates progressPercentage correctly', () => {
      patchStore(store, { currentQuestionIndex: 0 });
      expect(component.progressPercentage()).toBe(50); // 1/2 * 100

      patchStore(store, { currentQuestionIndex: 1 });
      expect(component.progressPercentage()).toBe(100); // 2/2 * 100
    });

    it('progressPercentage handles empty questions fallback', () => {
      patchStore(store, { currentQuiz: { ...MOCK_QUIZ, questions: [] } });
      expect(component.progressPercentage()).toBe(100); // fallback is total=1, current=1 => 100
    });
  });

  describe('Actions & State Updates', () => {
    it('startQuiz sets started to true and resets modals', () => {
      component.paletteOpen.set(true);
      component.showSubmitModal.set(true);
      const spy = vi.spyOn(store, 'startQuiz').mockImplementation(() => undefined);

      component.startQuiz();

      expect(component.started()).toBe(true);
      expect(component.paletteOpen()).toBe(false);
      expect(component.showSubmitModal()).toBe(false);
      expect(spy).toHaveBeenCalledWith('quiz-1');
    });

    it('selectOption updates local signal and store', () => {
      const spy = vi.spyOn(store, 'answerQuestion');
      component.selectOption('q1-o1');
      expect(component.selectedOptionId()).toBe('q1-o1');
      expect(spy).toHaveBeenCalledWith('q1', 'q1-o1');
    });

    it('selectOption does nothing if currentQuestion is undefined', () => {
      const spy = vi.spyOn(store, 'answerQuestion');
      patchStore(store, { currentQuiz: null });
      component.selectOption('q1-o1');
      expect(spy).not.toHaveBeenCalled();
    });

    it('nextQuestion, previousQuestion, and navigateTo call store and restore options', () => {
      const nextSpy = vi.spyOn(store, 'nextQuestion');
      const prevSpy = vi.spyOn(store, 'prevQuestion');
      const navSpy = vi.spyOn(store, 'navigateTo');

      component.nextQuestion();
      expect(nextSpy).toHaveBeenCalled();

      component.previousQuestion();
      expect(prevSpy).toHaveBeenCalled();

      component.navigateTo(1);
      expect(navSpy).toHaveBeenCalledWith(1);
    });

    it('restoreSelectedOption sets the correct answer if it exists in store', () => {
      patchStore(store, { answers: { q1: 'q1-o2' } });
      component.nextQuestion(); // triggers restoreSelectedOption internally
      component.previousQuestion(); // go back to q1
      expect(component.selectedOptionId()).toBe('q1-o2');
    });

    it('restoreSelectedOption sets null if there is no current question', () => {
      patchStore(store, { currentQuiz: null });
      component.nextQuestion(); // Triggers private restoreSelectedOption
      expect(component.selectedOptionId()).toBeNull();
    });
  });

  describe('Submissions & Navigation', () => {
    it('submitQuiz opens the submit modal', () => {
      component.submitQuiz();
      expect(component.showSubmitModal()).toBe(true);
    });

    it('submitConfirmed closes modal and calls store', () => {
      component.showSubmitModal.set(true);
      const spy = vi.spyOn(store, 'submitQuiz').mockImplementation(() => undefined);
      component.submitConfirmed();
      expect(component.showSubmitModal()).toBe(false);
      expect(spy).toHaveBeenCalled();
    });

    it('onNextOrSubmit routing logic', () => {
      patchStore(store, { currentQuestionIndex: 0 });
      const nextSpy = vi.spyOn(component, 'nextQuestion');
      component.onNextOrSubmit();
      expect(nextSpy).toHaveBeenCalled();

      patchStore(store, { currentQuestionIndex: 1 });
      const submitSpy = vi.spyOn(component, 'submitQuiz');
      component.onNextOrSubmit();
      expect(submitSpy).toHaveBeenCalled();
    });

    it('handleTimeUp calls store.submitQuiz', () => {
      const spy = vi.spyOn(store, 'submitQuiz').mockImplementation(() => undefined);
      component.handleTimeUp();
      expect(spy).toHaveBeenCalled();
    });

    it('goBack navigates to dashboard', () => {
      const spy = vi.spyOn(router, 'navigate');
      component.goBack();
      expect(spy).toHaveBeenCalledWith(['/student/dashboard']);
    });

    it('retryQuiz resets the quiz state entirely', () => {
      vi.spyOn(store, 'resetQuiz').mockImplementation(() => undefined);
      vi.spyOn(store, 'loadQuizById').mockImplementation(() => undefined);
      component.started.set(true);

      component.retryQuiz();

      expect(component.started()).toBe(false);
      expect(component.paletteOpen()).toBe(false);
      expect(component.showSubmitModal()).toBe(false);
      expect(component.selectedOptionId()).toBeNull();
      // @ts-expect-error accessing private property for coverage check
      expect(component.resultsNavigated()).toBe(false);
    });
  });

  describe('Effects Execution Branches', () => {
    it('navigates to results when attemptId becomes available', () => {
      const spy = vi.spyOn(router, 'navigate');
      patchStore(store, { result: { attemptId: 'att-123', score: 100 } });
      TestBed.flushEffects();
      expect(spy).toHaveBeenCalledWith(['/student/quizzes', 'quiz-1', 'results', 'att-123']);
    });

    it('does not navigate to results if already navigated', () => {
      const spy = vi.spyOn(router, 'navigate');
      patchStore(store, { result: { attemptId: 'att-123', score: 100 } });
      // @ts-expect-error bypass private
      component.resultsNavigated.set(true);
      TestBed.flushEffects();
      expect(spy).not.toHaveBeenCalled();
    });

    it('timer subscription ticks when conditions are met and unsubscribes when done', () => {
      vi.useFakeTimers();
      const spy = vi.spyOn(store, 'tickTimer').mockImplementation(() => undefined);

      // Condition 1: started, not submitted, has time remaining -> should run timer
      component.started.set(true);
      patchStore(store, { submitted: false, timeRemaining: 900 });
      TestBed.flushEffects();

      vi.advanceTimersByTime(1000);
      expect(spy).toHaveBeenCalled();

      // @ts-expect-error verifying private sub exists
      expect(component.timerSubscription).not.toBeNull();

      // Condition 2: test teardown branch (when submitted becomes true)
      patchStore(store, { submitted: true });
      TestBed.flushEffects();

      // @ts-expect-error verifying private sub is cleared
      expect(component.timerSubscription).toBeNull();
      vi.useRealTimers();
    });

    it('effect sets selectedOptionId to null if question id is missing', () => {
      patchStore(store, { currentQuiz: null });
      TestBed.flushEffects();
      expect(component.selectedOptionId()).toBeNull();
    });
  });

  describe('UI Helpers', () => {
    it('togglePalette flips paletteOpen', () => {
      component.paletteOpen.set(false);
      component.togglePalette();
      expect(component.paletteOpen()).toBe(true);
    });

    it('getPaletteClass applies correct styling classes for active and flagged', () => {
      vi.spyOn(store, 'isAnswered').mockReturnValue(computed(() => true));
      vi.spyOn(store, 'isFlagged').mockReturnValue(computed(() => true));
      patchStore(store, { currentQuestionIndex: 0 });

      const classes = component.getPaletteClass(0);
      expect(classes).toContain('answered');
      expect(classes).toContain('flagged');
      expect(classes).toContain('current');
    });

    it('getPaletteClass applies correct styling classes for unanswered and not current', () => {
      vi.spyOn(store, 'isAnswered').mockReturnValue(computed(() => false));
      vi.spyOn(store, 'isFlagged').mockReturnValue(computed(() => false));
      patchStore(store, { currentQuestionIndex: 1 });

      const classes = component.getPaletteClass(0);
      expect(classes).toContain('unanswered');
      expect(classes).toContain('border-gray-400');
      expect(classes).not.toContain('flagged');
    });

    it('getPaletteClass handles undefined question safely', () => {
      const classes = component.getPaletteClass(99); // out of bounds index
      expect(classes).toContain('unanswered');
      // Verificam ca nu primeste clasa bg-culoare specifica pt answered, in loc sa cautam
      // strict dupavantul "answered" care e continut si in "unanswered"
      expect(classes).not.toContain('bg-[#0ABAB5]/20');
    });
  });
});
