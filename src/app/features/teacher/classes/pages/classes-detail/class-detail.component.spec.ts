import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ClassDetailComponent } from './class-detail.component';
import { ActivatedRoute } from '@angular/router';
import { ClassStore } from '../../../state/class.store';
import { TeacherLessonsStore } from '../../../state/teacher-lessons.store';
import { signal } from '@angular/core';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CONTENT_API_URL, USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { of, throwError } from 'rxjs';

describe('ClassDetailComponent', () => {
  let injector: EnvironmentInjector;
  let httpTestingController: HttpTestingController;
  let mockClassStore: Record<string, unknown>;

  const mockLessonsStore = {
    items: signal([{ id: 'l2', title: 'Science 101', subject: 'Science', status: 'PUBLISHED' }]),
    loading: signal(false),
    load: vi.fn(),
  };

  beforeEach(() => {
    mockClassStore = {
      currentClass: signal({
        students: [{ id: 's1', name: 'John Doe', email: '' }],
        lessons: [{ id: 'l1', title: 'Math 101' }],
      }),
      loading: signal(false),
      loadClassDetail: vi.fn(),
      removeStudent: vi.fn(),
      removeLesson: vi.fn(),
      addStudent: vi.fn().mockReturnValue(of({})),
      addLesson: vi.fn().mockReturnValue(of({})),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: USER_PLATFORM_API_URL, useValue: 'http://mock-api' },
        { provide: CONTENT_API_URL, useValue: 'http://mock-content-api' },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { classId: 'c1' } } },
        },
        { provide: ClassStore, useValue: mockClassStore },
        { provide: TeacherLessonsStore, useValue: mockLessonsStore },
      ],
    });
    injector = TestBed.inject(EnvironmentInjector);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    vi.restoreAllMocks();
  });

  function make() {
    return runInInjectionContext(injector, () => new ClassDetailComponent());
  }

  // --- Initial Specs ---

  it('should create and load details on init', () => {
    const comp = make();
    comp.ngOnInit();
    expect(comp.classId).toBe('c1');
    expect(mockClassStore.loadClassDetail).toHaveBeenCalledWith('c1');
    expect(mockLessonsStore.load).toHaveBeenCalled();
  });

  it('should compute students and lessons correctly', () => {
    const comp = make();
    expect(comp.students().length).toBe(1);
    expect(comp.lessons().length).toBe(1);
  });

  // --- Removals ---

  it('should remove a student', () => {
    const comp = make();
    comp.ngOnInit();
    comp.removeStudent('s1');
    expect(mockClassStore.removeStudent).toHaveBeenCalledWith('c1', 's1');
  });

  it('should remove a lesson', () => {
    const comp = make();
    comp.ngOnInit();
    comp.removeLesson('l1');
    expect(mockClassStore.removeLesson).toHaveBeenCalledWith('c1', 'l1');
  });

  // --- Invite Modal ---

  it('should open invite modal and fetch students if empty', () => {
    const comp = make();
    comp.openInviteModal();
    expect(comp.showInviteModal()).toBe(true);

    const req = httpTestingController.expectOne((r) => r.url.includes('/users'));
    req.flush({
      users: [
        { id: 's2', firstName: 'Jane', lastName: 'Smith', email: 'j@mail.com', role: 'STUDENT' }
      ],
      currentPage: 0,
      totalPages: 1,
      totalElements: 1
    });
    expect(comp.allStudents().length).toBe(1);
  });

  it('should filter students based on search and enrollment', () => {
    const comp = make();
    comp.allStudents.set([
      { studentId: 's1', firstName: 'John', lastName: 'Doe' }, // Enrolled
      { studentId: 's2', firstName: 'Jane', lastName: 'Smith' }, // Unenrolled
    ]);

    expect(comp.filteredStudents().length).toBe(1);

    comp.studentSearch.set('jane');
    expect(comp.filteredStudents()[0].studentId).toBe('s2');
  });

  it('should close invite modal', () => {
    const comp = make();
    comp.showInviteModal.set(true);
    comp.closeInviteModal();
    expect(comp.showInviteModal()).toBe(false);
  });

  it('should add student successfully', () => {
    const comp = make();
    comp.ngOnInit();
    comp.addStudent({ studentId: 's2', firstName: 'Jane', lastName: 'Smith' });

    expect(mockClassStore.addStudent).toHaveBeenCalledWith('c1', 's2', undefined);
    expect(mockClassStore.loadClassDetail).toHaveBeenCalledWith('c1');
    expect(comp.addingStudentId()).toBe(null);
  });

  it('should handle add student error', () => {
    mockClassStore['addStudent'] = vi.fn().mockReturnValue(throwError(() => new Error('Error')));
    const comp = make();
    comp.ngOnInit();
    comp.addStudent({ studentId: 's2', firstName: 'Jane', lastName: 'Smith' });

    expect(comp.addStudentError()).toBeTruthy();
    expect(comp.addingStudentId()).toBe(null);
  });

  // --- Add Lesson Modal ---

  it('should open and close lesson modal', () => {
    const comp = make();
    comp.openLessonsModal();
    expect(comp.showLessonsModal()).toBe(true);
    expect(mockLessonsStore.load).toHaveBeenCalled();

    comp.closeLessonsModal();
    expect(comp.showLessonsModal()).toBe(false);
  });

  it('should filter lessons based on search and enrollment', () => {
    const comp = make();
    expect(comp.filteredLessons().length).toBe(1);

    comp.lessonSearch.set('sci');
    expect(comp.filteredLessons()[0].id).toBe('l2');
  });

  it('should add lesson successfully', () => {
    const comp = make();
    comp.ngOnInit();
    comp.addLesson('l2');

    expect(mockClassStore.addLesson).toHaveBeenCalledWith('c1', 'l2');
    expect(mockClassStore.loadClassDetail).toHaveBeenCalledWith('c1');
  });

  it('should handle add lesson error', () => {
    mockClassStore['addLesson'] = vi.fn().mockReturnValue(throwError(() => new Error('Error')));
    const comp = make();
    comp.ngOnInit();
    comp.addLesson('l2');

    expect(comp.addLessonError()).toBeTruthy();
  });

  // --- Quiz Attempts ---

  it('should return early from loadQuizAttempts if no students or lessons', () => {
    (mockClassStore['currentClass'] as ReturnType<typeof signal>).set({
      students: [],
      lessons: [],
    });
    const comp = make();
    comp.loadQuizAttempts();
    expect(comp.quizAttempts()).toEqual([]);
  });

  it('should load quiz attempts and map correctly', () => {
    const comp = make();
    comp.loadQuizAttempts();

    const req = httpTestingController.expectOne(
      'http://mock-content-api/lessons/l1/final-quiz/attempts',
    );
    req.flush([
      { id: 'a1', studentId: 's1', score: 80, submittedAt: '2023-01-01T10:00:00Z' },
      { id: 'a2', studentId: 's99', score: 50, submittedAt: '2023-01-01T11:00:00Z' }, // Ignored (not enrolled)
    ]);

    expect(comp.quizAttempts().length).toBe(1);
    expect(comp.quizAttempts()[0].studentName).toBe('John Doe'); // Resolved name
    expect(comp.quizAttempts()[0].score).toBe(80);
    expect(comp.quizLoading()).toBe(false);
  });

  it('should handle error when loading quiz attempts', () => {
    const comp = make();
    comp.loadQuizAttempts();

    const req = httpTestingController.expectOne(
      'http://mock-content-api/lessons/l1/final-quiz/attempts',
    );
    req.error(new ProgressEvent('error')); // Force a hard forkJoin failure

    expect(comp.quizError()).toBeTruthy();
    expect(comp.quizLoading()).toBe(false);
  });

  describe('Additional Coverage Specs', () => {
    it('should handle error when opening invite modal and fetching students fails', () => {
      const comp = make();
      comp.openInviteModal();
      expect(comp.showInviteModal()).toBe(true);

      const req = httpTestingController.expectOne((r) => r.url.includes('/users'));
      req.flush('Error fetching', { status: 500, statusText: 'Internal Error' });
      expect(comp.allStudents()).toEqual([]);
    });

    it('should sort quiz attempts descending by submittedAt', () => {
      const comp = make();
      // Set multiple enrolled students
      (mockClassStore['currentClass'] as ReturnType<typeof signal>).set({
        students: [
          { id: 's1', name: 'John Doe' },
          { id: 's2', name: 'Jane Smith' },
        ],
        lessons: [{ id: 'l1', title: 'Math 101' }],
      });

      comp.loadQuizAttempts();

      const req = httpTestingController.expectOne(
        'http://mock-content-api/lessons/l1/final-quiz/attempts',
      );
      req.flush([
        { id: 'a1', studentId: 's1', score: 80, submittedAt: '2023-01-01T10:00:00Z' },
        { id: 'a2', studentId: 's2', score: 90, completedAt: '2023-01-01T12:00:00Z' }, // Newer, completedAt fallback
        { id: 'a3', studentId: 's1', score: 95, submittedAt: '2023-01-01T11:00:00Z' }, // Middle
      ]);

      const attempts = comp.quizAttempts();
      expect(attempts.length).toBe(3);
      expect(attempts[0].attemptId).toBe('a2'); // 12:00:00Z
      expect(attempts[1].attemptId).toBe('a3'); // 11:00:00Z
      expect(attempts[2].attemptId).toBe('a1'); // 10:00:00Z
    });

    it('should resolve student name from cached list or fallback to studentId', () => {
      const comp = make();
      // s1 enrolled has name 'John Doe'
      // s2 not enrolled but cached in allStudents
      comp.allStudents.set([
        { studentId: 's2', firstName: 'Jane', lastName: 'Smith' }
      ]);

      // Trigger mapQuizAttempts indirectly or call private resolveStudentName if accessible
      // Since resolveStudentName is private, we can trigger it via loadQuizAttempts
      (mockClassStore['currentClass'] as ReturnType<typeof signal>).set({
        students: [
          { id: 's1', name: 'John Doe' },
          { id: 's2' }, // Enrolled, but name is absent/undefined (should trigger cached lookup)
          { id: 's3' }, // Enrolled, no name, not cached (should fallback to 's3')
        ],
        lessons: [{ id: 'l1', title: 'Math 101' }],
      });

      comp.loadQuizAttempts();

      const req = httpTestingController.expectOne(
        'http://mock-content-api/lessons/l1/final-quiz/attempts',
      );
      req.flush([
        { id: 'a1', studentId: 's1', score: 80, submittedAt: '2023-01-01T10:00:00Z' },
        { id: 'a2', studentId: 's2', score: 90, submittedAt: '2023-01-01T11:00:00Z' },
        { id: 'a3', studentId: 's3', score: 95, submittedAt: '2023-01-01T12:00:00Z' },
      ]);

      const attempts = comp.quizAttempts();
      expect(attempts.length).toBe(3);

      // find 's1' attempt
      const attS1 = attempts.find(a => a.studentId === 's1');
      expect(attS1?.studentName).toBe('John Doe');

      // find 's2' attempt (should be resolved to cached Jane Smith)
      const attS2 = attempts.find(a => a.studentId === 's2');
      expect(attS2?.studentName).toBe('Jane Smith');

      // find 's3' attempt (should be resolved to ID 's3')
      const attS3 = attempts.find(a => a.studentId === 's3');
      expect(attS3?.studentName).toBe('s3');
    });

    it('should load next page if more pages exist and not currently loading', () => {
      const comp = make();
      comp.currentPage.set(0);
      comp.totalPages.set(2);
      comp.loadingMore.set(false);

      comp.loadNextPage();

      const req = httpTestingController.expectOne((r) => r.url.includes('/users') && r.params.get('page') === '1');
      req.flush({
        users: [{ id: 's3', firstName: 'Jack', lastName: 'Rider', role: 'STUDENT' }],
        currentPage: 1,
        totalPages: 2
      });
      expect(comp.allStudents().length).toBe(1);
    });

    it('should not load next page if no more pages or already loading', () => {
      const comp = make();
      // No more pages
      comp.currentPage.set(1);
      comp.totalPages.set(2);
      comp.loadingMore.set(false);
      comp.loadNextPage();
      httpTestingController.expectNone((r) => r.url.includes('/users'));

      // Already loading
      comp.currentPage.set(0);
      comp.totalPages.set(2);
      comp.loadingMore.set(true);
      comp.loadNextPage();
      httpTestingController.expectNone((r) => r.url.includes('/users'));
    });

    it('should append students when page is greater than 0', () => {
      const comp = make();
      comp.allStudents.set([{ studentId: 's1', firstName: 'John', lastName: 'Doe' }]);
      comp.currentPage.set(0);
      comp.totalPages.set(2);

      comp.loadStudentsPage(1);

      const req = httpTestingController.expectOne((r) => r.url.includes('/users') && r.params.get('page') === '1');
      req.flush({
        users: [{ id: 's2', firstName: 'Jane', lastName: 'Smith', role: 'STUDENT' }],
        currentPage: 1,
        totalPages: 2
      });

      expect(comp.allStudents().length).toBe(2);
      expect(comp.allStudents()[0].studentId).toBe('s1');
      expect(comp.allStudents()[1].studentId).toBe('s2');
    });

    it('should handle undefined/null/empty fields in user response', () => {
      const comp = make();
      comp.loadStudentsPage(0);

      const req = httpTestingController.expectOne((r) => r.url.includes('/users'));
      req.flush({
        users: [
          { role: 'STUDENT' }, // missing id/names
          { id: 's3', firstName: 'Jack', role: 'TEACHER' }, // wrong role
        ],
        currentPage: null,
        totalPages: null
      } as unknown as PaginatedUsersResponse);

      expect(comp.allStudents().length).toBe(1);
      expect(comp.allStudents()[0].studentId).toBe('');
      expect(comp.allStudents()[0].firstName).toBe('');
      expect(comp.currentPage()).toBe(0);
      expect(comp.totalPages()).toBe(0);
    });

    it('should handle api error and fallback gracefully with empty users list in catchError', () => {
      const comp = make();
      comp.loadStudentsPage(0);

      const req = httpTestingController.expectOne((r) => r.url.includes('/users'));
      req.error(new ProgressEvent('error')); // trigger catchError

      expect(comp.allStudents()).toEqual([]);
      expect(comp.loadingMore()).toBe(false);
    });
  });
});

