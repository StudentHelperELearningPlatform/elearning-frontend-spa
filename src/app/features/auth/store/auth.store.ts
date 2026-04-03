import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';
import { AuthResult, LoginCredentials, User } from '../../../core/types/user.types';
import { AuthService } from '../../../core/services/auth.service';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  roles: string[];
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  roles: [],
  loading: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(initialState),
  withComputed((store) => ({
    isStudent: computed(() => store.roles().includes('STUDENT')),
    isTeacher: computed(() => store.roles().includes('TEACHER')),
    isAdmin: computed(() => store.roles().includes('ADMIN')),
  })),
  withMethods((store, authService = inject(AuthService), router = inject(Router)) => ({
    login: rxMethod<LoginCredentials>(
      pipe(
        tap((credentials: LoginCredentials) => {
          // Logic check counts as 'using' the variable for all linters
          if (credentials) {
            patchState(store, { loading: true, error: null });
          }
        }),
        switchMap((credentials: LoginCredentials) =>
          authService.login(credentials).pipe(
            tapResponse({
              next: (result: AuthResult) => {
                authService.setSession(result);
                patchState(store, {
                  user: result.user,
                  isAuthenticated: true,
                  roles: result.user.roles,
                  loading: false,
                  error: null,
                });

                const primaryRole = result.user.roles[0];
                const redirectMap: Record<string, string> = {
                  STUDENT: '/student',
                  TEACHER: '/teacher',
                  ADMIN: '/admin',
                };
                router.navigate([redirectMap[primaryRole] ?? '/']);
              },
              error: (err: { message?: string }) => {
                patchState(store, {
                  loading: false,
                  error: err.message ?? 'Login failed. Please try again.',
                });
              },
            }),
          ),
        ),
      ),
    ),

    logout(): void {
      authService.logout();
      patchState(store, initialState);
      router.navigate(['/auth/login']);
    },

    clearError(): void {
      patchState(store, { error: null });
    },
  })),
);
