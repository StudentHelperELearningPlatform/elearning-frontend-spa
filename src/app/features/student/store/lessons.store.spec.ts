import { HttpClient, HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';
import { patchStore } from '../../../../test-utils/patch-store';
import { LessonsStore, Lesson } from './lessons.store';
import { BackendLesson } from '../../../api/adapters/lesson.adapter';
import { API_URL } from '@core/tokens/api.token';

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
    modules: [{ id: 'm1', title: 'Intro', type: 'text', content: 'Hello' }],
  };

  const backendFixture: BackendLesson = {
    id: 1,
    title: 'Intro to Fractions',
    subject: 'Math',
    grade: 5,
    difficulty: 'Easy',
    duration: '15 min',
    status: 'Not Started',
    subcapitols: [
      {
        id: 'sub-1',
        title: 'What are fractions?',
        blocks: [{ id: 'b-1', blockType: 'TEXT', content: '<p>Hello</p>' }],
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: API_URL, useValue: '/api/v1' }
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
    vi.useFakeTimers();
    store.loadLessons();
    expect(store.loading()).toBe(true);
    vi.runAllTimers();
  });

  it('loadLessons clears loading after the timer fires', () => {
    vi.useFakeTimers();
    store.loadLessons();
    vi.advanceTimersByTime(500);
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
    expect(store.error()?.kind).toBe('server');
  });

  it('loadLesson clears previous lesson and error before fetching', () => {
    patchStore(store, { error: { kind: 'unknown', message: 'old' }, currentLesson: mockLesson });
    vi.spyOn(http, 'get').mockReturnValue(of(backendFixture));
    store.loadLesson('1');
    expect(store.error()?.kind).not.toBe('unknown');
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
  });
});
