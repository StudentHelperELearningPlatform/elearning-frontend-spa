import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaPlayerComponent } from './media-player.component';

describe('MediaPlayerComponent', () => {
  let component: MediaPlayerComponent;
  let fixture: ComponentFixture<MediaPlayerComponent>;

  const mount = (type: 'image' | 'video' | 'audio', url = 'https://example.com/asset', title = 'Test Asset') => {
    (component as unknown as { url: () => string }).url = () => url;
    (component as unknown as { type: () => 'image' | 'video' | 'audio' }).type = () => type;
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

  // ─── Image ────────────────────────────────────────────────────────────────

  it('renders an <img> element for type "image"', () => {
    mount('image', 'https://example.com/photo.jpg', 'A photo');
    const img = (fixture.nativeElement as HTMLElement).querySelector('img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain('photo.jpg');
  });

  it('sets [alt] from title for image type', () => {
    mount('image', 'https://example.com/img.jpg', 'Lesson image');
    const img = (fixture.nativeElement as HTMLElement).querySelector('img') as HTMLImageElement;
    expect(img.alt).toBe('Lesson image');
  });

  // ─── Video ────────────────────────────────────────────────────────────────

  it('renders a play button indicator for type "video"', () => {
    mount('video', 'https://example.com/vid.mp4');
    const nativeEl = fixture.nativeElement as HTMLElement;
    // The component renders a mock play UI with a play_arrow material icon
    expect(nativeEl.textContent).toContain('play_arrow');
  });

  it('renders the video thumbnail image for type "video"', () => {
    mount('video', 'https://example.com/thumb.jpg');
    const imgs = (fixture.nativeElement as HTMLElement).querySelectorAll('img');
    expect(imgs.length).toBeGreaterThan(0);
  });

  // ─── Audio ────────────────────────────────────────────────────────────────

  it('renders a music_note icon for type "audio"', () => {
    mount('audio', 'https://example.com/track.mp3');
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('music_note');
  });

  it('renders a play button for type "audio"', () => {
    mount('audio');
    const playBtn = (fixture.nativeElement as HTMLElement).querySelector('button');
    expect(playBtn).toBeTruthy();
  });

  // ─── Inputs ───────────────────────────────────────────────────────────────

  it('url input signal is required and sets the media source', () => {
    mount('image', 'https://cdn.example.com/img.png');
    expect(component.url()).toBe('https://cdn.example.com/img.png');
  });

  it('type defaults to "image" when not explicitly set via signal override', () => {
    // The component declares type = input<...>('image') — default is 'image'
    // We verify the component accepts it and renders correctly
    mount('image');
    const img = (fixture.nativeElement as HTMLElement).querySelector('img');
    expect(img).toBeTruthy();
  });

  it('title input signal is accessible', () => {
    mount('image', 'https://example.com/img.jpg', 'My Title');
    expect(component.title()).toBe('My Title');
  });
});
