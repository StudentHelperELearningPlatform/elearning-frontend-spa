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

const isoYesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

const MOCK_LESSONS: ContentItem[] = [
  { id: 'l1', title: 'A', subject: 'Math', status: 'PUBLISHED', lastModified: new Date(isoYesterday) },
  { id: 'l2', title: 'B', subject: 'Math', status: 'DRAFT', lastModified: new Date(isoYesterday) },
  { id: 'l3', title: 'C', subject: 'Science', status: 'PUBLISHED', lastModified: new Date(isoYesterday) },
  { id: 'l4', title: 'D', subject: 'Science', status: 'ARCHIVED', lastModified: new Date(isoYesterday) },
];

const MOCK_QUIZZES: ContentItem[] = [
  { id: 'q1', title: 'Q1', subject: 'Math', status: 'PUBLISHED', lastModified: new Date(isoYesterday) },
];

const MOCK_ACTIVITY: RecentActivityItem[] = [
  { id: 'a1', type: 'created', contentTitle: 'A', contentType: 'lesson', timestamp: new Date(isoYesterday) },
];

const MOCK_CLASSES: TeacherClassSummary[] = [
  { id: 'c1', name: 'Math 101', studentCount: 24, averageProgress: 80 },
];

const MOCK_RESPONSE = {
  lessons: MOCK_LESSONS.map((l) => ({ ...l, lastModified: l.lastModified.toISOString() })),
  quizzes: MOCK_QUIZZES.map((q) => ({ ...q, lastModified: q.lastModified.toISOString() })),
  recentActivity: MOCK_ACTIVITY.map((a) => ({ ...a, timestamp: a.timestamp.toISOString() })),
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
      if (url.includes('/lessons')) return of(MOCK_RESPONSE.lessons);
      if (url.includes('/profile')) return of(null);
      return of([]);
    });
    store.loadDashboard();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('/lessons'));
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('/profile'));
  });

  it('loadDashboard populates state on success', () => {
    vi.spyOn(http, 'get').mockImplementation((url: string) => {
      if (url.includes('/lessons')) return of(MOCK_RESPONSE.lessons);
      return of(null);
    });
    store.loadDashboard();
    expect(store.lessons().length).toBe(4);
    expect(store.recentActivity().length).toBe(4); // derived from lessons
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('loadDashboard revives ISO timestamps into Date instances', () => {
    vi.spyOn(http, 'get').mockImplementation((url: string) => {
      if (url.includes('/lessons')) return of(MOCK_RESPONSE.lessons);
      return of(null);
    });
    store.loadDashboard();
    expect(store.lessons()[0].lastModified).toBeInstanceOf(Date);
    expect(store.recentActivity()[0].timestamp).toBeInstanceOf(Date);
  });

  it('loadDashboard sets loading=true while in flight', () => {
    vi.spyOn(http, 'get').mockReturnValue(NEVER);
    store.loadDashboard('me');
    expect(store.loading()).toBe(true);
  });

  it('loadDashboard sets error on failure and clears loading', () => {
    vi.spyOn(http, 'get').mockReturnValue(throwError(() => new Error('boom')));
    store.loadDashboard('me');
    expect(store.error()).toBe('boom');
    expect(store.loading()).toBe(false);
  });

  it('loadDashboard clears previous error before fetching', () => {
    patchStore(store, { error: 'old' });
    vi.spyOn(http, 'get').mockReturnValue(of(MOCK_RESPONSE));
    store.loadDashboard('me');
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
    expect(store.publishedLessons().every((l) => l.status === 'PUBLISHED')).toBe(true);
  });

  it('draftLessons filters to DRAFT only', () => {
    patchStore(store, { lessons: MOCK_LESSONS });
    expect(store.draftLessons().every((l) => l.status === 'DRAFT')).toBe(true);
  });

  it('counts update reactively when lessons change', () => {
    expect(store.publishedLessonsCount()).toBe(0);
    patchStore(store, { lessons: MOCK_LESSONS });
    expect(store.publishedLessonsCount()).toBe(2);
    patchStore(store, { lessons: [MOCK_LESSONS[0]] });
    expect(store.publishedLessonsCount()).toBe(1);
  });
});
