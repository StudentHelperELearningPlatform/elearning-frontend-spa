import { TestBed } from '@angular/core/testing';
import { patchStore } from '../../../../test-utils/patch-store';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { QuizzesStore } from './quizzes.store';

const MOCK_QUIZ_API = {
  id: 'quiz-1',
  title: 'Sample Quiz',
  subject: 'Mathematics',
  timeLimitSeconds: 900,
  questions: [
    { id: 'q1', type: 'MULTIPLE_CHOICE' as const, text: 'Q1', options: ['A', 'B'], points: 10 },
    { id: 'q2', type: 'TRUE_FALSE' as const, text: 'Q2', options: ['True', 'False'], points: 10 },
    { id: 'q3', type: 'SHORT_ANSWER' as const, text: 'Q3', points: 10 },
  ],
};

describe('QuizzesStore', () => {
  let store: InstanceType<typeof QuizzesStore>;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
    });
    store = TestBed.inject(QuizzesStore);
    httpClient = TestBed.inject(HttpClient);

    patchStore(store, {
      currentQuiz: {
        id: 'quiz-1',
        title: 'Sample Quiz',
        subject: 'Mathematics',
        timeLimit: 900,
        timeLimitSeconds: 900,
        questions: [
          {
            id: 'q1',
            type: 'MULTIPLE_CHOICE',
            text: 'Q1',
            points: 10,
            options: [
              { id: 'q1-o1', text: 'A' },
              { id: 'q1-o2', text: 'B' },
            ],
          },
          {
            id: 'q2',
            type: 'TRUE_FALSE',
            text: 'Q2',
            points: 10,
            options: [
              { id: 'true', text: 'True' },
              { id: 'false', text: 'False' },
            ],
          },
          { id: 'q3', type: 'SHORT_ANSWER', text: 'Q3', points: 10, options: [] },
        ],
      },
      currentQuestionIndex: 0,
      answers: {},
      flaggedQuestions: new Set<string>(),
      startedAt: null,
      timeRemaining: 900,
      submitted: false,
      result: null,
      loading: false,
      attempts: [],
      attemptsLoading: false,
    });
  });

  afterEach(() => vi.restoreAllMocks());

  // ─── Initial state ────────────────────────────────────────────────────────

  it('starts with submitted false', () => {
    expect(store.submitted()).toBe(false);
  });

  it('starts with loading false', () => {
    expect(store.loading()).toBe(false);
  });

  // ─── loadQuizById ─────────────────────────────────────────────────────────

  it('loadQuizById sets loading true then false on success', () => {
    vi.spyOn(httpClient, 'get').mockReturnValue(of(MOCK_QUIZ_API));
    store.loadQuizById('quiz-1');
    expect(store.loading()).toBe(false);
    expect(store.currentQuiz()?.id).toBe('quiz-1');
  });

  it('loadQuizById resets answers and submitted', () => {
    patchStore(store, { answers: { q1: 'q1-o1' }, submitted: true });
    vi.spyOn(httpClient, 'get').mockReturnValue(of(MOCK_QUIZ_API));
    store.loadQuizById('quiz-1');
    expect(store.answers()).toEqual({});
    expect(store.submitted()).toBe(false);
  });

  it('loadQuizById sets loading false on error', () => {
    vi.spyOn(httpClient, 'get').mockReturnValue(throwError(() => new Error('fail')));
    store.loadQuizById('quiz-1');
    expect(store.loading()).toBe(false);
  });

  // ─── answerQuestion ───────────────────────────────────────────────────────

  it('answerQuestion stores the answer', () => {
    store.answerQuestion('q1', 'q1-o1');
    expect(store.answers()['q1']).toBe('q1-o1');
  });

  it('answerQuestion preserves existing answers', () => {
    store.answerQuestion('q1', 'q1-o1');
    store.answerQuestion('q2', 'true');
    expect(Object.keys(store.answers()).length).toBe(2);
  });

  // ─── flagQuestion ─────────────────────────────────────────────────────────

  it('flagQuestion adds a flag', () => {
    store.flagQuestion('q1');
    expect(store.flaggedQuestions().has('q1')).toBe(true);
  });

  it('flagQuestion toggles off when already flagged', () => {
    store.flagQuestion('q1');
    store.flagQuestion('q1');
    expect(store.flaggedQuestions().has('q1')).toBe(false);
  });

  // ─── navigation ───────────────────────────────────────────────────────────

  it('nextQuestion advances index', () => {
    store.nextQuestion();
    expect(store.currentQuestionIndex()).toBe(1);
  });

  it('nextQuestion does not exceed last question', () => {
    patchStore(store, { currentQuestionIndex: 2 });
    store.nextQuestion();
    expect(store.currentQuestionIndex()).toBe(2);
  });

  it('prevQuestion decrements index', () => {
    patchStore(store, { currentQuestionIndex: 1 });
    store.prevQuestion();
    expect(store.currentQuestionIndex()).toBe(0);
  });

  it('prevQuestion does not go below 0', () => {
    store.prevQuestion();
    expect(store.currentQuestionIndex()).toBe(0);
  });

  it('navigateTo jumps to specified index', () => {
    store.navigateTo(2);
    expect(store.currentQuestionIndex()).toBe(2);
  });

  // ─── submitQuiz ───────────────────────────────────────────────────────────

  it('submitQuiz sets submitted to true immediately', () => {
    vi.spyOn(httpClient, 'post').mockReturnValue(
      of({
        attemptId: 'attempt-1',
        score: 20,
        totalPoints: 30,
        percentage: 67,
        passed: true,
        timeSpent: 120,
      }),
    );
    store.submitQuiz();
    expect(store.submitted()).toBe(true);
  });

  it('submitQuiz calls HttpClient.post with answers', () => {
    patchStore(store, { answers: { q1: 'q1-o1' } });
    const postSpy = vi.spyOn(httpClient, 'post').mockReturnValue(
      of({
        attemptId: 'attempt-1',
        score: 10,
        totalPoints: 30,
        percentage: 33,
        passed: false,
        timeSpent: 60,
      }),
    );
    store.submitQuiz();
    expect(postSpy).toHaveBeenCalledWith('/api/quizzes/quiz-1/submit', {
      answers: { q1: 'q1-o1' },
    });
  });

  it('submitQuiz updates result from HTTP response', async () => {
    vi.spyOn(httpClient, 'post').mockReturnValue(
      of({
        attemptId: 'attempt-1',
        score: 20,
        totalPoints: 30,
        percentage: 67,
        passed: true,
        timeSpent: 120,
      }),
    );
    store.submitQuiz();
    await Promise.resolve();
    expect(store.result()?.score).toBe(20);
    expect(store.result()?.passed).toBe(true);
    expect(store.result()?.attemptId).toBe('attempt-1');
  });

  it('submitQuiz uses fallback result on HTTP error', async () => {
    vi.spyOn(httpClient, 'post').mockReturnValue(throwError(() => new Error('fail')));
    store.submitQuiz();
    await Promise.resolve();
    expect(store.result()?.score).toBe(0);
    expect(store.submitted()).toBe(true);
  });

  it('submitQuiz does nothing if already submitted (double-submit guard)', () => {
    patchStore(store, { submitted: true });
    const postSpy = vi.spyOn(httpClient, 'post');
    store.submitQuiz();
    expect(postSpy).not.toHaveBeenCalled();
  });

  it('submitQuiz does nothing if no quiz loaded', () => {
    patchStore(store, { currentQuiz: null });
    const postSpy = vi.spyOn(httpClient, 'post');
    store.submitQuiz();
    expect(postSpy).not.toHaveBeenCalled();
  });

  // ─── tickTimer ────────────────────────────────────────────────────────────

  it('tickTimer decrements timeRemaining', () => {
    patchStore(store, { timeRemaining: 10 });
    store.tickTimer();
    expect(store.timeRemaining()).toBe(9);
  });

  it('tickTimer calls submitQuiz when time reaches 0', () => {
    const spy = vi.spyOn(store, 'submitQuiz').mockImplementation(() => undefined);
    patchStore(store, { timeRemaining: 1 });
    store.tickTimer();
    expect(spy).toHaveBeenCalled();
  });

  it('tickTimer does not call submitQuiz again if already submitted', () => {
    patchStore(store, { timeRemaining: 0, submitted: true });
    const spy = vi.spyOn(store, 'submitQuiz');
    store.tickTimer();
    expect(spy).not.toHaveBeenCalled();
  });

  // ─── resetQuiz ────────────────────────────────────────────────────────────

  it('resetQuiz clears answers and submitted flag', () => {
    patchStore(store, {
      answers: { q1: 'q1-o1' },
      submitted: true,
      result: { score: 10, totalPoints: 30, timeSpent: 60, percentage: 33 },
    });
    store.resetQuiz();
    expect(store.answers()).toEqual({});
    expect(store.submitted()).toBe(false);
    expect(store.result()).toBeNull();
  });

  // ─── Computed signals ─────────────────────────────────────────────────────

  it('answeredCount reflects number of answers', () => {
    store.answerQuestion('q1', 'q1-o1');
    store.answerQuestion('q2', 'true');
    expect(store.answeredCount()).toBe(2);
  });

  it('canSubmit is false when no answers', () => {
    expect(store.canSubmit()).toBe(false);
  });

  it('canSubmit is true when at least one answer exists', () => {
    store.answerQuestion('q1', 'q1-o1');
    expect(store.canSubmit()).toBe(true);
  });

  it('isLastQuestion is true on the last question', () => {
    patchStore(store, { currentQuestionIndex: 2 });
    expect(store.isLastQuestion()).toBe(true);
  });

  describe('loadAttempts', () => {
    const MOCK_ATTEMPTS = [
      { id: 'a1', quizId: 'quiz-1', quizTitle: 'Test', subject: 'Math',
        dateTaken: '2026-04-01T10:00:00Z', score: 80, totalPoints: 100,
        percentage: 80, passed: true, timeSpent: 300, attemptId: 'a1' },
      { id: 'a2', quizId: 'quiz-2', quizTitle: 'Science', subject: 'Science',
        dateTaken: '2026-04-02T10:00:00Z', score: 50, totalPoints: 100,
        percentage: 50, passed: false, timeSpent: 450, attemptId: 'a2' },
    ];

    it('success populates state', () => {
      vi.spyOn(httpClient, 'get').mockReturnValue(of(MOCK_ATTEMPTS));
      store.loadAttempts();
      expect(store.attemptsLoading()).toBe(false);
      expect(store.attempts().length).toBe(2);
      expect(store.attempts()[0].id).toBe('a1');
    });

    it('error resets loading', () => {
      vi.spyOn(httpClient, 'get').mockReturnValue(throwError(() => new Error('fail')));
      store.loadAttempts();
      expect(store.attemptsLoading()).toBe(false);
      expect(store.attempts().length).toBe(0);
    });

    it('existing state cleared on new call', () => {
      patchStore(store, { attempts: MOCK_ATTEMPTS, attemptsLoading: false });
      vi.spyOn(httpClient, 'get').mockReturnValue(of([]));
      store.loadAttempts();
      expect(store.attempts().length).toBe(0);
    });

    it('loadAttempts does not affect other state', () => {
      vi.spyOn(httpClient, 'get').mockReturnValue(of(MOCK_ATTEMPTS));
      const quizBefore = store.currentQuiz();
      store.loadAttempts();
      expect(store.currentQuiz()).toEqual(quizBefore);
      expect(store.submitted()).toBe(false);
    });
  });
});
