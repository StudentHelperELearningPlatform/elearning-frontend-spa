import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideApiMocks } from '../../../../test-utils/api-testing';
import { TeacherLesson, TeacherLessonsStore } from './teacher-lessons.store';

const mkLesson = (id: string, overrides: Partial<TeacherLesson> = {}): TeacherLesson => ({
  id,
  title: `Lesson ${id}`,
  subject: 'Math',
  grade: 5,
  status: 'DRAFT',
  lastModified: new Date().toISOString(),
  ...overrides,
});

describe('TeacherLessonsStore', () => {
  const getStore = () => TestBed.inject(TeacherLessonsStore);
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

  // ── load ─────────────────────────────────────────────────────────────────
  it('load sends GET /api/v1/lessons with default pagination params', () => {
    const spy = vi
      .spyOn(http, 'get')
      .mockReturnValue(of({ items: [], total: 0, page: 0, pageSize: 20 }));
    store.load();
    expect(spy).toHaveBeenCalled();
    const args = spy.mock.calls[0];
    expect(args[0]).toBe('/api/v1/lessons');
    const params = (args[1] as { params: { toString: () => string } }).params;
    const s = params.toString();
    expect(s).toContain('page=0');
    expect(s).toContain('pageSize=20');
    expect(s).toContain('sortField=lastModified');
    expect(s).toContain('sortOrder=desc');
  });

  it('load populates items and total on success', () => {
    const items = [mkLesson('1'), mkLesson('2')];
    vi.spyOn(http, 'get').mockReturnValue(of({ items, total: 2, page: 0, pageSize: 20 }));
    store.load();
    expect(store.items()).toEqual(items);
    expect(store.total()).toBe(2);
    expect(store.loading()).toBe(false);
  });

  it('load sets error on failure', () => {
    vi.spyOn(http, 'get').mockReturnValue(throwError(() => new Error('boom')));
    store.load();
    expect(store.error()).toBe('boom');
    expect(store.loading()).toBe(false);
  });

  // ── filters ──────────────────────────────────────────────────────────────
  it('setSearch resets page to 0 and stores the search term', () => {
    vi.spyOn(http, 'get').mockReturnValue(of({ items: [], total: 0, page: 0, pageSize: 20 }));
    store.setPage(3);
    store.setSearch('frac');
    expect(store.filters().search).toBe('frac');
    expect(store.page()).toBe(0);
  });

  it('setFilter persists status filter and includes it in the request', () => {
    const spy = vi
      .spyOn(http, 'get')
      .mockReturnValue(of({ items: [], total: 0, page: 0, pageSize: 20 }));
    store.setFilter('status', 'PUBLISHED');
    expect(store.filters().status).toBe('PUBLISHED');
    const params = (spy.mock.calls.at(-1)?.[1] as { params: { toString: () => string } }).params;
    expect(params.toString()).toContain('status=PUBLISHED');
  });

  it('clearFilters resets all filters', () => {
    vi.spyOn(http, 'get').mockReturnValue(of({ items: [], total: 0, page: 0, pageSize: 20 }));
    store.setFilter('subject', 'Math');
    store.setFilter('grade', '5');
    store.clearFilters();
    expect(store.filters()).toEqual({ search: '', status: '', subject: '', grade: '' });
  });

  // ── pagination ───────────────────────────────────────────────────────────
  it('setPage updates page and refetches', () => {
    const spy = vi
      .spyOn(http, 'get')
      .mockReturnValue(of({ items: [], total: 0, page: 0, pageSize: 20 }));
    store.setPage(2);
    expect(store.page()).toBe(2);
    expect(spy).toHaveBeenCalled();
  });

  it('setPageSize resets page to 0', () => {
    vi.spyOn(http, 'get').mockReturnValue(of({ items: [], total: 0, page: 0, pageSize: 20 }));
    store.setPage(3);
    store.setPageSize(50);
    expect(store.pageSize()).toBe(50);
    expect(store.page()).toBe(0);
  });

  it('pageCount reflects total / pageSize', () => {
    vi.spyOn(http, 'get').mockReturnValue(of({ items: [], total: 45, page: 0, pageSize: 20 }));
    store.load();
    expect(store.pageCount()).toBe(3);
  });

  // ── selection / bulk action state ────────────────────────────────────────
  it('toggleSelected adds and removes ids', () => {
    store.toggleSelected('1');
    expect(store.selectedIds()).toEqual(['1']);
    store.toggleSelected('1');
    expect(store.selectedIds()).toEqual([]);
  });

  it('selectAll selects every visible item', () => {
    vi.spyOn(http, 'get').mockReturnValue(
      of({ items: [mkLesson('1'), mkLesson('2'), mkLesson('3')], total: 3, page: 0, pageSize: 20 }),
    );
    store.load();
    store.selectAll(true);
    expect(store.selectedIds().sort()).toEqual(['1', '2', '3']);
    expect(store.allSelected()).toBe(true);
  });

  it('selectAll(false) clears the selection', () => {
    vi.spyOn(http, 'get').mockReturnValue(
      of({ items: [mkLesson('1'), mkLesson('2')], total: 2, page: 0, pageSize: 20 }),
    );
    store.load();
    store.selectAll(true);
    store.selectAll(false);
    expect(store.selectedIds()).toEqual([]);
  });

  it('bulkAction publish hits PATCH publish for each selected id and clears selection', () => {
    const items = [mkLesson('1'), mkLesson('2')];
    vi.spyOn(http, 'get').mockReturnValue(of({ items, total: 2, page: 0, pageSize: 20 }));
    const patchSpy = vi.spyOn(http, 'patch').mockReturnValue(of({}));
    store.load();
    store.selectAll(true);
    store.bulkAction('publish');
    expect(patchSpy).toHaveBeenCalledWith('/api/v1/lessons/1/publish', {});
    expect(patchSpy).toHaveBeenCalledWith('/api/v1/lessons/2/publish', {});
    expect(store.selectedIds()).toEqual([]);
  });

  it('bulkAction archive hits PATCH archive for each selected id', () => {
    const items = [mkLesson('a'), mkLesson('b')];
    vi.spyOn(http, 'get').mockReturnValue(of({ items, total: 2, page: 0, pageSize: 20 }));
    const patchSpy = vi.spyOn(http, 'patch').mockReturnValue(of({}));
    store.load();
    store.toggleSelected('a');
    store.toggleSelected('b');
    store.bulkAction('archive');
    expect(patchSpy).toHaveBeenCalledWith('/api/v1/lessons/a/archive', {});
    expect(patchSpy).toHaveBeenCalledWith('/api/v1/lessons/b/archive', {});
  });

  it('bulkAction delete hits DELETE for each selected id', () => {
    const items = [mkLesson('x'), mkLesson('y')];
    vi.spyOn(http, 'get').mockReturnValue(of({ items, total: 2, page: 0, pageSize: 20 }));
    const deleteSpy = vi.spyOn(http, 'delete').mockReturnValue(of({}));
    store.load();
    store.selectAll(true);
    store.bulkAction('delete');
    expect(deleteSpy).toHaveBeenCalledWith('/api/v1/lessons/x');
    expect(deleteSpy).toHaveBeenCalledWith('/api/v1/lessons/y');
  });

  it('bulkAction with empty selection is a no-op', () => {
    const patchSpy = vi.spyOn(http, 'patch');
    const deleteSpy = vi.spyOn(http, 'delete');
    store.bulkAction('publish');
    store.bulkAction('delete');
    expect(patchSpy).not.toHaveBeenCalled();
    expect(deleteSpy).not.toHaveBeenCalled();
  });
});
