// TODO: Replace with Keycloak OIDC integration
// To swap: provide a real AuthService via AUTH_SERVICE_TOKEN in app.config.ts
// and set environment.useMockAuth = false.

import { Injectable, Signal, signal, computed } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { User, AuthResult, UserRole } from '../../shared/models/user.model';

interface MockCredential {
  password: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

const MOCK_USERS: Record<string, MockCredential> = {
  'student@test.com': {
    password: 'password',
    user: { id: 'usr-001', email: 'student@test.com', name: 'Alex Rivera', role: 'STUDENT' },
    accessToken: 'mock-access-token-student',
    refreshToken: 'mock-refresh-token-student',
  },
  'teacher@test.com': {
    password: 'password',
    user: { id: 'usr-002', email: 'teacher@test.com', name: 'Dr. Morgan Lee', role: 'TEACHER' },
    accessToken: 'mock-access-token-teacher',
    refreshToken: 'mock-refresh-token-teacher',
  },
  'parent@test.com': {
    password: 'password',
    user: { id: 'usr-003', email: 'parent@test.com', name: 'Jamie Chen', role: 'PARENT' },
    accessToken: 'mock-access-token-parent',
    refreshToken: 'mock-refresh-token-parent',
  },
  'admin@test.com': {
    password: 'password',
    user: { id: 'usr-004', email: 'admin@test.com', name: 'Admin User', role: 'ADMIN' },
    accessToken: 'mock-access-token-admin',
    refreshToken: 'mock-refresh-token-admin',
  },
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Tokens kept in memory only — never written to localStorage
  private _accessToken: string | null = null;
  private _refreshToken: string | null = null;

  private _currentUser = signal<User | null>(null);
  private _isAuthenticated = computed(() => this._currentUser() !== null);

  readonly currentUser: Signal<User | null> = this._currentUser.asReadonly();
  readonly isAuthenticated: Signal<boolean> = this._isAuthenticated;

  hasRole(role: UserRole): Signal<boolean> {
    return computed(() => this._currentUser()?.role === role);
  }

  login(email: string, password: string): Observable<AuthResult> {
    const cred = MOCK_USERS[email.toLowerCase()];

    if (!cred || cred.password !== password) {
      // Simulate network delay for realistic behaviour
      return throwError(() => new Error('Invalid email or password')).pipe(delay(400));
    }

    const result: AuthResult = {
      user: cred.user,
      accessToken: cred.accessToken,
      refreshToken: cred.refreshToken,
    };

    return of(result).pipe(delay(400));
  }

  setSession(result: AuthResult): void {
    this._accessToken = result.accessToken;
    this._refreshToken = result.refreshToken;
    this._currentUser.set(result.user);
  }

  logout(): void {
    this._accessToken = null;
    this._refreshToken = null;
    this._currentUser.set(null);
  }

  getAccessToken(): string | null {
    return this._accessToken;
  }
}
