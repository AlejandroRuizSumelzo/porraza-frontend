import type { Stadium } from "@/domain/entities/stadium";
import { httpClient } from "@/infrastructure/http/client";
import { createStadiumRepository } from "@/di/server/factories/create-stadium-repository";
import { createGetAllStadiumsUseCase } from "@/di/server/factories/create-stadium-use-cases";

/**
 * Custom Hook: useStadiums
 *
 * Encapsulates the business logic for fetching stadiums
 * This is a SERVER-SIDE hook (async function, not React hook)
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute use case
 * - Handle errors gracefully
 * - Return data in a consistent format
 *
 * Usage in Server Components:
 * ```tsx
 * const { stadiums, error } = await useStadiums();
 * ```
 */

interface UseStadiumsResult {
  stadiums: Stadium[] | null;
  error: string | null;
}

export async function useStadiums(): Promise<UseStadiumsResult> {
  try {
    // Dependency Injection
    const repository = createStadiumRepository(httpClient);
    const getAllStadiumsUseCase = createGetAllStadiumsUseCase(repository);

    // Execute use case
    const stadiums = await getAllStadiumsUseCase.execute();

    // Log for debugging (can be removed in production)
    console.log('[useStadiums] Fetched stadiums:', stadiums);

    return {
      stadiums,
      error: null,
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to fetch stadiums";

    console.error("[useStadiums] Error:", err);

    return {
      stadiums: null,
      error: errorMessage,
    };
  }
}
