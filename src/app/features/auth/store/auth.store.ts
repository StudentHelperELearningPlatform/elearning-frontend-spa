import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { inject, computed, effect } from '@angular/core';
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
    isAuthReady: true, // no async Keycloak init needed anymore
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

    // Reactively mirror AuthService signal changes (e.g. after login/logout sync)
    effect(() => {
      const isAuth = authService.isAuthenticated();
      const currentUser = authService.currentUser()();
      const accessToken = authService.getAccessToken();

      if (!isAuth || !currentUser) {
        patchState(store, { user: null, token: null, role: null });
      } else {
        const roles = (currentUser.roles || []).map(r => r.toUpperCase());
        let primaryRole = 'STUDENT';

        if (roles.includes('ADMIN')) {
          primaryRole = 'ADMIN';
        } else if (roles.includes('TEACHER') || roles.includes('PROFESSOR')) {
          primaryRole = 'TEACHER';
        } else if (roles.includes('STUDENT')) {
          primaryRole = 'STUDENT';
        } else if (roles.length > 0) {
          primaryRole = roles[0]; // Fallback
        }

        const mappedUser: User = {
          id: '1',
          name: currentUser.email,
          email: currentUser.email,
          role: primaryRole,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.email}`,
          memberSince: new Date().toISOString(),
          grade: primaryRole === 'STUDENT' ? 10 : undefined,
          school: primaryRole === 'TEACHER' ? 'Lincoln High School' : undefined,
        };

        patchState(store, {
          user: mappedUser,
          token: accessToken,
          role: primaryRole,
          loading: false,
          error: null,
        });
      }
    });

    return {
      init() {},

      async login(): Promise<void> {
        patchState(store, { loading: true, error: null });
        try {
          await authService.login();
        } catch (err: any) {
          patchState(store, { loading: false, error: err.message });
        }
      },

      updateProfile(updatedUser: Partial<User>) {
        if (store.user()) {
          patchState(store, { user: { ...store.user()!, ...updatedUser } });
        }
      },

      async logout() {
        await authService.logout();
        patchState(store, { user: null, token: null, role: null, error: null });
      },
    };
  }),
);
