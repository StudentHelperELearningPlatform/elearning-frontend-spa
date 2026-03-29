import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { User, UserRole } from '../../../shared/models/user.model';
import { AuthService } from '../../../core/services/auth.service';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  roles: UserRole[];
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

const ROLE_REDIRECT: Record<UserRole, string> = {
  STUDENT: '/student',
  TEACHER: '/teacher',
  PARENT: '/parent',
  ADMIN: '/admin',
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(initialState),

  withComputed((store) => ({
    isStudent: computed(() => store.user()?.role === 'STUDENT'),
    isTeacher: computed(() => store.user()?.role === 'TEACHER'),
    isParent: computed(() => store.user()?.role === 'PARENT'),
    isAdmin: computed(() => store.user()?.role === 'ADMIN'),
  })),

  withMethods((store) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return {
      login: rxMethod<{ email: string; password: string }>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap(({ email, password }) =>
            authService.login(email, password).pipe(
              tapResponse({
                next: (result) => {
                  authService.setSession(result);
                  patchState(store, {
                    user: result.user,
                    isAuthenticated: true,
                    roles: [result.user.role],
                    loading: false,
                    error: null,
                  });
                  const destination = ROLE_REDIRECT[result.user.role] ?? '/';
                  router.navigateByUrl(destination);
                },
                error: (err: Error) => {
                  patchState(store, {
                    loading: false,
                    error: err.message ?? 'Login failed. Please try again.',
                  });
                },
              })
            )
          )
        )
      ),

      logout(): void {
        authService.logout();
        patchState(store, initialState);
        router.navigateByUrl('/auth/login');
      },
    };
  })
);
