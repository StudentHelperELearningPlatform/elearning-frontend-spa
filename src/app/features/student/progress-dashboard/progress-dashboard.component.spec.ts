import { TestBed } from '@angular/core/testing';
import { ProgressDashboardComponent } from './progress-dashboard.component';
import { ProgressStore } from '../store/progress.store';
import { LessonsStore } from '../store/lessons.store';
import { AuthStore } from '../../auth/store/auth.store';
import { StudentProfileStore, StudentProfile } from '../store/profile.store';
import { TeacherClassService } from '../../../core/services/teacher-class.service';
import { ElementRef, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { createAuthStoreStub } from '../../../../test-utils/auth-testing';
import { ActivityItem, ProgressRecord } from '@shared/models/progress.model';
import { provideApiMocks } from '../../../../test-utils/api-testing';
import { of, throwError } from 'rxjs';

describe('ProgressDashboardComponent (Logic)', () => {
  let component: ProgressDashboardComponent;
  let resizeCallback: (() => void) | undefined;
  let progressStoreMock: {
    student: WritableSignal<unknown>;
    activeStreak: WritableSignal<number>;
    skillLevels: WritableSignal<unknown[]>;

    loadMyDashboard: ReturnType<typeof vi.fn>;
    loadMyHistory: ReturnType<typeof vi.fn>;
    loadMyLessonStats: ReturnType<typeof vi.fn>;
    loading: WritableSignal<boolean>;
    error: WritableSignal<string | null>;
    recentMilestones: WritableSignal<unknown[]>;
    recentActivity: WritableSignal<unknown[]>;
    upcomingQuizzes: WritableSignal<unknown[]>;
    progressRecords: WritableSignal<unknown[]>;
    overallProgressPercent: WritableSignal<number>;
    continueLesson: WritableSignal<unknown>;
    dashboard: WritableSignal<unknown>;
    dashboardLoading: WritableSignal<boolean>;
    dashboardError: WritableSignal<string | null>;
    myHistory: WritableSignal<{ lessonId: string; lessonTitle?: string; status: 'not_started' | 'in_progress' | 'completed'; score: number | null; dateCompleted: string | null }[]>;
  };
  let studentProfileStoreMock: {
    profile: WritableSignal<StudentProfile | null>;
    loading: WritableSignal<boolean>;
    saving: WritableSignal<boolean>;
    error: WritableSignal<string | null>;
    loadStudentProfile: ReturnType<typeof vi.fn>;
  };
  let authStoreStub: ReturnType<typeof createAuthStoreStub>;
  let lessonsStoreMock: {
    currentLesson: WritableSignal<{ id: string; title: string } | null>;
    lessons: WritableSignal<{ id: string; title: string }[]>;
    loadLesson: ReturnType<typeof vi.fn>;
  };
  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    // Mock ResizeObserver
    resizeCallback = undefined;
    global.ResizeObserver = class {
      constructor(cb: () => void) {
        resizeCallback = cb;
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    } as unknown as typeof ResizeObserver;

    progressStoreMock = {
      student: signal({ firstName: 'Test', totalLessons: 10, completedLessons: 5 }),
      activeStreak: signal(5),
      skillLevels: signal([]),

      loadMyDashboard: vi.fn(),
      loadMyHistory: vi.fn(),
      loadMyLessonStats: vi.fn(),
      loading: signal(false),
      error: signal(null),
      recentMilestones: signal([]),
      recentActivity: signal([]),
      upcomingQuizzes: signal([]),
      progressRecords: signal([]),
      overallProgressPercent: signal(50),
      continueLesson: signal(null),
      dashboard: signal(null),
      dashboardLoading: signal(false),
      dashboardError: signal(null),
      myHistory: signal([]),
    };

    studentProfileStoreMock = {
      profile: signal({
        name: 'Test Student',
        bio: 'Bio',
        avatarUrl: '',
        contactInfo: { email: 'test@student.com', phone: '' },
        enrolledLessonsCount: 0,
        enrolledClasses: ['class-1'],
      }),
      loading: signal(false),
      saving: signal(false),
      error: signal(null),
      loadStudentProfile: vi.fn(),
    };

    authStoreStub = createAuthStoreStub({
      user: { id: '123', name: 'Test User' },
      isAuthenticated: true
    });

    lessonsStoreMock = {
      currentLesson: signal(null),
      lessons: signal([]),
      loadLesson: vi.fn(),
    };

    routerMock = {
      navigate: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ProgressStore, useValue: progressStoreMock },
        { provide: LessonsStore, useValue: lessonsStoreMock },
        { provide: AuthStore, useValue: authStoreStub },
        { provide: StudentProfileStore, useValue: studentProfileStoreMock },
        { provide: TeacherClassService, useValue: { getStudentClasses: vi.fn().mockReturnValue(of([{ id: 'class-1', name: 'Mock Class', description: 'Mock Class Desc', lessonCount: 2 }])) } },
        { provide: Router, useValue: routerMock },
        ...provideApiMocks(),
      ],
    });

    // Instantiate in injection context to support inject()
    TestBed.runInInjectionContext(() => {
      component = new ProgressDashboardComponent();
    });
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch dashboard via loadMyDashboard when profile loads', async () => {
    studentProfileStoreMock.profile.set({ enrolledClasses: ['class-123'] } as unknown as StudentProfile);
    TestBed.runInInjectionContext(() => {
      component.ngOnInit();
    });
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(progressStoreMock.loadMyDashboard).toHaveBeenCalledWith({ classId: 'class-1' });
  });

  describe('greeting', () => {
    it('should return Good morning before 12', () => {
      vi.setSystemTime(new Date('2024-01-01T10:00:00'));
      expect(component.greeting).toBe('Good morning');
    });

    it('should return Good afternoon between 12 and 18', () => {
      vi.setSystemTime(new Date('2024-01-01T14:00:00'));
      expect(component.greeting).toBe('Good afternoon');
    });

    it('should return Good evening after 18', () => {
      vi.setSystemTime(new Date('2024-01-01T20:00:00'));
      expect(component.greeting).toBe('Good evening');
    });

    afterEach(() => {
      vi.useRealTimers();
    });
  });

  it('should return student first name from store', () => {
    expect(component.studentFirstName).toBe('Test');
  });

  it('should return initials correctly', () => {
    expect(component.initials).toBe('T');
  });

  it('should return lessons progress', () => {
    expect(component.completedLessons).toBe(5);
    expect(component.totalLessons).toBe(10);
  });

  it('should determine if streak has gold glow', () => {
    progressStoreMock.activeStreak.set(5);
    expect(component.streakHasGoldGlow).toBe(false);
    progressStoreMock.activeStreak.set(7);
    expect(component.streakHasGoldGlow).toBe(true);
  });

  it('should return a motivational message based on the date', () => {
    vi.setSystemTime(new Date('2024-01-01'));
    const msg1 = component.motivationalMessage;
    vi.setSystemTime(new Date('2024-01-02'));
    const msg2 = component.motivationalMessage;
    expect(msg1).toBeDefined();
    expect(msg2).toBeDefined();
    vi.useRealTimers();
  });

  describe('Utility methods', () => {
    it('getActivityIcon should return correct icons', () => {
      expect(component.getActivityIcon({ type: 'lesson' } as ActivityItem)).toBe('menu_book');
      expect(component.getActivityIcon({ type: 'quiz' } as ActivityItem)).toBe('check_circle');
      expect(component.getActivityIcon({ type: 'milestone' } as ActivityItem)).toBe('star');
      expect(component.getActivityIcon({ type: 'other' } as unknown as ActivityItem)).toBe('radio_button_checked');
    });

    it('getActivityRoute should return correct routes', () => {
      expect(component.getActivityRoute({ type: 'lesson', lessonId: 'L1' } as ActivityItem)).toEqual(['/student/lesson-viewer', 'L1']);
      expect(component.getActivityRoute({ type: 'quiz', quizId: 'Q1', attemptId: 'A1' } as ActivityItem)).toEqual(['/student/quizzes', 'Q1', 'results', 'A1']);
      expect(component.getActivityRoute({ type: 'other' } as unknown as ActivityItem)).toEqual(['/student/dashboard']);
    });

    it('getContinueLessonProgress should return percentage', () => {
      expect(component.getContinueLessonProgress({ completedModules: 2, totalModules: 4 } as unknown as ProgressRecord)).toBe(50);
      expect(component.getContinueLessonProgress({ completedModules: 0, totalModules: 0 } as unknown as ProgressRecord)).toBe(0);
    });

    it('navigateToBrowseLessons should call router', () => {
      component.navigateToBrowseLessons();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/student/lessons']);
    });
  });

  describe('D3 Radar Chart and View Lifecycle', () => {
    it('should call renderRadarChart in ngAfterViewInit if skills present', () => {
      const el = document.createElement('div');
      Object.defineProperty(el, 'clientWidth', { value: 300 });
      component.radarContainer = { nativeElement: el } as ElementRef;
      progressStoreMock.skillLevels.set([{ subject: 'Math', level: 80 }, { subject: 'Bio', level: 60 }, { subject: 'Physics', level: 70 }]);
      
      const spy = vi.spyOn(component, 'renderRadarChart');
      component.ngAfterViewInit();
      
      expect(spy).toHaveBeenCalled();
    });

    it('should clean up resizeObserver on destroy', () => {
      // Mock ResizeObserver
      const disconnectSpy = vi.fn();
      (component as unknown as { resizeObserver: { disconnect: () => void } }).resizeObserver = { disconnect: disconnectSpy };
      
      component.ngOnDestroy();
      expect(disconnectSpy).toHaveBeenCalled();
    });

    it('should render radar chart on resize observer trigger', () => {
      const el = document.createElement('div');
      Object.defineProperty(el, 'clientWidth', { value: 300 });
      component.radarContainer = { nativeElement: el } as ElementRef;
      progressStoreMock.skillLevels.set([{ subject: 'Math', level: 80 }, { subject: 'Bio', level: 60 }]);

      component.ngAfterViewInit();
      expect(resizeCallback).toBeDefined();

      const spy = vi.spyOn(component, 'renderRadarChart');
      if (resizeCallback) {
        resizeCallback();
      }
      expect(spy).toHaveBeenCalled();
    });

    it('should render SVG elements in renderRadarChart', () => {
      const el = document.createElement('div');
      Object.defineProperty(el, 'clientWidth', { value: 300 });
      component.radarContainer = { nativeElement: el } as ElementRef;
      const skills = [
        { subject: 'Math', level: 80 },
        { subject: 'Bio', level: 60 },
        { subject: 'Physics', level: 70 }
      ];

      component.renderRadarChart(skills);
      
      const svg = el.querySelector('svg');
      expect(svg).toBeTruthy();
      expect(svg?.getAttribute('aria-label')).toBe('Skill radar chart');
      expect(el.querySelectorAll('circle').length).toBeGreaterThan(0);
      expect(el.querySelectorAll('text').length).toBe(3);
    });
  });

  describe('Enrolled Classes Retrieval and Display', () => {
    it('should call loadStudentProfile on init', () => {
      TestBed.runInInjectionContext(() => {
        component.ngOnInit();
      });
      expect(studentProfileStoreMock.loadStudentProfile).toHaveBeenCalled();
      expect(progressStoreMock.loadMyHistory).toHaveBeenCalled();
    });

    it('should fetch student classes on init', async () => {
      studentProfileStoreMock.profile.set({
        enrolledClasses: ['class-123'],
      });
      
      // Let effects process
      await new Promise(resolve => setTimeout(resolve, 50));
      
      expect(component.enrolledClassesList().length).toBeGreaterThan(0);
      expect(component.enrolledClassesList()[0].id).toBe('class-1');
    });

    it('should clean enrolledClassesList if student has no classes', async () => {
      const classService = TestBed.inject(TeacherClassService);
      vi.spyOn(classService, 'getStudentClasses').mockReturnValue(of([]));
      studentProfileStoreMock.profile.set({
        enrolledClasses: [],
      });
      
      await new Promise(resolve => setTimeout(resolve, 50));
      expect(component.enrolledClassesList().length).toBe(0);
    });

    it('should handle getStudentClasses failure gracefully', async () => {
      const classService = TestBed.inject(TeacherClassService);
      vi.spyOn(classService, 'getStudentClasses').mockReturnValue(throwError(() => new Error('Failed')));

      studentProfileStoreMock.profile.set({
        enrolledClasses: ['class-failed'],
      });

      await new Promise(resolve => setTimeout(resolve, 50));
      expect(component.enrolledClassesList()).toEqual([]);
    });

    it('should load my lesson stats when continueLesson is set', async () => {
      progressStoreMock.continueLesson.set({ lessonId: 'lesson-continue', status: 'IN_PROGRESS' });
      await new Promise(resolve => setTimeout(resolve, 50));
      expect(progressStoreMock.loadMyLessonStats).toHaveBeenCalledWith({ lessonId: 'lesson-continue' });
    });
  });

  describe('History-based aggregate fallback', () => {
    it('computes started count and latest lesson from myHistory when dashboard aggregate is unavailable', () => {
      progressStoreMock.dashboard.set(null);
      progressStoreMock.myHistory.set([
        { lessonId: 'l1', status: 'in_progress', score: 70, dateCompleted: null },
        { lessonId: 'l2', status: 'completed', score: 90, dateCompleted: '2026-05-01', lessonTitle: 'Algebra Basics' },
        { lessonId: 'l3', status: 'completed', score: 80, dateCompleted: '2026-05-10', lessonTitle: 'Geometry Intro' },
      ]);

      expect(component.startedLessonsCount).toBe(3);
      expect(component.latestLessonTitle).toBe('Geometry Intro');
    });

    it('loads latest lesson by id and uses currentLesson title when history title is missing', async () => {
      progressStoreMock.dashboard.set(null);
      progressStoreMock.myHistory.set([
        { lessonId: 'lesson-123', status: 'completed', score: 80, dateCompleted: '2026-05-10', lessonTitle: '' },
      ]);
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(lessonsStoreMock.loadLesson).toHaveBeenCalledWith('lesson-123');

      lessonsStoreMock.lessons.set([{ id: 'lesson-123', title: 'Current Lesson Title 123' }]);
      expect(component.latestLessonTitle).toBe('Current Lesson Title 123');
    });

    it('ignores "Untitled lesson" history placeholder and uses currentLesson title', async () => {
      progressStoreMock.dashboard.set(null);
      progressStoreMock.myHistory.set([
        { lessonId: 'lesson-456', status: 'completed', score: 80, dateCompleted: '2026-05-11', lessonTitle: 'Untitled lesson' },
      ]);
      lessonsStoreMock.lessons.set([{ id: 'lesson-456', title: 'The Real Title 456' }]);
      expect(component.latestLessonTitle).toBe('The Real Title 456');
    });
  });
});
