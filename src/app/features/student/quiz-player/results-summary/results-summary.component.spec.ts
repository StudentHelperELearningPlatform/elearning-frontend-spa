import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { patchStore } from '../../../../../test-utils/patch-store';
import { QuizzesStore } from '../../store/quizzes.store';
import { QuizResultDetail } from '@shared/models/quiz.types';
import { ResultsSummaryComponent } from './results-summary.component';
import { provideApiMocks } from '../../../../../test-utils/api-testing';

const MOCK_DETAIL: QuizResultDetail = {
  attemptId: 'attempt-1',
  quizId: 'quiz-1',
  quizTitle: 'Sample Quiz',
  subject: 'Mathematics',
  lessonId: 'lesson-1',
  nextLessonId: 'lesson-2',
  score: 70,
  totalPoints: 100,
  percentage: 70,
  passed: true,
  timeSpent: 245,
  questionBreakdown: [
    {
      questionId: 'q1',
      questionText: 'What is 12 + 8?',
      type: 'MULTIPLE_CHOICE',
      difficulty: 'EASY',
      studentAnswer: '20',
      correctAnswer: '20',
      isCorrect: true,
      timeSpentSeconds: 15,
      aiExplanation: 'Twelve plus eight equals twenty.',
    },
    {
      questionId: 'q2',
      questionText: 'What is 9 squared?',
      type: 'MULTIPLE_CHOICE',
      difficulty: 'MEDIUM',
      studentAnswer: '72',
      correctAnswer: '81',
      isCorrect: false,
      timeSpentSeconds: 65,
      aiExplanation: '9 x 9 = 81.',
    },
    {
      questionId: 'q3',
      questionText: 'Explain why practice helps learning.',
      type: 'SHORT_ANSWER',
      difficulty: 'HARD',
      studentAnswer: 'Repetition strengthens recall.',
      correctAnswer: '(graded by your teacher)',
      isCorrect: true,
      timeSpentSeconds: 95,
      aiExplanation: 'Repeated practice strengthens neural pathways.',
    },
  ],
};

const buildRoute = (id: string | null = 'quiz-1', attemptId: string | null = 'attempt-1') => ({
  snapshot: { paramMap: { get: (key: string) => (key === 'id' ? id : attemptId) } },
});

