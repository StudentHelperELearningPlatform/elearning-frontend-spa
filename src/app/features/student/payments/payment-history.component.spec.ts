import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext, signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { PaymentHistoryComponent } from './payment-history.component';
import { PaymentStore } from './payment.store';
import { AuthStore } from '../../auth/store/auth.store';
import { PaymentRecord, PaymentStatus } from './payment.types';

describe('PaymentHistoryComponent', () => {
  let injector: EnvironmentInjector;
  let storeMock: {
    history: ReturnType<typeof signal<PaymentRecord[]>>;
    loading: ReturnType<typeof signal<boolean>>;
    error: ReturnType<typeof signal<string | null>>;
    totalSpentCents: ReturnType<typeof signal<number>>;
    loadHistory: ReturnType<typeof vi.fn>;
  };
  let authStoreMock: {
    user: ReturnType<typeof signal<{ id: string } | null>>;
  };

  beforeEach(() => {
    storeMock = {
      history: signal<PaymentRecord[]>([]),
      loading: signal(false),
      error: signal<string | null>(null),
      totalSpentCents: signal(0),
      loadHistory: vi.fn(),
    };
    authStoreMock = { user: signal<{ id: string } | null>({ id: 'student-42' }) };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        { provide: PaymentStore, useValue: storeMock },
        { provide: AuthStore, useValue: authStoreMock },
      ],
    });
    injector = TestBed.inject(EnvironmentInjector);
  });

  afterEach(() => vi.restoreAllMocks());

  function make() {
    return runInInjectionContext(injector, () => new PaymentHistoryComponent());
  }

  it('creates without errors', () => {
    expect(make()).toBeTruthy();
  });

  it('ngOnInit loads history for the authenticated student', () => {
    make().ngOnInit();
    expect(storeMock.loadHistory).toHaveBeenCalledWith('student-42');
  });

  it('ngOnInit does NOT load history when user is null', () => {
    authStoreMock.user.set(null);
    make().ngOnInit();
    expect(storeMock.loadHistory).not.toHaveBeenCalled();
  });

  it('formatAmount converts cents to a two-decimal currency string', () => {
    const comp = make();
    expect(comp.formatAmount(999, 'RON')).toBe('9.99 RON');
    expect(comp.formatAmount(0, 'EUR')).toBe('0.00 EUR');
    expect(comp.formatAmount(125000, 'USD')).toBe('1250.00 USD');
  });

  it('totalSpentDisplay uses RON when history is empty', () => {
    storeMock.totalSpentCents.set(0);
    expect(make().totalSpentDisplay()).toBe('0.00 RON');
  });

  it('totalSpentDisplay uses the currency of the first history record', () => {
    storeMock.totalSpentCents.set(4999);
    storeMock.history.set([
      {
        id: 'p1',
        itemType: 'LESSON',
        itemId: '1',
        itemTitle: 't',
        amount: 4999,
        currency: 'EUR',
        status: 'SUCCESS',
        createdAt: '2026-05-01T10:00:00Z',
      },
    ]);
    expect(make().totalSpentDisplay()).toBe('49.99 EUR');
  });

  it('iconFor returns expected icons for known item types', () => {
    const comp = make();
    expect(comp.iconFor('LESSON')).toBe('menu_book');
    expect(comp.iconFor('BUNDLE')).toBe('inventory_2');
    expect(comp.iconFor('SUBSCRIPTION')).toBe('autorenew');
  });

  it('iconFor falls back to "receipt" for unknown types', () => {
    expect(make().iconFor('SOMETHING')).toBe('receipt');
  });

  it('statusVariant maps each payment status to a badge variant', () => {
    const comp = make();
    const cases: [PaymentStatus, string][] = [
      ['SUCCESS', 'success'],
      ['PENDING', 'warning'],
      ['FAILED', 'danger'],
      ['REFUNDED', 'neutral'],
    ];
    for (const [status, variant] of cases) {
      expect(comp.statusVariant(status)).toBe(variant);
    }
  });

  it('statusVariant returns "neutral" for an unknown status', () => {
    expect(make().statusVariant('WEIRD' as unknown as PaymentStatus)).toBe('neutral');
  });
});
