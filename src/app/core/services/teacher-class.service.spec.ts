import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TeacherClassService, mapClass, mapClassDetail, TeacherClassRaw } from './teacher-class.service';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { TeacherClass } from '@features/teacher/models/class.model';
import { TeacherClassDetail, ClassStudent, ClassLesson } from '@features/teacher/models/class-detail.model';

describe('TeacherClassService', () => {
  let service: TeacherClassService;
  let httpTestingController: HttpTestingController;
  const mockApiUrl = 'http://mock-api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: USER_PLATFORM_API_URL, useValue: mockApiUrl },
      ],
    });

    service = TestBed.inject(TeacherClassService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should map class with fallback values', () => {
    const raw: TeacherClassRaw = {
      id: undefined,
      nane: 'Nane Fallback',
      bio: 'Bio Fallback',
      studentCount: undefined,
      lessonCount: undefined,
      createdAt: undefined
    };
    const mapped = mapClass(raw);
    expect(mapped.id).toBe('');
    expect(mapped.name).toBe('Nane Fallback');
    expect(mapped.description).toBe('Bio Fallback');
    expect(mapped.studentCount).toBe(0);
    expect(mapped.lessonCount).toBe(0);
    expect(mapped.createdAt).toBeDefined();

    const detailRaw: TeacherClassRaw = {
      ...raw,
      students: undefined,
      lessons: undefined
    };
    const mappedDetail = mapClassDetail(detailRaw);
    expect(mappedDetail.students).toEqual([]);
    expect(mappedDetail.lessons).toEqual([]);
  });

  it('should get classes', () => {
    const mockClasses: TeacherClass[] = [
      { id: '1', name: 'Math', description: 'Math Class', studentCount: 10, lessonCount: 5, createdAt: '2023-01-01T00:00:00Z' },
    ];

    service.getClasses().subscribe((classes) => {
      expect(classes).toEqual(mockClasses);
    });

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClasses);
  });

  it('should create class', () => {
    const mockNewClass: TeacherClass = { id: '2', name: 'Science', description: 'Science Class', studentCount: 0, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' };
    const payload = { name: 'Science', description: 'Science Class' };
    const expectedRequest = { nane: 'Science', bio: 'Science Class' };
    const responsePayload = { id: '2', nane: 'Science', bio: 'Science Class', studentCount: 0, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' };

    service.createClass(payload).subscribe((newClass) => {
      expect(newClass).toEqual(mockNewClass);
    });

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(expectedRequest);
    req.flush(responsePayload);
  });

  it('should get class detail', () => {
    const mockClassDetail: TeacherClassDetail = {
      id: '1', name: 'Math', description: '', students: [], lessons: [], createdAt: '2023-01-01T00:00:00Z', studentCount: 0, lessonCount: 0
    };

    service.getClassDetail('1').subscribe((detail) => {
      expect(detail).toEqual(mockClassDetail);
    });

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClassDetail);
  });

  it('should update class', () => {
    const mockUpdatedClass: TeacherClass = { id: '1', name: 'New Math', description: '', studentCount: 0, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' };
    const payload = { name: 'New Math' };
    const expectedRequest = { nane: 'New Math' };
    const responsePayload = { id: '1', nane: 'New Math', studentCount: 0, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' };

    service.updateClass('1', payload).subscribe((updatedClass) => {
      expect(updatedClass).toEqual(mockUpdatedClass);
    });

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(expectedRequest);
    req.flush(responsePayload);
  });

  it('should delete class', () => {
    service.deleteClass('1').subscribe();

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should add student', () => {
    service.addStudent('1', 's1').subscribe();

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1/students/s1`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should remove student', () => {
    service.removeStudent('1', 's1').subscribe();

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1/students/s1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should add lesson', () => {
    service.addLesson('1', 'l1').subscribe();

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1/lessons/l1`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should remove lesson', () => {
    service.removeLesson('1', 'l1').subscribe();

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1/lessons/l1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should get students', () => {
    const mockStudents: ClassStudent[] = [{ id: 's1', name: 'John Doe', email: '' }];

    service.getStudents('1').subscribe((students) => {
      expect(students).toEqual(mockStudents);
    });

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1/students`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStudents);
  });

  it('should get lessons', () => {
    const mockLessons: ClassLesson[] = [{ id: 'l1', title: 'Algebra',  }];

    service.getLessons('1').subscribe((lessons) => {
      expect(lessons).toEqual(mockLessons);
    });

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1/lessons`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLessons);
  });
});
