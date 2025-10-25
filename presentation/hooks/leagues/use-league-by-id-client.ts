"use client";

import { useState, useEffect } from "react";
import { useGetLeagueById } from "@/di/client/hooks/use-leagues";
import type { League } from "@/domain/entities/league";

/**
 * Custom Hook: useLeagueByIdClient
 *
 * Fetches a specific league by ID using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute get league by ID use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { league, isLoading, error, refetch } = useLeagueById('league-id');
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!league) return <NotFound />;
 *
 * return <LeagueDetails league={league} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseLeagueByIdResult {
  /**
   * The fetched league (null if not found)
   */
  league: League | null;

  /**
   * Loading state during fetch
   */
  isLoading: boolean;

  /**
   * Error message if fetch fails
   */
  error: string | null;

  /**
   * Refetch the league
   */
  refetch: () => Promise<void>;
}

export function useLeagueByIdClient(id: string): UseLeagueByIdResult {
  const getLeagueByIdUseCase = useGetLeagueById();

  const [league, setLeague] = useState<League | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeague = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("[useLeagueByIdClient] Fetching league from browser...", {
        id,
      });

      const result = await getLeagueByIdUseCase.execute(id);

      if (result) {
        console.log("[useLeagueByIdClient] League fetched successfully:", {
          id: result.id,
          name: result.name,
        });
      } else {
        console.log("[useLeagueByIdClient] League not found:", { id });
      }

      setLeague(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch league";

      console.error("[useLeagueByIdClient] Error fetching league:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLeague();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    league,
    isLoading,
    error,
    refetch: fetchLeague,
  };
}
