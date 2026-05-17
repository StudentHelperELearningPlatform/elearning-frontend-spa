import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaymentRecord, PaymentStore } from './payment.store';
import { provideApiMocks } from '../../../../test-utils/api-testing';

const records: PaymentRecord[] = [
  {
    id: 'p1',
    itemType: 'LESSON',
    itemId: 'l1',
    itemTitle: 'Algebra',
    amount: 999,
    currency: 'RON',
    status: 'SUCCESS',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'p2',
    itemType: 'BUNDLE',
    itemId: 'b1',
    itemTitle: 'Math Bundle',
    amount: 4999,
    currency: 'RON',
    status: 'PENDING',
    createdAt: '2026-01-02T00:00:00Z',
  },
];

describe('PaymentStore', () => {
  let store: PaymentStore;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentStore, ...provideApiMocks()],
    });

    store = TestBed.inject(PaymentStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('initializes empty', () => {
    expect(store.history()).toEqual([]);
    expect(store.totalSpent()).toBe(0);
    expect(store.historyLoading()).toBe(false);
    expect(store.historyError()).toBeNull();
  });

  describe('loadHistory', () => {
    it('fetches history and tallies total spent', () => {
      store.loadHistory('s1');
      expect(store.historyLoading()).toBe(true);

      const req = httpMock.expectOne('/api/v1/payments/history/s1');
      expect(req.request.method).toBe('GET');
      req.flush(records);

      expect(store.historyLoading()).toBe(false);
      expect(store.history()).toEqual(records);
      expect(store.totalSpent()).toBe(999);
    });

    it('coerces non-array responses to empty', () => {
      store.loadHistory('s1');
      httpMock.expectOne('/api/v1/payments/history/s1').flush(null);
      expect(store.history()).toEqual([]);
    });

    it('sets error on failure', () => {
      store.loadHistory('s1');
      httpMock
        .expectOne('/api/v1/payments/history/s1')
        .error(new ErrorEvent('boom'));
      expect(store.historyError()).toBe('Failed to load payment history');
    });
  });

  describe('checkout', () => {
    it('posts with required params and resolves the session', async () => {
      const pending = store.checkout({
        studentId: 's1',
        itemType: 'LESSON',
        itemId: 'l1',
      });
      expect(store.checkoutLoading()).toBe(true);

      const req = httpMock.expectOne(
        (r) =>
          r.url === '/api/v1/payments/checkout' &&
          r.params.get('studentId') === 's1' &&
          r.params.get('itemType') === 'LESSON' &&
          r.params.get('itemId') === 'l1' &&
          !r.params.has('bundleId'),
      );
      expect(req.request.method).toBe('POST');
      req.flush({ checkoutUrl: 'https://pay.example/abc', sessionId: 'sess-1' });

      const session = await pending;
      expect(session).toEqual({ checkoutUrl: 'https://pay.example/abc', sessionId: 'sess-1' });
      expect(store.checkoutLoading()).toBe(false);
    });

    it('includes bundleId when provided', async () => {
      const pending = store.checkout({
        studentId: 's1',
        itemType: 'BUNDLE',
        itemId: 'b1',
        bundleId: 'b1',
      });

      const req = httpMock.expectOne(
        (r) => r.url === '/api/v1/payments/checkout' && r.params.get('bundleId') === 'b1',
      );
      req.flush({ checkoutUrl: 'u', sessionId: 's' });
      await pending;
    });

    it('resolves null and sets error on failure', async () => {
      const pending = store.checkout({
        studentId: 's1',
        itemType: 'LESSON',
        itemId: 'l1',
      });
      httpMock
        .expectOne((r) => r.url === '/api/v1/payments/checkout')
        .error(new ErrorEvent('boom'));
      const result = await pending;
      expect(result).toBeNull();
      expect(store.checkoutError()).toBe('Failed to start checkout');
    });
  });

  describe('hasPurchased', () => {
    it('returns true only for SUCCESS records with matching itemId', () => {
      store.loadHistory('s1');
      httpMock.expectOne('/api/v1/payments/history/s1').flush(records);

      expect(store.hasPurchased('l1')).toBe(true);
      expect(store.hasPurchased('b1')).toBe(false); // PENDING
      expect(store.hasPurchased('unknown')).toBe(false);
    });
  });
});
