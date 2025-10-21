import type { HttpClient } from "@/infrastructure/http/client";

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
  // Add client-side repositories here
  // Example: userRepository: UserRepository;

  // Use Cases
  // Add client-side use cases here
  // Example: loginUseCase: LoginUseCase;
}
