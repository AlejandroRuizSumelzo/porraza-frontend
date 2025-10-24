import type { CheckoutSession } from "@/domain/entities/checkout-session";
import type { PaymentRepository } from "@/domain/repositories/payment-repository";

/**
 * Create Checkout Session Use Case
 * Business logic for creating a Stripe Checkout Session
 */
export class CreateCheckoutSessionUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(): Promise<CheckoutSession> {
    return await this.paymentRepository.createCheckoutSession();
  }
}
