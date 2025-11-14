"use client";

import { useState, useEffect } from "react";
import { useGetCorporateLeagues } from "@/di/client/hooks/use-leagues";
import type { League } from "@/domain/entities/league";

/**
 * Custom Hook: useCorporateLeaguesClient
 *
 * Fetches only public corporate leagues using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute get corporate leagues use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { leagues, isLoading, error, refetch } = useCorporateLeaguesClient();
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!leagues.length) return <EmptyState />;
 *
 * return <CorporateLeagueList leagues={leagues} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Returns only public leagues with category "corporate"
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseCorporateLeaguesResult {
  /**
   * The fetched corporate leagues
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
   * Refetch the corporate leagues
   */
  refetch: () => Promise<void>;
}

export function useCorporateLeaguesClient(): UseCorporateLeaguesResult {
  const getCorporateLeaguesUseCase = useGetCorporateLeagues();

  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeagues = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log(
        "[useCorporateLeaguesClient] Fetching corporate leagues from browser..."
      );

      const result = await getCorporateLeaguesUseCase.execute();

      console.log(
        "[useCorporateLeaguesClient] Corporate leagues fetched successfully:",
        {
          total: result.length,
        }
      );

      setLeagues(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch corporate leagues";

      console.error(
        "[useCorporateLeaguesClient] Error fetching corporate leagues:",
        err
      );
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
