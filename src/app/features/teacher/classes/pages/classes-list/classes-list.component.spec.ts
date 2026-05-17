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

  it('should handle onDelete (currently just logs)', () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const comp = make();
    comp.onDelete('c1');
    expect(console.log).toHaveBeenCalledWith('delete', 'c1');
  });

  it('should create class if prompt returns a name', () => {
    vi.spyOn(window, 'prompt').mockReturnValue('New Class Name');
    const comp = make();
    comp.onCreateClass();
    
    expect(window.prompt).toHaveBeenCalledWith('Class name');
    expect(mockClassStore.createClass).toHaveBeenCalledWith({
      name: 'New Class Name',
      description: ''
    });
  });

  it('should not create class if prompt returns null', () => {
    vi.spyOn(window, 'prompt').mockReturnValue(null);
    const comp = make();
    comp.onCreateClass();
    
    expect(window.prompt).toHaveBeenCalledWith('Class name');
    expect(mockClassStore.createClass).not.toHaveBeenCalled();
  });
  
  it('should not create class if prompt returns empty string', () => {
    vi.spyOn(window, 'prompt').mockReturnValue('');
    const comp = make();
    comp.onCreateClass();
    
    expect(window.prompt).toHaveBeenCalledWith('Class name');
    expect(mockClassStore.createClass).not.toHaveBeenCalled();
  });
});
