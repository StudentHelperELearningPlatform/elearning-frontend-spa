import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { roleGuard } from './role.guard';
import { provideRouter } from '@angular/router';
import { AuthStore } from '../../features/auth/store/auth.store';
import { createAuthStoreStub } from '../../../test-utils/auth-testing';

describe('roleGuard', () => {
  let router: Router;

  const mockState = {} as RouterStateSnapshot;

  const runGuard = (roles: string[]) => {
    const mockRoute = { data: { roles } } as unknown as ActivatedRouteSnapshot;
    return TestBed.runInInjectionContext(() => roleGuard(mockRoute, mockState));
  };

  const setup = (userRoles: string[] = []) => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthStore,
          useValue: createAuthStoreStub({ roles: userRoles, isAuthenticated: userRoles.length > 0 }),
        },
      ],
    });
    router = TestBed.inject(Router);
  };

  it('should allow access when no roles are required', () => {
    setup([]);
    const result = runGuard([]);
    expect(result).toBe(true);
  });

  it('should redirect to /unauthorized when user has no roles (unauthenticated state)', () => {
    setup([]);
    const result = runGuard(['STUDENT']);
    const urlTree = router.createUrlTree(['/unauthorized']);
    expect(result.toString()).toBe(urlTree.toString());
  });

  it('should redirect to /unauthorized for wrong role', () => {
    setup(['STUDENT']);
    const result = runGuard(['ADMIN']);
    const urlTree = router.createUrlTree(['/unauthorized']);
    expect(result.toString()).toBe(urlTree.toString());
  });

  it('should allow access when user has the required role', () => {
    setup(['STUDENT']);
    const result = runGuard(['STUDENT']);
    expect(result).toBe(true);
  });
});
