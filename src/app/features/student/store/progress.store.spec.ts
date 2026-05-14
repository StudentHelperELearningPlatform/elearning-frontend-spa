// src/app/features/student/store/progress.store.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideApiMocks } from '../../../../test-utils/api-testing';
import { ProgressStore } from './progress.store';
import type {
  LessonStats,
  StudentSummary,
  StudentDetailEntry,
  StudentHistory,
} from './progress.store';

// Fixtures
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

  describe('initial state', () => {
    it('should initialise with null dashboard and empty students', () => {
      expect(store.dashboard()).toBeNull();
      expect(store.students()).toEqual([]);
    });

    it('completionRate() should return 0 when dashboard is null', () => {
      expect(store.completionRate()).toBe(0);
    });
  });

  describe('loadStudents()', () => {
    it('should load and store students list', () => {
      store.loadStudents();
      const req = http.expectOne((r) =>
        r.url.includes('/progress/professor/students')
      );
      req.flush(mockStudents);
      expect(store.students()).toEqual(mockStudents);
    });
  });

  describe('loadStudentDetail()', () => {
    it('should load detail and set selectedStudentId', () => {
      store.loadStudentDetail({ studentId: 'stu-1' });
      const req = http.expectOne((r) =>
        r.url.includes('/progress/professor/students/stu-1') &&
        !r.url.includes('/history')
      );
      req.flush(mockDetail);
      expect(store.selectedStudentId()).toBe('stu-1');
      expect(store.selectedStudent()).toEqual(mockDetail);
    });
  });

  describe('loadStudentHistory()', () => {
    it('should load full student history', () => {
      store.loadStudentHistory({ studentId: 'stu-1' });
      const req = http.expectOne((r) =>
        r.url.includes('/progress/professor/students/stu-1/history')
      );
      req.flush(mockHistory);
      expect(store.studentHistory()).toEqual(mockHistory);
    });
  });

  describe('loadLessonStats()', () => {
    it('should fetch lesson stats and store them', () => {
      store.loadLessonStats({ classId: 'class-1', lessonId: 'lesson-1' });
      const req = http.expectOne((r) =>
        r.url.includes('/progress/classes/class-1/lessons/lesson-1/stats')
      );
      req.flush(mockLessonStats);
      expect(store.lessonStats()).toEqual(mockLessonStats);
    });
  });
});