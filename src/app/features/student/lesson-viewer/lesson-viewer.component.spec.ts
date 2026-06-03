import { ComponentFixture, TestBed } from '@angular/core/testing';
import { patchStore } from '../../../../test-utils/patch-store';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { LessonViewerComponent } from './lesson-viewer.component';
import { LessonsStore, Lesson } from '../store/lessons.store';
import { ProgressStore } from '../store/progress.store';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CardComponent } from '@shared/components/card/card.component';
import { provideApiMocks } from '../../../../test-utils/api-testing';
import { AuthStore } from '../../auth/store/auth.store';
import { createAuthStoreStub } from '../../../../test-utils/auth-testing';
import { By } from '@angular/platform-browser';
import { ErrorStateComponent } from '@shared/components/error-state/error-state.component';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const MOCK_LESSON: Lesson = {
  id: '1',
  title: 'Intro to Fractions',
  subject: 'Math',
  grade: 5,
  difficulty: 'Easy',
  duration: '15 min',
  status: 'Not Started',
  description: 'A mock lesson description',
  // Add pricing fields required by Lesson type
  priceInCents: null,
  currency: 'RON',
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
        MessageService,
        ...provideApiMocks(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(LessonsStore);
    router = TestBed.inject(Router);
    const progressStore = TestBed.inject(ProgressStore);
    vi.spyOn(store, 'loadLesson').mockImplementation(() => void 0);
    vi.spyOn(store, 'loadFinalQuizAttempts').mockImplementation(() => void 0);
    vi.spyOn(progressStore as any, 'loadMyLessonStats').mockImplementation(() => void 0);
    vi.spyOn(progressStore as any, 'markLessonComplete').mockImplementation(() => void 0);
    patchStore(store, { currentLesson: MOCK_LESSON, loading: false });

    patchStore(store, {
      currentLesson: MOCK_LESSON,
      loading: false,
    });

    fixture = TestBed.createComponent(LessonViewerComponent);
    component = fixture.componentInstance;
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
      component as unknown as { checkoutOpen: { (): boolean; set: (value: boolean) => void } }
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
    patchStore(store, {
      error: { kind: 'not-found', message: 'Missing' } as unknown as Error,
    });

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Lesson not found');
  });

  it('shows generic error state and allows retry', async () => {
    patchStore(store, {
      error: { message: 'Network failure' } as unknown as Error,
    });

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
    patchStore(store, {
      currentLesson: {
        ...MOCK_LESSON,
        modules: [],
      },
    });

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

    patchStore(store, {
      currentLesson: null,
    });

    expect(component.getGlobalIndex(MOCK_LESSON.subcapitols![0], MOCK_LESSON.modules[0])).toBe(-1);
  });

  // ─── Next / Prev / Complete Modules ──────────────────────────────────────

  it('nextModule marks module complete and advances index', () => {
    fixture.detectChanges();

    const spy = vi.spyOn(store, 'markModuleComplete').mockImplementation(() => void 0);

    component.selectModule(0);
    component.nextModule();
    expect(spy).toHaveBeenCalledWith('1', 'm1');
    expect(component.currentModuleIndex()).toBe(1);
  });

  it('nextModule marks module complete but does not advance past last module', () => {
    fixture.detectChanges();

    const spy = vi.spyOn(store, 'markModuleComplete').mockImplementation(() => void 0);

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

  it('completeLastModule marks the module complete and navigates to quiz player if final quiz exists', () => {
    fixture.detectChanges();
    const markModuleSpy = vi.spyOn(store, 'markModuleComplete').mockImplementation(() => void 0);
    vi.spyOn(store, 'hasFinalQuiz').mockReturnValue(true);
    const routerSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.selectModule(2);
    component.completeLastModule();
    expect(markModuleSpy).toHaveBeenCalledWith('1', 'm3');
    expect(routerSpy).toHaveBeenCalledWith(['/student/quiz-player', '1']);
  });

  it('completeLastModule marks the module complete, completes the lesson, and navigates to lessons list if no final quiz exists', () => {
    fixture.detectChanges();
    const markModuleSpy = vi.spyOn(store, 'markModuleComplete').mockImplementation(() => void 0);
    const completeLessonSpy = vi.spyOn(store, 'completeLesson').mockImplementation(() => void 0);
    vi.spyOn(store, 'hasFinalQuiz').mockReturnValue(false);
    const routerSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const msgService = TestBed.inject(MessageService);
    const toastSpy = vi.spyOn(msgService, 'add');

    component.selectModule(2);
    component.completeLastModule();

    expect(markModuleSpy).toHaveBeenCalledWith('1', 'm3');
    expect(completeLessonSpy).toHaveBeenCalledWith('1');
    expect(toastSpy).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success', summary: 'Lesson Completed' }));
    expect(routerSpy).toHaveBeenCalledWith(['/student/lessons']);
  });

  // ─── Navigation helpers ────────────────────────────────────────────────────

  it('goBack navigates to /student/lessons', () => {
    fixture.detectChanges();
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.goBack();
    expect(spy).toHaveBeenCalledWith(['/student/lessons']);
  });

  it('finishLesson navigates to /student/quiz-player if no attempts', () => {
    patchStore(store, {
      currentLesson: MOCK_LESSON,
      finalQuizAttempts: [],
    });

    fixture.detectChanges();
    const router = TestBed.inject(Router);
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.finishLesson();
    expect(spy).toHaveBeenCalledWith(['/student/quiz-player', '1']);
  });

  it('finishLesson navigates to /student/lessons if passed', () => {
    patchStore(store, {
      currentLesson: MOCK_LESSON,
      finalQuizAttempts: [
        { passed: true } as unknown as import('@shared/models/quiz.types').QuizResultDetail,
      ],
    });

    fixture.detectChanges();
    const router = TestBed.inject(Router);
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.finishLesson();
    expect(spy).toHaveBeenCalledWith(['/student/lessons']);
  });

  it('finishLesson shows error if not passed', () => {
    patchStore(store, {
      currentLesson: MOCK_LESSON,
      finalQuizAttempts: [
        { passed: false } as unknown as import('@shared/models/quiz.types').QuizResultDetail,
      ],
    });

    fixture.detectChanges();
    const msgService = TestBed.inject(MessageService);
    const spy = vi.spyOn(msgService, 'add');
    component.finishLesson();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
  });

  it('startFinalQuiz navigates to quiz player', () => {
    fixture.detectChanges();

    patchStore(store, {
      currentLesson: MOCK_LESSON,
    });

    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.startFinalQuiz();
    expect(spy).toHaveBeenCalledWith(['/student/quiz-player', '1']);
  });

  // ─── Loading skeleton ─────────────────────────────────────────────────────

  it('shows animate-pulse skeleton when loading is true', () => {
    patchStore(store, {
      loading: true,
    });

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

  it('shows Start Final Quiz CTA when all modules complete and no previous attempt', () => {
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

  // ─── AI Explanation & Formatting ──────────────────────────────────────────

  describe('AI Explanation & Formatting', () => {
    it('boldify converts markdown bold to HTML strong tags and sanitizes', () => {
      fixture.detectChanges();
      const input = 'This is **bold** text and **more bold**';
      const result = component.boldify(input) as unknown as {
        changingThisBreaksApplicationSecurity: string;
      };

      expect(JSON.stringify(result)).toContain('<strong>bold</strong>');
      expect(JSON.stringify(result)).toContain('<strong>more bold</strong>');
    });

    it('explainCurrentModule calls explainBlock on the store and opens the modal', () => {
      fixture.detectChanges();
          const spy = vi.spyOn(store, 'explainBlock').mockImplementation(() => void 0);
      component.selectModule(0);
      component.explainCurrentModule();
      expect(spy).toHaveBeenCalledWith('m1');

      const explanationOpen = (
        component as unknown as { explanationOpen: { (): boolean; set: (value: boolean) => void } }
      ).explanationOpen;
      expect(explanationOpen()).toBe(true);
    });

    it('explainCurrentModule does nothing if no module is selected', () => {
      fixture.detectChanges();
      const spy = vi.spyOn(store, 'explainBlock').mockImplementation(() => void 0);

      patchStore(store, {
        currentLesson: {
          ...MOCK_LESSON,
          modules: [],
        },
      });

      component.explainCurrentModule();
      expect(spy).not.toHaveBeenCalled();
    });

    it('closeExplanation closes the modal and clears explanation', () => {
      fixture.detectChanges();
      const spy = vi.spyOn(store, 'clearExplanation').mockImplementation(() => void 0);
      const explanationOpen = (
        component as unknown as { explanationOpen: { (): boolean; set: (value: boolean) => void } }
      ).explanationOpen;
      explanationOpen.set(true);

      component.closeExplanation();
      expect(spy).toHaveBeenCalled();
      expect(explanationOpen()).toBe(false);
    });

    it('getModuleIcon returns correct icons for different module types', () => {
      fixture.detectChanges();
      expect(component.getModuleIcon('video')).toBe('play_circle');
      expect(component.getModuleIcon('text')).toBe('article');
      expect(component.getModuleIcon('quiz')).toBe('quiz');
      expect(component.getModuleIcon('interactive')).toBe('touch_app');
      expect(component.getModuleIcon('audio')).toBe('headphones');
      expect(component.getModuleIcon('image')).toBe('image');
      expect(component.getModuleIcon('pdf')).toBe('picture_as_pdf');
      expect(component.getModuleIcon('file')).toBe('picture_as_pdf');
      expect(component.getModuleIcon('pdf')).toBe('picture_as_pdf');
      expect(component.getModuleIcon('image')).toBe('image');
      expect(component.getModuleIcon('unknown_type')).toBe('menu_book');
    });
  });

  describe('Subcapitol Check Quizzes', () => {
    let httpClient: HttpClient;

    beforeEach(() => {
      httpClient = TestBed.inject(HttpClient);
    });

    it('loadSubcapitolAttempts loads attempts in parallel and updates subcapitolAttempts signal', () => {
      const mockAttempts = [
        { attemptId: 'att1', score: 8, passed: true }
      ];
      const getSpy = vi.spyOn(httpClient, 'get').mockReturnValue(of(mockAttempts));

      component.loadSubcapitolAttempts(MOCK_LESSON.subcapitols!);

      expect(getSpy).toHaveBeenCalledTimes(MOCK_LESSON.subcapitols!.length);
      expect(component.subcapitolAttempts()['sub1']).toEqual(mockAttempts);
    });

    it('getBestAttempt returns the attempt with the highest score', () => {
      const mockAttempts = [
        { attemptId: 'att1', score: 5, passed: false },
        { attemptId: 'att2', score: 9, passed: true },
        { attemptId: 'att3', score: 7, passed: true }
      ];
      component.subcapitolAttempts.set({
        'sub1': mockAttempts
      });

      const best = component.getBestAttempt('sub1');
      expect(best?.attemptId).toBe('att2');
      expect(best?.score).toBe(9);
    });

    it('isSubcapitolPassed returns true if passed attempt exists', () => {
      component.subcapitolAttempts.set({
        'sub1': [
          { attemptId: 'att1', score: 5, passed: false },
          { attemptId: 'att2', score: 8, passed: true }
        ],
        'sub2': [
          { attemptId: 'att3', score: 4, passed: false }
        ]
      });

      expect(component.isSubcapitolPassed('sub1')).toBe(true);
      expect(component.isSubcapitolPassed('sub2')).toBe(false);
      expect(component.isSubcapitolPassed('sub-nonexistent')).toBe(false);
    });

    it('startCheckQuiz navigates to quiz player with check type and lessonId', () => {
      const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
      const lessonIdSignal = (component as unknown as { lessonId: { set: (id: string) => void } }).lessonId;
      lessonIdSignal.set('1');

      component.startCheckQuiz('sub1');

      expect(spy).toHaveBeenCalledWith(['/student/quiz-player', 'sub1'], {
        queryParams: {
          type: 'check',
          lessonId: '1'
        }
      });
    });
  });
});
