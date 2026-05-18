import { ComponentFixture, TestBed } from '@angular/core/testing';
import { patchStore } from '../../../../test-utils/patch-store';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { LessonViewerComponent } from './lesson-viewer.component';
import { LessonsStore, Lesson } from '../store/lessons.store';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CardComponent } from '@shared/components/card/card.component';
import { provideApiMocks } from '../../../../test-utils/api-testing';
import { AuthStore } from '../../auth/store/auth.store';
import { createAuthStoreStub } from '../../../../test-utils/auth-testing';
import { By } from '@angular/platform-browser';
import { ErrorStateComponent } from '@shared/components/error-state/error-state.component';

const MOCK_LESSON: Lesson = {
  id: '1',
  title: 'Intro to Fractions',
  subject: 'Math',
  grade: 5,
  difficulty: 'Easy',
  duration: '15 min',
  status: 'Not Started',
  description: 'A mock lesson description',
  subcapitols: [
    {
      id: 'sub1',
      title: 'Chapter 1',
      orderIndex: 0,
      blocks: [
        { id: 'm1', title: 'Module 1', type: 'text', content: '<p>Hello world</p>' },
        {
          id: 'm2',
          title: 'Module 2',
          type: 'video',
          content: 'Video content',
          mediaUrl: 'https://example.com/vid.mp4',
        },
      ],
    },
    {
      id: 'sub2',
      title: 'Chapter 2',
      orderIndex: 1,
      blocks: [{ id: 'm3', title: 'Module 3', type: 'text', content: '<p>Last module</p>' }],
    },
  ],
  modules: [
    { id: 'm1', title: 'Module 1', type: 'text', content: '<p>Hello world</p>' },
    {
      id: 'm2',
      title: 'Module 2',
      type: 'video',
      content: 'Video content',
      mediaUrl: 'https://example.com/vid.mp4',
    },
    { id: 'm3', title: 'Module 3', type: 'text', content: '<p>Last module</p>' },
  ],
};

