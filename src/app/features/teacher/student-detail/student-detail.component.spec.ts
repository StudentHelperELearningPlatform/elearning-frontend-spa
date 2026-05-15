import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { signal } from '@angular/core';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { StudentDetailComponent } from './student-detail.component';
import { ProgressStore, StudentDetailEntry } from '../../student/store/progress.store';

const mockEntries: StudentDetailEntry[] = [
  {
    className: 'Math 101',
    lessonTitle: 'Intro to Algebra',
    lessonId: 'l-1',
    status: 'completed',
    score: 90,
    dateCompleted: '2026-04-20T10:00:00Z',
  },
  {
    className: 'Science 201',
    lessonTitle: 'Cells',
    lessonId: 'l-3',
    status: 'completed',
    score: 76,
    dateCompleted: '2026-04-25T08:00:00Z',
  },
];

function buildStoreMock() {
  return {
    selectedStudent: signal(mockEntries),
    loadStudentDetail: vi.fn(),
    loadStudentHistory: vi.fn(),
  };
}

describe('StudentDetailComponent', () => {
  let fixture: ComponentFixture<StudentDetailComponent>;
  let component: StudentDetailComponent;
  let storeMock: ReturnType<typeof buildStoreMock>;
  let routerSpy: Pick<Router, 'navigate'>;

  // Explicitly type the routeMock instead of using 'any'
  let routeMock: {
    snapshot: {
      paramMap: { get: ReturnType<typeof vi.fn> };
      parent: { paramMap: { get: ReturnType<typeof vi.fn> } } | null;
    };
  };

  beforeEach(async () => {
    storeMock = buildStoreMock();
    routerSpy = { navigate: vi.fn().mockResolvedValue(true) };
    routeMock = {
      snapshot: {
        paramMap: { get: vi.fn().mockReturnValue('stu-1') },
        parent: { paramMap: { get: vi.fn().mockReturnValue('class-1') } },
      },
    };

    await TestBed.configureTestingModule({
      providers: [
        { provide: ProgressStore, useValue: storeMock },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeMock },
      ],
    })
      .overrideComponent(StudentDetailComponent, {
        set: { template: '<div></div>' },
      })
      .compileComponents();

    fixture = TestBed.createComponent(StudentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call load methods with the route studentId', () => {
    expect(storeMock.loadStudentDetail).toHaveBeenCalledWith({ studentId: 'stu-1' });
    expect(storeMock.loadStudentHistory).toHaveBeenCalledWith({ studentId: 'stu-1' });
  });

  it('should group entries by className and compute avgScore per class', () => {
    const groups = component.groupedByClass();
    expect(groups.length).toBe(2);
    const math = groups.find((g) => g.className === 'Math 101')!;
    expect(math.avgScore).toBe(90);
    expect(math.completedCount).toBe(1);
  });

  it('should count only completed lessons', () => {
    expect(component.totalCompleted()).toBe(2);
  });

  it('should return rounded average of non-null scores', () => {
    expect(component.overallAvgScore()).toBe(83); // (90 + 76) / 2
  });

  it('should return 0 overallAvgScore when no entries have scores', () => {
    storeMock.selectedStudent.set([
      {
        className: 'A',
        lessonTitle: 'L1',
        lessonId: 'l1',
        status: 'not_started',
        score: null,
        dateCompleted: null,
      },
    ]);
    expect(component.overallAvgScore()).toBe(0);
  });

  it('should return empty groupedByClass when selectedStudent is empty', () => {
    storeMock.selectedStudent.set([]);
    expect(component.groupedByClass()).toEqual([]);
  });

  it('should navigate to class stats if classId is present', () => {
    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/teacher/classes', 'class-1', 'stats']);
  });

  it('should navigate to all students list if classId is null', () => {
    routeMock.snapshot.parent = null;

    // Re-create component to catch constructor injection
    fixture = TestBed.createComponent(StudentDetailComponent);
    component = fixture.componentInstance;

    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/teacher/students']);
  });

  it('statusSeverity returns correct primeng severities', () => {
    expect(component.statusSeverity('completed')).toBe('success');
    expect(component.statusSeverity('in_progress')).toBe('warn');
    expect(component.statusSeverity('not_started')).toBe('danger');
  });

  it('statusLabel returns human-readable text', () => {
    expect(component.statusLabel('completed')).toBe('Completed');
    expect(component.statusLabel('in_progress')).toBe('In Progress');
    expect(component.statusLabel('not_started')).toBe('Not Started');
  });
});
