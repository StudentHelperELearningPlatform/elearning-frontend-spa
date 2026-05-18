import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { CONTENT_API_URL } from '@core/tokens/api.token'; // FIX: was USER_PLATFORM_API_URL — lessons belong to ARIANA's content service

export type TeacherLessonStatus = 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';

export interface TeacherLesson {
  id: string;
  title: string;
  subject: string;
  difficulty_level: string;
  status: TeacherLessonStatus;
  estimated_duration_minutes: number;
  created_at: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapTeacherLesson = (raw: any): TeacherLesson => ({
  id: raw.id?.toString() ?? '',
  title: raw.title ?? '',
  subject: raw.subject ?? '',
  difficulty_level: raw.difficulty_level ?? raw.difficultyLevel ?? 'BEGINNER',
  status: raw.status ?? 'DRAFT',
  estimated_duration_minutes: raw.estimated_duration_minutes ?? raw.estimatedDurationMinutes ?? 0,
  created_at: raw.created_at ?? raw.createdAt ?? raw.updatedAt ?? raw.lastModified ?? new Date().toISOString(),
});

export interface TeacherLessonFilters {
  search: string;
  status: TeacherLessonStatus | '';
  subject: string;
  difficulty: string;
}

export interface TeacherLessonSort {
  field: 'title' | 'lastModified' | 'status';
  order: 'asc' | 'desc';
}

interface TeacherLessonsState {
  items: TeacherLesson[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
  selectedIds: string[];
  filters: TeacherLessonFilters;
  sort: TeacherLessonSort;
}

const initialState: TeacherLessonsState = {
  items: [],
  total: 0,
  page: 0,
  pageSize: 20,
  loading: false,
  error: null,
  selectedIds: [],
  filters: { search: '', status: '', subject: '', difficulty: '' },
  sort: { field: 'lastModified', order: 'desc' },
};

export const TeacherLessonsStore = signalStore(
  { providedIn: 'root' },
  withState<TeacherLessonsState>(initialState),
  withComputed((state) => ({
    isEmpty: computed(() => !state.loading() && state.items().length === 0),
    selectedCount: computed(() => state.selectedIds().length),
    allSelected: computed(
      () =>
        state.items().length > 0 &&
        state.selectedIds().length === state.items().length,
    ),
    pageCount: computed(() => Math.max(1, Math.ceil(state.total() / state.pageSize()))),
  })),
  withMethods((store, http = inject(HttpClient), apiBase = inject(CONTENT_API_URL)) => {
    const buildParams = (): HttpParams => {
      const f = store.filters();
      const s = store.sort();
      let params = new HttpParams()
        .set('page', String(store.page()))
        .set('pageSize', String(store.pageSize()))
        .set('sortField', s.field)
        .set('sortOrder', s.order);
      if (f.search) params = params.set('search', f.search);
      if (f.status) params = params.set('status', f.status);
      if (f.subject) params = params.set('subject', f.subject);
      if (f.difficulty) params = params.set('difficulty', f.difficulty);
      return params;
    };

    const fetchList = () => {
      patchState(store, { loading: true, error: null });
      // FIX: was /teachers/lessons (MOISA path) — correct path is /lessons on ARIANA
      http
        .get<unknown>(`${apiBase}/lessons`, { params: buildParams() })
        .subscribe({
          next: (res: unknown) => {
            // Handle both array response and paginated { items, total } or Spring Boot { content, totalElements } response
            const response = res as Record<string, unknown>;
            
            let items: TeacherLesson[] = [];
            let total = 0;

            if (Array.isArray(response)) {
              items = response.map(mapTeacherLesson);
              total = response.length;
            } else {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const rawItems = (response['items'] ?? response['content'] ?? []) as any[];
              items = rawItems.map(mapTeacherLesson);
              
              if (typeof response['totalElements'] === 'number') {
                total = response['totalElements'];
              } else if (typeof response['total'] === 'number') {
                total = response['total'];
              } else if (response['page'] && typeof (response['page'] as Record<string, unknown>)['totalElements'] === 'number') {
                total = (response['page'] as Record<string, unknown>)['totalElements'] as number;
              } else {
                total = items.length;
              }
            }
            
            patchState(store, { items, total, loading: false });
          },
          error: (err: unknown) => {
            const msg = err instanceof Error ? err.message : 'Failed to load lessons';
            patchState(store, { loading: false, error: msg });
          },
        });
    };

    return {
      load() {
        fetchList();
      },
      setSearch(search: string) {
        patchState(store, (s) => ({ filters: { ...s.filters, search }, page: 0 }));
        fetchList();
      },
      setFilter<K extends keyof TeacherLessonFilters>(key: K, value: TeacherLessonFilters[K]) {
        patchState(store, (s) => ({ filters: { ...s.filters, [key]: value }, page: 0 }));
        fetchList();
      },
      clearFilters() {
        patchState(store, {
          filters: { search: '', status: '', subject: '', difficulty: '' },
          page: 0,
        });
        fetchList();
      },
      setSort(field: TeacherLessonSort['field'], order: TeacherLessonSort['order']) {
        patchState(store, { sort: { field, order } });
        fetchList();
      },
      setPage(page: number) {
        patchState(store, { page });
        fetchList();
      },
      setPageSize(pageSize: number) {
        patchState(store, { pageSize, page: 0 });
        fetchList();
      },
      toggleSelected(id: string) {
        patchState(store, (s) => ({
          selectedIds: s.selectedIds.includes(id)
            ? s.selectedIds.filter((x) => x !== id)
            : [...s.selectedIds, id],
        }));
      },
      selectAll(select: boolean) {
        patchState(store, (s) => ({
          selectedIds: select ? s.items.map((i) => i.id) : [],
        }));
      },
      clearSelection() {
        patchState(store, { selectedIds: [] });
      },
      // FIX: was calling /teachers/lessons/:id/publish — correct path is /lessons/:id/publish on ARIANA
      publish(id: string) {
        patchState(store, { loading: true });
        http.post<TeacherLesson>(`${apiBase}/lessons/${id}/publish`, {}).subscribe({
          next: () => fetchList(),
          error: () => patchState(store, { loading: false }),
        });
      },
      archive(id: string) {
        patchState(store, { loading: true });
        http.post<TeacherLesson>(`${apiBase}/lessons/${id}/archive`, {}).subscribe({
          next: () => fetchList(),
          error: () => patchState(store, { loading: false }),
        });
      },
      unpublish(id: string) {
        patchState(store, { loading: true });
        http.post<TeacherLesson>(`${apiBase}/lessons/${id}/unpublish`, {}).subscribe({
          next: () => fetchList(),
          error: () => patchState(store, { loading: false }),
        });
      },
      duplicate(id: string) {
        patchState(store, { loading: true });
        http.post<TeacherLesson>(`${apiBase}/lessons/${id}/duplicate`, {}).subscribe({
          next: () => fetchList(),
          error: () => patchState(store, { loading: false }),
        });
      },
      remove(id: string) {
        patchState(store, { loading: true });
        http.delete(`${apiBase}/lessons/${id}`).subscribe({
          next: () => {
            patchState(store, (s) => ({
              selectedIds: s.selectedIds.filter((x) => x !== id),
            }));
            fetchList();
          },
          error: () => patchState(store, { loading: false }),
        });
      },
      bulkAction(action: 'publish' | 'archive' | 'delete') {
        const ids = store.selectedIds();
        if (ids.length === 0) return;
        const operation = (id: string) => {
          if (action === 'publish') {
            return http.post(`${apiBase}/lessons/${id}/publish`, {}).pipe(catchError(() => of(null)));
          }
          if (action === 'archive') {
            return http.post(`${apiBase}/lessons/${id}/archive`, {}).pipe(catchError(() => of(null)));
          }
          return http.delete(`${apiBase}/lessons/${id}`).pipe(catchError(() => of(null)));
        };

        patchState(store, { loading: true });
        forkJoin(ids.map(operation))
          .pipe(
            map(() => undefined),
            finalize(() => {
              patchState(store, { selectedIds: [] });
              fetchList();
            }),
          )
          .subscribe();
      },
      reset() {
        patchState(store, initialState);
      },
    };
  }),
);