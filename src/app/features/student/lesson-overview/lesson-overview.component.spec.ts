import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonOverviewComponent } from './lesson-overview.component';
import { provideRouter } from '@angular/router';
import { LessonsStore } from '../store/lessons.store';
import { patchStore } from '../../../../test-utils/patch-store';
import { provideHttpClient } from '@angular/common/http';
import { provideApiMocks } from '../../../../test-utils/api-testing';

describe('LessonOverviewComponent', () => {
  let component: LessonOverviewComponent;
  let fixture: ComponentFixture<LessonOverviewComponent>;
  let lessonsStore: InstanceType<typeof LessonsStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonOverviewComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        ...provideApiMocks(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonOverviewComponent);
    component = fixture.componentInstance;
    lessonsStore = TestBed.inject(LessonsStore);
  });

  it('should create', () => {
    // Basic test to ensure it compiles and creates successfully
    expect(component).toBeTruthy();
  });

  it('should format getGlobalIndex correctly', () => {
    // Setup some dummy data in the store
    const mockLesson = {
      id: 'test-1',
      title: 'Test',
      subject: 'Math',
      grade: 1,
      difficulty: 'Easy',
      duration: '10m',
      status: 'Active',
      description: 'Desc',
      subcapitols: [
        {
          id: 'sub-1',
          title: 'Sub 1',
          blocks: [
            { id: 'm-1', title: 'M1', type: 'text', content: '' },
            { id: 'm-2', title: 'M2', type: 'video', content: '' }
          ]
        },
        {
          id: 'sub-2',
          title: 'Sub 2',
          blocks: [
            { id: 'm-3', title: 'M3', type: 'quiz', content: '' }
          ]
        }
      ],
      modules: []
    };
    patchStore(lessonsStore, { currentLesson: mockLesson });
    
    // M1 should be index 0
    expect(component.getGlobalIndex('sub-1', 'm-1')).toBe(0);
    // M2 should be index 1
    expect(component.getGlobalIndex('sub-1', 'm-2')).toBe(1);
    // M3 should be index 2
    expect(component.getGlobalIndex('sub-2', 'm-3')).toBe(2);
  });

  it('should return correct module icon', () => {
    expect(component.getModuleIcon('video')).toBe('play_circle');
    expect(component.getModuleIcon('quiz')).toBe('quiz');
    expect(component.getModuleIcon('text')).toBe('article');
    expect(component.getModuleIcon('interactive')).toBe('touch_app');
    expect(component.getModuleIcon('unknown')).toBe('menu_book');
  });
});
