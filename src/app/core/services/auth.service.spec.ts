import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

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
    it('should return AuthResult for valid student credentials', (done) => {
      service.login({ email: 'student@test.com', password: 'password' }).subscribe({
        next: (result) => {
          expect(result.user.email).toBe('student@test.com');
          expect(result.user.roles).toContain('STUDENT');
          expect(result.accessToken).toBeTruthy();
          done();
        },
      });
    });

    it('should return AuthResult for valid teacher credentials', (done) => {
      service.login({ email: 'teacher@test.com', password: 'password' }).subscribe({
        next: (result) => {
          expect(result.user.roles).toContain('TEACHER');
          done();
        },
      });
    });

    it('should error on wrong password', (done) => {
      service.login({ email: 'student@test.com', password: 'wrongpass' }).subscribe({
        error: (err) => {
          expect(err.message).toBe('Invalid email or password');
          done();
        },
      });
    });

    it('should error on unknown email', (done) => {
      service.login({ email: 'nobody@test.com', password: 'password' }).subscribe({
        error: (err) => {
          expect(err.message).toBe('Invalid email or password');
          done();
        },
      });
    });

    it('should be case-insensitive for email', (done) => {
      service.login({ email: 'STUDENT@TEST.COM', password: 'password' }).subscribe({
        next: (result) => {
          expect(result.user.roles).toContain('STUDENT');
          done();
        },
      });
    });
  });

  describe('setSession() and isAuthenticated()', () => {
    it('should update signals after setSession()', (done) => {
      service.login({ email: 'teacher@test.com', password: 'password' }).subscribe({
        next: (result) => {
          service.setSession(result);
          expect(service.isAuthenticated()()).toBe(true);
          expect(service.currentUser()()).toEqual(result.user);
          expect(service.getAccessToken()).toBe(result.accessToken);
          done();
        },
      });
    });
  });

  describe('logout()', () => {
    it('should clear session on logout', (done) => {
      service.login({ email: 'student@test.com', password: 'password' }).subscribe({
        next: (result) => {
          service.setSession(result);
          service.logout();
          expect(service.isAuthenticated()()).toBe(false);
          expect(service.currentUser()()).toBeNull();
          expect(service.getAccessToken()).toBeNull();
          done();
        },
      });
    });
  });

  describe('hasRole()', () => {
    it('should return true for a role the user has', (done) => {
      service.login({ email: 'admin@test.com', password: 'password' }).subscribe({
        next: (result) => {
          service.setSession(result);
          expect(service.hasRole('ADMIN')()).toBe(true);
          expect(service.hasRole('STUDENT')()).toBe(false);
          done();
        },
      });
    });
  });
});
