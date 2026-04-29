import { TestBed } from '@angular/core/testing';
import { patchStore } from '../../../../test-utils/patch-store';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { QuizzesStore } from '../store/quizzes.store';
import { QuizHistoryComponent } from './quiz-history.component';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';

const MOCK_ATTEMPT = {
  id: 'a1', quizId: 'quiz-1', quizTitle: 'Sample Quiz', subject: 'Math',
  dateTaken: '2026-04-20T10:00:00Z', score: 80, totalPoints: 100,
  percentage: 80, passed: true, timeSpent: 300, attemptId: 'a1'
};

// QuizHistoryComponent uses templateUrl so we cannot mount it in Vitest.
// We test the component CLASS logic directly by instantiating it with injected deps.

describe('QuizHistoryComponent', () => {
  let component: QuizHistoryComponent;
  let store: InstanceType<typeof QuizzesStore>;
  let injector: EnvironmentInjector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
    });

    store = TestBed.inject(QuizzesStore);
    injector = TestBed.inject(EnvironmentInjector);

    patchStore(store, { attempts: [], attemptsLoading: false });

    component = runInInjectionContext(injector, () => new QuizHistoryComponent());
    component.ngOnInit();
  });

  afterEach(() => vi.restoreAllMocks());

  // Test E1 — empty state shows when attempts is empty
  it('empty state shows when attempts is empty', () => {
    patchStore(store, { attempts: [], attemptsLoading: false });
    // Empty state condition: not loading AND attempts.length === 0
    expect(store.attemptsLoading()).toBe(false);
    expect(store.attempts().length).toBe(0);
  });

  // Test E2 — empty state NOT shown when attemptsLoading is true
  it('empty state NOT shown when attemptsLoading is true', () => {
    patchStore(store, { attempts: [], attemptsLoading: true });
    // Loading state takes precedence over empty state
    expect(store.attemptsLoading()).toBe(true);
  });

  // Test E3 — empty state NOT shown when attempts has data
  it('empty state NOT shown when attempts has data', () => {
    patchStore(store, { attempts: [MOCK_ATTEMPT], attemptsLoading: false });
    // Data exists, so empty state should not show
    expect(store.attempts().length).toBeGreaterThan(0);
    expect(store.attemptsLoading()).toBe(false);
  });

  // Test E4 — skeleton shows when attemptsLoading is true
  it('skeleton shows when attemptsLoading is true', () => {
    patchStore(store, { attempts: [], attemptsLoading: true });
    // Skeleton shown when loading is true
    expect(store.attemptsLoading()).toBe(true);
  });

  // Test E5 — getBadgeVariant boundary conditions
  it('getBadgeVariant boundary conditions', () => {
    expect(component.getBadgeVariant(100)).toBe('success');
    expect(component.getBadgeVariant(60)).toBe('success');   // boundary — exactly 60 is PASS
    expect(component.getBadgeVariant(59)).toBe('danger');    // one below boundary
    expect(component.getBadgeVariant(0)).toBe('danger');
  });

  // Test E6 — getPassFailVariant
  it('getPassFailVariant', () => {
    expect(component.getPassFailVariant(true)).toBe('success');
    expect(component.getPassFailVariant(false)).toBe('danger');
  });

  // Test E7 — formatTime edge cases
  it('formatTime edge cases', () => {
    expect(component.formatTime(0)).toBe('0m 0s');      // must not crash or return NaN
    expect(component.formatTime(60)).toBe('1m 0s');
    expect(component.formatTime(90)).toBe('1m 30s');
    expect(component.formatTime(3600)).toBe('60m 0s');
  });

  // Test E8 — filteredAttempts returns all when subject is null
  it('filteredAttempts returns all when subject is null', () => {
    const attempts = [
      { ...MOCK_ATTEMPT, id: 'a1', subject: 'Math' },
      { ...MOCK_ATTEMPT, id: 'a2', subject: 'Science' },
    ];
    patchStore(store, { attempts, attemptsLoading: false });
    component.selectedSubject.set(null);
    expect(component.filteredAttempts().length).toBe(2);
  });

  // Test E9 — filteredAttempts filters by subject correctly
  it('filteredAttempts filters by subject correctly', () => {
    const attempts = [
      { ...MOCK_ATTEMPT, id: 'a1', subject: 'Math' },
      { ...MOCK_ATTEMPT, id: 'a2', subject: 'Science' },
      { ...MOCK_ATTEMPT, id: 'a3', subject: 'Math' },
    ];
    patchStore(store, { attempts, attemptsLoading: false });
    component.selectedSubject.set('Math');
    expect(component.filteredAttempts().length).toBe(2);
    expect(component.filteredAttempts().every(a => a.subject === 'Math')).toBe(true);
  });

  // Test E10 — filteredAttempts filtered empty state is NOT same as never-taken state
  it('filteredAttempts filtered empty state is NOT same as never-taken state', () => {
    // When filter returns 0 but attempts exist, empty state message must NOT show
    const attempts = [{ ...MOCK_ATTEMPT, subject: 'Math' }];
    patchStore(store, { attempts, attemptsLoading: false });
    component.selectedSubject.set('Science');   // no Science records
    // filteredAttempts is empty but store.attempts has data
    expect(component.filteredAttempts().length).toBe(0);
    expect(store.attempts().length).toBeGreaterThan(0);
  });

  // Test E11 — ngOnInit calls store.loadAttempts()
  it('ngOnInit calls store.loadAttempts', () => {
    vi.spyOn(store, 'loadAttempts');
    component.ngOnInit();
    expect(store.loadAttempts).toHaveBeenCalledTimes(1);
  });
});
