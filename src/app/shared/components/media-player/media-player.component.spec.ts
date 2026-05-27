import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaPlayerComponent } from './media-player.component';

describe('MediaPlayerComponent', () => {
  let component: MediaPlayerComponent;
  let fixture: ComponentFixture<MediaPlayerComponent>;

  const mount = (
    type: 'image' | 'video' | 'pdf',
    url = 'https://example.com/asset',
    title = 'Test Asset'
  ) => {
    (component as unknown as { url: () => string }).url = () => url;

    (component as unknown as {
      type: () => 'image' | 'video' | 'pdf';
    }).type = () => type;

    (component as unknown as { title: () => string }).title = () => title;

    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaPlayerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaPlayerComponent);
    component = fixture.componentInstance;
  });

  it('creates without errors', () => {
    mount('image');
    expect(component).toBeTruthy();
  });

  // ─── Image ─────────────────────────────────────────────

  it('renders an <img> element for type "image"', () => {
    mount('image', 'https://example.com/photo.jpg', 'A photo');

    const img = (fixture.nativeElement as HTMLElement)
      .querySelector('img') as HTMLImageElement;

    expect(img).toBeTruthy();
    expect(img.src).toContain('photo.jpg');
  });

  it('sets [alt] from title for image type', () => {
    mount('image', 'https://example.com/img.jpg', 'Lesson image');

    const img = (fixture.nativeElement as HTMLElement)
      .querySelector('img') as HTMLImageElement;

    expect(img.alt).toBe('Lesson image');
  });

  // ─── Video ─────────────────────────────────────────────

  it('renders a <video> element for type "video"', () => {
    mount('video', 'https://example.com/vid.mp4');

    const video = (fixture.nativeElement as HTMLElement)
      .querySelector('video') as HTMLVideoElement;

    expect(video).toBeTruthy();
    expect(video.src).toContain('vid.mp4');
  });

  it('renders video controls for type "video"', () => {
    mount('video', 'https://example.com/video.mp4');

    const video = (fixture.nativeElement as HTMLElement)
      .querySelector('video') as HTMLVideoElement;

    expect(video.controls).toBe(true);
  });

  // ─── PDF ───────────────────────────────────────────────

  it('renders a PDF link for type "pdf"', () => {
    mount('pdf', 'https://example.com/file.pdf');

    const link = (fixture.nativeElement as HTMLElement)
      .querySelector('a') as HTMLAnchorElement;

    expect(link).toBeTruthy();
    expect(link.href).toContain('file.pdf');
  });

  // ─── Inputs ────────────────────────────────────────────

  it('url input signal is required and sets the media source', () => {
    mount('image', 'https://cdn.example.com/img.png');

    expect(component.url()).toBe('https://cdn.example.com/img.png');
  });

  it('type defaults to "image" when not explicitly set via signal override', () => {
    mount('image');

    const img = (fixture.nativeElement as HTMLElement)
      .querySelector('img');

    expect(img).toBeTruthy();
  });

  it('title input signal is accessible', () => {
    mount('image', 'https://example.com/img.jpg', 'My Title');

    expect(component.title()).toBe('My Title');
  });
});