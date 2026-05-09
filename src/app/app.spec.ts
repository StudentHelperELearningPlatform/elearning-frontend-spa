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

  it('should render title from signal', async () => {
    await fixture.whenStable();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const h1Element = compiled.querySelector('h1');

    expect(h1Element).not.toBeNull();

    // Use the component's title signal directly to ensure the test stays in sync
    const expectedValue = `Hello, ${component.title()}`;
    expect(h1Element?.textContent?.trim()).toBe(expectedValue);
  });
});
