import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RegisterComponent } from './register.component';
import { API_URL } from '@core/tokens/api.token';
import { AuthService } from '@core/services/auth.service';
import { createAuthServiceStub } from '../../../../../test-utils/auth-testing';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CardComponent } from '@shared/components/card/card.component';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule, ButtonComponent, CardComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: createAuthServiceStub() },
        { provide: API_URL, useValue: '/api/v1' },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Password strength calculation', () => {
    it('returns weak for short password', () => {
      component.commonForm.get('password')?.setValue('Ab1');
      expect(component.getPasswordStrengthClass(1)).toBe('bg-red-500');
      expect(component.getPasswordStrengthClass(2)).toBe('bg-gray-200');
      expect(component.getPasswordStrengthClass(3)).toBe('bg-gray-200');
    });

    it('returns medium for 8-char with uppercase or number only', () => {
      component.commonForm.get('password')?.setValue('Abcdefgh');
      expect(component.getPasswordStrengthClass(1)).toBe('bg-yellow-500');
      expect(component.getPasswordStrengthClass(2)).toBe('bg-yellow-500');
      expect(component.getPasswordStrengthClass(3)).toBe('bg-gray-200');
    });

    it('returns strong for 8+ chars with uppercase AND number', () => {
      component.commonForm.get('password')?.setValue('Abcdefg1');
      expect(component.getPasswordStrengthClass(1)).toBe('bg-green-500');
      expect(component.getPasswordStrengthClass(2)).toBe('bg-green-500');
      expect(component.getPasswordStrengthClass(3)).toBe('bg-green-500');
    });
  });

  describe('Email format validation', () => {
    it('marks email invalid when empty', () => {
      component.commonForm.get('email')?.setValue('');
      component.commonForm.get('email')?.markAsTouched();
      expect(component.commonForm.get('email')?.hasError('required')).toBe(true);
    });

    it('marks email invalid for bad format', () => {
      component.commonForm.get('email')?.setValue('not-valid');
      component.commonForm.get('email')?.markAsTouched();
      expect(component.commonForm.get('email')?.hasError('email')).toBe(true);
    });

    it('marks email valid for correct format', () => {
      component.commonForm.get('email')?.setValue('user@example.com');
      expect(component.commonForm.get('email')?.hasError('email')).toBeFalsy();
      expect(component.commonForm.get('email')?.hasError('required')).toBeFalsy();
    });
  });

  describe('Password match validation', () => {
    it('returns passwordMismatch when passwords differ', () => {
      component.commonForm.get('password')?.setValue('Password1');
      component.commonForm.get('confirmPassword')?.setValue('Different1');
      expect(component.commonForm.hasError('passwordMismatch')).toBe(true);
    });

    it('no passwordMismatch when passwords match', () => {
      component.commonForm.get('password')?.setValue('Password1');
      component.commonForm.get('confirmPassword')?.setValue('Password1');
      expect(component.commonForm.hasError('passwordMismatch')).toBeFalsy();
    });
  });

  describe('Password visibility toggle', () => {
    it('defaults to false for both password and confirm password', () => {
      expect(component.showPassword()).toBe(false);
      expect(component.showConfirmPassword()).toBe(false);
    });

    it('toggles password visibility correctly', () => {
      component.togglePasswordVisibility();
      expect(component.showPassword()).toBe(true);

      component.togglePasswordVisibility();
      expect(component.showPassword()).toBe(false);
    });

    it('toggles confirm password visibility correctly', () => {
      component.toggleConfirmPasswordVisibility();
      expect(component.showConfirmPassword()).toBe(true);

      component.toggleConfirmPasswordVisibility();
      expect(component.showConfirmPassword()).toBe(false);
    });
  });

  describe('Navigation and Role Submission', () => {
    it('sets validators and resets form when role is chosen', () => {
      component.selectRole('STUDENT');
      expect(component.selectedRole()).toBe('STUDENT');
      expect(component.specificForm.get('gradeLevel')?.validator).toBeTruthy();
      expect(component.specificForm.get('schoolName')?.validator).toBeFalsy();

      component.selectRole('TEACHER');
      expect(component.selectedRole()).toBe('TEACHER');
      expect(component.specificForm.get('schoolName')?.validator).toBeTruthy();
      expect(component.specificForm.get('gradeLevel')?.validator).toBeFalsy();

      component.selectRole('ADMIN');
      expect(component.selectedRole()).toBe('ADMIN');
      expect(component.specificForm.get('gradeLevel')?.validator).toBeFalsy();
      expect(component.specificForm.get('schoolName')?.validator).toBeFalsy();
    });

    it('navigates next/prev steps correctly but prevents ADMIN role from moving past step 1', () => {
      component.currentStep.set('ROLE');
      component.selectRole('ADMIN');
      component.goToNextStep();
      expect(component.currentStep()).toBe('ROLE'); // Blocks admin!

      component.selectRole('STUDENT');
      component.goToNextStep();
      expect(component.currentStep()).toBe('COMMON');

      component.goToPrevStep();
      expect(component.currentStep()).toBe('ROLE');
    });

    it('navigates to SPECIFIC step if commonForm is valid', () => {
      component.currentStep.set('COMMON');
      component.commonForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password1',
        confirmPassword: 'Password1'
      });
      // Force validity for the async validator / controls
      Object.defineProperty(component.commonForm, 'valid', { get: () => true });

      component.goToNextStep();
      expect(component.currentStep()).toBe('SPECIFIC');

      component.goToPrevStep();
      expect(component.currentStep()).toBe('COMMON');
    });

    it('manages subject selection for teacher role', () => {
      component.toggleSubject('Math');
      expect(component.isSubjectSelected('Math')).toBe(true);

      component.toggleSubject('Math');
      expect(component.isSubjectSelected('Math')).toBe(false);
    });

    it('should complete student registration successfully', () => {
      const authService = TestBed.inject(AuthService);
      const registerSpy = vi.spyOn(authService, 'register').mockReturnValue(of({}));
      const router = TestBed.inject(Router);
      const routerSpy = vi.spyOn(router, 'navigate');

      component.selectedRole.set('STUDENT');
      component.commonForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password1',
        confirmPassword: 'Password1'
      });
      component.specificForm.patchValue({
        gradeLevel: '10'
      });

      // Force validity
      Object.defineProperty(component.commonForm, 'valid', { get: () => true });
      Object.defineProperty(component.specificForm, 'valid', { get: () => true });

      component.onSubmit();
      expect(registerSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith(['/auth/login']);
    });

    it('handles registration conflicts and general errors correctly', () => {
      const authService = TestBed.inject(AuthService);
      const registerSpy = vi.spyOn(authService, 'register').mockReturnValue(
        throwError(() => ({ status: 409 }))
      );

      component.selectedRole.set('STUDENT');
      // Force validity
      Object.defineProperty(component.commonForm, 'valid', { get: () => true });
      Object.defineProperty(component.specificForm, 'valid', { get: () => true });

      component.onSubmit();
      expect(component.registrationError).toBe('This email is already registered.');

      registerSpy.mockReturnValue(throwError(() => ({ status: 500 })));
      component.onSubmit();
      expect(component.registrationError).toBe('Registration failed. Please try again.');
    });
  });
});

