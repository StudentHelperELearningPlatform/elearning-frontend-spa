import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { LessonListComponent } from './lesson-list.component';
import { LessonsStore, Lesson } from '../../store/lessons.store';
import { AuthStore } from '../../../auth/store/auth.store';
import { createAuthStoreStub } from '../../../../../test-utils/auth-testing';
import { patchStore } from '../../../../../test-utils/patch-store';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideApiMocks } from '../../../../../test-utils/api-testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';

const MOCK_LESSONS = [
  {
    id: 'not-started-id',
    title: 'Not Started Lesson',
    subject: 'Math',
    grade: 5,
    difficulty: 'Easy',
    duration: '10 min',
    description: 'Desc',
    status: 'PUBLISHED',
  },
  {
    id: 'in-progress-id',
    title: 'In Progress Lesson',
    subject: 'Science',
    grade: 5,
    difficulty: 'Medium',
    duration: '15 min',
    description: 'Desc',
    status: 'PUBLISHED',
  },
  {
    id: 'quiz-ready-id',
    title: 'Quiz Ready Lesson',
    subject: 'History',
    grade: 5,
    difficulty: 'Hard',
    duration: '20 min',
    description: 'Desc',
    status: 'PUBLISHED',
  },
  {
    id: 'completed-id',
    title: 'Completed Lesson',
    subject: 'English',
    grade: 5,
    difficulty: 'Easy',
    duration: '5 min',
    description: 'Desc',
    status: 'PUBLISHED',
  },
];

describe('LessonListComponent', () => {
  let component: LessonListComponent;
  let fixture: ComponentFixture<LessonListComponent>;
  let store: InstanceType<typeof LessonsStore>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonListComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        ...provideApiMocks(),
        { provide: AuthStore, useValue: createAuthStoreStub({ isAuthenticated: true }) },
      ],
    }).compileComponents();

    store = TestBed.inject(LessonsStore);
    router = TestBed.inject(Router);
    vi.spyOn(store, 'loadLessons').mockImplementation(() => undefined);
    patchStore(store, {
      lessons: MOCK_LESSONS,
      loading: false,
    });
    fixture = TestBed.createComponent(LessonListComponent);
    component = fixture.componentInstance;

    // Patch internal status map
    component['lessonStatusMap'].set({
      'not-started-id': 'not-started',
      'in-progress-id': 'in-progress',
      'quiz-ready-id': 'quiz-ready',
      'completed-id': 'quiz-submitted',
    });

    // We do NOT call fixture.detectChanges() here to avoid NG0100 when mocking signals per test.
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ─── Rendering & Core ───────────────────────────────────────────────────

  it('creates successfully and calls loadLessons on init', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(store.loadLessons).toHaveBeenCalled();
  });

  it('renders all lesson cards with correct statuses on browser tab', () => {
    store.publishedLessons = signal(MOCK_LESSONS as unknown as Lesson[]) as any;
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Not Started Lesson');
    expect(text).toContain('In Progress Lesson');
    expect(text).toContain('Quiz Ready Lesson');
    expect(text).toContain('Completed Lesson');

    expect(text).toContain('Not Started');
    expect(text).toContain('In Progress');
    expect(text).toContain('Quiz Ready');
    expect(text).toContain('Completed ✓');
  });

  // ─── Component Methods ───────────────────────────────────────────────────

  it('getLessonStatus returns fallback for unknown lessons', () => {
    fixture.detectChanges();
    expect(component.getLessonStatus('unknown-id')).toBe('not-started');
  });

  it('hasAccess returns true', () => {
    fixture.detectChanges();
    expect(component.hasAccess()).toBe(true);
  });

  // ─── Buttons & Navigation ────────────────────────────────────────────────

  it('Start Lesson button has correct routerLink', async () => {
    store.publishedLessons = signal(MOCK_LESSONS as unknown as Lesson[]) as any;
    fixture.detectChanges();

    const spy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const btn = buttons.find((b) => b.nativeElement.textContent.includes('Start Lesson'));
    btn!.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].toString()).toContain('/student/lesson-viewer/not-started-id');
  });

  it('Continue button has correct routerLink', async () => {
    store.publishedLessons = signal(MOCK_LESSONS as unknown as Lesson[]) as any;
    fixture.detectChanges();

    const spy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const btn = buttons.find((b) => b.nativeElement.textContent.includes('Continue'));
    btn!.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].toString()).toContain('/student/lesson-viewer/in-progress-id');
  });

  it('Go to Lesson button has correct routerLink', async () => {
    store.publishedLessons = signal(MOCK_LESSONS as unknown as Lesson[]) as any;
    fixture.detectChanges();

    const spy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const btn = buttons.find((b) => b.nativeElement.textContent.includes('Go to Lesson'));
    btn!.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].toString()).toContain('/student/lesson-viewer/quiz-ready-id');
  });

  it('Review button has correct routerLink', async () => {
    store.publishedLessons = signal(MOCK_LESSONS as unknown as Lesson[]) as any;
    fixture.detectChanges();

    const spy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const btn = buttons.find((b) => b.nativeElement.textContent.includes('Review'));
    btn!.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].toString()).toContain('/student/lesson-viewer/completed-id');
  });

  // ─── UI States (Loading & Tabs & Empty) ──────────────────────────────────

  it('shows loading skeleton when store is loading', () => {
    patchStore(store, { loading: true });
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.animate-pulse'))).toBeTruthy();
  });

  it('switches to My Lessons tab and shows empty state', () => {
    store.myLessons = signal([] as any) as any;
    component.activeTab.set('my-lessons');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No active lessons');
  });

  it('switches to My Lessons tab and renders list', () => {
    store.myLessons = signal([MOCK_LESSONS[1]] as unknown as Lesson[]) as any;
    component.activeTab.set('my-lessons');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('In Progress Lesson');
  });

  it('switches to History tab and shows empty state', () => {
    store.completedLessons = signal([] as any) as any;
    component.activeTab.set('history');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No history yet');
  });

  it('switches to History tab and renders list', () => {
    store.completedLessons = signal([MOCK_LESSONS[3]] as unknown as Lesson[]) as any;
    component.activeTab.set('history');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Completed Lesson');
  });

  it('shows empty state on browser tab when there are no published lessons', () => {
    store.publishedLessons = signal([] as any) as any;
    component.activeTab.set('browser');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No lessons found');
  });
});
