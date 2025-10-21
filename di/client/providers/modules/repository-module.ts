import type { HttpClient } from "@/infrastructure/http/client";
import type { DependencyModule } from "./base-module";

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
    // Example:
    // const userRepository = new UserRepositoryImpl(this.deps.httpClient);

    return {
      // Add repositories here as needed
    };
  }
}
