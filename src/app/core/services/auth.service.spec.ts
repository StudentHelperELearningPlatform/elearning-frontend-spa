import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should not be authenticated', () => {
      expect(service.isAuthenticated()()).toBe(false);
    });

    it('should have null current user', () => {
      expect(service.currentUser()()).toBeNull();
    });

    it('should return null access token', () => {
      expect(service.getAccessToken()).toBeNull();
    });
  });

  describe('login()', () => {
    it('should return AuthResult for valid student credentials', async () => {
      const result = await firstValueFrom(
        service.login({ email: 'student@test.com', password: 'password' }),
      );
      expect(result.user.email).toBe('student@test.com');
      expect(result.user.roles).toContain('STUDENT');
      expect(result.accessToken).toBeTruthy();
    });

    it('should return AuthResult for valid teacher credentials', async () => {
      const result = await firstValueFrom(
        service.login({ email: 'teacher@test.com', password: 'password' }),
      );
      expect(result.user.roles).toContain('TEACHER');
    });

    it('should error on wrong password', async () => {
      let errorThrown = false;
      try {
        await firstValueFrom(service.login({ email: 'student@test.com', password: 'wrongpass' }));
      } catch (err: unknown) {
        errorThrown = true;
        const error = err as Error;
        expect(error.message).toBe('Invalid email or password');
      }
      expect(errorThrown).toBe(true);
    });

    it('should error on unknown email', async () => {
      let errorThrown = false;
      try {
        await firstValueFrom(service.login({ email: 'nobody@test.com', password: 'password' }));
      } catch (err: unknown) {
        errorThrown = true;
        const error = err as Error;
        expect(error.message).toBe('Invalid email or password');
      }
      expect(errorThrown).toBe(true);
    });

    it('should be case-insensitive for email', async () => {
      const result = await firstValueFrom(
        service.login({ email: 'STUDENT@TEST.COM', password: 'password' }),
      );
      expect(result.user.roles).toContain('STUDENT');
    });
  });

  describe('setSession() and isAuthenticated()', () => {
    it('should update signals after setSession()', async () => {
      const result = await firstValueFrom(
        service.login({ email: 'teacher@test.com', password: 'password' }),
      );
      service.setSession(result);
      expect(service.isAuthenticated()()).toBe(true);
      expect(service.currentUser()()).toEqual(result.user);
      expect(service.getAccessToken()).toBe(result.accessToken);
    });
  });

  describe('logout()', () => {
    it('should clear session on logout', async () => {
      const result = await firstValueFrom(
        service.login({ email: 'student@test.com', password: 'password' }),
      );
      service.setSession(result);
      service.logout();
      expect(service.isAuthenticated()()).toBe(false);
      expect(service.currentUser()()).toBeNull();
      expect(service.getAccessToken()).toBeNull();
    });
  });

  describe('hasRole()', () => {
    it('should return true for a role the user has', async () => {
      const result = await firstValueFrom(
        service.login({ email: 'admin@test.com', password: 'password' }),
      );
      service.setSession(result);
      expect(service.hasRole('ADMIN')()).toBe(true);
      expect(service.hasRole('STUDENT')()).toBe(false);
    });
  });
});
