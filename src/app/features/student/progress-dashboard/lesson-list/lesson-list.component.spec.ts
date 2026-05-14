import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { LessonListComponent } from './lesson-list.component';
import { LessonsStore } from '../../store/lessons.store';
import { AuthStore } from '../../../auth/store/auth.store';
import { createAuthStoreStub } from '../../../../../test-utils/auth-testing';
import { patchStore } from '../../../../../test-utils/patch-store';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideApiMocks } from '../../../../../test-utils/api-testing';
import { By } from '@angular/platform-browser';

const MOCK_LESSONS = [
  {
    id: 'not-started-id',
    title: 'Not Started Lesson',
    subject: 'Math',
    grade: 5,
    difficulty: 'Easy',
    duration: '10 min',
    description: 'Desc',
    status: 'PUBLISHED'
  },
  {
    id: 'in-progress-id',
    title: 'In Progress Lesson',
    subject: 'Science',
    grade: 5,
    difficulty: 'Medium',
    duration: '15 min',
    description: 'Desc',
    status: 'PUBLISHED'
  },
  {
    id: 'quiz-ready-id',
    title: 'Quiz Ready Lesson',
    subject: 'History',
    grade: 5,
    difficulty: 'Hard',
    duration: '20 min',
    description: 'Desc',
    status: 'PUBLISHED'
  },
  {
    id: 'completed-id',
    title: 'Completed Lesson',
    subject: 'English',
    grade: 5,
    difficulty: 'Easy',
    duration: '5 min',
    description: 'Desc',
    status: 'PUBLISHED'
  }
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
        { provide: AuthStore, useValue: createAuthStoreStub({ isAuthenticated: true }) }
      ]
    }).compileComponents();

    store = TestBed.inject(LessonsStore);
    router = TestBed.inject(Router);
    
    vi.spyOn(store, 'loadLessons').mockImplementation(() => { /* do nothing */ });

    // Mock the store state with lessons
    patchStore(store, { 
      lessons: MOCK_LESSONS,
      loading: false
    });

    fixture = TestBed.createComponent(LessonListComponent);
    component = fixture.componentInstance;
    
    // Patch component's internal status map directly
    component['lessonStatusMap'].set({
      'not-started-id': 'not-started',
      'in-progress-id': 'in-progress',
      'quiz-ready-id': 'quiz-ready',
      'completed-id': 'quiz-submitted'
    });

    fixture.detectChanges();
  });

  it('creates successfully', () => {
    expect(component).toBeTruthy();
  });

  it('renders all lesson cards with correct statuses', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Not Started Lesson');
    expect(text).toContain('In Progress Lesson');
    expect(text).toContain('Quiz Ready Lesson');
    expect(text).toContain('Completed Lesson');
    
    // Status labels
    expect(text).toContain('Not Started');
    expect(text).toContain('In Progress');
    expect(text).toContain('Quiz Ready');
    expect(text).toContain('Completed ✓');
  });

  it('Start Lesson button has correct routerLink', async () => {
    const spy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const btn = buttons.find(b => b.nativeElement.textContent.includes('Start Lesson'));
    expect(btn).toBeTruthy();
    btn!.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
    const callArgs = spy.mock.calls[0][0].toString();
    expect(callArgs).toContain('/student/lesson-viewer/not-started-id');
  });

  it('Continue button has correct routerLink', async () => {
    const spy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const btn = buttons.find(b => b.nativeElement.textContent.includes('Continue'));
    expect(btn).toBeTruthy();
    btn!.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
    const callArgs = spy.mock.calls[0][0].toString();
    expect(callArgs).toContain('/student/lesson-viewer/in-progress-id');
  });

  it('Go to Lesson button has correct routerLink', async () => {
    const spy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const btn = buttons.find(b => b.nativeElement.textContent.includes('Go to Lesson'));
    expect(btn).toBeTruthy();
    btn!.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
    const callArgs = spy.mock.calls[0][0].toString();
    expect(callArgs).toContain('/student/lesson-viewer/quiz-ready-id');
  });

  it('Review button has correct routerLink', async () => {
    const spy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const btn = buttons.find(b => b.nativeElement.textContent.includes('Review'));
    expect(btn).toBeTruthy();
    btn!.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
    const callArgs = spy.mock.calls[0][0].toString();
    expect(callArgs).toContain('/student/lesson-viewer/completed-id');
  });
});
