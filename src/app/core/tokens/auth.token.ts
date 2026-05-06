import { InjectionToken, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResult, LoginCredentials, User } from '../types/user.types';

export interface IAuthService {
  login(credentials: LoginCredentials): Observable<AuthResult>;
  logout(): void;
  isAuthenticated(): Signal<boolean>;
  currentUser(): Signal<User | null>;
  hasRole(role: string): Signal<boolean>;
}

export const AUTH_SERVICE_TOKEN = new InjectionToken<IAuthService>('AUTH_SERVICE');
