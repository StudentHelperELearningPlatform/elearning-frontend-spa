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

    it('should pass classId query parameter if provided', () => {
      store.loadMyDashboard({ classId: '3fa85f64-5717-4562-b3fc-2c963f66afa6' });
      const req = http.expectOne((r) =>
        r.url.includes('/progress/me/dashboard') && r.params.get('classId') === '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      );
      req.flush(mockDashboard);
      expect(store.dashboard()).toEqual(mockDashboard);
    });

    it('should fallback to placeholder UUID if no classId provided', () => {
      store.loadMyDashboard();
      const req = http.expectOne((r) =>
        r.url.includes('/progress/me/dashboard') && r.params.get('classId') === '00000000-0000-0000-0000-000000000000',
      );
      req.flush(mockDashboard);
      expect(store.dashboard()).toEqual(mockDashboard);
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
  });

  // ── loadDashboard (Legacy) ─────────────────────────────────────────────────

  describe('loadDashboard() — legacy', () => {
    it('should populate legacy state fields on success', () => {
      store.loadDashboard('stu-1');
      const req = http.expectOne((r) =>
        r.url.includes('/progress/me/dashboard'),
      );
      req.flush(mockDashboard);
      expect(store.loading()).toBe(false);
      expect(store.error()).toBeNull();
    });

    it('should set error state when legacy API fails', () => {
      store.loadDashboard('stu-1');
      const req = http.expectOne((r) =>
        r.url.includes('/progress/me/dashboard'),
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
        r.url.includes('/progress/teacher/students'),
      );
      req.flush(mockStudents);
      expect(store.students()).toEqual(mockStudents);
      expect(store.studentsLoading()).toBe(false);
    });

    it('should set studentsError on failure', () => {
      store.loadStudents();
      const req = http.expectOne((r) =>
        r.url.includes('/progress/teacher/students'),
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

  // ── Additional Branch Coverage Tests ──────────────────────────────────────────

  describe('Additional Branch Coverage Tests', () => {
    it('completionRate() and overallProgressPercent() fallbacks', () => {
      // 1. Dashboard null, student null
      expect(store.completionRate()).toBe(0);
      expect(store.overallProgressPercent()).toBe(0);

      // 2. Dashboard with no totalLessons, student null
      // Let's set dashboard state manually by loading it
      store.loadMyDashboard();
      let req = http.expectOne((r) => r.url.includes('/progress/me/dashboard'));
      req.flush({ totalLessons: 0, completedLessons: 0 });
      expect(store.completionRate()).toBe(0);

      // Reset dashboard to null, set student with totalLessons = 0
      store.loadDashboard('stu-1');
      req = http.expectOne((r) => r.url.includes('/progress/me/dashboard'));
      req.flush({ studentId: 'stu-1', student: { id: 'stu-1', totalLessons: 0 } });
      expect(store.completionRate()).toBe(0);
      expect(store.overallProgressPercent()).toBe(0);

      // Set student with totalLessons > 0, dashboard is null (loadDashboard doesn't set store.dashboard)
      store.loadDashboard('stu-2');
      req = http.expectOne((r) => r.url.includes('/progress/me/dashboard'));
      req.flush({
        student: {
          id: 'stu-2',
          totalLessons: 10,
          completedLessons: 6,
        }
      });
      // Now dashboard is null, student is populated. Should fall back to student.
      expect(store.completionRate()).toBe(60);
      expect(store.overallProgressPercent()).toBe(60);
    });

    it('recentMilestones() sorting and filtering logic', () => {
      store.loadDashboard('stu-1');
      const req = http.expectOne((r) => r.url.includes('/progress/me/dashboard'));
      req.flush({
        milestones: [
          { id: 'm1', name: 'M1', earnedAt: '2026-05-01T12:00:00Z' },
          { id: 'm2', name: 'M2', earnedAt: null },
          { id: 'm3', name: 'M3', earnedAt: '2026-05-03T12:00:00Z' },
          { id: 'm4', name: 'M4', earnedAt: '2026-05-02T12:00:00Z' },
          { id: 'm5', name: 'M5', earnedAt: '2026-05-04T12:00:00Z' },
        ],
      });

      const milestones = store.recentMilestones();
      expect(milestones.length).toBe(3);
      expect(milestones[0].id).toBe('m5'); // 2026-05-04
      expect(milestones[1].id).toBe('m3'); // 2026-05-03
      expect(milestones[2].id).toBe('m4'); // 2026-05-02
    });

    it('continueLesson() reduce logic with multiple IN_PROGRESS records', () => {
      store.loadDashboard('stu-1');
      const req = http.expectOne((r) => r.url.includes('/progress/me/dashboard'));
      req.flush({
        progressRecords: [
          { lessonId: 'l1', status: 'COMPLETED', lastAccessedAt: '2026-05-05T12:00:00Z' },
          { lessonId: 'l2', status: 'IN_PROGRESS', lastAccessedAt: '2026-05-01T12:00:00Z' },
          { lessonId: 'l3', status: 'IN_PROGRESS', lastAccessedAt: '2026-05-03T12:00:00Z' },
          { lessonId: 'l4', status: 'IN_PROGRESS', lastAccessedAt: '2026-05-02T12:00:00Z' },
        ],
      });

      const cont = store.continueLesson();
      expect(cont).toBeTruthy();
      expect(cont!.lessonId).toBe('l3'); // latest lastAccessedAt
    });

    it('loadDashboard mapping branches for legacy shapes', () => {
      store.loadDashboard('stu-1');
      const req = http.expectOne((r) => r.url.includes('/progress/me/dashboard'));
      req.flush({
        student: {
          id: 'stu-nested',
          firstName: 'NestedFirst',
          lastName: 'NestedLast',
          totalLessons: 8,
          completedLessons: 4,
        },
        subjects: [
          { subjectId: 'subj-1', skillLevel: 4 },
          { subjectId: 'subj-2', subjectName: 'Subject 2' },
        ],
        streak: {
          currentStreak: 5,
          longestStreak: 10,
          lastActivityDate: '2026-05-15T00:00:00Z',
        },
      });

      expect(store.student()?.id).toBe('stu-nested');
      expect(store.student()?.firstName).toBe('NestedFirst');
      expect(store.student()?.lastName).toBe('NestedLast');
      expect(store.student()?.totalLessons).toBe(8);
      expect(store.student()?.completedLessons).toBe(4);
      expect(store.skillLevels()).toEqual([
        { subject: 'subj-1', level: 4 },
        { subject: 'Subject 2', level: 0 },
      ]);
      expect(store.streak()?.currentStreak).toBe(5);
      expect(store.streak()?.longestStreak).toBe(10);
      expect(store.streak()?.lastActivityDate).toBe('2026-05-15T00:00:00Z');
    });

    it('loadMyLessonStats mapping branches for COMPLETED, IN_PROGRESS and default statuses', () => {
      // Test COMPLETED
      store.loadMyLessonStats({ lessonId: 'lesson-1' });
      let req = http.expectOne((r) => r.url.includes('/progress/me/lessons/lesson-1/stats'));
      req.flush({
        lessonId: '',
        status: 'COMPLETED',
        quizScore: 90,
      });
      expect(store.myLessonStats()?.completionPercentage).toBe(100);
      expect(store.myLessonStats()?.completedModules).toBe(1);

      // Test IN_PROGRESS
      store.loadMyLessonStats({ lessonId: 'lesson-2' });
      req = http.expectOne((r) => r.url.includes('/progress/me/lessons/lesson-2/stats'));
      req.flush({
        lessonId: 'lesson-2',
        status: 'IN_PROGRESS',
        accumulatedScore: 50,
      });
      expect(store.myLessonStats()?.completionPercentage).toBe(50);
      expect(store.myLessonStats()?.completedModules).toBe(0);
      expect(store.myLessonStats()?.quizScore).toBe(50);

      // Test NOT_STARTED / default
      store.loadMyLessonStats({ lessonId: 'lesson-3' });
      req = http.expectOne((r) => r.url.includes('/progress/me/lessons/lesson-3/stats'));
      req.flush({
        lessonId: 'lesson-3',
        status: 'NOT_STARTED',
      });
      expect(store.myLessonStats()?.completionPercentage).toBe(0);
      expect(store.myLessonStats()?.completedModules).toBe(0);
      expect(store.myLessonStats()?.quizScore).toBeNull();
    });

    it('loadMyHistory mapping branches', () => {
      store.loadMyHistory();
      const req = http.expectOne((r) => r.url.includes('/progress/me/history'));
      req.flush([
        {
          lessonId: 'lesson-123456789',
          completedAt: '2026-05-10T10:00:00Z',
        },
        {
          lessonId: '',
          subject: 'Science',
        },
      ]);

      const history = store.myHistory();
      expect(history.length).toBe(2);

      // First item checks: lessonTitle auto formatted, subject default, status based on completedAt
      expect(history[0].lessonId).toBe('lesson-123456789');
      expect(history[0].lessonTitle).toBe('Lecția lesson-1');
      expect(history[0].subject).toBe('General');
      expect(history[0].status).toBe('completed');
      expect(history[0].dateCompleted).toBe('2026-05-10T10:00:00Z');

      // Second item checks: empty lessonId, lessonTitle auto-formatted, custom subject, status in_progress
      expect(history[1].lessonId).toBe('');
      expect(history[1].lessonTitle).toBe('Lecția ');
      expect(history[1].subject).toBe('Science');
      expect(history[1].status).toBe('in_progress');
      expect(history[1].dateCompleted).toBeNull();
    });
  });
});