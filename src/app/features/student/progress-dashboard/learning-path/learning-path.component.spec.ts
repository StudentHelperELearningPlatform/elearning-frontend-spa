import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { patchStore } from '../../../../../test-utils/patch-store';
import { LearningPathComponent } from './learning-path.component';
import { LearningPathsStore } from '../../store/learning-paths.store';
import { LearningPath, PathLesson } from '../../../../shared/models/learning-path.model';
import { API_URL } from '@core/tokens/api.token';

// LearningPathComponent uses templateUrl — cannot be DOM-mounted in Vitest.
// We instantiate the class inside runInInjectionContext and drive the store
// directly with patchStore, matching the established pattern in this project.

const LOCKED_LESSON: PathLesson = {
  id: '4',
  title: 'Dividing Fractions',
  subject: 'Math',
  duration: '25 min',
  status: 'LOCKED',
  prerequisiteTitle: 'Multiplying Fractions',
};

const AVAILABLE_LESSON: PathLesson = {
  id: '3',
  title: 'Multiplying Fractions',
  subject: 'Math',
  duration: '20 min',
  status: 'AVAILABLE',
};

const COMPLETED_LESSON: PathLesson = {
  id: '1',
  title: 'Fractions Intro',
  subject: 'Math',
  duration: '20 min',
  status: 'COMPLETED',
  score: 95,
};

const MOCK_PATH: LearningPath = {
  id: 'path-1',
  title: 'Math Mastery',
  description: 'Learn maths step by step.',
  totalLessons: 3,
  estimatedTotalTime: '1 hour',
  lessons: [COMPLETED_LESSON, AVAILABLE_LESSON, LOCKED_LESSON],
};

const EMPTY_PATH: LearningPath = { ...MOCK_PATH, lessons: [], totalLessons: 0 };

describe('LearningPathComponent', () => {
  let injector: EnvironmentInjector;
  let store: InstanceType<typeof LearningPathsStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: API_URL, useValue: '/api/v1' },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'path-1' } } },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    injector = TestBed.inject(EnvironmentInjector);
    store = TestBed.inject(LearningPathsStore);
  });

  afterEach(() => vi.restoreAllMocks());

  function make() {
    return runInInjectionContext(injector, () => new LearningPathComponent());
  }

  // ─── Instantiation ────────────────────────────────────────────────────────

  it('creates without errors', () => {
    expect(make()).toBeTruthy();
  });

  // ─── ngOnInit ─────────────────────────────────────────────────────────────

  it('calls store.loadPath with the route id on init', () => {
    const spy = vi.spyOn(store, 'loadPath').mockImplementation(() => undefined);
    make().ngOnInit();
    expect(spy).toHaveBeenCalledWith('path-1');
  });

  it('does not call loadPath again when the same path is already loaded', () => {
    patchStore(store, { currentPath: MOCK_PATH, loading: false, error: null });
    const spy = vi.spyOn(store, 'loadPath').mockImplementation(() => undefined);
    make().ngOnInit();
    expect(spy).not.toHaveBeenCalled();
  });

  // ─── reload ───────────────────────────────────────────────────────────────

  it('reload calls store.loadPath with the same id', () => {
    const comp = make();
    comp.ngOnInit();
    const spy = vi.spyOn(store, 'loadPath').mockImplementation(() => undefined);
    comp.reload();
    expect(spy).toHaveBeenCalledWith('path-1');
  });

  // ─── cardClass ────────────────────────────────────────────────────────────

  it('cardClass returns opacity + grayscale for LOCKED lessons', () => {
    const cls = make().cardClass(LOCKED_LESSON);
    expect(cls).toContain('opacity-60');
    expect(cls).toContain('grayscale');
  });

  it('cardClass returns teal border for COMPLETED lessons', () => {
    expect(make().cardClass(COMPLETED_LESSON)).toContain('border-[#0ABAB5]');
  });

  it('cardClass returns empty string for AVAILABLE lessons', () => {
    expect(make().cardClass(AVAILABLE_LESSON)).toBe('');
  });

  // ─── Store computed signals ───────────────────────────────────────────────

  it('completedCount reflects only COMPLETED lessons', () => {
    patchStore(store, { currentPath: MOCK_PATH });
    expect(store.completedCount()).toBe(1);
  });

  it('totalCount reflects all lessons in the path', () => {
    patchStore(store, { currentPath: MOCK_PATH });
    expect(store.totalCount()).toBe(3);
  });

  it('progressPercent rounds to nearest integer (1 of 3 → 33%)', () => {
    patchStore(store, { currentPath: MOCK_PATH });
    expect(store.progressPercent()).toBe(33);
  });

  it('progressPercent is 0 when no lessons are completed', () => {
    patchStore(store, {
      currentPath: { ...MOCK_PATH, lessons: [AVAILABLE_LESSON, LOCKED_LESSON] },
    });
    expect(store.progressPercent()).toBe(0);
  });

  it('progressPercent is 100 when all lessons are completed', () => {
    const allDone = {
      ...MOCK_PATH,
      lessons: MOCK_PATH.lessons.map((l) => ({ ...l, status: 'COMPLETED' as const })),
    };
    patchStore(store, { currentPath: allDone });
    expect(store.progressPercent()).toBe(100);
  });

  it('nextAvailableLesson returns the first AVAILABLE lesson', () => {
    patchStore(store, { currentPath: MOCK_PATH });
    expect(store.nextAvailableLesson()?.id).toBe(AVAILABLE_LESSON.id);
  });

  it('nextAvailableLesson returns null when no AVAILABLE lesson exists', () => {
    const allDone = {
      ...MOCK_PATH,
      lessons: MOCK_PATH.lessons.map((l) => ({ ...l, status: 'COMPLETED' as const })),
    };
    patchStore(store, { currentPath: allDone });
    expect(store.nextAvailableLesson()).toBeNull();
  });

  // ─── Empty path — encouraging message ────────────────────────────────────

  it('emptyStateMessage includes the path title when a named path is loaded', () => {
    patchStore(store, { currentPath: EMPTY_PATH });
    expect(make().emptyStateMessage()).toContain('Math Mastery');
  });

  it('emptyStateMessage encourages exploring the catalogue', () => {
    patchStore(store, { currentPath: EMPTY_PATH });
    expect(make().emptyStateMessage().toLowerCase()).toContain('catalogue');
  });

  it('emptyStateMessage falls back gracefully when no path is loaded', () => {
    patchStore(store, { currentPath: null });
    const msg = make().emptyStateMessage();
    expect(msg.length).toBeGreaterThan(0);
    expect(msg.toLowerCase()).toContain('catalogue');
  });

  it('totalCount is 0 for an empty path', () => {
    patchStore(store, { currentPath: EMPTY_PATH });
    expect(store.totalCount()).toBe(0);
  });

  it('progressPercent is 0 for an empty path', () => {
    patchStore(store, { currentPath: EMPTY_PATH });
    expect(store.progressPercent()).toBe(0);
  });

  it('nextAvailableLesson is null for an empty path', () => {
    patchStore(store, { currentPath: EMPTY_PATH });
    expect(store.nextAvailableLesson()).toBeNull();
  });
});
