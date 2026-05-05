import { TestBed } from '@angular/core/testing';
import { ProgressDashboardComponent } from './progress-dashboard.component';
import { ProgressStore } from '../store/progress.store';
import { AuthStore } from '../../auth/store/auth.store';
import { signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

describe('ProgressDashboardComponent (Logic)', () => {
  let component: ProgressDashboardComponent;
  let progressStoreMock: {
    student: WritableSignal<unknown>;
    activeStreak: WritableSignal<number>;
    skillLevels: WritableSignal<unknown[]>;
    loadDashboard: ReturnType<typeof vi.fn>;
    loading: WritableSignal<boolean>;
    error: WritableSignal<string | null>;
    recentMilestones: WritableSignal<unknown[]>;
    recentActivity: WritableSignal<unknown[]>;
    upcomingQuizzes: WritableSignal<unknown[]>;
    progressRecords: WritableSignal<unknown[]>;
    overallProgressPercent: WritableSignal<number>;
    continueLesson: WritableSignal<unknown>;
  };
  let authStoreMock: {
    user: WritableSignal<{ id: string, name: string } | null>;
  };
  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    progressStoreMock = {
      student: signal({ firstName: 'Test', totalLessons: 10, completedLessons: 5 }),
      activeStreak: signal(5),
      skillLevels: signal([]),
      loadDashboard: vi.fn(),
      loading: signal(false),
      error: signal(null),
      recentMilestones: signal([]),
      recentActivity: signal([]),
      upcomingQuizzes: signal([]),
      progressRecords: signal([]),
      overallProgressPercent: signal(50),
      continueLesson: signal(null),
    };

    authStoreMock = {
      user: signal({ id: '123', name: 'Test User' }),
    };

    routerMock = {
      navigate: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ProgressStore, useValue: progressStoreMock },
        { provide: AuthStore, useValue: authStoreMock },
        { provide: Router, useValue: routerMock },
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

  it('should use fallback studentId "1" if user is not set', () => {
    authStoreMock.user.set(null);
    TestBed.runInInjectionContext(() => {
      component.ngOnInit();
    });
    expect(progressStoreMock.loadDashboard).toHaveBeenCalledWith('1');
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

  it('should return a motivational message based on the date', () => {
    vi.setSystemTime(new Date('2024-01-01')); // Day 1
    const msg1 = component.motivationalMessage;
    
    vi.setSystemTime(new Date('2024-01-02')); // Day 2
    const msg2 = component.motivationalMessage;
    
    expect(msg1).toBeDefined();
    expect(msg2).toBeDefined();
    expect(msg1).not.toBe(msg2);
    vi.useRealTimers();
  });
});
