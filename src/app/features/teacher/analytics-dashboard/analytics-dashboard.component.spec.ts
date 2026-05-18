import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsDashboardComponent } from './analytics-dashboard.component';
import { ContentStore, ContentItem } from '../state/content.store';
import { ClassStore } from '../state/class.store';
import { TeacherClass } from '../models/class.model';
import { TeacherProgressStore, StudentProgressRow, StudentDetail } from '../state/progress.store';
import { provideRouter } from '@angular/router';
import { signal, WritableSignal } from '@angular/core';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('AnalyticsDashboardComponent', () => {
  let component: AnalyticsDashboardComponent;
  let fixture: ComponentFixture<AnalyticsDashboardComponent>;

  let mockContentStore: {
    publishedLessons: WritableSignal<ContentItem[]>;
    draftLessons: WritableSignal<ContentItem[]>;
    quizzes: WritableSignal<ContentItem[]>;
    loading: WritableSignal<boolean>;
    loadContent: ReturnType<typeof vi.fn>;
  };

  let mockClassStore: {
    classes: WritableSignal<TeacherClass[]>;
    loading: WritableSignal<boolean>;
    loadClasses: ReturnType<typeof vi.fn>;
  };

  let mockProgressStore: {
    allStudents: WritableSignal<StudentProgressRow[]>;
    selectedStudentDetail: WritableSignal<StudentDetail | null>;
    loading: WritableSignal<boolean>;
    error: WritableSignal<string | null>;
    loadAllStudents: ReturnType<typeof vi.fn>;
    loadStudentDetail: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockContentStore = {
      publishedLessons: signal([
        { id: '1', title: 'Lesson 1', status: 'PUBLISHED' }
      ]),
      draftLessons: signal([
        { id: '2', title: 'Lesson 2', status: 'DRAFT' }
      ]),
      quizzes: signal([
        { id: 'q1', title: 'Quiz 1' }
      ]),
      loading: signal(false),
      loadContent: vi.fn(),
    };

    mockClassStore = {
      classes: signal([
        { id: 'c1', name: 'Class 1A', studentCount: 20, averageGrade: 8.5 }
      ]),
      loading: signal(false),
      loadClasses: vi.fn(),
    };

    mockProgressStore = {
      allStudents: signal([
        { studentId: 's1', studentName: 'Alice Smith', lessonsCompleted: 3, averageScore: 85, lastActive: new Date('2026-05-18') }
      ]),
      selectedStudentDetail: signal(null),
      loading: signal(false),
      error: signal(null),
      loadAllStudents: vi.fn(),
      loadStudentDetail: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AnalyticsDashboardComponent],
      providers: [
        provideRouter([]),
        { provide: ContentStore, useValue: mockContentStore },
        { provide: ClassStore, useValue: mockClassStore },
        { provide: TeacherProgressStore, useValue: mockProgressStore },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsDashboardComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates component successfully and loads all store data on init', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(mockContentStore.loadContent).toHaveBeenCalled();
    expect(mockClassStore.loadClasses).toHaveBeenCalled();
    expect(mockProgressStore.loadAllStudents).toHaveBeenCalled();
  });

  it('renders content summary cards correctly', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Published Lessons');
    expect(element.textContent).toContain('1');
    expect(element.textContent).toContain('Draft Lessons');
    expect(element.textContent).toContain('1');
  });

  it('renders class overview table correctly with live average grades', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Class 1A');
    expect(element.textContent).toContain('20');
    expect(element.textContent).toContain('8.5/10');
  });

  it('renders student performance directory correctly', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Student Performance Directory');
    expect(element.textContent).toContain('Alice Smith');
    expect(element.textContent).toContain('3');
    expect(element.textContent).toContain('85%');
  });

  it('shows loading spinner when progress store is loading', () => {
    mockProgressStore.loading.set(true);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.animate-spin')).toBeTruthy();
    expect(element.textContent).toContain('Fetching student progress records');
  });

  it('shows error state when progress store encounters an error', () => {
    mockProgressStore.error.set('Network timeout');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Error loading progress data: Network timeout');
  });

  it('shows empty state when no students are enrolled', () => {
    mockProgressStore.allStudents.set([]);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('No Students Enrolled');
  });

  it('opens inspect modal, loads detail, and closes successfully', () => {
    fixture.detectChanges();
    
    component.inspectStudent('s1');
    expect(mockProgressStore.loadStudentDetail).toHaveBeenCalledWith('s1');
    expect(component.isModalOpen()).toBe(true);

    mockProgressStore.selectedStudentDetail.set({
      studentId: 's1',
      studentName: 'Alice Smith',
      totalLessonsCompleted: 3,
      averageScore: 85,
      history: [
        { lessonId: 'l1', lessonTitle: 'Intro to Algebra', status: 'COMPLETED', score: 90 }
      ]
    });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain("Alice Smith's Learning Profile");
    expect(element.textContent).toContain('Intro to Algebra');
    expect(element.textContent).toContain('90%');

    component.closeModal();
    expect(component.isModalOpen()).toBe(false);
  });
});
