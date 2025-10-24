/**
 * DTO for Checkout Session creation response
 * Backend returns camelCase fields
 */
export interface CheckoutSessionDTO {
  clientSecret: string;
  sessionId: string;
}

/**
 * DTO for Payment Status verification
 * Backend returns camelCase fields
 */
export interface PaymentStatusDTO {
  hasPaid: boolean;
  paymentDate?: string;
  email?: string;
}
