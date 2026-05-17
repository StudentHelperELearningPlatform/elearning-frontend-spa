import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext, signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { MilestonesComponent } from './milestones.component';
import { MilestonesStore, Milestone } from '../../store/milestones.store';
import { AuthStore } from '../../../auth/store/auth.store';

describe('MilestonesComponent', () => {
  let injector: EnvironmentInjector;
  let storeMock: {
    milestones: ReturnType<typeof signal<Milestone[]>>;
    loading: ReturnType<typeof signal<boolean>>;
    earnedCount: ReturnType<typeof signal<number>>;
    totalCount: ReturnType<typeof signal<number>>;
    loadMilestones: ReturnType<typeof vi.fn>;
  };
  let authStoreMock: {
    user: ReturnType<typeof signal<{ id: string } | null>>;
  };

  beforeEach(() => {
    storeMock = {
      milestones: signal<Milestone[]>([]),
      loading: signal(false),
      earnedCount: signal(0),
      totalCount: signal(0),
      loadMilestones: vi.fn(),
    };
    authStoreMock = {
      user: signal<{ id: string } | null>({ id: 'student-1' }),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        { provide: MilestonesStore, useValue: storeMock },
        { provide: AuthStore, useValue: authStoreMock },
      ],
    });
    injector = TestBed.inject(EnvironmentInjector);
  });

  afterEach(() => vi.restoreAllMocks());

  function make() {
    return runInInjectionContext(injector, () => new MilestonesComponent());
  }

  it('creates without errors', () => {
    expect(make()).toBeTruthy();
  });

  it('ngOnInit calls loadMilestones with the authenticated user id', () => {
    make().ngOnInit();
    expect(storeMock.loadMilestones).toHaveBeenCalledWith('student-1');
  });

  it('ngOnInit does NOT call loadMilestones when user is null', () => {
    authStoreMock.user.set(null);
    make().ngOnInit();
    expect(storeMock.loadMilestones).not.toHaveBeenCalled();
  });

  it('filteredMilestones returns every milestone when selectedCategory is ALL', () => {
    storeMock.milestones.set([
      { id: '1', title: 'a', description: '', category: 'learning' },
      { id: '2', title: 'b', description: '', category: 'streak' },
    ]);
    const comp = make();
    comp.selectedCategory.set('ALL');
    expect(comp.filteredMilestones().length).toBe(2);
  });

  it('filteredMilestones filters by uppercase category match', () => {
    storeMock.milestones.set([
      { id: '1', title: 'a', description: '', category: 'learning' },
      { id: '2', title: 'b', description: '', category: 'streak' },
      { id: '3', title: 'c', description: '', category: 'learning' },
    ]);
    const comp = make();
    comp.selectedCategory.set('LEARNING');
    expect(comp.filteredMilestones().map((m) => m.id)).toEqual(['1', '3']);
  });

  it('exposes the expected category list', () => {
    expect(make().categories).toEqual(['ALL', 'LEARNING', 'STREAK', 'MASTERY', 'SOCIAL']);
  });
});
