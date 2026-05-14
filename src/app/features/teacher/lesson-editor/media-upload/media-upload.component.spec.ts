import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MediaUploadComponent, UploadedMedia } from './media-upload.component';
import { vi } from 'vitest';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

describe('MediaUploadComponent', () => {
  let component: MediaUploadComponent;
  let fixture: ComponentFixture<MediaUploadComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaUploadComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaUploadComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Drag & Drop / File Selection Handlers', () => {
    it('should handle onDragOver', () => {
      const event = new Event('dragover') as DragEvent;
      event.preventDefault = vi.fn();
      event.stopPropagation = vi.fn();
      
      component.onDragOver(event);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(component.isDragging()).toBe(true);
    });

    it('should handle onDragLeave', () => {
      const event = new Event('dragleave') as DragEvent;
      event.preventDefault = vi.fn();
      event.stopPropagation = vi.fn();
      component.isDragging.set(true); 
      
      component.onDragLeave(event);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(component.isDragging()).toBe(false);
    });

    it('should handle onDrop with files', () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
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

    it('should handle onFileSelected', () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      const event = {
        target: { files: [file], value: 'fakepath' }
      } as unknown as Event;
      const handleSpy = vi.spyOn(component, 'handleFiles').mockImplementation(() => undefined);

      component.onFileSelected(event);

      expect(handleSpy).toHaveBeenCalledWith([file]);
      expect((event.target as HTMLInputElement).value).toBe('');
    });
  });

  describe('File Validation', () => {
    it('should reject files larger than 50MB', () => {
      const uploadSpy = vi.spyOn(component, 'uploadFile').mockImplementation(() => undefined);
      const largeFile = new File([''], 'huge-video.mp4', { type: 'video/mp4' });
      Object.defineProperty(largeFile, 'size', { value: 51 * 1024 * 1024 });

      component.handleFiles([largeFile]);

      expect(component.errorMessage()).toContain('Maximum size is 50MB');
      expect(uploadSpy).not.toHaveBeenCalled();
    });

    it('should reject invalid file types', () => {
      const uploadSpy = vi.spyOn(component, 'uploadFile').mockImplementation(() => undefined);
      const invalidFile = new File([''], 'document.pdf', { type: 'application/pdf' });

      component.handleFiles([invalidFile]);

      expect(component.errorMessage()).toContain('Only images, videos, and audio are allowed');
      expect(uploadSpy).not.toHaveBeenCalled();
    });
  });

  describe('uploadFile (Network & Progress)', () => {
    beforeEach(() => {
      globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
      globalThis.crypto.randomUUID = vi.fn(() => '12345678-1234-1234-1234-1234567890ab') as unknown as typeof crypto.randomUUID;
    });

    it('should successfully upload a file via HttpClient and update progress', () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      
      component.uploadFile(file);

      // Verify it was added to the list as uploading
      expect(component.mediaList().length).toBe(1);
      expect(component.mediaList()[0].status).toBe('uploading');

      // Expect the correct endpoint to be called
      const req = httpTestingController.expectOne(`${environment.lessonApiUrl}/api/v1/media/upload`);
      expect(req.request.method).toBe('POST');

      // Simulate a progress event (e.g., 50%)
      req.event({
        type: HttpEventType.UploadProgress,
        loaded: 50,
        total: 100
      });

      expect(component.mediaList()[0].progress).toBe(50);

      // Simulate successful completion response
      req.flush({ url: 'https://mock.url/test.png' });

      expect(component.mediaList()[0].status).toBe('complete');
      expect(component.mediaList()[0].progress).toBe(100);
      expect(component.mediaList()[0].url).toBe('https://mock.url/test.png');
    });

    it('should handle network failures gracefully', () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      
      component.uploadFile(file);

      const req = httpTestingController.expectOne(`${environment.lessonApiUrl}/api/v1/media/upload`);
      
      // Simulate error
      req.error(new ProgressEvent('Network error'));

      expect(component.mediaList()[0].status).toBe('error');
    });

    it('should support retrying a failed upload', () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      
      component.uploadFile(file, 'retry-id-123');

      const req1 = httpTestingController.expectOne(`${environment.lessonApiUrl}/api/v1/media/upload`);
      req1.error(new ProgressEvent('Network error'));

      // Validate it's in an error state
      expect(component.mediaList()[0].status).toBe('error');

      // Retry
      component.retryUpload('retry-id-123');

      // Verify a new request is dispatched
      const req2 = httpTestingController.expectOne(`${environment.lessonApiUrl}/api/v1/media/upload`);
      req2.flush({ url: 'https://mock.url/test.png' });

      expect(component.mediaList()[0].status).toBe('complete');
    });
  });

  describe('List Management (Drop & Remove)', () => {
    beforeEach(() => {
      component.mediaList.set([
        { id: '1', url: '', name: 'first.png', type: 'image', progress: 100, status: 'complete' },
        { id: '2', url: '', name: 'second.png', type: 'image', progress: 100, status: 'complete' }
      ]);
    });

    it('should reorder media list on drop', () => {
      const event = {
        previousIndex: 0,
        currentIndex: 1
      } as CdkDragDrop<UploadedMedia[]>;

      component.dropMediaList(event);

      // The item at index 0 should have moved to index 1
      expect(component.mediaList()[0].id).toBe('2');
      expect(component.mediaList()[1].id).toBe('1');
    });

    it('should remove media when the user confirms', () => {
      const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
      component.removeMedia('1');
      expect(confirmSpy).toHaveBeenCalled();
      expect(component.mediaList().length).toBe(1);
      expect(component.mediaList()[0].id).toBe('2'); // Only the second remains
    });

    it('should NOT remove media when the user cancels', () => {
      const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);
      component.removeMedia('1');
      expect(confirmSpy).toHaveBeenCalled();
      expect(component.mediaList().length).toBe(2);
    });
  });
});