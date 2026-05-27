import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MilestonesStore, Milestone } from './milestones.store';
import { NotificationService } from '@core/services/notification.service';
import { provideApiMocks } from '../../../../test-utils/api-testing';

describe('MilestonesStore', () => {
  let store: MilestonesStore;
  let httpMock: HttpTestingController;
  let notificationMock: {
    success: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    notificationMock = {
      success: vi.fn(),
      error: vi.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MilestonesStore,
        { provide: NotificationService, useValue: notificationMock },
        ...provideApiMocks(),
      ],
    });

    store = TestBed.inject(MilestonesStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created with empty milestones', () => {
    expect(store).toBeTruthy();
    expect(store.milestones()).toEqual([]);
    expect(store.loading()).toBe(false);
  });

  describe('loadMilestones', () => {
    it('should fetch milestones and update state', () => {
      const mockBackend = [
        { id: '1', nume: 'First', descriere: 'desc', type: 'learning', achievedAt: '2024-01-01' },
        { id: '2', nume: 'Second', descriere: 'desc', type: 'streak' }
      ];

      const expected: Milestone[] = [
        { id: '1', title: 'First', description: 'desc', category: 'learning', earnedAt: '2024-01-01', icon: 'school' },
        { id: '2', title: 'Second', description: 'desc', category: 'streak', icon: 'local_fire_department' }
      ];

      store.loadMilestones();
      expect(store.loading()).toBe(true);

      const req = httpMock.expectOne('/api/v1/progress/me/milestones');
      expect(req.request.method).toBe('GET');
      req.flush(mockBackend);

      expect(store.loading()).toBe(false);
      expect(store.milestones()).toEqual(expected);
      expect(store.earnedCount()).toBe(1);
      expect(store.totalCount()).toBe(2);
    });

    it('should notify when a new milestone is earned', () => {
      const mockBackend = [
        { id: '1', nume: 'Achievement', descriere: 'desc', type: 'mastery', achievedAt: '2024-05-05' }
      ];

      store.loadMilestones();
      const req = httpMock.expectOne('/api/v1/progress/me/milestones');
      req.flush(mockBackend);

      expect(notificationMock.success).toHaveBeenCalledWith(
        expect.stringContaining('Achievement')
      );
    });

    it('should not notify twice for the same earned milestone id', () => {
      const mockBackend = [
        { id: '1', nume: 'Achievement', descriere: 'desc', type: 'mastery', achievedAt: '2024-05-05' }
      ];

      store.loadMilestones();
      httpMock.expectOne('/api/v1/progress/me/milestones').flush(mockBackend);

      store.loadMilestones();
      httpMock.expectOne('/api/v1/progress/me/milestones').flush(mockBackend);

      expect(notificationMock.success).toHaveBeenCalledTimes(1);
    });

    it('should fallback to emoji_events icon for unknown category', () => {
      store.loadMilestones();
      httpMock.expectOne('/api/v1/progress/me/milestones').flush([
        { id: '9', nume: 'Unknown', descriere: 'desc', type: 'custom' }
      ]);

      expect(store.milestones()[0].icon).toBe('emoji_events');
    });

    it('should handle errors', () => {
      store.loadMilestones();
      const req = httpMock.expectOne('/api/v1/progress/me/milestones');
      req.error(new ErrorEvent('Network error'));

      expect(store.loading()).toBe(false);
      expect(store.milestones()).toEqual([]);
    });
  });

  describe('loadMilestoneDetail', () => {
    it('should reject invalid milestone ID', () => {
      store.loadMilestoneDetail('undefined');
      expect(notificationMock.error).toHaveBeenCalledWith('Invalid milestone ID');
      expect(store.detailLoading()).toBe(false);
    });

    it('should fetch single milestone detail and update state', () => {
      const mockDetail = { id: '5', nume: 'Superstar', descriere: 'desc', type: 'social', achievedAt: '2026-05-25' };

      store.loadMilestoneDetail('5');
      expect(store.detailLoading()).toBe(true);

      const req = httpMock.expectOne('/api/v1/progress/me/milestones/5');
      expect(req.request.method).toBe('GET');
      req.flush(mockDetail);

      expect(store.detailLoading()).toBe(false);
      expect(store.selectedMilestone()).toEqual({
        id: '5',
        title: 'Superstar',
        description: 'desc',
        category: 'social',
        earnedAt: '2026-05-25',
        icon: 'people'
      });
    });

    it('should keep selectedMilestone null when detail response is empty', () => {
      store.loadMilestoneDetail('5');
      httpMock.expectOne('/api/v1/progress/me/milestones/5').flush(null);

      expect(store.detailLoading()).toBe(false);
      expect(store.selectedMilestone()).toBeNull();
    });

    it('should report error when detail request fails', () => {
      store.loadMilestoneDetail('5');
      httpMock.expectOne('/api/v1/progress/me/milestones/5').error(new ErrorEvent('Network error'));

      expect(store.detailLoading()).toBe(false);
      expect(notificationMock.error).toHaveBeenCalledWith('Failed to load milestone detail');
    });
  });
});
