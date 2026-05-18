import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { StudentProfileComponent } from './student-profile.component';
import { StudentProfileStore } from '../store/profile.store';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { AuthStore } from '../../auth/store/auth.store';
import { provideRouter } from '@angular/router';

describe('StudentProfileComponent', () => {
  let component: StudentProfileComponent;
  let fixture: ComponentFixture<StudentProfileComponent>;
  let httpTestingController: HttpTestingController;
  let profileStore: InstanceType<typeof StudentProfileStore>;
  let messageService: MessageService;
  const mockApiUrl = 'http://mock-api/api/v1';

  beforeEach(async () => {
    vi.useRealTimers();
    await TestBed.configureTestingModule({
      imports: [StudentProfileComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: USER_PLATFORM_API_URL, useValue: mockApiUrl },
        MessageService,
        {
          provide: AuthStore,
          useValue: {
            role: () => 'STUDENT',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentProfileComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    profileStore = TestBed.inject(StudentProfileStore);
    messageService = fixture.debugElement.injector.get(MessageService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create and load profile on init', () => {
    fixture.detectChanges();

    const req = httpTestingController.expectOne(`${mockApiUrl}/students/me/profile`);
    expect(req.request.method).toBe('GET');
    req.flush({
      firstName: 'Test',
      lastName: 'Student',
      school: 'Liceul X',
      bio: 'Test bio',
      email: 'test@student.com',
      enrolledClasses: ['1', '2'],
    });

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(profileStore.profile()?.name).toBe('Test Student');
  });

  it('should toggle editing mode', () => {
    fixture.detectChanges();
    const req = httpTestingController.expectOne(`${mockApiUrl}/students/me/profile`);
    req.flush({
      firstName: 'Test',
      lastName: 'Student',
      school: 'Liceul X',
    });

    expect(component.isEditing()).toBe(false);

    component.startEdit();
    expect(component.isEditing()).toBe(true);
    expect(component.form.value.name).toBe('Test Student');

    component.cancelEdit();
    expect(component.isEditing()).toBe(false);
  });

  it('should not save if form is invalid', () => {
    fixture.detectChanges();
    const req = httpTestingController.expectOne(`${mockApiUrl}/students/me/profile`);
    req.flush({
      firstName: 'Test',
      lastName: 'Student',
    });

    component.startEdit();
    component.form.patchValue({ name: '' }); // Invalid name

    const spyUpdate = vi.spyOn(profileStore, 'updateStudentProfile');
    component.saveProfile();

    expect(spyUpdate).not.toHaveBeenCalled();
  });

  it('should save profile successfully', () => {
    vi.useFakeTimers();
    fixture.detectChanges();
    const req = httpTestingController.expectOne(`${mockApiUrl}/students/me/profile`);
    req.flush({
      firstName: 'Test',
      lastName: 'Student',
      school: 'Liceul X',
      bio: 'Bio',
      gradeLevel: '10',
    });

    component.startEdit();
    component.form.patchValue({
      name: 'New Name',
      school: 'New School',
    });

    const spyMsg = vi.spyOn(messageService, 'add');
    component.saveProfile();

    const updateReq = httpTestingController.expectOne(`${mockApiUrl}/students/me/profile`);
    expect(updateReq.request.method).toBe('PUT');
    updateReq.flush({});

    vi.advanceTimersByTime(500);

    expect(spyMsg).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success', summary: 'Success' })
    );
    expect(component.isEditing()).toBe(false);
    vi.useRealTimers();
  });

  it('should handle avatar file selection', () => {
    fixture.detectChanges();
    const req = httpTestingController.expectOne(`${mockApiUrl}/students/me/profile`);
    req.flush({ firstName: 'Test', lastName: 'Student' });

    const mockFile = new File([''], 'avatar.png', { type: 'image/png' });
    const mockEvent = {
      target: {
        files: [mockFile],
      },
    } as unknown as Event;

    const spyMsg = vi.spyOn(messageService, 'add');
    component.onFileSelected(mockEvent);

    // Give FileReader a moment
    setTimeout(() => {
      expect(spyMsg).toHaveBeenCalled();
    }, 100);
  });

  it('should compute initials correctly', () => {
    expect(component.getInitials('John Doe')).toBe('JD');
    expect(component.getInitials('Single')).toBe('SI');
    expect(component.getInitials('')).toBe('UN');
  });
});
