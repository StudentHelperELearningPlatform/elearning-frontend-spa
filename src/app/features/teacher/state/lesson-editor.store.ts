import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CONTENT_API_URL } from '@core/tokens/api.token';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { UploadedMedia } from '../lesson-editor/media-upload/media-upload.component';

export type ModuleType = 'text' | 'video' | 'image' | 'audio' | 'quiz' | 'interactive';
export type LessonStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface LessonModuleDraft {
  id: string;
  title: string;
  type: ModuleType;
  content: string;
  media?: UploadedMedia[];
  blockId?: string;
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

const toCreatePayload = (lesson: LessonDraft) => ({
  title: lesson.title.trim() ? lesson.title : 'Untitled Lesson',
  subject: lesson.subject.trim() ? lesson.subject : 'General',
  difficultyLevel: lesson.difficulty_level || 'BEGINNER',
  estimatedDurationMinutes: lesson.estimated_duration_minutes || 30,
  shortDescription: lesson.short_description || '',
  subcapitols:
    lesson.modules.length > 0
      ? lesson.modules.map((module, index) => ({
          title: module.title.trim() ? module.title : 'Untitled Module',
          orderIndex: index + 1,
        }))
      : [{ title: 'Introduction', orderIndex: 1 }],
});

const toUpdatePayload = (lesson: LessonDraft) => ({
  title: lesson.title.trim() ? lesson.title : 'Untitled Lesson',
  subject: lesson.subject.trim() ? lesson.subject : 'General',
  difficultyLevel: lesson.difficulty_level || 'BEGINNER',
  estimatedDurationMinutes: lesson.estimated_duration_minutes || 30,
  shortDescription: lesson.short_description || '',
});

const getStringValue = (source: Record<string, unknown>, keys: string[], fallback = ''): string => {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }

  return fallback;
};

const resolveMediaType = (data: {
  mimeType?: string;
  mediaType?: string;
  blockType?: string;
  url?: string;
  name?: string;
}): 'image' | 'video' | 'pdf' => {
  const mimeType = (data.mimeType || '').toLowerCase();
  const mediaType = (data.mediaType || '').toLowerCase();
  const blockType = (data.blockType || '').toLowerCase();
  const url = (data.url || '').toLowerCase();
  const name = (data.name || '').toLowerCase();

  if (
    mimeType === 'application/pdf' ||
    mediaType === 'file' ||
    blockType === 'file' ||
    url.endsWith('.pdf') ||
    name.endsWith('.pdf')
  ) {
    return 'pdf';
  }

  if (
    mimeType.startsWith('video/') ||
    mediaType === 'video' ||
    blockType === 'video' ||
    url.endsWith('.mp4') ||
    name.endsWith('.mp4')
  ) {
    return 'video';
  }

  return 'image';
};

const toBackendBlockType = (media: UploadedMedia): 'IMAGE' | 'VIDEO' | 'FILE' => {
  if (media.type === 'image') {
    return 'IMAGE';
  }

  if (media.type === 'video') {
    return 'VIDEO';
  }

  return 'FILE';
};

const serializeMediaContent = (media: UploadedMedia): string => {
  return JSON.stringify({
    name: media.name,
    url: media.url,
    type: media.type,
    mediaId: media.id,
  });
};

const parseMediaContent = (
  content: unknown,
): {
  name: string;
  url: string;
  type?: 'image' | 'video' | 'pdf';
  mediaId?: string;
} => {
  if (typeof content !== 'string') {
    return {
      name: 'Uploaded media',
      url: '',
    };
  }

  try {
    const parsed = JSON.parse(content) as {
      name?: string;
      url?: string;
      type?: 'image' | 'video' | 'pdf';
      mediaId?: string;
    };

    return {
      name: parsed.name || 'Uploaded media',
      url: parsed.url || '',
      type: parsed.type,
      mediaId: parsed.mediaId,
    };
  } catch {
    return {
      name: content,
      url: '',
    };
  }
};

