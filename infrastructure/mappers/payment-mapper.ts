import type {
  CheckoutSession,
  PaymentStatus,
} from "@/domain/entities/checkout-session";
import type {
  CheckoutSessionDTO,
  PaymentStatusDTO,
} from "@/infrastructure/http/dtos/payment-dto";

/**
 * Payment Mapper
 * Transforms data between DTOs (API format) and domain entities
 */
export class PaymentMapper {
  /**
   * Maps CheckoutSessionDTO to domain CheckoutSession entity
   */
  static toCheckoutSessionDomain(dto: CheckoutSessionDTO): CheckoutSession {
    return {
      clientSecret: dto.clientSecret,
      sessionId: dto.sessionId,
    };
  }

  /**
   * Maps PaymentStatusDTO to domain PaymentStatus entity
   */
  static toPaymentStatusDomain(dto: PaymentStatusDTO): PaymentStatus {
    return {
      hasPaid: dto.hasPaid,
      paymentDate: dto.paymentDate,
      email: dto.email,
    };
  }
}
