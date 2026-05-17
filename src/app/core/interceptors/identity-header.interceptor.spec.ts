import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { identityHeaderInterceptor } from '../../app.config';
import { KeycloakService } from 'keycloak-angular';

describe('identityHeaderInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let mockKeycloakService: {
    getKeycloakInstance: () => { token?: string } | null;
  };

  const setupTestBed = (token: string | null | undefined, shouldThrowError = false) => {
    mockKeycloakService = {
      getKeycloakInstance: () => {
        if (shouldThrowError) {
          throw new Error('Keycloak Error');
        }
        return token !== undefined ? { token: token ?? undefined } : null;
      }
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([identityHeaderInterceptor])),
        provideHttpClientTesting(),
        { provide: KeycloakService, useValue: mockKeycloakService }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  };

  afterEach(() => {
    httpMock.verify();
  });

  const createMockToken = (sub: string, roles: string[]): string => {
    const payload = {
      sub,
      realm_access: {
        roles
      }
    };
    // encode payload to base64
    const base64Payload = btoa(JSON.stringify(payload));
    return `header.${base64Payload}.signature`;
  };

  it('should not add headers for non-API calls', () => {
    const token = createMockToken('u-student', ['STUDENT']);
    setupTestBed(token);

    httpClient.get('/google.com/search').subscribe();

    const req = httpMock.expectOne('/google.com/search');
    expect(req.request.headers.has('X-User-Id')).toBe(false);
    expect(req.request.headers.has('X-User-Role')).toBe(false);
    req.flush({});
  });

  it('should not add headers if token is missing', () => {
    setupTestBed(null);

    httpClient.get('/api/v1/lessons').subscribe();

    const req = httpMock.expectOne('/api/v1/lessons');
    expect(req.request.headers.has('X-User-Id')).toBe(false);
    expect(req.request.headers.has('X-User-Role')).toBe(false);
    req.flush({});
  });

  it('should not add headers if KeycloakService throws an exception', () => {
    setupTestBed(undefined, true);

    httpClient.get('/api/v1/lessons').subscribe();

    const req = httpMock.expectOne('/api/v1/lessons');
    expect(req.request.headers.has('X-User-Id')).toBe(false);
    expect(req.request.headers.has('X-User-Role')).toBe(false);
    req.flush({});
  });

  it('should not add headers if token is malformed', () => {
    setupTestBed('invalid-token-no-dots');

    httpClient.get('/api/v1/lessons').subscribe();

    const req = httpMock.expectOne('/api/v1/lessons');
    expect(req.request.headers.has('X-User-Id')).toBe(false);
    expect(req.request.headers.has('X-User-Role')).toBe(false);
    req.flush({});
  });

  it('should map STUDENT role correctly', () => {
    const token = createMockToken('user-student-1', ['STUDENT']);
    setupTestBed(token);

    httpClient.get('/api/v1/lessons').subscribe();

    const req = httpMock.expectOne('/api/v1/lessons');
    expect(req.request.headers.get('X-User-Id')).toBe('user-student-1');
    expect(req.request.headers.get('X-User-Role')).toBe('STUDENT');
    req.flush({});
  });

  it('should map PROFESSOR or TEACHER roles to PROFESSOR', () => {
    const token = createMockToken('user-teacher-1', ['TEACHER']);
    setupTestBed(token);

    httpClient.get('/api/v1/lessons').subscribe();

    const req = httpMock.expectOne('/api/v1/lessons');
    expect(req.request.headers.get('X-User-Id')).toBe('user-teacher-1');
    expect(req.request.headers.get('X-User-Role')).toBe('PROFESSOR');
    req.flush({});
  });

  it('should map ADMIN role on non-content endpoints to ADMIN', () => {
    const token = createMockToken('user-admin-1', ['ADMIN']);
    setupTestBed(token);

    httpClient.get('/api/v1/users').subscribe();

    const req = httpMock.expectOne('/api/v1/users');
    expect(req.request.headers.get('X-User-Id')).toBe('user-admin-1');
    expect(req.request.headers.get('X-User-Role')).toBe('ADMIN');
    req.flush({});
  });

  it('should map ADMIN role to PROFESSOR on content endpoints like /lessons', () => {
    const token = createMockToken('user-admin-1', ['ADMIN']);
    setupTestBed(token);

    httpClient.get('/api/v1/lessons').subscribe();

    const req = httpMock.expectOne('/api/v1/lessons');
    expect(req.request.headers.get('X-User-Id')).toBe('user-admin-1');
    expect(req.request.headers.get('X-User-Role')).toBe('PROFESSOR');
    req.flush({});
  });

  it('should map ADMIN role to PROFESSOR on content endpoints like /classes', () => {
    const token = createMockToken('user-admin-1', ['ADMIN']);
    setupTestBed(token);

    httpClient.get('/api/v1/classes').subscribe();

    const req = httpMock.expectOne('/api/v1/classes');
    expect(req.request.headers.get('X-User-Id')).toBe('user-admin-1');
    expect(req.request.headers.get('X-User-Role')).toBe('PROFESSOR');
    req.flush({});
  });

  it('should map ADMIN role to PROFESSOR on content port endpoints like :8081', () => {
    const token = createMockToken('user-admin-1', ['ADMIN']);
    setupTestBed(token);

    httpClient.get('http://localhost:8081/api/v1/some-endpoint').subscribe();

    const req = httpMock.expectOne('http://localhost:8081/api/v1/some-endpoint');
    expect(req.request.headers.get('X-User-Id')).toBe('user-admin-1');
    expect(req.request.headers.get('X-User-Role')).toBe('PROFESSOR');
    req.flush({});
  });

  it('should detect other API ports like :8082 and :8083', () => {
    const token = createMockToken('u-1', ['STUDENT']);
    setupTestBed(token);

    httpClient.get('http://localhost:8082/endpoint').subscribe();
    let req = httpMock.expectOne('http://localhost:8082/endpoint');
    expect(req.request.headers.get('X-User-Role')).toBe('STUDENT');
    req.flush({});

    httpClient.get('http://localhost:8083/endpoint').subscribe();
    req = httpMock.expectOne('http://localhost:8083/endpoint');
    expect(req.request.headers.get('X-User-Role')).toBe('STUDENT');
    req.flush({});
  });

  it('should map roles PROFESSOR explicitly and fallback correctly', () => {
    const token1 = createMockToken('u-prof', ['PROFESSOR']);
    setupTestBed(token1);
    httpClient.get('/api/v1/lessons').subscribe();
    let req = httpMock.expectOne('/api/v1/lessons');
    expect(req.request.headers.get('X-User-Role')).toBe('PROFESSOR');
    req.flush({});

    const token2 = createMockToken('u-guest', ['GUEST']);
    setupTestBed(token2);
    httpClient.get('/api/v1/lessons').subscribe();
    req = httpMock.expectOne('/api/v1/lessons');
    expect(req.request.headers.get('X-User-Role')).toBe('STUDENT');
    req.flush({});
  });

  it('should map ADMIN to PROFESSOR on /subcapitols, /blocks, and /questions', () => {
    const token = createMockToken('user-admin-1', ['ADMIN']);
    setupTestBed(token);

    httpClient.get('/api/v1/subcapitols').subscribe();
    let req = httpMock.expectOne('/api/v1/subcapitols');
    expect(req.request.headers.get('X-User-Role')).toBe('PROFESSOR');
    req.flush({});

    httpClient.get('/api/v1/blocks').subscribe();
    req = httpMock.expectOne('/api/v1/blocks');
    expect(req.request.headers.get('X-User-Role')).toBe('PROFESSOR');
    req.flush({});

    httpClient.get('/api/v1/questions').subscribe();
    req = httpMock.expectOne('/api/v1/questions');
    expect(req.request.headers.get('X-User-Role')).toBe('PROFESSOR');
    req.flush({});
  });
});
