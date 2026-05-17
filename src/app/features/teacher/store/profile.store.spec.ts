import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TeacherProfileStore, TeacherProfile } from './profile.store';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

describe('TeacherProfileStore', () => {
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

    store = TestBed.inject(TeacherProfileStore);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should load teacher profile', () => {
    const rawMockProfile = {
      firstName: 'Test',
      lastName: 'Teacher',
      school: 'Liceul X',
      bio: 'Test bio',
      email: 'test@test.com',
      phone: '123',
      subjects: [{ id: '1', name: 'Math', bio: 'Math bio' }],
      classes: [{ id: '1', name: '9A', bio: 'Class bio' }]
    };

    const expectedProfile: TeacherProfile = {
      name: 'Test Teacher',
      bio: 'Test bio',
      contactInfo: { email: 'test@test.com', phone: '123' },
      subjectsTaught: ['Math'],
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test%40test.com',
      school: 'Liceul X',
      subjects: [{ id: '1', name: 'Math', bio: 'Math bio' }],
      classes: [{ id: '1', name: '9A', bio: 'Class bio' }]
    };

    store.loadTeacherProfile();

    expect(store.loading()).toBe(true);

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/me/profile`);
    expect(req.request.method).toBe('GET');
    req.flush(rawMockProfile);

    expect(store.loading()).toBe(false);
    expect(store.profile()).toEqual(expectedProfile);
  });

  it('should handle error when loading profile', () => {
    store.loadTeacherProfile();

    const req = httpTestingController.expectOne(`${mockApiUrl}/teachers/me/profile`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(store.loading()).toBe(false);
    expect(store.error()).toContain('Http failure response');
  });
});
