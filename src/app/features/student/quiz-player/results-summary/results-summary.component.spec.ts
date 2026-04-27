import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ResultsSummaryComponent } from './results-summary.component';

// ResultsSummaryComponent uses templateUrl (cannot be mounted in Vitest without
// resolveComponentResources). We test pure logic methods only.
// input.required() calls must happen inside an injection context — we use
// runInInjectionContext so Angular's DI is satisfied during construction,
// then we replace the signal getters with plain functions returning test values.

describe('ResultsSummaryComponent (logic)', () => {
  let injector: EnvironmentInjector;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    injector = TestBed.inject(EnvironmentInjector);
  });

  function make(score: number, totalPoints: number, timeSpent = 300) {
    // Must construct inside injection context so input.required() initialises
    const comp = runInInjectionContext(injector, () => new ResultsSummaryComponent());
    // Override signal getters with plain functions returning test values
    comp.score = (() => score) as typeof comp.score;
    comp.totalPoints = (() => totalPoints) as typeof comp.totalPoints;
    comp.timeSpent = (() => timeSpent) as typeof comp.timeSpent;
    return comp;
  }

  // ─── getPercentage ────────────────────────────────────────────────────────

  it('returns 0 when totalPoints is 0', () => {
    expect(make(0, 0).getPercentage()).toBe(0);
  });

  it('returns 80 for score 80 / totalPoints 100', () => {
    expect(make(80, 100).getPercentage()).toBe(80);
  });

  it('returns 33 for score 33 / totalPoints 100', () => {
    expect(make(33, 100).getPercentage()).toBe(33);
  });

  it('rounds correctly for non-integer division (1/3)', () => {
    expect(make(1, 3).getPercentage()).toBe(33);
  });

  // ─── getTitle ─────────────────────────────────────────────────────────────

  it.each([
    [95, 100, 'Incredible!'],
    [70, 100, 'Great Job!'],
    [50, 100, 'Good Effort!'],
    [40, 100, 'Keep Practicing!'],
  ])('getTitle for %i/%i returns "%s"', (score, total, expected) => {
    expect(make(score, total).getTitle()).toBe(expected);
  });

  // ─── formatTime ───────────────────────────────────────────────────────────

  it('formats 0 seconds as "0:00"', () => {
    expect(make(0, 100).formatTime(0)).toBe('0:00');
  });

  it('formats 45 seconds as "0:45"', () => {
    expect(make(0, 100).formatTime(45)).toBe('0:45');
  });

  it('formats 60 seconds as "1:00"', () => {
    expect(make(0, 100).formatTime(60)).toBe('1:00');
  });

  it('formats 125 seconds as "2:05"', () => {
    expect(make(0, 100).formatTime(125)).toBe('2:05');
  });

  // ─── getMascotUrl ─────────────────────────────────────────────────────────

  it('uses "sad" seed for score below 50%', () => {
    expect(make(30, 100).getMascotUrl()).toContain('sad');
  });

  it('uses "star" seed for score >= 90%', () => {
    expect(make(90, 100).getMascotUrl()).toContain('star');
  });

  it('uses "happy" seed for mid-range score', () => {
    expect(make(70, 100).getMascotUrl()).toContain('happy');
  });
});
