import { HttpClient, HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';
import { patchStore } from '../../../../test-utils/patch-store';
import { LessonsStore, Lesson } from './lessons.store';
import { BackendLesson } from '../../../api/adapters/lesson.adapter';
import { provideApiMocks } from '../../../../test-utils/api-testing';

describe('LessonsStore', () => {
  const getStore = () => TestBed.inject(LessonsStore);
  let store: ReturnType<typeof getStore>;
  let http: HttpClient;

  const mockLesson: Lesson = {
    id: '99',
    title: 'Test Lesson',
    subject: 'Science',
    grade: 4,
    difficulty: 'Easy',
    duration: '10 min',
    status: 'Not Started',
    description: 'A test lesson description',
    modules: [{ id: 'm1', title: 'Intro', type: 'text', content: 'Hello' }],
  };

  const backendFixture: BackendLesson = {
    id: 1,
    title: 'Intro to Fractions',
    subject: 'Math',
    grade: 5,
    difficultyLevel: 'Easy',
    duration: '15 min',
    status: 'Not Started',
    subcapitols: [
      {
        id: 'sub-1',
        title: 'What are fractions?',
        orderIndex: 0,
        blocks: [{ id: 'b-1', blockType: 'TEXT', content: '<p>Hello</p>' }],
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideRouter([]),
        ...provideApiMocks(),
      ],
    });
    store = getStore();
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // ─── Initial State ────────────────────────────────────────────────────────
  it('initialises with pre-seeded lessons', () => {
    expect(store.lessons().length).toBeGreaterThan(0);
  });

  it('initialises with currentLesson as null', () => {
    expect(store.currentLesson()).toBeNull();
  });

  it('initialises with loading as false', () => {
    expect(store.loading()).toBe(false);
  });

  it('publishedLessons returns all lessons', () => {
    expect(store.publishedLessons()).toEqual(store.lessons());
  });

  it('lessonCount reflects the number of seeded lessons', () => {
    expect(store.lessonCount()).toBe(store.lessons().length);
  });

  it('lessonCount updates when lessons are patched', () => {
    const extra: Lesson = { ...mockLesson, id: '100', title: 'Extra' };
    patchStore(store, { lessons: [mockLesson, extra] });
    expect(store.lessonCount()).toBe(2);
  });

  it('patchState with a custom lesson sets currentLesson correctly', () => {
    patchStore(store, { currentLesson: mockLesson });
    expect(store.currentLesson()?.title).toBe('Test Lesson');
  });

  // ─── loadLessons (legacy timer flow) ─────────────────────────────────────
  it('loadLessons sets loading to true immediately', () => {
    store.loadLessons();
    expect(store.loading()).toBe(true);
  });

  it('loadLessons clears loading after success', () => {
    vi.spyOn(http, 'get').mockReturnValue(of([]));
    store.loadLessons();
    expect(store.loading()).toBe(false);
  });

  // ─── loadLesson (real HTTP) ──────────────────────────────────────────────
  it('loadLesson calls GET /api/v1/lessons/:id', () => {
    const spy = vi.spyOn(http, 'get').mockReturnValue(of(backendFixture));
    store.loadLesson('1');
    expect(spy).toHaveBeenCalledWith('/api/v1/lessons/1');
  });

  it('loadLesson maps the backend response through the adapter', () => {
    vi.spyOn(http, 'get').mockReturnValue(of(backendFixture));
    store.loadLesson('1');
    const lesson = store.currentLesson();
    expect(lesson?.id).toBe('1');
    expect(lesson?.modules[0].type).toBe('text');
    expect(lesson?.modules[0].content).toBe('<p>Hello</p>');
  });

  it('loadLesson clears loading on success', () => {
    vi.spyOn(http, 'get').mockReturnValue(of(backendFixture));
    store.loadLesson('1');
    expect(store.loading()).toBe(false);
  });

  it('loadLesson sets a "not-found" error on 404', () => {
    vi.spyOn(http, 'get').mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Not Found' })),
    );
    store.loadLesson('missing');
    expect(store.error()).toEqual({ kind: 'not-found', message: 'Lesson not found' });
    expect(store.loading()).toBe(false);
  });

  it('loadLesson sets a "server" error on 500', () => {
    vi.spyOn(http, 'get').mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' })),
    );
    store.loadLesson('1');
    expect(store.error()).toEqual({ kind: 'server', message: 'Server error' });
    expect(store.loading()).toBe(false);
  });

  it('loadLesson clears previous lesson and error before fetching', () => {
    patchStore(store, { error: { kind: 'unknown', message: 'old' }, currentLesson: mockLesson });
    vi.spyOn(http, 'get').mockReturnValue(of(backendFixture));
    store.loadLesson('1');
    expect(store.error()?.kind).not.toBe('unknown');
  });

  describe('markModuleCompleteLocally', () => {
    it('should mark module complete in local state without API call', () => {
      const putSpy = vi.spyOn(http, 'put');
      const postSpy = vi.spyOn(http, 'post');

      store.markModuleCompleteLocally('module-loc');

      expect(store.completedModuleIds().has('module-loc')).toBe(true);
      expect(putSpy).not.toHaveBeenCalled();
      expect(postSpy).not.toHaveBeenCalled();
    });
  });

  describe('markModuleComplete (INT-02)', () => {
    it('should call PUT /api/v1/lessons/:lessonId/progress with correct payload', () => {
      const putSpy = vi.spyOn(http, 'put').mockReturnValue(of({ message: 'Progress saved successfully' }));

      store.markModuleComplete('lesson-123', 'module-1');

      expect(putSpy).toHaveBeenCalledWith(
        '/api/v1/lessons/lesson-123/progress',
        expect.objectContaining({
          moduleId: 'module-1',
          completedAt: expect.any(String) 
        })
      );
    });

    it('should catch errors and log them without crashing', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

      vi.spyOn(http, 'put').mockReturnValue(
        throwError(() => new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' }))
      );

      store.markModuleComplete('lesson-123', 'module-2');

      expect(consoleSpy).toHaveBeenCalledWith('Failed to save module progress', expect.any(Object));
      
      consoleSpy.mockRestore();
    });

    it('should track completed module id locally (S6-final-quiz-ui)', () => {
      vi.spyOn(http, 'put').mockReturnValue(of({}));
      store.markModuleComplete('lesson-1', 'module-A');
      expect(store.completedModuleIds().has('module-A')).toBe(true);
    });
  });

  // ─── S6-final-quiz-ui: allModulesComplete signal ──────────────────────────
  describe('S6-final-quiz-ui: allModulesComplete', () => {
    it('returns false when no lesson is loaded', () => {
      expect(store.allModulesComplete()).toBe(false);
    });

    it('returns false when some modules are not yet complete', () => {
      patchStore(store, {
        currentLesson: { ...mockLesson, modules: [
          { id: 'm1', title: 'A', type: 'text', content: '' },
          { id: 'm2', title: 'B', type: 'text', content: '' },
        ]},
        completedModuleIds: new Set(['m1']),
      });
      expect(store.allModulesComplete()).toBe(false);
    });

    it('returns true when all modules are complete', () => {
      patchStore(store, {
        currentLesson: { ...mockLesson, modules: [
          { id: 'm1', title: 'A', type: 'text', content: '' },
          { id: 'm2', title: 'B', type: 'text', content: '' },
        ]},
        completedModuleIds: new Set(['m1', 'm2']),
      });
      expect(store.allModulesComplete()).toBe(true);
    });

    it('returns true when a lesson has 0 modules', () => {
      patchStore(store, {
        currentLesson: { ...mockLesson, modules: [] },
        completedModuleIds: new Set(),
      });
      expect(store.allModulesComplete()).toBe(true);
    });
  });

  // ─── S6-final-quiz-ui: lessonCardStatus ───────────────────────────────────
  describe('S6-final-quiz-ui: lessonCardStatus', () => {
    const twoModuleLesson = {
      ...mockLesson,
      modules: [
        { id: 'm1', title: 'A', type: 'text' as const, content: '' },
        { id: 'm2', title: 'B', type: 'text' as const, content: '' },
      ],
    };

    it('not-started when no modules done and no attempts', () => {
      patchStore(store, { currentLesson: twoModuleLesson, completedModuleIds: new Set(), finalQuizAttempts: [] });
      expect(store.lessonCardStatus()).toBe('not-started');
    });

    it('in-progress when some but not all modules done', () => {
      patchStore(store, { currentLesson: twoModuleLesson, completedModuleIds: new Set(['m1']), finalQuizAttempts: [] });
      expect(store.lessonCardStatus()).toBe('in-progress');
    });

    it('quiz-ready when all modules done but no quiz attempt', () => {
      patchStore(store, { currentLesson: twoModuleLesson, completedModuleIds: new Set(['m1', 'm2']), finalQuizAttempts: [] });
      expect(store.lessonCardStatus()).toBe('quiz-ready');
    });

    it('quiz-submitted when at least one attempt exists', () => {
      const attempt = { attemptId: 'a1', score: 8, totalPoints: 10, percentage: 80, passed: true, submittedAt: '' };
      patchStore(store, { currentLesson: twoModuleLesson, completedModuleIds: new Set(['m1', 'm2']), finalQuizAttempts: [attempt] });
      expect(store.lessonCardStatus()).toBe('quiz-submitted');
    });
  });

  // ─── S6-final-quiz-ui: loadFinalQuizAttempts ──────────────────────────────
  describe('S6-final-quiz-ui: loadFinalQuizAttempts', () => {
    it('calls GET /api/v1/lessons/:id/final-quiz/attempts', () => {
      const spy = vi.spyOn(http, 'get').mockReturnValue(of([]));
      store.loadFinalQuizAttempts('lesson-42');
      expect(spy).toHaveBeenCalledWith('/api/v1/lessons/lesson-42/final-quiz/attempts');
    });

    it('sets finalQuizAttempts on success', () => {
      const attempt = { attemptId: 'a1', score: 7, totalPoints: 10, percentage: 70, passed: true, submittedAt: '' };
      vi.spyOn(http, 'get').mockReturnValue(of([attempt]));
      store.loadFinalQuizAttempts('lesson-42');
      expect(store.finalQuizAttempts()?.length).toBe(1);
      expect(store.finalQuizAttempts()?.[0].attemptId).toBe('a1');
    });

    it('sets finalQuizAttempts to [] on HTTP error', () => {
      vi.spyOn(http, 'get').mockReturnValue(
        throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Not Found' }))
      );
      store.loadFinalQuizAttempts('lesson-missing');
      expect(store.finalQuizAttempts()).toEqual([]);
    });

    it('lastQuizAttempt returns the last attempt', () => {
      const a1 = { attemptId: 'a1', score: 5, totalPoints: 10, percentage: 50, passed: false, submittedAt: '' };
      const a2 = { attemptId: 'a2', score: 9, totalPoints: 10, percentage: 90, passed: true, submittedAt: '' };
      patchStore(store, { finalQuizAttempts: [a1, a2] });
      expect(store.lastQuizAttempt()?.attemptId).toBe('a2');
    });
  });

  // ─── Miscellaneous missing coverage ───────────────────────────────────────
  describe('loadLessons payload formats', () => {
    it('handles { content: [...] } format', () => {
      vi.spyOn(http, 'get').mockReturnValue(of({ content: [backendFixture] }));
      store.loadLessons();
      expect(store.lessons().length).toBe(1);
    });
    it('handles { lessons: [...] } format', () => {
      vi.spyOn(http, 'get').mockReturnValue(of({ lessons: [backendFixture] }));
      store.loadLessons();
      expect(store.lessons().length).toBe(1);
    });
    it('handles single object with id format', () => {
      vi.spyOn(http, 'get').mockReturnValue(of(backendFixture));
      store.loadLessons();
      expect(store.lessons().length).toBe(1);
    });
    it('handles error gracefully', () => {
      vi.spyOn(http, 'get').mockReturnValue(throwError(() => new Error('API failure')));
      store.loadLessons();
      expect(store.loading()).toBe(false);
    });
  });

  describe('checkout', () => {
    it('initiates checkout successfully', () => {
      const postSpy = vi.spyOn(http, 'post').mockReturnValue(of({}));
      store.checkout('stu-1', 'les-1');
      expect(postSpy).toHaveBeenCalledWith('/api/v1/payments/checkout', null, expect.objectContaining({
        params: { studentId: 'stu-1', bundleId: 'les-1', itemType: 'LESSON', itemId: 'les-1' }
      }));
      expect(store.loading()).toBe(false);
      expect(store.error()).toBeNull();
    });
    it('sets error on checkout failure', () => {
      vi.spyOn(http, 'post').mockReturnValue(throwError(() => new Error('API failure')));
      store.checkout('stu-1', 'les-1');
      expect(store.loading()).toBe(false);
      expect(store.error()?.message).toContain('Failed to initiate unlock');
    });
  });

  describe('completeLesson', () => {
    it('calls complete endpoint', () => {
      const postSpy = vi.spyOn(http, 'post').mockReturnValue(of({}));
      store.completeLesson('les-1');
      expect(postSpy).toHaveBeenCalledWith('/api/v1/lessons/les-1/complete', {});
    });
    it('handles error silently', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      vi.spyOn(http, 'post').mockReturnValue(throwError(() => new Error('API failure')));
      store.completeLesson('les-1');
      expect(consoleSpy).toHaveBeenCalledWith('Failed to complete lesson', expect.any(Error));
    });
  });

  describe('clearCompletionState', () => {
    it('resets tracking sets', () => {
      patchStore(store, { completedModuleIds: new Set(['m1']), finalQuizAttempts: [] });
      store.clearCompletionState();
      expect(store.completedModuleIds().size).toBe(0);
      expect(store.finalQuizAttempts()).toBeNull();
    });
  });

  describe('explainBlock', () => {
    it('parses valid JSON response', () => {
      const postSpy = vi.spyOn(http, 'post').mockReturnValue(of({
        content: '{"simplified_explanation":"Simple","analogy":"Like X","check_for_understanding_question":"Why?"}'
      }));
      store.explainBlock('block-1');
      expect(postSpy).toHaveBeenCalledWith('/api/v1/blocks/block-1/explain', null);
      expect(store.explanation()?.simplified_explanation).toBe('Simple');
      expect(store.explanationLoading()).toBe(false);
    });
    it('falls back if parsing fails', () => {
      vi.spyOn(http, 'post').mockReturnValue(of({ content: 'Just a string' }));
      store.explainBlock('block-1');
      expect(store.explanation()?.simplified_explanation).toBe('Just a string');
    });
    it('handles error response gracefully', () => {
      vi.spyOn(http, 'post').mockReturnValue(throwError(() => new Error('API failure')));
      store.explainBlock('block-1');
      expect(store.explanation()?.simplified_explanation).toContain('Could not load');
      expect(store.explanationLoading()).toBe(false);
    });
  });

  describe('clearExplanation', () => {
    it('resets explanation', () => {
      patchStore(store, { explanation: { simplified_explanation: '', analogy: '', check_for_understanding_question: '' }, explanationBlockId: 'block-1' });
      store.clearExplanation();
      expect(store.explanation()).toBeNull();
      expect(store.explanationBlockId()).toBeNull();
    });
  });

  describe('loadAccessibleLessons', () => {
    it('sets accessibleLessonIds successfully by calling access-check for each lesson', () => {
      patchStore(store, { lessons: [{ ...mockLesson, id: 'l1' }, { ...mockLesson, id: 'l2' }] });
      
      const getSpy = vi.spyOn(http, 'get').mockImplementation((url: unknown, options?: { params?: { lessonId?: string } }) => {
        if (options?.params?.lessonId === 'l1') {
          return of(true);
        }
        return of(false);
      });

      store.loadAccessibleLessons('stu-1');
      
      expect(getSpy).toHaveBeenCalledTimes(2);
      expect(store.accessibleLessonIds().size).toBe(1);
      expect(store.accessibleLessonIds().has('l1')).toBe(true);
      expect(store.accessibleLessonsLoading()).toBe(false);
    });

    it('does nothing if no lessons are published', () => {
      patchStore(store, { lessons: [] });
      const getSpy = vi.spyOn(http, 'get');
      store.loadAccessibleLessons('stu-1');
      expect(getSpy).not.toHaveBeenCalled();
      expect(store.accessibleLessonsLoading()).toBe(false);
    });

    it('does nothing if studentId is not provided', () => {
      patchStore(store, { lessons: [{ ...mockLesson, id: 'l1' }] });
      const getSpy = vi.spyOn(http, 'get');
      store.loadAccessibleLessons('');
      expect(getSpy).not.toHaveBeenCalled();
      expect(store.accessibleLessonsLoading()).toBe(false);
    });

    it('handles HTTP errors gracefully by defaulting to false', () => {
      patchStore(store, { lessons: [{ ...mockLesson, id: 'l1' }] });
      vi.spyOn(http, 'get').mockReturnValue(throwError(() => new Error('API failure')));
      
      store.loadAccessibleLessons('stu-1');
      
      expect(store.accessibleLessonIds().size).toBe(0);
      expect(store.accessibleLessonsLoading()).toBe(false);
    });
  });
});

