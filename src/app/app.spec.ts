import { TestBed, ComponentFixture } from '@angular/core/testing';
import { App } from './app'; // Double-check this name/path

describe('AppComponent', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initial render
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    // 1. Wait for any async logic (like Signals or Observables) to finish
    await fixture.whenStable();

    // 2. Trigger detection again to capture the updated state
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const h1Element = compiled.querySelector('h1');

    // 3. Assertions
    expect(h1Element).not.toBeNull();
    expect(h1Element?.textContent).toContain('E-Learning Platform');
  });
});
