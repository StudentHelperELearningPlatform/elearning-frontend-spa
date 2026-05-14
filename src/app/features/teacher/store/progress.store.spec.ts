import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { USER_PLATFORM_API_URL } from '../../../core/tokens/api.token';
import { TeacherProgressStore } from './progress.store';

describe('TeacherProgressStore', () => {
  let httpMock: HttpTestingController;
  const mockApiUrl = 'http://test-api.com/api/v1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: USER_PLATFORM_API_URL, useValue: mockApiUrl }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call loadClassStats with the correct endpoint', () => {
    const store = TestBed.inject(TeacherProgressStore);
    
    // Initial state
    expect(store.loading()).toBe(false);
    expect(store.classSummary()).toBeNull();

    // Trigger load
    store.loadClassStats('cls-1');

    // Should immediately set loading to true
    expect(store.loading()).toBe(true);

    // Verify HTTP request
    const req = httpMock.expectOne(`${mockApiUrl}/progress/professor/class-stats?classId=cls-1`);
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush({
      summary: {
        classId: 'cls-1',
        className: 'Math 101',
        totalStudents: 10,
        activeStudents: 8,
        averageScore: 85,
        completionRate: 90
      },
      students: [
        { studentId: 'stu-1', studentName: 'Test Student', lessonsCompleted: 1, averageScore: 100, lastActive: new Date().toISOString() }
      ]
    });

    // Check store state updated correctly
    expect(store.loading()).toBe(false);
    expect(store.classSummary()?.className).toBe('Math 101');
    expect(store.classStudents().length).toBe(1);
    expect(store.classStudents()[0].studentName).toBe('Test Student');
  });
});
