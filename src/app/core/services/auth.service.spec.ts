import { TestBed } from '@angular/core/testing';
import { signal, computed } from '@angular/core';
import { AuthService } from './auth.service';
import Keycloak from 'keycloak-js';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType } from 'keycloak-angular';

/** Minimal Keycloak instance stub */
const createKeycloakStub = (authenticated = false, token = 'stub-token') => ({
  authenticated,
  token,
  realmAccess: { roles: ['STUDENT'] as string[] },
  login: vi.fn(),
  logout: vi.fn(),
  updateToken: vi.fn().mockResolvedValue(true),
  loadUserProfile: vi.fn().mockResolvedValue({ email: 'student@test.com' }),
});

const createEventSignal = (type: KeycloakEventType) =>
  signal({ type, args: undefined });

describe('AuthService', () => {
  const setup = (authenticated = false) => {
    const keycloakStub = createKeycloakStub(authenticated);
    const eventSignal = createEventSignal(KeycloakEventType.Ready);

    TestBed.configureTestingModule({
      providers: [
        { provide: Keycloak, useValue: keycloakStub },
        { provide: KEYCLOAK_EVENT_SIGNAL, useValue: eventSignal },
      ],
    });

    return {
      service: TestBed.inject(AuthService),
      keycloakStub,
      eventSignal,
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
    it('should call keycloak.login with the provided hint', () => {
      const { service, keycloakStub } = setup();
      service.login({ email: 'student@test.com' });
      expect(keycloakStub.login).toHaveBeenCalledWith({ loginHint: 'student@test.com' });
    });

    it('should call keycloak.login without hint when no email given', () => {
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

    it('should clear session signals on logout', () => {
      const { service } = setup();
      service.logout();
      expect(service.isAuthenticated()).toBe(false);
      expect(service.currentUser()()).toBeNull();
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
