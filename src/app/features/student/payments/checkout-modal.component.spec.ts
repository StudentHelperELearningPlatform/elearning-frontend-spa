import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CheckoutModalComponent } from './checkout-modal.component';
import { PaymentStore } from './payment.store';
import { AuthStore } from '@features/auth/store/auth.store';
import { createAuthStoreStub } from '../../../../test-utils/auth-testing';
import { provideApiMocks } from '../../../../test-utils/api-testing';

const setInputs = (
  component: CheckoutModalComponent,
  opts: { isOpen?: boolean; lessonId?: string; lessonTitle?: string },
) => {
  if (opts.isOpen !== undefined) {
    (component as unknown as { isOpen: () => boolean }).isOpen = () => opts.isOpen!;
  }
  if (opts.lessonId !== undefined) {
    (component as unknown as { lessonId: () => string }).lessonId = () => opts.lessonId!;
  }
  if (opts.lessonTitle !== undefined) {
    (component as unknown as { lessonTitle: () => string }).lessonTitle = () => opts.lessonTitle!;
  }
};

describe('CheckoutModalComponent', () => {
  let fixture: ComponentFixture<CheckoutModalComponent>;
  let component: CheckoutModalComponent;
  let store: PaymentStore;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutModalComponent, HttpClientTestingModule],
      providers: [
        ...provideApiMocks(),
        {
          provide: AuthStore,
          useValue: createAuthStoreStub({
            isAuthenticated: true,
            user: { id: 'student-1', email: 's@test.com', roles: ['STUDENT'] },
          }),
        },
      ],
    });

    store = TestBed.inject(PaymentStore);
    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(CheckoutModalComponent);
    component = fixture.componentInstance;
    setInputs(component, { isOpen: true, lessonId: 'lesson-1', lessonTitle: 'My Lesson' });
  });

  afterEach(() => {
    httpMock.verify();
    vi.restoreAllMocks();
  });

  it('emits closed when cancel is invoked', () => {
    const spy = vi.fn();
    component.closed.subscribe(spy);
    component.cancel();
    expect(spy).toHaveBeenCalled();
  });

  it('onBackdrop closes only when the backdrop itself is clicked', () => {
    const spy = vi.fn();
    component.closed.subscribe(spy);

    const target = document.createElement('div');
    component.onBackdrop({ target, currentTarget: target } as unknown as MouseEvent);
    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockClear();
    const inner = document.createElement('div');
    component.onBackdrop({ target: inner, currentTarget: target } as unknown as MouseEvent);
    expect(spy).not.toHaveBeenCalled();
  });

  it('proceed posts checkout with the lesson id and redirects on success', async () => {
    Object.defineProperty(globalThis, 'location', {
      configurable: true,
      value: { href: '' } as Location,
    });

    const checkoutSpy = vi
      .spyOn(store, 'checkout')
      .mockResolvedValue({ checkoutUrl: 'https://pay.example/x', sessionId: 's1' });

    await component.proceed();

    expect(checkoutSpy).toHaveBeenCalledWith({
      studentId: 'student-1',
      itemType: 'LESSON',
      itemId: 'lesson-1',
      bundleId: 'lesson-1',
    });
    expect(globalThis.location.href).toBe('https://pay.example/x');
  });

  it('proceed is a no-op when lessonId is missing', async () => {
    setInputs(component, { lessonId: '' });
    const checkoutSpy = vi.spyOn(store, 'checkout');
    await component.proceed();
    expect(checkoutSpy).not.toHaveBeenCalled();
  });
});
