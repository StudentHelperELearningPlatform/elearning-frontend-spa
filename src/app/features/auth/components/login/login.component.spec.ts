import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthStore } from '../../store/auth.store';
import { createAuthStoreStub } from '../../../../../test-utils/auth-testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        { provide: AuthStore, useValue: createAuthStoreStub() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Log In button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll('button'));
    expect(buttons.some(b => b.textContent?.includes('Log In'))).toBe(true);
  });

  it('should render the Create Account link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a[href="/auth/register"]')).toBeTruthy();
  });

  it('should call authStore.login when Log In is clicked', () => {
    const loginSpy = vi.spyOn(component['authStore'], 'login');
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;
    button.click();
    expect(loginSpy).toHaveBeenCalled();
  });
});
