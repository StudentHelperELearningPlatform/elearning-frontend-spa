import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NEVER, of, throwError } from 'rxjs';
import { provideApiMocks } from '../../../../test-utils/api-testing';
import { patchStore } from '../../../../test-utils/patch-store';

import {
  ContentStore,
  ContentItem,
  RecentActivityItem,
  TeacherClassSummary,
} from './content.store';

const isoYesterday = new Date(
  Date.now() - 24 * 60 * 60 * 1000,
).toISOString();

const MOCK_LESSONS: ContentItem[] = [
  {
    id: 'l1',
    title: 'A',
    subject: 'Math',
    status: 'PUBLISHED',
    lastModified: new Date(isoYesterday),
  },
  {
    id: 'l2',
    title: 'B',
    subject: 'Math',
    status: 'DRAFT',
    lastModified: new Date(isoYesterday),
  },
  {
    id: 'l3',
    title: 'C',
    subject: 'Science',
    status: 'PUBLISHED',
    lastModified: new Date(isoYesterday),
  },
  {
    id: 'l4',
    title: 'D',
    subject: 'Science',
    status: 'ARCHIVED',
    lastModified: new Date(isoYesterday),
  },
];

const MOCK_QUIZZES: ContentItem[] = [
  {
    id: 'q1',
    title: 'Q1',
    subject: 'Math',
    status: 'PUBLISHED',
    lastModified: new Date(isoYesterday),
  },
];

const MOCK_ACTIVITY: RecentActivityItem[] = [
  {
    id: 'a1',
    type: 'created',
    contentTitle: 'A',
    contentType: 'lesson',
    timestamp: new Date(isoYesterday),
  },
  {
    id: 'a2',
    type: 'updated',
    contentTitle: 'B',
    contentType: 'lesson',
    timestamp: new Date(isoYesterday),
  },
  {
    id: 'a3',
    type: 'published',
    contentTitle: 'C',
    contentType: 'lesson',
    timestamp: new Date(isoYesterday),
  },
  {
    id: 'a4',
    type: 'archived',
    contentTitle: 'D',
    contentType: 'lesson',
    timestamp: new Date(isoYesterday),
  },
];

const MOCK_CLASSES: TeacherClassSummary[] = [
  {
    id: 'c1',
    name: 'Math 101',
    studentCount: 24,
    averageProgress: 80,
  },
];

const MOCK_RESPONSE = {
  lessons: MOCK_LESSONS.map((l) => ({
    ...l,
    lastModified: l.lastModified.toISOString(),
  })),

  quizzes: MOCK_QUIZZES.map((q) => ({
    ...q,
    lastModified: q.lastModified.toISOString(),
  })),

  recentActivity: MOCK_ACTIVITY.map((a) => ({
    ...a,
    timestamp: a.timestamp.toISOString(),
  })),

  classes: MOCK_CLASSES,
};

