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

  it('should return correct greeting based on time', () => {
    const greeting = component.greeting;
    expect(['Good morning', 'Good afternoon', 'Good evening']).toContain(greeting);
  });

  it('should return student first name from store', () => {
    expect(component.studentFirstName).toBe('Test');
  });

  it('should return initials correctly', () => {
    expect(component.initials).toBe('T');
  });
});
