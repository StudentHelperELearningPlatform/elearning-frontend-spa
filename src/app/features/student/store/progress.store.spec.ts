import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideApiMocks } from '../../../../test-utils/api-testing';
import { ProgressStore } from './progress.store';
import type {
  DashboardData,
  LessonStats,
  MyLessonStats,
  HistoryEntry,
  StudentSummary,
  StudentDetailEntry,
  StudentHistory,
} from './progress.store';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const mockDashboard: DashboardData = {
  student: null,
  skillLevels: [],
  streak: null,
  progressRecords: [],
  recentActivity: [],
  milestones: [],
  upcomingQuizzes: [],
  totalLessons: 10,
  completedLessons: 7,
  averageScore: 82,
  lastActive: '2026-05-10T12:00:00Z',
};

const mockLessonStats: LessonStats = {
  lessonId: 'lesson-1',
  classId: 'class-1',
  totalStudents: 30,
  completedCount: 20,
  averageScore: 78,
  completionRate: 66.67,
};

const mockStudents: StudentSummary[] = [
  {
    id: 'stu-1',
    firstName: 'Alice',
    totalLessons: 12,
    completedLessons: 10,
  },
];

const mockDetail: StudentDetailEntry[] = [
  {
    className: 'Math 101',
    lessonTitle: 'Intro to Algebra',
    lessonId: 'lesson-1',
    status: 'completed',
    score: 90,
    dateCompleted: '2026-04-20T10:00:00Z',
  },
];

