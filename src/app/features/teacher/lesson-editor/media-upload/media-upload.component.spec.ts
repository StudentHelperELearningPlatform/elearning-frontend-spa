import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaUploadComponent, UploadedMedia } from './media-upload.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpEventType } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

// Mock environment assuming standard structure. Adjust path if necessary.
import { environment } from '../../../../../environments/environment';

describe('MediaUploadComponent', () => {
  let component: MediaUploadComponent;
  let fixture: ComponentFixture<MediaUploadComponent>;
  let httpTestingController: HttpTestingController;

  // Helper to create mock files with specific sizes
  const createMockFile = (name: string, type: string, sizeBytes: number): File => {
    const file = new File([''], name, { type });
    Object.defineProperty(file, 'size', { value: sizeBytes });
    return file;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaUploadComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      // Ignore child components like app-media-player to isolate this test
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaUploadComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);

    // Mock Browser APIs
    globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    globalThis.crypto.randomUUID = vi.fn(() => 'mock-uuid-1234') as unknown as typeof crypto.randomUUID;

    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    httpTestingController.verify();
  });

  it('should create the component successfully', () => {
    expect(component).toBeTruthy();
  });

  describe('Drag & Drop / Input Event Handlers', () => {
    it('should set isDragging to true on dragover', () => {
      const event = new Event('dragover') as DragEvent;
      event.preventDefault = vi.fn();
      event.stopPropagation = vi.fn();
      
      component.onDragOver(event);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(component.isDragging()).toBe(true);
    });

    it('should set isDragging to false on dragleave', () => {
      const event = new Event('dragleave') as DragEvent;
      event.preventDefault = vi.fn();
      event.stopPropagation = vi.fn();
      component.isDragging.set(true); 
      
      component.onDragLeave(event);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(component.isDragging()).toBe(false);
    });

    it('should handle onDrop, extract files, and reset dragging state', () => {
      const file = createMockFile('test.png', 'image/png', 1024);
      const event = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        dataTransfer: { files: [file] }
      } as unknown as DragEvent;
      const handleSpy = vi.spyOn(component, 'handleFiles').mockImplementation(() => undefined);

      component.onDrop(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(component.isDragging()).toBe(false);
      expect(handleSpy).toHaveBeenCalledWith([file]);
    });

    it('should safely ignore onDrop if no files are present', () => {
      const event = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        dataTransfer: null
      } as unknown as DragEvent;
      const handleSpy = vi.spyOn(component, 'handleFiles');

      component.onDrop(event);
      expect(handleSpy).not.toHaveBeenCalled();
    });

    it('should handle onFileSelected from HTML input and reset value', () => {
      const file = createMockFile('test.png', 'image/png', 1024);
      const event = {
        target: { files: [file], value: 'C:\\fakepath\\test.png' }
      } as unknown as Event;
      const handleSpy = vi.spyOn(component, 'handleFiles').mockImplementation(() => undefined);

      component.onFileSelected(event);

      expect(handleSpy).toHaveBeenCalledWith([file]);
      expect((event.target as HTMLInputElement).value).toBe('');
    });
  });

  describe('File Validation (handleFiles)', () => {
    it('should accept valid files and trigger upload', () => {
      const validFile = createMockFile('test.pdf', 'application/pdf', 1024);
      const uploadSpy = vi.spyOn(component, 'uploadFile').mockImplementation(() => undefined);

      component.handleFiles([validFile]);

      expect(component.errorMessage()).toBeNull();
      expect(uploadSpy).toHaveBeenCalledWith(validFile);
    });

    it('should reject files exceeding 50MB and set error/a11y message', () => {
      const uploadSpy = vi.spyOn(component, 'uploadFile').mockImplementation(() => undefined);
      const massiveFile = createMockFile('huge.mp4', 'video/mp4', 51 * 1024 * 1024); // 51MB

      component.handleFiles([massiveFile]);

      expect(uploadSpy).not.toHaveBeenCalled();
      expect(component.errorMessage()).toContain('File too large: huge.mp4');
      expect(component.a11yMessage()).toContain('Some files failed to upload');
    });

    it('should reject invalid MIME types', () => {
      const uploadSpy = vi.spyOn(component, 'uploadFile').mockImplementation(() => undefined);
      const invalidAudio = createMockFile('song.mp3', 'audio/mpeg', 1024);

      component.handleFiles([invalidAudio]);

      expect(uploadSpy).not.toHaveBeenCalled();
      expect(component.errorMessage()).toContain('Invalid file type: song.mp3');
    });

    it('should process mixed valid and invalid files simultaneously', () => {
      const validFile = createMockFile('good.png', 'image/png', 1024);
      const invalidFile = createMockFile('bad.txt', 'text/plain', 1024);
      const uploadSpy = vi.spyOn(component, 'uploadFile').mockImplementation(() => undefined);

      component.handleFiles([validFile, invalidFile]);

      // Should upload the valid one
      expect(uploadSpy).toHaveBeenCalledWith(validFile);
      // Should flag the invalid one
      expect(component.errorMessage()).toContain('Invalid file type: bad.txt');
    });
  });

  describe('Network Upload Logic (uploadFile)', () => {
    it('should handle successful upload lifecycle and update progress', () => {
      const file = createMockFile('test.png', 'image/png', 1024);
      
      component.uploadFile(file);

      // 1. Check Initial State
      expect(component.mediaList().length).toBe(1);
      expect(component.mediaList()[0].status).toBe('uploading');
      expect(component.mediaList()[0].id).toBe('mock-uuid-1234');
      expect(component.mediaList()[0].type).toBe('image');

      // 2. Intercept HTTP Request
      const req = httpTestingController.expectOne(`${environment.lessonApiUrl}/api/v1/media/upload`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body instanceof FormData).toBeTruthy();

      // 3. Simulate Progress Event
      req.event({
        type: HttpEventType.UploadProgress,
        loaded: 50,
        total: 100
      });
      expect(component.mediaList()[0].progress).toBe(50);

      // 4. Simulate Success Response
      req.flush({ url: 'https://cdn.example.com/mock-uuid-1234.png' });

      // 5. Check Final State
      const finalizedMedia = component.mediaList()[0];
      expect(finalizedMedia.status).toBe('complete');
      expect(finalizedMedia.progress).toBe(100);
      expect(finalizedMedia.url).toBe('https://cdn.example.com/mock-uuid-1234.png');
      expect(component.a11yMessage()).toContain('Upload complete: test.png');
    });

    it('should fallback to local ObjectURL if response body has no url', () => {
      const file = createMockFile('test.png', 'image/png', 1024);
      component.uploadFile(file);

      const req = httpTestingController.expectOne(`${environment.lessonApiUrl}/api/v1/media/upload`);
      req.flush({}); // Empty body

      expect(component.mediaList()[0].url).toBe('blob:mock-url');
    });

    it('should handle network error gracefully', () => {
      const file = createMockFile('test.png', 'image/png', 1024);
      component.uploadFile(file);

      const req = httpTestingController.expectOne(`${environment.lessonApiUrl}/api/v1/media/upload`);
      
      // Simulate network crash
      req.error(new ProgressEvent('Network error'));

      expect(component.mediaList()[0].status).toBe('error');
      expect(component.a11yMessage()).toContain('Upload failed for test.png');
    });
  });

  describe('Retry & Remove Operations', () => {
    it('should retry a failed upload using existing ID and File', () => {
      // Setup: Seed a failed media item
      const failedFile = createMockFile('retry.png', 'image/png', 1024);
      component.mediaList.set([{
        id: 'retry-123', url: '', name: 'retry.png', type: 'image', 
        progress: 0, status: 'error', file: failedFile
      }]);

      component.retryUpload('retry-123');

      // State should reset to uploading
      expect(component.mediaList()[0].status).toBe('uploading');

      // Request should fire again
      const req = httpTestingController.expectOne(`${environment.lessonApiUrl}/api/v1/media/upload`);
      req.flush({ url: 'success.png' });

      expect(component.mediaList()[0].status).toBe('complete');
    });

    it('should safely ignore retry if media id does not exist', () => {
      component.retryUpload('ghost-id');
      httpTestingController.expectNone(`${environment.lessonApiUrl}/api/v1/media/upload`);
    });

    it('should remove media when confirmed', () => {
      const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
      component.mediaList.set([
        { id: 'remove-me', url: '', name: 'test.png', type: 'image', progress: 100, status: 'complete' }
      ]);

      component.removeMedia('remove-me');

      expect(confirmSpy).toHaveBeenCalled();
      expect(component.mediaList().length).toBe(0);
      expect(component.a11yMessage()).toBe('Media removed');
    });

    it('should abort removal when cancelled', () => {
      const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);
      component.mediaList.set([
        { id: 'keep-me', url: '', name: 'test.png', type: 'image', progress: 100, status: 'complete' }
      ]);

      component.removeMedia('keep-me');

      expect(confirmSpy).toHaveBeenCalled();
      expect(component.mediaList().length).toBe(1); // Still there
    });
  });

  describe('Drag and Drop Reordering', () => {
    it('should reorder media list correctly using cdkDropListDropped', () => {
      component.mediaList.set([
        { id: 'id-1', url: '', name: '1.png', type: 'image', progress: 100, status: 'complete' },
        { id: 'id-2', url: '', name: '2.png', type: 'image', progress: 100, status: 'complete' },
        { id: 'id-3', url: '', name: '3.png', type: 'image', progress: 100, status: 'complete' }
      ]);

      const event = {
        previousIndex: 0,
        currentIndex: 2
      } as CdkDragDrop<UploadedMedia[]>;

      component.dropMediaList(event);

      const list = component.mediaList();
      // 'id-1' should have moved from index 0 to index 2
      expect(list[0].id).toBe('id-2');
      expect(list[1].id).toBe('id-3');
      expect(list[2].id).toBe('id-1');
    });
  });
});