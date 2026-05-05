import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MilestonesStore, Milestone } from './milestones.store';
import { NotificationService } from '@core/services/notification.service';

describe('MilestonesStore', () => {
  let store: MilestonesStore;
  let httpMock: HttpTestingController;
  let notificationMock: any;

  beforeEach(() => {
    notificationMock = {
      success: vi.fn(),
      error: vi.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MilestonesStore,
        { provide: NotificationService, useValue: notificationMock }
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
      const mockMilestones: Milestone[] = [
        { id: '1', title: 'First', description: 'desc', category: 'learning', earnedAt: '2024-01-01', icon: 'pi-star' },
        { id: '2', title: 'Second', description: 'desc', category: 'streak', icon: 'pi-bolt' }
      ];

      store.loadMilestones('student-123');
      expect(store.loading()).toBe(true);

      const req = httpMock.expectOne('/api/students/student-123/milestones');
      expect(req.request.method).toBe('GET');
      req.flush(mockMilestones);

      expect(store.loading()).toBe(false);
      expect(store.milestones()).toEqual(mockMilestones);
      expect(store.earnedCount()).toBe(1);
      expect(store.totalCount()).toBe(2);
    });

    it('should notify when a new milestone is earned', () => {
      const mockMilestones: Milestone[] = [
        { id: '1', title: 'Achievement', description: 'desc', category: 'mastery', earnedAt: '2024-05-05', icon: 'pi-check' }
      ];

      store.loadMilestones('student-123');
      const req = httpMock.expectOne('/api/students/student-123/milestones');
      req.flush(mockMilestones);

      expect(notificationMock.success).toHaveBeenCalledWith(
        expect.stringContaining('Achievement')
      );
    });

    it('should handle errors', () => {
      store.loadMilestones('student-123');
      const req = httpMock.expectOne('/api/students/student-123/milestones');
      req.error(new ErrorEvent('Network error'));

      expect(store.loading()).toBe(false);
      expect(store.milestones()).toEqual([]);
    });
  });
});
