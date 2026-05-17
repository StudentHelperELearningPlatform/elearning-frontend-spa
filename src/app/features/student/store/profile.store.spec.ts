import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { StudentProfileStore, StudentProfile } from './profile.store';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

describe('StudentProfileStore', () => {
  let store: any;
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
});
