import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';
import { AuthStore } from '@features/auth/store/auth.store';
import { signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let mockAuthStore: {
    isAuthenticated: ReturnType<typeof signal<boolean>>;
    user: ReturnType<typeof signal<{ name: string }>>;
    role: ReturnType<typeof signal<string>>;
    logout: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockAuthStore = {
      isAuthenticated: signal(true),
      user: signal({ name: 'Elena Dumitrescu' }),
      role: signal('TEACHER'),
      logout: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: USER_PLATFORM_API_URL, useValue: 'http://mock-api/api/v1' },
        { provide: AuthStore, useValue: mockAuthStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should navigate to student profile if role is student', () => {
    mockAuthStore.role.set('student');
    fixture.detectChanges();

    const spyNavigate = vi.spyOn(router, 'navigate');
    component.navigateToProfile();
    expect(spyNavigate).toHaveBeenCalledWith(['/student/profile']);
  });

  it('should navigate to teacher profile if role is teacher or professor', () => {
    mockAuthStore.role.set('PROFESSOR');
    fixture.detectChanges();

    const spyNavigate = vi.spyOn(router, 'navigate');
    component.navigateToProfile();
    expect(spyNavigate).toHaveBeenCalledWith(['/teacher/profile']);
  });

  it('should navigate to home if role is fallback', () => {
    mockAuthStore.role.set('ADMIN');
    fixture.detectChanges();

    const spyNavigate = vi.spyOn(router, 'navigate');
    component.navigateToProfile();
    expect(spyNavigate).toHaveBeenCalledWith(['/']);
  });

  it('should call logout and navigate to login', () => {
    fixture.detectChanges();

    const spyNavigate = vi.spyOn(router, 'navigate');
    component.logout();
    expect(mockAuthStore.logout).toHaveBeenCalled();
    expect(spyNavigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should return correct initials', () => {
    expect(component.getInitials('John Doe')).toBe('JD');
    expect(component.getInitials('Single')).toBe('SI');
    expect(component.getInitials('')).toBe('U');
  });
});
