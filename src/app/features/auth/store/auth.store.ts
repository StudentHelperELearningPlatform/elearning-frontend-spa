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
      init() {
        // Simulate checking for existing session
        setTimeout(() => {
          patchState(store, { isAuthReady: true });
        }, 500);
      },

      // 1. Updated signature to accept the credentials object
      login(credentials: { email: string; password?: string }) {
        patchState(store, { loading: true, error: null });

        // 2. Pass the object directly to the updated AuthService
        authService.login(credentials).subscribe({
          next: (res) => {
            // 3. AuthService now returns an array of roles, so we grab the first one
            const primaryRole = res.user.roles[0] || 'STUDENT';

            const mockUser: User = {
              id: '1',
              name: 'Andrei Paraschiv',
              email: credentials.email,
              role: primaryRole,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
              memberSince: '2024-01-15',
              grade: primaryRole === 'STUDENT' ? 10 : undefined,
              school: primaryRole === 'TEACHER' ? 'Lincoln High School' : undefined,
            };

            patchState(store, {
              token: res.accessToken, // 4. Map to the new accessToken property
              role: primaryRole,
              user: mockUser,
              loading: false,
            });

            // 5. Sync the store state with the service state
            authService.setSession(res);
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
