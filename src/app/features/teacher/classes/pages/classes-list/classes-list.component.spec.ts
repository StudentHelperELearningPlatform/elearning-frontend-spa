import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ClassesListComponent } from './classes-list.component';
import { ClassStore } from '../../../state/class.store';
import { signal } from '@angular/core';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';

describe('ClassesListComponent', () => {
  let injector: EnvironmentInjector;
  let mockClassStore: Record<string, unknown>;

  beforeEach(() => {
    mockClassStore = {
      loading: signal(false),
      classes: signal([]),
      loadClasses: vi.fn(),
      createClass: vi.fn(),
      deleteClass: vi.fn(),
      updateClass: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: ClassStore, useValue: mockClassStore }],
    });
    injector = TestBed.inject(EnvironmentInjector);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function make() {
    return runInInjectionContext(injector, () => new ClassesListComponent());
  }

  it('should create', () => {
    expect(make()).toBeTruthy();
  });

  it('should load classes on init', () => {
    const comp = make();
    comp.ngOnInit();
    expect(mockClassStore.loadClasses).toHaveBeenCalled();
  });

  it('should handle onDelete', () => {
    const comp = make();
    comp.onDelete('c1');
    expect(mockClassStore.deleteClass).toHaveBeenCalledWith('c1');
  });

  it('should set createMode to true on onCreateClass', () => {
    const comp = make();
    expect(comp.createMode()).toBe(false);
    comp.onCreateClass();
    expect(comp.createMode()).toBe(true);
  });

  it('should create class on submitCreate if name is present', () => {
    const comp = make();
    comp.createMode.set(true);
    comp.newClassName.set('New Class Name');
    comp.newClassDescription.set('A beautiful description');

    comp.submitCreate();

    expect(mockClassStore.createClass).toHaveBeenCalledWith({
      name: 'New Class Name',
      description: 'A beautiful description',
    });
    expect(comp.createMode()).toBe(false);
  });

  it('should not create class on submitCreate if name is empty', () => {
    const comp = make();
    comp.createMode.set(true);
    comp.newClassName.set('   ');
    comp.submitCreate();

    expect(mockClassStore.createClass).not.toHaveBeenCalled();
  });

  it('should reset signals on cancelCreate', () => {
    const comp = make();
    comp.createMode.set(true);
    comp.newClassName.set('Draft Name');
    comp.cancelCreate();

    expect(comp.createMode()).toBe(false);
    expect(comp.newClassName()).toBe('');
  });

  // --- Edit Mode Tests ---

  it('should populate edit state on onEdit', () => {
    const comp = make();
    comp.onEdit('c1', 'Math 101', 'Description');

    expect(comp.editingClassId()).toBe('c1');
    expect(comp.editName()).toBe('Math 101');
    expect(comp.editDescription()).toBe('Description');
  });

  it('should update class and clear state on submitEdit', () => {
    const comp = make();
    comp.editingClassId.set('c1');
    comp.editName.set('Updated Math');
    comp.editDescription.set('Updated Desc');

    comp.submitEdit();

    expect(mockClassStore.updateClass).toHaveBeenCalledWith('c1', {
      name: 'Updated Math',
      description: 'Updated Desc',
    });
    expect(comp.editingClassId()).toBeNull();
    expect(comp.editName()).toBe('');
  });

  it('should return early on submitEdit if id is null or name is empty', () => {
    const comp = make();

    // Case 1: missing ID
    comp.editingClassId.set(null);
    comp.editName.set('Updated Math');
    comp.submitEdit();
    expect(mockClassStore.updateClass).not.toHaveBeenCalled();

    // Case 2: missing Name
    comp.editingClassId.set('c1');
    comp.editName.set('   ');
    comp.submitEdit();
    expect(mockClassStore.updateClass).not.toHaveBeenCalled();
  });

  it('should reset state on cancelEdit', () => {
    const comp = make();
    comp.editingClassId.set('c1');
    comp.editName.set('Math');

    comp.cancelEdit();

    expect(comp.editingClassId()).toBeNull();
    expect(comp.editName()).toBe('');
  });
});
