import { TestBed } from '@angular/core/testing';
import { AuthStore } from './auth.store';
import { AuthService } from '../../../core/services/auth.service';
import { signal, WritableSignal } from '@angular/core';

describe('AuthStore', () => {
  let authServiceMock: {
    isAuthenticated: WritableSignal<boolean>;
    currentUser: WritableSignal<() => unknown>;
    getAccessToken: ReturnType<typeof vi.fn>;
    login: ReturnType<typeof vi.fn>;
    logout: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    authServiceMock = {
      isAuthenticated: signal(false),
      currentUser: signal(() => null),
      getAccessToken: vi.fn().mockReturnValue(null),
      login: vi.fn().mockResolvedValue(undefined),
      logout: vi.fn().mockResolvedValue(undefined),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthStore,
        { provide: AuthService, useValue: authServiceMock }
      ],
    });
  });

  it('should be created with initial state', () => {
    const store = TestBed.inject(AuthStore);
    expect(store).toBeTruthy();
    expect(store.user()).toBeNull();
    expect(store.isAuthenticated()).toBe(false);
    expect(store.loading()).toBe(false);
  });

  describe('login', () => {
    it('should set loading to true and call authService.login', async () => {
      const store = TestBed.inject(AuthStore);
      
      store.login({ email: 'test@example.com' });
      
      expect(store.loading()).toBe(true);
      expect(authServiceMock.login).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    it('should set error if login fails', async () => {
      const store = TestBed.inject(AuthStore);
      authServiceMock.login.mockRejectedValue(new Error('Invalid credentials'));
      
      store.login({ email: 'test@example.com' });
      
      // Wait for promise rejection
      await new Promise(resolve => setTimeout(resolve, 0));
      
      expect(store.loading()).toBe(false);
      expect(store.error()).toBe('Invalid credentials');
    });
  });

  describe('reactive effect', () => {
    it('should update state when AuthService emits authenticated user', () => {
      const store = TestBed.inject(AuthStore);
      
      // Simulate login in service
      authServiceMock.isAuthenticated.set(true);
      authServiceMock.currentUser.set(() => ({ 
        email: 'student@test.com', 
        roles: ['STUDENT'] 
      }));
      authServiceMock.getAccessToken.mockReturnValue('new-token');
      
      // Effects run asynchronously, so we wait a tick
      TestBed.flushEffects();
      
      expect(store.isAuthenticated()).toBe(true);
      expect(store.user()?.email).toBe('student@test.com');
      expect(store.role()).toBe('STUDENT');
      expect(store.token()).toBe('new-token');
    });

    it('should map ADMIN role correctly', () => {
      const store = TestBed.inject(AuthStore);
      authServiceMock.isAuthenticated.set(true);
      authServiceMock.currentUser.set(() => ({ 
        email: 'admin@test.com', 
        roles: ['ADMIN'] 
      }));
      TestBed.flushEffects();
      expect(store.role()).toBe('ADMIN');
    });

    it('should map TEACHER/PROFESSOR role correctly', () => {
      const store = TestBed.inject(AuthStore);
      authServiceMock.isAuthenticated.set(true);
      authServiceMock.currentUser.set(() => ({ 
        email: 'teacher@test.com', 
        roles: ['PROFESSOR'] 
      }));
      TestBed.flushEffects();
      expect(store.role()).toBe('TEACHER');
    });
  });

  describe('logout', () => {
    it('should call authService.logout and clear state', async () => {
      const store = TestBed.inject(AuthStore);
      
      await store.logout();
      
      expect(authServiceMock.logout).toHaveBeenCalled();
      expect(store.user()).toBeNull();
      expect(store.token()).toBeNull();
    });
  });
});
