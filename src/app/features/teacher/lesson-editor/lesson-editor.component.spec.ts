import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { LessonEditorComponent, AUTO_SAVE_DEBOUNCE_MS } from './lesson-editor.component';
import { LessonEditorStore, LessonModuleDraft } from '../state/lesson-editor.store';
import { provideApiMocks } from '../../../../test-utils/api-testing';

describe('LessonEditorComponent', () => {
  let fixture: ComponentFixture<LessonEditorComponent>;
  let component: LessonEditorComponent;
  let store: InstanceType<typeof LessonEditorStore>;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonEditorComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideAnimationsAsync(),
        provideApiMocks(),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } },
        },
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonEditorComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(LessonEditorStore);
    http = TestBed.inject(HttpClient);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers(); // Ensure timer mocking doesn't leak to other tests
    store?.reset();
  });

  // ── CanDeactivate ────────────────────────────────────────────────────────
  it('hasUnsavedChanges is false on a clean store', () => {
    store.reset();
    expect(component.hasUnsavedChanges()).toBe(false);
  });

  it('hasUnsavedChanges becomes true after a metadata edit', () => {
    store.updateMetadata({ title: 'Changed' });
    expect(component.hasUnsavedChanges()).toBe(true);
  });

  // ── Initialization & Auto-save tick logic ────────────────────────────────
  it('loads a lesson on init if ID is provided in route', () => {
    const route = TestBed.inject(ActivatedRoute);
    vi.spyOn(route.snapshot.paramMap, 'get').mockReturnValue('123');
    const loadSpy = vi.spyOn(store, 'loadLesson').mockImplementation(() => undefined);

    component.ngOnInit();
    expect(loadSpy).toHaveBeenCalledWith('123');
  });

  it('auto-save tick does not call save when nothing is dirty', () => {
    vi.useFakeTimers();
    store.reset();

    const saveSpy = vi.spyOn(store, 'save').mockResolvedValue(undefined);

    vi.advanceTimersByTime(AUTO_SAVE_DEBOUNCE_MS);
    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('auto-save tick saves when the store is dirty', () => {
    vi.useFakeTimers();
    const saveSpy = vi.spyOn(store, 'save').mockResolvedValue(undefined);

    // Trigger a change to simulate user typing, prompting autoSave$.next()
    component['metaForm'].patchValue({ title: 'Changed' });

    vi.advanceTimersByTime(AUTO_SAVE_DEBOUNCE_MS);
    expect(saveSpy).toHaveBeenCalled();
  });

  // ── Module Event Handlers ────────────────────────────────────────────────
  it('onAddModule calls store and triggers autosave', () => {
    vi.useFakeTimers();
    const storeSpy = vi.spyOn(store, 'addModule');
    const saveSpy = vi.spyOn(store, 'save').mockResolvedValue(undefined);

    component['onAddModule']();

    expect(storeSpy).toHaveBeenCalled();
    vi.advanceTimersByTime(AUTO_SAVE_DEBOUNCE_MS);
    expect(saveSpy).toHaveBeenCalled();
  });

  it('onModuleBlur immediately calls save', () => {
    const saveSpy = vi.spyOn(store, 'save').mockResolvedValue(undefined);
    component['onModuleBlur']();
    expect(saveSpy).toHaveBeenCalled();
  });

  it('onModuleTitleChange updates store and triggers autosave', () => {
    vi.useFakeTimers();
    const updateSpy = vi.spyOn(store, 'updateModule');
    const saveSpy = vi.spyOn(store, 'save').mockResolvedValue(undefined);

    component['onModuleTitleChange']('1', { target: { value: 'New Title' } } as unknown as Event);

    expect(updateSpy).toHaveBeenCalledWith('1', { title: 'New Title' });
    vi.advanceTimersByTime(AUTO_SAVE_DEBOUNCE_MS);
    expect(saveSpy).toHaveBeenCalled();
  });

  it('onModuleTypeChange updates store and triggers autosave', () => {
    vi.useFakeTimers();
    const updateSpy = vi.spyOn(store, 'updateModule');
    const saveSpy = vi.spyOn(store, 'save').mockResolvedValue(undefined);

    component['onModuleTypeChange']('1', { target: { value: 'video' } } as unknown as Event);

    expect(updateSpy).toHaveBeenCalledWith('1', { type: 'video' });
    vi.advanceTimersByTime(AUTO_SAVE_DEBOUNCE_MS);
    expect(saveSpy).toHaveBeenCalled();
  });

  it('onModuleContentChange updates store and triggers autosave', () => {
    vi.useFakeTimers();
    const updateSpy = vi.spyOn(store, 'updateModule');
    const saveSpy = vi.spyOn(store, 'save').mockResolvedValue(undefined);

    component['onModuleContentChange']('1', '<p>Test</p>');

    expect(updateSpy).toHaveBeenCalledWith('1', { content: '<p>Test</p>' });
    vi.advanceTimersByTime(AUTO_SAVE_DEBOUNCE_MS);
    expect(saveSpy).toHaveBeenCalled();
  });

  it('confirmRemove deletes module if confirmed', () => {
    const confirmSpy = vi.spyOn(globalThis, 'confirm').mockReturnValue(true);
    const removeSpy = vi.spyOn(store, 'removeModule');

    component['confirmRemove']('module-1');

    expect(confirmSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalledWith('module-1');
  });

  it('confirmRemove does nothing if declined', () => {
    const confirmSpy = vi.spyOn(globalThis, 'confirm').mockReturnValue(false);
    const removeSpy = vi.spyOn(store, 'removeModule');

    component['confirmRemove']('module-1');

    expect(confirmSpy).toHaveBeenCalled();
    expect(removeSpy).not.toHaveBeenCalled();
  });

  it('onModuleDrop reorders modules if indexes differ', () => {
    const reorderSpy = vi.spyOn(store, 'reorderModules');
    component['onModuleDrop']({ previousIndex: 0, currentIndex: 1 } as CdkDragDrop<
      LessonModuleDraft[]
    >);
    expect(reorderSpy).toHaveBeenCalledWith(0, 1);
  });

  it('onModuleDrop does nothing if index is the same', () => {
    const reorderSpy = vi.spyOn(store, 'reorderModules');
    component['onModuleDrop']({ previousIndex: 1, currentIndex: 1 } as CdkDragDrop<
      LessonModuleDraft[]
    >);
    expect(reorderSpy).not.toHaveBeenCalled();
  });

  it('toggleCollapsed switches the collapsed state', () => {
    expect(component['isCollapsed']('1')).toBe(false);
    component['toggleCollapsed']('1');
    expect(component['isCollapsed']('1')).toBe(true);
    component['toggleCollapsed']('1');
    expect(component['isCollapsed']('1')).toBe(false);
  });

  // ── Publishing & Modals ──────────────────────────────────────────────────
  it('publish without title/subject/grade/modules is rejected (canPublish=false)', () => {
    const postSpy = vi.spyOn(http, 'post').mockReturnValue(of({ id: 'x' }));
    store.reset();
    component['onPublishClicked']();
    expect(postSpy).not.toHaveBeenCalled();
  });

  it('onPublishClicked delegates to store.publish if confirmed', () => {
    vi.spyOn(globalThis, 'confirm').mockReturnValue(true);
    vi.spyOn(store, 'canPublish').mockReturnValue(true);
    const publishSpy = vi.spyOn(store, 'publish').mockResolvedValue(undefined);

    component['onPublishClicked']();
    expect(publishSpy).toHaveBeenCalled();
  });

  it('onPublishClicked aborts if confirm is declined', () => {
    vi.spyOn(globalThis, 'confirm').mockReturnValue(false);
    vi.spyOn(store, 'canPublish').mockReturnValue(true);
    const publishSpy = vi.spyOn(store, 'publish');

    component['onPublishClicked']();
    expect(publishSpy).not.toHaveBeenCalled();
  });

  it('onUnpublish delegates to store.unpublish if confirmed', () => {
    vi.spyOn(globalThis, 'confirm').mockReturnValue(true);
    const unpublishSpy = vi.spyOn(store, 'unpublish');

    component['onUnpublish']();
    expect(unpublishSpy).toHaveBeenCalled();
  });

  it('openCheckQuiz displays alert and calls save if unpersisted/new module', () => {
    const alertSpy = vi.spyOn(globalThis, 'alert').mockImplementation(() => undefined);
    const saveSpy = vi.spyOn(store, 'save').mockResolvedValue(undefined);

    component['openCheckQuiz']('module-1234');

    expect(alertSpy).toHaveBeenCalled();
    expect(saveSpy).toHaveBeenCalled();
    expect(component['activeCheckQuizModuleId']()).toBe(null);
  });

  it('openCheckQuiz sets activeCheckQuizModuleId for persisted module', () => {
    store.reset({
      id: 'lesson-123',
      title: 'X',
      subject: 'Math',
      difficulty_level: 'BEGINNER',
      estimated_duration_minutes: 10,
      short_description: '',
      status: 'DRAFT',
      modules: [],
    });

    component['openCheckQuiz']('persisted-module-id');
    expect(component['activeCheckQuizModuleId']()).toBe('persisted-module-id');
  });

  it('closeCheckQuiz nullifies activeCheckQuizModuleId', () => {
    component['activeCheckQuizModuleId'].set('123');
    component['closeCheckQuiz']();
    expect(component['activeCheckQuizModuleId']()).toBe(null);
  });

  it('onSaveDraft manually triggers save', () => {
    const saveSpy = vi.spyOn(store, 'save').mockResolvedValue(undefined);
    component['onSaveDraft']();
    expect(saveSpy).toHaveBeenCalled();
  });
});
