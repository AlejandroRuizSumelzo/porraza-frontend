/**
 * Checkout Session Entity
 * Represents a Stripe Checkout Session
 */
export interface CheckoutSession {
  clientSecret: string;
  sessionId: string;
}

/**
 * Payment Status Entity
 * Represents the payment status of a user
 */
export interface PaymentStatus {
  hasPaid: boolean;
  paymentDate?: string;
  email?: string;
}
