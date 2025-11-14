"use client";

import { useState, useEffect } from "react";
import { useGetLeagueByInviteCode } from "@/di/client/hooks/use-leagues";
import type { League } from "@/domain/entities/league";

/**
 * Custom Hook: useLeagueByInviteCodeClient
 *
 * Fetches a specific league by its invite code using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute get league by invite code use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { league, isLoading, error, refetch } = useLeagueByInviteCodeClient('PORRAZA2026');
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!league) return <NotFound />;
 *
 * return <LeagueInvitePreview league={league} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 * - League code is validated (6-20 alphanumeric characters)
 */

interface UseLeagueByInviteCodeResult {
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

export function useLeagueByInviteCodeClient(
  code: string | null
): UseLeagueByInviteCodeResult {
  const getLeagueByInviteCodeUseCase = useGetLeagueByInviteCode();

  const [league, setLeague] = useState<League | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeague = async () => {
    if (!code) {
      setIsLoading(false);
      setError("League code is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(
        "[useLeagueByInviteCodeClient] Fetching league from browser...",
        {
          code,
        }
      );

      const result = await getLeagueByInviteCodeUseCase.execute(code);

      if (result) {
        console.log(
          "[useLeagueByInviteCodeClient] League fetched successfully:",
          {
            id: result.id,
            name: result.name,
            visibility: result.visibility,
          }
        );
      } else {
        console.log("[useLeagueByInviteCodeClient] League not found:", {
          code,
        });
      }

      setLeague(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch league";

      console.error(
        "[useLeagueByInviteCodeClient] Error fetching league:",
        err
      );
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (code) {
      fetchLeague();
    } else {
      setIsLoading(false);
      setLeague(null);
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return {
    league,
    isLoading,
    error,
    refetch: fetchLeague,
  };
}
