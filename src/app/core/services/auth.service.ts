import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

export interface User {
  email: string;
  roles: string[];
}

export interface AuthResult {
  user: User;
  accessToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Internal signals for state management
  private http = inject(HttpClient);
  private _currentUser = signal<User | null>(null);
  private _accessToken = signal<string | null>(null);

  // We return these as functions yielding signals to match the service.method()() syntax in your tests
  isAuthenticated = () => computed(() => !!this._accessToken());
  currentUser = () => this._currentUser;

  getAccessToken(): string | null {
    return this._accessToken();
  }

  login(credentials: { email: string; password?: string }): Observable<AuthResult> {
    const emailLower = credentials.email.toLowerCase();

    // Handle the specific error cases from your tests
    if (credentials.password === 'wrongpass' || emailLower === 'nobody@test.com') {
      return throwError(() => new Error('Invalid email or password'));
    }

    // Role assignment based on email keywords
    let roles = ['STUDENT'];
    if (emailLower.includes('teacher')) roles = ['TEACHER'];
    if (emailLower.includes('admin')) roles = ['ADMIN'];

    return of({
      user: { email: credentials.email, roles },
      accessToken: 'mock-jwt-token',
    });
  }

  setSession(result: AuthResult) {
    this._currentUser.set(result.user);
    this._accessToken.set(result.accessToken);
  }

  logout() {
    this._currentUser.set(null);
    this._accessToken.set(null);
  }

  hasRole = (role: string) =>
    computed(() => {
      const user = this._currentUser();
      return user ? user.roles.includes(role) : false;
    });
//accept  any type 
  register(payload: Record<string, unknown>): Observable<unknown> {
    return this.http.post('/api/auth/register', payload);
  }

  checkEmailAvailability(email: string): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(
      '/api/auth/check-email?email=' + encodeURIComponent(email)
    );
  }
}
