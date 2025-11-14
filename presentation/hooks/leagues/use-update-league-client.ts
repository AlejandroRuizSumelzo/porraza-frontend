"use client";

import { useState } from "react";
import { useUpdateLeague } from "@/di/client/hooks/use-leagues";
import type { League, LeagueCategory, LeagueVisibility } from "@/domain/entities/league";

/**
 * Custom Hook: useUpdateLeagueClient
 *
 * Updates league information (admin only) using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute update league use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { updateLeague, isUpdating, error, updatedLeague } = useUpdateLeague();
 *
 * const handleSubmit = async (data) => {
 *   await updateLeague(leagueId, data);
 * };
 *
 * if (isUpdating) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (updatedLeague) return <SuccessMessage league={updatedLeague} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Requires authentication and admin permissions
 * - Only the league admin can update league information
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UpdateLeagueParams {
  name?: string;
  description?: string;
  visibility?: LeagueVisibility;
  category?: LeagueCategory;
  requiredEmailDomain?: string;
}

interface UseUpdateLeagueResult {
  /**
   * Function to update a league
   */
  updateLeague: (
    id: string,
    params: UpdateLeagueParams
  ) => Promise<League | null>;

  /**
   * Loading state during update
   */
  isUpdating: boolean;

  /**
   * Error message if update fails
   */
  error: string | null;

  /**
   * The updated league (null if not updated yet)
   */
  updatedLeague: League | null;

  /**
   * Reset the hook state
   */
  reset: () => void;
}

export function useUpdateLeagueClient(): UseUpdateLeagueResult {
  const updateLeagueUseCase = useUpdateLeague();

  const [updatedLeague, setUpdatedLeague] = useState<League | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateLeague = async (
    id: string,
    params: UpdateLeagueParams
  ): Promise<League | null> => {
    setIsUpdating(true);
    setError(null);
    setUpdatedLeague(null);

    try {
      console.log("[useUpdateLeagueClient] Updating league from browser...", {
        id,
        params,
      });

      const result = await updateLeagueUseCase.execute(id, params);

      console.log("[useUpdateLeagueClient] League updated successfully:", {
        id: result.id,
        name: result.name,
        visibility: result.visibility,
        category: result.category,
      });

      setUpdatedLeague(result);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update league";

      console.error("[useUpdateLeagueClient] Error updating league:", err);
      setError(errorMessage);
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  const reset = () => {
    setUpdatedLeague(null);
    setError(null);
    setIsUpdating(false);
  };

  return {
    updateLeague,
    isUpdating,
    error,
    updatedLeague,
    reset,
  };
}
