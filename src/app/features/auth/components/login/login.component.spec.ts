import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form validation', () => {
    it('should start with an invalid form', () => {
      expect(component.loginForm.invalid).toBe(true);
    });

    it('should require email', () => {
      component.emailControl?.setValue('');
      expect(component.emailControl?.errors?.['required']).toBeTruthy();
    });

    it('should reject invalid email format', () => {
      component.emailControl?.setValue('notanemail');
      expect(component.emailControl?.errors?.['email']).toBeTruthy();
    });

    it('should accept valid email', () => {
      component.emailControl?.setValue('student@test.com');
      expect(component.emailControl?.valid).toBe(true);
    });

    it('should require password', () => {
      component.passwordControl?.setValue('');
      expect(component.passwordControl?.errors?.['required']).toBeTruthy();
    });

    it('should be valid with correct email and password', () => {
      component.emailControl?.setValue('student@test.com');
      component.passwordControl?.setValue('password');
      expect(component.loginForm.valid).toBe(true);
    });
  });

  describe('onSubmit()', () => {
    it('should mark all fields as touched when form is invalid', () => {
      component.onSubmit();
      expect(component.emailControl?.touched).toBe(true);
      expect(component.passwordControl?.touched).toBe(true);
    });

    it('should not submit when form is invalid', () => {
      const loginSpy = vi.spyOn(component['authStore'], 'login');
      component.onSubmit();
      expect(loginSpy).not.toHaveBeenCalled();
    });

    it('should call authStore.login with form values when valid', () => {
      const loginSpy = vi.spyOn(component['authStore'], 'login');
      component.emailControl?.setValue('student@test.com');
      component.passwordControl?.setValue('password');
      component.onSubmit();
      expect(loginSpy).toHaveBeenCalledWith({
        email: 'student@test.com',
        password: 'password',
      });
    });
  });

  describe('togglePassword()', () => {
    it('should toggle showPassword', () => {
      expect(component.showPassword).toBe(false);
      component.togglePassword();
      expect(component.showPassword).toBe(true);
      component.togglePassword();
      expect(component.showPassword).toBe(false);
    });
  });

  describe('fillMockUser()', () => {
    it('should fill email and set password to "password"', () => {
      component.fillMockUser('teacher@test.com');
      expect(component.emailControl?.value).toBe('teacher@test.com');
      expect(component.passwordControl?.value).toBe('password');
    });
  });

  describe('template rendering', () => {
    it('should render the login form', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('form')).toBeTruthy();
      expect(compiled.querySelector('#email')).toBeTruthy();
      expect(compiled.querySelector('#password')).toBeTruthy();
      expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
    });

    it('should show dev helper buttons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const devButtons = compiled.querySelectorAll('.btn-dev');
      expect(devButtons.length).toBe(4);
    });
  });
});
