import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ClassStore } from './class.store';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { TeacherClass } from '../models/class.model';

describe('ClassStore', () => {
  let store: InstanceType<typeof ClassStore>;
  let httpTestingController: HttpTestingController;
  const mockApiUrl = 'http://mock-api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: USER_PLATFORM_API_URL, useValue: mockApiUrl },
        ClassStore,
      ],
    });

    store = TestBed.inject(ClassStore);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  function flushClassDetail(
    classId: string,
    detail: object,
    lessons: unknown[] = [],
    students: string[] = [],
    allStudents: unknown[] = [],
  ) {
    httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/${classId}`).flush(detail);
    httpTestingController
      .expectOne(`${mockApiUrl}/teachers/classes/${classId}/lessons`)
      .flush(lessons);
    httpTestingController
      .expectOne(`${mockApiUrl}/teachers/classes/${classId}/students`)
      .flush(students);
    httpTestingController.expectOne(`${mockApiUrl}/students`).flush(allStudents);
  }

  it('should load classes', () => {
    const mockClasses: TeacherClass[] = [
      {
        id: '1',
        name: 'Math',
        description: 'Math Class',
        studentCount: 10,
        lessonCount: 5,
        createdAt: '2023-01-01T00:00:00Z',
      },
    ];

    store.loadClasses();
    expect(store.loading()).toBe(true);

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClasses);

    expect(store.loading()).toBe(false);
    expect(store.classes()).toEqual(mockClasses);
    expect(store.totalClasses()).toBe(1);
    expect(store.totalStudents()).toBe(10);
  });

  it('should handle error when loading classes', () => {
    store.loadClasses();
    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(store.loading()).toBe(false);
    expect(store.error()).toContain('Http failure response');
  });

  it('should load class detail', () => {
    const mockDetailRaw = {
      id: '1',
      name: 'Math',
      bio: 'Math Class',
      createdAt: '2023-01-01T00:00:00Z',
    };
    const mockLessons = [{ id: 'l1', title: 'Algebra' }];
    const mockEnrolledIds = ['s1'];
    const mockAllStudents = [
      { id: 's1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    ];

    store.loadClassDetail('1');
    expect(store.loading()).toBe(true);

    flushClassDetail('1', mockDetailRaw, mockLessons, mockEnrolledIds, mockAllStudents);

    expect(store.loading()).toBe(false);
    expect(store.currentClass()).toBeTruthy();
    expect(store.currentClass()?.name).toBe('Math');
    expect(store.currentClass()?.lessons).toEqual(mockLessons);
    expect(store.currentClass()?.students).toEqual([
      { id: 's1', name: 'John Doe', email: 'john@example.com' },
    ]);
  });

  it('should handle error when loading class detail', () => {
    store.loadClassDetail('1');

    // 1. Capture all 4 requests initiated by forkJoin
    const detailReq = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1`);
    const lessonsReq = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1/lessons`);
    const studentsReq = httpTestingController.expectOne(
      `${mockApiUrl}/teachers/classes/1/students`,
    );
    const allStudentsReq = httpTestingController.expectOne(`${mockApiUrl}/students`);

    // 2. Flush an error on the primary request. This causes forkJoin to error out and cancel the rest.
    detailReq.flush('Error', { status: 500, statusText: 'Server Error' });

    // 3. Verify the remaining requests were successfully cancelled by RxJS
    expect(lessonsReq.cancelled).toBe(true);
    expect(studentsReq.cancelled).toBe(true);
    expect(allStudentsReq.cancelled).toBe(true);

    expect(store.loading()).toBe(false);
    expect(store.error()).toContain('Http failure response');
  });

  it('should create class', () => {
    const mockNewClass: TeacherClass = {
      id: '2',
      name: 'Science',
      description: 'Science Class',
      studentCount: 0,
      lessonCount: 0,
      createdAt: '2023-01-01T00:00:00Z',
    };
    const payload = { name: 'Science', description: 'Science Class' };
    const expectedBody = { name: 'Science', bio: 'Science Class' };

    store.createClass(payload);
    expect(store.loading()).toBe(true);

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(expectedBody);
    req.flush(mockNewClass);

    expect(store.loading()).toBe(false);
    expect(store.classes()).toContainEqual(expect.objectContaining(mockNewClass));
  });

  it('should handle error when creating class', () => {
    store.createClass({ name: 'Science' });
    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(store.loading()).toBe(false);
    expect(store.error()).toContain('Http failure response');
  });

  it('should update class', () => {
    const initialClass: TeacherClass = {
      id: '1',
      name: 'Old Math',
      studentCount: 0,
      lessonCount: 0,
      createdAt: '2023-01-01T00:00:00Z',
    };

    store.loadClasses();
    httpTestingController.expectOne(`${mockApiUrl}/teachers/classes`).flush([initialClass]);

    const mockUpdatedClass: TeacherClass = { ...initialClass, name: 'New Math' };
    const payload = { name: 'New Math' };
    const expectedBody = { name: 'New Math' };

    store.updateClass('1', payload);
    expect(store.loading()).toBe(true);

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(expectedBody);
    req.flush(mockUpdatedClass);

    expect(store.loading()).toBe(false);
    expect(store.classes().find((c: TeacherClass) => c.id === '1')?.name).toBe('New Math');
  });

  it('should handle error when updating class', () => {
    store.updateClass('1', { name: 'New Math' });
    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(store.loading()).toBe(false);
    expect(store.error()).toContain('Http failure response');
  });

  it('should delete class', () => {
    store.deleteClass('1');

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should add student to class', () => {
    store.addStudent('1', 's1').subscribe();

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1/students/s1`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should remove student from class', () => {
    const mockDetailRaw = {
      id: '1',
      name: 'Math',
      bio: '',
      createdAt: '2023-01-01T00:00:00Z',
    };

    store.loadClassDetail('1');
    flushClassDetail(
      '1',
      mockDetailRaw,
      [],
      ['s1'],
      [{ id: 's1', firstName: 'John', lastName: 'Doe', email: '' }],
    );

    store.removeStudent('1', 's1');

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1/students/s1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    expect(store.currentClass()?.students.length).toBe(0);
  });

  it('should return early when removing student if no current class', () => {
    store.removeStudent('1', 's1');
    httpTestingController.expectNone(`${mockApiUrl}/teachers/classes/1/students/s1`);
  });

  it('should add lesson to class', () => {
    store.addLesson('1', 'l1').subscribe();

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1/lessons/l1`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should remove lesson from class', () => {
    const mockDetailRaw = {
      id: '1',
      name: 'Math',
      bio: '',
      createdAt: '2023-01-01T00:00:00Z',
    };

    store.loadClassDetail('1');
    flushClassDetail('1', mockDetailRaw, [{ id: 'l1', title: 'Algebra' }], [], []);

    store.removeLesson('1', 'l1');

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1/lessons/l1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    expect(store.currentClass()?.lessons.length).toBe(0);
  });

  it('should return early when removing lesson if no current class', () => {
    store.removeLesson('1', 'l1');
    httpTestingController.expectNone(`${mockApiUrl}/teachers/classes/1/lessons/l1`);
  });
});
