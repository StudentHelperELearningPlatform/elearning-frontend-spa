import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';

import { HistoryComponent } from './history.component';
import { ProgressStore, HistoryEntry } from '../store/progress.store';
import { LessonsStore } from '../store/lessons.store';
import { provideApiMocks } from '../../../../test-utils/api-testing';

const baseRow = (overrides: Partial<HistoryEntry>): HistoryEntry => ({
  lessonId: 'l',
  lessonTitle: 't',
  subject: 'Math',
  status: 'completed',
  score: 80,
  dateCompleted: '2026-04-01T10:00:00Z',
  ...overrides,
});

describe('HistoryComponent', () => {
  let progressStore: InstanceType<typeof ProgressStore>;
  let lessonsStore: InstanceType<typeof LessonsStore>;
  let http: HttpTestingController;
  let component: HistoryComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        ...provideApiMocks(),
      ],
    });
    progressStore = TestBed.inject(ProgressStore);
    lessonsStore = TestBed.inject(LessonsStore);
    http = TestBed.inject(HttpTestingController);
    TestBed.runInInjectionContext(() => {
      component = new HistoryComponent();
    });
  });

  it('loads history and triggers lesson load on init if lessons are missing or seed', () => {
    component.ngOnInit();

    // Verify history load
    const historyReq = http.expectOne((r) => r.url.includes('/progress/me/history'));
    historyReq.flush([]);

    // Verify lessons load was triggered because initial lessons state is just seed data
    const lessonsReq = http.expectOne(
      (r) => r.url.includes('/lessons') && !r.url.includes('/progress'),
    );
    lessonsReq.flush([]);

    expect(progressStore.myHistory()).toEqual([]);
  });

  it('does not trigger lesson load on init if real lessons already exist in the store', () => {
    // Populate state by calling the native store method and flushing a mock HTTP response
    lessonsStore.loadLessons();
    const initialLessonsReq = http.expectOne(
      (r) => r.url.includes('/lessons') && !r.url.includes('/progress'),
    );
    initialLessonsReq.flush([
      {
        id: 'real-1',
        title: 'Real Lesson',
        subject: 'Math',
        grade: 5,
        difficulty: 'Easy',
        duration: '10m',
        status: 'published',
        description: '',
        modules: [],
      },
    ]);

    component.ngOnInit();

    const historyReq = http.expectOne((r) => r.url.includes('/progress/me/history'));
    historyReq.flush([]);

    // We shouldn't see ANOTHER HTTP call to fetch lessons since they already exist
    http.expectNone((r) => r.url.includes('/lessons') && !r.url.includes('/progress'));
  });

  it('maps "Untitled lesson" or missing titles to the correct title from LessonsStore', () => {
    // 1. Setup available lessons in the store by calling the native store method
    lessonsStore.loadLessons();
    const initialLessonsReq = http.expectOne(
      (r) => r.url.includes('/lessons') && !r.url.includes('/progress'),
    );
    initialLessonsReq.flush([
      {
        id: '123',
        title: 'Real Math Lesson',
        subject: 'Math',
        grade: 5,
        difficulty: 'Easy',
        duration: '10m',
        status: 'published',
        description: '',
        modules: [],
      },
      {
        id: '456',
        title: 'Real Science Lesson',
        subject: 'Science',
        grade: 5,
        difficulty: 'Easy',
        duration: '10m',
        status: 'published',
        description: '',
        modules: [],
      },
    ]);

    component.ngOnInit();

    // 2. Return history containing placeholder titles
    const historyReq = http.expectOne((r) => r.url.includes('/progress/me/history'));
    historyReq.flush([
      baseRow({ lessonId: '123', lessonTitle: 'Untitled lesson' }), // Should be replaced
      baseRow({ lessonId: '456', lessonTitle: '' }), // Should be replaced
      baseRow({ lessonId: '789', lessonTitle: 'Existing Title' }), // Should NOT be replaced (keeps own title)
    ]);

    // 3. Verify the computed signal correctly merged them
    const filtered = component['filteredHistory']();

    expect(filtered.find((r) => r.lessonId === '123')?.lessonTitle).toBe('Real Math Lesson');
    expect(filtered.find((r) => r.lessonId === '456')?.lessonTitle).toBe('Real Science Lesson');
    expect(filtered.find((r) => r.lessonId === '789')?.lessonTitle).toBe('Existing Title');
  });

  it('filters entries by date range accurately in all directions', () => {
    component.ngOnInit();
    const historyReq = http.expectOne((r) => r.url.includes('/progress/me/history'));
    historyReq.flush([
      baseRow({ lessonId: 'a', dateCompleted: '2026-03-01T10:00:00Z' }),
      baseRow({ lessonId: 'b', dateCompleted: '2026-04-15T10:00:00Z' }),
      baseRow({ lessonId: 'c', dateCompleted: '2026-05-10T10:00:00Z' }),
    ]);
    const lessonsReq = http.match(
      (r) => r.url.includes('/lessons') && !r.url.includes('/progress'),
    );
    if (lessonsReq.length) lessonsReq[0].flush([]);

    // Filter by both From and To
    component['fromDate'] = '2026-04-01';
    component['toDate'] = '2026-04-30';
    component['onDateChange']();

    let filtered = component['filteredHistory']();
    expect(filtered.map((r) => r.lessonId)).toEqual(['b']);

    // Filter by From only
    component['fromDate'] = '2026-04-01';
    component['toDate'] = '';
    component['onDateChange']();
    filtered = component['filteredHistory']();
    expect(filtered.map((r) => r.lessonId)).toEqual(['b', 'c']);

    // Filter by To only
    component['fromDate'] = '';
    component['toDate'] = '2026-04-30';
    component['onDateChange']();
    filtered = component['filteredHistory']();
    expect(filtered.map((r) => r.lessonId)).toEqual(['a', 'b']);
  });

  it('excludes entries without dateCompleted when filtering by date', () => {
    component.ngOnInit();
    const historyReq = http.expectOne((r) => r.url.includes('/progress/me/history'));
    historyReq.flush([
      baseRow({ lessonId: '1', dateCompleted: null }), // Invalid date
      baseRow({ lessonId: '2', dateCompleted: '2026-04-15T10:00:00Z' }),
    ]);
    const lessonsReq = http.match(
      (r) => r.url.includes('/lessons') && !r.url.includes('/progress'),
    );
    if (lessonsReq.length) lessonsReq[0].flush([]);

    component['fromDate'] = '2026-04-01';
    component['onDateChange']();

    const filtered = component['filteredHistory']();
    expect(filtered.map((r) => r.lessonId)).toEqual(['2']);
  });

  it('paginates after 20 entries and strictly respects bounds', () => {
    const rows: HistoryEntry[] = Array.from({ length: 25 }, (_, i) =>
      baseRow({
        lessonId: `l-${i}`,
        dateCompleted: `2026-04-${(i % 28) + 1 < 10 ? '0' : ''}${(i % 28) + 1}T10:00:00Z`,
      }),
    );
    component.ngOnInit();
    const historyReq = http.expectOne((r) => r.url.includes('/progress/me/history'));
    historyReq.flush(rows);
    const lessonsReq = http.match(
      (r) => r.url.includes('/lessons') && !r.url.includes('/progress'),
    );
    if (lessonsReq.length) lessonsReq[0].flush([]);

    expect(component['totalPages']()).toBe(2);
    expect(component['pagedHistory']().length).toBe(20);

    // Test moving next
    component['nextPage']();
    expect(component['page']()).toBe(2);
    expect(component['pagedHistory']().length).toBe(5);

    // Should not exceed total pages
    component['nextPage']();
    expect(component['page']()).toBe(2);

    // Test moving prev
    component['prevPage']();
    expect(component['page']()).toBe(1);

    // Should not go below page 1
    component['prevPage']();
    expect(component['page']()).toBe(1);
  });

  it('clearFilters resets the date filters and reloads history', () => {
    component['fromDate'] = '2026-01-01';
    component['toDate'] = '2026-12-31';
    component['onDateChange']();

    // Clear out the HTTP request triggered by onDateChange
    const reqs = http.match((r) => r.url.includes('/progress/me/history'));
    if (reqs.length) reqs.forEach((req) => req.flush([]));

    // Clear filters
    component['clearFilters']();

    expect(component['fromDate']).toBe('');
    expect(component['toDate']).toBe('');
    expect(component['page']()).toBe(1);

    // Verify clearFilters correctly triggers a new load without parameters
    const finalReqs = http.match((r) => r.url.includes('/progress/me/history'));
    expect(finalReqs.length).toBeGreaterThan(0);
  });
});
