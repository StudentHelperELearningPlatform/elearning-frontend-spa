import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { inject, computed } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  memberSince: string;
  grade?: number;
  school?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  role: string | null;
  loading: boolean;
  isAuthReady: boolean;
  error: string | null;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>({
    user: null,
    token: null,
    role: null,
    loading: false,
    isAuthReady: false,
    error: null,
  }),
  withComputed((state) => ({
    isAuthenticated: computed(() => !!state.token()),
    isTeacher: computed(() => state.role() === 'TEACHER'),
    isStudent: computed(() => state.role() === 'STUDENT'),
    isAdmin: computed(() => state.role() === 'ADMIN'),
  })),
  withMethods((store) => {
    const authService = inject(AuthService);
    return {
      async init() {
        // Restore session from Keycloak
        const loggedIn = await authService.restoreSession();
        if (loggedIn) {
          const user = authService.currentUser()();
          const token = authService.getAccessToken();
          
          if (user && token) {
            const primaryRole = user.roles[0] || 'STUDENT';
            
            const mockUser: User = {
              id: '1',
              name: user.email,
              email: user.email,
              role: primaryRole,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
              memberSince: new Date().toISOString(),
              grade: primaryRole === 'STUDENT' ? 10 : undefined,
              school: primaryRole === 'TEACHER' ? 'Lincoln High School' : undefined,
            };

            patchState(store, {
              token,
              role: primaryRole,
              user: mockUser,
            });
          }
        }
        patchState(store, { isAuthReady: true });
      },

      login(credentials: { email: string; password?: string }) {
        patchState(store, { loading: true, error: null });

        // AuthService will trigger Keycloak redirect
        authService.login(credentials).subscribe({
          next: () => {
            // Nothing to do here, the app will redirect to Keycloak
          },
          error: (err) =>
            patchState(store, { error: err.message || 'Login failed', loading: false }),
        });
      },

      updateProfile(updatedUser: Partial<User>) {
        if (store.user()) {
          patchState(store, { user: { ...store.user()!, ...updatedUser } });
        }
      },

      logout() {
        authService.logout();
        patchState(store, { user: null, token: null, role: null });
      },
    };
  }),
);
