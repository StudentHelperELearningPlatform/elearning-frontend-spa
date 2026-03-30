import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges(); // Ensure the template updates
    const compiled = fixture.nativeElement as HTMLElement;

    // Use a more resilient check or ensure the h1 exists
    const h1Text = compiled.querySelector('h1')?.textContent;
    expect(h1Text).toBeDefined();
    expect(h1Text).toContain('Expected Title Here');
  });
});
