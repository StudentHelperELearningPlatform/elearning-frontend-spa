import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModuleContentComponent } from './module-content.component';

describe('ModuleContentComponent', () => {
  let component: ModuleContentComponent;
  let fixture: ComponentFixture<ModuleContentComponent>;

  const setContent = (content: string, loading = false) => {
    (component as unknown as { content: () => string }).content = () => content;
    (component as unknown as { loading: () => boolean }).loading = () => loading;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModuleContentComponent);
    component = fixture.componentInstance;
  });

  it('creates without errors', () => {
    setContent('Hello');
    expect(component).toBeTruthy();
  });

  it('renders HTML content via innerHTML binding', () => {
    setContent('<p>Hello <strong>world</strong></p>');
    const el = (fixture.nativeElement as HTMLElement).querySelector('[innerHTML]') as HTMLElement;
    expect(el).toBeTruthy();
    expect(el.querySelector('strong')?.textContent).toBe('world');
  });

  it('renders arbitrary HTML strings without throwing', () => {
    const html = '<h2>Title</h2><ul><li>Item</li></ul>';
    expect(() => setContent(html)).not.toThrow();
  });

  it('renders empty string without throwing', () => {
    expect(() => setContent('')).not.toThrow();
  });

  it('shows skeleton when loading is true', () => {
    setContent('', true);
    const skeleton = (fixture.nativeElement as HTMLElement).querySelector('app-skeleton');
    expect(skeleton).toBeTruthy();
  });

  it('hides skeleton when loading is false', () => {
    setContent('<p>Content here</p>', false);
    const skeleton = (fixture.nativeElement as HTMLElement).querySelector('app-skeleton');
    expect(skeleton).toBeNull();
  });
});
