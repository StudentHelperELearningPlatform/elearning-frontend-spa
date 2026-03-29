import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { AuthStore } from './features/auth/store/auth.store';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const mockAuthStore = {
    user: () => null,
    logout: jasmine.createSpy('logout'),
    isAuthenticated: () => false,
    isStudent: () => false,
    isTeacher: () => false,
    isParent: () => false,
    isAdmin: () => false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: AuthStore, useValue: mockAuthStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the current year', () => {
    expect(component.currentYear).toBe(new Date().getFullYear());
  });
});
