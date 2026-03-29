import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthStore } from '../store/auth.store';
import { provideRouter } from '@angular/router';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  const mockAuthStore = {
    login: jasmine.createSpy('login'),
    loading: () => false,
    error: () => null,
    user: () => null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        { provide: AuthStore, useValue: mockAuthStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form invalid when empty and submitted', () => {
    component.onSubmit();
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should call authStore.login with correct credentials', () => {
    component.loginForm.setValue({
      email: 'student@test.com',
      password: 'password',
    });
    component.onSubmit();
    expect(mockAuthStore.login).toHaveBeenCalledWith({
      email: 'student@test.com',
      password: 'password',
    });
  });
});
