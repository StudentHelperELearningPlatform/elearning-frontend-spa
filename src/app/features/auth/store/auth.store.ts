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
    loading: true,
    isAuthReady: false,
    error: null,
  }),
  withComputed((state) => ({
    isAuthenticated: computed(() => !!state.token()),
    isTeacher: computed(() => state.role() === 'TEACHER' || state.role() === 'PROFESSOR'),
    isStudent: computed(() => state.role() === 'STUDENT'),
    isAdmin: computed(() => state.role() === 'ADMIN'),
    // Wait for both token and profile
    isFullyLoaded: computed(() => !!state.token() && !!state.user()),
  })),
  withMethods((store) => {
    const authService = inject(AuthService);

    // Reactively mirror AuthService signal changes (Keycloak events)
    effect(() => {
      const isAuth = authService.isAuthenticated();
      const currentUser = authService.currentUser()();
      const accessToken = authService.getAccessToken();

      if (!isAuth || !currentUser) {
        localStorage.removeItem('access_token');
        patchState(store, { user: null, token: null, role: null, loading: !isAuth ? false : store.loading() });
      } else {
        if (accessToken) {
          localStorage.setItem('access_token', accessToken);
        }
        
        const rawRoles = (currentUser.roles || []).map(r => r.toUpperCase());
        let primaryRole = 'STUDENT';

        if (rawRoles.includes('ADMIN')) {
          primaryRole = 'ADMIN';
        } else if (rawRoles.some(r => r === 'PROFESSOR' || r === 'TEACHER' || r === 'INSTRUCTOR')) {
          primaryRole = 'PROFESSOR';
        } else if (rawRoles.includes('STUDENT')) {
          primaryRole = 'STUDENT';
        } else {
          // DEVELOPER FALLBACK: If email contains teacher/professor, grant PROFESSOR role
          const email = (currentUser.email || '').toLowerCase();
          if (email.includes('teacher') || email.includes('professor') || email === 'student@test.com') {
             primaryRole = email === 'student@test.com' ? 'STUDENT' : 'PROFESSOR';
          } else {
             primaryRole = rawRoles.find(r => !['OFFLINE_ACCESS', 'UMA_AUTHORIZATION', 'DEFAULT-ROLES-ELEARNING'].includes(r)) || 'STUDENT';
          }
        }

        const mappedUser: User = {
          id: currentUser.id,
          name: currentUser.email,
          email: currentUser.email,
          role: primaryRole,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.email}`,
          memberSince: new Date().toISOString(),
          grade: primaryRole === 'STUDENT' ? 10 : undefined,
          school: primaryRole === 'TEACHER' || primaryRole === 'PROFESSOR' ? 'Lincoln High School' : undefined,
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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      init() {},

      /**
       * Initiates login via Keycloak redirect.
       * Accepts an optional credentials object (used by tests / dev fills)
       * but the real flow always redirects through Keycloak.
       */
      login(credentials?: { email?: string; password?: string }): void {
        patchState(store, { loading: true, error: null });
        authService.login({ email: credentials?.email }).catch((err: Error) => {
          patchState(store, { loading: false, error: err?.message ?? 'Login failed' });
        });
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
