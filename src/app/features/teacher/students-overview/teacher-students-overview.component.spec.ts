import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TeacherStudentsOverviewComponent } from './teacher-students-overview.component';
import { ProgressStore } from '../../student/store/progress.store';

interface TeacherStudentSummary {
  studentId: string;
  studentName: string;
  classesEnrolled: number;
  totalLessonsCompleted: number;
  averageScore: number;
  lastActive: string | null;
}

const mockStudents: TeacherStudentSummary[] = [
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
  let routerSpy: Pick<Router, 'navigate'>;

  beforeEach(async () => {
    storeMock = buildStoreMock();
    routerSpy = { navigate: vi.fn().mockResolvedValue(true) };

    TestBed.overrideComponent(TeacherStudentsOverviewComponent, {
      set: { template: '<div></div>' },
    });

    await TestBed.configureTestingModule({
      providers: [
        { provide: ProgressStore, useValue: storeMock },
        { provide: Router, useValue: routerSpy },
        MessageService,
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
    component.searchTerm.set('');
    fixture.detectChanges();
    expect(component.filteredStudents().length).toBe(2);
  });

  it('should filter by studentName case-insensitively', () => {
    component.searchTerm.set('alice');
    fixture.detectChanges();
    const result = component.filteredStudents();
    expect(result.length).toBe(1);
    expect(result[0].studentName).toBe('Alice');
  });

  it('should return empty array when no match', () => {
    component.searchTerm.set('zzz-no-match');
    fixture.detectChanges();
    expect(component.filteredStudents().length).toBe(0);
  });

  it('should navigate to the student detail page', () => {
    component.onRowSelect(mockStudents[0]);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/teacher/students', 'stu-1']);
  });

  it('should navigate with correct studentId for different student', () => {
    component.onRowSelect(mockStudents[1]);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/teacher/students', 'stu-2']);
  });

  it('should expose studentsError from store', () => {
    storeMock.studentsError.set('Server error');
    fixture.detectChanges();
    expect(component.store.studentsError()).toBe('Server error');
  });

  it('should not throw when studentsError is null on init', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('filteredStudents should return empty array when store has no students', () => {
    storeMock.students.set([]);
    fixture.detectChanges();
    expect(component.filteredStudents()).toEqual([]);
  });
});