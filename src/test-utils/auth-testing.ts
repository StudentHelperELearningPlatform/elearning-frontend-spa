/**
 * Shared testing utilities for Keycloak-based auth.
 *
 * Because AuthService now depends on `inject(Keycloak)`,
 * unit tests that don't need real Keycloak should provide these stubs instead.
 */
import { signal, computed } from '@angular/core';

export interface AuthServiceStubOptions {
  isAuthenticated?: boolean;
  roles?: string[];
  email?: string | null;
  token?: string | null;
}

/**
 * Creates a minimal AuthService stub that satisfies inject() without Keycloak.
 * Use as: `{ provide: AuthService, useValue: createAuthServiceStub() }`
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAuthServiceStub = (options: AuthServiceStubOptions = {}): any => {
  const {
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    login: () => {},
    logout: () => { _user.set(null); _token.set(null); },
    hasRole: (role: string) => computed(() => _user()?.roles.includes(role) ?? false),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    register: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    checkEmailAvailability: () => {},
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAuthStoreStub = (options: AuthServiceStubOptions = {}): any => {
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    login: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    logout: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    init: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateProfile: () => {},
  };
};
