import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { QuizzesStore } from './quizzes.store';
import { provideApiMocks } from '../../../../test-utils/api-testing';
import { patchStore } from '../../../../test-utils/patch-store';

interface MockQuizResponse {
  id: string;
  title: string;
  subject: string;
  timeLimitSeconds: number;
  questions: {
    id: string;
    type: string;
    text: string;
    options: string[];
    points: number;
  }[];
}

const MOCK_QUIZ: MockQuizResponse = {
  id: 'q1',
  title: 'Basic Math',
  subject: 'Math',
  timeLimitSeconds: 600,
  questions: [
    {
      id: 'q1-q1',
      type: 'MULTIPLE_CHOICE',
      text: 'What is 1+1?',
      options: ['1', '2', '3'],
      points: 10
    },
    {
      id: 'q1-q2',
      type: 'TRUE_FALSE',
      text: 'Is the earth round?',
      options: ['True', 'False'],
      points: 5
    }
  ]
};

const MOCK_API_QUIZ = {
  id: 'q1',
  questions: [
    { id: 'q1-q1', questionType: 'MULTIPLE_CHOICE', questionText: 'What is 1+1?', options: [{ id: 'a', text: '2', isCorrect: true }], orderIndex: 0 },
    { id: 'q1-q2', questionType: 'TRUE_FALSE', questionText: 'Earth is round?', options: [], orderIndex: 1 },
    { id: 'q1-q3', questionType: 'SHORT_ANSWER', questionText: 'Explain gravity', options: [], orderIndex: 2 },
  ],
};

