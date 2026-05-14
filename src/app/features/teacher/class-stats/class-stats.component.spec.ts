import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ClassStatsComponent } from './class-stats.component';
import { TeacherProgressStore } from '../store/progress.store';
import { patchStore } from '../../../../test-utils/patch-store';
import { USER_PLATFORM_API_URL } from '../../../core/tokens/api.token';

describe('ClassStatsComponent', () => {
  let fixture: ComponentFixture<ClassStatsComponent>;
  let store: InstanceType<typeof TeacherProgressStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassStatsComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        TeacherProgressStore,
        { provide: USER_PLATFORM_API_URL, useValue: 'http://test-api' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassStatsComponent);
    store = TestBed.inject(TeacherProgressStore);
  });

  it('renders student progress table for 10+ students', () => {
    // Generate 12 mock students
    const mockStudents = Array.from({ length: 12 }).map((_, i) => ({
      studentId: `stu-${i}`,
      studentName: `Student ${i}`,
      lessonsCompleted: i,
      averageScore: 80,
      lastActive: new Date().toISOString()
    }));

    // Patch the store directly with 12 students
    patchStore(store, { classStudents: mockStudents });
    
    fixture.detectChanges();

    // Find all table rows in the body
    const tableRows = fixture.debugElement.queryAll(By.css('p-table tbody tr'));
    
    // The p-table with paginator shows up to the 'rows' limit (which is 10)
    // We expect exactly 10 rows to be rendered on the first page
    expect(tableRows.length).toBe(10);
    
    // And the store itself holds 12
    expect(store.classStudents().length).toBe(12);
  });
});
