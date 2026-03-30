import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

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

  it('should attach Bearer token when authenticated', async () => {
    const credentials = { email: 'student@test.com', password: 'password' };
    const result = await firstValueFrom(authService.login(credentials));

    authService.setSession(result);

    // We don't need to subscribe here because expectOne will capture the attempt
    httpClient.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');

    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${result.accessToken}`);

    req.flush({});
  });

  it('should not attach header after logout', async () => {
    const credentials = { email: 'student@test.com', password: 'password' };
    const result = await firstValueFrom(authService.login(credentials));
    authService.setSession(result);

    authService.logout();

    httpClient.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBe(false);

    req.flush({});
  });
});
