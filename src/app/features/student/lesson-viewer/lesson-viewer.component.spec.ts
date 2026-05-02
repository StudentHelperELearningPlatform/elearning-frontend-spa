import { ComponentFixture, TestBed } from '@angular/core/testing';
import { patchStore } from '../../../../test-utils/patch-store';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { LessonViewerComponent } from './lesson-viewer.component';
import { LessonsStore, Lesson } from '../store/lessons.store';

const MOCK_LESSON: Lesson = {
  id: '1',
  title: 'Intro to Fractions',
  subject: 'Math',
  grade: 5,
  difficulty: 'Easy',
  duration: '15 min',
  status: 'Not Started',
  subcapitols: [
    {
      id: 'sc1',
      title: 'Part 1',
      blocks: [
        { id: 'm1', title: 'Block 1', blockType: 'TEXT', content: '<p>Hello world</p>' },
        {
          id: 'm2',
          title: 'Block 2',
          blockType: 'VIDEO',
          content: 'Video content',
          mediaUrl: 'https://example.com/vid.mp4',
        },
      ],
    },
    {
      id: 'sc2',
      title: 'Part 2',
      blocks: [
        { id: 'm3', title: 'Block 3', blockType: 'TEXT', content: '<p>Last block</p>' },
      ],
    },
  ],
};

// Flattened blocks for assertions (mirrors what allBlocks() returns)
const ALL_BLOCKS = MOCK_LESSON.subcapitols.flatMap(sc => sc.blocks);

describe('LessonViewerComponent', () => {
  let component: LessonViewerComponent;
  let fixture: ComponentFixture<LessonViewerComponent>;
  let store: InstanceType<typeof LessonsStore>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonViewerComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(LessonsStore);
    router = TestBed.inject(Router);

    patchStore(store, { currentLesson: MOCK_LESSON, loading: false });

    fixture = TestBed.createComponent(LessonViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ─── Renders ─────────────────────────────────────────────────────────────

  it('creates without errors', () => {
    expect(component).toBeTruthy();
  });

  it('displays the lesson title in the sidebar header', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Intro to Fractions');
  });

  // ─── allBlocks ────────────────────────────────────────────────────────────

  it('allBlocks flattens all subcapitol blocks in order', () => {
    expect(component.allBlocks()).toEqual(ALL_BLOCKS);
    expect(component.allBlocks().length).toBe(3);
  });

  // ─── currentModule computed ───────────────────────────────────────────────

  it('currentModule returns the first block by default', () => {
    expect(component.currentModule()).toEqual(ALL_BLOCKS[0]);
  });

  it('currentModule returns null when lesson has no subcapitols', () => {
    patchStore(store, { currentLesson: { ...MOCK_LESSON, subcapitols: [] } });
    expect(component.currentModule()).toBeNull();
  });

  // ─── selectModule ─────────────────────────────────────────────────────────

  it('selectModule updates currentModuleIndex', () => {
    component.selectModule(2);
    expect(component.currentModuleIndex()).toBe(2);
  });

  it('selectModule changes currentModule reference', () => {
    component.selectModule(1);
    expect(component.currentModule()?.id).toBe('m2');
  });

  // ─── nextModule / previousModule ──────────────────────────────────────────

  it('nextModule advances the index by 1', () => {
    component.selectModule(0);
    component.nextModule();
    expect(component.currentModuleIndex()).toBe(1);
  });

  it('nextModule does not advance past the last block', () => {
    component.selectModule(ALL_BLOCKS.length - 1);
    component.nextModule();
    expect(component.currentModuleIndex()).toBe(ALL_BLOCKS.length - 1);
  });

  it('previousModule decrements the index by 1', () => {
    component.selectModule(2);
    component.previousModule();
    expect(component.currentModuleIndex()).toBe(1);
  });

  it('previousModule does not go below 0', () => {
    component.selectModule(0);
    component.previousModule();
    expect(component.currentModuleIndex()).toBe(0);
  });

  // ─── Navigation helpers ────────────────────────────────────────────────────

  it('goBack navigates to /student/lessons', () => {
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.goBack();
    expect(spy).toHaveBeenCalledWith(['/student/lessons']);
  });

  it('finishLesson navigates to /student/lessons', () => {
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.finishLesson();
    expect(spy).toHaveBeenCalledWith(['/student/lessons']);
  });

  // ─── getModuleIcon ────────────────────────────────────────────────────────

  it.each([
    ['VIDEO', 'play_circle'],
    ['TEXT', 'article'],
    ['QUIZ', 'quiz'],
    ['INTERACTIVE', 'touch_app'],
    ['AUDIO', 'headphones'],
    ['IMAGE', 'menu_book'],
    ['unknown', 'menu_book'],
  ])('getModuleIcon("%s") returns "%s"', (blockType, expected) => {
    expect(component.getModuleIcon(blockType)).toBe(expected);
  });

  // ─── Loading skeleton ─────────────────────────────────────────────────────

  it('shows animate-pulse skeleton when loading is true', () => {
    patchStore(store, { loading: true });
    fixture.detectChanges();
    const skeleton = (fixture.nativeElement as HTMLElement).querySelector('.animate-pulse');
    expect(skeleton).toBeTruthy();
  });

  // ─── ngOnInit ─────────────────────────────────────────────────────────────

  it('calls store.loadLesson with the route id on init', () => {
    const spy = vi.spyOn(store, 'loadLesson');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith('1');
  });
});
