import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

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
  private http = inject(HttpClient);
  private keycloak = inject(KeycloakService);
  
  private _currentUser = signal<User | null>(null);
  private _accessToken = signal<string | null>(null);

  isAuthenticated = () => computed(() => !!this._accessToken());
  currentUser = () => this._currentUser;

  getAccessToken(): string | null {
    return this._accessToken();
  }

  // Wraps keycloak login. The promise will trigger a redirect so it never resolves here
  login(credentials: { email: string; password?: string }): Observable<AuthResult> {
    return from(
      this.keycloak.login({ loginHint: credentials.email }).then(() => {
        // This won't execute because of redirection
        return { user: { email: credentials.email, roles: [] }, accessToken: '' };
      })
    );
  }

  // Restore session if keycloak is already logged in (used by app initialization)
  async restoreSession(): Promise<boolean> {
    const isLoggedIn = this.keycloak.isLoggedIn();
    if (isLoggedIn) {
      const profile = await this.keycloak.loadUserProfile();
      const roles = this.keycloak.getUserRoles();
      const token = await this.keycloak.getToken();
      
      this._currentUser.set({
        email: profile.email || profile.username || '',
        roles
      });
      this._accessToken.set(token);
    }
    return isLoggedIn;
  }

  logout() {
    this._currentUser.set(null);
    this._accessToken.set(null);
    this.keycloak.logout();
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
