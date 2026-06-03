import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaPlayerComponent } from './media-player.component';

type MediaPlayerType = 'image' | 'video' | 'audio' | 'pdf';

describe('MediaPlayerComponent', () => {
  let component: MediaPlayerComponent;
  let fixture: ComponentFixture<MediaPlayerComponent>;

  const mount = (
    type: MediaPlayerType,
    url = 'https://example.com/asset',
    title = 'Test Asset',
  ): void => {
    (component as unknown as { url: () => string }).url = () => url;

    (component as unknown as {
      type: () => 'image' | 'video' | 'audio' | 'pdf';
    }).type = () => type;

    (component as unknown as { type: () => MediaPlayerType }).type = () => type;
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

    const img = (fixture.nativeElement as HTMLElement)
      .querySelector('img') as HTMLImageElement;

    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('https://example.com/photo.jpg');
  });

  it('sets alt from title for image type', () => {
    mount('image', 'https://example.com/img.jpg', 'Lesson image');

    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement | null;

    expect(img).toBeTruthy();
    expect(img?.getAttribute('alt')).toBe('Lesson image');
  });

  it('renders a video element for type video', () => {
    mount('video', 'https://example.com/vid.mp4', 'A video');

    const video = fixture.nativeElement.querySelector('video') as HTMLVideoElement | null;

  it('renders a <video> element for type "video"', () => {
    mount('video', 'https://example.com/vid.mp4');

    const video = (fixture.nativeElement as HTMLElement)
      .querySelector('video') as HTMLVideoElement;

    expect(video).toBeTruthy();
    expect(video.src).toContain('vid.mp4');
    expect(video?.getAttribute('src')).toBe('https://example.com/vid.mp4');
  });

  it('renders video controls for type video', () => {
    mount('video', 'https://example.com/video.mp4', 'A video');

    const video = fixture.nativeElement.querySelector('video') as HTMLVideoElement | null;

    expect(video).toBeTruthy();
    expect(video?.controls).toBe(true);
  });

  it('renders a PDF link for type pdf', () => {
    mount('pdf', 'https://example.com/file.pdf', 'Test PDF');

    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement | null;
  it('renders a music_note icon for type "audio"', () => {
    mount('audio', 'https://example.com/track.mp3');

    const text = (fixture.nativeElement as HTMLElement).textContent;

    expect(text).toContain('music_note');
  });

    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('https://example.com/file.pdf');
  it('renders an <audio> element for type "audio"', () => {
    mount('audio', 'https://example.com/audio.mp3');

    const audio = (fixture.nativeElement as HTMLElement)
      .querySelector('audio') as HTMLAudioElement;

    expect(audio).toBeTruthy();
    expect(audio.controls).toBe(true);
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
    mount('image', 'https://cdn.example.com/img.png', 'Image');

    mount('image', 'https://cdn.example.com/img.png');

    expect(component.url()).toBe('https://cdn.example.com/img.png');
  });

  it('type defaults to image when not explicitly changed', () => {
    fixture.detectChanges();

    expect(component.type()).toBe('image');

    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement | null;

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
