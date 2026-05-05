import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthStore } from '../../features/auth/store/auth.store';
import { provideRouter } from '@angular/router';
import { createAuthStoreStub } from '../../../test-utils/auth-testing';

describe('authGuard', () => {
  let router: Router;

  const mockRoute = {} as ActivatedRouteSnapshot;

  const runGuard = (url: string) => {
    const mockState = { url } as RouterStateSnapshot;
    return TestBed.runInInjectionContext(() => authGuard(mockRoute, mockState));
  };

  const setup = (isAuthenticated: boolean) => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthStore, useValue: createAuthStoreStub({ isAuthenticated }) },
      ],
    });
    router = TestBed.inject(Router);
  };

  it('should allow access when authenticated', () => {
    setup(true);
    const result = runGuard('/student');
    expect(result).toBe(true);
  });

  it('should redirect to /auth/login when not authenticated', () => {
    setup(false);
    const result = runGuard('/student');
    expect(result).not.toBe(true);
    const urlTree = router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: '/student' },
    });
    expect(result.toString()).toBe(urlTree.toString());
  });

  it('should include returnUrl in redirect', () => {
    setup(false);
    const result = runGuard('/teacher/lessons');
    const urlTree = router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: '/teacher/lessons' },
    });
    expect(result.toString()).toBe(urlTree.toString());
  });
});
