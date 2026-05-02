import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Keycloak from 'keycloak-js';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType } from 'keycloak-angular';

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
  private keycloak = inject(Keycloak);
  private keycloakEvents = inject(KEYCLOAK_EVENT_SIGNAL);

  private _currentUser = signal<User | null>(null);
  private _accessToken = signal<string | null>(null);

  isAuthenticated = computed(() => !!this._accessToken());
  currentUser = () => this._currentUser;

  constructor() {
    // React to Keycloak auth state changes via the signal
    effect(() => {
      const event = this.keycloakEvents();

      if (event.type === KeycloakEventType.Ready) {
        this._syncSession();
      }

      if (event.type === KeycloakEventType.AuthSuccess) {
        this._syncSession();
      }

      if (event.type === KeycloakEventType.AuthLogout || event.type === KeycloakEventType.AuthError) {
        this._currentUser.set(null);
        this._accessToken.set(null);
      }
    });
  }

  private async _syncSession(): Promise<void> {
    if (this.keycloak.authenticated) {
      try {
        await this.keycloak.updateToken(30);
        const profile = await this.keycloak.loadUserProfile();
        const roles = this.keycloak.realmAccess?.roles ?? [];
        this._currentUser.set({
          email: profile.email ?? profile.username ?? '',
          roles,
        });
        this._accessToken.set(this.keycloak.token ?? null);
      } catch {
        this._currentUser.set(null);
        this._accessToken.set(null);
      }
    }
  }

  getAccessToken(): string | null {
    return this._accessToken();
  }

  login(credentials?: { email?: string }): void {
    this.keycloak.login({ loginHint: credentials?.email });
  }

  logout(): void {
    this._currentUser.set(null);
    this._accessToken.set(null);
    this.keycloak.logout();
  }

  hasRole = (role: string) =>
    computed(() => {
      const user = this._currentUser();
      return user ? user.roles.includes(role) : false;
    });

  // accept any type
  register(payload: Record<string, unknown>): Observable<unknown> {
    return this.http.post('/api/v1/auth/register', payload);
  }

  checkEmailAvailability(email: string): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(
      '/api/v1/auth/check-email?email=' + encodeURIComponent(email)
    );
  }
}
