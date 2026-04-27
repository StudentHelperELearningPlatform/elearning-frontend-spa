import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ResultsSummaryComponent } from './results-summary.component';

// ResultsSummaryComponent uses templateUrl — cannot be mounted in Vitest.
// We construct the class inside runInInjectionContext (required for input signals),
// then cast-assign signal getters to return test values.

describe('ResultsSummaryComponent (logic)', () => {
  let injector: EnvironmentInjector;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    injector = TestBed.inject(EnvironmentInjector);
  });

  function make(score: number, totalPoints: number, timeSpent = 300, passed = false) {
    const comp = runInInjectionContext(injector, () => new ResultsSummaryComponent());
    comp.score = (() => score) as typeof comp.score;
    comp.totalPoints = (() => totalPoints) as typeof comp.totalPoints;
    comp.timeSpent = (() => timeSpent) as typeof comp.timeSpent;
    comp.passed = (() => passed) as typeof comp.passed;
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

  it('returns "PERFECT SCORE!" for 100%', () => {
    expect(make(100, 100).getTitle()).toBe('PERFECT SCORE!');
  });

  it('returns "Incredible!" for >= 90%', () => {
    expect(make(90, 100).getTitle()).toBe('Incredible!');
  });

  it('returns "Great Job!" for >= 70%', () => {
    expect(make(70, 100).getTitle()).toBe('Great Job!');
  });

  it('returns "Good Effort!" for >= 50%', () => {
    expect(make(50, 100).getTitle()).toBe('Good Effort!');
  });

  it('returns "Keep Practicing!" for >= 30%', () => {
    expect(make(30, 100).getTitle()).toBe('Keep Practicing!');
  });

  it('returns "Don\'t Give Up!" for below 30%', () => {
    expect(make(20, 100).getTitle()).toBe("Don't Give Up!");
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

  // ─── getMascotEmoji ───────────────────────────────────────────────────────

  it('returns "🏆" for 100%', () => {
    expect(make(100, 100).getMascotEmoji()).toBe('🏆');
  });

  it('returns "🌟" for >= 90%', () => {
    expect(make(90, 100).getMascotEmoji()).toBe('🌟');
  });

  it('returns "😄" for >= 70%', () => {
    expect(make(70, 100).getMascotEmoji()).toBe('😄');
  });

  it('returns "💪" for >= 50%', () => {
    expect(make(50, 100).getMascotEmoji()).toBe('💪');
  });

  it('returns "😅" for >= 30%', () => {
    expect(make(30, 100).getMascotEmoji()).toBe('😅');
  });

  it('returns "😢" for below 30%', () => {
    expect(make(20, 100).getMascotEmoji()).toBe('😢');
  });

  // ─── getMascotUrl ─────────────────────────────────────────────────────────

  it('getMascotUrl contains "star" seed for >= 90%', () => {
    expect(make(90, 100).getMascotUrl()).toContain('star');
  });

  it('getMascotUrl contains "happy" seed for >= 70%', () => {
    expect(make(70, 100).getMascotUrl()).toContain('happy');
  });

  it('getMascotUrl contains "sad" seed for >= 30%', () => {
    expect(make(30, 100).getMascotUrl()).toContain('sad');
  });

  // ─── passed input ─────────────────────────────────────────────────────────

  it('passed() returns false by default', () => {
    expect(make(50, 100).passed()).toBe(false);
  });

  it('passed() returns true when set', () => {
    expect(make(80, 100, 300, true).passed()).toBe(true);
  });
});
