import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { patchStore } from '../../../../test-utils/patch-store';
import { PaymentStore } from './payment.store';
import { PaymentRecord } from './payment.types';

const HISTORY: PaymentRecord[] = [
  {
    id: 'p1',
    itemType: 'LESSON',
    itemId: 'lesson-1',
    itemTitle: 'Intro to Fractions',
    amount: 999,
    currency: 'RON',
    status: 'SUCCESS',
    createdAt: '2026-05-01T10:00:00Z',
  },
  {
    id: 'p2',
    itemType: 'BUNDLE',
    itemId: 'bundle-1',
    itemTitle: 'Math Bundle',
    amount: 4999,
    currency: 'RON',
    status: 'PENDING',
    createdAt: '2026-05-02T10:00:00Z',
  },
  {
    id: 'p3',
    itemType: 'SUBSCRIPTION',
    itemId: 'sub-1',
    itemTitle: 'Monthly Plan',
    amount: 2999,
    currency: 'RON',
    status: 'SUCCESS',
    createdAt: '2026-05-03T10:00:00Z',
  },
  {
    id: 'p4',
    itemType: 'LESSON',
    itemId: 'lesson-9',
    itemTitle: 'Cancelled lesson',
    amount: 999,
    currency: 'RON',
    status: 'FAILED',
    createdAt: '2026-05-04T10:00:00Z',
  },
];

describe('PaymentStore', () => {
  let store: InstanceType<typeof PaymentStore>;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    store = TestBed.inject(PaymentStore);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => vi.restoreAllMocks());

  it('starts empty', () => {
    expect(store.history()).toEqual([]);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('loadHistory fetches the student payment history', () => {
    const spy = vi.spyOn(http, 'get').mockReturnValue(of(HISTORY));
    store.loadHistory('student-1');
    expect(spy).toHaveBeenCalledWith('/api/payments/history/student-1');
    expect(store.history()).toEqual(HISTORY);
    expect(store.loading()).toBe(false);
  });

  it('loadHistory falls back to an empty array on null body', () => {
    vi.spyOn(http, 'get').mockReturnValue(of(null));
    store.loadHistory('student-1');
    expect(store.history()).toEqual([]);
  });

  it('loadHistory sets error message on Error failure', () => {
    vi.spyOn(http, 'get').mockReturnValue(throwError(() => new Error('Network down')));
    store.loadHistory('student-1');
    expect(store.error()).toBe('Network down');
    expect(store.loading()).toBe(false);
  });

  it('loadHistory uses fallback message for non-Error failures', () => {
    vi.spyOn(http, 'get').mockReturnValue(throwError(() => 'oops'));
    store.loadHistory('student-1');
    expect(store.error()).toBe('Failed to load payment history');
  });

  it('successfulPayments returns only SUCCESS records', () => {
    patchStore(store, { history: HISTORY });
    expect(store.successfulPayments().map((p) => p.id)).toEqual(['p1', 'p3']);
  });

  it('totalSpentCents sums only successful purchases', () => {
    patchStore(store, { history: HISTORY });
    expect(store.totalSpentCents()).toBe(999 + 2999);
  });

  it('purchasedItemIds exposes a Set of successful item ids', () => {
    patchStore(store, { history: HISTORY });
    const ids = store.purchasedItemIds();
    expect(ids.has('lesson-1')).toBe(true);
    expect(ids.has('sub-1')).toBe(true);
    expect(ids.has('lesson-9')).toBe(false); // failed
    expect(ids.has('bundle-1')).toBe(false); // pending
  });

  it('hasPurchased returns true for a SUCCESS purchase', () => {
    patchStore(store, { history: HISTORY });
    expect(store.hasPurchased('lesson-1')).toBe(true);
  });

  it('hasPurchased returns false for a pending or failed purchase', () => {
    patchStore(store, { history: HISTORY });
    expect(store.hasPurchased('bundle-1')).toBe(false);
    expect(store.hasPurchased('lesson-9')).toBe(false);
  });

  it('hasPurchased returns false for an unknown item', () => {
    patchStore(store, { history: HISTORY });
    expect(store.hasPurchased('nope')).toBe(false);
  });
});
