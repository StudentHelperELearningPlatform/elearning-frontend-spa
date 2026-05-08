import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import Keycloak from 'keycloak-js';

export interface User {
  id: string;
  email: string;
  roles: string[];
}

/** Minimal JWT payload we care about */
interface JwtPayload {
  sub?: string;
  email?: string;
  preferred_username?: string;
  realm_access?: { roles: string[] };
}

function parseJwt(token: string): JwtPayload {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replaceAll('-', '+').replaceAll('_', '/');
    return JSON.parse(atob(base64));
  } catch {
    return {};
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly keycloak = inject(Keycloak);
  private readonly userPlatformApi = inject(USER_PLATFORM_API_URL);

  private _currentUser = signal<User | null>(null);

  // Use a signal for reactivity instead of raw keycloak.authenticated
  isAuthenticated = signal(false);
  currentUser = () => this._currentUser;

  constructor() {
    this._syncState();

    // Attach listeners
    this.keycloak.onAuthSuccess = () => this._syncState();
    this.keycloak.onAuthRefreshSuccess = () => this._syncState();
    this.keycloak.onAuthLogout = () => {
      this.isAuthenticated.set(false);
      this._currentUser.set(null);
    };
  }

  async login(options?: { email?: string }): Promise<void> {
    await this.keycloak.login({ loginHint: options?.email });
  }

  async logout(): Promise<void> {
    await this.keycloak.logout({ redirectUri: globalThis.location.origin });
  }

  getAccessToken(): string | null {
    return this.keycloak.token ?? null;
  }

  hasRole = (role: string) =>
    computed(() => {
      const user = this._currentUser();
      return user ? user.roles.includes(role) : false;
    });

  register(payload: Record<string, any>): Observable<unknown> {
    const nameParts = (payload['name'] as string || '').split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const moisaPayload = {
      firstName,
      lastName,
      email: payload['email'],
      password: payload['password'],
      role: payload['role'] === 'TEACHER' ? 'PROFESSOR' : payload['role'],
    };

    const baseUrl = this.userPlatformApi.replace('/v1', '');
    return this.http.post(`${baseUrl}/auth/register`, moisaPayload);
  }

  checkEmailAvailability(email: string): Observable<{ available: boolean }> {
    // Gateway AuthController is at /api/auth, not /api/v1/auth
    const baseUrl = this.userPlatformApi.replace('/v1', '');
    return this.http.get<{ available: boolean }>(
      `${baseUrl}/auth/check-email?email=` + encodeURIComponent(email)
    );
  }

  private _syncState(): void {
    const isAuth = !!this.keycloak.authenticated;
    this.isAuthenticated.set(isAuth);

    if (isAuth && this.keycloak.token) {
      const payload = parseJwt(this.keycloak.token);
      const roles = payload.realm_access?.roles ?? [];
      const email = payload.email || payload.preferred_username || '';
      const id = payload.sub || '';
      this._currentUser.set({ id, email, roles });
    } else {
      this._currentUser.set(null);
    }
  }
}
