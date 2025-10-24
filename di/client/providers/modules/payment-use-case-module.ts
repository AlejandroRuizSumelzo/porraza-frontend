import type { DependencyModule } from "./base-module";
import type { PaymentRepository } from "@/domain/repositories/payment-repository";
import { CreateCheckoutSessionUseCase } from "@/domain/use-cases/payments/create-checkout-session-use-case";
import { VerifyPaymentStatusUseCase } from "@/domain/use-cases/payments/verify-payment-status-use-case";
import { GetSessionStatusUseCase } from "@/domain/use-cases/payments/get-session-status-use-case";

/**
 * Payment Use Case Module
 * Registers all payment-related use cases in the DI container
 */

interface PaymentUseCaseModuleDeps {
  paymentRepository: PaymentRepository;
}

export class PaymentUseCaseModule implements DependencyModule {
  constructor(private deps: PaymentUseCaseModuleDeps) {}

  register() {
    const createCheckoutSessionUseCase = new CreateCheckoutSessionUseCase(
      this.deps.paymentRepository
    );
    const verifyPaymentStatusUseCase = new VerifyPaymentStatusUseCase(
      this.deps.paymentRepository
    );
    const getSessionStatusUseCase = new GetSessionStatusUseCase(
      this.deps.paymentRepository
    );

    return {
      createCheckoutSessionUseCase,
      verifyPaymentStatusUseCase,
      getSessionStatusUseCase,
    };
  }
}
