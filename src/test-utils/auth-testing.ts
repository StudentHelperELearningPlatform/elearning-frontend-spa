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
export const createAuthStoreStub = (options: any = {}): any => {
  const { 
    isAuthenticated = false, 
    roles = [], 
    email = null,
    user = null 
  } = options;

  const _user = signal(user || (email ? { email, roles } : null));
  const _token = signal(isAuthenticated ? 'stub-token' : null);
  const _role = signal(roles[0] ?? null);
  const _loading = signal(false);
  const _error = signal<string | null>(null);

  return {
    user: _user,
    token: _token,
    role: _role,
    loading: _loading,
    error: _error,
    isAuthenticated: computed(() => !!_token()),
    isStudent: computed(() => _role() === 'STUDENT'),
    isTeacher: computed(() => _role() === 'TEACHER' || _role() === 'PROFESSOR'),
    isAdmin: computed(() => _role() === 'ADMIN'),
    isAuthReady: signal(true),
    isFullyLoaded: signal(true),
    login: () => { /* mock */ },
    logout: () => { /* mock */ },
    init: () => { /* mock */ },
    updateProfile: () => { /* mock */ },
  };
};
