import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { LessonEditorComponent, AUTO_SAVE_DEBOUNCE_MS } from './lesson-editor.component';
import { LessonEditorStore } from '../state/lesson-editor.store';
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

  // ── Auto-save tick logic ─────────────────────────────────────────────────
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

  // ── Validation ───────────────────────────────────────────────────────────
  it('publish without title/subject/grade/modules is rejected (canPublish=false)', () => {
    const postSpy = vi.spyOn(http, 'post').mockReturnValue(of({ id: 'x' }));
    store.reset();
    component['onPublishClicked']();
    expect(postSpy).not.toHaveBeenCalled();
  });
});
