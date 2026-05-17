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
      error: signal(null),
      classes: signal([]),
      loadClasses: vi.fn(),
      createClass: vi.fn(),
      deleteClass: vi.fn(),
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

  it('should delete after confirmation', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const comp = make();
    comp.onDelete('c1');
    expect(mockClassStore.deleteClass).toHaveBeenCalledWith('c1');
  });

  it('should not delete when confirmation is cancelled', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const comp = make();
    comp.onDelete('c1');
    expect(mockClassStore.deleteClass).not.toHaveBeenCalled();
  });

  it('openCreate resets fields and shows the form', () => {
    const comp = make();
    comp.newClassName = 'leftover';
    comp.newClassDescription = 'leftover description';
    comp.openCreate();
    expect(comp.newClassName).toBe('');
    expect(comp.newClassDescription).toBe('');
    expect(comp.createMode()).toBe(true);
  });

  it('cancelCreate hides the form', () => {
    const comp = make();
    comp.openCreate();
    comp.cancelCreate();
    expect(comp.createMode()).toBe(false);
  });

  it('submitCreate calls createClass with name and trimmed description', () => {
    const comp = make();
    comp.newClassName = '  Algebra II  ';
    comp.newClassDescription = '  Polynomials and friends  ';
    comp.submitCreate();
    expect(mockClassStore.createClass).toHaveBeenCalledWith({
      name: 'Algebra II',
      description: 'Polynomials and friends',
    });
    expect(comp.createMode()).toBe(false);
  });

  it('submitCreate sends undefined description when blank', () => {
    const comp = make();
    comp.newClassName = 'Quick Class';
    comp.newClassDescription = '   ';
    comp.submitCreate();
    expect(mockClassStore.createClass).toHaveBeenCalledWith({
      name: 'Quick Class',
      description: undefined,
    });
  });

  it('submitCreate does nothing when name is blank', () => {
    const comp = make();
    comp.newClassName = '   ';
    comp.newClassDescription = 'desc';
    comp.submitCreate();
    expect(mockClassStore.createClass).not.toHaveBeenCalled();
  });
});