const mockHistory: StudentHistory = {
  studentId: 'stu-1',
  studentName: 'Alice',
  history: mockDetail,
};

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

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

  describe('initial state', () => {
    it('should initialise with null dashboard and empty students', () => {
      expect(store.dashboard()).toBeNull();
      expect(store.students()).toEqual([]);
    });

    it('completionRate() should return 0 when dashboard is null', () => {
      expect(store.completionRate()).toBe(0);
    });

    it('should initialise loading flags as false', () => {
      expect(store.dashboardLoading()).toBe(false);
      expect(store.studentsLoading()).toBe(false);
      expect(store.markCompleteLoading()).toBe(false);
      expect(store.selectedStudentLoading()).toBe(false);
      expect(store.studentHistoryLoading()).toBe(false);
      expect(store.lessonStatsLoading()).toBe(false);
    });

    it('should initialise legacy state as empty', () => {
      expect(store.student()).toBeNull();
      expect(store.skillLevels()).toEqual([]);
      expect(store.streak()).toBeNull();
      expect(store.progressRecords()).toEqual([]);
      expect(store.milestones()).toEqual([]);
    });

    it('activeStreak() should return 0 when streak is null', () => {
      expect(store.activeStreak()).toBe(0);
    });

    it('continueLesson() should return null when no progress records', () => {
      expect(store.continueLesson()).toBeNull();
    });

    it('recentMilestones() should return empty array when no milestones', () => {
      expect(store.recentMilestones()).toEqual([]);
    });

    it('studentsFiltered() should return empty array initially', () => {
      expect(store.studentsFiltered()).toEqual([]);
    });

    it('firstName() should return null when student is null', () => {
      expect(store.firstName()).toBeNull();
    });
  });

  // ── loadMyDashboard (Sprint 6) ─────────────────────────────────────────────

  describe('loadMyDashboard()', () => {
    it('should set dashboard on success', () => {
      store.loadMyDashboard();
      const req = http.expectOne((r) =>
        r.url.includes('/progress/me/dashboard'),
      );
      req.flush(mockDashboard);
      expect(store.dashboard()).toEqual(mockDashboard);
      expect(store.dashboardLoading()).toBe(false);
    });

    it('completionRate() should compute from dashboard on success', () => {
      store.loadMyDashboard();
      const req = http.expectOne((r) =>
        r.url.includes('/progress/me/dashboard'),
      );
      req.flush(mockDashboard);
      // 7/10 * 100 = 70
      expect(store.completionRate()).toBe(70);
    });

    it('should set dashboardError on failure', () => {
      store.loadMyDashboard();
      const req = http.expectOne((r) =>
        r.url.includes('/progress/me/dashboard'),
      );
      req.flush('Server error', { status: 500, statusText: 'Server Error' });
      expect(store.dashboardLoading()).toBe(false);
      expect(store.dashboardError()).toBeTruthy();
    });

    it('should populate the legacy state slots (student, skillLevels, streak, …) from the response', () => {
      // The progress-dashboard UI binds to these legacy slots. Since the
      // /students/{id}/dashboard endpoint was retired, loadMyDashboard must
      // be the single source that fills them.
      const richDashboard: DashboardData = {
        ...mockDashboard,
        student: {
          id: 'stu-7',
          firstName: 'River',
          totalLessons: 10,
          completedLessons: 7,
        },
        skillLevels: [
          { subject: 'Math', level: 80 },
          { subject: 'Bio', level: 60 },
        ],
        streak: {
          currentStreak: 5,
          longestStreak: 9,
          lastActivityDate: '2026-05-16T00:00:00Z',
        },
        progressRecords: [
          {
            id: 'P1',
            lessonId: 'L1',
            lessonTitle: 'Intro',
            subject: 'Math',
            status: 'IN_PROGRESS',
            lastAccessedAt: '2026-05-15T10:00:00Z',
            completedModules: 2,
            totalModules: 4,
          },
        ],
        milestones: [
          {
            id: 'M1',
            title: 'First lesson',
            description: 'Completed your first lesson',
            category: 'learning',
            icon: 'star',
            earnedAt: '2026-05-01T00:00:00Z',
          },
        ],
      };

      store.loadMyDashboard();
      const req = http.expectOne((r) =>
        r.url.includes('/progress/me/dashboard'),
      );
      req.flush(richDashboard);

      expect(store.student()).toEqual(richDashboard.student);
      expect(store.skillLevels()).toEqual(richDashboard.skillLevels);
      expect(store.streak()).toEqual(richDashboard.streak);
      expect(store.progressRecords()).toEqual(richDashboard.progressRecords);
      expect(store.milestones()).toEqual(richDashboard.milestones);
      expect(store.loading()).toBe(false);
      expect(store.error()).toBeNull();
    });
  });

  // ── loadDashboard (Legacy) ─────────────────────────────────────────────────

  describe('loadDashboard() — legacy', () => {
    it('should populate legacy state fields on success', () => {
      store.loadDashboard('stu-1');
      const req = http.expectOne((r) =>
        r.url.includes('/students/stu-1/dashboard'),
      );
      req.flush(mockDashboard);
      expect(store.loading()).toBe(false);
      expect(store.error()).toBeNull();
    });

    it('should set error state when legacy API fails', () => {
      store.loadDashboard('stu-1');
      const req = http.expectOne((r) =>
        r.url.includes('/students/stu-1/dashboard'),
      );
      req.error(new ProgressEvent('error'));
      expect(store.loading()).toBe(false);
      expect(store.error()).toBeTruthy();
    });
  });

  // ── markLessonComplete ─────────────────────────────────────────────────────

  describe('markLessonComplete()', () => {
    it('should call PUT with correct URL and body', () => {
      store.markLessonComplete({ lessonId: 'lesson-42', score: 95 });
      const req = http.expectOne((r) =>
        r.url.includes('/lessons/lesson-42/progress') && r.method === 'PUT',
      );
      expect(req.request.body).toEqual({ status: 'completed', score: 95 });
      req.flush({});
      expect(store.markCompleteLoading()).toBe(false);
    });

    it('should use null score when score is omitted', () => {
      store.markLessonComplete({ lessonId: 'lesson-1' });
      const req = http.expectOne((r) =>
        r.url.includes('/lessons/lesson-1/progress') && r.method === 'PUT',
      );
      expect(req.request.body).toEqual({ status: 'completed', score: null });
      req.flush({});
    });

    it('should set markCompleteError on failure', () => {
      store.markLessonComplete({ lessonId: 'lesson-1', score: 80 });
      const req = http.expectOne((r) =>
        r.url.includes('/lessons/lesson-1/progress') && r.method === 'PUT',
      );
      req.flush('Error', { status: 500, statusText: 'Server Error' });
      expect(store.markCompleteLoading()).toBe(false);
      expect(store.markCompleteError()).toBeTruthy();
    });
  });

  // ── loadLessonStats ────────────────────────────────────────────────────────

  describe('loadLessonStats()', () => {
    it('should fetch lesson stats and store them', () => {
      store.loadLessonStats({ classId: 'class-1', lessonId: 'lesson-1' });
      const req = http.expectOne((r) =>
        r.url.includes('/progress/classes/class-1/lessons/lesson-1/stats'),
      );
      req.flush(mockLessonStats);
      expect(store.lessonStats()).toEqual(mockLessonStats);
      expect(store.lessonStatsLoading()).toBe(false);
    });

    it('should set lessonStatsError on failure', () => {
      store.loadLessonStats({ classId: 'class-1', lessonId: 'lesson-1' });
      const req = http.expectOne((r) =>
        r.url.includes('/progress/classes/class-1/lessons/lesson-1/stats'),
      );
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
      expect(store.lessonStatsLoading()).toBe(false);
      expect(store.lessonStatsError()).toBeTruthy();
    });
  });

  // ── loadStudents ───────────────────────────────────────────────────────────

  describe('loadStudents()', () => {
    it('should load and store students list', () => {
      store.loadStudents();
      const req = http.expectOne((r) =>
        r.url.includes('/progress/professor/students'),
      );
      req.flush(mockStudents);
      expect(store.students()).toEqual(mockStudents);
      expect(store.studentsLoading()).toBe(false);
    });

    it('should set studentsError on failure', () => {
      store.loadStudents();
      const req = http.expectOne((r) =>
        r.url.includes('/progress/professor/students'),
      );
      req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
      expect(store.studentsLoading()).toBe(false);
      expect(store.studentsError()).toBeTruthy();
    });
  });

  // ── loadStudentDetail ──────────────────────────────────────────────────────

  describe('loadStudentDetail()', () => {
    it('should load detail and set selectedStudentId', () => {
      store.loadStudentDetail({ studentId: 'stu-1' });
      const req = http.expectOne((r) =>
        r.url.includes('/progress/professor/students/stu-1') &&
        !r.url.includes('/history'),
      );
      req.flush(mockDetail);
      expect(store.selectedStudentId()).toBe('stu-1');
      expect(store.selectedStudent()).toEqual(mockDetail);
      expect(store.selectedStudentLoading()).toBe(false);
    });

    it('should set selectedStudentError on failure', () => {
      store.loadStudentDetail({ studentId: 'stu-999' });
      const req = http.expectOne((r) =>
        r.url.includes('/progress/professor/students/stu-999') &&
        !r.url.includes('/history'),
      );
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
      expect(store.selectedStudentLoading()).toBe(false);
      expect(store.selectedStudentError()).toBeTruthy();
    });
  });

  // ── S6-stats-01: loadMyLessonStats ────────────────────────────────────────

  describe('loadMyLessonStats()', () => {
    const mockMyStats: MyLessonStats = {
      lessonId: 'lesson-7',
      completionPercentage: 60,
      completedModules: 3,
      totalModules: 5,
      quizScore: 88,
      timeSpentMinutes: 24,
      lastAccessedAt: '2026-05-10T08:00:00Z',
      classAverageScore: 76,
    };

    it('fetches per-lesson stats for the signed-in student', () => {
      store.loadMyLessonStats({ lessonId: 'lesson-7' });
      const req = http.expectOne((r) =>
        r.url.includes('/progress/me/lessons/lesson-7/stats'),
      );
      req.flush(mockMyStats);
      expect(store.myLessonStats()).toEqual(mockMyStats);
      expect(store.myLessonStatsLoading()).toBe(false);
    });

    it('sets myLessonStatsError on failure', () => {
      store.loadMyLessonStats({ lessonId: 'lesson-7' });
      const req = http.expectOne((r) =>
        r.url.includes('/progress/me/lessons/lesson-7/stats'),
      );
      req.flush('boom', { status: 500, statusText: 'Server Error' });
      expect(store.myLessonStatsLoading()).toBe(false);
      expect(store.myLessonStatsError()).toBeTruthy();
    });
  });

  // ── S6-stats-01: loadMyHistory ────────────────────────────────────────────

  describe('loadMyHistory()', () => {
    const mockHistoryRows: HistoryEntry[] = [
      {
        lessonId: 'lesson-a',
        lessonTitle: 'Algebra',
        subject: 'Math',
        status: 'completed',
        score: 91,
        dateCompleted: '2026-05-05T10:00:00Z',
      },
      {
        lessonId: 'lesson-b',
        lessonTitle: 'Cells',
        subject: 'Biology',
        status: 'completed',
        score: 72,
        dateCompleted: '2026-04-30T10:00:00Z',
      },
    ];

    it('populates myHistory on success', () => {
      store.loadMyHistory();
      const req = http.expectOne((r) => r.url.includes('/progress/me/history'));
      req.flush(mockHistoryRows);
      expect(store.myHistory()).toEqual(mockHistoryRows);
      expect(store.myHistoryLoading()).toBe(false);
    });

    it('coerces a null response into an empty array', () => {
      store.loadMyHistory();
      const req = http.expectOne((r) => r.url.includes('/progress/me/history'));
      req.flush(null);
      expect(store.myHistory()).toEqual([]);
    });

    it('sets myHistoryError on failure', () => {
      store.loadMyHistory();
      const req = http.expectOne((r) => r.url.includes('/progress/me/history'));
      req.flush('nope', { status: 500, statusText: 'Server Error' });
      expect(store.myHistoryLoading()).toBe(false);
      expect(store.myHistoryError()).toBeTruthy();
    });
  });

  // ── loadStudentHistory ─────────────────────────────────────────────────────

  describe('loadStudentHistory()', () => {
    it('should load full student history', () => {
      store.loadStudentHistory({ studentId: 'stu-1' });
      const req = http.expectOne((r) =>
        r.url.includes('/progress/professor/students/stu-1/history'),
      );
      req.flush(mockHistory);
      expect(store.studentHistory()).toEqual(mockHistory);
      expect(store.studentHistoryLoading()).toBe(false);
    });

    it('should set studentHistoryError on failure', () => {
      store.loadStudentHistory({ studentId: 'stu-1' });
      const req = http.expectOne((r) =>
        r.url.includes('/progress/professor/students/stu-1/history'),
      );
      req.flush('Server error', { status: 500, statusText: 'Server Error' });
      expect(store.studentHistoryLoading()).toBe(false);
      expect(store.studentHistoryError()).toBeTruthy();
    });
  });
});