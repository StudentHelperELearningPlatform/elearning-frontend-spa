// src/app/core/services/error-handler.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { describe, it, expect, beforeEach, afterEach, vi, MockInstance } from 'vitest';
import { GlobalErrorHandler } from './error-handler.service';
import { NotificationService } from './notification.service';

describe('GlobalErrorHandler', () => {
  let service: GlobalErrorHandler;
  let notificationServiceMock: { error: ReturnType<typeof vi.fn> };
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    // Mock the NotificationService so we can verify if toasts are being triggered
    notificationServiceMock = {
      error: vi.fn(),
    };

    // Spy on console.error to avoid polluting the test output
    // and to verify that the handler logs correctly.
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    TestBed.configureTestingModule({
      providers: [
        GlobalErrorHandler,
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    });

    service = TestBed.inject(GlobalErrorHandler);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Handling Standard Errors', () => {
    it('should extract the message from a standard Error and trigger an error notification', () => {
      const testError = new Error('Something went terribly wrong!');

      service.handleError(testError);

      expect(notificationServiceMock.error).toHaveBeenCalledWith('Something went terribly wrong!');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Global Error Handler:', testError);
    });

    it('should fallback to a default message if the error lacks a message property', () => {
      const testError = { someProp: 'I have no message property' };

      service.handleError(testError);

      expect(notificationServiceMock.error).toHaveBeenCalledWith('An unexpected error occurred');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Global Error Handler:', testError);
    });

    it('should handle null or undefined errors gracefully', () => {
      service.handleError(null);
      expect(notificationServiceMock.error).toHaveBeenCalledWith('An unexpected error occurred');

      service.handleError(undefined);
      expect(notificationServiceMock.error).toHaveBeenCalledWith('An unexpected error occurred');
    });
  });

  describe('Unwrapping Promise Rejections', () => {
    it('should unwrap a Promise rejection and handle the underlying error', () => {
      const actualError = new Error('Underlying promise rejection error');
      // Angular / Zone.js wraps uncaught promise rejections in an object with a `rejection` property
      const wrapperError = { rejection: actualError };

      service.handleError(wrapperError);

      expect(notificationServiceMock.error).toHaveBeenCalledWith(
        'Underlying promise rejection error',
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith('Global Error Handler:', actualError);
    });
  });

  describe('Ignoring HTTP Errors', () => {
    it('should NOT trigger an error notification for HttpErrorResponse instances', () => {
      const httpError = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' });

      service.handleError(httpError);

      // Verify that the duplicate toast issue is prevented
      expect(notificationServiceMock.error).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Unhandled HTTP Error:', httpError);
    });

    it('should NOT trigger an error notification for objects matching the HttpErrorResponse name', () => {
      // Sometimes instance checks fail due to Zone.js boundaries, testing the name fallback
      const mockHttpError = { name: 'HttpErrorResponse', message: 'Not found' };

      service.handleError(mockHttpError);

      expect(notificationServiceMock.error).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Unhandled HTTP Error:', mockHttpError);
    });

    it('should correctly ignore HttpErrorResponses even if they are wrapped in a Promise rejection', () => {
      const httpError = new HttpErrorResponse({ status: 404 });
      const wrapperError = { rejection: httpError };

      service.handleError(wrapperError);

      expect(notificationServiceMock.error).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Unhandled HTTP Error:', httpError);
    });
  });
});
