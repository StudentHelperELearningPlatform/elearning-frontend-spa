import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TeacherStudentsOverviewComponent } from './teacher-students-overview.component';
import { ProgressStore, StudentSummary } from '../../student/store/progress.store';

const mockStudents: StudentSummary[] = [
  { studentId: 'stu-1', studentName: 'Alice', classesEnrolled: 3, totalLessonsCompleted: 12, averageScore: 88, lastActive: '2026-05-01T09:00:00Z' },
  { studentId: 'stu-2', studentName: 'Bob', classesEnrolled: 2, totalLessonsCompleted: 5, averageScore: 70, lastActive: '2026-04-28T14:00:00Z' },
];

function buildStoreMock() {
  return {
    students: signal(mockStudents),
    studentsLoading: signal(false),
    studentsError: signal<string | null>(null),
    loadStudents: vi.fn(),
  };
}

describe('TeacherStudentsOverviewComponent', () => {
  let fixture: ComponentFixture<TeacherStudentsOverviewComponent>;
  let component: TeacherStudentsOverviewComponent;
  let storeMock: ReturnType<typeof buildStoreMock>;
  let routerSpy: any;

  beforeEach(async () => {
    storeMock = buildStoreMock();
    routerSpy = { navigate: vi.fn().mockResolvedValue(true) };

    TestBed.overrideComponent(TeacherStudentsOverviewComponent, {
      set: { template: '<div></div>' }
    });

    await TestBed.configureTestingModule({
      providers: [
        { provide: ProgressStore, useValue: storeMock },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStudentsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should call loadStudents on init', () => {
    expect(storeMock.loadStudents).toHaveBeenCalledTimes(1);
  });

  it('should return all students when search is empty', () => {
    component.onSearchChange('ali');
    vi.advanceTimersByTime(300);

    component.onSearchChange('');
    vi.advanceTimersByTime(300);

    fixture.detectChanges();
    expect(component.filteredStudents().length).toBe(2);
  });

  it('should navigate to the student detail page', () => {
    component.onRowSelect(mockStudents[0]);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/teacher/students', 'stu-1']);
  });

  it('should expose studentsError from store', () => {
    storeMock.studentsError.set('Server error');
    fixture.detectChanges();
    expect(component.store.studentsError()).toBe('Server error');
  });
});