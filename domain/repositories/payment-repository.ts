import type {
  CheckoutSession,
  PaymentStatus,
} from "@/domain/entities/checkout-session";

/**
 * Payment Repository Interface
 * Defines the contract for payment-related operations
 */
export interface PaymentRepository {
  /**
   * Creates a Stripe Checkout Session and returns the client secret
   * Used by EmbeddedCheckoutProvider to initialize the checkout form
   */
  createCheckoutSession(): Promise<CheckoutSession>;

  /**
   * Verifies if the current user has completed payment
   * Used in middleware and components to check payment status
   */
  verifyPaymentStatus(): Promise<PaymentStatus>;

  /**
   * Retrieves session status by session_id
   * Used in return/success page to verify payment completion
   */
  getSessionStatus(sessionId: string): Promise<PaymentStatus>;
}
