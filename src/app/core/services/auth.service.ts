import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import Keycloak from 'keycloak-js';

export interface User {
  email: string;
  roles: string[];
}

export interface AuthResult {
  user: User;
  accessToken: string;
}

/** Minimal JWT payload we care about */
interface JwtPayload {
  email?: string;
  preferred_username?: string;
  realm_access?: { roles: string[] };
  resource_access?: Record<string, { roles: string[] }>;
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

  private _currentUser = signal<User | null>(null);

  isAuthenticated = computed(() => !!this.keycloak.authenticated);
  currentUser = () => this._currentUser;

  constructor() {
    this._syncState();

    this.keycloak.onAuthSuccess = () => this._syncState();
    this.keycloak.onAuthRefreshSuccess = () => this._syncState();
    this.keycloak.onAuthLogout = () => this._syncState();
  }

  /**
   * Initiate login via Keycloak redirect.
   * @param options Optional object with an `email` hint (pre-fills Keycloak login form).
   */
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

  register(payload: Record<string, unknown>): Observable<unknown> {
    const baseUrl = environment.keycloak.url.replace(/\/$/, '');
    return this.http.post(`${baseUrl}/api/v1/auth/register`, payload);
  }

  checkEmailAvailability(email: string): Observable<{ available: boolean }> {
    const baseUrl = environment.keycloak.url.replace(/\/$/, '');
    return this.http.get<{ available: boolean }>(
      `${baseUrl}/api/v1/auth/check-email?email=` + encodeURIComponent(email),
    );
  }

  private _syncState(): void {
    if (this.keycloak.authenticated && this.keycloak.token) {
      const payload = parseJwt(this.keycloak.token);
      const roles = payload.realm_access?.roles ?? [];
      const email = payload.email ?? payload.preferred_username ?? '';
      this._currentUser.set({ email, roles });
    } else {
      this._currentUser.set(null);
    }
  }
}
