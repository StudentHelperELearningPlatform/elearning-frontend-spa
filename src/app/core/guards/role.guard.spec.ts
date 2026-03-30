import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { roleGuard } from './role.guard';
import { provideRouter } from '@angular/router';

describe('roleGuard', () => {
  let router: Router;

  const mockState = {} as RouterStateSnapshot;

  const runGuard = (roles: string[]) => {
    const mockRoute = { data: { roles } } as unknown as ActivatedRouteSnapshot;
    return TestBed.runInInjectionContext(() => roleGuard(mockRoute, mockState));
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
    router = TestBed.inject(Router);
  });

  it('should allow access when no roles are required', () => {
    const result = runGuard([]);
    expect(result).toBe(true);
  });

  it('should redirect to /unauthorized when user has no roles (unauthenticated state)', () => {
    const result = runGuard(['STUDENT']);
    const urlTree = router.createUrlTree(['/unauthorized']);
    expect(result.toString()).toBe(urlTree.toString());
  });

  it('should redirect to /unauthorized for wrong role', () => {
    const result = runGuard(['ADMIN']);
    const urlTree = router.createUrlTree(['/unauthorized']);
    expect(result.toString()).toBe(urlTree.toString());
  });
});
