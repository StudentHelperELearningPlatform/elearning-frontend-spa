import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

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
  let fixture: ComponentFixture<HistoryComponent>;
  let component: HistoryComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        ...provideApiMocks(),
      ],
    }).compileComponents();

    progressStore = TestBed.inject(ProgressStore);
    lessonsStore = TestBed.inject(LessonsStore);
    http = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    http.verify();
  });

  it('shows the header by default', () => {
    fixture.detectChanges(); // Triggers ngOnInit
    http.expectOne((r) => r.url.includes('/progress/me/history')).flush([]);
    http
      .match((r) => r.url.includes('/lessons') && !r.url.includes('/progress'))
      .forEach((req) => req.flush([]));

    const html = fixture.nativeElement.innerHTML;
    expect(html).toContain('Lesson history');
    expect(html).toContain("Every lesson you've completed");
  });

  it('hides the header when showHeader input is false', () => {
    // Set the input BEFORE the very first change detection
    fixture.componentRef.setInput('showHeader', false);

    // Trigger the first change detection (this fires ngOnInit and evaluates the @if)
    fixture.detectChanges();

    // Safely clear out any pending HTTP requests using match() to prevent flushing errors
    http.match((r) => r.url.includes('/progress/me/history')).forEach((req) => req.flush([]));
    http
      .match((r) => r.url.includes('/lessons') && !r.url.includes('/progress'))
      .forEach((req) => req.flush([]));

    // Trigger one final change detection to ensure the DOM is settled
    fixture.detectChanges();

    const html = fixture.nativeElement.innerHTML;

    expect(html).not.toContain('Lesson history');
    expect(html).not.toContain("Every lesson you've completed");
  });

  it('loads history and triggers lesson load on init if lessons are missing or seed', () => {
    fixture.detectChanges();

    const historyReq = http.expectOne((r) => r.url.includes('/progress/me/history'));
    historyReq.flush([]);

    // Verify lessons load was triggered
    const lessonsReq = http.expectOne(
      (r) => r.url.includes('/lessons') && !r.url.includes('/progress'),
    );
    lessonsReq.flush([]);

    expect(progressStore.myHistory()).toEqual([]);
  });

  it('does not trigger lesson load on init if real lessons already exist in the store', () => {
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

    fixture.detectChanges();

    const historyReq = http.expectOne((r) => r.url.includes('/progress/me/history'));
    historyReq.flush([]);

    // Should not trigger another lesson load
    http.expectNone((r) => r.url.includes('/lessons') && !r.url.includes('/progress'));
  });

  it('maps "Untitled lesson" or missing titles to the correct title from LessonsStore', () => {
    lessonsStore.loadLessons();
    http
      .expectOne((r) => r.url.includes('/lessons') && !r.url.includes('/progress'))
      .flush([
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

    fixture.detectChanges();

    http
      .expectOne((r) => r.url.includes('/progress/me/history'))
      .flush([
        baseRow({ lessonId: '123', lessonTitle: 'Untitled lesson' }),
        baseRow({ lessonId: '456', lessonTitle: '' }),
        baseRow({ lessonId: '789', lessonTitle: 'Existing Title' }),
      ]);

    // ProgressStore fetches individual lesson details for untitled/missing-title entries.
    // Drain those requests so http.verify() in afterEach doesn't cascade into later tests.
    http
      .match((r) => /\/lessons\/\d+/.test(r.url) && !r.url.includes('/progress'))
      .forEach((req) => {
        const id = req.request.url.split('/').pop();
        const title = id === '123' ? 'Real Math Lesson' : 'Real Science Lesson';
        req.flush({ id, title });
      });

    fixture.detectChanges();

    const filtered = component['filteredHistory']();

    expect(filtered.find((r) => r.lessonId === '123')?.lessonTitle).toBe('Real Math Lesson');
    expect(filtered.find((r) => r.lessonId === '456')?.lessonTitle).toBe('Real Science Lesson');
    expect(filtered.find((r) => r.lessonId === '789')?.lessonTitle).toBe('Existing Title');
  });

  it('filters entries by date range accurately in all directions', () => {
    fixture.detectChanges();
    const mockRows = [
      baseRow({ lessonId: 'a', dateCompleted: '2026-03-01T10:00:00Z' }),
      baseRow({ lessonId: 'b', dateCompleted: '2026-04-15T10:00:00Z' }),
      baseRow({ lessonId: 'c', dateCompleted: '2026-05-10T10:00:00Z' }),
    ];
    http.expectOne((r) => r.url.includes('/progress/me/history')).flush(mockRows);

    const lessonsReq = http.match(
      (r) => r.url.includes('/lessons') && !r.url.includes('/progress'),
    );
    if (lessonsReq.length) lessonsReq[0].flush([]);

    // Filter by both From and To
    component['fromDate'] = '2026-04-01';
    component['toDate'] = '2026-04-30';
    component['onDateChange']();
    // Flush with the same mock data instead of [] so the frontend filter finds it!
    http.expectOne((r) => r.url.includes('/progress/me/history')).flush(mockRows);
    expect(component['filteredHistory']().map((r) => r.lessonId)).toEqual(['b']);

    // Filter by From only
    component['fromDate'] = '2026-04-01';
    component['toDate'] = '';
    component['onDateChange']();
    http.expectOne((r) => r.url.includes('/progress/me/history')).flush(mockRows);
    expect(component['filteredHistory']().map((r) => r.lessonId)).toEqual(['b', 'c']);

    // Filter by To only
    component['fromDate'] = '';
    component['toDate'] = '2026-04-30';
    component['onDateChange']();
    http.expectOne((r) => r.url.includes('/progress/me/history')).flush(mockRows);
    expect(component['filteredHistory']().map((r) => r.lessonId)).toEqual(['a', 'b']);
  });

  it('excludes entries without dateCompleted when filtering by date', () => {
    fixture.detectChanges();
    const mockRows = [
      baseRow({ lessonId: '1', dateCompleted: null }),
      baseRow({ lessonId: '2', dateCompleted: '2026-04-15T10:00:00Z' }),
    ];
    http.expectOne((r) => r.url.includes('/progress/me/history')).flush(mockRows);

    const lessonsReq = http.match(
      (r) => r.url.includes('/lessons') && !r.url.includes('/progress'),
    );
    if (lessonsReq.length) lessonsReq[0].flush([]);

    component['fromDate'] = '2026-04-01';
    component['onDateChange']();
    // Flush with the same mock data instead of []
    http.expectOne((r) => r.url.includes('/progress/me/history')).flush(mockRows);

    expect(component['filteredHistory']().map((r) => r.lessonId)).toEqual(['2']);
  });

  it('paginates after 20 entries and strictly respects bounds', () => {
    const rows: HistoryEntry[] = Array.from({ length: 25 }, (_, i) =>
      baseRow({
        lessonId: `l-${i}`,
        dateCompleted: `2026-04-${(i % 28) + 1 < 10 ? '0' : ''}${(i % 28) + 1}T10:00:00Z`,
      }),
    );
    fixture.detectChanges();
    http.expectOne((r) => r.url.includes('/progress/me/history')).flush(rows);
    const lessonsReq = http.match(
      (r) => r.url.includes('/lessons') && !r.url.includes('/progress'),
    );
    if (lessonsReq.length) lessonsReq[0].flush([]);

    expect(component['totalPages']()).toBe(2);
    expect(component['pagedHistory']().length).toBe(20);

    // Next
    component['nextPage']();
    expect(component['page']()).toBe(2);
    expect(component['pagedHistory']().length).toBe(5);

    // Stop at max bound
    component['nextPage']();
    expect(component['page']()).toBe(2);

    // Prev
    component['prevPage']();
    expect(component['page']()).toBe(1);

    // Stop at min bound
    component['prevPage']();
    expect(component['page']()).toBe(1);
  });

  it('clearFilters resets the date filters and reloads history', () => {
    fixture.detectChanges();
    http.expectOne((r) => r.url.includes('/progress/me/history')).flush([]);
    const lessonsReq = http.match(
      (r) => r.url.includes('/lessons') && !r.url.includes('/progress'),
    );
    if (lessonsReq.length) lessonsReq[0].flush([]);

    component['fromDate'] = '2026-01-01';
    component['toDate'] = '2026-12-31';
    component['onDateChange']();
    http.expectOne((r) => r.url.includes('/progress/me/history')).flush([]);

    component['clearFilters']();
    http.expectOne((r) => r.url.includes('/progress/me/history')).flush([]);

    expect(component['fromDate']).toBe('');
    expect(component['toDate']).toBe('');
    expect(component['page']()).toBe(1);
  });

  it('pagedHistory maps "Untitled lesson" or empty titles using case-insensitive ID matching and fallbacks', () => {
    lessonsStore.loadLessons();

    // Mock the lessons so we have something to match against
    http
      .expectOne((r) => r.url.includes('/lessons') && !r.url.includes('/progress'))
      .flush([
        {
          id: 'case-test-id',
          title: 'Found Case Insensitive Title',
          subject: 'Science',
          status: 'published',
        },
      ]);

    fixture.detectChanges();

    // Mock history entries triggering the uncovered branches
    http
      .expectOne((r) => r.url.includes('/progress/me/history'))
      .flush([
        baseRow({
          lessonId: 'CASE-TEST-ID', // Tests case-insensitive ID match
          lessonTitle: 'untitled lesson', // Tests toLowerCase() check
        }),
        baseRow({
          lessonId: 'unknown-id',
          lessonTitle: '   ', // Tests the final fallback to 'Untitled lesson' for blank strings
        }),
      ]);

    // Drain the individual lesson lookup requests that the progress store attempts
    http
      .match((r) => /\/lessons\/\d+/.test(r.url) && !r.url.includes('/progress'))
      .forEach((req) => req.flush({}));

    fixture.detectChanges();

    const paged = component['pagedHistory']();

    // First row: successfully matched 'CASE-TEST-ID' to 'case-test-id'
    expect(paged[0].lessonTitle).toBe('Found Case Insensitive Title');

    // Second row: blank title with unknown ID falls back to 'Untitled lesson'
    expect(paged[1].lessonTitle).toBe('Untitled lesson');
  });
});
