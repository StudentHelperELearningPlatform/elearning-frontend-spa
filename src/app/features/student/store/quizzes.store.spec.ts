import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { patchState } from '@ngrx/signals';
import { of } from 'rxjs';
import { QuizzesStore } from './quizzes.store';

describe('QuizzesStore', () => {
  const getStore = () => TestBed.inject(QuizzesStore);

  let store: ReturnType<typeof getStore>;
  let httpClient: HttpClient;
  let router: Router;

  const mockQuiz = {
    id: 'quiz-1',
    title: 'Sample Quiz',
    subject: 'Mathematics',
    timeLimit: 900,
    timeLimitSeconds: 900,
    questions: [
      {
        id: 'q1',
        type: 'MULTIPLE_CHOICE',
        text: 'Question 1',
        points: 10,
        options: [
          { id: 'q1-o1', text: 'Option 1' },
          { id: 'q1-o2', text: 'Option 2' },
          { id: 'q1-o3', text: 'Option 3' },
          { id: 'q1-o4', text: 'Option 4' },
        ],
      },
      {
        id: 'q2',
        type: 'TRUE_FALSE',
        text: 'Question 2',
        points: 10,
        options: [
          { id: 'true', text: 'True' },
          { id: 'false', text: 'False' },
        ],
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
    });

    store = getStore();
    httpClient = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);

    patchState(store, {
      currentQuiz: mockQuiz,
      currentQuestionIndex: 0,
      answers: {},
      flaggedQuestions: new Set<string>(),
      startedAt: new Date(Date.now() - 10_000),
      timeRemaining: 900,
      submitted: false,
      result: null,
      loading: false,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('answerQuestion updates answers map correctly', () => {
    store.answerQuestion('q1', 'q1-o2');

    expect(store.answers()).toEqual({ q1: 'q1-o2' });
  });

  it('flagQuestion adds then removes questionId', () => {
    store.flagQuestion('q1');
    expect(store.flaggedQuestions().has('q1')).toBe(true);

    store.flagQuestion('q1');
    expect(store.flaggedQuestions().has('q1')).toBe(false);
  });

  it('navigateTo updates currentQuestionIndex', () => {
    store.navigateTo(1);

    expect(store.currentQuestionIndex()).toBe(1);
  });

  it('submitQuiz calls HttpClient.post and router.navigate', () => {
    patchState(store, {
      answers: { q1: 'q1-o1' },
    });

    const postSpy = vi.spyOn(httpClient, 'post').mockReturnValue(
      of({
        attemptId: 'attempt-1',
        score: 80,
        totalPoints: 100,
        percentage: 80,
        passed: true,
        timeSpent: 450,
      }),
    );
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    store.submitQuiz();

    expect(postSpy).toHaveBeenCalledWith('/api/quizzes/quiz-1/submit', {
      answers: { q1: 'q1-o1' },
    });
    expect(navigateSpy).toHaveBeenCalledWith([
      '/student/quizzes',
      'quiz-1',
      'results',
      'attempt-1',
    ]);
  });

  it('tickTimer decrements timeRemaining by 1', () => {
    patchState(store, { timeRemaining: 3, submitted: false });

    store.tickTimer();

    expect(store.timeRemaining()).toBe(2);
  });

  it('tickTimer calls submitQuiz when timer reaches 0', () => {
    patchState(store, { timeRemaining: 1, submitted: false });
    const submitSpy = vi.spyOn(store, 'submitQuiz').mockImplementation(() => undefined);

    store.tickTimer();

    expect(store.timeRemaining()).toBe(0);
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });

  it('answeredCount returns number of answers', () => {
    store.answerQuestion('q1', 'q1-o1');
    store.answerQuestion('q2', 'true');

    expect(store.answeredCount()).toBe(2);
  });

  it('flaggedCount tracks flags after toggles', () => {
    store.flagQuestion('q1');
    store.flagQuestion('q2');
    store.flagQuestion('q2');

    expect(store.flaggedCount()).toBe(1);
  });

  it('canSubmit is false without answers and true with answers', () => {
    expect(store.canSubmit()).toBe(false);

    store.answerQuestion('q1', 'q1-o1');
    expect(store.canSubmit()).toBe(true);
  });

  it('isAnswered and isFlagged return correct state per questionId', () => {
    store.answerQuestion('q1', 'q1-o3');
    store.flagQuestion('q2');

    expect(store.isAnswered('q1')()).toBe(true);
    expect(store.isAnswered('q2')()).toBe(false);
    expect(store.isFlagged('q2')()).toBe(true);
    expect(store.isFlagged('q1')()).toBe(false);
  });
});
