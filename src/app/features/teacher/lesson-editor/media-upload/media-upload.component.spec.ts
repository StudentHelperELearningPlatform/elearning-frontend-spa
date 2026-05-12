import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MediaUploadComponent, UploadedMedia } from './media-upload.component';
import { vi } from 'vitest';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { provideApiMocks } from '../../../../../test-utils/api-testing';

describe('MediaUploadComponent', () => {
  let component: MediaUploadComponent;
  let fixture: ComponentFixture<MediaUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaUploadComponent],
      providers: [provideApiMocks()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
      const simulateSpy = vi.spyOn(component, 'simulateUpload').mockImplementation(() => undefined);
      const largeFile = new File([''], 'huge-video.mp4', { type: 'video/mp4' });
      Object.defineProperty(largeFile, 'size', { value: 51 * 1024 * 1024 });

      component.handleFiles([largeFile]);

      expect(component.errorMessage()).toContain('Maximum size is 50MB');
      expect(simulateSpy).not.toHaveBeenCalled();
    });

    it('should reject invalid file types', () => {
      const simulateSpy = vi.spyOn(component, 'simulateUpload').mockImplementation(() => undefined);
      const invalidFile = new File([''], 'document.pdf', { type: 'application/pdf' });

      component.handleFiles([invalidFile]);

      expect(component.errorMessage()).toContain('Only images, videos, and audio are allowed');
      expect(simulateSpy).not.toHaveBeenCalled();
    });
  });

  describe('simulateUpload (Network & Timers)', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      // Mock native browser APIs used in the component
      globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
      globalThis.crypto.randomUUID = vi.fn(() => '12345678-1234-1234-1234-1234567890ab') as unknown as typeof crypto.randomUUID;
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should successfully upload a file via fetch and update progress', async () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      
      // Mock successful fetch
      globalThis.fetch = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ url: 'https://mock.url/test.png' })
      });

      component.simulateUpload(file);

      // Verify it was added to the list as uploading
      expect(component.mediaList().length).toBe(1);
      expect(component.mediaList()[0].status).toBe('uploading');

      // Advance timers by 250ms to trigger one interval tick
      vi.advanceTimersByTime(250);
      expect(component.mediaList()[0].progress).toBe(10);

      // Fast-forward until all timers and promises resolve
      await vi.runAllTimersAsync();

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/v1/lessons/new/media', {
        method: 'POST',
        body: expect.any(FormData)
      });
      expect(component.mediaList()[0].status).toBe('complete');
      expect(component.mediaList()[0].progress).toBe(100);
      expect(component.mediaList()[0].url).toBe('https://mock.url/test.png');
    });

    it('should handle fetch network failures gracefully', async () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      
      // Mock failed fetch
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      component.simulateUpload(file);
      await vi.runAllTimersAsync();

      expect(component.mediaList()[0].status).toBe('error');
      expect(component.errorMessage()).toContain('Network error: Failed to upload test.png');
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