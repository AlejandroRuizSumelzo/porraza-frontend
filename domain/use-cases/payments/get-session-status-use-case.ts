import type { PaymentStatus } from "@/domain/entities/checkout-session";
import type { PaymentRepository } from "@/domain/repositories/payment-repository";

/**
 * Get Session Status Use Case
 * Business logic for retrieving payment status by session ID
 */
export class GetSessionStatusUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(sessionId: string): Promise<PaymentStatus> {
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    return await this.paymentRepository.getSessionStatus(sessionId);
  }
}
