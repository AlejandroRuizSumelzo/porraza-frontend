import type { HttpClient } from "@/infrastructure/http/client";
import type { DependencyModule } from "./base-module";
import type { AuthRepository } from "@/domain/repositories/auth-repository";
import type { PaymentRepository } from "@/domain/repositories/payment-repository";
import type { MatchRepository } from "@/domain/repositories/match-repository";
import type { StadiumRepository } from "@/domain/repositories/stadium-repository";
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth-repository-impl";
import { PaymentRepositoryImpl } from "@/infrastructure/repositories/payment-repository-impl";
import { MatchRepositoryImpl } from "@/infrastructure/repositories/match-repository-impl";
import { StadiumRepositoryImpl } from "@/infrastructure/repositories/stadium-repository-impl";

/**
 * Repository Module
 * Registers all repository implementations in the DI container
 *
 * IMPORTANT: Only add repositories here if they are used in CLIENT COMPONENTS
 * For Server Components, use factories from di/server/factories instead
 */

interface RepositoryModuleDeps {
  httpClient: HttpClient;
}

export class RepositoryModule implements DependencyModule {
  constructor(private deps: RepositoryModuleDeps) {}

  register() {
    // Register repositories needed by Client Components here
    const authRepository: AuthRepository = new AuthRepositoryImpl(
      this.deps.httpClient
    );

    const paymentRepository: PaymentRepository = new PaymentRepositoryImpl(
      this.deps.httpClient
    );

    const matchRepository: MatchRepository = new MatchRepositoryImpl(
      this.deps.httpClient
    );

    const stadiumRepository: StadiumRepository = new StadiumRepositoryImpl(
      this.deps.httpClient
    );

    return {
      authRepository,
      paymentRepository,
      matchRepository,
      stadiumRepository,
    };
  }
}
