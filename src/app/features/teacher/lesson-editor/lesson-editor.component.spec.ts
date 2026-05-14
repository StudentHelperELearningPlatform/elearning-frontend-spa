import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';
import { LessonEditorComponent } from './lesson-editor.component';
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
    store.reset();
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
    store.reset();
    const postSpy = vi.spyOn(http, 'post').mockReturnValue(of({ id: 'x' }));
    const putSpy = vi.spyOn(http, 'put').mockReturnValue(of({ id: 'x' }));
    component.autoSaveTick();
    expect(postSpy).not.toHaveBeenCalled();
    expect(putSpy).not.toHaveBeenCalled();
  });

  it('auto-save tick saves when the store is dirty', () => {
    const postSpy = vi.spyOn(http, 'post').mockReturnValue(of({ id: 'new-1' }));
    store.updateMetadata({ title: 'Changed' });
    component.autoSaveTick();
    expect(postSpy).toHaveBeenCalled();
  });

  // ── Validation ───────────────────────────────────────────────────────────
  it('publish without title/subject/grade/modules is rejected (canPublish=false)', () => {
    const patchSpy = vi.spyOn(http, 'patch').mockReturnValue(of({ id: 'x' }));
    store.reset();
    component['onPublishClicked']();
    expect(patchSpy).not.toHaveBeenCalled();
  });
});
