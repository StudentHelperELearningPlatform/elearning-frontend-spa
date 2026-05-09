import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

import { signal } from '@angular/core';

// Stub AuthService — avoids needing a real Keycloak instance in unit tests
const createAuthServiceStub = (token: string | null) => ({
  getAccessToken: () => token,
  isAuthenticated: () => !!token,
  currentUser: () => signal(token ? { id: 'u1', email: 't@t.com', roles: ['STUDENT'] } : null)
});

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  const setup = (token: string | null) => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: createAuthServiceStub(token) },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  };

  afterEach(() => httpMock.verify());

  it('should not attach Authorization header when not authenticated', () => {
    setup(null);
    httpClient.get('/api/v1/test').subscribe();
    const req = httpMock.expectOne('/api/v1/test');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('should attach Bearer token when token is present', () => {
    setup('my-test-token');
    httpClient.get('/api/v1/test').subscribe();
    const req = httpMock.expectOne('/api/v1/test');
    expect(req.request.headers.get('Authorization')).toBe('Bearer my-test-token');
    req.flush({});
  });

  it('should not attach header when token is null', () => {
    setup(null);
    httpClient.get('/api/v1/test').subscribe();
    const req = httpMock.expectOne('/api/v1/test');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });
});
