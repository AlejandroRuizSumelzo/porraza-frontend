"use client";

import { useState, useEffect } from "react";
import { useGetLeagueMembers } from "@/di/client/hooks/use-leagues";
import type { LeagueMember } from "@/domain/entities/league";

/**
 * Custom Hook: useLeagueMembersClient
 *
 * Fetches all members of a league using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute get league members use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { members, isLoading, error, refetch } = useLeagueMembers(leagueId);
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!members.length) return <EmptyState />;
 *
 * return <MembersList members={members} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Requires authentication
 * - Members are ordered by join date (oldest first)
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseLeagueMembersResult {
  /**
   * The fetched league members
   */
  members: LeagueMember[];

  /**
   * Loading state during fetch
   */
  isLoading: boolean;

  /**
   * Error message if fetch fails
   */
  error: string | null;

  /**
   * Refetch the league members
   */
  refetch: () => Promise<void>;
}

export function useLeagueMembersClient(leagueId: string): UseLeagueMembersResult {
  const getLeagueMembersUseCase = useGetLeagueMembers();

  const [members, setMembers] = useState<LeagueMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = async () => {
    if (!leagueId) {
      setError("League ID is required");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(
        "[useLeagueMembersClient] Fetching league members from browser...",
        { leagueId }
      );

      const result = await getLeagueMembersUseCase.execute(leagueId);

      console.log("[useLeagueMembersClient] League members fetched successfully:", {
        leagueId,
        total: result.length,
      });

      setMembers(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch league members";

      console.error("[useLeagueMembersClient] Error fetching league members:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueId]);

  return {
    members,
    isLoading,
    error,
    refetch: fetchMembers,
  };
}
