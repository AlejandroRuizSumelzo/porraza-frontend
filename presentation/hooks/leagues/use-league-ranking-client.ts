"use client";

import { useState, useEffect } from "react";
import { useGetLeagueRanking } from "@/di/client/hooks/use-leagues";
import type { LeagueRanking } from "@/domain/entities/league";

/**
 * Custom Hook: useLeagueRankingClient
 *
 * Fetches the ranking/leaderboard of a league using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute get league ranking use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { ranking, isLoading, error, refetch } = useLeagueRankingClient(leagueId);
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!ranking) return <EmptyState />;
 *
 * return <RankingTable ranking={ranking} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Requires authentication
 * - Rankings are ordered by points with tie-breaking criteria
 * - Email addresses are partially masked for privacy
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseLeagueRankingResult {
  /**
   * The fetched league ranking data
   */
  ranking: LeagueRanking | null;

  /**
   * Loading state during fetch
   */
  isLoading: boolean;

  /**
   * Error message if fetch fails
   */
  error: string | null;

  /**
   * Refetch the league ranking
   */
  refetch: () => Promise<void>;
}

export function useLeagueRankingClient(leagueId: string): UseLeagueRankingResult {
  const getLeagueRankingUseCase = useGetLeagueRanking();

  const [ranking, setRanking] = useState<LeagueRanking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRanking = async () => {
    if (!leagueId) {
      setError("League ID is required");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(
        "[useLeagueRankingClient] Fetching league ranking from browser...",
        { leagueId }
      );

      const result = await getLeagueRankingUseCase.execute(leagueId);

      console.log("[useLeagueRankingClient] League ranking fetched successfully:", {
        leagueId,
        totalMembers: result.totalMembers,
        activePredictions: result.activePredictions,
        rankingEntries: result.ranking.length,
      });

      setRanking(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch league ranking";

      console.error("[useLeagueRankingClient] Error fetching league ranking:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRanking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueId]);

  return {
    ranking,
    isLoading,
    error,
    refetch: fetchRanking,
  };
}
