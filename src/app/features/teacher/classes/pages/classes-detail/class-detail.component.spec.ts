import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ClassDetailComponent } from './class-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassStore } from '../../../state/class.store';
import { TeacherLessonsStore } from '../../../state/teacher-lessons.store';
import { ChatStore } from '@features/shared/chat/chat.store';
import { signal } from '@angular/core';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
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

  const mockChatStore = {
    selectContact: vi.fn(),
  };

  const mockRouter = {
    navigate: vi.fn(),
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
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { classId: 'c1' } } },
        },
        { provide: Router, useValue: mockRouter },
        { provide: ClassStore, useValue: mockClassStore },
        { provide: TeacherLessonsStore, useValue: mockLessonsStore },
        { provide: ChatStore, useValue: mockChatStore },
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

  // --- Start Conversation ---

  it('should preselect the contact and navigate to chat when starting a conversation', () => {
    const comp = make();
    comp.startConversation('s1');
    expect(mockChatStore.selectContact).toHaveBeenCalledWith('s1');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/teacher/chat']);
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

  describe('Additional Coverage Specs', () => {
    it('should handle error when opening invite modal and fetching students fails', () => {
      const comp = make();
      comp.openInviteModal();
      expect(comp.showInviteModal()).toBe(true);

      const req = httpTestingController.expectOne((r) => r.url.includes('/users'));
      req.flush('Error fetching', { status: 500, statusText: 'Internal Error' });
      expect(comp.allStudents()).toEqual([]);
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
