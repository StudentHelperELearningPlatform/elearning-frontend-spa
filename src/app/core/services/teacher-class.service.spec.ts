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
    // 1. Both name/nane and description/bio missing
    const raw1: TeacherClassRaw = {
      id: undefined,
      studentCount: undefined,
      lessonCount: undefined,
      createdAt: undefined
    };
    const mapped1 = mapClass(raw1);
    expect(mapped1.id).toBe('');
    expect(mapped1.name).toBe('');
    expect(mapped1.description).toBe('');
    expect(mapped1.studentCount).toBe(0);
    expect(mapped1.lessonCount).toBe(0);
    expect(mapped1.createdAt).toBeDefined();

    // 2. Standard name and description present
    const raw2: TeacherClassRaw = {
      id: 'c-1',
      name: 'Standard Name',
      nane: 'Nane Ignore',
      description: 'Standard Desc',
      bio: 'Bio Ignore',
      studentCount: 12,
      lessonCount: 6,
      createdAt: '2025-05-17T00:00:00Z'
    };
    const mapped2 = mapClass(raw2);
    expect(mapped2.id).toBe('c-1');
    expect(mapped2.name).toBe('Standard Name');
    expect(mapped2.description).toBe('Standard Desc');
    expect(mapped2.studentCount).toBe(12);
    expect(mapped2.lessonCount).toBe(6);
    expect(mapped2.createdAt).toBe('2025-05-17T00:00:00Z');

    // 3. Typo/fallback fields only (nane, bio)
    const raw3: TeacherClassRaw = {
      nane: 'Typo Name Only',
      bio: 'Typo Bio Only'
    };
    const mapped3 = mapClass(raw3);
    expect(mapped3.name).toBe('Typo Name Only');
    expect(mapped3.description).toBe('Typo Bio Only');

    // 4. Detail fallbacks (students and lessons defined)
    const detailRaw1: TeacherClassRaw = {
      students: [{ id: 's-1', name: 'Student 1', email: 's1@example.com' }],
      lessons: [{ id: 'l-1', title: 'Lesson 1' }]
    };
    const mappedDetail1 = mapClassDetail(detailRaw1);
    expect(mappedDetail1.students).toEqual([{ id: 's-1', name: 'Student 1', email: 's1@example.com' }]);
    expect(mappedDetail1.lessons).toEqual([{ id: 'l-1', title: 'Lesson 1' }]);

    // 5. Detail fallbacks (students and lessons missing)
    const detailRaw2: TeacherClassRaw = {
      students: undefined,
      lessons: undefined
    };
    const mappedDetail2 = mapClassDetail(detailRaw2);
    expect(mappedDetail2.students).toEqual([]);
    expect(mappedDetail2.lessons).toEqual([]);
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

  it('should create class with description', () => {
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

  it('should create class with default empty description if not provided', () => {
    const mockNewClass: TeacherClass = { id: '2', name: 'Science', description: '', studentCount: 0, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' };
    const payload = { name: 'Science' };
    const expectedRequest = { nane: 'Science', bio: '' };
    const responsePayload = { id: '2', nane: 'Science', bio: '', studentCount: 0, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' };

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

  it('should update class name only', () => {
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

  it('should update class description only', () => {
    const mockUpdatedClass: TeacherClass = { id: '1', name: 'Math', description: 'New Bio', studentCount: 0, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' };
    const payload = { description: 'New Bio' };
    const expectedRequest = { bio: 'New Bio' };
    const responsePayload = { id: '1', name: 'Math', bio: 'New Bio', studentCount: 0, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' };

    service.updateClass('1', payload).subscribe((updatedClass) => {
      expect(updatedClass).toEqual(mockUpdatedClass);
    });

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(expectedRequest);
    req.flush(responsePayload);
  });

  it('should update both class name and description', () => {
    const mockUpdatedClass: TeacherClass = { id: '1', name: 'New Math', description: 'New Bio', studentCount: 0, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' };
    const payload = { name: 'New Math', description: 'New Bio' };
    const expectedRequest = { nane: 'New Math', bio: 'New Bio' };
    const responsePayload = { id: '1', nane: 'New Math', bio: 'New Bio', studentCount: 0, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' };

    service.updateClass('1', payload).subscribe((updatedClass) => {
      expect(updatedClass).toEqual(mockUpdatedClass);
    });

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(expectedRequest);
    req.flush(responsePayload);
  });

  it('should handle update class with empty object', () => {
    const mockUpdatedClass: TeacherClass = { id: '1', name: 'Math', description: 'Old Bio', studentCount: 0, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' };
    const payload = {};
    const expectedRequest = {};
    const responsePayload = { id: '1', name: 'Math', description: 'Old Bio', studentCount: 0, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' };

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
