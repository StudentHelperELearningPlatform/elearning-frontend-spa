import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router'; // Removed provideRouter
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ClassStatsComponent } from './class-stats.component';
import { TeacherProgressStore } from '../state/progress.store';
import { patchStore } from '../../../../test-utils/patch-store';
import { USER_PLATFORM_API_URL } from '../../../core/tokens/api.token';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('ClassStatsComponent', () => {
  let fixture: ComponentFixture<ClassStatsComponent>;
  let component: ClassStatsComponent;
  let store: InstanceType<typeof TeacherProgressStore>;
  let routerSpy: Pick<Router, 'navigate'>;

  beforeEach(async () => {
    routerSpy = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [ClassStatsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TeacherProgressStore,
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: vi.fn().mockReturnValue('class-123') } } },
        },
        { provide: USER_PLATFORM_API_URL, useValue: 'http://test-api' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassStatsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(TeacherProgressStore);

    vi.spyOn(store, 'loadClassStats');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create and load class stats on init', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.classId).toBe('class-123');
    expect(store.loadClassStats).toHaveBeenCalledWith('class-123');
  });

  it('renders student progress table for 10+ students', () => {
    fixture.detectChanges();
    const mockStudents = Array.from({ length: 12 }).map((_, i) => ({
      studentId: `stu-${i}`,
      studentName: `Student ${i}`,
      lessonsCompleted: i,
      averageScore: 80,
      lastActive: new Date().toISOString(),
    }));

    patchStore(store, { classStudents: mockStudents });
    fixture.detectChanges();

    const tableRows = fixture.debugElement.queryAll(By.css('p-table tbody tr'));
    // p-table with paginator shows up to the 'rows' limit (10)
    expect(tableRows.length).toBe(10);
    expect(store.classStudents().length).toBe(12);
  });

  it('renders empty message when there are no students', () => {
    fixture.detectChanges();
    patchStore(store, { classStudents: [] });
    fixture.detectChanges();

    const emptyMessage = fixture.debugElement.query(By.css('p-table tbody tr td'));
    expect(emptyMessage.nativeElement.textContent).toContain('No students found in this class.');
  });

  it('navigates back to classes list', () => {
    fixture.detectChanges();
    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/teacher/classes']);
  });

  it('navigates to student detail when a student row is clicked', () => {
    fixture.detectChanges();
    component.goToStudentDetail('stu-1');
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      '/teacher/classes',
      'class-123',
      'students',
      'stu-1',
    ]);
  });

  it('does not navigate to student detail if classId is null', () => {
    fixture.detectChanges();
    component.classId = null;
    component.goToStudentDetail('stu-1');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
