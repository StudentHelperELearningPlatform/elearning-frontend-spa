import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WritableSignal } from '@angular/core';
import { MilestonesComponent } from './milestones.component';
import { Milestone } from '../../store/milestones.store';
import { AuthStore } from '@features/auth/store/auth.store';
import { createAuthStoreStub } from '../../../../../test-utils/auth-testing';
import { provideApiMocks } from '../../../../../test-utils/api-testing';
import { NotificationService } from '@core/services/notification.service';

const fixtureMilestones: Milestone[] = [
  { id: '1', title: 'First lesson', description: 'desc', category: 'learning', earnedAt: '2026-01-01' },
  { id: '2', title: 'Streak', description: 'desc', category: 'streak', progress: 2, goal: 7 },
  { id: '3', title: 'Mastery', description: 'desc', category: 'mastery' },
];

describe('MilestonesComponent', () => {
  let fixture: ComponentFixture<MilestonesComponent>;
  let component: MilestonesComponent;
  let httpMock: HttpTestingController;
  let authStub: ReturnType<typeof createAuthStoreStub>;

  beforeEach(() => {
    authStub = createAuthStoreStub({
      isAuthenticated: true,
      user: { id: 'student-1', email: 's@test.com', roles: ['STUDENT'] },
    });

    TestBed.configureTestingModule({
      imports: [MilestonesComponent, HttpClientTestingModule],
      providers: [
        ...provideApiMocks(),
        { provide: AuthStore, useValue: authStub },
        { provide: NotificationService, useValue: { success: vi.fn(), error: vi.fn() } },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(MilestonesComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => httpMock.verify());

  it('loads milestones for the authenticated student', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne('/api/v1/students/student-1/milestones');
    req.flush(fixtureMilestones);

    expect(component.store.milestones()).toEqual(fixtureMilestones);
    expect(component.store.earnedCount()).toBe(1);
  });

  it('does nothing when no user is loaded', () => {
    (authStub.user as WritableSignal<unknown>).set(null);
    fixture.detectChanges();
    httpMock.expectNone('/api/v1/students/student-1/milestones');
  });

  it('filteredMilestones returns all when category is ALL', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/v1/students/student-1/milestones').flush(fixtureMilestones);

    expect(component.selectedCategory()).toBe('ALL');
    expect(component.filteredMilestones()).toEqual(fixtureMilestones);
  });

  it('filteredMilestones filters by selected category', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/v1/students/student-1/milestones').flush(fixtureMilestones);

    component.selectedCategory.set('streak');
    expect(component.filteredMilestones()).toEqual([fixtureMilestones[1]]);
  });
});
