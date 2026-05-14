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
  let routerSpy: any;

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

  it('should group entries by className', () => {
    const groups = component.groupedByClass();
    expect(groups.length).toBe(2);
  });

  it('should count only completed lessons', () => {
    expect(component.totalCompleted()).toBe(2);
  });

  it('should return rounded average of non-null scores', () => {
    expect(component.overallAvgScore()).toBe(83); // (90 + 76) / 2
  });

  it('should navigate to /teacher/students', () => {
    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/teacher/students']);
  });
});