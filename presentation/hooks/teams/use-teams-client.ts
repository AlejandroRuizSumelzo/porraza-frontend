"use client";

import { useState, useEffect } from "react";
import { useGetAllTeams } from "@/di/client/hooks/use-teams";
import type { Team } from "@/domain/entities/team";

/**
 * Custom Hook: useTeams (Client)
 *
 * Fetches all teams from the API using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { teams, isLoading, error } = useTeams();
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!teams || teams.length === 0) return <EmptyState />;
 *
 * return <TeamList teams={teams} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 * - Token refresh is handled automatically
 */

interface UseTeamsResult {
  /**
   * The fetched teams
   */
  teams: Team[] | null;

  /**
   * Loading state during fetch
   */
  isLoading: boolean;

  /**
   * Error message if fetch fails
   */
  error: string | null;

  /**
   * Refetch the teams
   */
  refetch: () => Promise<void>;
}

export function useTeams(): UseTeamsResult {
  const getAllTeamsUseCase = useGetAllTeams();

  const [teams, setTeams] = useState<Team[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("[useTeams] Fetching teams from browser...");

      const result = await getAllTeamsUseCase.execute();

      console.log("[useTeams] Teams fetched successfully:", {
        total: result.length,
      });

      setTeams(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch teams";

      console.error("[useTeams] Error fetching teams:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    teams,
    isLoading,
    error,
    refetch: fetchTeams,
  };
}
