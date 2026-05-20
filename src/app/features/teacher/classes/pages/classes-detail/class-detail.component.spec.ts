import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ClassDetailComponent } from './class-detail.component';
import { ActivatedRoute } from '@angular/router';
import { ClassStore } from '../../../state/class.store';
import { TeacherLessonsStore } from '../../../state/teacher-lessons.store';
import { signal } from '@angular/core';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CONTENT_API_URL, USER_PLATFORM_API_URL } from '@core/tokens/api.token';

describe('ClassDetailComponent', () => {
  let injector: EnvironmentInjector;
  let mockClassStore: Record<string, unknown>;

  const mockLessonsStore = {
    items: signal([]),
    loading: signal(false),
    load: vi.fn(),
  };

  beforeEach(() => {
    mockClassStore = {
      currentClass: signal({
        students: [{ id: 's1', name: 'John Doe', email: '' }],
        lessons: [{ id: 'l1', title: 'Math 101' }]
      }),
      loading: signal(false),
      loadClassDetail: vi.fn(),
      removeStudent: vi.fn(),
      removeLesson: vi.fn(),
      addStudent: vi.fn().mockReturnValue({ subscribe: vi.fn() }),
      addLesson: vi.fn().mockReturnValue({ subscribe: vi.fn() }),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: USER_PLATFORM_API_URL, useValue: 'http://mock-api' },
        { provide: CONTENT_API_URL, useValue: 'http://mock-content-api' },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { classId: 'c1' } }
          }
        },
        {
          provide: ClassStore,
          useValue: mockClassStore
        },
        {
          provide: TeacherLessonsStore,
          useValue: mockLessonsStore
        },
      ]
    });
    injector = TestBed.inject(EnvironmentInjector);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function make() {
    return runInInjectionContext(injector, () => new ClassDetailComponent());
  }

  it('should create', () => {
    expect(make()).toBeTruthy();
  });

  it('should initialize classId and call loadClassDetail on init', () => {
    const comp = make();
    comp.ngOnInit();
    expect(comp.classId).toBe('c1');
    expect(mockClassStore.loadClassDetail).toHaveBeenCalledWith('c1');
  });

  it('should compute students correctly', () => {
    const comp = make();
    expect(comp.students()).toEqual([{ id: 's1', name: 'John Doe', email: '' }]);
  });

  it('should compute lessons correctly', () => {
    const comp = make();
    expect(comp.lessons()).toEqual([{ id: 'l1', title: 'Math 101' }]);
  });
  
  it('should return empty arrays for students and lessons if currentClass is null', () => {
    (mockClassStore.currentClass as ReturnType<typeof signal>).set(null);
    const comp = make();
    expect(comp.students()).toEqual([]);
    expect(comp.lessons()).toEqual([]);
  });

  it('should call removeStudent on store when removeStudent is called', () => {
    const comp = make();
    comp.ngOnInit();
    comp.removeStudent('s1');
    expect(mockClassStore.removeStudent).toHaveBeenCalledWith('c1', 's1');
  });

  it('should call removeLesson on store when removeLesson is called', () => {
    const comp = make();
    comp.ngOnInit();
    comp.removeLesson('l1');
    expect(mockClassStore.removeLesson).toHaveBeenCalledWith('c1', 'l1');
  });
});