describe('ResultsSummaryComponent', () => {
  let injector: EnvironmentInjector;
  let store: InstanceType<typeof QuizzesStore>;

  const create = (
    route: ReturnType<typeof buildRoute> = buildRoute(),
  ): ResultsSummaryComponent => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: route },
        ...provideApiMocks(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    injector = TestBed.inject(EnvironmentInjector);
    store = TestBed.inject(QuizzesStore);
    return runInInjectionContext(injector, () => new ResultsSummaryComponent());
  };

  afterEach(() => vi.restoreAllMocks());

  it('reads route params on init and triggers loadResultDetail', () => {
    const comp = create();
    const spy = vi.spyOn(store, 'loadResultDetail').mockImplementation(() => undefined);
    comp.ngOnInit();
    expect(spy).toHaveBeenCalledWith('quiz-1', 'attempt-1');
    expect(comp.quizId()).toBe('quiz-1');
    expect(comp.attemptId()).toBe('attempt-1');
  });

  it('does not call loadResultDetail when route params are missing', () => {
    const comp = create(buildRoute(null, null));
    const spy = vi.spyOn(store, 'loadResultDetail').mockImplementation(() => undefined);
    comp.ngOnInit();
    expect(spy).not.toHaveBeenCalled();
  });

  it('passed() returns true when percentage >= 60', () => {
    const comp = create();
    patchStore(store, { resultDetail: { ...MOCK_DETAIL, percentage: 60, passed: true } });
    expect(comp.passed()).toBe(true);
  });

  it('passed() returns false when percentage < 60', () => {
    const comp = create();
    patchStore(store, {
      resultDetail: { ...MOCK_DETAIL, percentage: 55, passed: false, score: 55 },
    });
    expect(comp.passed()).toBe(false);
  });

  it('isPassing returns true at exactly 60', () => {
    expect(create().isPassing(60)).toBe(true);
  });

  it('isPassing returns false at 59', () => {
    expect(create().isPassing(59)).toBe(false);
  });

  it('confetti pieces are produced only when passed is true', () => {
    const comp = create();
    patchStore(store, { resultDetail: { ...MOCK_DETAIL, passed: false } });
    expect(comp.confettiPieces().length).toBe(0);
    patchStore(store, { resultDetail: { ...MOCK_DETAIL, passed: true } });
    expect(comp.confettiPieces().length).toBeGreaterThan(0);
  });

  it('expandAll sets every question id as expanded', () => {
    const comp = create();
    patchStore(store, { resultDetail: MOCK_DETAIL });
    comp.expandAll();
    const expanded = Array.from(comp.expandedQuestions());
    expect(expanded).toEqual(['q1', 'q2', 'q3']);
    expect(comp.isExpanded('q1')).toBe(true);
    expect(comp.isExpanded('q2')).toBe(true);
    expect(comp.isExpanded('q3')).toBe(true);
  });

  it('collapseAll empties expanded sets', () => {
    const comp = create();
    patchStore(store, { resultDetail: MOCK_DETAIL });
    comp.expandAll();
    comp.collapseAll();
    expect(comp.expandedQuestions().size).toBe(0);
    expect(comp.expandedExplanations().size).toBe(0);
  });

  it('toggleQuestion toggles a single question', () => {
    const comp = create();
    expect(comp.isExpanded('q1')).toBe(false);
    comp.toggleQuestion('q1');
    expect(comp.isExpanded('q1')).toBe(true);
    comp.toggleQuestion('q1');
    expect(comp.isExpanded('q1')).toBe(false);
  });

  it('formatTime formats seconds as mm:ss', () => {
    const comp = create();
    expect(comp.formatTime(0)).toBe('00:00');
    expect(comp.formatTime(45)).toBe('00:45');
    expect(comp.formatTime(60)).toBe('01:00');
    expect(comp.formatTime(125)).toBe('02:05');
  });

  it('scoreLabel reflects detail score / totalPoints', () => {
    const comp = create();
    patchStore(store, { resultDetail: MOCK_DETAIL });
    expect(comp.scoreLabel()).toBe('70/100');
  });

  it('barRows produces one row per breakdown question with widthPercent', () => {
    const comp = create();
    patchStore(store, { resultDetail: MOCK_DETAIL });
    const rows = comp.barRows();
    expect(rows.length).toBe(3);
    expect(rows[0].label).toBe('Q1');
    expect(rows[2].seconds).toBe(95);
    expect(rows.every((r) => r.widthPercent >= 4 && r.widthPercent <= 100)).toBe(true);
  });

  it('donutSlices builds one slice per present difficulty', () => {
    const comp = create();
    patchStore(store, { resultDetail: MOCK_DETAIL });
    const slices = comp.donutSlices();
    expect(slices.map((s) => s.difficulty)).toEqual(['EASY', 'MEDIUM', 'HARD']);
    const easy = slices.find((s) => s.difficulty === 'EASY');
    expect(easy?.correct).toBe(1);
    expect(easy?.total).toBe(1);
    expect(easy?.accuracy).toBe(100);
  });

  it('hasNextLesson is true when nextLessonId is set', () => {
    const comp = create();
    patchStore(store, { resultDetail: MOCK_DETAIL });
    expect(comp.hasNextLesson()).toBe(true);
  });

  it('hasNextLesson is false when nextLessonId is null', () => {
    const comp = create();
    patchStore(store, { resultDetail: { ...MOCK_DETAIL, nextLessonId: null } });
    expect(comp.hasNextLesson()).toBe(false);
  });

  it('retryQuiz resets store and navigates back to the quiz route', () => {
    const comp = create();
    comp.ngOnInit();
    const router = TestBed.inject(Router);
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const resetSpy = vi.spyOn(store, 'resetQuiz').mockImplementation(() => undefined);
    const clearSpy = vi.spyOn(store, 'clearResultDetail').mockImplementation(() => undefined);
    comp.retryQuiz();
    expect(resetSpy).toHaveBeenCalled();
    expect(clearSpy).toHaveBeenCalled();
    expect(navSpy).toHaveBeenCalledWith(['/student/quizzes', 'quiz-1']);
  });

  it('backToLesson navigates to the mapped lesson when present', () => {
    const comp = create();
    patchStore(store, { resultDetail: MOCK_DETAIL });
    const router = TestBed.inject(Router);
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    comp.backToLesson();
    expect(navSpy).toHaveBeenCalledWith(['/student/lesson-viewer', 'lesson-1']);
  });

  it('backToLesson falls back to lessons list when lessonId missing', () => {
    const comp = create();
    patchStore(store, { resultDetail: { ...MOCK_DETAIL, lessonId: null } });
    const router = TestBed.inject(Router);
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    comp.backToLesson();
    expect(navSpy).toHaveBeenCalledWith(['/student/lessons']);
  });

  it('nextLesson does nothing when nextLessonId missing', () => {
    const comp = create();
    patchStore(store, { resultDetail: { ...MOCK_DETAIL, nextLessonId: null } });
    const router = TestBed.inject(Router);
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    comp.nextLesson();
    expect(navSpy).not.toHaveBeenCalled();
  });

  it('nextLesson navigates to the next lesson when present', () => {
    const comp = create();
    patchStore(store, { resultDetail: MOCK_DETAIL });
    const router = TestBed.inject(Router);
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    comp.nextLesson();
    expect(navSpy).toHaveBeenCalledWith(['/student/lesson-viewer', 'lesson-2']);
  });

  it('questionPreview truncates over 60 chars', () => {
    const comp = create();
    const long = 'a'.repeat(80);
    expect(comp.questionPreview({
      questionId: 'q', questionText: long, type: 'MULTIPLE_CHOICE', difficulty: 'EASY',
      studentAnswer: '', correctAnswer: '', isCorrect: false, timeSpentSeconds: 0, aiExplanation: '',
    })).toHaveLength(61); // 60 chars + ellipsis
  });

  it('difficultyBadgeClasses returns difficulty-specific colors', () => {
    const comp = create();
    expect(comp.difficultyBadgeClasses('EASY')).toContain('green');
    expect(comp.difficultyBadgeClasses('MEDIUM')).toContain('amber');
    expect(comp.difficultyBadgeClasses('HARD')).toContain('red');
  });
});
