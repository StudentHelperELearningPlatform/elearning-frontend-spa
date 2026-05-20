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
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ClassStore, useValue: mockClassStore }
      ]
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
      description: 'A beautiful description'
    });
    expect(comp.createMode()).toBe(false);
    expect(comp.newClassName()).toBe('');
    expect(comp.newClassDescription()).toBe('');
  });

  it('should not create class on submitCreate if name is empty', () => {
    const comp = make();
    comp.createMode.set(true);
    comp.newClassName.set('   ');
    comp.newClassDescription.set('No name');
    
    comp.submitCreate();
    
    expect(mockClassStore.createClass).not.toHaveBeenCalled();
    expect(comp.createMode()).toBe(true);
  });

  it('should reset signals on cancelCreate', () => {
    const comp = make();
    comp.createMode.set(true);
    comp.newClassName.set('Draft Name');
    comp.newClassDescription.set('Draft Description');
    
    comp.cancelCreate();
    
    expect(comp.createMode()).toBe(false);
    expect(comp.newClassName()).toBe('');
    expect(comp.newClassDescription()).toBe('');
  });
});
