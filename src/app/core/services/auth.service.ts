// TODO: Replace with Keycloak OIDC integration
// When ready, implement IAuthService against angular-auth-oidc-client
// and swap the provider in app.config.ts via AUTH_SERVICE_TOKEN.

import { Injectable, Signal, signal, computed } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthResult, LoginCredentials, User, UserRole } from '../types/user.types';

interface MockUserRecord {
  password: string;
  user: User;
  token: string;
}

const MOCK_USERS: Record<string, MockUserRecord> = {
  'student@test.com': {
    password: 'password',
    token: 'mock-jwt-student-token',
    user: {
      id: 'usr-001',
      email: 'student@test.com',
      name: 'Alex Johnson',
      roles: ['STUDENT'],
    },
  },
  'teacher@test.com': {
    password: 'password',
    token: 'mock-jwt-teacher-token',
    user: {
      id: 'usr-002',
      email: 'teacher@test.com',
      name: 'Sarah Miller',
      roles: ['TEACHER'],
    },
  },
  'parent@test.com': {
    password: 'password',
    token: 'mock-jwt-parent-token',
    user: {
      id: 'usr-003',
      email: 'parent@test.com',
      name: 'David Chen',
      roles: ['PARENT'],
    },
  },
  'admin@test.com': {
    password: 'password',
    token: 'mock-jwt-admin-token',
    user: {
      id: 'usr-004',
      email: 'admin@test.com',
      name: 'Emma Wilson',
      roles: ['ADMIN'],
    },
  },
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Tokens stored in memory only — never in localStorage (per architecture doc)
  private _accessToken: string | null = null;
  private _currentUser = signal<User | null>(null);
  private _isAuthenticated = computed(() => this._currentUser() !== null);

  login(credentials: LoginCredentials): Observable<AuthResult> {
    const record = MOCK_USERS[credentials.email.toLowerCase()];

    if (!record || record.password !== credentials.password) {
      return throwError(() => new Error('Invalid email or password')).pipe(delay(500));
    }

    return of({ user: record.user, accessToken: record.token }).pipe(
      delay(600), // Simulate network latency
    );
  }

  logout(): void {
    this._accessToken = null;
    this._currentUser.set(null);
  }

  setSession(result: AuthResult): void {
    this._accessToken = result.accessToken;
    this._currentUser.set(result.user);
  }

  getAccessToken(): string | null {
    return this._accessToken;
  }

  isAuthenticated(): Signal<boolean> {
    return this._isAuthenticated;
  }

  currentUser(): Signal<User | null> {
    return this._currentUser;
  }

  hasRole(role: UserRole): Signal<boolean> {
    return computed(() => this._currentUser()?.roles.includes(role) ?? false);
  }
}
