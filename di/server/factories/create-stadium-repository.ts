import { StadiumRepositoryImpl } from "@/infrastructure/repositories/stadium-repository-impl";
import type { HttpClient } from "@/infrastructure/http/client";

/**
 * Factory function to create Stadium Repository
 * Used in Server Components for direct instantiation
 */
export function createStadiumRepository(httpClient: HttpClient) {
  return new StadiumRepositoryImpl(httpClient);
}
