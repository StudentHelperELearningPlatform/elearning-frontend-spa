import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideApiMocks } from '../../../../test-utils/api-testing';
import { patchStore } from '../../../../test-utils/patch-store';
import { ProgressStore } from './progress.store';
import { DashboardData } from '@shared/models/progress.model';

const mockDashboard: DashboardData = {
  student: {
    id: '1',
    firstName: 'Alex',
    totalLessons: 20,
    completedLessons: 10,
  },
  streak: {
    currentStreak: 5,
    longestStreak: 14,
    lastActivityDate: new Date().toISOString(),
  },
  skillLevels: [
    { subject: 'Math', level: 72 },
    { subject: 'Science', level: 58 },
    { subject: 'English', level: 85 },
    { subject: 'History', level: 43 },
    { subject: 'Geography', level: 61 },
  ],
  progressRecords: [
    {
      id: 'pr1',
      lessonId: 'l1',
      lessonTitle: 'Fractions',
      subject: 'Math',
      status: 'COMPLETED',
      completedModules: 4,
      totalModules: 4,
      lastAccessedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: 'pr2',
      lessonId: 'l2',
      lessonTitle: 'Adding Fractions',
      subject: 'Math',
      status: 'IN_PROGRESS',
      completedModules: 2,
      totalModules: 5,
      lastAccessedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: 'pr3',
      lessonId: 'l3',
      lessonTitle: 'Water Cycle',
      subject: 'Science',
      status: 'IN_PROGRESS',
      completedModules: 1,
      totalModules: 3,
      lastAccessedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
  ],
  recentActivity: [
    {
      id: 'act1',
      type: 'lesson',
      title: 'Completed Fractions',
      timestamp: new Date().toISOString(),
      lessonId: 'l1',
    },
    {
      id: 'act2',
      type: 'quiz',
      title: 'Passed Fractions Quiz',
      timestamp: new Date().toISOString(),
      quizId: 'q1',
      attemptId: 'a1',
    },
    {
      id: 'act3',
      type: 'milestone',
      title: 'Badge: First Lesson',
      timestamp: new Date().toISOString(),
    },
  ],
  milestones: [
    {
      id: 'm1',
      title: 'First Lesson',
      description: 'Complete your first lesson',
      category: 'learning',
      icon: 'pi-book',
      earnedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    },
    {
      id: 'm2',
      title: '7-Day Streak',
      description: 'Study 7 days in a row',
      category: 'streak',
      icon: 'pi-bolt',
      earnedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    },
    {
      id: 'm3',
      title: 'Locked Badge',
      description: 'Locked',
      category: 'mastery',
      icon: 'pi-star',
      earnedAt: null,
      progress: 2,
      goal: 10,
    },
  ],
  upcomingQuizzes: [
    { id: 'uq1', title: 'Fractions Test', subject: 'Math', dueDate: new Date().toISOString() },
  ],
};

describe('ProgressStore', () => {
  let store: InstanceType<typeof ProgressStore>;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ...provideApiMocks(),
      ],
    });
    store = TestBed.inject(ProgressStore);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  // ── Initial state ──────────────────────────────────────────────────────────

  it('starts with loading: false and empty collections', () => {
    expect(store.loading()).toBe(false);
    expect(store.progressRecords()).toHaveLength(0);
    expect(store.skillLevels()).toHaveLength(0);
    expect(store.streak()).toBeNull();
    expect(store.milestones()).toHaveLength(0);
    expect(store.recentActivity()).toHaveLength(0);
    expect(store.error()).toBeNull();
  });

  // ── loadDashboard ──────────────────────────────────────────────────────────

  it('sets loading true while request is pending', () => {
    store.loadDashboard('1');
    expect(store.loading()).toBe(true);
    http.expectOne('/api/v1/students/1/dashboard').flush(mockDashboard);
  });

  it('populates all state fields on success', () => {
    store.loadDashboard('1');
    http.expectOne('/api/v1/students/1/dashboard').flush(mockDashboard);

    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.student()?.firstName).toBe('Alex');
    expect(store.skillLevels()).toHaveLength(5);
    expect(store.progressRecords()).toHaveLength(3);
    expect(store.recentActivity()).toHaveLength(3);
    expect(store.milestones()).toHaveLength(3);
    expect(store.streak()?.currentStreak).toBe(5);
    expect(store.upcomingQuizzes()).toHaveLength(1);
  });

  it('sets error state when API fails', () => {
    store.loadDashboard('1');
    http.expectOne('/api/v1/students/1/dashboard').error(new ProgressEvent('error'));

    expect(store.loading()).toBe(false);
    expect(store.error()).toBeTruthy();
  });

  // ── Computed signals ───────────────────────────────────────────────────────

  it('overallProgressPercent = (completedLessons / totalLessons) * 100', () => {
    store.loadDashboard('1');
    http.expectOne('/api/v1/students/1/dashboard').flush(mockDashboard);

    // 10 / 20 * 100 = 50
    expect(store.overallProgressPercent()).toBe(50);
  });

  it('overallProgressPercent is 0 when no student data', () => {
    expect(store.overallProgressPercent()).toBe(0);
  });

  it('activeStreak returns currentStreak from streak data', () => {
    store.loadDashboard('1');
    http.expectOne('/api/v1/students/1/dashboard').flush(mockDashboard);

    expect(store.activeStreak()).toBe(5);
  });

  it('activeStreak is 0 when streak is null', () => {
    expect(store.activeStreak()).toBe(0);
  });

  it('recentMilestones returns only earned milestones sorted by date desc, max 3', () => {
    store.loadDashboard('1');
    http.expectOne('/api/v1/students/1/dashboard').flush(mockDashboard);

    const recent = store.recentMilestones();
    // 2 earned milestones
    expect(recent.length).toBe(2);
    // Sorted by earnedAt desc — m2 earned 1 day ago, m1 earned 3 days ago
    expect(recent[0].id).toBe('m2');
    expect(recent[1].id).toBe('m1');
  });

  it('continueLesson returns the most recently accessed IN_PROGRESS record', () => {
    store.loadDashboard('1');
    http.expectOne('/api/v1/students/1/dashboard').flush(mockDashboard);

    // pr2 is IN_PROGRESS and more recent than pr3
    const lesson = store.continueLesson();
    expect(lesson).not.toBeNull();
    expect(lesson?.id).toBe('pr2');
    expect(lesson?.status).toBe('IN_PROGRESS');
  });

  it('continueLesson is null when no IN_PROGRESS records', () => {
    patchStore(store, { progressRecords: [] });
    expect(store.continueLesson()).toBeNull();
  });
});
