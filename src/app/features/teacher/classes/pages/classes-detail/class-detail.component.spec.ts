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

    const req = httpTestingController.expectOne('http://mock-api/progress/professor/students');
    req.flush([{ studentId: 's2', firstName: 'Jane', lastName: 'Smith' }]);
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

    expect(mockClassStore.addStudent).toHaveBeenCalledWith('c1', 's2');
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
});
