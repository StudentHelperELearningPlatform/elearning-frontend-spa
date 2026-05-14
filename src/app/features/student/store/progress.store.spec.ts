import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { vi, describe, it, expect } from 'vitest';
import { ProgressStore } from './progress.store';
import type {
  DashboardData,
  LessonStats,
  StudentSummary,
  StudentDetailEntry,
  StudentHistory,
  LessonProgress,
} from './progress.store';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const mockDashboard: DashboardData = {
  totalLessons: 10,
  completedLessons: 7,
  averageScore: 82,
  lastActive: '2026-05-10T12:00:00Z',
  recentActivity: [],
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
    studentId: 'stu-1',
    studentName: 'Alice',
    classesEnrolled: 3,
    totalLessonsCompleted: 12,
    averageScore: 88,
    lastActive: '2026-05-01T09:00:00Z',
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

const mockLessonProgress: LessonProgress = {
  lessonId: 'lesson-42',
  status: 'completed',
  score: 95,
  dateCompleted: '2026-05-14T08:00:00Z',
};

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function setupStore() {
  const httpSpy = {
    get: vi.fn(),
    put: vi.fn(),
  };

  TestBed.configureTestingModule({
    providers: [
      ProgressStore,
      { provide: HttpClient, useValue: httpSpy },
    ],
  });

  const store = TestBed.inject(ProgressStore);
  return { store, http: httpSpy };
}

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

describe('ProgressStore', () => {

  describe('initial state', () => {
    it('should initialise with null dashboard and empty students', () => {
      const { store } = setupStore();
      expect(store.dashboard()).toBeNull();
      expect(store.students()).toEqual([]);
    });

    it('completionRate() should return 0 when dashboard is null', () => {
      const { store } = setupStore();
      expect(store.completionRate()).toBe(0);
    });
  });

  describe('loadDashboard()', () => {
    it('should set dashboard on success', () => {
      const { store, http } = setupStore();
      http.get.mockReturnValue(of(mockDashboard));

      store.loadDashboard();

      expect(http.get).toHaveBeenCalledWith(
        expect.stringContaining('/progress/me/dashboard'),
      );
      expect(store.dashboard()).toEqual(mockDashboard);
    });
  });

  describe('markLessonComplete()', () => {
    it('should call PUT with correct URL and body on success', () => {
      const { store, http } = setupStore();
      http.put.mockReturnValue(of(mockLessonProgress));

      store.markLessonComplete({ lessonId: 'lesson-42', score: 95 });

      expect(http.put).toHaveBeenCalledWith(
        expect.stringContaining('/lessons/lesson-42/progress'),
        { status: 'completed', score: 95 },
      );
    });
  });

  describe('loadLessonStats()', () => {
    it('should fetch lesson stats and store them', () => {
      const { store, http } = setupStore();
      http.get.mockReturnValue(of(mockLessonStats));

      store.loadLessonStats({ classId: 'class-1', lessonId: 'lesson-1' });

      expect(http.get).toHaveBeenCalledWith(
        expect.stringContaining('/progress/classes/class-1/lessons/lesson-1/stats'),
      );
    });
  });

  describe('loadStudents()', () => {
    it('should load and store students list', () => {
      const { store, http } = setupStore();
      http.get.mockReturnValue(of(mockStudents));

      store.loadStudents();

      expect(http.get).toHaveBeenCalledWith(
        expect.stringContaining('/progress/professor/students'),
      );
    });
  });

  describe('loadStudentDetail()', () => {
    it('should load detail and set selectedStudentId', () => {
      const { store, http } = setupStore();
      http.get.mockReturnValue(of(mockDetail));

      store.loadStudentDetail({ studentId: 'stu-1' });

      expect(http.get).toHaveBeenCalledWith(
        expect.stringContaining('/progress/professor/students/stu-1'),
      );
      expect(store.selectedStudentId()).toBe('stu-1');
    });
  });

  describe('loadStudentHistory()', () => {
    it('should load full student history', () => {
      const { store, http } = setupStore();
      http.get.mockReturnValue(of(mockHistory));

      store.loadStudentHistory({ studentId: 'stu-1' });

      expect(http.get).toHaveBeenCalledWith(
        expect.stringContaining('/progress/professor/students/stu-1/history'),
      );
    });
  });
});