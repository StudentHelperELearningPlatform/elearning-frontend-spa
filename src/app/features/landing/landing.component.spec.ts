import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
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
    it('should display the main hero text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const h1 = compiled.querySelector('h1');
      expect(h1?.textContent).toContain('Learn Faster');
      expect(h1?.textContent).toContain('Teach Smarter');
    });

    it('should display all three feature cards', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const headings = Array.from(compiled.querySelectorAll('h3')).map((el) =>
        el.textContent?.trim(),
      );
      expect(headings).toContain('For Students');
      expect(headings).toContain('For Teachers');
      expect(headings).toContain('For Parents');
    });

    it('should render multiple app-buttons for calls to action', () => {
      const buttons = fixture.debugElement.queryAll(By.css('app-button'));
      expect(buttons.length).toBeGreaterThan(0);

      const ctaButtonText = buttons.map((b) => b.nativeElement.textContent.trim());
      expect(ctaButtonText.some((text) => text.includes('Signup / Login'))).toBe(true);
      expect(ctaButtonText.some((text) => text.includes('Get Started Now'))).toBe(true);
      expect(ctaButtonText.some((text) => text.includes('Join the Platform'))).toBe(true);
    });
  });

  describe('Navigation Logic', () => {
    it('should navigate to login when navigateToAuth is called', async () => {
      const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

      component.navigateToAuth();
      await Promise.resolve(); // Flush the promise returned by router.navigate

      expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
    });

    it('should navigate to provided path when navigateAndScroll is called', async () => {
      const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
      const testPath = '/for-students';

      component.navigateAndScroll(testPath);
      await Promise.resolve(); // Flush the promise returned by router.navigate

      expect(navigateSpy).toHaveBeenCalledWith([testPath]);
    });
  });

  describe('Template Interactions', () => {
    it('should call navigateAndScroll with correct path when Student card is clicked', () => {
      const spy = vi.spyOn(component, 'navigateAndScroll');
      const studentCard = fixture.debugElement
        .queryAll(By.css('.group.cursor-pointer'))
        .find((el) => el.nativeElement.textContent.includes('For Students'));

      expect(studentCard).toBeTruthy();
      studentCard?.nativeElement.click();

      expect(spy).toHaveBeenCalledWith('/for-students');
    });

    it('should call navigateAndScroll with correct path when Teacher card is clicked', () => {
      const spy = vi.spyOn(component, 'navigateAndScroll');
      const teacherCard = fixture.debugElement
        .queryAll(By.css('.group.cursor-pointer'))
        .find((el) => el.nativeElement.textContent.includes('For Teachers'));

      expect(teacherCard).toBeTruthy();
      teacherCard?.nativeElement.click();

      expect(spy).toHaveBeenCalledWith('/for-teachers');
    });

    it('should call navigateAndScroll with correct path when Parent card is clicked', () => {
      const spy = vi.spyOn(component, 'navigateAndScroll');
      const parentCard = fixture.debugElement
        .queryAll(By.css('.group.cursor-pointer'))
        .find((el) => el.nativeElement.textContent.includes('For Parents'));

      expect(parentCard).toBeTruthy();
      parentCard?.nativeElement.click();

      expect(spy).toHaveBeenCalledWith('/for-parents');
    });

    it('should call navigateToAuth when the "Join the Platform" bottom CTA is clicked', () => {
      const spy = vi.spyOn(component, 'navigateToAuth');
      const bottomCTAButton = fixture.debugElement
        .queryAll(By.css('app-button'))
        .find((el) => el.nativeElement.textContent.includes('Join the Platform'));

      expect(bottomCTAButton).toBeTruthy();
      bottomCTAButton?.triggerEventHandler('btnClick', null);

      expect(spy).toHaveBeenCalled();
    });
  });
});
