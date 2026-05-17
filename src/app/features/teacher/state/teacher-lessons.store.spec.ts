import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideApiMocks } from '../../../../test-utils/api-testing';
import { TeacherLesson, TeacherLessonsStore, mapTeacherLesson } from './teacher-lessons.store';

const mkLesson = (id: string, overrides: Partial<TeacherLesson> = {}): TeacherLesson => ({
  id,
  title: `Lesson ${id}`,
  subject: 'Math',
  difficulty_level: 'Easy',
  status: 'DRAFT',
  estimated_duration_minutes: 15,
  created_at: new Date().toISOString(),
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
    store.setFilter('difficulty', 'Intermediate');
    store.clearFilters();
    expect(store.filters()).toEqual({ search: '', status: '', subject: '', difficulty: '' });
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

  it('bulkAction publish hits POST publish for each selected id and clears selection', () => {
    const items = [mkLesson('1'), mkLesson('2')];
    vi.spyOn(http, 'get').mockReturnValue(of({ items, total: 2, page: 0, pageSize: 20 }));
    const postSpy = vi.spyOn(http, 'post').mockReturnValue(of({}));
    store.load();
    store.selectAll(true);
    store.bulkAction('publish');
    expect(postSpy).toHaveBeenCalledWith('/api/v1/lessons/1/publish', {});
    expect(postSpy).toHaveBeenCalledWith('/api/v1/lessons/2/publish', {});
    expect(store.selectedIds()).toEqual([]);
  });

  it('bulkAction archive hits POST archive for each selected id', () => {
    const items = [mkLesson('a'), mkLesson('b')];
    vi.spyOn(http, 'get').mockReturnValue(of({ items, total: 2, page: 0, pageSize: 20 }));
    const postSpy = vi.spyOn(http, 'post').mockReturnValue(of({}));
    store.load();
    store.toggleSelected('a');
    store.toggleSelected('b');
    store.bulkAction('archive');
    expect(postSpy).toHaveBeenCalledWith('/api/v1/lessons/a/archive', {});
    expect(postSpy).toHaveBeenCalledWith('/api/v1/lessons/b/archive', {});
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

  // --- mapTeacherLesson ---
  describe('mapTeacherLesson', () => {
    it('should map properties correctly, handling camelCase, snake_case, and missing properties', () => {
      // Test complete camelCase object
      const l1 = mapTeacherLesson({
        id: 123,
        title: 'Title',
        subject: 'Math',
        difficultyLevel: 'ADVANCED',
        status: 'PUBLISHED',
        estimatedDurationMinutes: 30,
        createdAt: '2026-05-17T12:00:00Z',
      });
      expect(l1.id).toBe('123');
      expect(l1.title).toBe('Title');
      expect(l1.subject).toBe('Math');
      expect(l1.difficulty_level).toBe('ADVANCED');
      expect(l1.status).toBe('PUBLISHED');
      expect(l1.estimated_duration_minutes).toBe(30);
      expect(l1.created_at).toBe('2026-05-17T12:00:00Z');

      // Test complete snake_case object
      const l2 = mapTeacherLesson({
        id: '456',
        title: 'Title 2',
        subject: 'Science',
        difficulty_level: 'EASY',
        status: 'DRAFT',
        estimated_duration_minutes: 45,
        created_at: '2026-05-17T13:00:00Z',
      });
      expect(l2.id).toBe('456');
      expect(l2.title).toBe('Title 2');
      expect(l2.subject).toBe('Science');
      expect(l2.difficulty_level).toBe('EASY');
      expect(l2.status).toBe('DRAFT');
      expect(l2.estimated_duration_minutes).toBe(45);
      expect(l2.created_at).toBe('2026-05-17T13:00:00Z');

      // Test empty/missing fields fallbacks
      const l3 = mapTeacherLesson({});
      expect(l3.id).toBe('');
      expect(l3.title).toBe('');
      expect(l3.subject).toBe('');
      expect(l3.difficulty_level).toBe('BEGINNER');
      expect(l3.status).toBe('DRAFT');
      expect(l3.estimated_duration_minutes).toBe(0);
      expect(l3.created_at).toBeDefined();

      // Test other fallbacks for created_at
      const l4 = mapTeacherLesson({ updatedAt: '2026-05-17T14:00:00Z' });
      expect(l4.created_at).toBe('2026-05-17T14:00:00Z');
      
      const l5 = mapTeacherLesson({ lastModified: '2026-05-17T15:00:00Z' });
      expect(l5.created_at).toBe('2026-05-17T15:00:00Z');
    });
  });

  // --- isEmpty & selectedCount ---
  describe('selectors', () => {
    it('isEmpty computed property correctly flags empty non-loading state', () => {
      vi.spyOn(http, 'get').mockReturnValue(of({ items: [], total: 0 }));
      store.load();
      expect(store.isEmpty()).toBe(true);
    });

    it('selectedCount reflects the size of selectedIds', () => {
      store.toggleSelected('1');
      store.toggleSelected('2');
      expect(store.selectedCount()).toBe(2);
    });
  });

  // --- fetchList alternative payloads ---
  describe('fetchList response structures', () => {
    it('handles flat array responses successfully', () => {
      const items = [{ id: '1', title: 'L1' }];
      vi.spyOn(http, 'get').mockReturnValue(of(items));
      store.load();
      expect(store.items().length).toBe(1);
      expect(store.items()[0].title).toBe('L1');
      expect(store.total()).toBe(1);
    });

    it('handles paginated response with items & total elements', () => {
      const response = {
        items: [{ id: '1', title: 'L1' }],
        totalElements: 5,
      };
      vi.spyOn(http, 'get').mockReturnValue(of(response));
      store.load();
      expect(store.items().length).toBe(1);
      expect(store.total()).toBe(5);
    });

    it('handles paginated response with content & total', () => {
      const response = {
        content: [{ id: '1', title: 'L1' }],
        total: 10,
      };
      vi.spyOn(http, 'get').mockReturnValue(of(response));
      store.load();
      expect(store.items().length).toBe(1);
      expect(store.total()).toBe(10);
    });

    it('handles paginated response with page.totalElements', () => {
      const response = {
        content: [{ id: '1', title: 'L1' }],
        page: {
          totalElements: 25,
        },
      };
      vi.spyOn(http, 'get').mockReturnValue(of(response));
      store.load();
      expect(store.items().length).toBe(1);
      expect(store.total()).toBe(25);
    });
  });

  // --- setSort, clearSelection, reset ---
  describe('actions & methods', () => {
    it('setSort changes sort parameters and reloads', () => {
      const spy = vi.spyOn(http, 'get').mockReturnValue(of([]));
      store.setSort('title', 'asc');
      expect(store.sort()).toEqual({ field: 'title', order: 'asc' });
      expect(spy).toHaveBeenCalled();
    });

    it('clearSelection empties selectedIds list', () => {
      store.toggleSelected('1');
      store.clearSelection();
      expect(store.selectedIds()).toEqual([]);
    });

    it('reset returns the store state to initial state', () => {
      store.toggleSelected('1');
      store.setSort('title', 'asc');
      store.reset();
      expect(store.selectedIds()).toEqual([]);
      expect(store.sort()).toEqual({ field: 'lastModified', order: 'desc' });
    });
  });

  // --- actions: publish, archive, unpublish, duplicate, remove ---
  describe('lesson actions', () => {
    it('publish posts to publish endpoint and reloads list', () => {
      const postSpy = vi.spyOn(http, 'post').mockReturnValue(of({}));
      const getSpy = vi.spyOn(http, 'get').mockReturnValue(of([]));
      store.publish('123');
      expect(postSpy).toHaveBeenCalledWith('/api/v1/lessons/123/publish', {});
      expect(getSpy).toHaveBeenCalled();
    });

    it('publish sets loading to false on failure', () => {
      vi.spyOn(http, 'post').mockReturnValue(throwError(() => new Error('fail')));
      store.publish('123');
      expect(store.loading()).toBe(false);
    });

    it('archive posts to archive endpoint', () => {
      const postSpy = vi.spyOn(http, 'post').mockReturnValue(of({}));
      store.archive('123');
      expect(postSpy).toHaveBeenCalledWith('/api/v1/lessons/123/archive', {});
    });

    it('archive sets loading to false on failure', () => {
      vi.spyOn(http, 'post').mockReturnValue(throwError(() => new Error('fail')));
      store.archive('123');
      expect(store.loading()).toBe(false);
    });

    it('unpublish posts to unpublish endpoint', () => {
      const postSpy = vi.spyOn(http, 'post').mockReturnValue(of({}));
      store.unpublish('123');
      expect(postSpy).toHaveBeenCalledWith('/api/v1/lessons/123/unpublish', {});
    });

    it('unpublish sets loading to false on failure', () => {
      vi.spyOn(http, 'post').mockReturnValue(throwError(() => new Error('fail')));
      store.unpublish('123');
      expect(store.loading()).toBe(false);
    });

    it('duplicate posts to duplicate endpoint', () => {
      const postSpy = vi.spyOn(http, 'post').mockReturnValue(of({}));
      store.duplicate('123');
      expect(postSpy).toHaveBeenCalledWith('/api/v1/lessons/123/duplicate', {});
    });

    it('duplicate sets loading to false on failure', () => {
      vi.spyOn(http, 'post').mockReturnValue(throwError(() => new Error('fail')));
      store.duplicate('123');
      expect(store.loading()).toBe(false);
    });

    it('remove deletes from api, filters selected, and reloads list', () => {
      const deleteSpy = vi.spyOn(http, 'delete').mockReturnValue(of({}));
      const getSpy = vi.spyOn(http, 'get').mockReturnValue(of([]));
      store.toggleSelected('123');
      store.toggleSelected('456');
      store.remove('123');
      expect(deleteSpy).toHaveBeenCalledWith('/api/v1/lessons/123');
      expect(store.selectedIds()).toEqual(['456']);
      expect(getSpy).toHaveBeenCalled();
    });

    it('remove sets loading to false on failure', () => {
      vi.spyOn(http, 'delete').mockReturnValue(throwError(() => new Error('fail')));
      store.remove('123');
      expect(store.loading()).toBe(false);
    });
  });
});
