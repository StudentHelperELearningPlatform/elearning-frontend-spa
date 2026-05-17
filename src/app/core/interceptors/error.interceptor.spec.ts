import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { errorInterceptor } from './error.interceptor';
import { AuthStore } from '../../features/auth/store/auth.store';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { vi } from 'vitest';

describe('errorInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockNotificationService: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockAuthStore: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockRouter: any;

  beforeEach(() => {
    mockNotificationService = {
      error: vi.fn(),
      success: vi.fn(),
      info: vi.fn(),
    };

    mockAuthStore = {
      logout: vi.fn(),
    };

    mockRouter = {
      navigate: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: AuthStore, useValue: mockAuthStore },
        { provide: Router, useValue: mockRouter },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not show notification for successful responses (status 2xx)', () => {
    httpClient.get('/api/test').subscribe();
    const req = httpMock.expectOne('/api/test');
    req.flush({ data: 'success' }, { status: 200, statusText: 'OK' });
    expect(mockNotificationService.error).not.toHaveBeenCalled();
  });

  it('should not show notification for 2xx responses that have empty/invalid bodies (parsing errors)', () => {
    httpClient.get('/api/test').subscribe({
      error: (err) => {
        expect(err).toBeDefined();
      }
    });
    const req = httpMock.expectOne('/api/test');
    req.flush('not json', { status: 200, statusText: 'OK' });
    expect(mockNotificationService.error).not.toHaveBeenCalled();
  });

  it('should handle 401 Unauthorized by logging out and redirecting to login', () => {
    httpClient.get('/api/test').subscribe({
      error: (err) => {
        expect(err.status).toBe(401);
      }
    });
    const req = httpMock.expectOne('/api/test');
    req.flush({ message: 'Unauthorized session' }, { status: 401, statusText: 'Unauthorized' });

    expect(mockAuthStore.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
    expect(mockNotificationService.error).toHaveBeenCalledWith('Unauthorized session');
  });

  it('should display "Forbidden (Access Denied)" for 403 status with statusText "OK" and no JSON message', () => {
    httpClient.get('/api/test').subscribe({
      error: (err) => {
        expect(err.status).toBe(403);
      }
    });
    const req = httpMock.expectOne('/api/test');
    req.flush(null, { status: 403, statusText: 'OK' });

    expect(mockNotificationService.error).toHaveBeenCalledWith('Forbidden (Access Denied)');
  });

  it('should display the correct backend message for 403 status when JSON body contains message', () => {
    httpClient.get('/api/test').subscribe({
      error: (err) => {
        expect(err.status).toBe(403);
      }
    });
    const req = httpMock.expectOne('/api/test');
    req.flush({ message: 'You do not have access to this course' }, { status: 403, statusText: 'OK' });

    expect(mockNotificationService.error).toHaveBeenCalledWith('You do not have access to this course');
  });

  it('should display the correct backend error property for 403 status when JSON body lacks message but has error', () => {
    httpClient.get('/api/test').subscribe({
      error: (err) => {
        expect(err.status).toBe(403);
      }
    });
    const req = httpMock.expectOne('/api/test');
    req.flush({ error: 'Access restricted' }, { status: 403, statusText: 'OK' });

    expect(mockNotificationService.error).toHaveBeenCalledWith('Access restricted');
  });

  it('should display plain text error response when backend returns string instead of JSON', () => {
    httpClient.get('/api/test').subscribe({
      error: (err) => {
        expect(err.status).toBe(400);
      }
    });
    const req = httpMock.expectOne('/api/test');
    req.flush('Custom plain text error', { status: 400, statusText: 'Bad Request' });

    expect(mockNotificationService.error).toHaveBeenCalledWith('Custom plain text error');
  });

  it('should filter out HTML error responses like <!DOCTYPE html> and use status fallback', () => {
    httpClient.get('/api/test').subscribe({
      error: (err) => {
        expect(err.status).toBe(403);
      }
    });
    const req = httpMock.expectOne('/api/test');
    req.flush('<!DOCTYPE html><html><body><h1>403 Forbidden</h1></body></html>', { status: 403, statusText: 'OK' });

    expect(mockNotificationService.error).toHaveBeenCalledWith('Forbidden (Access Denied)');
  });

  it('should map various HTTP status codes to clean human-readable strings if no message in body', () => {
    const statusCodesToTest = [
      { status: 400, expected: 'Bad Request' },
      { status: 404, expected: 'Not Found' },
      { status: 500, expected: 'Internal Server Error' },
      { status: 503, expected: 'Service Unavailable' }
    ];

    statusCodesToTest.forEach(({ status, expected }) => {
      httpClient.get(`/api/test-${status}`).subscribe({
        error: (err) => {
          expect(err).toBeDefined();
        }
      });
      const req = httpMock.expectOne(`/api/test-${status}`);
      req.flush(null, { status, statusText: 'OK' });
      expect(mockNotificationService.error).toHaveBeenCalledWith(expected);
    });
  });

  it('should fallback to statusText if it is not OK and no message in body', () => {
    httpClient.get('/api/test').subscribe({
      error: (err) => {
        expect(err).toBeDefined();
      }
    });
    const req = httpMock.expectOne('/api/test');
    req.flush(null, { status: 418, statusText: "I'm a teapot" });
    expect(mockNotificationService.error).toHaveBeenCalledWith("I'm a teapot");
  });
});
