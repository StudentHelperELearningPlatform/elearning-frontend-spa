import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaPlayerComponent } from './media-player.component';

describe('MediaPlayerComponent', () => {
  let component: MediaPlayerComponent;
  let fixture: ComponentFixture<MediaPlayerComponent>;

  const mount = (
    type: 'image' | 'video' | 'pdf',
    url = 'https://example.com/asset',
    title = 'Test Asset',
  ): void => {
    fixture.componentRef.setInput('url', url);
    fixture.componentRef.setInput('type', type);
    fixture.componentRef.setInput('title', title);

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

  it('renders an image for type image', () => {
    mount('image', 'https://example.com/photo.jpg', 'A photo');

    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement | null;

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

    expect(video).toBeTruthy();
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

    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('https://example.com/file.pdf');
  });

  it('url input signal is required and sets the media source', () => {
    mount('image', 'https://cdn.example.com/img.png', 'Image');

    expect(component.url()).toBe('https://cdn.example.com/img.png');
  });

  it('type defaults to image when not explicitly changed', () => {
    fixture.componentRef.setInput('url', 'https://example.com/default.png');
    fixture.componentRef.setInput('title', 'Default image');

    fixture.detectChanges();

    expect(component.type()).toBe('image');

    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement | null;

    expect(img).toBeTruthy();
  });

  it('title input signal is accessible', () => {
    mount('image', 'https://example.com/img.jpg', 'My Title');

    expect(component.title()).toBe('My Title');
  });
});