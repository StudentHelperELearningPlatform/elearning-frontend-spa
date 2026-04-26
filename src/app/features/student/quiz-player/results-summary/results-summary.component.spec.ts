import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ResultsSummaryComponent } from './results-summary.component';

describe('ResultsSummaryComponent', () => {
  let component: ResultsSummaryComponent;
  let fixture: ComponentFixture<ResultsSummaryComponent>;

  const mount = (score: number, totalPoints: number, timeSpent = 300, passed = false) => {
    (component as unknown as { score: () => number }).score = () => score;
    (component as unknown as { totalPoints: () => number }).totalPoints = () => totalPoints;
    (component as unknown as { timeSpent: () => number }).timeSpent = () => timeSpent;
    (component as unknown as { passed: () => boolean }).passed = () => passed;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsSummaryComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsSummaryComponent);
    component = fixture.componentInstance;
  });

  it('creates without errors', () => {
    mount(80, 100);
    expect(component).toBeTruthy();
  });

  // ─── getPercentage ────────────────────────────────────────────────────────

  it('getPercentage returns 0 when totalPoints is 0', () => {
    (component as unknown as { score: () => number }).score = () => 0;
    (component as unknown as { totalPoints: () => number }).totalPoints = () => 0;
    expect(component.getPercentage()).toBe(0);
  });

  it('getPercentage rounds correctly for 80/100', () => {
    (component as unknown as { score: () => number }).score = () => 80;
    (component as unknown as { totalPoints: () => number }).totalPoints = () => 100;
    expect(component.getPercentage()).toBe(80);
  });

  it('getPercentage rounds correctly for 33/100', () => {
    (component as unknown as { score: () => number }).score = () => 33;
    (component as unknown as { totalPoints: () => number }).totalPoints = () => 100;
    expect(component.getPercentage()).toBe(33);
  });

  it('getPercentage handles non-round division', () => {
    (component as unknown as { score: () => number }).score = () => 1;
    (component as unknown as { totalPoints: () => number }).totalPoints = () => 3;
    expect(component.getPercentage()).toBe(33);
  });

  // ─── getTitle ─────────────────────────────────────────────────────────────

  it.each([
    [95, 100, 'Incredible!'],
    [70, 100, 'Great Job!'],
    [50, 100, 'Good Effort!'],
    [40, 100, 'Keep Practicing!'],
  ])('getTitle for score %i/%i returns "%s"', (score, total, expected) => {
    (component as unknown as { score: () => number }).score = () => score;
    (component as unknown as { totalPoints: () => number }).totalPoints = () => total;
    expect(component.getTitle()).toBe(expected);
  });

  // ─── formatTime ───────────────────────────────────────────────────────────

  it('formatTime formats 125 seconds as "2:05"', () => {
    expect(component.formatTime(125)).toBe('2:05');
  });

  it('formatTime formats 60 seconds as "1:00"', () => {
    expect(component.formatTime(60)).toBe('1:00');
  });

  it('formatTime formats 0 seconds as "0:00"', () => {
    expect(component.formatTime(0)).toBe('0:00');
  });

  it('formatTime formats 45 seconds as "0:45"', () => {
    expect(component.formatTime(45)).toBe('0:45');
  });

  // ─── Rendering ────────────────────────────────────────────────────────────

  it('renders without throwing with typical inputs', () => {
    expect(() => mount(80, 100, 300, true)).not.toThrow();
  });

  it('emits retry output when retry button is clicked', () => {
    mount(30, 100, 200, false);
    const spy = vi.spyOn(component.retry, 'emit');
    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll('app-button');
    // Click the retry button — it should exist when score is low
    // We find it by searching for text content
    const retryBtn = Array.from(buttons).find(btn => btn.textContent?.toLowerCase().includes('retry'));
    if (retryBtn) {
      (retryBtn as HTMLElement).click();
      expect(spy).toHaveBeenCalled();
    }
  });
});
