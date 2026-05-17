import { HttpClient, provideHttpClient } from '@angular/common/http';
import { patchStore } from '../../../../test-utils/patch-store';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LearningPathsStore } from './learning-paths.store';
import { LearningPath } from '@shared/models/learning-path.model';
import { CONTENT_API_URL } from '@core/tokens/api.token';

const MOCK_PATH: LearningPath = {
  id: 'path-1',
  title: 'Math Mastery',
  description: 'Learn maths step by step.',
  totalLessons: 5,
  estimatedTotalTime: '2 hours',
  lessons: [
    {
      id: '1',
      title: 'Fractions',
      subject: 'Math',
      duration: '20 min',
      status: 'COMPLETED',
      score: 90,
    },
    {
      id: '2',
      title: 'Decimals',
      subject: 'Math',
      duration: '20 min',
      status: 'COMPLETED',
      score: 80,
    },
    { id: '3', title: 'Percentages', subject: 'Math', duration: '20 min', status: 'AVAILABLE' },
    {
      id: '4',
      title: 'Ratios',
      subject: 'Math',
      duration: '25 min',
      status: 'LOCKED',
      prerequisiteTitle: 'Percentages',
    },
    {
      id: '5',
      title: 'Algebra Intro',
      subject: 'Math',
      duration: '30 min',
      status: 'LOCKED',
      prerequisiteTitle: 'Ratios',
    },
  ],
};

describe('LearningPathsStore', () => {
  const getStore = () => TestBed.inject(LearningPathsStore);
  let store: ReturnType<typeof getStore>;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: CONTENT_API_URL, useValue: '/api' },
      ],
    });
    store = getStore();
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ─── Initial state ─────────────────────────────────────────────────────────

  it('starts with currentPath as null', () => {
    expect(store.currentPath()).toBeNull();
  });

  it('starts with loading as false', () => {
    expect(store.loading()).toBe(false);
  });

  it('starts with error as null', () => {
    expect(store.error()).toBeNull();
  });

  // ─── loadPath ─────────────────────────────────────────────────────────────

  it('loadPath sets currentPath on success', () => {
    vi.spyOn(http, 'get').mockReturnValue(of(MOCK_PATH));
    store.loadPath('path-1');
    expect(store.currentPath()).toEqual(MOCK_PATH);
  });

  it('loadPath clears loading on success', () => {
    vi.spyOn(http, 'get').mockReturnValue(of(MOCK_PATH));
    store.loadPath('path-1');
    expect(store.loading()).toBe(false);
  });

  it('loadPath sets error on failure when error is Error instance', () => {
    vi.spyOn(http, 'get').mockReturnValue(throwError(() => new Error('Network error')));
    store.loadPath('path-1');
    expect(store.error()).toBe('Network error');
    expect(store.loading()).toBe(false);
  });

  it('loadPath sets fallback error message when error is not Error instance', () => {
    vi.spyOn(http, 'get').mockReturnValue(throwError(() => 'Just a string error'));
    store.loadPath('path-1');
    expect(store.error()).toBe('Failed to load learning path');
    expect(store.loading()).toBe(false);
  });

  it('loadPath clears previous error before fetching', () => {
    patchStore(store, { error: 'old error' });
    vi.spyOn(http, 'get').mockReturnValue(of(MOCK_PATH));
    store.loadPath('path-1');
    expect(store.error()).toBeNull();
  });

  it('loadPath calls GET /api/learning-paths/:id', () => {
    const spy = vi.spyOn(http, 'get').mockReturnValue(of(MOCK_PATH));
    store.loadPath('path-42');
    expect(spy).toHaveBeenCalledWith('/api/learning-paths/path-42');
  });

  // ─── computed states ────────────────────────────────────────────────────────

  it('completedCount returns 0 when path is null', () => {
    expect(store.completedCount()).toBe(0);
  });

  it('completedCount returns count of COMPLETED lessons', () => {
    patchStore(store, { currentPath: MOCK_PATH });
    expect(store.completedCount()).toBe(2);
  });

  it('completedCount is 0 when all lessons are locked', () => {
    const allLocked = {
      ...MOCK_PATH,
      lessons: MOCK_PATH.lessons.map((l) => ({ ...l, status: 'LOCKED' as const })),
    };
    patchStore(store, { currentPath: allLocked });
    expect(store.completedCount()).toBe(0);
  });

  it('totalCount returns 0 when path is null', () => {
    expect(store.totalCount()).toBe(0);
  });

  it('totalCount returns the number of lessons in the path', () => {
    patchStore(store, { currentPath: MOCK_PATH });
    expect(store.totalCount()).toBe(5);
  });

  it('progressPercent returns 0 when path is null', () => {
    expect(store.progressPercent()).toBe(0);
  });

  it('progressPercent is 0 when no lessons are completed', () => {
    const none = {
      ...MOCK_PATH,
      lessons: MOCK_PATH.lessons.map((l) => ({ ...l, status: 'LOCKED' as const })),
    };
    patchStore(store, { currentPath: none });
    expect(store.progressPercent()).toBe(0);
  });

  it('progressPercent is 100 when all lessons are completed', () => {
    const all = {
      ...MOCK_PATH,
      lessons: MOCK_PATH.lessons.map((l) => ({ ...l, status: 'COMPLETED' as const })),
    };
    patchStore(store, { currentPath: all });
    expect(store.progressPercent()).toBe(100);
  });

  it('progressPercent is 40 for 2 of 5 completed', () => {
    patchStore(store, { currentPath: MOCK_PATH });
    expect(store.progressPercent()).toBe(40);
  });

  it('progressPercent rounds correctly', () => {
    const path: LearningPath = {
      ...MOCK_PATH,
      lessons: [
        { id: '1', title: 'L1', subject: 'Math', duration: '10 min', status: 'COMPLETED' },
        { id: '2', title: 'L2', subject: 'Math', duration: '10 min', status: 'AVAILABLE' },
        {
          id: '3',
          title: 'L3',
          subject: 'Math',
          duration: '10 min',
          status: 'LOCKED',
          prerequisiteTitle: 'L2',
        },
      ],
    };
    patchStore(store, { currentPath: path });
    expect(store.progressPercent()).toBe(33); // Math.round(1/3 * 100)
  });

  it('nextAvailableLesson returns null when path is null', () => {
    expect(store.nextAvailableLesson()).toBeNull();
  });

  it('nextAvailableLesson returns the first AVAILABLE lesson', () => {
    patchStore(store, { currentPath: MOCK_PATH });
    expect(store.nextAvailableLesson()?.id).toBe('3');
  });

  it('nextAvailableLesson returns null when all lessons are locked or completed', () => {
    const none = {
      ...MOCK_PATH,
      lessons: MOCK_PATH.lessons.map((l) => ({ ...l, status: 'LOCKED' as const })),
    };
    patchStore(store, { currentPath: none });
    expect(store.nextAvailableLesson()).toBeNull();
  });
});