describe('QuizzesStore', () => {
  const getStore = () => TestBed.inject(QuizzesStore);
  let store: ReturnType<typeof getStore>;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        ...provideApiMocks(),
      ],
    });

    store = getStore();
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ── Initial state ──────────────────────────────────────────────────────────

  it('starts with default state', () => {
    expect(store.currentQuiz()).toBeNull();
    expect(store.currentQuestionIndex()).toBe(0);
    expect(store.answers()).toEqual({});
    expect(store.submitted()).toBe(false);
  });

  // ── loadQuizById ───────────────────────────────────────────────────────────

  it('loadQuizById fetches and sets quiz', () => {
    const spy = vi.spyOn(http, 'get').mockReturnValue(of(MOCK_QUIZ));
    store.loadQuizById('q1');

    expect(spy).toHaveBeenCalledWith('/api/v1/lessons/q1/final-quiz');
    expect(store.currentQuiz()?.id).toBe('q1');
    expect(store.loading()).toBe(false);
  });

  // ── loadQuiz (develop method) ──────────────────────────────────────────────

  it('loadQuiz fetches from /quizzes/:id and sets quiz', () => {
    const spy = vi.spyOn(http, 'get').mockReturnValue(of(MOCK_QUIZ));
    store.loadQuiz('q1');

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('/quizzes/q1'));
    expect(store.loading()).toBe(false);
  });

  it('loadQuiz sets error on failure', () => {
    vi.spyOn(http, 'get').mockReturnValue(throwError(() => ({ message: 'Not found' })));
    store.loadQuiz('q1');

    expect(store.loading()).toBe(false);
    expect(store.error()).toBe('Not found');
  });

  // ── loadFinalQuiz ──────────────────────────────────────────────────────────

  it('loadFinalQuiz fetches and maps final quiz', () => {
    vi.spyOn(http, 'get').mockReturnValue(of(MOCK_API_QUIZ));
    store.loadFinalQuiz('lesson-1');

    expect(store.currentQuiz()?.id).toBe('q1');
    expect(store.loading()).toBe(false);
    expect(store.submitted()).toBe(false);
  });

  it('loadFinalQuiz sets error on failure', () => {
    vi.spyOn(http, 'get').mockReturnValue(throwError(() => ({ message: 'Server error' })));
    store.loadFinalQuiz('lesson-1');

    expect(store.loading()).toBe(false);
    expect(store.error()).toBe('Server error');
  });

  // ── startQuiz ─────────────────────────────────────────────────────────────

  it('startQuiz sets startedAt and resets answers', () => {
    vi.spyOn(http, 'get').mockReturnValue(of(MOCK_API_QUIZ));
    store.startQuiz('lesson-1');

    expect(store.startedAt()).not.toBeNull();
    expect(store.answers()).toEqual({});
    expect(store.submitted()).toBe(false);
  });

  // ── answerQuestion & setAnswer ─────────────────────────────────────────────

  it('answerQuestion updates answers state', () => {
    store.answerQuestion('q1-q1', '2');
    expect(store.answers()['q1-q1']).toBe('2');
    expect(store.answeredCount()).toBe(1);
  });

  it('setAnswer updates answers state with string', () => {
    store.setAnswer('q1-q1', '2');
    expect(store.answers()['q1-q1']).toBe('2');
  });

  it('setAnswer picks first element when given array', () => {
    store.setAnswer('q1-q1', ['first', 'second']);
    expect(store.answers()['q1-q1']).toBe('first');
  });

  // ── flagQuestion ───────────────────────────────────────────────────────────

  it('flagQuestion toggles flag', () => {
    store.flagQuestion('q1-q1');
    expect(store.isFlagged('q1-q1')).toBe(true);
    expect(store.flaggedCount()).toBe(1);

    store.flagQuestion('q1-q1');
    expect(store.isFlagged('q1-q1')).toBe(false);
    expect(store.flaggedCount()).toBe(0);
  });

  // ── navigation ─────────────────────────────────────────────────────────────

  it('navigateTo updates index safely', () => {
    patchStore(store, {
      currentQuiz: {
        ...MOCK_QUIZ,
        questions: [
          { id: 'q1', text: 'Q1', type: 'MULTIPLE_CHOICE', options: [], points: 0 },
          { id: 'q2', text: 'Q2', type: 'MULTIPLE_CHOICE', options: [], points: 0 },
          { id: 'q3', text: 'Q3', type: 'MULTIPLE_CHOICE', options: [], points: 0 }
        ]
      } as unknown as MockQuizResponse
    });

    store.navigateTo(2);
    expect(store.currentQuestionIndex()).toBe(2);

    store.navigateTo(5);
    expect(store.currentQuestionIndex()).toBe(2);

    store.navigateTo(-1);
    expect(store.currentQuestionIndex()).toBe(0);
  });

  it('nextQuestion increments index', () => {
    patchStore(store, {
      currentQuiz: { ...MOCK_QUIZ },
      currentQuestionIndex: 0,
    });
    store.nextQuestion();
    expect(store.currentQuestionIndex()).toBe(1);
  });

  it('prevQuestion decrements index', () => {
    patchStore(store, {
      currentQuiz: { ...MOCK_QUIZ },
      currentQuestionIndex: 1,
    });
    store.prevQuestion();
    expect(store.currentQuestionIndex()).toBe(0);
  });

  // ── computed signals ───────────────────────────────────────────────────────

  it('progress calculated correctly', () => {
    patchStore(store, {
      currentQuiz: MOCK_QUIZ,
      answers: { 'q1-q1': '2' }
    });
    expect(store.progress()).toBe(50);
  });

  it('isLastQuestion is true on last question', () => {
    patchStore(store, {
      currentQuiz: MOCK_QUIZ,
      currentQuestionIndex: 1,
    });
    expect(store.isLastQuestion()).toBe(true);
  });

  it('canSubmit is true when answers exist', () => {
    store.answerQuestion('q1-q1', '2');
    expect(store.canSubmit()).toBe(true);
  });

  it('showResults is false when result is null', () => {
    expect(store.showResults()).toBe(false);
  });

  it('currentAnswerSelected returns null when no quiz', () => {
    expect(store.currentAnswerSelected()).toBeNull();
  });

  it('isAnswered returns false for unanswered question', () => {
    expect(store.isAnswered('q-never')).toBe(false);
  });

  it('isAnswered returns true for answered question', () => {
    store.answerQuestion('q-yes', 'answer');
    expect(store.isAnswered('q-yes')).toBe(true);
  });

  // ── submitQuiz ─────────────────────────────────────────────────────────────

  it('submitQuiz calls API and updates result', () => {
    patchStore(store, {
      currentQuiz: MOCK_QUIZ,
      answers: { 'q1-q1': '2', 'q1-q2': 'true' }
    });

    const mockResponse = {
      attemptId: 'att-1',
      score: 15,
      totalPoints: 15,
      percentage: 100,
      passed: true
    };

    const spy = vi.spyOn(http, 'post').mockReturnValue(of(mockResponse));
    store.submitQuiz();

    expect(spy).toHaveBeenCalledWith('/api/v1/lessons/q1/final-quiz/submit', {
      answers: { 'q1-q1': '2', 'q1-q2': 'true' }
    });
    expect(store.submitted()).toBe(true);
    expect(store.result()?.score).toBe(15);
  });

  it('submitQuiz does nothing if already submitted', () => {
    patchStore(store, { submitted: true, currentQuiz: MOCK_QUIZ });
    const spy = vi.spyOn(http, 'post').mockReturnValue(of({}));
    store.submitQuiz();
    expect(spy).not.toHaveBeenCalled();
  });

  it('submitQuiz does nothing if no quiz loaded', () => {
    const spy = vi.spyOn(http, 'post').mockReturnValue(of({}));
    store.submitQuiz();
    expect(spy).not.toHaveBeenCalled();
  });

  // ── tickTimer ──────────────────────────────────────────────────────────────

  it('tickTimer decrements time remaining', () => {
    patchStore(store, { timeRemaining: 100 });
    store.tickTimer();
    expect(store.timeRemaining()).toBe(99);
  });

  it('tickTimer does nothing when timeRemaining is null', () => {
    patchStore(store, { timeRemaining: null });
    store.tickTimer();
    expect(store.timeRemaining()).toBeNull();
  });

  it('tickTimer submits when time reaches zero', () => {
    patchStore(store, {
      currentQuiz: MOCK_QUIZ,
      timeRemaining: 1,
      submitted: false
    });

    const spy = vi.spyOn(http, 'post').mockReturnValue(of({}));
    store.tickTimer();

    expect(store.timeRemaining()).toBe(0);
    expect(spy).toHaveBeenCalled();
  });

  // ── submitFinalQuiz ────────────────────────────────────────────────────────

  it('submitFinalQuiz calls POST /api/v1/lessons/:id/final-quiz/submit', () => {
    patchStore(store, {
      currentQuiz: MOCK_QUIZ,
      answers: { 'q1-q1': '2', 'q1-q2': 'true' },
    });

    const mockResponse = {
      attemptId: 'att-final-1',
      score: 15,
      totalPoints: 15,
      percentage: 100,
      passed: true,
    };

    const spy = vi.spyOn(http, 'post').mockReturnValue(of(mockResponse));

    store.submitFinalQuiz('lesson-99');

    expect(spy).toHaveBeenCalledWith(
      '/api/v1/lessons/lesson-99/final-quiz/submit',
      { answers: { 'q1-q1': '2', 'q1-q2': 'true' } }
    );
    expect(store.submitted()).toBe(true);
    expect(store.result()?.score).toBe(15);
    expect(store.result()?.attemptId).toBe('att-final-1');
  });

  it('submitFinalQuiz is idempotent when already submitted', () => {
    patchStore(store, { currentQuiz: MOCK_QUIZ, submitted: true });
    const spy = vi.spyOn(http, 'post').mockReturnValue(of({}));
    store.submitFinalQuiz('lesson-99');
    expect(spy).not.toHaveBeenCalled();
  });

  // ── loadResultDetail ───────────────────────────────────────────────────────

  it('loadResultDetail fetches and stores result detail', () => {
    const mockDetail = { questions: [], score: 90 };
    vi.spyOn(http, 'get').mockReturnValue(of(mockDetail));

    store.loadResultDetail('q1', 'att-1');

    expect(store.resultDetail()).toEqual(mockDetail);
    expect(store.resultDetailLoading()).toBe(false);
  });

  it('loadResultDetail sets error on failure', () => {
    vi.spyOn(http, 'get').mockReturnValue(throwError(() => new Error('fail')));
    store.loadResultDetail('q1', 'att-1');

    expect(store.resultDetailLoading()).toBe(false);
    expect(store.resultDetailError()).toBe('Failed to load result detail');
  });

  // ── clearResultDetail ──────────────────────────────────────────────────────

  it('clearResultDetail resets resultDetail state', () => {
    patchStore(store, { resultDetail: { questions: [] } as unknown as import('@shared/models/quiz.types').QuizResultDetail, resultDetailError: 'some error' });
    store.clearResultDetail();

    expect(store.resultDetail()).toBeNull();
    expect(store.resultDetailError()).toBeNull();
    expect(store.resultDetailLoading()).toBe(false);
  });

  // ── resetQuiz ──────────────────────────────────────────────────────────────

  it('resetQuiz clears answers and submission state', () => {
    patchStore(store, {
      answers: { 'q1': 'a' },
      submitted: true,
      result: { score: 10 } as unknown as import('@shared/models/quiz.types').QuizResult,
      currentQuestionIndex: 2,
    });

    store.resetQuiz();

    expect(store.answers()).toEqual({});
    expect(store.submitted()).toBe(false);
    expect(store.result()).toBeNull();
    expect(store.currentQuestionIndex()).toBe(0);
  });
});