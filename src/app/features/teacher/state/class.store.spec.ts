import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ClassStore } from './class.store';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { TeacherClass } from '../models/class.model';
import { TeacherClassDetail } from '../models/class-detail.model';

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

  it('should load classes', () => {
    const mockClasses: TeacherClass[] = [
      { id: '1', name: 'Math', description: 'Math Class', studentCount: 10, lessonCount: 5, createdAt: '2023-01-01T00:00:00Z' },
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
    const mockClassDetail: TeacherClassDetail = {
      id: '1',
      name: 'Math',
      description: 'Math Class',
      students: [{ id: 's1', name: 'John Doe', email: 'john@example.com' }],
      lessons: [{ id: 'l1', title: 'Algebra',  }],
      createdAt: '2023-01-01T00:00:00Z'
    };

    store.loadClassDetail('1');
    expect(store.loading()).toBe(true);

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClassDetail);

    expect(store.loading()).toBe(false);
    expect(store.currentClass()).toEqual(mockClassDetail);
  });

  it('should handle error when loading class detail', () => {
    store.loadClassDetail('1');
    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(store.loading()).toBe(false);
    expect(store.error()).toContain('Http failure response');
  });

  it('should create class', () => {
    const mockNewClass: TeacherClass = { id: '2', name: 'Science', description: 'Science Class', studentCount: 0, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' };
    const payload = { name: 'Science', description: 'Science Class' };

    store.createClass(payload);
    expect(store.loading()).toBe(true);

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockNewClass);

    expect(store.loading()).toBe(false);
    expect(store.classes()).toContain(mockNewClass);
  });
  
  it('should handle error when creating class', () => {
    store.createClass({ name: 'Science' });
    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(store.loading()).toBe(false);
    expect(store.error()).toContain('Http failure response');
  });

  it('should update class', () => {
    const initialClass: TeacherClass = { id: '1', name: 'Old Math', studentCount: 0, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' };
    
    store.loadClasses();
    httpTestingController.expectOne(`${mockApiUrl}/teachers/classes`).flush([initialClass]);

    const mockUpdatedClass: TeacherClass = { ...initialClass, name: 'New Math' };
    const payload = { name: 'New Math' };

    store.updateClass('1', payload);
    expect(store.loading()).toBe(true);

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);
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
    store.addStudent('1', 's1');

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1/students/s1`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should remove student from class', () => {
    const mockClassDetail: TeacherClassDetail = {
      id: '1', name: 'Math', students: [{ id: 's1', name: 'John Doe', email: '' }], lessons: [], createdAt: '2023-01-01T00:00:00Z'
    };
    
    store.loadClassDetail('1');
    httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1`).flush(mockClassDetail);

    store.removeStudent('1', 's1');

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1/students/s1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    expect(store.currentClass().students.length).toBe(0);
  });
  
  it('should return early when removing student if no current class', () => {
    store.removeStudent('1', 's1');
    httpTestingController.expectNone(`${mockApiUrl}/teachers/classes/1/students/s1`);
  });

  it('should add lesson to class', () => {
    store.addLesson('1', 'l1');

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1/lessons/l1`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should remove lesson from class', () => {
    const mockClassDetail: TeacherClassDetail = {
      id: '1', name: 'Math', students: [], lessons: [{ id: 'l1', title: 'Algebra',  }], createdAt: '2023-01-01T00:00:00Z'
    };
    
    store.loadClassDetail('1');
    httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1`).flush(mockClassDetail);

    store.removeLesson('1', 'l1');

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/classes/1/lessons/l1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    expect(store.currentClass().lessons.length).toBe(0);
  });
  
  it('should return early when removing lesson if no current class', () => {
    store.removeLesson('1', 'l1');
    httpTestingController.expectNone(`${mockApiUrl}/teachers/classes/1/lessons/l1`);
  });
});