describe('LessonViewerComponent', () => {
  let component: LessonViewerComponent;
  let fixture: ComponentFixture<LessonViewerComponent>;
  let store: InstanceType<typeof LessonsStore>;
  let router: Router;
  let authStore: ReturnType<typeof createAuthStoreStub>;

  beforeEach(async () => {
    authStore = createAuthStoreStub({ isAuthenticated: true });

    await TestBed.configureTestingModule({
      imports: [LessonViewerComponent, ButtonComponent, CardComponent],
      providers: [
        provideRouter([]),
        { provide: AuthStore, useValue: authStore },
        ...provideApiMocks(),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(LessonsStore);
    router = TestBed.inject(Router);
    vi.spyOn(store, 'loadLesson').mockImplementation(() => undefined);
    vi.spyOn(store, 'loadFinalQuizAttempts').mockImplementation(() => undefined);
    patchStore(store, { currentLesson: MOCK_LESSON, loading: false });
    fixture = TestBed.createComponent(LessonViewerComponent);
    component = fixture.componentInstance; // Deliberately skipping initial fixture.detectChanges() here to prevent NG0100
    // and give complete test isolation for signal/store setup.
  });
  afterEach(() => {
    vi.restoreAllMocks();
  }); // ─── Lifecycle & Setup ───────────────────────────────────────────────────
  it('creates without errors', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.hasAccess()).toBe(true);
  });
  it('calls loadLesson and loadFinalQuizAttempts on init', () => {
    fixture.detectChanges(); // Triggers ngOnInit
    expect(store.loadLesson).toHaveBeenCalledWith('1');
    expect(store.loadFinalQuizAttempts).toHaveBeenCalledWith('1');
  });

  it('clears completion state on destroy', () => {
    fixture.detectChanges();
    const spy = vi.spyOn(store, 'clearCompletionState');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  // ─── Checkout & Unlocks ──────────────────────────────────────────────────

  it('unlockLesson opens the checkout modal', () => {
    fixture.detectChanges();
    const checkoutOpen = (
      component as unknown as { checkoutOpen: { (): boolean; set: (v: boolean) => void } }
    ).checkoutOpen;
    expect(checkoutOpen()).toBe(false);
    component.unlockLesson();
    expect(checkoutOpen()).toBe(true);
  });

  // ─── Renders & Error States ─────────────────────────────────────────────

  it('displays the lesson title in the sidebar header', () => {
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Intro to Fractions');
  });

  it('shows not-found empty state when error kind is not-found', async () => {
    patchStore(store, { error: { kind: 'not-found', message: 'Missing' } as unknown as Error });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Lesson not found');
  });

  it('shows generic error state and allows retry', async () => {
    patchStore(store, { error: { message: 'Network failure' } as unknown as Error });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const errorStateElement = fixture.debugElement.query(By.directive(ErrorStateComponent));
    expect(errorStateElement.nativeElement.textContent).toContain('Could not load lesson');

    const reloadSpy = vi.spyOn(component, 'reloadLesson');
    errorStateElement.triggerEventHandler('retryClick', null);
    expect(reloadSpy).toHaveBeenCalled();
  });

  it('shows empty state when no module is available but data is loaded', async () => {
    patchStore(store, { currentLesson: { ...MOCK_LESSON, modules: [] } });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Select a Module');
  });

  // ─── Module Selection & Indexing ─────────────────────────────────────────

  it('currentModule returns the first module by default', () => {
    fixture.detectChanges();
    expect(component.currentModule()).toEqual(MOCK_LESSON.modules[0]);
  });

  it('selectModule updates currentModuleIndex', () => {
    fixture.detectChanges();
    component.selectModule(2);
    expect(component.currentModuleIndex()).toBe(2);
  });

  it('getGlobalIndex returns correct index across subcapitols', () => {
    fixture.detectChanges();
    const sub2 = MOCK_LESSON.subcapitols![1];
    const m3 = sub2.blocks[0];
    expect(component.getGlobalIndex(sub2, m3)).toBe(2);
  });

  it('getGlobalIndex returns -1 if lesson or subcapitol not found', () => {
    fixture.detectChanges();
    patchStore(store, { currentLesson: null });
    expect(component.getGlobalIndex(MOCK_LESSON.subcapitols![0], MOCK_LESSON.modules[0])).toBe(-1);
  });

  // ─── Next / Prev / Complete Modules ──────────────────────────────────────

  it('nextModule marks module complete and advances index', () => {
    fixture.detectChanges();
    const spy = vi.spyOn(store, 'markModuleComplete').mockImplementation(() => {
      /* mock */
    });
    component.selectModule(0);
    component.nextModule();
    expect(spy).toHaveBeenCalledWith('1', 'm1');
    expect(component.currentModuleIndex()).toBe(1);
  });

  it('nextModule marks module complete but does not advance past last module', () => {
    fixture.detectChanges();
    const spy = vi.spyOn(store, 'markModuleComplete').mockImplementation(() => {
      /* mock */
    });
    component.selectModule(2);
    component.nextModule();
    expect(spy).toHaveBeenCalledWith('1', 'm3');
    expect(component.currentModuleIndex()).toBe(2);
  });

  it('previousModule decrements the index by 1', () => {
    fixture.detectChanges();
    component.selectModule(2);
    component.previousModule();
    expect(component.currentModuleIndex()).toBe(1);
  });

  it('completeLastModule marks the module complete and navigates to the final quiz player', () => {
    fixture.detectChanges();
    const spy = vi.spyOn(store, 'markModuleComplete').mockImplementation(() => {
      /* mock */
    });
    const routerSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.selectModule(2);
    component.completeLastModule();
    expect(spy).toHaveBeenCalledWith('1', 'm3');
    expect(routerSpy).toHaveBeenCalledWith(['/student/quiz-player', '1']);
  });

  // ─── Navigation helpers ────────────────────────────────────────────────────

  it('goBack navigates to /student/lessons', () => {
    fixture.detectChanges();
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.goBack();
    expect(spy).toHaveBeenCalledWith(['/student/lessons']);
  });

  it('finishLesson navigates to /student/lessons', () => {
    fixture.detectChanges();
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.finishLesson();
    expect(spy).toHaveBeenCalledWith(['/student/lessons']);
  });

  it('startFinalQuiz navigates to quiz player', () => {
    fixture.detectChanges();
    patchStore(store, { currentLesson: MOCK_LESSON });
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.startFinalQuiz();
    expect(spy).toHaveBeenCalledWith(['/student/quiz-player', '1']);
  });

  // ─── Loading skeleton ─────────────────────────────────────────────────────

  it('shows animate-pulse skeleton when loading is true', () => {
    patchStore(store, { loading: true });
    fixture.detectChanges();
    const skeleton = (fixture.nativeElement as HTMLElement).querySelector('.animate-pulse');
    expect(skeleton).toBeTruthy();
  });

  // ─── Final Quiz CTA Banner ────────────────────────────────────────────────

  it('does not show Final Quiz banner when not all modules are complete', () => {
    patchStore(store, {
      currentLesson: MOCK_LESSON,
      completedModuleIds: new Set(['m1']),
    });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[data-testid="quiz-completed-banner"]')).toBeFalsy();
    expect(element.textContent).not.toContain('Take Final Quiz');
  });

  it('shows "Start Final Quiz" CTA when all modules complete and no previous attempt', () => {
    patchStore(store, {
      currentLesson: MOCK_LESSON,
      completedModuleIds: new Set(['m1', 'm2', 'm3']),
      finalQuizAttempts: [],
    });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Start Final Quiz');
  });

  it('shows quiz completed banner with score when there is a previous attempt', () => {
    patchStore(store, {
      currentLesson: MOCK_LESSON,
      completedModuleIds: new Set(['m1', 'm2', 'm3']),
      finalQuizAttempts: [
        {
          attemptId: 'a1',
          score: 9,
          totalPoints: 10,
          percentage: 90,
          passed: true,
          submittedAt: '',
        },
      ],
    });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[data-testid="quiz-completed-banner"]')).toBeTruthy();
    expect(element.textContent).toContain('Final Quiz Completed!');
    expect(element.textContent).toContain('90%');
    expect(element.textContent).toContain('Retake Quiz');
  });
});
