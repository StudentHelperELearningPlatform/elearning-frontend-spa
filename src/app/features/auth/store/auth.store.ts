import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { inject, computed } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  memberSince: string;
  grade?: number;
  school?: string;
}

interface AuthState {
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
      login(email: string, role?: string) {
        patchState(store, { loading: true, error: null });
        authService.login(email, role).subscribe({
          next: (res) => {
            const mockUser: User = {
              id: '1',
              name: 'Andrei Paraschiv',
              email: email,
              role: res.role,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
              memberSince: '2024-01-15',
              grade: res.role === 'STUDENT' ? 10 : undefined,
              school: res.role === 'TEACHER' ? 'Lincoln High School' : undefined
            };
            patchState(store, { 
              token: res.token, 
              role: res.role, 
              user: mockUser,
              loading: false 
            });
          },
          error: () => patchState(store, { error: 'Login failed', loading: false })
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
      }
    };
  })
);
