import type { PaymentStatus } from "@/domain/entities/checkout-session";
import type { PaymentRepository } from "@/domain/repositories/payment-repository";

/**
 * Verify Payment Status Use Case
 * Business logic for verifying if a user has completed payment
 */
export class VerifyPaymentStatusUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(): Promise<PaymentStatus> {
    return await this.paymentRepository.verifyPaymentStatus();
  }
}
