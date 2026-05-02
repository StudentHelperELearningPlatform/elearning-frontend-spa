import { TestBed, ComponentFixture } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { AuthStore } from './features/auth/store/auth.store';
import { createAuthStoreStub } from '../test-utils/auth-testing';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: AuthStore, useValue: createAuthStoreStub() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
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
    const expectedValue = `Hello, ${component.title()}`;
    expect(h1Element?.textContent?.trim()).toBe(expectedValue);
  });
});
