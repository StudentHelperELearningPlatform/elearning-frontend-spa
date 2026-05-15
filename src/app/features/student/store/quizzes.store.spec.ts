import { TestBed } from '@angular/core/testing';
import { patchStore } from '../../../../test-utils/patch-store';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { QuizzesStore } from './quizzes.store';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

const MOCK_QUIZ_API = {
  id: 'quiz-1',
  title: 'Sample Quiz',
  subject: 'Mathematics',
  timeLimitSeconds: 900,
  questions: [
    { id: 'q1', type: 'MULTIPLE_CHOICE' as const, text: 'Q1', options: ['A', 'B'], points: 10 },
    { id: 'q2', type: 'TRUE_FALSE' as const, text: 'Q2', options: ['True', 'False'], points: 10 },
    { id: 'q3', type: 'SHORT_ANSWER' as const, text: 'Q3', points: 10 },
    { id: 'q4', type: 'TRUE_FALSE' as const, text: 'Q4', points: 10 }, // Test missing options array fallback
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
      currentQuiz: null,
      currentQuestionIndex: 0,
      answers: {},
      flaggedQuestions: new Set<string>(),
      startedAt: null,
      timeRemaining: null,
      submitted: false,
      result: null,
      loading: false,
    });
  });

  afterEach(() => vi.restoreAllMocks());

  describe('fetchQuiz and mappings', () => {
    it('loadQuizById fetches quiz, maps questions properly, and sets loading false', () => {
      vi.spyOn(httpClient, 'get').mockReturnValue(of(MOCK_QUIZ_API));
      store.loadQuizById('quiz-1');

      expect(store.loading()).toBe(false);
      expect(store.currentQuiz()?.id).toBe('quiz-1');
      expect(store.startedAt()).toBeNull();

      // Test mapQuestionOptions explicitly
      const questions = store.currentQuiz()?.questions;
      expect(questions?.[0].options?.length).toBe(2); // MULTIPLE_CHOICE
      expect(questions?.[1].options?.length).toBe(2); // TRUE_FALSE with explicit
      expect(questions?.[2].options?.length).toBe(0); // SHORT_ANSWER
      expect(questions?.[3].options?.length).toBe(2); // TRUE_FALSE fallback to ['True', 'False']
    });

    it('startQuiz sets startedAt and timeRemaining', () => {
      vi.spyOn(httpClient, 'get').mockReturnValue(of(MOCK_QUIZ_API));
      store.startQuiz('quiz-1');
      expect(store.startedAt()).toBeInstanceOf(Date);
      expect(store.timeRemaining()).toBe(900);
    });

    it('sets error on fetch failure', () => {
      vi.spyOn(httpClient, 'get').mockReturnValue(throwError(() => new Error('Network Error')));
      store.loadQuizById('quiz-1');
      expect(store.loading()).toBe(false);
      expect(store.error()).toBe('Network Error');
    });
  });

  describe('Quiz State & Actions', () => {
    beforeEach(() => {
      vi.spyOn(httpClient, 'get').mockReturnValue(of(MOCK_QUIZ_API));
      store.loadQuizById('quiz-1');
    });

    it('answerQuestion stores answer and updates computed counts', () => {
      store.answerQuestion('q1', 'A');
      expect(store.answers()['q1']).toBe('A');
      expect(store.answeredCount()).toBe(1);
      expect(store.canSubmit()).toBe(true);
      expect(store.currentAnswerSelected()).toBe('A'); // Because q1 is index 0
    });

    it('flagQuestion toggles flag properly', () => {
      store.flagQuestion('q1');
      expect(store.flaggedQuestions().has('q1')).toBe(true);
      expect(store.isFlagged('q1')()).toBe(true);

      store.flagQuestion('q1');
      expect(store.flaggedQuestions().has('q1')).toBe(false);
      expect(store.flaggedCount()).toBe(0);
    });

    it('navigation bounded correctly', () => {
      store.nextQuestion();
      expect(store.currentQuestionIndex()).toBe(1);

      store.navigateTo(100);
      expect(store.currentQuestionIndex()).toBe(3); // bounded to total-1

      store.prevQuestion();
      expect(store.currentQuestionIndex()).toBe(2);

      store.previousQuestion(); // alias test
      expect(store.currentQuestionIndex()).toBe(1);

      store.navigateTo(-5);
      expect(store.currentQuestionIndex()).toBe(0);
    });

    it('returns null for currentQuestion if quiz is not loaded', () => {
      patchStore(store, { currentQuiz: null });
      expect(store.currentQuestion()).toBeNull();
      expect(store.currentAnswerSelected()).toBeNull();
    });
  });

  describe('submitQuizInternal and tickTimer', () => {
    beforeEach(() => {
      vi.spyOn(httpClient, 'get').mockReturnValue(of(MOCK_QUIZ_API));
      store.startQuiz('quiz-1');
      patchStore(store, { startedAt: new Date(Date.now() - 60000) }); // 60s ago
    });

    it('submitQuiz posts data and maps success response', () => {
      const postSpy = vi.spyOn(httpClient, 'post').mockReturnValue(
        of({
          attemptId: 'att-1',
          score: 40,
          totalPoints: 40,
          percentage: 100,
          passed: true,
        }),
      );

      store.submitQuiz();

      expect(store.submitted()).toBe(true);
      expect(store.showResults()).toBe(true);
      expect(store.score()).toBe(40);
      expect(store.totalPoints()).toBe(40);
      expect(postSpy).toHaveBeenCalled();
    });

    it('submitQuiz provides fallback on post error', () => {
      vi.spyOn(httpClient, 'post').mockReturnValue(throwError(() => new Error('Post Fail')));
      store.submitQuiz();

      expect(store.submitted()).toBe(true);
      expect(store.result()?.score).toBe(0);
      expect(store.result()?.passed).toBe(false);
      expect(store.timeSpent()).toBeGreaterThanOrEqual(59);
    });

    it('submitQuiz does nothing if already submitted or no quizId', () => {
      patchStore(store, { submitted: true });
      const postSpy = vi.spyOn(httpClient, 'post');
      store.submitQuiz();
      expect(postSpy).not.toHaveBeenCalled();

      patchStore(store, { submitted: false, currentQuiz: null });
      store.submitQuiz();
      expect(postSpy).not.toHaveBeenCalled();
    });

    it('tickTimer decrements timeRemaining and auto-submits on 0', () => {
      patchStore(store, { timeRemaining: 2 });
      const submitSpy = vi.spyOn(store, 'submitQuiz');

      store.tickTimer();
      expect(store.timeRemaining()).toBe(1);

      store.tickTimer();
      expect(store.timeRemaining()).toBe(0);
      expect(submitSpy).toHaveBeenCalled();
    });

    it('tickTimer handles instant expiration', () => {
      patchStore(store, { timeRemaining: 0 });
      const submitSpy = vi.spyOn(store, 'submitQuiz');
      store.tickTimer();
      expect(submitSpy).toHaveBeenCalled();
    });
  });

  describe('resetQuiz & loadResultDetail', () => {
    it('resetQuiz resets to initial interaction state', () => {
      patchStore(store, { submitted: true, answers: { q1: 'A' }, timeRemaining: 0 });
      store.resetQuiz();
      expect(store.submitted()).toBe(false);
      expect(store.answers()).toEqual({});
    });

    it('loadResultDetail fetches detailed breakdown', () => {
      vi.spyOn(httpClient, 'get').mockReturnValue(of({ attemptId: 'att-1', score: 100 }));
      store.loadResultDetail('quiz-1', 'att-1');

      expect(store.resultDetailLoading()).toBe(false);
      expect(store.resultDetail()?.attemptId).toBe('att-1');
      expect(store.resultDetailError()).toBeNull();
    });

    it('loadResultDetail populates error on failure', () => {
      vi.spyOn(httpClient, 'get').mockReturnValue(throwError(() => new Error('Failed')));
      store.loadResultDetail('quiz-1', 'att-1');

      expect(store.resultDetailLoading()).toBe(false);
      expect(store.resultDetail()).toBeNull();
      expect(store.resultDetailError()).toBe('Unable to load quiz results.');
    });

    it('clearResultDetail wipes result detail state', () => {
      patchStore(store, {
        resultDetail: {
          attemptId: 'x',
          quizId: 'q',
          quizTitle: 't',
          subject: 's',
          lessonId: null,
          nextLessonId: null,
          score: 0,
          totalPoints: 0,
          percentage: 0,
          passed: false,
          timeSpent: 0,
          questionBreakdown: [],
        },
        resultDetailError: 'err',
      });
      store.clearResultDetail();
      expect(store.resultDetail()).toBeNull();
      expect(store.resultDetailError()).toBeNull();
    });
  });
});
