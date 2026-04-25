import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { timer, of, Observable } from 'rxjs';
import { switchMap, map, catchError, first } from 'rxjs/operators';

type RegistrationStep = 'ROLE' | 'COMMON' | 'SPECIFIC';
type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent, CardComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-white p-4 font-sans text-black">
      <div class="w-full max-w-2xl bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 overflow-hidden">
        
        <!-- Header -->
        <div class="mb-10 text-center">
          <h2 class="text-5xl font-black text-black tracking-tighter mb-2 uppercase italic">Join the Future</h2>
          <p class="text-gray-600 font-bold text-lg">Step {{ currentStepNumber() }} of 3: {{ stepTitle() }}</p>
          
          <!-- Progress Bar -->
          <div class="mt-6 h-4 bg-gray-100 border-2 border-black rounded-full overflow-hidden">
            <div class="h-full bg-[var(--color-primary)] transition-all duration-500 border-r-2 border-black" [style.width.%]="progress()"></div>
          </div>
        </div>

        <!-- Step 1: Role Selection -->
        @if (currentStep() === 'ROLE') {
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <app-card [hoverable]="true" (click)="selectRole('STUDENT')" [selected]="selectedRole() === 'STUDENT'" class="cursor-pointer">
                <div class="text-center py-4">
                  <span class="material-icons text-5xl mb-4 text-[var(--color-primary)]">school</span>
                  <h3 class="text-xl font-black mb-2">Student</h3>
                  <p class="text-sm font-bold text-gray-600">Learn at your own pace with AI help.</p>
                </div>
              </app-card>

              <app-card [hoverable]="true" (click)="selectRole('TEACHER')" [selected]="selectedRole() === 'TEACHER'" class="cursor-pointer">
                <div class="text-center py-4">
                  <span class="material-icons text-5xl mb-4 text-[var(--color-primary)]">co_present</span>
                  <h3 class="text-xl font-black mb-2">Teacher</h3>
                  <p class="text-sm font-bold text-gray-600">Create content and track class progress.</p>
                </div>
              </app-card>

              <app-card [hoverable]="true" (click)="selectRole('PARENT')" [selected]="selectedRole() === 'PARENT'" class="cursor-pointer">
                <div class="text-center py-4">
                  <span class="material-icons text-5xl mb-4 text-[var(--color-primary)]">family_restroom</span>
                  <h3 class="text-xl font-black mb-2">Parent</h3>
                  <p class="text-sm font-bold text-gray-600">Monitor your child's learning journey.</p>
                </div>
              </app-card>

              <app-card [hoverable]="true" (click)="selectRole('ADMIN')" [selected]="selectedRole() === 'ADMIN'" class="cursor-pointer">
                <div class="text-center py-4">
                  <span class="material-icons text-5xl mb-4 text-[var(--color-primary)]">settings</span>
                  <h3 class="text-xl font-black mb-2">Admin</h3>
                  <p class="text-sm font-bold text-gray-600">Manage the platform and users.</p>
                </div>
              </app-card>
            </div>
          </div>
          
          <div class="mt-10 flex justify-end">
            <app-button (click)="goToNextStep()" [disabled]="!selectedRole()" variant="primary" size="lg">
              Next Step <span class="material-icons ml-2">arrow_forward</span>
            </app-button>
          </div>
        }

        <!-- Step 2: Common Fields -->
        @if (currentStep() === 'COMMON') {
          <form [formGroup]="commonForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-lg font-black text-black mb-2 uppercase tracking-tight">Full Name</label>
                <input id="name" type="text" formControlName="name" placeholder="John Doe" class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[var(--color-primary)]/5 font-bold">
              </div>
              <div>
                <label for="email" class="block text-lg font-black text-black mb-2 uppercase tracking-tight">Email Address</label>
                <input 
                  id="email" 
                  type="email" 
                  formControlName="email" 
                  placeholder="john@example.com" 
                  class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[var(--color-primary)]/5 font-bold"
                >

                @if (commonForm.get('email')?.hasError('emailTaken') && !commonForm.get('email')?.pending) {
                  <span class="text-sm font-bold text-[var(--color-error)]">
                    This email is already registered
                  </span>
                }

                @if (commonForm.get('email')?.pending) {
                  <span class="text-xs font-bold text-[var(--color-primary)]">
                    ⏳ Checking availability...
                  </span>
                }
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="password" class="block text-lg font-black text-black mb-2 uppercase tracking-tight">Password</label>
                <input id="password" type="password" formControlName="password" placeholder="••••••••" class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[var(--color-primary)]/5 font-bold">
                
                <!-- Password Strength -->
                <div class="mt-2 flex gap-1 h-2">
                  @for (i of [1,2,3]; track i) {
                    <div class="flex-1 rounded-full border-2 border-black" [ngClass]="getPasswordStrengthClass(i)"></div>
                  }
                </div>
                <p class="text-xs font-bold mt-1 text-gray-500 uppercase">Min 8 chars, 1 uppercase, 1 number</p>
              </div>
              <div>
                <label for="confirmPassword" class="block text-lg font-black text-black mb-2 uppercase tracking-tight">Confirm Password</label>
                <input id="confirmPassword" type="password" formControlName="confirmPassword" placeholder="••••••••" class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[var(--color-primary)]/5 font-bold">
                @if (commonForm.errors?.['passwordMismatch'] && commonForm.get('confirmPassword')?.touched) {
                  <p class="text-red-500 text-xs font-bold mt-1 uppercase">Passwords do not match</p>
                }
              </div>
            </div>

            <div class="mt-10 flex justify-between">
              <app-button (click)="goToPrevStep()" variant="secondary" size="lg">
                <span class="material-icons mr-2">arrow_back</span> Back
              </app-button>
              <app-button (click)="goToNextStep()" [disabled]="commonForm.invalid" variant="primary" size="lg">
                Next Step <span class="material-icons ml-2">arrow_forward</span>
              </app-button>
            </div>
          </form>
        }

        <!-- Step 3: Role Specific Fields -->
        @if (currentStep() === 'SPECIFIC') {
          <form [formGroup]="specificForm" class="space-y-6">
            
            @if (selectedRole() === 'STUDENT') {
              <div>
                <label for="gradeLevel" class="block text-lg font-black text-black mb-2 uppercase tracking-tight">Grade Level</label>
                <select id="gradeLevel" formControlName="gradeLevel" class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[var(--color-primary)]/5 font-bold bg-white">
                  <option value="">Select Grade</option>
                  @for (grade of grades; track grade) {
                    <option [value]="grade">{{ grade }}</option>
                  }
                </select>
              </div>
            }

            @if (selectedRole() === 'TEACHER') {
              <div class="space-y-6">
                <div>
                  <label for="schoolName" class="block text-lg font-black text-black mb-2 uppercase tracking-tight">School Name</label>
                  <input id="schoolName" type="text" formControlName="schoolName" placeholder="Lincoln High School" class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[var(--color-primary)]/5 font-bold">
                </div>
                <div>
                  <label for="subjects" class="block text-lg font-black text-black mb-2 uppercase tracking-tight">Subjects Taught</label>
                  <div id="subjects" class="grid grid-cols-2 gap-4">
                    <div class="flex flex-wrap gap-3">
                      @for (subject of subjects; track subject) {
                        <button
                          type="button"
                          (click)="toggleSubject(subject)"
                          class="px-6 py-2 rounded-full border-4 border-black font-black text-sm transition-all"
                          [class.bg-[var(--color-primary)]]="isSubjectSelected(subject)"
                          [class.text-white]="isSubjectSelected(subject)"
                          [class.bg-white]="!isSubjectSelected(subject)">
                          {{ subject }}
                        </button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            }

            @if (selectedRole() === 'ADMIN') {
              <div class="text-center py-8">
                @if (selectedRole() === 'ADMIN') {
                  <span class="material-icons text-7xl text-[var(--color-primary)] mb-4">shield</span>
                  <h3 class="text-2xl font-black mb-2">Admin Account</h3>
                  <p class="text-gray-600 font-bold">
                    Your admin account is ready. No additional setup required.
                  </p>
                } @else {
                  <span class="material-icons text-7xl text-[var(--color-primary)] mb-4">rocket_launch</span>
                  <h3 class="text-2xl font-black mb-2">You're all set!</h3>
                  <p class="text-gray-600 font-bold">
                    Your account has been created successfully. Let's get started.
                  </p>
                }
              </div>
            }

            <div class="mt-10 flex justify-between">
              <app-button (click)="goToPrevStep()" variant="secondary" size="lg">
                <span class="material-icons mr-2">arrow_back</span> Back
              </app-button>
              @if (registrationError) {
                <p class="text-sm font-bold mt-2" style="color: var(--color-error)">
                  {{ registrationError }}
                </p>
              }
              <app-button (click)="onSubmit()" [disabled]="specificForm.invalid && selectedRole() !== 'ADMIN'" variant="primary" size="lg">
                Complete Registration <span class="material-icons ml-2">check_circle</span>
              </app-button>
            </div>
          </form>
        }

        <div class="mt-12 pt-8 border-t-4 border-black/10 text-center">
          <a routerLink="/auth/login" class="text-black font-black uppercase tracking-widest text-sm hover:text-[var(--color-primary)] transition-colors">Already have an account? Log in</a>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);

  currentStep = signal<RegistrationStep>('ROLE');
  selectedRole = signal<UserRole | null>(null);
  
  grades: (string | number)[] = ['K', ...Array.from({ length: 12 }, (_, i) => i + 1)];
  subjects = ['Math', 'Science', 'English', 'History', 'Geography'];
  selectedSubjects = signal<string[]>([]);
  registrationError: string | null = null;

  commonForm = this.fb.group({
    name: ['', Validators.required],
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.emailAvailabilityValidator()],
      updateOn: 'blur',
    }),
    password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  specificForm = this.fb.group({
    gradeLevel: [''],
    schoolName: [''],
    subjects: [[] as string[]]
  });

  currentStepNumber() {
    switch (this.currentStep()) {
      case 'ROLE': return 1;
      case 'COMMON': return 2;
      case 'SPECIFIC': return 3;
    }
  }

  stepTitle() {
    switch (this.currentStep()) {
      case 'ROLE': return 'Choose Your Role';
      case 'COMMON': return 'Basic Information';
      case 'SPECIFIC': return 'Final Details';
    }
  }

  progress() {
    return (this.currentStepNumber() / 3) * 100;
  }

  selectRole(role: UserRole) {
    this.selectedRole.set(role);
    
    // Reset specific form based on role
    this.specificForm.reset();
    if (role === 'STUDENT') {
      this.specificForm.get('gradeLevel')?.setValidators(Validators.required);
      this.specificForm.get('schoolName')?.clearValidators();
    } else if (role === 'TEACHER') {
      this.specificForm.get('schoolName')?.setValidators(Validators.required);
      this.specificForm.get('gradeLevel')?.clearValidators();
    } else {
      this.specificForm.get('gradeLevel')?.clearValidators();
      this.specificForm.get('schoolName')?.clearValidators();
    }
    this.specificForm.updateValueAndValidity();
  }

  goToNextStep() {
    if (this.currentStep() === 'ROLE' && this.selectedRole()) {
      this.currentStep.set('COMMON');
    } else if (this.currentStep() === 'COMMON' && this.commonForm.valid) {
      this.currentStep.set('SPECIFIC');
    }
  }

  goToPrevStep() {
    if (this.currentStep() === 'COMMON') {
      this.currentStep.set('ROLE');
    } else if (this.currentStep() === 'SPECIFIC') {
      this.currentStep.set('COMMON');
    }
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    
    if (!hasUpperCase || !hasNumber) {
      return { passwordStrength: true };
    }
    return null;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  private emailAvailabilityValidator(): AsyncValidatorFn {
    return (ctrl: AbstractControl): Observable<{ emailTaken: true } | null> => {
      if (!ctrl.value || typeof ctrl.value !== 'string') return of(null);
      return timer(300).pipe(
        switchMap(() =>
          this.authService.checkEmailAvailability(ctrl.value as string)
        ),
        map(res => (res.available ? null : { emailTaken: true as const })),
        catchError(() => of(null)),
        first()
      );
    };
  }

  getPasswordStrengthClass(index: number) {
    const password = this.commonForm.get('password')?.value || '';
    const hasUpper = /[A-Z]/.test(password);
    const hasNum   = /[0-9]/.test(password);
    const isLong   = password.length >= 8;

    let strength = 0;
    if (password.length > 0) strength = 1;
    if (isLong && (hasUpper || hasNum)) strength = 2;
    if (isLong && hasUpper && hasNum) strength = 3;

    if (index <= strength) {
      if (strength <= 1) return 'bg-red-500';
      if (strength <= 2) return 'bg-yellow-500';
      if (strength <= 3) return 'bg-[var(--color-primary)]/60';
      return 'bg-[var(--color-primary)]';
    }
    return 'bg-gray-200';
  }

  isSubjectSelected(subject: string) {
    return this.selectedSubjects().includes(subject);
  }

  toggleSubject(subject: string) {
    const current = this.selectedSubjects();
    if (current.includes(subject)) {
      this.selectedSubjects.set(current.filter(s => s !== subject));
    } else {
      this.selectedSubjects.set([...current, subject]);
    }
    this.specificForm.patchValue({ subjects: this.selectedSubjects() });
  }

  onSubmit() {
    const specificOk =
      this.selectedRole() === 'ADMIN' || this.specificForm.valid;
    if (!this.commonForm.valid || !specificOk) return;

    this.registrationError = null;

    const payload = {
      role: this.selectedRole()!,
      ...this.commonForm.value,
      ...this.specificForm.value,
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.notificationService.success('Welcome aboard! Registration successful.');
        this.router.navigate(['/auth/login']);
      },
      error: (err: { status: number }) => {
        if (err.status === 409) {
          this.registrationError = 'This email is already registered.';
        } else {
          this.registrationError = 'Registration failed. Please try again.';
        }
      },
    });
  }
}







