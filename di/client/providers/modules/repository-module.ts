import type { HttpClient } from "@/infrastructure/http/client";
import type { DependencyModule } from "./base-module";
import type { AuthRepository } from "@/domain/repositories/auth-repository";
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth-repository-impl";

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

    return {
      authRepository,
    };
  }
}
