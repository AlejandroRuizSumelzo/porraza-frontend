"use client";

import { useState, useEffect } from "react";
import { useGetLeaguesByCategory } from "@/di/client/hooks/use-leagues";
import type { League, LeagueCategory } from "@/domain/entities/league";

/**
 * Custom Hook: useLeaguesByCategoryClient
 *
 * Fetches public leagues filtered by category using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute get leagues by category use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { leagues, isLoading, error, refetch } = useLeaguesByCategoryClient('corporate');
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!leagues.length) return <EmptyState />;
 *
 * return <LeagueList leagues={leagues} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Returns only public leagues in the specified category
 * - Valid categories: general, corporate, friends, community
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseLeaguesByCategoryResult {
  /**
   * The fetched leagues for the specified category
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
   * Refetch the leagues for the current category
   */
  refetch: () => Promise<void>;
}

export function useLeaguesByCategoryClient(
  category: LeagueCategory
): UseLeaguesByCategoryResult {
  const getLeaguesByCategoryUseCase = useGetLeaguesByCategory();

  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeagues = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log(
        `[useLeaguesByCategoryClient] Fetching leagues for category "${category}" from browser...`
      );

      const result = await getLeaguesByCategoryUseCase.execute(category);

      console.log(
        `[useLeaguesByCategoryClient] Leagues for category "${category}" fetched successfully:`,
        {
          total: result.length,
        }
      );

      setLeagues(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : `Failed to fetch leagues for category ${category}`;

      console.error(
        `[useLeaguesByCategoryClient] Error fetching leagues for category "${category}":`,
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
  }, [category]);

  return {
    leagues,
    isLoading,
    error,
    refetch: fetchLeagues,
  };
}
