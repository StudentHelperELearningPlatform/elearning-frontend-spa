import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { LessonEditorStore } from './lesson-editor.store';
import { provideApiMocks } from '../../../../test-utils/api-testing';

describe('LessonEditorStore', () => {
  const getStore = () => TestBed.inject(LessonEditorStore);
  let store: ReturnType<typeof getStore>;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ...provideApiMocks()],
    });
    store = getStore();
    http = TestBed.inject(HttpClient);
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

  // ── save (POST when no id, PUT when id present) ──────────────────────────
  it('save POSTs to /api/v1/lessons when lesson has no id', async () => {
    const spy = vi.spyOn(http, 'post').mockReturnValue(of({ id: 'new-1' }));
    vi.spyOn(http, 'get').mockReturnValue(of({ id: 'new-1', title: 'X' }));
    store.updateMetadata({ title: 'X' });
    await store.save();

    // Check against endpoint segments to be robust
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
  });

  it('save sets saveState to "error" on failure', async () => {
    vi.spyOn(http, 'post').mockReturnValue(throwError(() => new Error('boom')));
    store.updateMetadata({ title: 'X' });
    await store.save();

    expect(store.saveState()).toBe('error');
    expect(store.saveError()).toBe('boom');
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
