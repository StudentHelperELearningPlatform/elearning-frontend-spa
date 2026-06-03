import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MilestonesComponent } from './milestones.component';
import { Milestone, MilestonesStore } from '../store/milestones.store';

describe('MilestonesComponent (student route)', () => {
  let component: MilestonesComponent;

  const loadMilestones = vi.fn();
  const milestones = signal<Milestone[]>([]);
  const earnedCount = signal(0);
  const totalCount = signal(0);

  beforeEach(() => {
    loadMilestones.mockReset();
    milestones.set([]);
    earnedCount.set(0);
    totalCount.set(0);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: MilestonesStore,
          useValue: {
            loadMilestones,
            milestones,
            earnedCount,
            totalCount,
          },
        },
      ],
    });

    component = TestBed.runInInjectionContext(() => new MilestonesComponent());
  });

  it('loads milestones on init', () => {
    component.ngOnInit();
    expect(loadMilestones).toHaveBeenCalledTimes(1);
  });

  it('returns all milestones when selected category is all', () => {
    milestones.set([
      { id: '1', title: 'A', description: 'x', category: 'learning' },
      { id: '2', title: 'B', description: 'y', category: 'streak' },
    ]);

    expect(component.selectedCategory()).toBe('all');
    expect(component.filteredMilestones().length).toBe(2);
  });

  it('filters milestones by selected category', () => {
    milestones.set([
      { id: '1', title: 'A', description: 'x', category: 'learning' },
      { id: '2', title: 'B', description: 'y', category: 'streak' },
    ]);

    component.setCategory('streak');

    expect(component.filteredMilestones()).toEqual([
      { id: '2', title: 'B', description: 'y', category: 'streak' },
    ]);
  });

  it('computes progressPercent based on earned and total', () => {
    earnedCount.set(3);
    totalCount.set(4);

    expect(component.progressPercent()).toBe(75);
  });

  it('returns zero progressPercent when total is zero', () => {
    earnedCount.set(2);
    totalCount.set(0);

    expect(component.progressPercent()).toBe(0);
  });

  it('computes remaining milestones goal correctly', () => {
    expect(component.getRemaining({ id: 'm', title: 'M', description: '', category: 'mastery', goal: 10, progress: 3 })).toBe(7);
    expect(component.getRemaining({ id: 'm2', title: 'M2', description: '', category: 'mastery' })).toBe(0);
  });

  it('returns true for newly earned milestone and false otherwise', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-27T12:00:00.000Z'));

    expect(component.isNew({ id: 'n', title: 'N', description: '', category: 'social', earnedAt: '2026-05-27T11:59:40.000Z' })).toBe(true);
    expect(component.isNew({ id: 'o', title: 'O', description: '', category: 'social', earnedAt: '2026-05-27T11:59:00.000Z' })).toBe(false);
    expect(component.isNew({ id: 'x', title: 'X', description: '', category: 'social' })).toBe(false);
  });
});
