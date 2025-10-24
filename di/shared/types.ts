import type { HttpClient } from "@/infrastructure/http/client";
import type { AuthRepository } from "@/domain/repositories/auth-repository";
import type { PaymentRepository } from "@/domain/repositories/payment-repository";
import type { MatchRepository } from "@/domain/repositories/match-repository";
import type { StadiumRepository } from "@/domain/repositories/stadium-repository";
import type { LoginUseCase } from "@/domain/use-cases/auth/login-use-case";
import type { RegisterUseCase } from "@/domain/use-cases/auth/register-use-case";
import type { VerifyEmailUseCase } from "@/domain/use-cases/auth/verify-email-use-case";
import type { RefreshTokenUseCase } from "@/domain/use-cases/auth/refresh-token-use-case";
import type { LogoutUseCase } from "@/domain/use-cases/auth/logout-use-case";
import type { ForgotPasswordUseCase } from "@/domain/use-cases/auth/forgot-password-use-case";
import type { ResetPasswordUseCase } from "@/domain/use-cases/auth/reset-password-use-case";
import type { CreateCheckoutSessionUseCase } from "@/domain/use-cases/payments/create-checkout-session-use-case";
import type { VerifyPaymentStatusUseCase } from "@/domain/use-cases/payments/verify-payment-status-use-case";
import type { GetSessionStatusUseCase } from "@/domain/use-cases/payments/get-session-status-use-case";
import type { GetMatchCalendarUseCase } from "@/domain/use-cases/matches/get-match-calendar-use-case";
import type { GetAllStadiumsUseCase } from "@/domain/use-cases/stadiums/get-all-stadiums-use-case";

/**
 * Dependencies Interface
 * Defines all available dependencies in the DI container for CLIENT COMPONENTS
 *
 * IMPORTANT: Only add dependencies here if they are used in Client Components
 * For Server Components, use factories from di/server/factories instead
 *
 * This keeps the client bundle small and optimizes performance
 */
export interface Dependencies {
  // Infrastructure
  httpClient: HttpClient;

  // Repositories
  authRepository: AuthRepository;
  paymentRepository: PaymentRepository;
  matchRepository: MatchRepository;
  stadiumRepository: StadiumRepository;

  // Auth Use Cases
  loginUseCase: LoginUseCase;
  registerUseCase: RegisterUseCase;
  verifyEmailUseCase: VerifyEmailUseCase;
  refreshTokenUseCase: RefreshTokenUseCase;
  logoutUseCase: LogoutUseCase;
  forgotPasswordUseCase: ForgotPasswordUseCase;
  resetPasswordUseCase: ResetPasswordUseCase;

  // Payment Use Cases
  createCheckoutSessionUseCase: CreateCheckoutSessionUseCase;
  verifyPaymentStatusUseCase: VerifyPaymentStatusUseCase;
  getSessionStatusUseCase: GetSessionStatusUseCase;

  // Match Use Cases
  getMatchCalendarUseCase: GetMatchCalendarUseCase;

  // Stadium Use Cases
  getAllStadiumsUseCase: GetAllStadiumsUseCase;
}
