import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LearningPathComponent } from './learning-path.component';

describe('LearningPathComponent', () => {
  let component: LearningPathComponent;
  let fixture: ComponentFixture<LearningPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningPathComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'path-1' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LearningPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ─── Renders ──────────────────────────────────────────────────────────────

  it('creates without errors', () => {
    expect(component).toBeTruthy();
  });

  it('displays the path title', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain(component.pathTitle());
  });

  it('renders a node card for each lesson in the path', () => {
    const nodeCount = component.nodes().length;
    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll('app-card');
    expect(cards.length).toBe(nodeCount);
  });

  // ─── completedCount ───────────────────────────────────────────────────────

  it('completedCount returns count of COMPLETED nodes', () => {
    const expected = component.nodes().filter(n => n.status === 'COMPLETED').length;
    expect(component.completedCount()).toBe(expected);
  });

  it('completedCount is 0 when all nodes are locked', () => {
    component.nodes.set(component.nodes().map(n => ({ ...n, status: 'LOCKED' as const })));
    expect(component.completedCount()).toBe(0);
  });

  it('completedCount equals total when all nodes are completed', () => {
    component.nodes.set(component.nodes().map(n => ({ ...n, status: 'COMPLETED' as const })));
    expect(component.completedCount()).toBe(component.nodes().length);
  });

  // ─── overallProgress ─────────────────────────────────────────────────────

  it('overallProgress is between 0 and 100', () => {
    const progress = component.overallProgress();
    expect(progress).toBeGreaterThanOrEqual(0);
    expect(progress).toBeLessThanOrEqual(100);
  });

  it('overallProgress is 0 when no nodes are completed', () => {
    component.nodes.set(component.nodes().map(n => ({ ...n, status: 'LOCKED' as const })));
    expect(component.overallProgress()).toBe(0);
  });

  it('overallProgress is 100 when all nodes are completed', () => {
    component.nodes.set(component.nodes().map(n => ({ ...n, status: 'COMPLETED' as const })));
    expect(component.overallProgress()).toBe(100);
  });

  it('overallProgress reflects partial completion correctly', () => {
    const total = 4;
    const completed = 2;
    component.nodes.set([
      { id: '1', title: 'L1', status: 'COMPLETED', thumbnail: '' },
      { id: '2', title: 'L2', status: 'COMPLETED', thumbnail: '' },
      { id: '3', title: 'L3', status: 'AVAILABLE', thumbnail: '' },
      { id: '4', title: 'L4', status: 'LOCKED', thumbnail: '', prerequisite: 'L3' },
    ]);
    expect(component.overallProgress()).toBe((completed / total) * 100);
  });

  // ─── Node status rendering ────────────────────────────────────────────────

  it('renders a lock icon for LOCKED nodes', () => {
    // Ensure at least one locked node exists
    component.nodes.set([
      ...component.nodes(),
      { id: 'locked-test', title: 'Locked Lesson', status: 'LOCKED', thumbnail: '', prerequisite: 'Previous' },
    ]);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('lock');
  });

  it('renders a check_circle icon for COMPLETED nodes', () => {
    component.nodes.set([
      { id: 'done-1', title: 'Done Lesson', status: 'COMPLETED', thumbnail: '', score: 90 },
    ]);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('check_circle');
  });

  it('renders Start button for AVAILABLE nodes', () => {
    component.nodes.set([
      { id: 'avail-1', title: 'Available Lesson', status: 'AVAILABLE', thumbnail: '' },
    ]);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Start');
  });

  it('renders Review button for COMPLETED nodes', () => {
    component.nodes.set([
      { id: 'done-2', title: 'Done Lesson', status: 'COMPLETED', thumbnail: '', score: 75 },
    ]);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Review');
  });

  it('does not render a Start or Review button for LOCKED nodes', () => {
    component.nodes.set([
      { id: 'locked-only', title: 'Locked Only', status: 'LOCKED', thumbnail: '', prerequisite: 'Prev' },
    ]);
    fixture.detectChanges();
    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll('app-button');
    expect(buttons.length).toBe(0);
  });

  // ─── Progress bar ─────────────────────────────────────────────────────────

  it('progress bar width reflects overallProgress()', () => {
    const progressEl = (fixture.nativeElement as HTMLElement).querySelector('[style*="width"]') as HTMLElement;
    expect(progressEl).toBeTruthy();
  });
});
