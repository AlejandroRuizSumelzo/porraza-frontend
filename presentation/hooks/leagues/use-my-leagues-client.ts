"use client";

import { useState, useEffect } from "react";
import { useGetMyLeagues } from "@/di/client/hooks/use-leagues";
import type { League } from "@/domain/entities/league";

/**
 * Custom Hook: useMyLeaguesClient
 *
 * Fetches leagues where the current user is a member using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute get my leagues use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { leagues, isLoading, error, refetch } = useMyLeagues();
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!leagues.length) return <EmptyState />;
 *
 * return <MyLeaguesList leagues={leagues} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Requires authentication
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseMyLeaguesResult {
  /**
   * The fetched user leagues
   */
  leagues: League[];

  /**
   * Loading state during fetch
   */
  isLoading: boolean;

  /**
   * Error message if fetch fails
   */
  error: string | null;

  /**
   * Refetch the user leagues
   */
  refetch: () => Promise<void>;
}

export function useMyLeaguesClient(): UseMyLeaguesResult {
  const getMyLeaguesUseCase = useGetMyLeagues();

  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeagues = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("[useMyLeaguesClient] Fetching my leagues from browser...");

      const result = await getMyLeaguesUseCase.execute();

      console.log("[useMyLeaguesClient] My leagues fetched successfully:", {
        total: result.length,
      });

      setLeagues(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch your leagues";

      console.error("[useMyLeaguesClient] Error fetching my leagues:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeagues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    leagues,
    isLoading,
    error,
    refetch: fetchLeagues,
  };
}
