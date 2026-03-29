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

  it('should start unauthenticated', () => {
    expect(service.isAuthenticated()()).toBeFalse();
    expect(service.currentUser()()).toBeNull();
  });

  it('should resolve with student AuthResult for valid student credentials', async () => {
    const result = await firstValueFrom(service.login('student@test.com', 'password'));
    expect(result.user.role).toBe('STUDENT');
    expect(result.user.email).toBe('student@test.com');
  });

  it('should resolve with teacher AuthResult for valid teacher credentials', async () => {
    const result = await firstValueFrom(service.login('teacher@test.com', 'password'));
    expect(result.user.role).toBe('TEACHER');
  });

  it('should throw for invalid credentials', async () => {
    await expectAsync(
      firstValueFrom(service.login('nobody@test.com', 'wrong'))
    ).toBeRejectedWithError('Invalid email or password');
  });

  it('should set session and mark user authenticated', async () => {
    const result = await firstValueFrom(service.login('admin@test.com', 'password'));
    service.setSession(result);

    expect(service.isAuthenticated()()).toBeTrue();
    expect(service.currentUser()()?.role).toBe('ADMIN');
    expect(service.getAccessToken()).toBe('mock-access-token-admin');
  });

  it('should clear session on logout', async () => {
    const result = await firstValueFrom(service.login('student@test.com', 'password'));
    service.setSession(result);
    service.logout();

    expect(service.isAuthenticated()()).toBeFalse();
    expect(service.currentUser()()).toBeNull();
    expect(service.getAccessToken()).toBeNull();
  });

  it('should return correct hasRole signal', async () => {
    const result = await firstValueFrom(service.login('teacher@test.com', 'password'));
    service.setSession(result);

    expect(service.hasRole('TEACHER')()).toBeTrue();
    expect(service.hasRole('STUDENT')()).toBeFalse();
  });
});
