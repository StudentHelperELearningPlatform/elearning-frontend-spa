import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassManagementComponent } from './class-management.component';
import { ClassStore } from '../state/class.store';
import { signal } from '@angular/core';

describe('ClassManagementComponent', () => {
  let component: ClassManagementComponent;
  let fixture: ComponentFixture<ClassManagementComponent>;
  let mockClassStore: any;

  beforeEach(async () => {
    mockClassStore = {
      loading: signal(false),
      classes: signal([{ id: 'c1', name: 'Math', studentCount: 5 }]),
      currentClass: signal({ id: 'c1', name: 'Math', students: [{ id: 's1', name: 'John Doe', email: 'john@example.com' }] }),
      loadClasses: vi.fn(),
      loadClassDetail: vi.fn(),
      removeStudent: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ClassManagementComponent],
      providers: [
        { provide: ClassStore, useValue: mockClassStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load classes on init', () => {
    expect(mockClassStore.loadClasses).toHaveBeenCalled();
  });

  it('should set selected class and load its details', () => {
    const mockClass = { id: 'c2', name: 'Science', studentCount: 10, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' };
    component.selectClass(mockClass);
    expect(component.selectedClass()).toEqual(mockClass);
    expect(mockClassStore.loadClassDetail).toHaveBeenCalledWith('c2');
  });

  it('should remove student if confirmed', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    component.selectedClass.set({ id: 'c1', name: 'Math', studentCount: 5, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' });
    
    component.removeStudent('s1');
    expect(window.confirm).toHaveBeenCalledWith('Remove this student?');
    expect(mockClassStore.removeStudent).toHaveBeenCalledWith('c1', 's1');
  });

  it('should not remove student if not confirmed', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    component.selectedClass.set({ id: 'c1', name: 'Math', studentCount: 5, lessonCount: 0, createdAt: '2023-01-01T00:00:00Z' });
    
    component.removeStudent('s1');
    expect(window.confirm).toHaveBeenCalledWith('Remove this student?');
    expect(mockClassStore.removeStudent).not.toHaveBeenCalled();
  });

  it('should not remove student if no class is selected', () => {
    component.selectedClass.set(null);
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    
    component.removeStudent('s1');
    expect(window.confirm).not.toHaveBeenCalled();
    expect(mockClassStore.removeStudent).not.toHaveBeenCalled();
  });
});
