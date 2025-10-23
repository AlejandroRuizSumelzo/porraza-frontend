import type { HttpClient } from "@/infrastructure/http/client";
import type { AuthRepository } from "@/domain/repositories/auth-repository";
import type { LoginUseCase } from "@/domain/use-cases/auth/login-use-case";
import type { RefreshTokenUseCase } from "@/domain/use-cases/auth/refresh-token-use-case";
import type { LogoutUseCase } from "@/domain/use-cases/auth/logout-use-case";

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

  // Use Cases
  loginUseCase: LoginUseCase;
  refreshTokenUseCase: RefreshTokenUseCase;
  logoutUseCase: LogoutUseCase;
}
