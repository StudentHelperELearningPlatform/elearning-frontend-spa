import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { LessonListComponent } from './lesson-list.component';
import { LessonsStore, Lesson } from '../../store/lessons.store';
import { ProgressStore, HistoryEntry } from '../../store/progress.store';
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
  let progressStore: InstanceType<typeof ProgressStore>;
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
    progressStore = TestBed.inject(ProgressStore);
    router = TestBed.inject(Router);
    vi.spyOn(store, 'loadLessons').mockImplementation(() => undefined);
    vi.spyOn(progressStore, 'loadMyHistory').mockImplementation(() => undefined);
    patchStore(store, {
      lessons: MOCK_LESSONS,
      loading: false,
    });
    patchStore(progressStore, {
      myHistory: [],
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

  it('calls loadMyHistory on init', () => {
    fixture.detectChanges();
    expect(progressStore.loadMyHistory).toHaveBeenCalled();
  });

  it('shows loading skeleton in my-lessons tab when accessibleLessonsLoading is true', () => {
    component.activeTab.set('my-lessons');
    patchStore(store, { accessibleLessonsLoading: true });
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.animate-pulse'))).toBeTruthy();
  });

  it('renders all lesson cards with correct statuses on browser tab', () => {
    store.publishedLessons = signal(
      MOCK_LESSONS as unknown as Lesson[],
    ) as unknown as typeof store.publishedLessons;
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

  it('getLessonStatus maps finished/completed statuses from lesson entity', () => {
    patchStore(store, {
      lessons: [
        { ...MOCK_LESSONS[0], id: 'finished-id', status: 'Finished' },
        { ...MOCK_LESSONS[0], id: 'completed-id-2', status: 'COMPLETED' },
      ],
    });
    component['lessonStatusMap'].set({});
    fixture.detectChanges();

    expect(component.getLessonStatus('finished-id')).toBe('quiz-submitted');
    expect(component.getLessonStatus('completed-id-2')).toBe('quiz-submitted');
  });

  it('getLessonStatus maps in-progress and quiz-ready statuses from lesson entity', () => {
    patchStore(store, {
      lessons: [
        { ...MOCK_LESSONS[0], id: 'ip-1', status: 'In Progress' },
        { ...MOCK_LESSONS[0], id: 'ip-2', status: 'in-progress' },
        { ...MOCK_LESSONS[0], id: 'qr-1', status: 'quiz-ready' },
      ],
    });
    component['lessonStatusMap'].set({});
    fixture.detectChanges();

    expect(component.getLessonStatus('ip-1')).toBe('in-progress');
    expect(component.getLessonStatus('ip-2')).toBe('in-progress');
    expect(component.getLessonStatus('qr-1')).toBe('quiz-ready');
  });

  it('getLessonStatus falls back to history entry when lesson has no explicit status mapping', () => {
    patchStore(store, {
      lessons: [{ ...MOCK_LESSONS[0], id: 'hist-lesson', status: '' }],
    });
    patchStore(progressStore, {
      myHistory: [{ lessonId: 'hist-lesson', status: 'completed', dateCompleted: '2026-01-01' } as HistoryEntry],
    });
    component['lessonStatusMap'].set({});
    fixture.detectChanges();

    expect(component.getLessonStatus('hist-lesson')).toBe('quiz-submitted');
  });

  it('hasAccess returns true', () => {
    fixture.detectChanges();
    expect(component.hasAccess()).toBe(true);
  });

  // ─── Buttons & Navigation ────────────────────────────────────────────────

  it('Start Lesson button has correct routerLink', async () => {
    store.publishedLessons = signal(
      MOCK_LESSONS as unknown as Lesson[],
    ) as unknown as typeof store.publishedLessons;
    fixture.detectChanges();

    const spy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const btn = buttons.find((b) => b.nativeElement.textContent.includes('Start Lesson'));
    btn!.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].toString()).toContain('/student/lessons/not-started-id');
  });

  it('Continue button has correct routerLink', async () => {
    store.publishedLessons = signal(
      MOCK_LESSONS as unknown as Lesson[],
    ) as unknown as typeof store.publishedLessons;
    fixture.detectChanges();

    const spy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const btn = buttons.find((b) => b.nativeElement.textContent.includes('Continue'));
    btn!.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].toString()).toContain('/student/lessons/in-progress-id');
  });

  it('Go to Lesson button has correct routerLink', async () => {
    store.publishedLessons = signal(
      MOCK_LESSONS as unknown as Lesson[],
    ) as unknown as typeof store.publishedLessons;
    fixture.detectChanges();

    const spy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const btn = buttons.find((b) => b.nativeElement.textContent.includes('Go to Lesson'));
    btn!.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].toString()).toContain('/student/lessons/quiz-ready-id');
  });

  it('Review button has correct routerLink', async () => {
    store.publishedLessons = signal(
      MOCK_LESSONS as unknown as Lesson[],
    ) as unknown as typeof store.publishedLessons;
    fixture.detectChanges();

    const spy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const btn = buttons.find((b) => b.nativeElement.textContent.includes('Review'));
    btn!.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].toString()).toContain('/student/lessons/completed-id');
  });

  // ─── UI States (Loading & Tabs & Empty) ──────────────────────────────────

  it('shows loading skeleton when store is loading', () => {
    patchStore(store, { loading: true });
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.animate-pulse'))).toBeTruthy();
  });

  it('switches to My Lessons tab and shows empty state', async () => {
    patchStore(store, { lessons: [] }); // Golește starea store-ului
    component.activeTab.set('my-lessons');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No active lessons');
  });

  it('switches to My Lessons tab and renders list', () => {
    store.myLessons = signal([
      MOCK_LESSONS[1],
    ] as unknown as Lesson[]) as unknown as typeof store.myLessons;
    component.activeTab.set('my-lessons');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('In Progress Lesson');
  });

  it('switches to History tab and shows empty state', async () => {
    patchStore(store, { lessons: [] });
    component.activeTab.set('history');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No history yet');
  });

  it('switches to History tab and renders list', () => {
    patchStore(progressStore, {
      myHistory: [{ lessonId: 'completed-id' } as HistoryEntry]
    });
    component.activeTab.set('history');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Completed Lesson');
  });

  it('shows empty state on browser tab when there are no published lessons', async () => {
    patchStore(store, { lessons: [] });
    component.activeTab.set('browser');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No lessons found');
  });
});
