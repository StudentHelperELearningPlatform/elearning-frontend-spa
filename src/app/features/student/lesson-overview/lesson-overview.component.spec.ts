import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonOverviewComponent } from './lesson-overview.component';
import { provideRouter, ActivatedRoute, Router } from '@angular/router';
import { LessonsStore } from '../store/lessons.store';
import { ProgressStore } from '../store/progress.store';
import { patchStore } from '../../../../test-utils/patch-store';
import { provideHttpClient } from '@angular/common/http';
import { provideApiMocks } from '../../../../test-utils/api-testing';
import { By } from '@angular/platform-browser';

const MOCK_LESSON = {
  id: 'test-1',
  title: 'Test Lesson',
  subject: 'Math',
  grade: 1,
  difficulty: 'Easy',
  duration: '10m',
  status: 'Active',
  description: 'Desc',
  subcapitols: [
    {
      id: 'sub-1',
      title: 'Sub 1',
      blocks: [
        { id: 'm-1', title: 'M1', type: 'text', content: '' },
        { id: 'm-2', title: 'M2', type: 'video', content: '' },
      ],
    },
    {
      id: 'sub-2',
      title: 'Sub 2',
      blocks: [{ id: 'm-3', title: 'M3', type: 'quiz', content: '' }],
    },
  ],
  modules: [],
};

describe('LessonOverviewComponent', () => {
  let component: LessonOverviewComponent;
  let fixture: ComponentFixture<LessonOverviewComponent>;
  let lessonsStore: InstanceType<typeof LessonsStore>;
  let progressStore: InstanceType<typeof ProgressStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonOverviewComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        ...provideApiMocks(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'test-1' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonOverviewComponent);
    component = fixture.componentInstance;
    lessonsStore = TestBed.inject(LessonsStore);
    progressStore = TestBed.inject(ProgressStore);

    // Prevent actual HTTP calls from ngOnInit
    vi.spyOn(lessonsStore, 'loadLesson').mockImplementation(() => undefined);
    vi.spyOn(progressStore, 'loadMyLessonStats').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ─── Creation & Init ───────────────────────────────────────────────────────

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadLesson and loadMyLessonStats on init', () => {
    fixture.detectChanges();
    expect(lessonsStore.loadLesson).toHaveBeenCalledWith('test-1');
    expect(progressStore.loadMyLessonStats).toHaveBeenCalledWith({ lessonId: 'test-1' });
  });

  it('should call clearCompletionState on destroy', () => {
    const clearSpy = vi.spyOn(lessonsStore, 'clearCompletionState').mockImplementation(() => undefined);
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(clearSpy).toHaveBeenCalled();
  });

  // ─── Loading State ─────────────────────────────────────────────────────────

  it('should render loading skeleton when lessonsStore is loading', () => {
    patchStore(lessonsStore, { loading: true });
    fixture.detectChanges();
    const pulse = fixture.debugElement.query(By.css('.animate-pulse'));
    expect(pulse).toBeTruthy();
  });

  // ─── Error States ──────────────────────────────────────────────────────────

  it('should render empty-state when error kind is not-found', () => {
    patchStore(lessonsStore, {
      loading: false,
      error: { kind: 'not-found', message: 'Lesson not found' },
    });
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Lesson not found');
  });

  it('should render error-state on generic lessonsStore error', () => {
    patchStore(lessonsStore, {
      loading: false,
      error: { kind: 'server', message: 'Server error' },
    });
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Could not load lesson overview');
  });

  it('should render error-state when progressStore has an error', () => {
    patchStore(lessonsStore, { loading: false, error: null });
    patchStore(progressStore, { myLessonStatsError: 'Progress load failed' });
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Could not load lesson overview');
  });

  // ─── Lesson Content ────────────────────────────────────────────────────────

  it('should render lesson title when currentLesson is set', () => {
    patchStore(lessonsStore, { loading: false, error: null, currentLesson: MOCK_LESSON });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Test Lesson');
  });

  it('should render "Start Lesson" when completedModules is 0', () => {
    patchStore(lessonsStore, { loading: false, error: null, currentLesson: MOCK_LESSON });
    patchStore(progressStore, { myLessonStats: { completedModules: 0, completionPercentage: 0, totalModules: 3, timeSpentMinutes: null, quizScore: null } });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Start Lesson');
  });

  it('should render "Continue Lesson" when completedModules > 0', () => {
    patchStore(lessonsStore, { loading: false, error: null, currentLesson: MOCK_LESSON });
    patchStore(progressStore, { myLessonStats: { completedModules: 1, completionPercentage: 33, totalModules: 3, timeSpentMinutes: 5, quizScore: null } });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Continue Lesson');
  });

  // ─── Navigation ────────────────────────────────────────────────────────────

  it('should navigate to /student/lessons on goBack()', () => {
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.goBack();
    expect(navSpy).toHaveBeenCalledWith(['/student/lessons']);
  });

  it('should navigate to lesson-viewer on startLesson() when lessonId is set', () => {
    fixture.detectChanges(); // triggers ngOnInit → sets lessonId from route
    const router = TestBed.inject(Router);
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.startLesson();
    expect(navSpy).toHaveBeenCalledWith(['/student/lesson-viewer', 'test-1']);
  });

  it('should NOT navigate on startLesson() when lessonId is null', () => {
    const router = TestBed.inject(Router);
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    // Expose internal field via component cast to set it to null for branch coverage
    (component as LessonOverviewComponent & { lessonId: string | null }).lessonId = null;
    component.startLesson();
    expect(navSpy).not.toHaveBeenCalled();
  });

  // ─── reloadLesson with null route param ───────────────────────────────────

  it('should NOT call loadLesson when route param is null', () => {
    const route = TestBed.inject(ActivatedRoute);
    (route.snapshot.paramMap as { get: (key: string) => string | null }).get = () => null;
    vi.mocked(lessonsStore.loadLesson).mockClear();
    component.reloadLesson();
    expect(lessonsStore.loadLesson).not.toHaveBeenCalled();
  });

  // ─── getGlobalIndex ────────────────────────────────────────────────────────

  it('should format getGlobalIndex correctly', () => {
    patchStore(lessonsStore, { currentLesson: MOCK_LESSON });
    expect(component.getGlobalIndex('sub-1', 'm-1')).toBe(0);
    expect(component.getGlobalIndex('sub-1', 'm-2')).toBe(1);
    expect(component.getGlobalIndex('sub-2', 'm-3')).toBe(2);
  });

  it('should return -1 from getGlobalIndex when no lesson is loaded', () => {
    patchStore(lessonsStore, { currentLesson: null });
    expect(component.getGlobalIndex('sub-1', 'm-1')).toBe(-1);
  });

  it('should return -1 from getGlobalIndex when subcapitol is not found', () => {
    patchStore(lessonsStore, { currentLesson: MOCK_LESSON });
    expect(component.getGlobalIndex('sub-99', 'm-1')).toBe(-1);
  });

  // ─── getModuleIcon ─────────────────────────────────────────────────────────

  it('should return correct module icon for all types', () => {
    expect(component.getModuleIcon('video')).toBe('play_circle');
    expect(component.getModuleIcon('text')).toBe('article');
    expect(component.getModuleIcon('quiz')).toBe('quiz');
    expect(component.getModuleIcon('interactive')).toBe('touch_app');
    expect(component.getModuleIcon('audio')).toBe('headphones');
    expect(component.getModuleIcon('unknown')).toBe('menu_book');
  });
});
