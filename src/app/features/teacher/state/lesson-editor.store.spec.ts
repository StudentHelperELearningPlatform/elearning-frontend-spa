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

  // ── Error Parsing ────────────────────────────────────────────────────────
  it('parses structured backend errors properly on save', async () => {
    // FIX: Using the correct expected error shape { title: string } instead of { error: { title: string } }
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

  // ── removeModule ─────────────────────────────────────────────────────────
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

  // ── publish / unpublish ──────────────────────────────────────────────────
  it('publish marks lesson as PUBLISHED and updates state', async () => {
    vi.spyOn(http, 'post').mockReturnValue(of({ id: 'lesson-1', title: 'X', status: 'PUBLISHED' }));
    // FIX: mock `put` to prevent hanging during module updates loop inside `persist`
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
