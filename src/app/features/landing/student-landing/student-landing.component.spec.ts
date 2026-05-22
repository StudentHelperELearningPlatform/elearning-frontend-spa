import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StudentLandingComponent } from './student-landing.component';

describe('StudentLandingComponent', () => {
  let component: StudentLandingComponent;
  let fixture: ComponentFixture<StudentLandingComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLandingComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentLandingComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('UI Rendering', () => {
    it('should display the main hero text for students', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const h1 = compiled.querySelector('h1');
      expect(h1?.textContent).toContain('Your AI');
      expect(h1?.textContent).toContain('Study Buddy');
    });

    it('should display the core feature sections', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const headings = Array.from(compiled.querySelectorAll('h2')).map((el) =>
        el.textContent?.trim(),
      );
      expect(headings).toContain('Adaptive Paths');
      expect(headings).toContain('Gamified Learning');
    });

    it('should render correct call to action buttons', () => {
      const buttons = fixture.debugElement.queryAll(By.css('app-button'));
      expect(buttons.length).toBe(3);

      const ctaButtonText = buttons.map((b) => b.nativeElement.textContent.trim());
      expect(ctaButtonText.some((text) => text.includes('Start Learning'))).toBe(true);
      expect(ctaButtonText.some((text) => text.includes('Create Free Account'))).toBe(true);
      expect(ctaButtonText.some((text) => text.includes('Get Started'))).toBe(true);
    });
  });

  describe('Navigation Logic', () => {
    it('should navigate to login when navigateToAuth is called', async () => {
      const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

      component.navigateToAuth();
      await Promise.resolve();

      expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
    });
  });

  describe('Template Interactions', () => {
    it('should call navigateToAuth when the "Create Free Account" button is clicked', () => {
      const spy = vi.spyOn(component, 'navigateToAuth');
      const heroButton = fixture.debugElement
        .queryAll(By.css('app-button'))
        .find((el) => el.nativeElement.textContent.includes('Create Free Account'));

      expect(heroButton).toBeTruthy();
      heroButton?.triggerEventHandler('btnClick', null);

      expect(spy).toHaveBeenCalled();
    });

    it('should contain routerLink to home on the logo', () => {
      const logoContainer = fixture.debugElement.query(By.css('nav .cursor-pointer'));
      expect(logoContainer.attributes['routerLink']).toBe('/');
    });
  });
});
