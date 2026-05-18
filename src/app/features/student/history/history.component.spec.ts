import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';

import { HistoryComponent } from './history.component';
import { ProgressStore, HistoryEntry } from '../store/progress.store';
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
  let store: InstanceType<typeof ProgressStore>;
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
    store = TestBed.inject(ProgressStore);
    http = TestBed.inject(HttpTestingController);
    TestBed.runInInjectionContext(() => {
      component = new HistoryComponent();
    });
  });

  it('loads history on init', () => {
    component.ngOnInit();
    const req = http.expectOne((r) => r.url.includes('/progress/me/history'));
    req.flush([]);
    expect(store.myHistory()).toEqual([]);
  });

  it('filters entries by date range', () => {
    component.ngOnInit();
    const req = http.expectOne((r) => r.url.includes('/progress/me/history'));
    req.flush([
      baseRow({ lessonId: 'a', dateCompleted: '2026-03-01T10:00:00Z' }),
      baseRow({ lessonId: 'b', dateCompleted: '2026-04-15T10:00:00Z' }),
      baseRow({ lessonId: 'c', dateCompleted: '2026-05-10T10:00:00Z' }),
    ]);

    component['fromDate'] = '2026-04-01';
    component['toDate'] = '2026-04-30';
    component['onDateChange']();

    const filtered = component['filteredHistory']();
    expect(filtered.map((r) => r.lessonId)).toEqual(['b']);
  });

  it('paginates after 20 entries', () => {
    const rows: HistoryEntry[] = Array.from({ length: 25 }, (_, i) =>
      baseRow({ lessonId: `l-${i}`, dateCompleted: `2026-04-${(i % 28) + 1}T10:00:00Z` }),
    );
    component.ngOnInit();
    const req = http.expectOne((r) => r.url.includes('/progress/me/history'));
    req.flush(rows);

    expect(component['totalPages']()).toBe(2);
    expect(component['pagedHistory']().length).toBe(20);
    component['nextPage']();
    expect(component['pagedHistory']().length).toBe(5);
  });

  it('clearFilters resets the date filters', () => {
    component['fromDate'] = '2026-01-01';
    component['toDate'] = '2026-12-31';
    component['onDateChange']();
    component['clearFilters']();
    expect(component['fromDate']).toBe('');
    expect(component['toDate']).toBe('');
    expect(component['page']()).toBe(1);
  });
});
