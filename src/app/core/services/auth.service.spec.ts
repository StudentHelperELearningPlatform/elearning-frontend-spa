import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import Keycloak from 'keycloak-js';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType } from 'keycloak-angular';
import { signal } from '@angular/core';

/** Minimal Keycloak instance stub */
const createKeycloakStub = (authenticated = false) => ({
  authenticated,
  token: authenticated ? 'stub-token' : undefined,
  login: vi.fn(),
  logout: vi.fn(),
  updateToken: vi.fn().mockResolvedValue(true),
  loadUserProfile: vi.fn().mockResolvedValue({ email: 'student@test.com' }),
  onAuthSuccess: undefined as (() => void) | undefined,
  onAuthRefreshSuccess: undefined as (() => void) | undefined,
  onAuthLogout: undefined as (() => void) | undefined,
});

describe('AuthService', () => {
  const setup = (authenticated = false) => {
    const keycloakStub = createKeycloakStub(authenticated);
    const eventSignal = signal({ type: KeycloakEventType.Ready, args: undefined });

    TestBed.configureTestingModule({
      providers: [
        { provide: Keycloak, useValue: keycloakStub },
        { provide: KEYCLOAK_EVENT_SIGNAL, useValue: eventSignal },
      ],
    });

    return {
      service: TestBed.inject(AuthService),
      keycloakStub,
    };
  };

  it('should be created', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });

  describe('initial state (not authenticated)', () => {
    it('should not be authenticated', () => {
      const { service } = setup(false);
      expect(service.isAuthenticated()).toBe(false);
    });

    it('should have null current user', () => {
      const { service } = setup(false);
      expect(service.currentUser()()).toBeNull();
    });

    it('should return null access token', () => {
      const { service } = setup(false);
      expect(service.getAccessToken()).toBeNull();
    });
  });

  describe('login()', () => {
    it('should call keycloak.login with loginHint when email provided', () => {
      const { service, keycloakStub } = setup();
      service.login({ email: 'student@test.com' });
      expect(keycloakStub.login).toHaveBeenCalledWith({ loginHint: 'student@test.com' });
    });

    it('should call keycloak.login with undefined hint when no email given', () => {
      const { service, keycloakStub } = setup();
      service.login();
      expect(keycloakStub.login).toHaveBeenCalledWith({ loginHint: undefined });
    });
  });

  describe('logout()', () => {
    it('should call keycloak.logout', () => {
      const { service, keycloakStub } = setup();
      service.logout();
      expect(keycloakStub.logout).toHaveBeenCalled();
    });

    it('should have null token after logout (unauthenticated state)', () => {
      const { service } = setup(false);
      expect(service.getAccessToken()).toBeNull();
    });
  });

  describe('hasRole()', () => {
    it('should return false when no user is set', () => {
      const { service } = setup(false);
      expect(service.hasRole('STUDENT')()).toBe(false);
    });
  });
});
