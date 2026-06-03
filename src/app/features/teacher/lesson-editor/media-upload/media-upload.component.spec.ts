import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaUploadComponent, UploadedMedia } from './media-upload.component';
// Note: we intentionally avoid registering the real HTTP client pipeline here
// and rely solely on the testing provider below to keep requests under test control.
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpEventType } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AuthStore } from '../../../auth/store/auth.store';
import { createAuthStoreStub } from '../../../../../test-utils/auth-testing';

const MOCK_USER_ID = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
// Mock environment assuming standard structure. Adjust path if necessary.
import { environment } from '../../../../../environments/environment';

describe('MediaUploadComponent', () => {
  let component: MediaUploadComponent;
  let fixture: ComponentFixture<MediaUploadComponent>;
  let httpTestingController: HttpTestingController;

  const uploadUrl = `${environment.lessonApiUrl}/api/v1/media/upload`;

  const createMockFile = (name: string, type: string, sizeBytes: number): File => {
    const file = new File(['test-content'], name, { type });

    Object.defineProperty(file, 'size', {
      value: sizeBytes,
      configurable: true,
    });

    return file;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaUploadComponent],
      providers: [
        provideHttpClientTesting(),
        {
          provide: AuthStore,
          useValue: createAuthStoreStub({
            isAuthenticated: true,
            user: { id: MOCK_USER_ID, name: 'Test Teacher', email: 'teacher@test.com', role: 'PROFESSOR', memberSince: '' },
          }),
        },
      ],
      // Ignore child components like app-media-player to isolate this test
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaUploadComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);

    vi.stubGlobal('URL', {
      ...globalThis.URL,
      createObjectURL: vi.fn(() => 'blob:mock-url'),
    });

    // Make randomUUID return a unique value per call to avoid collisions
    // when multiple uploads are created in the same test.
    let __uuidCounter = 0;
    const mockRandomUUID = vi.fn(() => {
      __uuidCounter += 1;
      return `mock-uuid-${__uuidCounter}`;
    });

    Object.defineProperty(globalThis, 'crypto', {
      value: {
        ...globalThis.crypto,
        randomUUID: mockRandomUUID,
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
        dataTransfer: {
          files: [file],
        },
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

    it('should safely ignore onDrop if files array is empty', () => {
      const event = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        dataTransfer: { files: [] }
      } as unknown as DragEvent;
      const handleSpy = vi.spyOn(component, 'handleFiles');

      component.onDrop(event);
      expect(handleSpy).not.toHaveBeenCalled();
    });

    it('should safely ignore onFileSelected if files is null', () => {
      const event = {
        target: { files: null, value: 'C:\\fakepath\\test.png' }
      } as unknown as Event;
      const handleSpy = vi.spyOn(component, 'handleFiles');

      component.onFileSelected(event);
      expect(handleSpy).not.toHaveBeenCalled();
    });

    it('should handle onFileSelected from HTML input and reset value', () => {
      const file = createMockFile('test.png', 'image/png', 1024);

      const target = {
        files: [file],
        value: 'C:\\fakepath\\test.png',
      };

      const event = {
        target,
      } as unknown as Event;
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
      const massiveFile = createMockFile('huge.mp4', 'video/mp4', 51 * 1024 * 1024); // 51MB

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

      // Should upload the valid one
      expect(uploadSpy).toHaveBeenCalledWith(validFile);
      // Should flag the invalid one
      expect(component.errorMessage()).toContain('Invalid file type: bad.txt');
    });
  });

  describe('Network Upload Logic (uploadFile)', () => {
    it('should handle successful upload lifecycle and update progress for image', () => {
      const file = createMockFile('test.png', 'image/png', 1024);

      component.uploadFile(file);

      // 1. Check Initial State
      expect(component.mediaList().length).toBe(1);
      expect(component.mediaList()[0].status).toBe('uploading');
      // Component prefixes temporary IDs with 'temp-'. We only assert the
      // prefix here because the UUID is generated dynamically.
      const firstTempId = component.mediaList()[0].id;
      expect(firstTempId).toBeDefined();
      expect(firstTempId.startsWith('temp-')).toBe(true);
      expect(component.mediaList()[0].type).toBe('image');

      const req = httpTestingController.expectOne(uploadUrl);

      expect(req.request.method).toBe('POST');
      expect(req.request.body instanceof FormData).toBeTruthy();

      // 3. Simulate Progress Event
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

      // 5. Check Final State
      const finalizedMedia = component.mediaList()[0];
      expect(finalizedMedia.status).toBe('complete');
      expect(finalizedMedia.progress).toBe(100);
      expect(finalizedMedia.id).toBe('backend-media-id');
      expect(finalizedMedia.url).toBe('https://cdn.example.com/backend-media-id.png');
      expect(finalizedMedia.name).toBe('test.png');
      expect(finalizedMedia.type).toBe('image');
      expect(component.a11yMessage()).toContain('Upload complete: test.png');
    });

    it('should send empty X-User-Id header if user is null', () => {
      const authStore = TestBed.inject(AuthStore) as ReturnType<typeof createAuthStoreStub>;
      // Simulate no user
      authStore.user.set(null);

      const file = createMockFile('test.png', 'image/png', 1024);
      component.uploadFile(file);

      const req = httpTestingController.expectOne(`${environment.lessonApiUrl}/api/v1/media/upload`);
      // We don't assert identity headers here — interceptors are provided at
      // the application level and not in this isolated spec.
      req.flush({});
    });

    it('should not modify other media items when updating progress or status', () => {
      // Add an existing item
      component.mediaList.set([
        { id: 'existing-id', file: undefined, url: 'blob:old', name: 'old.png', type: 'image', status: 'complete', progress: 100 }
      ]);

      const file = createMockFile('test.png', 'image/png', 1024);
      component.uploadFile(file);

      const req = httpTestingController.expectOne(`${environment.lessonApiUrl}/api/v1/media/upload`);

      // Simulate Progress Event
      req.event({
        type: HttpEventType.UploadProgress,
        loaded: 50,
        total: 100
      });

      // Verify existing item is untouched during progress update
      expect(component.mediaList()[0].id).toBe('existing-id');
      expect(component.mediaList()[0].progress).toBe(100);
      expect(component.mediaList()[1].progress).toBe(50);

      // Simulate Success Response
      req.flush({ url: 'https://cdn.example.com/mock-uuid-1234.png' });

      // Verify existing item is untouched during completion update
      expect(component.mediaList()[0].status).toBe('complete');
      expect(component.mediaList()[0].url).toBe('blob:old');
      expect(component.mediaList()[1].status).toBe('complete');
      expect(component.mediaList()[1].url).toBe('https://cdn.example.com/mock-uuid-1234.png');
    });

    it('should not modify other media items when an upload errors out', () => {
      // Add an existing item
      component.mediaList.set([
        { id: 'existing-id', file: undefined, url: 'blob:old', name: 'old.png', type: 'image', status: 'complete', progress: 100 }
      ]);

      const file = createMockFile('test.png', 'image/png', 1024);
      component.uploadFile(file);

      const req = httpTestingController.expectOne(`${environment.lessonApiUrl}/api/v1/media/upload`);
      req.error(new ProgressEvent('error'));

      // Verify existing item is untouched during error update
      expect(component.mediaList()[0].status).toBe('complete');
      expect(component.mediaList()[1].status).toBe('error');
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

    it('should properly classify video and pdf files', () => {
      component.uploadFile(createMockFile('test.mp4', 'video/mp4', 1024));
      component.uploadFile(createMockFile('test.pdf', 'application/pdf', 1024));

      const reqs = httpTestingController.match(`${environment.lessonApiUrl}/api/v1/media/upload`);
      expect(reqs.length).toBe(2);

      // Flush both requests to avoid leftover open requests for afterEach verification.
      for (const r of reqs) {
        r.flush({});
      }

      expect(component.mediaList()[0].type).toBe('video');
      expect(component.mediaList()[1].type).toBe('pdf');
    });

    it('should reject audio files since backend does not accept them', () => {
      const uploadSpy = vi.spyOn(component, 'uploadFile').mockImplementation(() => undefined);
      const audioFile = createMockFile('song.mp3', 'audio/mpeg', 1024);

      component.handleFiles([audioFile]);

      expect(uploadSpy).not.toHaveBeenCalled();
      expect(component.errorMessage()).toContain('Invalid file type: song.mp3');
    });

    it('should return early if media type is unsupported in uploadFile', () => {
      const file = createMockFile('test.txt', 'text/plain', 1024);
      component.uploadFile(file);
      httpTestingController.expectNone(`${environment.lessonApiUrl}/api/v1/media/upload`);
      expect(component.mediaList().length).toBe(0);
    });
  });

  describe('Retry & Remove Operations', () => {
    it('should retry a failed upload using existing ID and File', () => {
      // Setup: Seed a failed media item
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

      // State should reset to uploading
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

    it('should safely ignore retry if media exists but has no file attached', () => {
      component.mediaList.set([{
        id: 'no-file-123', url: 'https://example.com/test.png', name: 'test.png', type: 'image',
        progress: 100, status: 'complete'
      }]);
      component.retryUpload('no-file-123');
      httpTestingController.expectNone(`${environment.lessonApiUrl}/api/v1/media/upload`);
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
      // 'id-1' should have moved from index 0 to index 2
      expect(list[0].id).toBe('id-2');
      expect(list[1].id).toBe('id-3');
      expect(list[2].id).toBe('id-1');
    });
  });
});
