import { TestBed } from '@angular/core/testing';
import { ProgressDashboardComponent } from './progress-dashboard.component';
import { ProgressStore } from '../store/progress.store';
import { AuthStore } from '../../auth/store/auth.store';
import { ElementRef, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { createAuthStoreStub } from '../../../../test-utils/auth-testing';
import { ActivityItem, ProgressRecord } from '@shared/models/progress.model';
import { provideApiMocks } from '../../../../test-utils/api-testing';

describe('ProgressDashboardComponent (Logic)', () => {
  let component: ProgressDashboardComponent;
  let progressStoreMock: {
    student: WritableSignal<unknown>;
    activeStreak: WritableSignal<number>;
    skillLevels: WritableSignal<unknown[]>;
    loadDashboard: ReturnType<typeof vi.fn>;
    loadMyDashboard: ReturnType<typeof vi.fn>;
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
  };
  let authStoreStub: ReturnType<typeof createAuthStoreStub>;
  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    // Mock ResizeObserver
    global.ResizeObserver = class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    } as unknown as typeof ResizeObserver;

    progressStoreMock = {
      student: signal({ firstName: 'Test', totalLessons: 10, completedLessons: 5 }),
      activeStreak: signal(5),
      skillLevels: signal([]),
      loadDashboard: vi.fn(),
      loadMyDashboard: vi.fn(),
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
    };

    authStoreStub = createAuthStoreStub({
      user: { id: '123', name: 'Test User' },
      isAuthenticated: true
    });

    routerMock = {
      navigate: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ProgressStore, useValue: progressStoreMock },
        { provide: AuthStore, useValue: authStoreStub },
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

  it('should call progressStore.loadDashboard on init', () => {
    TestBed.runInInjectionContext(() => {
      component.ngOnInit();
    });
    expect(progressStoreMock.loadDashboard).toHaveBeenCalledWith('123');
  });

  it('should also pull aggregate stats from loadMyDashboard on init', () => {
    TestBed.runInInjectionContext(() => {
      component.ngOnInit();
    });
    expect(progressStoreMock.loadMyDashboard).toHaveBeenCalled();
  });

  it('should NOT call loadDashboard when user is not set (guards against wrong account)', () => {
    (authStoreStub.user as WritableSignal<{ id: string, name: string } | null>).set(null);
    TestBed.runInInjectionContext(() => {
      component.ngOnInit();
    });
    expect(progressStoreMock.loadDashboard).not.toHaveBeenCalled();
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
});
