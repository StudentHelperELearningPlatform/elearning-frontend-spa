import { TestBed } from '@angular/core/testing';
import { patchStore } from '../../../../test-utils/patch-store';
import { LessonsStore, Lesson } from './lessons.store';

describe('LessonsStore', () => {
  const getStore = () => TestBed.inject(LessonsStore);
  let store: ReturnType<typeof getStore>;

  const mockLesson: Lesson = {
    id: '99',
    title: 'Test Lesson',
    subject: 'Science',
    grade: 4,
    difficulty: 'Easy',
    duration: '10 min',
    status: 'Not Started',
    subcapitols: [
      {
        id: 'sc1',
        title: 'Intro',
        blocks: [{ id: 'm1', title: 'Intro', blockType: 'TEXT', content: 'Hello' }],
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = getStore();
  });

  afterEach(() => {
    vi.useRealTimers();
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

  // ─── Computed Signals ────────────────────────────────────────────────────

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

  // ─── patchState ───────────────────────────────────────────────────────────

  it('patchState with a custom lesson sets currentLesson correctly', () => {
    patchStore(store, { currentLesson: mockLesson });
    expect(store.currentLesson()?.title).toBe('Test Lesson');
  });

  // ─── loadLessons (uses setTimeout internally) ─────────────────────────────

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

  // ─── loadLesson ──────────────────────────────────────────────────────────

  it('loadLesson sets loading to true immediately', () => {
    vi.useFakeTimers();
    store.loadLesson('1');
    expect(store.loading()).toBe(true);
    vi.runAllTimers();
  });

  it('loadLesson sets currentLesson when id is found', () => {
    vi.useFakeTimers();
    store.loadLesson('1');
    vi.advanceTimersByTime(500);
    expect(store.currentLesson()?.id).toBe('1');
    expect(store.loading()).toBe(false);
  });

  it('loadLesson sets currentLesson to undefined when id is not found', () => {
    vi.useFakeTimers();
    store.loadLesson('non-existent');
    vi.advanceTimersByTime(500);
    expect(store.currentLesson()).toBeUndefined();
    expect(store.loading()).toBe(false);
  });

  it('loadLesson populates modules on the resolved lesson', () => {
    vi.useFakeTimers();
    store.loadLesson('2');
    vi.advanceTimersByTime(500);
    expect(store.currentLesson()?.subcapitols.length).toBeGreaterThan(0);
  });
});
