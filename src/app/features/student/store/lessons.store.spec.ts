import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { patchState } from '@ngrx/signals';
import { LessonsStore, Lesson, Module } from './lessons.store';

describe('LessonsStore', () => {
  const getStore = () => TestBed.inject(LessonsStore);
  let store: ReturnType<typeof getStore>;

  const mockModule: Module = {
    id: 'm1',
    title: 'What are fractions?',
    type: 'video',
    content: 'Fractions represent parts of a whole.',
    mediaUrl: 'https://example.com/video1.mp4',
  };

  const mockLesson: Lesson = {
    id: '1',
    title: 'Intro to Fractions',
    subject: 'Math',
    grade: 5,
    difficulty: 'Easy',
    duration: '15 min',
    status: 'Not Started',
    modules: [mockModule],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = getStore();
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

  // ─── loadLessons ─────────────────────────────────────────────────────────

  it('loadLessons sets loading to true then false', fakeAsync(() => {
    store.loadLessons();
    expect(store.loading()).toBe(true);
    tick(500);
    expect(store.loading()).toBe(false);
  }));

  // ─── loadLesson ──────────────────────────────────────────────────────────

  it('loadLesson sets loading to true while fetching', fakeAsync(() => {
    store.loadLesson('1');
    expect(store.loading()).toBe(true);
    tick(500);
  }));

  it('loadLesson sets currentLesson when lesson is found', fakeAsync(() => {
    store.loadLesson('1');
    tick(500);
    expect(store.currentLesson()?.id).toBe('1');
    expect(store.loading()).toBe(false);
  }));

  it('loadLesson sets currentLesson to undefined when id not found', fakeAsync(() => {
    store.loadLesson('non-existent-id');
    tick(500);
    expect(store.currentLesson()).toBeUndefined();
    expect(store.loading()).toBe(false);
  }));

  it('loadLesson populates modules on the resolved lesson', fakeAsync(() => {
    store.loadLesson('2');
    tick(500);
    const lesson = store.currentLesson();
    expect(lesson?.modules.length).toBeGreaterThan(0);
  }));

  // ─── Direct state manipulation ────────────────────────────────────────────

  it('patchState with a custom lesson sets currentLesson correctly', () => {
    patchState(store, { currentLesson: mockLesson });
    expect(store.currentLesson()?.title).toBe('Intro to Fractions');
  });

  it('lessonCount updates when lessons are patched', () => {
    const extra: Lesson = { ...mockLesson, id: '99', title: 'Extra Lesson' };
    patchState(store, { lessons: [mockLesson, extra] });
    expect(store.lessonCount()).toBe(2);
  });
});
