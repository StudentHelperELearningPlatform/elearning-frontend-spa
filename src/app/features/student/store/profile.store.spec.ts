import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { StudentProfileStore, StudentProfile } from './profile.store';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

describe('StudentProfileStore', () => {
  let store: InstanceType<typeof StudentProfileStore>;
  let httpTestingController: HttpTestingController;
  const mockApiUrl = 'http://mock-api/api/v1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: USER_PLATFORM_API_URL, useValue: mockApiUrl },
      ],
    });

    store = TestBed.inject(StudentProfileStore);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should load student profile', () => {
    const rawMockProfile = {
      firstName: 'Test',
      lastName: 'Student',
      school: 'Liceul X',
      bio: 'Test bio',
      email: 'test@test.com',
      phone: '123',
      enrolledClasses: ['class-1', 'class-2'],
      gradeLevel: 'Clasa a IX-a'
    };

    const expectedProfile: StudentProfile = {
      name: 'Test Student',
      bio: 'Test bio',
      contactInfo: { email: 'test@test.com', phone: '123' },
      enrolledLessonsCount: 2,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test%40test.com',
      school: 'Liceul X',
      gradeLevel: 'Clasa a IX-a',
      enrolledClasses: ['class-1', 'class-2']
    };

    store.loadStudentProfile();

    expect(store.loading()).toBe(true);

    const req = httpTestingController.expectOne(`${mockApiUrl}/students/me/profile`);
    expect(req.request.method).toBe('GET');
    req.flush(rawMockProfile);

    expect(store.loading()).toBe(false);
    expect(store.profile()).toEqual(expectedProfile);
  });

  it('should handle error when loading profile', () => {
    store.loadStudentProfile();

    const req = httpTestingController.expectOne(`${mockApiUrl}/students/me/profile`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(store.loading()).toBe(false);
    expect(store.error()).toContain('Http failure response');
  });

  it('should update student profile and map returned data', () => {
    const rawMockProfile = {
      firstName: 'Updated',
      lastName: 'Student',
      school: 'New School',
      bio: 'New bio',
      email: 'test@test.com',
      phone: '123',
      enrolledClasses: [],
      gradeLevel: 'Clasa a X-a'
    };

    const updatePayload = {
      firstName: 'Updated',
      lastName: 'Student',
      school: 'New School',
      gradeLevel: 'Clasa a X-a',
      bio: 'New bio'
    };

    store.updateStudentProfile(updatePayload);

    expect(store.saving()).toBe(true);

    const req = httpTestingController.expectOne(`${mockApiUrl}/students/me/profile`);
    expect(req.request.method).toBe('PUT');
    req.flush(rawMockProfile);

    expect(store.saving()).toBe(false);
    expect(store.profile()?.name).toBe('Updated Student');
    expect(store.profile()?.school).toBe('New School');
  });

  it('should fallback map when update response has no data', () => {
    const updatePayload = {
      firstName: 'Fallback',
      lastName: 'Student',
      school: 'Fallback School',
      gradeLevel: 'Clasa a XI-a',
      bio: 'Fallback bio',
      profilePictureUrl: 'http://pic'
    };

    store.updateStudentProfile(updatePayload);

    const req = httpTestingController.expectOne(`${mockApiUrl}/students/me/profile`);
    req.flush({}); // Empty response

    expect(store.saving()).toBe(false);
    expect(store.profile()?.name).toBe('Fallback Student');
    expect(store.profile()?.school).toBe('Fallback School');
    expect(store.profile()?.avatarUrl).toBe('http://pic');
  });

  it('should map student profile correctly when raw is null', () => {
    store.loadStudentProfile();

    const req = httpTestingController.expectOne(`${mockApiUrl}/students/me/profile`);
    req.flush(null);

    expect(store.profile()?.name).toBe('Alex Student');
  });

  it('should handle error when updating profile', () => {
    store.updateStudentProfile({});

    const req = httpTestingController.expectOne(`${mockApiUrl}/students/me/profile`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(store.saving()).toBe(false);
    expect(store.error()).toContain('Http failure response');
  });
});
