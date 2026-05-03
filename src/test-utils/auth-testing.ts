/**
 * Shared testing utilities for Keycloak-based auth.
 *
 * Because AuthService now depends on `inject(Keycloak)` and `KEYCLOAK_EVENT_SIGNAL`,
 * unit tests that don't need real Keycloak should provide these stubs instead.
 */
import { signal, computed } from '@angular/core';
import { AuthService } from '../app/core/services/auth.service';

export interface AuthServiceStubOptions {
  isAuthenticated?: boolean;
  roles?: string[];
  email?: string;
  token?: string;
}

/**
 * Creates a minimal AuthService stub that satisfies inject() without Keycloak.
 * Use as: `{ provide: AuthService, useValue: createAuthServiceStub() }`
 */
export const createAuthServiceStub = (options: AuthServiceStubOptions = {}) => {
  const {
    isAuthenticated = false,
    roles = [],
    email = null,
    token = null,
  } = options;

  const _user = signal(email ? { email, roles } : null);
  const _token = signal<string | null>(token);

  return {
    isAuthenticated: computed(() => !!_token()),
    currentUser: () => _user,
    getAccessToken: () => _token(),
    login: () => {},
    logout: () => { _user.set(null); _token.set(null); },
    hasRole: (role: string) => computed(() => _user()?.roles.includes(role) ?? false),
    register: () => {},
    checkEmailAvailability: () => {},
    // Allow tests to manually set the session state
    _setSession: (opts: { email: string; roles: string[]; token: string }) => {
      _user.set({ email: opts.email, roles: opts.roles });
      _token.set(opts.token);
    },
  };
};

/**
 * Creates a minimal AuthStore stub.
 * Use as: `{ provide: AuthStore, useValue: createAuthStoreStub() }`
 */
export const createAuthStoreStub = (options: AuthServiceStubOptions = {}) => {
  const { isAuthenticated = false, roles = [], email = null } = options;
  return {
    isAuthenticated: () => isAuthenticated,
    isStudent: () => roles.includes('STUDENT'),
    isTeacher: () => roles.includes('TEACHER'),
    isAdmin: () => roles.includes('ADMIN'),
    user: () => (email ? { email, roles } : null),
    token: () => (isAuthenticated ? 'stub-token' : null),
    role: () => roles[0] ?? null,
    isAuthReady: () => true,
    error: () => null,
    loading: () => false,
    login: () => {},
    logout: () => {},
    init: () => {},
    updateProfile: () => {},
  };
};
