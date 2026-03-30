import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthStore } from '../../features/auth/store/auth.store';
import { provideRouter } from '@angular/router';

describe('authGuard', () => {
  let router: Router;

  const mockRoute = {} as ActivatedRouteSnapshot;

  const runGuard = (url: string) => {
    const mockState = { url } as RouterStateSnapshot;
    return TestBed.runInInjectionContext(() => authGuard(mockRoute, mockState));
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
    router = TestBed.inject(Router);
  });

  it('should allow access when authenticated', () => {
    const authStore = TestBed.inject(AuthStore) as unknown as { isAuthenticated: () => boolean };

    // Now TypeScript knows exactly what you're trying to override
    authStore.isAuthenticated = () => true;

    const result = runGuard('/student');
    expect(result).toBe(true);
  });

  it('should redirect to /auth/login when not authenticated', () => {
    const result = runGuard('/student');
    expect(result).not.toBe(true);
    // Result should be a UrlTree pointing to login
    const urlTree = router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: '/student' },
    });
    expect(result.toString()).toBe(urlTree.toString());
  });

  it('should include returnUrl in redirect', () => {
    const result = runGuard('/teacher/lessons');
    const urlTree = router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: '/teacher/lessons' },
    });
    expect(result.toString()).toBe(urlTree.toString());
  });
});
