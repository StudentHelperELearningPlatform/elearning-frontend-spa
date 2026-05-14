import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONTENT_API_URL } from '@core/tokens/api.token';
import { lastValueFrom } from 'rxjs'; // ADDED for async/await orchestration

export type ModuleType = 'text' | 'video' | 'image' | 'audio' | 'quiz' | 'interactive';
export type LessonStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface LessonModuleDraft {
  id: string; // Maps to Subcapitol ID
  title: string;
  type: ModuleType;
  content: string;
  mediaUrls?: string[];
  blockId?: string; // NEW: We must track the specific text block ID for PUT requests
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

// POST payload — matches CreateLessonRequest
const toCreatePayload = (lesson: LessonDraft) => ({
  title: lesson.title,
  subject: lesson.subject,
  difficultyLevel: lesson.difficulty_level,
  estimatedDurationMinutes: lesson.estimated_duration_minutes || 30,
  shortDescription: lesson.short_description,
  subcapitols: lesson.modules.length > 0
    ? lesson.modules.map((m, idx) => ({ title: m.title, orderIndex: idx + 1 }))
    : [{ title: 'Introduction', orderIndex: 1 }], 
});

// PUT payload — matches UpdateLessonRequest
const toUpdatePayload = (lesson: LessonDraft) => ({
  title: lesson.title,
  subject: lesson.subject,
  difficultyLevel: lesson.difficulty_level,
  estimatedDurationMinutes: lesson.estimated_duration_minutes || 30,
  shortDescription: lesson.short_description,
});

// UPDATED: Correctly maps Subcapitols -> ContentBlocks to preserve text!
const mapFromResponse = (saved: Record<string, any>, fallbackModules: LessonModuleDraft[]): LessonDraft => ({
  id: saved['id'] as string,
  title: saved['title'] as string,
  subject: saved['subject'] as string,
  difficulty_level: (saved['difficultyLevel'] ?? saved['difficulty_level']) as string,
  estimated_duration_minutes: (saved['estimatedDurationMinutes'] ?? saved['estimated_duration_minutes']) as number,
  short_description: (saved['shortDescription'] ?? saved['short_description']) as string,
  status: saved['status'] as LessonStatus,
  
  modules: ((saved['subcapitols'] ?? saved['modules']) as any[])?.map((s: any, idx: number) => {
    const fallback = fallbackModules.find(fm => fm.id === s.id || fm.title === s.title);
    
    // BACKEND CONTRACT: Text is now isolated inside the `blocks` array
    const textBlock = (s.blocks || []).find((b: any) => b.blockType === 'TEXT' || b.blockType === 'text');

    return {
      id: s.id ?? fallback?.id ?? `module-${idx}`,
      title: s.title || fallback?.title || '',
      type: 'text' as ModuleType,
      // Favor the frontend draft if no textblock exists yet, otherwise use backend content
      content: fallback?.content || textBlock?.content || '',
      blockId: textBlock?.id ?? fallback?.blockId, // Persist the Block ID
    };
  }) ?? fallbackModules,
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

    // REFACTORED: Complete orchestration to match Backend relational schema
    const persist = async (lessonToSave: LessonDraft): Promise<LessonDraft> => {
      patchState(store, { saveState: 'saving', saveError: null });

      let lessonId = lessonToSave.id;
      let currentModules = [...lessonToSave.modules];

      // 1. Save Core Metadata
      if (!lessonId) {
        const createRes: any = await lastValueFrom(http.post(`${apiBase}/lessons`, toCreatePayload(lessonToSave)));
        lessonId = createRes.id;
        
        // Map auto-generated Subcapitol IDs back to our frontend drafts
        const createdSubcapitols = createRes.subcapitols || [];
        currentModules = currentModules.map((mod, index) => {
          const matchedSub = createdSubcapitols[index];
          return matchedSub ? { ...mod, id: matchedSub.id } : mod;
        });
      } else {
        await lastValueFrom(http.put(`${apiBase}/lessons/${lessonId}`, toUpdatePayload(lessonToSave)));
      }

      const updatedModules: LessonModuleDraft[] = [];

      // 2. Process Subcapitols & Text Blocks
      for (const mod of currentModules) {
        const isNewSubcapitol = mod.id.startsWith('module-');
        let subcapitolId = mod.id;
        let blockId = mod.blockId;

        // Ensure we don't send purely empty strings to strict backends
        const safeContent = mod.content.trim().length > 0 ? mod.content : ' ';

        if (isNewSubcapitol) {
          // POST new Subcapitol
          const subRes: any = await lastValueFrom(http.post(`${apiBase}/lessons/${lessonId}/subcapitols`, { title: mod.title }));
          subcapitolId = subRes.id;

          // POST new Text Block associated with the Subcapitol
          const blockRes: any = await lastValueFrom(http.post(`${apiBase}/subcapitols/${subcapitolId}/blocks`, {
            blockType: 'TEXT',
            content: safeContent,
            mediaId: null,
            languageTag: 'ro',
            codeLanguage: null
          }));
          blockId = blockRes.id;
        } else {
          // PUT update existing Subcapitol title
          await lastValueFrom(http.put(`${apiBase}/subcapitols/${subcapitolId}`, { title: mod.title }));

          if (blockId) {
            // PUT update existing Block text
            await lastValueFrom(http.put(`${apiBase}/blocks/${blockId}`, {
              content: safeContent,
              codeLanguage: null,
              mediaId: null
            }));
          } else {
            // Fallback: If for some reason we have a Subcapitol but no Block, create one
            try {
              const blockRes: any = await lastValueFrom(http.post(`${apiBase}/subcapitols/${subcapitolId}/blocks`, {
                blockType: 'TEXT',
                content: safeContent,
                mediaId: null,
                languageTag: 'ro',
                codeLanguage: null
              }));
              blockId = blockRes.id;
            } catch (e) {
              console.error('Failed to fallback create block', e);
            }
          }
        }
        updatedModules.push({ ...mod, id: subcapitolId, blockId });
      }

      // 3. Reorder Subcapitols to match UI
      if (updatedModules.length > 0) {
        const orderedIds = updatedModules.map(m => m.id);
        await lastValueFrom(http.put(`${apiBase}/lessons/${lessonId}/subcapitols/reorder`, { orderedIds }));
      }

      // 4. Fetch the fully enriched lesson to refresh state accurately
      const enrichedLesson: any = await lastValueFrom(http.get(`${apiBase}/lessons/${lessonId}`));
      const finalLessonState = mapFromResponse(enrichedLesson, updatedModules);
      
      patchState(store, { lesson: finalLessonState, saveState: 'saved', lastSavedAt: new Date() });
      return finalLessonState;
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
              lesson: mapFromResponse(saved as Record<string, unknown>, []),
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
              { id, title: 'New Module', type: 'text', content: '', blockId: undefined } satisfies LessonModuleDraft,
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

      async removeModule(id: string) {
        // Optimistic UI update
        patchState(store, (s) => ({
          lesson: {
            ...s.lesson,
            modules: s.lesson.modules.filter((m) => m.id !== id),
          },
        }));

        // If the module was actually saved to the backend, trigger the DELETE call
        if (!id.startsWith('module-')) {
          try {
            await lastValueFrom(http.delete(`${apiBase}/subcapitols/${id}`));
          } catch (e) {
            console.error('Failed to delete subcapitol on backend', e);
          }
        }
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

      async save(onComplete?: (saved: LessonDraft) => void) {
        try {
          const savedLesson = await persist(store.lesson());
          if (onComplete) onComplete(savedLesson);
        } catch (err: any) {
          const message = err?.message || 'Save failed';
          patchState(store, { saveState: 'error', saveError: message });
        }
      },

      async publish(onComplete?: (saved: LessonDraft) => void) {
        try {
          patchState(store, { saveState: 'saving', saveError: null });
          const lesson = store.lesson();

          // 1. Ensure all drafts are synced to backend first
          const savedLesson = await persist(lesson);

          // 2. Fire the publish endpoint
          const published: any = await lastValueFrom(http.post(`${apiBase}/lessons/${savedLesson.id}/publish`, {}));

          const next = mapFromResponse(published, savedLesson.modules);
          patchState(store, { lesson: next, saveState: 'saved', lastSavedAt: new Date() });
          
          if (onComplete) onComplete(next);
        } catch (err: any) {
          const message = err?.message || 'Publish failed';
          patchState(store, { saveState: 'error', saveError: message });
        }
      },

      unpublish(onComplete?: (saved: LessonDraft) => void) {
        const lesson = store.lesson();
        if (!isPersisted(lesson)) return;
        patchState(store, { saveState: 'saving', saveError: null });
        
        http.post<unknown>(`${apiBase}/lessons/${lesson.id}/unpublish`, {}).subscribe({
          next: (updated) => {
            const next = mapFromResponse(updated as Record<string, unknown>, lesson.modules);
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