describe('ContentStore', () => {
  const getStore = () => TestBed.inject(ContentStore);

  let store: ReturnType<typeof getStore>;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ...provideApiMocks(),
      ],
    });

    store = getStore();
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ── Initial state ────────────────────────────────────────────────────────

  it('initialises with empty lessons / quizzes / activity / classes', () => {
    expect(store.lessons()).toEqual([]);
    expect(store.quizzes()).toEqual([]);
    expect(store.recentActivity()).toEqual([]);
    expect(store.classes()).toEqual([]);

    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  // ── loadDashboard ────────────────────────────────────────────────────────

  it('loadDashboard calls split microservice endpoints', () => {
    const spy = vi.spyOn(http, 'get').mockImplementation((url: string) => {
      if (url.includes('/lessons')) {
        return of(MOCK_RESPONSE.lessons);
      }

      if (url.includes('/profile')) {
        return of({
          recentActivity: MOCK_RESPONSE.recentActivity,
          classes: MOCK_RESPONSE.classes,
        });
      }

      return of([]);
    });

    store.loadDashboard();

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('/lessons'),
    );

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('/profile'),
    );
  });

  it('loadDashboard populates state on success', () => {
    vi.spyOn(http, 'get').mockImplementation((url: string) => {
      if (url.includes('/lessons')) {
        return of(MOCK_RESPONSE.lessons);
      }

      if (url.includes('/profile')) {
        return of({
          recentActivity: MOCK_RESPONSE.recentActivity,
          classes: MOCK_RESPONSE.classes,
        });
      }

      return of(null);
    });

    store.loadDashboard();

    expect(store.lessons().length).toBe(4);
    expect(store.recentActivity().length).toBe(4);

    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('loadDashboard revives ISO timestamps into Date instances', () => {
    vi.spyOn(http, 'get').mockImplementation((url: string) => {
      if (url.includes('/lessons')) {
        return of(MOCK_RESPONSE.lessons);
      }

      if (url.includes('/profile')) {
        return of({
          recentActivity: MOCK_RESPONSE.recentActivity,
          classes: MOCK_RESPONSE.classes,
        });
      }

      return of(null);
    });

    store.loadDashboard();

    expect(store.lessons()[0].lastModified).toBeInstanceOf(Date);

    expect(
      store.recentActivity()[0].timestamp,
    ).toBeInstanceOf(Date);
  });

  it('loadDashboard sets loading=true while in flight', () => {
    vi.spyOn(http, 'get').mockReturnValue(NEVER);

    store.loadDashboard();

    expect(store.loading()).toBe(true);
  });

  it('loadDashboard sets error on failure and clears loading', () => {
    vi.spyOn(http, 'get').mockImplementation((url: string) => {
      if (url.includes('/lessons')) {
        return throwError(() => new Error('boom'));
      }

      return of(null);
    });

    store.loadDashboard();

    expect(store.error()).toBe('boom');
    expect(store.loading()).toBe(false);
  });

  it('loadDashboard clears previous error before fetching', () => {
    patchStore(store, { error: 'old' });

    vi.spyOn(http, 'get').mockImplementation((url: string) => {
      if (url.includes('/lessons')) {
        return of(MOCK_RESPONSE.lessons);
      }

      if (url.includes('/profile')) {
        return of({
          recentActivity: MOCK_RESPONSE.recentActivity,
          classes: MOCK_RESPONSE.classes,
        });
      }

      return of(null);
    });

    store.loadDashboard();

    expect(store.error()).toBeNull();
  });

  // ── Computed signals ─────────────────────────────────────────────────────

  it('publishedLessonsCount returns count of PUBLISHED lessons', () => {
    patchStore(store, { lessons: MOCK_LESSONS });

    expect(store.publishedLessonsCount()).toBe(2);
  });

  it('draftLessonsCount returns count of DRAFT lessons', () => {
    patchStore(store, { lessons: MOCK_LESSONS });

    expect(store.draftLessonsCount()).toBe(1);
  });

  it('totalLessonsCount returns lessons array length', () => {
    patchStore(store, { lessons: MOCK_LESSONS });

    expect(store.totalLessonsCount()).toBe(4);
  });

  it('totalQuizzesCount returns quizzes array length', () => {
    patchStore(store, { quizzes: MOCK_QUIZZES });

    expect(store.totalQuizzesCount()).toBe(1);
  });

  it('publishedLessons filters to PUBLISHED only', () => {
    patchStore(store, { lessons: MOCK_LESSONS });

    expect(
      store.publishedLessons().every(
        (l) => l.status === 'PUBLISHED',
      ),
    ).toBe(true);
  });

  it('draftLessons filters to DRAFT only', () => {
    patchStore(store, { lessons: MOCK_LESSONS });

    expect(
      store.draftLessons().every(
        (l) => l.status === 'DRAFT',
      ),
    ).toBe(true);
  });

  it('counts update reactively when lessons change', () => {
    expect(store.publishedLessonsCount()).toBe(0);

    patchStore(store, { lessons: MOCK_LESSONS });

    expect(store.publishedLessonsCount()).toBe(2);

    patchStore(store, {
      lessons: [MOCK_LESSONS[0]],
    });

    expect(store.publishedLessonsCount()).toBe(1);
  });

  // ── Missing Coverage Tests ────────────────────────────────────────────────
  it('loadContent sets loading to true and then false', () => {
    vi.useFakeTimers();
    store.loadContent();
    expect(store.loading()).toBe(true);
    vi.advanceTimersByTime(300);
    expect(store.loading()).toBe(false);
    vi.useRealTimers();
  });

  it('createLesson adds a lesson', () => {
    store.createLesson({ title: 'New Lesson', subject: 'Math', status: 'DRAFT' });
    expect(store.lessons().length).toBe(1);
    expect(store.lessons()[0].title).toBe('New Lesson');
  });

  it('updateLesson updates an existing lesson', () => {
    patchStore(store, { lessons: MOCK_LESSONS });
    store.updateLesson('l1', { title: 'Updated Title' });
    const lesson = store.lessons().find((l) => l.id === 'l1');
    expect(lesson?.title).toBe('Updated Title');
  });

  it('deleteLesson calls delete API and removes lesson on success', () => {
    patchStore(store, { lessons: MOCK_LESSONS });
    const spy = vi.spyOn(http, 'delete').mockReturnValue(of(undefined));

    store.deleteLesson('l1');

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('/lessons/l1'));
    expect(store.lessons().find((l) => l.id === 'l1')).toBeUndefined();
    expect(store.loading()).toBe(false);
  });

  it('deleteLesson handles error during delete', () => {
    patchStore(store, { lessons: MOCK_LESSONS });
    const spy = vi.spyOn(http, 'delete').mockReturnValue(throwError(() => new Error('delete failed')));

    store.deleteLesson('l1');

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('/lessons/l1'));
    expect(store.lessons().find((l) => l.id === 'l1')).toBeDefined();
    expect(store.error()).toBe('delete failed');
    expect(store.loading()).toBe(false);
  });

  it('createQuiz adds a quiz', () => {
    store.createQuiz({ title: 'New Quiz', subject: 'Math', status: 'DRAFT' });
    expect(store.quizzes().length).toBe(1);
    expect(store.quizzes()[0].title).toBe('New Quiz');
  });

  it('updateQuiz updates an existing quiz', () => {
    patchStore(store, { quizzes: MOCK_QUIZZES });
    store.updateQuiz('q1', { title: 'Updated Quiz Title' });
    const quiz = store.quizzes().find((q) => q.id === 'q1');
    expect(quiz?.title).toBe('Updated Quiz Title');
  });

  it('deleteQuiz removes an existing quiz', () => {
    patchStore(store, { quizzes: MOCK_QUIZZES });
    store.deleteQuiz('q1');
    expect(store.quizzes().find((q) => q.id === 'q1')).toBeUndefined();
  });

  it('reset clears the state', () => {
    patchStore(store, { lessons: MOCK_LESSONS, quizzes: MOCK_QUIZZES });
    store.reset();
    expect(store.lessons()).toEqual([]);
    expect(store.quizzes()).toEqual([]);
  });

  it('archivedLessons returns count of ARCHIVED lessons', () => {
    patchStore(store, { lessons: MOCK_LESSONS });
    expect(store.archivedLessons().length).toBe(1);
  });

  it('publishedQuizzes returns published quizzes', () => {
    patchStore(store, { quizzes: MOCK_QUIZZES });
    expect(store.publishedQuizzes().length).toBe(1);
  });

  it('draftQuizzes returns draft quizzes', () => {
    expect(store.draftQuizzes().length).toBe(0);
    patchStore(store, { quizzes: [{ ...MOCK_QUIZZES[0], status: 'DRAFT' }] });
    expect(store.draftQuizzes().length).toBe(1);
  });

  // --- Missing Coverage Dashboard Resiliency ---
  it('loadDashboard succeeds even if profile service fails', () => {
    vi.spyOn(http, 'get').mockImplementation((url: string) => {
      if (url.includes('/lessons')) {
        return of(MOCK_RESPONSE.lessons);
      }

      if (url.includes('/profile')) {
        return throwError(() => new Error('profile service is down'));
      }

      return of(null);
    });

    store.loadDashboard();

    expect(store.lessons().length).toBe(4);
    expect(store.recentActivity().length).toBe(4); // falls back to mapping from lessons
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('loadDashboard handles different lesson response structures', () => {
    // 1. Paginated { items }
    vi.spyOn(http, 'get').mockImplementation((url: string) => {
      if (url.includes('/lessons')) {
        return of({ items: MOCK_RESPONSE.lessons });
      }
      return of({ recentActivity: [], classes: [] });
    });
    store.loadDashboard();
    expect(store.lessons().length).toBe(4);

    // 2. Paginated { content }
    vi.spyOn(http, 'get').mockImplementation((url: string) => {
      if (url.includes('/lessons')) {
        return of({ content: MOCK_RESPONSE.lessons });
      }
      return of({ recentActivity: [], classes: [] });
    });
    store.loadDashboard();
    expect(store.lessons().length).toBe(4);
  });

  it('safeDate utility converts various value types correctly', () => {
    vi.spyOn(http, 'get').mockImplementation((url: string) => {
      if (url.includes('/lessons')) {
        return of([
          {
            id: 'l1',
            title: 'L1',
            updatedAt: null, // Test falsy value
          },
          {
            id: 'l2',
            title: 'L2',
            updatedAt: new Date(2026, 4, 1), // Test Date instance
          },
          {
            id: 'l3',
            title: 'L3',
            updatedAt: 1715904000000, // Test timestamp number
          }
        ]);
      }
      return of({ recentActivity: [], classes: [] });
    });
    
    store.loadDashboard();
    expect(store.lessons().length).toBe(3);
    expect(store.lessons()[0].lastModified).toBeInstanceOf(Date);
    expect(store.lessons()[1].lastModified.getFullYear()).toBe(2026);
    expect(store.lessons()[2].lastModified.getTime()).toBe(1715904000000);
  });

  it('loadDashboard sets custom fallback error message when error is not an Error instance', () => {
    vi.spyOn(http, 'get').mockImplementation((url: string) => {
      if (url.includes('/lessons')) {
        return throwError(() => 'raw string error');
      }
      return of(null);
    });

    store.loadDashboard();

    expect(store.error()).toBe('Failed to load dashboard');
    expect(store.loading()).toBe(false);
  });
});