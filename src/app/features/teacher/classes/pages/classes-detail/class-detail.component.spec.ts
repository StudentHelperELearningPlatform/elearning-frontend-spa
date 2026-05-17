import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ClassDetailComponent } from './class-detail.component';
import { ActivatedRoute } from '@angular/router';
import { ClassStore } from '../../../state/class.store';
import { signal } from '@angular/core';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';

describe('ClassDetailComponent', () => {
  let injector: EnvironmentInjector;
  let mockClassStore: Record<string, unknown>;

  beforeEach(() => {
    mockClassStore = {
      currentClass: signal({
        students: [{ id: 's1', name: 'John Doe', email: '' }],
        lessons: [{ id: 'l1', title: 'Math 101' }]
      }),
      loadClassDetail: vi.fn(),
      removeStudent: vi.fn(),
      removeLesson: vi.fn(),
      addStudent: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { classId: 'c1' } }
          }
        },
        {
          provide: ClassStore,
          useValue: mockClassStore
        }
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
    mockClassStore.currentClass.set(null);
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

  it('inviteStudent calls store.addStudent with trimmed id and clears the input', () => {
    const comp = make();
    comp.ngOnInit();
    comp.inviteStudentId = '  s2  ';
    comp.inviteStudent();
    expect(mockClassStore.addStudent).toHaveBeenCalledWith('c1', 's2');
    expect(comp.inviteStudentId).toBe('');
  });

  it('inviteStudent does nothing when input is blank', () => {
    const comp = make();
    comp.ngOnInit();
    comp.inviteStudentId = '   ';
    comp.inviteStudent();
    expect(mockClassStore.addStudent).not.toHaveBeenCalled();
  });
});
