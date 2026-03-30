import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not attach Authorization header when not authenticated', () => {
    httpClient.get('/api/test').subscribe();
    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('should attach Bearer token when authenticated', (done) => {
    authService.login({ email: 'student@test.com', password: 'password' }).subscribe({
      next: (result) => {
        authService.setSession(result);

        httpClient.get('/api/test').subscribe();
        const req = httpMock.expectOne('/api/test');
        expect(req.request.headers.get('Authorization')).toBe(
          `Bearer ${result.accessToken}`,
        );
        req.flush({});
        done();
      },
    });
  });

  it('should not attach header after logout', (done) => {
    authService.login({ email: 'student@test.com', password: 'password' }).subscribe({
      next: (result) => {
        authService.setSession(result);
        authService.logout();

        httpClient.get('/api/test').subscribe();
        const req = httpMock.expectOne('/api/test');
        expect(req.request.headers.has('Authorization')).toBe(false);
        req.flush({});
        done();
      },
    });
  });
});
