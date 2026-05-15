import { TestBed, fakeAsync, tick } from '@angular/core/testing';
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
    it('currentQuestion returns the question at currentQuestionIndex', () => {
      expect(component.currentQuestion()?.id).toBe('q1');
    });

    it('currentQuestion returns undefined when quiz is null', () => {
      patchStore(store, { currentQuiz: null });
      expect(component.currentQuestion()).toBeUndefined();
    });

    it('totalQuestions reflects quiz question count', () => {
      expect(component.totalQuestions()).toBe(2);
    });

    it('isLastQuestion boundaries', () => {
      patchStore(store, { currentQuestionIndex: 0 });
      expect(component.isLastQuestion()).toBe(false);

      patchStore(store, { currentQuestionIndex: 1 });
      expect(component.isLastQuestion()).toBe(true);
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
      // @ts-ignore - checking private property state for coverage
      expect(component.resultsNavigated()).toBe(false);
    });
  });

  describe('Effects', () => {
    it('navigates to results when attemptId becomes available', () => {
      const spy = vi.spyOn(router, 'navigate');

      // Update store to trigger the effect
      patchStore(store, { result: { attemptId: 'att-123', score: 100 } });
      TestBed.flushEffects();

      expect(spy).toHaveBeenCalledWith(['/student/quizzes', 'quiz-1', 'results', 'att-123']);
    });

    it('timer subscription ticks when conditions are met', fakeAsync(() => {
      const spy = vi.spyOn(store, 'tickTimer').mockImplementation(() => undefined);

      component.started.set(true);
      patchStore(store, { submitted: false, timeRemaining: 900 });
      TestBed.flushEffects(); // Kick off the effect

      tick(1000); // Fast-forward 1 second
      expect(spy).toHaveBeenCalled();

      // Clean up effect by failing conditions
      patchStore(store, { submitted: true });
      TestBed.flushEffects();
    }));
  });

  describe('UI Helpers', () => {
    it('togglePalette flips paletteOpen', () => {
      component.paletteOpen.set(false);
      component.togglePalette();
      expect(component.paletteOpen()).toBe(true);
    });

    it('getPaletteClass applies correct styling classes', () => {
      vi.spyOn(store, 'isAnswered').mockReturnValue(computed(() => true));
      vi.spyOn(store, 'isFlagged').mockReturnValue(computed(() => true));
      patchStore(store, { currentQuestionIndex: 0 });

      const classes = component.getPaletteClass(0);
      expect(classes).toContain('answered');
      expect(classes).toContain('flagged');
      expect(classes).toContain('current');

      vi.spyOn(store, 'isAnswered').mockReturnValue(computed(() => false));
      const unansweredClasses = component.getPaletteClass(1);
      expect(unansweredClasses).toContain('unanswered');
    });
  });
});
