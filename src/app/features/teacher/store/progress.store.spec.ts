import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { USER_PLATFORM_API_URL } from '../../../core/tokens/api.token';
import { TeacherProgressStore } from './progress.store';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('TeacherProgressStore', () => {
  let httpMock: HttpTestingController;
  let store: InstanceType<typeof TeacherProgressStore>;
  const mockApiUrl = 'http://test-api.com/api/v1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeacherProgressStore, { provide: USER_PLATFORM_API_URL, useValue: mockApiUrl }],
    });

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(TeacherProgressStore);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('loadClassStats', () => {
    it('should successfully load class stats', () => {
      expect(store.loading()).toBe(false);
      store.loadClassStats('cls-1');
      expect(store.loading()).toBe(true);

      const req = httpMock.expectOne(`${mockApiUrl}/progress/professor/class-stats?classId=cls-1`);
      expect(req.request.method).toBe('GET');

      req.flush({
        summary: { classId: 'cls-1', className: 'Math 101', averageScore: 85 },
        students: [{ studentId: 'stu-1', studentName: 'Alice' }],
      });

      expect(store.loading()).toBe(false);
      expect(store.classSummary()?.className).toBe('Math 101');
      expect(store.classStudents().length).toBe(1);
    });

    it('should set error state if loadClassStats fails', () => {
      store.loadClassStats('cls-1');
      const req = httpMock.expectOne(`${mockApiUrl}/progress/professor/class-stats?classId=cls-1`);

      req.flush('Error Message', { status: 500, statusText: 'Server Error' });

      expect(store.loading()).toBe(false);
      expect(store.error()).toContain('Http failure response');
    });
  });

  describe('loadStudentDetail', () => {
    it('should successfully load a student detail', () => {
      store.loadStudentDetail('stu-1');
      expect(store.loading()).toBe(true);

      const req = httpMock.expectOne(`${mockApiUrl}/progress/professor/students/stu-1`);
      expect(req.request.method).toBe('GET');

      req.flush({ studentId: 'stu-1', studentName: 'Bob', history: [] });

      expect(store.loading()).toBe(false);
      expect(store.selectedStudentDetail()?.studentName).toBe('Bob');
    });

    it('should set error state if loadStudentDetail fails', () => {
      store.loadStudentDetail('stu-1');
      const req = httpMock.expectOne(`${mockApiUrl}/progress/professor/students/stu-1`);

      req.error(new ProgressEvent('Network error'));

      expect(store.loading()).toBe(false);
      expect(store.error()).toContain('Http failure response');
    });
  });

  describe('loadAllStudents', () => {
    it('should successfully load all students', () => {
      store.loadAllStudents();
      expect(store.loading()).toBe(true);

      const req = httpMock.expectOne(`${mockApiUrl}/progress/professor/students`);
      expect(req.request.method).toBe('GET');

      req.flush([
        { studentId: 'stu-1', studentName: 'Alice' },
        { studentId: 'stu-2', studentName: 'Bob' },
      ]);

      expect(store.loading()).toBe(false);
      expect(store.allStudents().length).toBe(2);
    });

    it('should set error state if loadAllStudents fails', () => {
      store.loadAllStudents();
      const req = httpMock.expectOne(`${mockApiUrl}/progress/professor/students`);

      req.flush('Not Found', { status: 404, statusText: 'Not Found' });

      expect(store.loading()).toBe(false);
      expect(store.error()).toContain('Http failure response');
    });
  });
});
