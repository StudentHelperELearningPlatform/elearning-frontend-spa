import { TestBed, ComponentFixture } from '@angular/core/testing';
import { App } from './app';
import { AuthStore } from './features/auth/store/auth.store';
import { createAuthStoreStub } from '../test-utils/auth-testing';
import { provideApiMocks } from '../test-utils/api-testing';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: AuthStore, useValue: createAuthStoreStub({ isAuthenticated: true }) },
        ...provideApiMocks(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;

    // Initial change detection to initialize the Signal and template
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