const mapFromResponse = (
  saved: Record<string, unknown>,
  fallbackModules: LessonModuleDraft[],
): LessonDraft => ({
  id: saved['id'] as string,
  title: saved['title'] as string,
  subject: saved['subject'] as string,
  difficulty_level: (saved['difficultyLevel'] ?? saved['difficulty_level']) as string,
  estimated_duration_minutes: (saved['estimatedDurationMinutes'] ??
    saved['estimated_duration_minutes']) as number,
  short_description: (saved['shortDescription'] ?? saved['short_description'] ?? '') as string,
  status: saved['status'] as LessonStatus,

  modules:
    ((saved['subcapitols'] ?? saved['modules']) as Record<string, unknown>[])?.map(
      (subcapitol: Record<string, unknown>, index: number) => {
        const fallback = fallbackModules.find(
          (module) => module.id === subcapitol['id'] || module.title === subcapitol['title'],
        );

        const blocks = ((subcapitol['blocks'] as Record<string, unknown>[]) || []) as Record<
          string,
          unknown
        >[];

        const textBlock = blocks.find((block) => {
          const blockType = block['blockType'] ?? block['block_type'];
          return blockType === 'TEXT' || blockType === 'text';
        });

        const mediaBlocks = blocks.filter((block) => {
          const blockType = block['blockType'] ?? block['block_type'];

          return (
            blockType === 'IMAGE' ||
            blockType === 'VIDEO' ||
            blockType === 'FILE' ||
            blockType === 'image' ||
            blockType === 'video' ||
            blockType === 'file' ||
            !!block['mediaId'] ||
            !!block['media_id']
          );
        });

        const media = mediaBlocks
          .map((block) => {
            const nestedMedia = (block['media'] || block['mediaAsset']) as
              | Record<string, unknown>
              | undefined;

            const parsedContent = parseMediaContent(block['content']);
            const blockType = getStringValue(block, ['blockType', 'block_type']);

            const mediaId =
              getStringValue(block, ['mediaId', 'media_id']) ||
              parsedContent.mediaId ||
              (nestedMedia ? getStringValue(nestedMedia, ['id']) : '');

            const fallbackMedia = fallback?.media?.find((item) => {
              return (
                item.id === mediaId ||
                item.mediaBlockId === block['id'] ||
                item.name === parsedContent.name
              );
            });

            const backendUrl =
              getStringValue(block, ['mediaUrl', 'url']) ||
              parsedContent.url ||
              (nestedMedia ? getStringValue(nestedMedia, ['url']) : '');

            const url = backendUrl || fallbackMedia?.url || '';

            const name =
              parsedContent.name ||
              getStringValue(block, [
                'mediaOriginalFilename',
                'originalFilename',
                'fileName',
                'content',
              ]) ||
              fallbackMedia?.name ||
              'Uploaded media';

            const mimeType =
              getStringValue(block, ['mediaMimeType', 'mimeType']) ||
              (nestedMedia ? getStringValue(nestedMedia, ['mimeType']) : '');

            const backendMediaType =
              getStringValue(block, ['mediaType']) ||
              (nestedMedia ? getStringValue(nestedMedia, ['mediaType']) : '');

            return {
              id: mediaId || fallbackMedia?.id || '',
              url,
              name,
              type:
                parsedContent.type ||
                fallbackMedia?.type ||
                resolveMediaType({
                  mimeType,
                  mediaType: backendMediaType,
                  blockType,
                  url,
                  name,
                }),
              progress: 100,
              status: 'complete' as const,
              mediaBlockId: (block['id'] as string) || fallbackMedia?.mediaBlockId,
              file: fallbackMedia?.file,
            };
          })
          .filter((mediaItem) => mediaItem.id.length > 0);

        return {
          id: (subcapitol['id'] as string) ?? fallback?.id ?? `module-${index}`,
          title: (subcapitol['title'] as string) || fallback?.title || '',
          type: 'text' as ModuleType,
          content: (textBlock?.['content'] as string) ?? fallback?.content ?? '',
          blockId: (textBlock?.['id'] as string) ?? fallback?.blockId,
          media: media.length > 0 ? media : fallback?.media ?? [],
        };
      },
    ) ?? fallbackModules,
});

