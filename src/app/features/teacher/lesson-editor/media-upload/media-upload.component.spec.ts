import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaUploadComponent } from './media-upload.component';
import { vi } from 'vitest';

describe('MediaUploadComponent', () => {
  let component: MediaUploadComponent;
  let fixture: ComponentFixture<MediaUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaUploadComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('File Validation', () => {
    it('should reject files larger than 50MB', () => {
      // Mock the simulateUpload method so we don't trigger real network logic
      const simulateSpy = vi.spyOn(component, 'simulateUpload').mockImplementation(() => {});
      
      // Create a fake file that is 51MB
      const largeFile = new File([''], 'huge-video.mp4', { type: 'video/mp4' });
      Object.defineProperty(largeFile, 'size', { value: 51 * 1024 * 1024 });

      component.handleFiles([largeFile]);

      expect(component.errorMessage()).toContain('Maximum size is 50MB');
      expect(simulateSpy).not.toHaveBeenCalled();
    });

    it('should reject invalid file types', () => {
      const simulateSpy = vi.spyOn(component, 'simulateUpload').mockImplementation(() => {});
      
      // Create a PDF (which is not in ALLOWED_TYPES)
      const invalidFile = new File([''], 'document.pdf', { type: 'application/pdf' });

      component.handleFiles([invalidFile]);

      expect(component.errorMessage()).toContain('Only images, videos, and audio are allowed');
      expect(simulateSpy).not.toHaveBeenCalled();
    });

    it('should proceed to upload if the file is valid', () => {
      const simulateSpy = vi.spyOn(component, 'simulateUpload').mockImplementation(() => {});
      
      // Create a valid image file within the size limit
      const validFile = new File([''], 'photo.png', { type: 'image/png' });

      component.handleFiles([validFile]);

      expect(component.errorMessage()).toBeNull();
      expect(simulateSpy).toHaveBeenCalledWith(validFile);
    });
  });

  describe('Remove Action', () => {
    beforeEach(() => {
      // Seed the media list with one mock item before each removal test
      component.mediaList.set([
        { id: '123', url: '', name: 'test.png', type: 'image', progress: 100, status: 'complete' }
      ]);
    });

    it('should remove media when the user confirms', () => {
      // Mock the window.confirm dialog to return true (User clicks "OK")
      const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

      component.removeMedia('123');

      expect(confirmSpy).toHaveBeenCalled();
      expect(component.mediaList().length).toBe(0);
    });

    it('should NOT remove media when the user cancels', () => {
      // Mock the window.confirm dialog to return false (User clicks "Cancel")
      const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);

      component.removeMedia('123');

      expect(confirmSpy).toHaveBeenCalled();
      expect(component.mediaList().length).toBe(1); // Item should still be there
    });
  });
});