import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentEditorComponent } from './content-editor.component';
import { ContentStore, ContentItem } from '../state/content.store';
import { provideRouter } from '@angular/router';
import { signal, WritableSignal } from '@angular/core';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('ContentEditorComponent', () => {
  let component: ContentEditorComponent;
  let fixture: ComponentFixture<ContentEditorComponent>;

  const mockLessons: ContentItem[] = [
    {
      id: 'lesson-1',
      title: 'Intro to Geometry',
      subject: 'Math',
      status: 'PUBLISHED',
      lastModified: new Date('2026-05-18'),
    },
    {
      id: 'lesson-2',
      title: 'Photosynthesis Basics',
      subject: 'Science',
      status: 'DRAFT',
      lastModified: new Date('2026-05-17'),
    },
  ];

  let mockContentStore: {
    lessons: WritableSignal<ContentItem[]>;
    loading: WritableSignal<boolean>;
    loadContent: ReturnType<typeof vi.fn>;
    deleteLesson: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockContentStore = {
      lessons: signal(mockLessons),
      loading: signal(false),
      loadContent: vi.fn(),
      deleteLesson: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ContentEditorComponent],
      providers: [
        provideRouter([]),
        { provide: ContentStore, useValue: mockContentStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentEditorComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates component successfully and loads content', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(mockContentStore.loadContent).toHaveBeenCalled();
  });

  it('defaults to grid viewMode and saves preference', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    
    fixture.detectChanges();
    expect(component.viewMode()).toBe('grid');
    
    component.setViewMode('list');
    expect(component.viewMode()).toBe('list');
    expect(setItemSpy).toHaveBeenCalledWith('teacher_lessons_view_mode', 'list');
  });

  it('initialises viewMode from localStorage if present', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('list');
    
    const customFixture = TestBed.createComponent(ContentEditorComponent);
    const customComponent = customFixture.componentInstance;
    
    expect(customComponent.viewMode()).toBe('list');
  });

  it('toggles viewMode to list and renders table correctly', () => {
    fixture.detectChanges();
    component.viewMode.set('list');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(component.viewMode()).toBe('list');
    expect(element.querySelector('table')).toBeTruthy();
    expect(element.textContent).toContain('Intro to Geometry');
    expect(element.textContent).toContain('Photosynthesis Basics');
  });

  it('calls deleteLesson when confirmed', () => {
    fixture.detectChanges();
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    component.deleteLesson('lesson-1');

    expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete this lesson?');
    expect(mockContentStore.deleteLesson).toHaveBeenCalledWith('lesson-1');
  });

  it('does not call deleteLesson when not confirmed', () => {
    fixture.detectChanges();
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);

    component.deleteLesson('lesson-1');

    expect(confirmSpy).toHaveBeenCalled();
    expect(mockContentStore.deleteLesson).not.toHaveBeenCalled();
  });

  it('defaults to ALL statusFilter and saves preference', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    
    fixture.detectChanges();
    expect(component.statusFilter()).toBe('ALL');
    
    component.setStatusFilter('PUBLISHED');
    expect(component.statusFilter()).toBe('PUBLISHED');
    expect(setItemSpy).toHaveBeenCalledWith('teacher_lessons_status_filter', 'PUBLISHED');
  });

  it('initialises statusFilter from localStorage if present', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('DRAFT');
    
    const customFixture = TestBed.createComponent(ContentEditorComponent);
    const customComponent = customFixture.componentInstance;
    
    expect(customComponent.statusFilter()).toBe('DRAFT');
  });

  it('filters lessons correctly based on statusFilter', () => {
    component.statusFilter.set('ALL');
    fixture.detectChanges();
    
    // Default 'ALL'
    expect(component.filteredLessons().length).toBe(2);
    expect(component.filteredLessons()[0].title).toBe('Intro to Geometry');
    expect(component.filteredLessons()[1].title).toBe('Photosynthesis Basics');

    // Filter 'PUBLISHED'
    component.setStatusFilter('PUBLISHED');
    expect(component.filteredLessons().length).toBe(1);
    expect(component.filteredLessons()[0].title).toBe('Intro to Geometry');

    // Filter 'DRAFT'
    component.setStatusFilter('DRAFT');
    expect(component.filteredLessons().length).toBe(1);
    expect(component.filteredLessons()[0].title).toBe('Photosynthesis Basics');
  });
});
