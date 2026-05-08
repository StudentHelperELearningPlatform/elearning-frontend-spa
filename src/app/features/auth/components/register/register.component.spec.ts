import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterComponent } from './register.component';
import { API_URL } from '@core/tokens/api.token';
import { AuthService } from '@core/services/auth.service';
import { createAuthServiceStub } from '../../../../../test-utils/auth-testing';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CardComponent } from '@shared/components/card/card.component';

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
});
