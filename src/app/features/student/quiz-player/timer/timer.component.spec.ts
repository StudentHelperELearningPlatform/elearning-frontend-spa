import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  const setSecondsRemaining = (value: number | null) => {
    (component as unknown as { secondsRemaining: () => number | null }).secondsRemaining = () => value;
    if (value !== null) {
      component.startTimer(value);
    }
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
  });

  it('displays mm:ss format for secondsRemaining = 125', () => {
    setSecondsRemaining(125);

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('02:05');
  });

  it('renders nothing when secondsRemaining is null', () => {
    setSecondsRemaining(null);

    const text = (fixture.nativeElement as HTMLElement).textContent?.trim() ?? '';
    expect(text).toBe('');
  });

  it('applies warning class at 250 seconds', () => {
    setSecondsRemaining(250);

    const timerChip = (fixture.nativeElement as HTMLElement).querySelector('.timer-chip');
    expect(timerChip?.classList.contains('warning')).toBe(true);
  });

  it('applies danger class at 45 seconds', () => {
    setSecondsRemaining(45);

    const timerChip = (fixture.nativeElement as HTMLElement).querySelector('.timer-chip');
    expect(timerChip?.classList.contains('danger')).toBe(true);
  });
});
