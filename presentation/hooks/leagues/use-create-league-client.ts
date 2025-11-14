"use client";

import { useState } from "react";
import { useCreateLeague } from "@/di/client/hooks/use-leagues";
import type { League } from "@/domain/entities/league";
import type { CreateLeagueParams } from "@/domain/use-cases/leagues/create-league-use-case";

/**
 * Custom Hook: useCreateLeagueClient
 *
 * Creates a new league (public or private) using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute create league use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { createLeague, isCreating, error, createdLeague } = useCreateLeagueClient();
 *
 * const handleSubmit = async (data) => {
 *   await createLeague(data);
 * };
 *
 * if (isCreating) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (createdLeague) return <SuccessMessage league={createdLeague} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Requires authentication (payment and email verification)
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseCreateLeagueResult {
  /**
   * Function to create a new league
   */
  createLeague: (params: CreateLeagueParams) => Promise<League | null>;

  /**
   * Loading state during creation
   */
  isCreating: boolean;

  /**
   * Error message if creation fails
   */
  error: string | null;

  /**
   * The created league (null if not created yet)
   */
  createdLeague: League | null;

  /**
   * Reset the hook state
   */
  reset: () => void;
}

export function useCreateLeagueClient(): UseCreateLeagueResult {
  const createLeagueUseCase = useCreateLeague();

  const [createdLeague, setCreatedLeague] = useState<League | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createLeague = async (
    params: CreateLeagueParams
  ): Promise<League | null> => {
    setIsCreating(true);
    setError(null);
    setCreatedLeague(null);

    try {
      console.log("[useCreateLeagueClient] Creating league from browser...", {
        name: params.name,
        visibility: params.visibility,
        category: params.category,
      });

      const result = await createLeagueUseCase.execute(params);

      console.log("[useCreateLeagueClient] League created successfully:", {
        id: result.id,
        name: result.name,
        visibility: result.visibility,
        category: result.category,
      });

      setCreatedLeague(result);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create league";

      console.error("[useCreateLeagueClient] Error creating league:", err);
      setError(errorMessage);
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  const reset = () => {
    setCreatedLeague(null);
    setError(null);
    setIsCreating(false);
  };

  return {
    createLeague,
    isCreating,
    error,
    createdLeague,
    reset,
  };
}
