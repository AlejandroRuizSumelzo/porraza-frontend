"use client";

import { useState, useEffect } from "react";
import { useGetPublicLeagues } from "@/di/client/hooks/use-leagues";
import type { League } from "@/domain/entities/league";

/**
 * Custom Hook: usePublicLeaguesClient
 *
 * Fetches only public leagues using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute get public leagues use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { leagues, isLoading, error, refetch } = usePublicLeagues();
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!leagues.length) return <EmptyState />;
 *
 * return <PublicLeagueList leagues={leagues} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UsePublicLeaguesResult {
  /**
   * The fetched public leagues
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
   * Refetch the public leagues
   */
  refetch: () => Promise<void>;
}

export function usePublicLeaguesClient(): UsePublicLeaguesResult {
  const getPublicLeaguesUseCase = useGetPublicLeagues();

  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeagues = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("[usePublicLeaguesClient] Fetching public leagues from browser...");

      const result = await getPublicLeaguesUseCase.execute();

      console.log("[usePublicLeaguesClient] Public leagues fetched successfully:", {
        total: result.length,
      });

      setLeagues(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch public leagues";

      console.error("[usePublicLeaguesClient] Error fetching public leagues:", err);
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
