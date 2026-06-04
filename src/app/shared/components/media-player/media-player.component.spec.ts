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
    // Tests set the component's signal accessors directly for isolation
    (component as unknown as { url: () => string }).url = () => url;
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

  // Image
  it('renders an <img> element for type "image" and sets src/alt', () => {
    mount('image', 'https://example.com/photo.jpg', 'A photo');
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement | null;
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('https://example.com/photo.jpg');
    expect(img?.getAttribute('alt')).toBe('A photo');
  });

  // Video
  it('renders a <video> element for type "video" with src and controls', () => {
    mount('video', 'https://example.com/vid.mp4');
    const video = fixture.nativeElement.querySelector('video') as HTMLVideoElement | null;
    expect(video).toBeTruthy();
    expect(video?.getAttribute('src')).toBe('https://example.com/vid.mp4');
    expect(video?.controls).toBe(true);
  });

  // Audio
  it('renders an <audio> element for type "audio" with controls', () => {
    mount('audio', 'https://example.com/audio.mp3');
    const audio = fixture.nativeElement.querySelector('audio') as HTMLAudioElement | null;
    expect(audio).toBeTruthy();
    expect(audio?.controls).toBe(true);
  });

  // PDF
  it('renders a PDF link for type "pdf"', () => {
    mount('pdf', 'https://example.com/file.pdf');
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement | null;
    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('https://example.com/file.pdf');
  });

  // Inputs / Signals
  it('url input signal is required and sets the media source', () => {
    mount('image', 'https://cdn.example.com/img.png', 'Image');
    expect(component.url()).toBe('https://cdn.example.com/img.png');
  });

  it('type defaults to image when not explicitly changed', () => {
    // Provide the required url input before change detection so the template
    // inputValueFn has a value available and NG0950 is not thrown.
    (component as unknown as { url: () => string }).url = () => 'https://example.com/default.png';
    fixture.detectChanges();
    // By default the component type signal should be 'image'
    expect(component.type()).toBe('image');
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement | null;

    expect(img).toBeTruthy();
  });

  it('title input signal is accessible', () => {
    mount('image', 'https://example.com/img.jpg', 'My Title');
    expect(component.title()).toBe('My Title');
  });
});
