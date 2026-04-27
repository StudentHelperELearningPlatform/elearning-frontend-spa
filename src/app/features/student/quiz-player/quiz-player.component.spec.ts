import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { patchState } from '@ngrx/signals';
import { of } from 'rxjs';
import { QuizzesStore } from '../store/quizzes.store';

// QuizPlayerComponent uses templateUrl so we cannot mount it in Vitest.
// We test the component CLASS logic directly by instantiating it with injected deps.

import { QuizPlayerComponent } from './quiz-player.component';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';

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
        { id: 'q1-o3', text: '5' },
      ],
    },
    {
      id: 'q2',
      type: 'TRUE_FALSE' as const,
      text: 'The earth is flat.',
      points: 10,
      options: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }],
    },
    {
      id: 'q3',
      type: 'SHORT_ANSWER' as const,
      text: "Explain Newton's first law.",
      points: 10,
      options: [],
    },
  ],
};

describe('QuizPlayerComponent (logic)', () => {
  let store: InstanceType<typeof QuizzesStore>;
  let component: QuizPlayerComponent;
  let injector: EnvironmentInjector;

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

    patchState(store, {
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

    // Instantiate the component class inside the injection context so signals & effects work
    component = runInInjectionContext(injector, () => new QuizPlayerComponent());
    component.ngOnInit();
  });

  afterEach(() => vi.restoreAllMocks());

  // ─── currentQuestion ──────────────────────────────────────────────────────

  it('currentQuestion returns the question at currentQuestionIndex', () => {
    expect(component.currentQuestion()?.id).toBe('q1');
  });

  it('currentQuestion returns undefined when quiz is null', () => {
    patchState(store, { currentQuiz: null });
    expect(component.currentQuestion()).toBeUndefined();
  });

  // ─── totalQuestions / isLastQuestion ─────────────────────────────────────

  it('totalQuestions reflects quiz question count', () => {
    expect(component.totalQuestions()).toBe(3);
  });

  it('isLastQuestion is false when not on last question', () => {
    patchState(store, { currentQuestionIndex: 0 });
    expect(component.isLastQuestion()).toBe(false);
  });

  it('isLastQuestion is true on the final question', () => {
    patchState(store, { currentQuestionIndex: 2 });
    expect(component.isLastQuestion()).toBe(true);
  });

  // ─── startQuiz ────────────────────────────────────────────────────────────

  it('startQuiz sets started to true', () => {
    vi.spyOn(store, 'startQuiz').mockImplementation(() => undefined);
    component.startQuiz();
    expect(component.started()).toBe(true);
  });

  it('startQuiz calls store.startQuiz with the quiz id', () => {
    const spy = vi.spyOn(store, 'startQuiz').mockImplementation(() => undefined);
    component.startQuiz();
    expect(spy).toHaveBeenCalledWith('quiz-1');
  });

  it('startQuiz resets paletteOpen and showSubmitModal', () => {
    component.paletteOpen.set(true);
    component.showSubmitModal.set(true);
    vi.spyOn(store, 'startQuiz').mockImplementation(() => undefined);
    component.startQuiz();
    expect(component.paletteOpen()).toBe(false);
    expect(component.showSubmitModal()).toBe(false);
  });

  // ─── selectOption ─────────────────────────────────────────────────────────

  it('selectOption updates selectedOptionId', () => {
    component.selectOption('q1-o2');
    expect(component.selectedOptionId()).toBe('q1-o2');
  });

  it('selectOption calls store.answerQuestion', () => {
    const spy = vi.spyOn(store, 'answerQuestion');
    component.selectOption('q1-o1');
    expect(spy).toHaveBeenCalledWith('q1', 'q1-o1');
  });

  // ─── nextQuestion / previousQuestion ─────────────────────────────────────

  it('nextQuestion calls store.nextQuestion', () => {
    const spy = vi.spyOn(store, 'nextQuestion');
    component.nextQuestion();
    expect(spy).toHaveBeenCalled();
  });

  it('previousQuestion calls store.prevQuestion', () => {
    const spy = vi.spyOn(store, 'prevQuestion');
    component.previousQuestion();
    expect(spy).toHaveBeenCalled();
  });

  // ─── navigateTo ───────────────────────────────────────────────────────────

  it('navigateTo calls store.navigateTo with the given index', () => {
    const spy = vi.spyOn(store, 'navigateTo');
    component.navigateTo(2);
    expect(spy).toHaveBeenCalledWith(2);
  });

  // ─── submitQuiz / submitConfirmed ────────────────────────────────────────

  it('submitQuiz opens the submit modal', () => {
    component.submitQuiz();
    expect(component.showSubmitModal()).toBe(true);
  });

  it('submitConfirmed closes modal and calls store.submitQuiz', () => {
    component.showSubmitModal.set(true);
    const spy = vi.spyOn(store, 'submitQuiz').mockImplementation(() => undefined);
    component.submitConfirmed();
    expect(component.showSubmitModal()).toBe(false);
    expect(spy).toHaveBeenCalled();
  });

  // ─── onNextOrSubmit ───────────────────────────────────────────────────────

  it('onNextOrSubmit calls nextQuestion when not on last question', () => {
    patchState(store, { currentQuestionIndex: 0 });
    const spy = vi.spyOn(component, 'nextQuestion');
    component.onNextOrSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('onNextOrSubmit calls submitQuiz when on last question', () => {
    patchState(store, { currentQuestionIndex: 2 });
    const spy = vi.spyOn(component, 'submitQuiz');
    component.onNextOrSubmit();
    expect(spy).toHaveBeenCalled();
  });

  // ─── togglePalette ────────────────────────────────────────────────────────

  it('togglePalette flips paletteOpen', () => {
    expect(component.paletteOpen()).toBe(false);
    component.togglePalette();
    expect(component.paletteOpen()).toBe(true);
    component.togglePalette();
    expect(component.paletteOpen()).toBe(false);
  });

  // ─── getPaletteClass ─────────────────────────────────────────────────────

  it('getPaletteClass includes "answered" when question is answered', () => {
    patchState(store, { answers: { q1: 'q1-o1' } });
    expect(component.getPaletteClass(0)).toContain('answered');
  });

  it('getPaletteClass includes "unanswered" when question is not answered', () => {
    patchState(store, { answers: {} });
    expect(component.getPaletteClass(0)).toContain('unanswered');
  });

  it('getPaletteClass includes "flagged" when question is flagged', () => {
    patchState(store, { flaggedQuestions: new Set(['q1']) });
    expect(component.getPaletteClass(0)).toContain('flagged');
  });

  it('getPaletteClass includes "current" for the active question index', () => {
    patchState(store, { currentQuestionIndex: 0 });
    expect(component.getPaletteClass(0)).toContain('current');
  });

  // ─── progressPercentage ───────────────────────────────────────────────────

  it('progressPercentage is > 0 when not on first question', () => {
    patchState(store, { currentQuestionIndex: 1 });
    expect(component.progressPercentage()).toBeGreaterThan(0);
  });

  // ─── retryQuiz ────────────────────────────────────────────────────────────

  it('retryQuiz resets started to false', () => {
    vi.spyOn(store, 'resetQuiz').mockImplementation(() => undefined);
    vi.spyOn(store, 'loadQuizById').mockImplementation(() => undefined);
    component.started.set(true);
    component.retryQuiz();
    expect(component.started()).toBe(false);
  });
});
