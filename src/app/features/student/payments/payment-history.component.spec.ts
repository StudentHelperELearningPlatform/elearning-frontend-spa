import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WritableSignal } from '@angular/core';
import { PaymentHistoryComponent } from './payment-history.component';
import { PaymentRecord } from './payment.store';
import { AuthStore } from '@features/auth/store/auth.store';
import { createAuthStoreStub } from '../../../../test-utils/auth-testing';
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
];

describe('PaymentHistoryComponent', () => {
  let fixture: ComponentFixture<PaymentHistoryComponent>;
  let component: PaymentHistoryComponent;
  let httpMock: HttpTestingController;
  let authStub: ReturnType<typeof createAuthStoreStub>;

  beforeEach(() => {
    authStub = createAuthStoreStub({
      isAuthenticated: true,
      user: { id: 'student-1', email: 's@test.com', roles: ['STUDENT'] },
    });

    TestBed.configureTestingModule({
      imports: [PaymentHistoryComponent, HttpClientTestingModule],
      providers: [
        ...provideApiMocks(),
        { provide: AuthStore, useValue: authStub },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PaymentHistoryComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => httpMock.verify());

  it('loads history for the current student on init', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne('/api/v1/payments/history/student-1');
    expect(req.request.method).toBe('GET');
    req.flush(records);
  });

  it('does nothing when no student is authenticated', () => {
    (authStub.user as WritableSignal<unknown>).set(null);
    fixture.detectChanges();
    httpMock.expectNone('/api/v1/payments/history/student-1');
  });

  it('formatAmount returns a localized currency string', () => {
    const formatted = component.formatAmount(999, 'RON');
    expect(typeof formatted).toBe('string');
    expect(formatted).toContain('9');
  });

  it('formatAmount falls back when currency is invalid', () => {
    expect(component.formatAmount(100, 'XYZZZZ' as unknown as string)).toMatch(/1\.00/);
  });

  it('statusLabel capitalizes status text', () => {
    expect(component.statusLabel('SUCCESS')).toBe('Success');
    expect(component.statusLabel('PENDING')).toBe('Pending');
    expect(component.statusLabel('FAILED')).toBe('Failed');
    expect(component.statusLabel('REFUNDED')).toBe('Refunded');
  });
});
