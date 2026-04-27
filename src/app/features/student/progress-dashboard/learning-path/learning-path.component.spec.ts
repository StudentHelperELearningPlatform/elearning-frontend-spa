import { ComponentFixture, TestBed } from '@angular/core/testing';
import { patchStore } from '../../../../../test-utils/patch-store';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LearningPathComponent } from './learning-path.component';
import { LearningPathsStore } from '../../store/learning-paths.store';
import { LearningPath } from '@shared/models/learning-path.model';

const MOCK_PATH: LearningPath = {
  id: 'path-1',
  title: 'Math Mastery',
  description: 'Learn maths step by step.',
  totalLessons: 5,
  estimatedTotalTime: '2 hours',
  lessons: [
    {
      id: '1',
      title: 'Fractions Intro',
      subject: 'Math',
      duration: '20 min',
      status: 'COMPLETED',
      score: 95,
    },
    {
      id: '2',
      title: 'Adding Fractions',
      subject: 'Math',
      duration: '20 min',
      status: 'COMPLETED',
      score: 88,
    },
    {
      id: '3',
      title: 'Multiplying Fractions',
      subject: 'Math',
      duration: '20 min',
      status: 'AVAILABLE',
    },
    {
      id: '4',
      title: 'Dividing Fractions',
      subject: 'Math',
      duration: '25 min',
      status: 'LOCKED',
      prerequisiteTitle: 'Multiplying Fractions',
    },
    {
      id: '5',
      title: 'Fraction Word Problems',
      subject: 'Math',
      duration: '30 min',
      status: 'LOCKED',
      prerequisiteTitle: 'Dividing Fractions',
    },
  ],
};

describe('LearningPathComponent', () => {
  let component: LearningPathComponent;
  let fixture: ComponentFixture<LearningPathComponent>;
  let store: InstanceType<typeof LearningPathsStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningPathComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'path-1' } } },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(LearningPathsStore);

    // Pre-load path so tests don't depend on HTTP
    patchStore(store, { currentPath: MOCK_PATH, loading: false, error: null });

    fixture = TestBed.createComponent(LearningPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => vi.restoreAllMocks());

  // ─── Renders ──────────────────────────────────────────────────────────────

  it('creates without errors', () => {
    expect(component).toBeTruthy();
  });

  it('displays the path title', () => {
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Math Mastery');
  });

  it('renders a card for each lesson', () => {
    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll('app-card');
    expect(cards.length).toBe(MOCK_PATH.lessons.length);
  });

  it('shows lesson count text', () => {
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('5 lessons');
  });

  // ─── Loading skeleton ─────────────────────────────────────────────────────

  it('shows skeleton when loading is true', () => {
    patchStore(store, { loading: true, currentPath: null });
    fixture.detectChanges();
    const busy = (fixture.nativeElement as HTMLElement).querySelector('[aria-busy="true"]');
    expect(busy).toBeTruthy();
  });

  it('hides skeleton when loading is false', () => {
    patchStore(store, { loading: false });
    fixture.detectChanges();
    const busy = (fixture.nativeElement as HTMLElement).querySelector('[aria-busy="true"]');
    expect(busy).toBeNull();
  });

  // ─── Error state ─────────────────────────────────────────────────────────

  it('shows error state when store.error is set', () => {
    patchStore(store, { error: 'Network error', currentPath: null, loading: false });
    fixture.detectChanges();
    const errorEl = (fixture.nativeElement as HTMLElement).querySelector('app-error-state');
    expect(errorEl).toBeTruthy();
  });

  // ─── Empty state ──────────────────────────────────────────────────────────

  it('shows empty state when path has no lessons', () => {
    patchStore(store, { currentPath: { ...MOCK_PATH, lessons: [] }, loading: false, error: null });
    fixture.detectChanges();
    const empty = (fixture.nativeElement as HTMLElement).querySelector('app-empty-state');
    expect(empty).toBeTruthy();
  });

  // ─── Node status rendering ────────────────────────────────────────────────

  it('renders a lock icon for LOCKED lessons', () => {
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('lock');
  });

  it('renders a check_circle icon for COMPLETED lessons', () => {
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('check_circle');
  });

  it('renders a Start button for AVAILABLE lessons', () => {
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Start');
  });

  it('renders a Review button for COMPLETED lessons', () => {
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Review');
  });

  it('does not render Start/Review buttons for LOCKED lessons only', () => {
    patchStore(store, {
      currentPath: { ...MOCK_PATH, lessons: [MOCK_PATH.lessons[3]] }, // one LOCKED lesson
    });
    fixture.detectChanges();
    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll('app-button');
    expect(buttons.length).toBe(0);
  });

  // ─── Progress bar ─────────────────────────────────────────────────────────

  it('renders a progressbar element', () => {
    const bar = (fixture.nativeElement as HTMLElement).querySelector('[role="progressbar"]');
    expect(bar).toBeTruthy();
  });

  it('progress bar aria-valuenow matches store.progressPercent()', () => {
    const bar = (fixture.nativeElement as HTMLElement).querySelector(
      '[role="progressbar"]',
    ) as HTMLElement;
    expect(bar.getAttribute('aria-valuenow')).toBe(String(store.progressPercent()));
  });

  // ─── Continue Learning button ─────────────────────────────────────────────

  it('shows Continue Learning button when there is an available lesson', () => {
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Continue Learning');
  });

  it('does not show Continue Learning button when no available lesson exists', () => {
    const allDone = {
      ...MOCK_PATH,
      lessons: MOCK_PATH.lessons.map((l) => ({ ...l, status: 'COMPLETED' as const })),
    };
    patchStore(store, { currentPath: allDone });
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).not.toContain('Continue Learning');
  });

  // ─── ngOnInit ────────────────────────────────────────────────────────────

  it('calls store.loadPath with the route id on init', () => {
    const spy = vi.spyOn(store, 'loadPath').mockImplementation(() => undefined);
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith('path-1');
  });

  // ─── reload ──────────────────────────────────────────────────────────────

  it('reload calls store.loadPath again', () => {
    const spy = vi.spyOn(store, 'loadPath').mockImplementation(() => undefined);
    component.reload();
    expect(spy).toHaveBeenCalledWith('path-1');
  });

  // ─── cardClass ───────────────────────────────────────────────────────────

  it('cardClass returns opacity/grayscale for LOCKED lessons', () => {
    const cls = component.cardClass(MOCK_PATH.lessons[3]); // LOCKED
    expect(cls).toContain('opacity-60');
    expect(cls).toContain('grayscale');
  });

  it('cardClass returns teal border class for COMPLETED lessons', () => {
    const cls = component.cardClass(MOCK_PATH.lessons[0]); // COMPLETED
    expect(cls).toContain('border-[#0ABAB5]');
  });

  it('cardClass returns empty string for AVAILABLE lessons', () => {
    expect(component.cardClass(MOCK_PATH.lessons[2])).toBe(''); // AVAILABLE
  });

  // ─── Prerequisite tooltip text ────────────────────────────────────────────

  it('shows prerequisite text for locked lessons', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Multiplying Fractions');
  });
});
