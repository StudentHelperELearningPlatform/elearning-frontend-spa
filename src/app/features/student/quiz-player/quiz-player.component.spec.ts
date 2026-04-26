import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { patchState } from '@ngrx/signals';
import { of } from 'rxjs';
import { QuizPlayerComponent } from './quiz-player.component';
import { QuizzesStore } from '../store/quizzes.store';

const MOCK_QUIZ = {
  id: 'quiz-1',
  title: 'Sample Quiz',
  subject: 'Mathematics',
  timeLimit: 900,
  timeLimitSeconds: 900,
  questions: [
    {
      id: 'q1',
      type: 'MULTIPLE_CHOICE',
      text: 'What is 2 + 2?',
      points: 10,
      options: [
        { id: 'q1-o1', text: '3' },
        { id: 'q1-o2', text: '4' },
        { id: 'q1-o3', text: '5' },
        { id: 'q1-o4', text: '6' },
      ],
    },
    {
      id: 'q2',
      type: 'TRUE_FALSE',
      text: 'The earth is flat.',
      points: 10,
      options: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
    },
    {
      id: 'q3',
      type: 'SHORT_ANSWER',
      text: 'Explain Newton\'s first law.',
      points: 10,
      options: [],
    },
  ],
};

describe('QuizPlayerComponent', () => {
  let component: QuizPlayerComponent;
  let fixture: ComponentFixture<QuizPlayerComponent>;
  let store: InstanceType<typeof QuizzesStore>;
  let router: Router;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizPlayerComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'quiz-1' } } },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(QuizzesStore);
    router = TestBed.inject(Router);
    http = TestBed.inject(HttpClient);

    // Seed the store so tests don't wait for HTTP
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

    fixture = TestBed.createComponent(QuizPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ─── Renders ──────────────────────────────────────────────────────────────

  it('creates without errors', () => {
    expect(component).toBeTruthy();
  });

  it('shows the quiz start screen before quiz is started', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Begin Quiz');
  });

  it('displays the quiz title on the start screen', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Sample Quiz');
  });

  // ─── startQuiz ────────────────────────────────────────────────────────────

  it('startQuiz sets started signal to true', () => {
    vi.spyOn(store, 'startQuiz').mockImplementation(() => undefined);
    component.startQuiz();
    expect(component.started()).toBe(true);
  });

  it('startQuiz calls store.startQuiz with current quizId', () => {
    const spy = vi.spyOn(store, 'startQuiz').mockImplementation(() => undefined);
    component.startQuiz();
    expect(spy).toHaveBeenCalledWith('quiz-1');
  });

  it('startQuiz closes palette and submit modal', () => {
    component.paletteOpen.set(true);
    component.showSubmitModal.set(true);
    vi.spyOn(store, 'startQuiz').mockImplementation(() => undefined);
    component.startQuiz();
    expect(component.paletteOpen()).toBe(false);
    expect(component.showSubmitModal()).toBe(false);
  });

  // ─── currentQuestion computed ────────────────────────────────────────────

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

  // ─── selectOption ─────────────────────────────────────────────────────────

  it('selectOption updates selectedOptionId signal', () => {
    component.startQuiz();
    component.selectOption('q1-o2');
    expect(component.selectedOptionId()).toBe('q1-o2');
  });

  it('selectOption calls store.answerQuestion', () => {
    const spy = vi.spyOn(store, 'answerQuestion');
    patchState(store, { startedAt: new Date() });
    component.started.set(true);
    fixture.detectChanges();
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
    const cls = component.getPaletteClass(0);
    expect(cls).toContain('answered');
  });

  it('getPaletteClass includes "unanswered" when question is not answered', () => {
    patchState(store, { answers: {} });
    const cls = component.getPaletteClass(0);
    expect(cls).toContain('unanswered');
  });

  it('getPaletteClass includes "flagged" when question is flagged', () => {
    patchState(store, { flaggedQuestions: new Set(['q1']) });
    const cls = component.getPaletteClass(0);
    expect(cls).toContain('flagged');
  });

  it('getPaletteClass includes "current" for the active question index', () => {
    patchState(store, { currentQuestionIndex: 0 });
    const cls = component.getPaletteClass(0);
    expect(cls).toContain('current');
  });

  // ─── progressPercentage ───────────────────────────────────────────────────

  it('progressPercentage is > 0 when not on first question', () => {
    patchState(store, { currentQuestionIndex: 1 });
    expect(component.progressPercentage()).toBeGreaterThan(0);
  });

  // ─── retryQuiz ────────────────────────────────────────────────────────────

  it('retryQuiz resets started signal to false', () => {
    vi.spyOn(store, 'resetQuiz').mockImplementation(() => undefined);
    vi.spyOn(store, 'loadQuizById').mockImplementation(() => undefined);
    component.started.set(true);
    component.retryQuiz();
    expect(component.started()).toBe(false);
  });
});