export const LessonEditorStore = signalStore(
  { providedIn: 'root' },
  withState<LessonEditorState>(initialState),
  withComputed((state) => ({
    isDirty: computed(() => state.saveState() === 'unsaved'),

    canSave: computed(() => {
      const lesson = state.lesson();
      return lesson.modules.every((module) => (module.content || '').trim().length > 0);
    }),

    canPublish: computed(() => {
      const lesson = state.lesson();

      return (
        (lesson.title || '').trim().length > 0 &&
        (lesson.subject || '').trim().length > 0 &&
        lesson.estimated_duration_minutes > 0 &&
        lesson.modules.length > 0 &&
        lesson.modules.every((module) => (module.content || '').trim().length > 0)
      );
    }),
  })),
  withMethods(
    (
      store,
      http = inject(HttpClient),
      apiBase = inject(CONTENT_API_URL),
      messageService = inject(MessageService, { optional: true }),
    ) => {
      const markUnsaved = () => patchState(store, { saveState: 'unsaved' });

      const parseBackendError = (err: unknown): string => {
        if (err instanceof HttpErrorResponse && err.error) {
          if (err.error.error && typeof err.error.error === 'string') {
            return err.error.error;
          }

          if (typeof err.error === 'object' && err.error !== null) {
            const messages = Object.entries(err.error as Record<string, unknown>)
              .filter(([, msg]) => typeof msg === 'string')
              .map(([field, msg]) => `${field}: ${msg}`);

            if (messages.length > 0) {
              return messages.join(' | ');
            }
          }

          if (typeof err.error === 'string') {
            return err.error;
          }
        }

        return (err as Error)?.message || 'An unexpected error occurred';
      };

      const hasUploadingMedia = (lesson: LessonDraft): boolean =>
        lesson.modules.some((module) =>
          (module.media || []).some((media) => media.status === 'uploading'),
        );

      const persist = async (lessonToSave: LessonDraft): Promise<LessonDraft> => {
        patchState(store, { saveState: 'saving', saveError: null });

        let lessonId = lessonToSave.id;
        let currentModules = [...lessonToSave.modules];

        if (!lessonId) {
          const createRes = (await lastValueFrom(
            http.post(`${apiBase}/lessons`, toCreatePayload(lessonToSave)),
          )) as Record<string, unknown>;

          lessonId = createRes['id'] as string;

          const createdSubcapitols = (createRes['subcapitols'] as Record<string, unknown>[]) || [];

          currentModules = currentModules.map((module, index) => {
            const matchedSubcapitol = createdSubcapitols[index];

            return matchedSubcapitol
              ? {
                  ...module,
                  id: matchedSubcapitol['id'] as string,
                }
              : module;
          });
        } else {
          await lastValueFrom(
            http.put(`${apiBase}/lessons/${lessonId}`, toUpdatePayload(lessonToSave)),
          );
        }

        const updatedModules: LessonModuleDraft[] = [];

        for (const module of currentModules) {
          const isNewSubcapitol = module.id.startsWith('module-');

          let subcapitolId = module.id;
          let blockId = module.blockId;

          const safeContent = (module.content || '').trim().length > 0 ? module.content : ' ';
          const safeTitle =
            (module.title || '').trim().length > 0 ? module.title : 'Untitled Module';

          if (isNewSubcapitol) {
            const subcapitolResponse = (await lastValueFrom(
              http.post(`${apiBase}/lessons/${lessonId}/subcapitols`, {
                title: safeTitle,
              }),
            )) as Record<string, unknown>;

            subcapitolId = subcapitolResponse['id'] as string;

            const blockResponse = (await lastValueFrom(
              http.post(`${apiBase}/subcapitols/${subcapitolId}/blocks`, {
                blockType: 'TEXT',
                content: safeContent,
                mediaId: null,
                languageTag: 'ro',
                codeLanguage: null,
              }),
            )) as Record<string, unknown>;

            blockId = blockResponse['id'] as string;
          } else {
            await lastValueFrom(
              http.put(`${apiBase}/subcapitols/${subcapitolId}`, {
                title: safeTitle,
              }),
            );

            if (blockId) {
              await lastValueFrom(
                http.put(`${apiBase}/blocks/${blockId}`, {
                  content: safeContent,
                  codeLanguage: null,
                  mediaId: null,
                }),
              );
            } else {
              const blockResponse = (await lastValueFrom(
                http.post(`${apiBase}/subcapitols/${subcapitolId}/blocks`, {
                  blockType: 'TEXT',
                  content: safeContent,
                  mediaId: null,
                  languageTag: 'ro',
                  codeLanguage: null,
                }),
              )) as Record<string, unknown>;

              blockId = blockResponse['id'] as string;
            }
          }

          const completedMedia = (module.media || []).filter(
            (media) => media.status === 'complete',
          );

          const updatedMedia: UploadedMedia[] = [];

          for (const media of completedMedia) {
            if (media.mediaBlockId) {
              await lastValueFrom(
                http.put(`${apiBase}/blocks/${media.mediaBlockId}`, {
                  content: serializeMediaContent(media),
                  codeLanguage: null,
                  mediaId: media.id,
                }),
              );

              updatedMedia.push(media);
            } else {
              const mediaBlockResponse = (await lastValueFrom(
                http.post(`${apiBase}/subcapitols/${subcapitolId}/blocks`, {
                  blockType: toBackendBlockType(media),
                  content: serializeMediaContent(media),
                  mediaId: media.id,
                  languageTag: 'ro',
                  codeLanguage: null,
                }),
              )) as Record<string, unknown>;

              updatedMedia.push({
                ...media,
                mediaBlockId: mediaBlockResponse['id'] as string,
              });
            }
          }

          updatedModules.push({
            ...module,
            id: subcapitolId,
            blockId,
            media: updatedMedia,
          });
        }

        if (updatedModules.length > 0) {
          const orderedIds = updatedModules.map((module) => module.id);

          await lastValueFrom(
            http.put(`${apiBase}/lessons/${lessonId}/subcapitols/reorder`, {
              orderedIds,
            }),
          );
        }

        const enrichedLesson = (await lastValueFrom(
          http.get(`${apiBase}/lessons/${lessonId}`),
        )) as Record<string, unknown>;

        const finalLessonState = mapFromResponse(enrichedLesson, updatedModules);

        patchState(store, {
          lesson: finalLessonState,
          saveState: 'saved',
          lastSavedAt: new Date(),
        });

        return finalLessonState;
      };

      return {
        reset(lesson?: Partial<LessonDraft>) {
          patchState(store, {
            ...initialState,
            lesson: {
              ...blankLesson,
              ...(lesson ?? {}),
            },
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
              const message = parseBackendError(err);

              patchState(store, {
                loading: false,
                saveError: message,
                saveState: 'error',
              });
            },
          });
        },

        updateMetadata(
          patch: Partial<
            Pick<
              LessonDraft,
              | 'title'
              | 'subject'
              | 'difficulty_level'
              | 'estimated_duration_minutes'
              | 'short_description'
            >
          >,
        ) {
          patchState(store, (state) => ({
            lesson: {
              ...state.lesson,
              ...patch,
            },
          }));

          markUnsaved();
        },

        addModule() {
          const id = `module-${crypto.randomUUID()}`;

          const newModule: LessonModuleDraft = {
            id,
            title: 'New Module',
            type: 'text',
            content: '',
            media: [],
            blockId: undefined,
          };

          patchState(store, (state) => ({
            lesson: {
              ...state.lesson,
              modules: [...state.lesson.modules, newModule],
            },
          }));

          markUnsaved();
        },

        updateModule(id: string, patch: Partial<LessonModuleDraft>) {
          patchState(store, (state) => ({
            lesson: {
              ...state.lesson,
              modules: state.lesson.modules.map((module) =>
                module.id === id
                  ? {
                      ...module,
                      ...patch,
                    }
                  : module,
              ),
            },
          }));

          markUnsaved();
        },

        async removeMediaBlock(media: UploadedMedia) {
          if (!media.mediaBlockId) {
            return;
          }

          try {
            await lastValueFrom(http.delete(`${apiBase}/blocks/${media.mediaBlockId}`));
          } catch (error) {
            console.error('Failed to delete media block', error);
          }

          markUnsaved();
        },

        async removeModule(id: string) {
          patchState(store, (state) => ({
            lesson: {
              ...state.lesson,
              modules: state.lesson.modules.filter((module) => module.id !== id),
            },
          }));

          if (!id.startsWith('module-')) {
            try {
              await lastValueFrom(http.delete(`${apiBase}/subcapitols/${id}`));
            } catch (error) {
              console.error('Failed to delete subcapitol on backend', error);
            }
          }

          markUnsaved();
        },

        reorderModules(fromIndex: number, toIndex: number) {
          patchState(store, (state) => {
            const nextModules = [...state.lesson.modules];
            const [movedModule] = nextModules.splice(fromIndex, 1);

            nextModules.splice(toIndex, 0, movedModule);

            return {
              lesson: {
                ...state.lesson,
                modules: nextModules,
              },
            };
          });

          markUnsaved();
        },

        async save(onComplete?: (saved: LessonDraft) => void, background = false) {
          const lesson = store.lesson();

          if (hasUploadingMedia(lesson)) {
            if (!background) {
              messageService?.add({
                severity: 'info',
                summary: 'Upload in progress',
                detail: 'Please wait until all media uploads finish before saving.',
              });
            }

            return;
          }

          if (!store.canSave()) {
            if (!background) {
              const message = 'Cannot save: All modules must have content.';

              patchState(store, {
                saveState: 'error',
                saveError: message,
              });

              messageService?.add({
                severity: 'warn',
                summary: 'Validation Error',
                detail: message,
              });
            }

            return;
          }

          try {
            const savedLesson = await persist(store.lesson());

            messageService?.add({
              severity: 'success',
              summary: 'Saved',
              detail: 'Saved successfully.',
            });

            if (onComplete) {
              onComplete(savedLesson);
            }
          } catch (err: unknown) {
            const message = parseBackendError(err);

            patchState(store, {
              saveState: 'error',
              saveError: message,
            });
          }
        },

        async publish(onComplete?: (saved: LessonDraft) => void) {
          const lesson = store.lesson();

          if (hasUploadingMedia(lesson)) {
            messageService?.add({
              severity: 'info',
              summary: 'Upload in progress',
              detail: 'Please wait until all media uploads finish before publishing.',
            });

            return;
          }

          try {
            patchState(store, {
              saveState: 'saving',
              saveError: null,
            });

            const savedLesson = await persist(store.lesson());

            const published = (await lastValueFrom(
              http.post(`${apiBase}/lessons/${savedLesson.id}/publish`, {}),
            )) as Record<string, unknown>;

            const next = mapFromResponse(published, savedLesson.modules);

            patchState(store, {
              lesson: next,
              saveState: 'saved',
              lastSavedAt: new Date(),
            });

            messageService?.add({
              severity: 'success',
              summary: 'Published',
              detail: 'Lesson is now visible to students!',
            });

            if (onComplete) {
              onComplete(next);
            }
          } catch (err: unknown) {
            const message = parseBackendError(err);

            patchState(store, {
              saveState: 'error',
              saveError: message,
            });
          }
        },

        unpublish(onComplete?: (saved: LessonDraft) => void) {
          const lesson = store.lesson();

          if (!isPersisted(lesson)) {
            return;
          }

          patchState(store, {
            saveState: 'saving',
            saveError: null,
          });

          http.post<unknown>(`${apiBase}/lessons/${lesson.id}/unpublish`, {}).subscribe({
            next: (updated) => {
              const next = mapFromResponse(updated as Record<string, unknown>, lesson.modules);

              patchState(store, {
                lesson: next,
                saveState: 'saved',
                lastSavedAt: new Date(),
              });

              messageService?.add({
                severity: 'info',
                summary: 'Unpublished',
                detail: 'Lesson returned to draft status.',
              });

              onComplete?.(next);
            },

            error: (err: unknown) => {
              const message = parseBackendError(err);

              patchState(store, {
                saveState: 'error',
                saveError: message,
              });
            },
          });
        },
      };
    },
  ),
);