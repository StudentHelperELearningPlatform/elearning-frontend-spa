import { ResultsSummaryComponent } from './results-summary.component';

// ResultsSummaryComponent uses templateUrl which cannot be resolved in Vitest
// without resolveComponentResources(). We test the class methods directly
// using plain `new` — no TestBed, no Angular compiler involved.

const make = (score: number, totalPoints: number, timeSpent = 300) => {
  const comp = new ResultsSummaryComponent();
  // input() signals are getter functions on the prototype — override on instance
  Object.defineProperty(comp, 'score', { value: () => score });
  Object.defineProperty(comp, 'totalPoints', { value: () => totalPoints });
  Object.defineProperty(comp, 'timeSpent', { value: () => timeSpent });
  return comp;
};

describe('ResultsSummaryComponent (logic)', () => {

  // ─── getPercentage ──────────────────────────────────────────────────────

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

  // ─── getTitle ──────────────────────────────────────────────────────────

  it.each([
    [95, 100, 'Incredible!'],
    [70, 100, 'Great Job!'],
    [50, 100, 'Good Effort!'],
    [40, 100, 'Keep Practicing!'],
  ])('getTitle for %i/%i returns "%s"', (score, total, expected) => {
    expect(make(score, total).getTitle()).toBe(expected);
  });

  // ─── formatTime ────────────────────────────────────────────────────────

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

  // ─── getMascotUrl ──────────────────────────────────────────────────────

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
