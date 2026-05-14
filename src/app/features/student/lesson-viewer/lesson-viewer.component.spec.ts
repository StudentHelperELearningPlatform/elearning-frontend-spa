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
      ]
    },
    {
      id: 'sub2',
      title: 'Chapter 2',
      orderIndex: 1,
      blocks: [
        { id: 'm3', title: 'Module 3', type: 'text', content: '<p>Last module</p>' },
      ]
    }
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonViewerComponent, ButtonComponent, CardComponent],
      providers: [
        provideRouter([]),
        { provide: AuthStore, useValue: createAuthStoreStub({ isAuthenticated: true }) },
        ...provideApiMocks(),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(LessonsStore);
    router = TestBed.inject(Router);

    // Mock loadLesson to avoid resetting state during ngOnInit
    vi.spyOn(store, 'loadLesson').mockImplementation(() => { /* mock */ });
    
    patchStore(store, { currentLesson: MOCK_LESSON, loading: false });

    fixture = TestBed.createComponent(LessonViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ─── Renders ─────────────────────────────────────────────────────────────

  it('creates without errors', () => {
    expect(component).toBeTruthy();
  });

  it('displays the lesson title in the sidebar header', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Intro to Fractions');
  });

  // ─── currentModule computed ───────────────────────────────────────────────

  it('currentModule returns the first module by default', () => {
    expect(component.currentModule()).toEqual(MOCK_LESSON.modules[0]);
  });

  it('currentModule returns null when lesson has no modules', () => {
    patchStore(store, { currentLesson: { ...MOCK_LESSON, modules: [] } });
    expect(component.currentModule()).toBeNull();
  });

  // ─── selectModule ─────────────────────────────────────────────────────────

  it('selectModule updates currentModuleIndex', () => {
    component.selectModule(2);
    expect(component.currentModuleIndex()).toBe(2);
  });

  it('selectModule changes currentModule reference', () => {
    component.selectModule(1);
    expect(component.currentModule()?.id).toBe('m2');
  });

  // ─── nextModule / previousModule ──────────────────────────────────────────

  it('nextModule advances the index by 1', () => {
    component.selectModule(0);
    component.nextModule();
    expect(component.currentModuleIndex()).toBe(1);
  });

  it('nextModule does not advance past the last module', () => {
    component.selectModule(MOCK_LESSON.modules.length - 1);
    component.nextModule();
    expect(component.currentModuleIndex()).toBe(MOCK_LESSON.modules.length - 1);
  });

  it('previousModule decrements the index by 1', () => {
    component.selectModule(2);
    component.previousModule();
    expect(component.currentModuleIndex()).toBe(1);
  });

  it('previousModule does not go below 0', () => {
    component.selectModule(0);
    component.previousModule();
    expect(component.currentModuleIndex()).toBe(0);
  });

  // ─── Navigation helpers ────────────────────────────────────────────────────

  it('goBack navigates to /student/lessons', () => {
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.goBack();
    expect(spy).toHaveBeenCalledWith(['/student/lessons']);
  });

  it('finishLesson navigates to /student/lessons', () => {
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.finishLesson();
    expect(spy).toHaveBeenCalledWith(['/student/lessons']);
  });

  // ─── getModuleIcon ────────────────────────────────────────────────────────

  it.each([
    ['video', 'play_circle'],
    ['text', 'article'],
    ['quiz', 'quiz'],
    ['interactive', 'touch_app'],
    ['audio', 'headphones'],
    ['image', 'menu_book'],
    ['unknown', 'menu_book'],
  ])('getModuleIcon("%s") returns "%s"', (type, expected) => {
    expect(component.getModuleIcon(type)).toBe(expected);
  });

  // ─── Loading skeleton ─────────────────────────────────────────────────────

  it('shows animate-pulse skeleton when loading is true', () => {
    patchStore(store, { loading: true });
    fixture.detectChanges();
    const skeleton = (fixture.nativeElement as HTMLElement).querySelector('.animate-pulse');
    expect(skeleton).toBeTruthy();
  });

  // ─── ngOnInit ─────────────────────────────────────────────────────────────

  it('calls store.loadLesson with the route id on init', () => {
    const spy = vi.spyOn(store, 'loadLesson');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith('1');
  });

  // ─── Final Quiz CTA Banner ────────────────────────────────────────────────

  it('does not show Final Quiz banner when not all modules are complete', () => {
    patchStore(store, { 
      currentLesson: MOCK_LESSON, 
      completedModuleIds: new Set(['m1']) 
    });
    fixture.detectChanges();
    
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[data-testid="quiz-completed-banner"]')).toBeFalsy();
    expect(element.textContent).not.toContain('Take Final Quiz');
  });

  it('shows "Take Final Quiz" CTA when all modules complete and no previous attempt', () => {
    patchStore(store, { 
      currentLesson: MOCK_LESSON, 
      completedModuleIds: new Set(['m1', 'm2', 'm3']),
      finalQuizAttempts: []
    });
    fixture.detectChanges();
    
    const element = fixture.nativeElement as HTMLElement;
    // Check for the un-attempted banner (the text inside the button or header)
    expect(element.textContent).toContain('Start Final Quiz');
  });

  it('shows quiz completed banner with score when there is a previous attempt', () => {
    patchStore(store, { 
      currentLesson: MOCK_LESSON, 
      completedModuleIds: new Set(['m1', 'm2', 'm3']),
      finalQuizAttempts: [
        { attemptId: 'a1', score: 9, totalPoints: 10, percentage: 90, passed: true, submittedAt: '' }
      ]
    });
    fixture.detectChanges();
    
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[data-testid="quiz-completed-banner"]')).toBeTruthy();
    expect(element.textContent).toContain('Final Quiz Completed!');
    expect(element.textContent).toContain('90%');
    expect(element.textContent).toContain('Retake Quiz');
  });

  it('startFinalQuiz navigates to quiz player', () => {
    patchStore(store, { currentLesson: MOCK_LESSON });
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.startFinalQuiz();
    expect(spy).toHaveBeenCalledWith(['/student/quiz-player', '1']);
  });
});
