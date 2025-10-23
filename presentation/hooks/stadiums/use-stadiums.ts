import type { Stadium } from "@/domain/entities/stadium";
import { httpClient } from "@/infrastructure/http/client";
import { createStadiumRepository } from "@/di/server/factories/create-stadium-repository";
import { createGetAllStadiumsUseCase } from "@/di/server/factories/create-stadium-use-cases";

/**
 * Server Function: getStadiums
 *
 * Encapsulates the business logic for fetching stadiums
 * This is a SERVER-SIDE function for use in Server Components (NOT a React hook)
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute use case
 * - Handle errors gracefully
 * - Return data in a consistent format
 *
 * Usage in Server Components:
 * ```tsx
 * const { stadiums, error } = await getStadiums();
 * ```
 */

interface GetStadiumsResult {
  stadiums: Stadium[] | null;
  error: string | null;
}

export async function getStadiums(): Promise<GetStadiumsResult> {
  try {
    // Dependency Injection
    const repository = createStadiumRepository(httpClient);
    const getAllStadiumsUseCase = createGetAllStadiumsUseCase(repository);

    // Execute use case
    const stadiums = await getAllStadiumsUseCase.execute();

    // Log for debugging (can be removed in production)
    console.log('[getStadiums] Fetched stadiums:', stadiums);

    return {
      stadiums,
      error: null,
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to fetch stadiums";

    console.error("[getStadiums] Error:", err);

    return {
      stadiums: null,
      error: errorMessage,
    };
  }
}
