import { HttpClient, HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { LessonEditorStore } from './lesson-editor.store';
import { provideApiMocks } from '../../../../test-utils/api-testing';

describe('LessonEditorStore', () => {
  const getStore = () => TestBed.inject(LessonEditorStore);
  let store: ReturnType<typeof getStore>;
  let http: HttpClient;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        ...provideApiMocks(),
      ],
    });
    store = getStore();
    http = TestBed.inject(HttpClient);
    messageService = TestBed.inject(MessageService);
    vi.spyOn(messageService, 'add').mockImplementation(() => undefined);

    // Default universal fallback mocks to prevent unhandled requests from hanging provideHttpClientTesting
    vi.spyOn(http, 'get').mockReturnValue(of({}));
    vi.spyOn(http, 'post').mockReturnValue(of({}));
    vi.spyOn(http, 'put').mockReturnValue(of({}));
    vi.spyOn(http, 'delete').mockReturnValue(of({}));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ── Initial state ────────────────────────────────────────────────────────
  it('starts with a blank lesson', () => {
    expect(store.lesson()).toEqual({
      id: null,
      title: '',
      subject: '',
      difficulty_level: 'BEGINNER',
      estimated_duration_minutes: 0,
      short_description: '',
      status: 'DRAFT',
      modules: [],
    });
    expect(store.saveState()).toBe('idle');
  });

  // ── canPublish validation ────────────────────────────────────────────────
  it('canPublish is false until title, subject, duration and at least one module are present', () => {
    expect(store.canPublish()).toBe(false);
    store.updateMetadata({ title: 'X' });
    expect(store.canPublish()).toBe(false);
    store.updateMetadata({ subject: 'Math' });
    expect(store.canPublish()).toBe(false);
    store.updateMetadata({ estimated_duration_minutes: 15 });
    expect(store.canPublish()).toBe(false);
    store.addModule();
    expect(store.canPublish()).toBe(true);
  });

  it('canPublish becomes false again when the only module is removed', () => {
    store.updateMetadata({ title: 'X', subject: 'Math', estimated_duration_minutes: 15 });
    store.addModule();
    expect(store.canPublish()).toBe(true);
    const id = store.lesson().modules[0].id;
    store.removeModule(id);
    expect(store.canPublish()).toBe(false);
  });

  // ── isDirty marker ───────────────────────────────────────────────────────
  it('updateMetadata flips saveState to "unsaved"', () => {
    store.updateMetadata({ title: 'X' });
    expect(store.saveState()).toBe('unsaved');
    expect(store.isDirty()).toBe(true);
  });

  it('addModule and reorderModules also mark unsaved', () => {
    store.addModule();
    expect(store.isDirty()).toBe(true);
  });

  // ── SonarQube Target: Error Parsing Fallbacks ────────────────────────────
  it('parses structured backend errors properly on save', async () => {
    const errorResponse = new HttpErrorResponse({
      error: { title: 'Title cannot be empty' },
      status: 400,
    });
    vi.spyOn(http, 'post').mockReturnValue(throwError(() => errorResponse));

    store.updateMetadata({ title: 'X' });
    await store.save();

    expect(store.saveState()).toBe('error');
    expect(store.saveError()).toContain('title: Title cannot be empty');
    expect(messageService.add).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
  });

  it('parses string backend errors properly on loadLesson', () => {
    const errorResponse = new HttpErrorResponse({
      error: { error: 'Lesson not found' },
      status: 404,
    });
    vi.spyOn(http, 'get').mockReturnValue(throwError(() => errorResponse));

    store.loadLesson('123');

    expect(store.saveError()).toBe('Lesson not found');
    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ summary: 'Load Failed', detail: 'Lesson not found' }),
    );
  });

  it('parses unexpected or raw string/generic errors into fallback responses', async () => {
    const stringErrorResponse = new HttpErrorResponse({
      error: 'Direct string database failure',
      status: 500,
    });
    vi.spyOn(http, 'post').mockReturnValue(throwError(() => stringErrorResponse));
    await store.save();
    expect(store.saveError()).toBe('Direct string database failure');

    vi.spyOn(http, 'post').mockReturnValue(throwError(() => new Error('Custom JS Exception')));
    await store.save();
    expect(store.saveError()).toBe('Custom JS Exception');

    vi.spyOn(http, 'post').mockReturnValue(throwError(() => ({})));
    await store.save();
    expect(store.saveError()).toBe('An unexpected error occurred');
  });

  // ── save (POST when no id, PUT when id present) ──────────────────────────
  it('save POSTs to /api/v1/lessons when lesson has no id', async () => {
    const spy = vi.spyOn(http, 'post').mockReturnValue(of({ id: 'new-1' }));
    vi.spyOn(http, 'get').mockReturnValue(of({ id: 'new-1', title: 'X' }));

    store.updateMetadata({ title: 'X' });
    await store.save();

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('/lessons'),
      expect.objectContaining({ title: 'X' }),
    );
  });

  it('save PUTs to /api/v1/lessons/:id once a lesson has been loaded', async () => {
    vi.spyOn(http, 'get').mockReturnValue(
      of({
        id: 'existing-1',
        title: 'Loaded',
        subject: 'Math',
        grade: 5,
        description: '',
        status: 'DRAFT',
        modules: [],
      }),
    );
    store.loadLesson('existing-1');

    const putSpy = vi.spyOn(http, 'put').mockReturnValue(of({ id: 'existing-1' }));
    store.updateMetadata({ title: 'Edited' });
    await store.save();

    expect(putSpy).toHaveBeenCalledWith(
      expect.stringContaining('/lessons/existing-1'),
      expect.objectContaining({ title: 'Edited' }),
    );
  });

  it('save sets saveState to "saved" and updates lastSavedAt on success', async () => {
    vi.spyOn(http, 'post').mockReturnValue(of({ id: 'new-1', title: 'X' }));
    vi.spyOn(http, 'get').mockReturnValue(of({ id: 'new-1', title: 'X' }));

    store.updateMetadata({ title: 'X' });
    await store.save();

    expect(store.saveState()).toBe('saved');
    expect(store.lastSavedAt()).toBeInstanceOf(Date);
    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success' }),
    );
  });

  // ── SonarQube Target: payload fallbacks for blank inputs & empty modules ─
  it('uses default fallback values when payload inputs are blank strings', async () => {
    const postSpy = vi
      .spyOn(http, 'post')
      .mockReturnValue(of({ id: 'fallback-lesson-id', subcapitols: [] }));
    vi.spyOn(http, 'get').mockReturnValue(
      of({
        id: 'fallback-lesson-id',
        title: 'Untitled Lesson',
        subject: 'General',
        status: 'DRAFT',
        subcapitols: [],
      }),
    );

    store.reset({
      title: '   ',
      subject: '',
      difficulty_level: '',
      modules: [],
    });

    await store.save();

    expect(postSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        title: 'Untitled Lesson',
        subject: 'General',
        difficultyLevel: 'BEGINNER',
        subcapitols: [{ title: 'Introduction', orderIndex: 1 }],
      }),
    );
  });

  it('uses default module title fallback inside map functions', async () => {
    const postSpy = vi.spyOn(http, 'post').mockImplementation((url) => {
      if (url.endsWith('/lessons')) {
        return of({ id: 'fallback-lesson-id', subcapitols: [{ id: 's-1' }] });
      }
      return of({ id: 's-1' });
    });
    vi.spyOn(http, 'get').mockReturnValue(
      of({
        id: 'fallback-lesson-id',
        title: 'A',
        subject: 'B',
        status: 'DRAFT',
        subcapitols: [{ id: 's-1', title: 'Untitled Module' }],
      }),
    );

    store.reset({
      title: 'A',
      subject: 'B',
      difficulty_level: 'BEGINNER',
      modules: [{ id: 'module-temp-1', title: '   ', type: 'text', content: '' }],
    });

    await store.save();

    expect(postSpy).toHaveBeenCalledWith(
      expect.stringContaining('/lessons'),
      expect.objectContaining({
        subcapitols: [{ title: 'Untitled Module', orderIndex: 1 }],
      }),
    );
  });

  it('uses fallbacks in toUpdatePayload for empty metadata values', async () => {
    vi.spyOn(http, 'get').mockReturnValue(
      of({ id: 'existing-id', title: 'Old', subject: 'Old', status: 'DRAFT', subcapitols: [] }),
    );
    store.loadLesson('existing-id');

    const putSpy = vi.spyOn(http, 'put').mockReturnValue(of({}));
    store.updateMetadata({ title: '', subject: '   ', difficulty_level: '' });

    await store.save();

    expect(putSpy).toHaveBeenCalledWith(
      expect.stringContaining('/lessons/existing-id'),
      expect.objectContaining({
        title: 'Untitled Lesson',
        subject: 'General',
        difficultyLevel: 'BEGINNER',
      }),
    );
  });

  // ── SonarQube Target: mapFromResponse fallbacks & block types ────────────
  it('maps text blocks with lowercase text type and fallback modules in mapFromResponse', () => {
    const mockBackendPayload = {
      id: 'lesson-999',
      title: 'Title',
      subject: 'Subject',
      difficultyLevel: 'ADVANCED',
      estimatedDurationMinutes: 60,
      shortDescription: null,
      status: 'DRAFT',
      subcapitols: [
        {
          id: 'sub-999',
          title: '',
          blocks: [
            {
              id: 'block-999',
              blockType: 'text',
              content: 'Lower Content',
            },
          ],
        },
        {
          blocks: null,
        },
      ],
    };

    vi.spyOn(http, 'get').mockReturnValue(of(mockBackendPayload));
    store.loadLesson('lesson-999');

    const mappedLesson = store.lesson();
    expect(mappedLesson.modules[0].content).toBe('Lower Content');
    expect(mappedLesson.modules[1].id).toBe('module-1');
    expect(mappedLesson.modules[1].title).toBe('');
    expect(mappedLesson.modules[1].content).toBe('');
  });

  it('falls back to local client state attributes if response properties are null', async () => {
    store.reset({
      id: 'lesson-777',
      title: 'Valid Title',
      subject: 'Valid Subject',
      difficulty_level: 'BEGINNER',
      status: 'DRAFT',
      modules: [
        {
          id: 'sub-777',
          title: 'Client Title',
          type: 'text',
          content: 'Client Content',
          blockId: 'b-777',
        },
      ],
    });

    vi.spyOn(http, 'put').mockReturnValue(of({}));
    vi.spyOn(http, 'get').mockReturnValue(
      of({
        id: 'lesson-777',
        title: 'Valid Title',
        subject: 'Valid Subject',
        status: 'DRAFT',
        subcapitols: [
          {
            id: 'sub-777',
            title: null,
            blocks: null,
          },
        ],
      }),
    );

    await store.save();

    const modulesState = store.lesson().modules;
    expect(modulesState[0].title).toBe('Client Title');
    expect(modulesState[0].content).toBe('Client Content');
    expect(modulesState[0].blockId).toBe('b-777');
  });

  // ── SonarQube Target: matchedSub branch & subcapitol loop scenarios ─────
  it('handles matched client subcapitols if backend returns asymmetric subcapitols list', async () => {
    store.reset({
      id: null,
      title: 'A',
      subject: 'B',
      difficulty_level: 'BEGINNER',
      status: 'DRAFT',
      modules: [{ id: 'module-temp-99', title: 'M1', type: 'text', content: 'C1' }],
    });

    vi.spyOn(http, 'post').mockImplementation((url) => {
      if (url.endsWith('/lessons')) {
        return of({ id: 'lesson-unique', subcapitols: [] });
      }
      return of({ id: 'sub-newly-built' });
    });

    vi.spyOn(http, 'get').mockReturnValue(
      of({
        id: 'lesson-unique',
        title: 'A',
        subject: 'B',
        status: 'DRAFT',
        subcapitols: [],
      }),
    );

    await store.save();
    expect(store.saveState()).toBe('saved');
  });

  it('updates existing subcapitols with or without blocks, including fallback handles', async () => {
    const putSpy = vi.spyOn(http, 'put').mockReturnValue(of({}));
    const postSpy = vi.spyOn(http, 'post').mockImplementation((url) => {
      if (url.includes('/blocks')) return of({ id: 'fallback-block-uuid' });
      return of({});
    });
    vi.spyOn(http, 'get').mockReturnValue(
      of({
        id: 'lesson-1',
        title: 'A',
        subject: 'B',
        status: 'DRAFT',
        subcapitols: [],
      }),
    );

    // Branch: blockId exists -> calls put
    store.reset({
      id: 'lesson-1',
      title: 'A',
      subject: 'B',
      difficulty_level: 'BEGINNER',
      status: 'DRAFT',
      modules: [
        {
          id: 'sub-persisted',
          title: 'M1',
          type: 'text',
          content: 'Text',
          blockId: 'block-persisted',
        },
      ],
    });
    await store.save();
    expect(putSpy).toHaveBeenCalledWith(
      expect.stringContaining('/blocks/block-persisted'),
      expect.any(Object),
    );

    // Branch: blockId missing -> calls post to create block
    store.reset({
      id: 'lesson-1',
      title: 'A',
      subject: 'B',
      difficulty_level: 'BEGINNER',
      status: 'DRAFT',
      modules: [
        { id: 'sub-persisted', title: 'M1', type: 'text', content: 'Text', blockId: undefined },
      ],
    });
    await store.save();
    expect(postSpy).toHaveBeenCalledWith(
      expect.stringContaining('/subcapitols/sub-persisted/blocks'),
      expect.any(Object),
    );

    // Branch: blockId missing -> post fails and logs console error gracefully
    // FIX: Re-seed the store with an unpersisted module block to ensure loop execution
    store.reset({
      id: 'lesson-1',
      title: 'A',
      subject: 'B',
      difficulty_level: 'BEGINNER',
      status: 'DRAFT',
      modules: [
        { id: 'sub-persisted', title: 'M1', type: 'text', content: 'Text', blockId: undefined },
      ],
    });
    const errorConsoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.spyOn(http, 'post').mockImplementation((url) => {
      if (url.includes('/blocks')) return throwError(() => new Error('Post Block Error'));
      return of({});
    });
    await store.save();
    expect(errorConsoleSpy).toHaveBeenCalledWith(
      'Failed to fallback create block',
      expect.any(Error),
    );
  });

  // ── updateModule ─────────────────────────────────────────────────────────
  it('updateModule patches an existing module properties', () => {
    store.addModule();
    const moduleId = store.lesson().modules[0].id;
    store.updateModule(moduleId, { title: 'Updated Title', content: 'New Content' });

    const updated = store.lesson().modules.find((m) => m.id === moduleId);
    expect(updated?.title).toBe('Updated Title');
    expect(updated?.content).toBe('New Content');
    expect(store.isDirty()).toBe(true);
  });

  // ── SonarQube Target: removeModule failure fallback ──────────────────────
  it('removeModule deletes subcapitol on the backend if it has a real UUID', async () => {
    const deleteSpy = vi.spyOn(http, 'delete').mockReturnValue(of({}));

    store.reset({
      id: 'lesson-1',
      title: 'X',
      subject: 'Y',
      difficulty_level: 'BEGINNER',
      estimated_duration_minutes: 10,
      short_description: '',
      status: 'DRAFT',
      modules: [{ id: 'real-uuid', title: 'M', type: 'text', content: 'C' }],
    });

    await store.removeModule('real-uuid');

    expect(store.lesson().modules.length).toBe(0);
    expect(deleteSpy).toHaveBeenCalledWith(expect.stringContaining('/subcapitols/real-uuid'));
  });

  it('catches and handles exceptions if backend delete request fails inside removeModule', async () => {
    const errorConsoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.spyOn(http, 'delete').mockReturnValue(throwError(() => new Error('Delete Crash')));

    store.reset({
      id: 'lesson-1',
      title: 'X',
      subject: 'Y',
      difficulty_level: 'BEGINNER',
      status: 'DRAFT',
      modules: [{ id: 'active-uuid', title: 'M', type: 'text', content: 'C' }],
    });

    await store.removeModule('active-uuid');

    expect(store.lesson().modules.length).toBe(0);
    expect(errorConsoleSpy).toHaveBeenCalledWith(
      'Failed to delete subcapitol on backend',
      expect.any(Error),
    );
  });

  // ── SonarQube Target: publish rejections and catches ─────────────────────
  it('publish marks lesson as PUBLISHED and updates state', async () => {
    vi.spyOn(http, 'post').mockReturnValue(of({ id: 'lesson-1', title: 'X', status: 'PUBLISHED' }));
    vi.spyOn(http, 'put').mockReturnValue(of({}));
    vi.spyOn(http, 'get').mockReturnValue(of({ id: 'lesson-1', title: 'X', status: 'PUBLISHED' }));

    store.reset({
      id: 'lesson-1',
      title: 'X',
      subject: 'Math',
      estimated_duration_minutes: 10,
      status: 'DRAFT',
      difficulty_level: 'BEGINNER',
      short_description: '',
      modules: [{ id: 'module-1', title: 'M', type: 'text', content: 'c' }],
    });

    await store.publish();

    expect(store.lesson().status).toBe('PUBLISHED');
    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ summary: 'Published' }),
    );
  });

  it('handles publish rejections and network errors correctly', async () => {
    store.reset({
      id: 'lesson-1',
      title: 'X',
      subject: 'Math',
      estimated_duration_minutes: 10,
      status: 'DRAFT',
      difficulty_level: 'BEGINNER',
      short_description: '',
      modules: [{ id: 'module-1', title: 'M', type: 'text', content: 'c' }],
    });

    vi.spyOn(http, 'put').mockReturnValue(of({}));
    vi.spyOn(http, 'post').mockReturnValue(throwError(() => new Error('Publish Failed Exception')));

    await store.publish();

    expect(store.saveState()).toBe('error');
    expect(store.saveError()).toBe('Publish Failed Exception');
    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ summary: 'Publish Failed' }),
    );
  });

  // ── SonarQube Target: unpublish rejections and catches ───────────────────
  it('unpublish marks lesson as DRAFT and updates state', () => {
    vi.spyOn(http, 'post').mockReturnValue(of({ id: 'lesson-1', title: 'X', status: 'DRAFT' }));
    store.reset({
      id: 'lesson-1',
      title: 'X',
      subject: 'Math',
      estimated_duration_minutes: 10,
      status: 'PUBLISHED',
      difficulty_level: 'BEGINNER',
      short_description: '',
      modules: [{ id: 'module-1', title: 'M', type: 'text', content: 'c' }],
    });

    store.unpublish();

    expect(store.lesson().status).toBe('DRAFT');
    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ summary: 'Unpublished' }),
    );
  });

  it('handles unpublish rejections and error responses correctly', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Unpublish Blocked',
      status: 400,
    });
    vi.spyOn(http, 'post').mockReturnValue(throwError(() => errorResponse));

    store.reset({
      id: 'lesson-1',
      title: 'X',
      subject: 'Math',
      status: 'PUBLISHED',
    });

    store.unpublish();

    expect(store.saveState()).toBe('error');
    expect(store.saveError()).toBe('Unpublish Blocked');
    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ summary: 'Unpublish Failed' }),
    );
  });

  // ── reorder ──────────────────────────────────────────────────────────────
  it('reorderModules moves a module from one index to another', () => {
    store.addModule();
    store.addModule();
    const ids = store.lesson().modules.map((m) => m.id);
    store.reorderModules(0, 1);
    expect(store.lesson().modules.map((m) => m.id)).toEqual([ids[1], ids[0]]);
  });

  // ── reset ────────────────────────────────────────────────────────────────
  it('reset returns the store to a blank lesson', () => {
    store.updateMetadata({ title: 'Dirty' });
    store.reset();
    expect(store.lesson().title).toBe('');
    expect(store.saveState()).toBe('idle');
  });
});
