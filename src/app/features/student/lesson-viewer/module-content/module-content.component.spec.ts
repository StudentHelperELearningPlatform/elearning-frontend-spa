import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModuleContentComponent } from './module-content.component';

describe('ModuleContentComponent', () => {
  let component: ModuleContentComponent;
  let fixture: ComponentFixture<ModuleContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModuleContentComponent);
    component = fixture.componentInstance;
  });

  const render = (content: string, loading = false) => {
    fixture.componentRef.setInput('content', content);
    fixture.componentRef.setInput('loading', loading);
    fixture.detectChanges();
  };

  it('creates without errors', () => {
    render('Hello');
    expect(component).toBeTruthy();
  });

  // ─── Content rendering ────────────────────────────────────────────────────

  it('renders a div with .prose class when not loading', () => {
    render('<p>Hello world</p>');
    const prose = (fixture.nativeElement as HTMLElement).querySelector('.prose');
    expect(prose).toBeTruthy();
  });

  it('renders HTML content correctly inside the prose div', () => {
    render('<p>Hello <strong>world</strong></p>');
    const strong = (fixture.nativeElement as HTMLElement).querySelector('strong');
    expect(strong?.textContent).toBe('world');
  });

  it('renders arbitrary HTML without throwing', () => {
    expect(() => render('<h2>Title</h2><ul><li>Item</li></ul>')).not.toThrow();
  });

  it('renders empty string without throwing', () => {
    expect(() => render('')).not.toThrow();
  });

  // ─── Loading state ────────────────────────────────────────────────────────

  it('shows app-skeleton elements when loading is true', () => {
    render('', true);
    const skeletons = (fixture.nativeElement as HTMLElement).querySelectorAll('app-skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('hides app-skeleton elements when loading is false', () => {
    render('<p>Content</p>', false);
    const skeletons = (fixture.nativeElement as HTMLElement).querySelectorAll('app-skeleton');
    expect(skeletons.length).toBe(0);
  });

  it('does not render .prose when loading is true', () => {
    render('', true);
    const prose = (fixture.nativeElement as HTMLElement).querySelector('.prose');
    expect(prose).toBeNull();
  });
});
