import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MilestonesComponent } from './milestones.component';
import { Milestone } from '../../store/milestones.store';
import { AuthStore } from '@features/auth/store/auth.store';
import { createAuthStoreStub } from '../../../../../test-utils/auth-testing';
import { provideApiMocks } from '../../../../../test-utils/api-testing';
import { NotificationService } from '@core/services/notification.service';

const fixtureBackendMilestones = [
  { id: '1', nume: 'First lesson', descriere: 'desc', type: 'learning', achievedAt: '2026-01-01' },
  { id: '2', nume: 'Streak', descriere: 'desc', type: 'streak' },
  { id: '3', nume: 'Mastery', descriere: 'desc', type: 'mastery' },
];

const expectedMilestones: Milestone[] = [
  { id: '1', title: 'First lesson', description: 'desc', category: 'learning', earnedAt: '2026-01-01', icon: 'school' },
  { id: '2', title: 'Streak', description: 'desc', category: 'streak', icon: 'local_fire_department' },
  { id: '3', title: 'Mastery', description: 'desc', category: 'mastery', icon: 'military_tech' },
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

  it('loads milestones on init', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne('/api/v1/progress/me/milestones');
    expect(req.request.method).toBe('GET');
    req.flush(fixtureBackendMilestones);

    expect(component.store.milestones()).toEqual(expectedMilestones);
    expect(component.store.earnedCount()).toBe(1);
  });

  it('filteredMilestones returns all when category is ALL', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/v1/progress/me/milestones').flush(fixtureBackendMilestones);

    expect(component.selectedCategory()).toBe('ALL');
    expect(component.filteredMilestones()).toEqual(expectedMilestones);
  });

  it('filteredMilestones filters by selected category', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/v1/progress/me/milestones').flush(fixtureBackendMilestones);

    component.selectedCategory.set('streak');
    expect(component.filteredMilestones()).toEqual([expectedMilestones[1]]);
  });

  it('opens detail modal on viewMilestoneDetail', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/v1/progress/me/milestones').flush(fixtureBackendMilestones);

    const targetBadge = expectedMilestones[0];
    component.viewMilestoneDetail(targetBadge);

    expect(component.selectedBadge()).toEqual(targetBadge);
    expect(component.store.detailLoading()).toBe(true);

    const detailReq = httpMock.expectOne('/api/v1/progress/me/milestones/1');
    expect(detailReq.request.method).toBe('GET');
    detailReq.flush({
      id: '1',
      nume: 'First lesson',
      descriere: 'desc',
      type: 'learning',
      achievedAt: '2026-01-01'
    });

    expect(component.store.detailLoading()).toBe(false);
    expect(component.store.selectedMilestone()).toEqual(targetBadge);

    component.closeModal();
    expect(component.selectedBadge()).toBeNull();
  });
});
