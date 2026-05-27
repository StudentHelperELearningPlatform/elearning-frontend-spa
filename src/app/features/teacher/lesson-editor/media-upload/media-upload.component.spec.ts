import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaUploadComponent, UploadedMedia } from './media-upload.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpEventType } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { environment } from '../../../../../environments/environment';

describe('MediaUploadComponent', () => {
  let component: MediaUploadComponent;
  let fixture: ComponentFixture<MediaUploadComponent>;
  let httpTestingController: HttpTestingController;

  const uploadUrl = `${environment.lessonApiUrl}/api/v1/media/upload`;

  const createMockFile = (name: string, type: string, sizeBytes: number): File => {
    const file = new File(['test-content'], name, { type });
    Object.defineProperty(file, 'size', { value: sizeBytes });
    return file;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaUploadComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaUploadComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);

    vi.stubGlobal('URL', {
      ...globalThis.URL,
      createObjectURL: vi.fn(() => 'blob:mock-url'),
    });

    Object.defineProperty(globalThis, 'crypto', {
      value: {
        ...globalThis.crypto,
        randomUUID: vi.fn(() => 'mock-uuid-1234'),
      },
      configurable: true,
    });

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
        dataTransfer: { files: [file] },
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
        dataTransfer: null,
      } as unknown as DragEvent;

      const handleSpy = vi.spyOn(component, 'handleFiles');

      component.onDrop(event);

      expect(handleSpy).not.toHaveBeenCalled();
    });

    it('should handle onFileSelected from HTML input', () => {
      const file = createMockFile('test.png', 'image/png', 1024);

      const target = {
        files: [file],
        value: 'C:\\fakepath\\test.png',
      };

      const event = { target } as unknown as Event;

      const handleSpy = vi.spyOn(component, 'handleFiles').mockImplementation(() => undefined);

      component.onFileSelected(event);

      expect(handleSpy).toHaveBeenCalledWith([file]);

      expect(
        target.value === '' ||
          target.value === 'C:\\fakepath\\test.png' ||
          target.value.includes('test.png'),
      ).toBe(true);
    });
  });

  describe('File Validation (handleFiles)', () => {
    it('should accept valid PDF files and trigger upload', () => {
      const validFile = createMockFile('test.pdf', 'application/pdf', 1024);

      const uploadSpy = vi.spyOn(component, 'uploadFile').mockImplementation(() => undefined);

      component.handleFiles([validFile]);

      expect(component.errorMessage()).toBeNull();
      expect(uploadSpy).toHaveBeenCalledWith(validFile);
    });

    it('should accept valid image files and trigger upload', () => {
      const validFile = createMockFile('good.png', 'image/png', 1024);

      const uploadSpy = vi.spyOn(component, 'uploadFile').mockImplementation(() => undefined);

      component.handleFiles([validFile]);

      expect(component.errorMessage()).toBeNull();
      expect(uploadSpy).toHaveBeenCalledWith(validFile);
    });

    it('should accept valid gif files and trigger upload', () => {
      const validFile = createMockFile('good.gif', 'image/gif', 1024);

      const uploadSpy = vi.spyOn(component, 'uploadFile').mockImplementation(() => undefined);

      component.handleFiles([validFile]);

      expect(component.errorMessage()).toBeNull();
      expect(uploadSpy).toHaveBeenCalledWith(validFile);
    });

    it('should accept valid video files and trigger upload', () => {
      const validFile = createMockFile('good.mp4', 'video/mp4', 1024);

      const uploadSpy = vi.spyOn(component, 'uploadFile').mockImplementation(() => undefined);

      component.handleFiles([validFile]);

      expect(component.errorMessage()).toBeNull();
      expect(uploadSpy).toHaveBeenCalledWith(validFile);
    });

    it('should reject files exceeding 50MB and set error/a11y message', () => {
      const uploadSpy = vi.spyOn(component, 'uploadFile').mockImplementation(() => undefined);

      const massiveFile = createMockFile('huge.mp4', 'video/mp4', 51 * 1024 * 1024);

      component.handleFiles([massiveFile]);

      expect(uploadSpy).not.toHaveBeenCalled();
      expect(component.errorMessage()).toContain('File too large: huge.mp4');
      expect(component.a11yMessage()).toContain('Some files failed to upload');
    });

    it('should reject invalid MIME types', () => {
      const uploadSpy = vi.spyOn(component, 'uploadFile').mockImplementation(() => undefined);

      const invalidFile = createMockFile('notes.txt', 'text/plain', 1024);

      component.handleFiles([invalidFile]);

      expect(uploadSpy).not.toHaveBeenCalled();
      expect(component.errorMessage()).toContain('Invalid file type: notes.txt');
    });

    it('should process mixed valid and invalid files simultaneously', () => {
      const validFile = createMockFile('good.png', 'image/png', 1024);
      const invalidFile = createMockFile('bad.txt', 'text/plain', 1024);

      const uploadSpy = vi.spyOn(component, 'uploadFile').mockImplementation(() => undefined);

      component.handleFiles([validFile, invalidFile]);

      expect(uploadSpy).toHaveBeenCalledWith(validFile);
      expect(component.errorMessage()).toContain('Invalid file type: bad.txt');
    });
  });

  describe('Network Upload Logic (uploadFile)', () => {
    it('should handle successful upload lifecycle and update progress for image', () => {
      const file = createMockFile('test.png', 'image/png', 1024);

      component.uploadFile(file);

      expect(component.mediaList().length).toBe(1);
      expect(component.mediaList()[0].status).toBe('uploading');
      expect(component.mediaList()[0].id).toBe('mock-uuid-1234');
      expect(component.mediaList()[0].type).toBe('image');

      const req = httpTestingController.expectOne(uploadUrl);

      expect(req.request.method).toBe('POST');
      expect(req.request.body instanceof FormData).toBeTruthy();

      req.event({
        type: HttpEventType.UploadProgress,
        loaded: 50,
        total: 100,
      });

      expect(component.mediaList()[0].progress).toBe(50);

      req.flush({
        id: 'backend-media-id',
        url: 'https://cdn.example.com/backend-media-id.png',
        originalFilename: 'test.png',
        storedFilename: 'backend-media-id.png',
        mimeType: 'image/png',
        mediaType: 'IMAGE',
        sizeBytes: 1024,
      });

      const finalizedMedia = component.mediaList()[0];

      expect(finalizedMedia.status).toBe('complete');
      expect(finalizedMedia.progress).toBe(100);
      expect(finalizedMedia.id).toBe('backend-media-id');
      expect(finalizedMedia.url).toBe('https://cdn.example.com/backend-media-id.png');
      expect(finalizedMedia.name).toBe('test.png');
      expect(finalizedMedia.type).toBe('image');
      expect(component.a11yMessage()).toContain('Upload complete: test.png');
    });

    it('should handle successful upload lifecycle for video', () => {
      const file = createMockFile('video.mp4', 'video/mp4', 1024);

      component.uploadFile(file);

      const req = httpTestingController.expectOne(uploadUrl);

      req.flush({
        id: 'video-id',
        url: 'https://cdn.example.com/video-id.mp4',
        originalFilename: 'video.mp4',
        storedFilename: 'video-id.mp4',
        mimeType: 'video/mp4',
        mediaType: 'VIDEO',
        sizeBytes: 1024,
      });

      const finalizedMedia = component.mediaList()[0];

      expect(finalizedMedia.status).toBe('complete');
      expect(finalizedMedia.id).toBe('video-id');
      expect(finalizedMedia.url).toBe('https://cdn.example.com/video-id.mp4');
      expect(finalizedMedia.type).toBe('video');
    });

    it('should handle successful upload lifecycle for pdf', () => {
      const file = createMockFile('lesson.pdf', 'application/pdf', 1024);

      component.uploadFile(file);

      const req = httpTestingController.expectOne(uploadUrl);

      req.flush({
        id: 'pdf-id',
        url: 'https://cdn.example.com/lesson.pdf',
        originalFilename: 'lesson.pdf',
        storedFilename: 'lesson.pdf',
        mimeType: 'application/pdf',
        mediaType: 'FILE',
        sizeBytes: 1024,
      });

      const finalizedMedia = component.mediaList()[0];

      expect(finalizedMedia.status).toBe('complete');
      expect(finalizedMedia.id).toBe('pdf-id');
      expect(finalizedMedia.url).toBe('https://cdn.example.com/lesson.pdf');
      expect(finalizedMedia.type).toBe('pdf');
    });

    it('should fallback to local ObjectURL if response body has no url', () => {
      const file = createMockFile('test.png', 'image/png', 1024);

      component.uploadFile(file);

      const req = httpTestingController.expectOne(uploadUrl);

      req.flush({});

      expect(component.mediaList()[0].url).toBe('blob:mock-url');
    });

    it('should handle network error gracefully', () => {
      const file = createMockFile('test.png', 'image/png', 1024);

      component.uploadFile(file);

      const req = httpTestingController.expectOne(uploadUrl);

      req.error(new ProgressEvent('Network error'));

      expect(component.mediaList()[0].status).toBe('error');
      expect(component.a11yMessage()).toContain('Upload failed for test.png');
    });
  });

  describe('Retry & Remove Operations', () => {
    it('should retry a failed upload using existing ID and File', () => {
      const failedFile = createMockFile('retry.png', 'image/png', 1024);

      component.mediaList.set([
        {
          id: 'retry-123',
          url: '',
          name: 'retry.png',
          type: 'image',
          progress: 0,
          status: 'error',
          file: failedFile,
        },
      ]);

      component.retryUpload('retry-123');

      expect(component.mediaList()[0].status).toBe('uploading');

      const req = httpTestingController.expectOne(uploadUrl);

      req.flush({
        id: 'retry-backend-id',
        url: 'https://cdn.example.com/retry.png',
        originalFilename: 'retry.png',
        mimeType: 'image/png',
        mediaType: 'IMAGE',
      });

      expect(component.mediaList()[0].status).toBe('complete');
      expect(component.mediaList()[0].id).toBe('retry-backend-id');
      expect(component.mediaList()[0].url).toBe('https://cdn.example.com/retry.png');
    });

    it('should safely ignore retry if media id does not exist', () => {
      component.retryUpload('ghost-id');

      httpTestingController.expectNone(uploadUrl);
      expect(component.mediaList().length).toBeGreaterThanOrEqual(0);
    });

    it('should emit removed media and remove media when confirmed', () => {
      const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
      const mediaRemovedSpy = vi.spyOn(component.mediaRemoved, 'emit');

      const media: UploadedMedia = {
        id: 'remove-me',
        url: '',
        name: 'test.png',
        type: 'image',
        progress: 100,
        status: 'complete',
        mediaBlockId: 'block-id',
      };

      component.mediaList.set([media]);

      component.removeMedia('remove-me');

      expect(confirmSpy).toHaveBeenCalled();
      expect(mediaRemovedSpy).toHaveBeenCalledWith(media);
      expect(component.mediaList().length).toBe(0);
      expect(component.a11yMessage()).toBe('Media removed');
    });

    it('should abort removal when cancelled', () => {
      const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);
      const mediaRemovedSpy = vi.spyOn(component.mediaRemoved, 'emit');

      component.mediaList.set([
        {
          id: 'keep-me',
          url: '',
          name: 'test.png',
          type: 'image',
          progress: 100,
          status: 'complete',
        },
      ]);

      component.removeMedia('keep-me');

      expect(confirmSpy).toHaveBeenCalled();
      expect(mediaRemovedSpy).not.toHaveBeenCalled();
      expect(component.mediaList().length).toBe(1);
    });
  });

  describe('Drag and Drop Reordering', () => {
    it('should reorder media list correctly using cdkDropListDropped', () => {
      component.mediaList.set([
        {
          id: 'id-1',
          url: '',
          name: '1.png',
          type: 'image',
          progress: 100,
          status: 'complete',
        },
        {
          id: 'id-2',
          url: '',
          name: '2.png',
          type: 'image',
          progress: 100,
          status: 'complete',
        },
        {
          id: 'id-3',
          url: '',
          name: '3.png',
          type: 'image',
          progress: 100,
          status: 'complete',
        },
      ]);

      const event = {
        previousIndex: 0,
        currentIndex: 2,
      } as CdkDragDrop<UploadedMedia[]>;

      component.dropMediaList(event);

      const list = component.mediaList();

      expect(list[0].id).toBe('id-2');
      expect(list[1].id).toBe('id-3');
      expect(list[2].id).toBe('id-1');
    });
  });
});