import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { patchStore } from '../../../../test-utils/patch-store';
import { LessonsStore, Lesson } from './lessons.store';
import { environment } from '../../../../environments/environment';

describe('LessonsStore', () => {
  let store: any;
  let httpClient: HttpClient;

  const mockBackendLesson = {
    id: '1',
    title: 'Test Lesson',
    subject: 'Science',
    grade: 4,
    difficulty: 'Easy',
    duration: '10 min',
    status: 'Not Started',
    subcapitols: [
      {
        id: 's1',
        title: 'Subcapitol 1',
        blocks: [
          { id: 'b1', blockType: 'text', content: 'Hello' }
        ]
      }
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    store = TestBed.inject(LessonsStore);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ─── Initial State ────────────────────────────────────────────────────────

  it('initialises with empty lessons', () => {
    expect(store.lessons().length).toBe(0);
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

  it('lessonCount reflects the number of lessons', () => {
    expect(store.lessonCount()).toBe(0);
  });

  // ─── loadLessons ──────────────────────────────────────────────────────────

  it('loadLessons sets loading to true then false on success', () => {
    vi.spyOn(httpClient, 'get').mockReturnValue(of([mockBackendLesson]));
    store.loadLessons();
    // In signalStore with HttpClient, it's usually synchronous if we mock 'of'
    expect(store.loading()).toBe(false);
    expect(store.lessons().length).toBe(1);
    expect(store.lessons()[0].id).toBe('1');
  });

  it('loadLessons sets loading to false on error', () => {
    vi.spyOn(httpClient, 'get').mockReturnValue(throwError(() => new Error('fail')));
    store.loadLessons();
    expect(store.loading()).toBe(false);
  });

  // ─── loadLesson ──────────────────────────────────────────────────────────

  it('loadLesson sets currentLesson when id is found', () => {
    vi.spyOn(httpClient, 'get').mockReturnValue(of(mockBackendLesson));
    store.loadLesson('1');
    expect(store.currentLesson()?.id).toBe('1');
    expect(store.loading()).toBe(false);
  });

  it('loadLesson sets loading to false on error', () => {
    vi.spyOn(httpClient, 'get').mockReturnValue(throwError(() => new Error('fail')));
    store.loadLesson('non-existent');
    expect(store.loading()).toBe(false);
  });

  it('loadLesson populates modules on the resolved lesson', () => {
    vi.spyOn(httpClient, 'get').mockReturnValue(of(mockBackendLesson));
    store.loadLesson('1');
    expect(store.currentLesson()?.modules.length).toBeGreaterThan(0);
    expect(store.currentLesson()?.modules[0].title).toBe('Subcapitol 1');
  });
});
