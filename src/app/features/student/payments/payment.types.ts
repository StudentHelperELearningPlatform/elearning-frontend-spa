export type PaymentItemType = 'LESSON' | 'BUNDLE' | 'SUBSCRIPTION';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export interface PaymentRecord {
  id: string;
  itemType: PaymentItemType;
  itemId: string;
  itemTitle: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
}

export interface CheckoutRequest {
  studentId: string;
  itemType: PaymentItemType;
  itemId: string;
  bundleId?: string;
}

export interface CheckoutResponse {
  checkoutUrl: string;
  sessionId: string;
}
