import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONTENT_API_URL } from '@core/tokens/api.token';

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

// POST payload — matches ARIANA's CreateLessonRequest exactly
// Requires: title, subject, difficultyLevel, subcapitols (@NotEmpty — at least one)
const toCreatePayload = (lesson: LessonDraft) => ({
  title: lesson.title,
  subject: lesson.subject,
  difficultyLevel: lesson.difficulty_level,
  estimatedDurationMinutes: lesson.estimated_duration_minutes || 30,
  shortDescription: lesson.short_description,
  subcapitols: lesson.modules.length > 0
    ? lesson.modules.map((m, idx) => ({ title: m.title, orderIndex: idx + 1 }))
    : [{ title: 'Introduction', orderIndex: 1 }], // satisfy @NotEmpty validation
});

// PUT payload — matches ARIANA's UpdateLessonRequest exactly
// All fields optional. NO subcapitols (managed via separate subcapitol endpoints).
// NO status (changed only via /publish and /unpublish endpoints).
const toUpdatePayload = (lesson: LessonDraft) => ({
  title: lesson.title,
  subject: lesson.subject,
  difficultyLevel: lesson.difficulty_level,
  estimatedDurationMinutes: lesson.estimated_duration_minutes || 30,
  shortDescription: lesson.short_description,
});

const mapFromResponse = (saved: Record<string, any>, fallbackModules: LessonModuleDraft[]): LessonDraft => ({
  id: saved['id'] as string,
  title: saved['title'] as string,
  subject: saved['subject'] as string,
  difficulty_level: (saved['difficultyLevel'] ?? saved['difficulty_level']) as string,
  estimated_duration_minutes: (saved['estimatedDurationMinutes'] ?? saved['estimated_duration_minutes']) as number,
  short_description: (saved['shortDescription'] ?? saved['short_description']) as string,
  status: saved['status'] as LessonStatus,
  // Backend returns subcapitols — map them to frontend modules
  modules: ((saved['subcapitols'] ?? saved['modules']) as any[])?.map((s: any, idx: number) => ({
    id: (s.id ?? `module-${idx}`) as string,
    title: s.title as string,
    type: 'text' as ModuleType,
    content: (s.content ?? '') as string,
  })) ?? fallbackModules,
});

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
  withMethods((store, http = inject(HttpClient), apiBase = inject(CONTENT_API_URL)) => {
    const markUnsaved = () => patchState(store, { saveState: 'unsaved' });

    const persist = (lesson: LessonDraft, onComplete?: (saved: LessonDraft) => void): void => {
      patchState(store, { saveState: 'saving', saveError: null });

      const url = isPersisted(lesson)
        ? `${apiBase}/lessons/${lesson.id}`
        : `${apiBase}/lessons`;

      // Separate payloads for create vs update — the DTOs have different shapes
      const payload = isPersisted(lesson)
        ? toUpdatePayload(lesson)
        : toCreatePayload(lesson);

      const stream$ = isPersisted(lesson)
        ? http.put<unknown>(url, payload)
        : http.post<unknown>(url, payload);

      stream$.subscribe({
        next: (saved: unknown) => {
          const updatedLesson = mapFromResponse(saved as Record<string, any>, lesson.modules);
          patchState(store, { lesson: updatedLesson, saveState: 'saved', lastSavedAt: new Date() });
          onComplete?.(updatedLesson);
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
        http.get<unknown>(`${apiBase}/lessons/${id}`).subscribe({
          next: (saved) => {
            patchState(store, {
              lesson: mapFromResponse(saved as Record<string, any>, []),
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

      updateMetadata(patch: Partial<Pick<LessonDraft,
        'title' | 'subject' | 'difficulty_level' | 'estimated_duration_minutes' | 'short_description'
      >>) {
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
          http.post<unknown>(`${apiBase}/lessons/${id}/publish`, {}).subscribe({
            next: (published) => {
              const next = mapFromResponse(published as Record<string, any>, base.modules);
              patchState(store, { lesson: next, saveState: 'saved', lastSavedAt: new Date() });
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
        http.post<unknown>(`${apiBase}/lessons/${lesson.id}/unpublish`, {}).subscribe({
          next: (updated) => {
            const next = mapFromResponse(updated as Record<string, any>, lesson.modules);
            patchState(store, { lesson: next, saveState: 'saved', lastSavedAt: new Date() });
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