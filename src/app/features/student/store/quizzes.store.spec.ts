import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
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

  it('starts with default state', () => {
    expect(store.currentQuiz()).toBeNull();
    expect(store.currentQuestionIndex()).toBe(0);
    expect(store.answers()).toEqual({});
    expect(store.submitted()).toBe(false);
  });

  it('loadQuizById fetches and sets quiz', () => {
    const spy = vi.spyOn(http, 'get').mockReturnValue(of(MOCK_QUIZ));
    store.loadQuizById('q1');
    
    expect(spy).toHaveBeenCalledWith('/api/v1/lessons/q1/final-quiz');
    expect(store.currentQuiz()?.id).toBe('q1');
    expect(store.loading()).toBe(false);
  });

  it('answerQuestion updates answers state', () => {
    store.answerQuestion('q1-q1', '2');
    expect(store.answers()['q1-q1']).toBe('2');
    expect(store.answeredCount()).toBe(1);
  });

  it('flagQuestion toggles flag', () => {
    store.flagQuestion('q1-q1');
    expect(store.isFlagged('q1-q1')).toBe(true);
    expect(store.flaggedCount()).toBe(1);
    
    store.flagQuestion('q1-q1');
    expect(store.isFlagged('q1-q1')).toBe(false);
    expect(store.flaggedCount()).toBe(0);
  });

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
    
    store.navigateTo(5); // out of bounds
    expect(store.currentQuestionIndex()).toBe(2);
    
    store.navigateTo(-1); // out of bounds
    expect(store.currentQuestionIndex()).toBe(0);
  });

  it('progress calculated correctly', () => {
    patchStore(store, { 
      currentQuiz: MOCK_QUIZ,
      answers: { 'q1-q1': '2' }
    });
    
    expect(store.progress()).toBe(50); // 1 out of 2
  });

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

  it('tickTimer decrements time remaining', () => {
    patchStore(store, { timeRemaining: 100 });
    store.tickTimer();
    expect(store.timeRemaining()).toBe(99);
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

  // ─── S6-final-quiz-ui ─────────────────────────────────────────────────────
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
});