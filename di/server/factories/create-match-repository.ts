import { MatchRepositoryImpl } from "@/infrastructure/repositories/match-repository-impl";
import type { HttpClient } from "@/infrastructure/http/client";

/**
 * Factory function to create Match Repository
 * Used in Server Components for direct instantiation
 */
export function createMatchRepository(httpClient: HttpClient) {
  return new MatchRepositoryImpl(httpClient);
}
