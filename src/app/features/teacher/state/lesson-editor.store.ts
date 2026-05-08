import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

export type ModuleType = 'text' | 'video' | 'image' | 'audio' | 'quiz' | 'interactive';
export type LessonStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface LessonModuleDraft {
  id: string;
  title: string;
  type: ModuleType;
  content: string;
  mediaUrls?: string[];
}

export interface LessonDraft {
  id: string | null;
  title: string;
  subject: string;
  difficulty_level: string;
  estimated_duration_minutes: number;
  short_description: string;
  status: LessonStatus;
  modules: LessonModuleDraft[];
}

export type SaveState = 'idle' | 'saving' | 'saved' | 'unsaved' | 'error';

interface LessonEditorState {
  lesson: LessonDraft;
  saveState: SaveState;
  lastSavedAt: Date | null;
  saveError: string | null;
  loading: boolean;
}

const blankLesson: LessonDraft = {
  id: null,
  title: '',
  subject: '',
  difficulty_level: 'BEGINNER',
  estimated_duration_minutes: 0,
  short_description: '',
  status: 'DRAFT',
  modules: [],
};

const initialState: LessonEditorState = {
  lesson: blankLesson,
  saveState: 'idle',
  lastSavedAt: null,
  saveError: null,
  loading: false,
};

const isPersisted = (lesson: LessonDraft): lesson is LessonDraft & { id: string } =>
  typeof lesson.id === 'string' && lesson.id.length > 0;

export const LessonEditorStore = signalStore(
  { providedIn: 'root' },
  withState<LessonEditorState>(initialState),
  withComputed((state) => ({
    isDirty: computed(() => state.saveState() === 'unsaved'),
    canPublish: computed(() => {
      const l = state.lesson();
      return (
        l.title.trim().length > 0 &&
        l.subject.trim().length > 0 &&
        l.estimated_duration_minutes > 0 &&
        l.modules.length > 0
      );
    }),
  })),
  withMethods((store, http = inject(HttpClient), apiBase = inject(USER_PLATFORM_API_URL)) => {
    const markUnsaved = () => patchState(store, { saveState: 'unsaved' });

    const persist = (lesson: LessonDraft, onComplete?: (saved: LessonDraft) => void): void => {
      patchState(store, { saveState: 'saving', saveError: null });
      const url = isPersisted(lesson)
        ? `${apiBase}/teachers/lessons/${lesson.id}`
        : `${apiBase}/teachers/lessons`;


      const stream$: Observable<LessonDraft> = isPersisted(lesson)
        ? http.put<LessonDraft>(url, lesson)
        : http.post<LessonDraft>(url, lesson);
      stream$.subscribe({
        next: (saved) => {
          patchState(store, {
            lesson: { ...saved, modules: saved.modules ?? lesson.modules },
            saveState: 'saved',
            lastSavedAt: new Date(),
          });
          onComplete?.(saved);
        },
        error: (err: unknown) => {
          const message = err instanceof Error ? err.message : 'Save failed';
          patchState(store, { saveState: 'error', saveError: message });
        },
      });
    };

    return {
      reset(lesson?: Partial<LessonDraft>) {
        patchState(store, {
          ...initialState,
          lesson: { ...blankLesson, ...(lesson ?? {}) },
        });
      },

      loadLesson(id: string) {
        patchState(store, { loading: true });
        http.get<LessonDraft>(`${apiBase}/teachers/lessons/${id}`).subscribe({
          next: (lesson) => {
            patchState(store, {
              lesson: { ...lesson, modules: lesson.modules ?? [] },
              loading: false,
              saveState: 'saved',
              lastSavedAt: new Date(),
            });
          },
          error: (err: unknown) => {
            const message = err instanceof Error ? err.message : 'Failed to load lesson';
            patchState(store, { loading: false, saveError: message });
          },
        });
      },

      updateMetadata(patch: Partial<Pick<LessonDraft, 'title' | 'subject' | 'difficulty_level' | 'estimated_duration_minutes' | 'short_description'>>) {
        patchState(store, (s) => ({ lesson: { ...s.lesson, ...patch } }));
        markUnsaved();
      },

      addModule() {
        const id = `module-${crypto.randomUUID()}`;
        patchState(store, (s) => ({
          lesson: {
            ...s.lesson,
            modules: [
              ...s.lesson.modules,
              { id, title: 'New Module', type: 'text', content: '' } satisfies LessonModuleDraft,
            ],
          },
        }));
        markUnsaved();
      },

      updateModule(id: string, patch: Partial<LessonModuleDraft>) {
        patchState(store, (s) => ({
          lesson: {
            ...s.lesson,
            modules: s.lesson.modules.map((m) => (m.id === id ? { ...m, ...patch } : m)),
          },
        }));
        markUnsaved();
      },

      removeModule(id: string) {
        patchState(store, (s) => ({
          lesson: {
            ...s.lesson,
            modules: s.lesson.modules.filter((m) => m.id !== id),
          },
        }));
        markUnsaved();
      },

      reorderModules(fromIndex: number, toIndex: number) {
        patchState(store, (s) => {
          const next = [...s.lesson.modules];
          const [item] = next.splice(fromIndex, 1);
          next.splice(toIndex, 0, item);
          return { lesson: { ...s.lesson, modules: next } };
        });
        markUnsaved();
      },

      save(onComplete?: (saved: LessonDraft) => void): void {
        persist(store.lesson(), onComplete);
      },

      publish(onComplete?: (saved: LessonDraft) => void): void {
        const lesson = store.lesson();
        const callPublish = (id: string, base: LessonDraft) => {
          patchState(store, { saveState: 'saving', saveError: null });
          http
            .post<LessonDraft>(`${apiBase}/teachers/lessons/${id}/publish`, {})
            .subscribe({
              next: (published) => {
                const next = { ...published, modules: published.modules ?? base.modules };
                patchState(store, {
                  lesson: next,
                  saveState: 'saved',
                  lastSavedAt: new Date(),
                });
                onComplete?.(next);
              },
              error: (err: unknown) => {
                const message = err instanceof Error ? err.message : 'Publish failed';
                patchState(store, { saveState: 'error', saveError: message });
              },
            });
        };

        if (!isPersisted(lesson)) {
          persist(lesson, (saved) => {
            if (isPersisted(saved)) callPublish(saved.id, saved);
          });
          return;
        }
        callPublish(lesson.id, lesson);
      },

      unpublish(onComplete?: (saved: LessonDraft) => void): void {
        const lesson = store.lesson();
        if (!isPersisted(lesson)) return;
        patchState(store, { saveState: 'saving', saveError: null });
        http
          .post<LessonDraft>(`${apiBase}/teachers/lessons/${lesson.id}/unpublish`, {})
          .subscribe({
            next: (updated) => {
              const next = { ...updated, modules: updated.modules ?? lesson.modules };
              patchState(store, {
                lesson: next,
                saveState: 'saved',
                lastSavedAt: new Date(),
              });
              onComplete?.(next);
            },
            error: (err: unknown) => {
              const message = err instanceof Error ? err.message : 'Unpublish failed';
              patchState(store, { saveState: 'error', saveError: message });
            },
          });
      },
    };
  }),
);
