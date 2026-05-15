import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { signal } from '@angular/core';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { StudentDetailComponent } from './student-detail.component';
import { ProgressStore, StudentDetailEntry } from '../../student/store/progress.store';

const mockEntries: StudentDetailEntry[] = [
  { className: 'Math 101', lessonTitle: 'Intro to Algebra', lessonId: 'l-1', status: 'completed', score: 90, dateCompleted: '2026-04-20T10:00:00Z' },
  { className: 'Science 201', lessonTitle: 'Cells', lessonId: 'l-3', status: 'completed', score: 76, dateCompleted: '2026-04-25T08:00:00Z' },
];

function buildStoreMock() {
  return {
    selectedStudent: signal(mockEntries),
    selectedStudentId: signal('stu-1'),
    selectedStudentLoading: signal(false),
    selectedStudentError: signal<string | null>(null),
    studentHistory: signal(null),
    studentHistoryLoading: signal(false),
    studentHistoryError: signal(null),
    loadStudentDetail: vi.fn(),
    loadStudentHistory: vi.fn(),
  };
}

describe('StudentDetailComponent', () => {
  let fixture: ComponentFixture<StudentDetailComponent>;
  let component: StudentDetailComponent;
  let storeMock: ReturnType<typeof buildStoreMock>;
  let routerSpy: Pick<Router, 'navigate'>;

  beforeEach(async () => {
    storeMock = buildStoreMock();
    routerSpy = { navigate: vi.fn().mockResolvedValue(true) };

    await TestBed.configureTestingModule({
      providers: [
        { provide: ProgressStore, useValue: storeMock },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'stu-1' } } },
        },
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

  it('should call loadStudentDetail with the route studentId', () => {
    expect(storeMock.loadStudentDetail).toHaveBeenCalledWith({ studentId: 'stu-1' });
  });

  it('should call loadStudentHistory with the route studentId', () => {
    expect(storeMock.loadStudentHistory).toHaveBeenCalledWith({ studentId: 'stu-1' });
  });

  it('should group entries by className', () => {
    const groups = component.groupedByClass();
    expect(groups.length).toBe(2);
  });

  it('should compute avgScore per class', () => {
    const groups = component.groupedByClass();
    const math = groups.find((g) => g.className === 'Math 101')!;
    expect(math.avgScore).toBe(90);
  });

  it('should count only completed lessons', () => {
    expect(component.totalCompleted()).toBe(2);
  });

  it('should return rounded average of non-null scores', () => {
    // (90 + 76) / 2 = 83
    expect(component.overallAvgScore()).toBe(83);
  });

  it('should return 0 overallAvgScore when no entries have scores', () => {
    storeMock.selectedStudent.set([
      { className: 'A', lessonTitle: 'L1', lessonId: 'l1', status: 'not_started', score: null, dateCompleted: null },
    ]);
    fixture.detectChanges();
    expect(component.overallAvgScore()).toBe(0);
  });

  it('should return empty groupedByClass when selectedStudent is empty', () => {
    storeMock.selectedStudent.set([]);
    fixture.detectChanges();
    expect(component.groupedByClass()).toEqual([]);
  });

  it('should navigate to /teacher/students', () => {
    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/teacher/students']);
  });

  it('statusSeverity: completed -> success', () => {
    expect(component.statusSeverity('completed')).toBe('success');
  });

  it('statusSeverity: in_progress -> warn', () => {
    expect(component.statusSeverity('in_progress')).toBe('warn');
  });

  it('statusSeverity: not_started -> danger', () => {
    expect(component.statusSeverity('not_started')).toBe('danger');
  });

  it('statusLabel: returns correct labels', () => {
    expect(component.statusLabel('completed')).toBe('Completed');
    expect(component.statusLabel('in_progress')).toBe('In Progress');
    expect(component.statusLabel('not_started')).toBe('Not Started');
  });
});