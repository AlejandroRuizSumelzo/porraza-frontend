"use client";

import { useState, useEffect } from "react";
import { useGetTeamById } from "@/di/client/hooks/use-teams";
import type { Team } from "@/domain/entities/team";

/**
 * Custom Hook: useTeamById (Client)
 *
 * Fetches a specific team by ID from the API using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute use case with team ID
 * - Handle loading, error, and success states
 * - Handle not found state (404)
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { team, isLoading, error, notFound } = useTeamById(teamId);
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (notFound) return <NotFound />;
 * if (!team) return null;
 *
 * return <TeamDetails team={team} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 * - Token refresh is handled automatically
 */

interface UseTeamByIdResult {
  /**
   * The fetched team
   */
  team: Team | null;

  /**
   * Loading state during fetch
   */
  isLoading: boolean;

  /**
   * Error message if fetch fails
   */
  error: string | null;

  /**
   * True if team was not found (404)
   */
  notFound: boolean;

  /**
   * Refetch the team
   */
  refetch: () => Promise<void>;
}

export function useTeamById(id: string | null): UseTeamByIdResult {
  const getTeamByIdUseCase = useGetTeamById();

  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const fetchTeam = async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setNotFound(false);

    try {
      console.log("[useTeamById] Fetching team from browser...", { id });

      const result = await getTeamByIdUseCase.execute(id);

      if (result === null) {
        console.log("[useTeamById] Team not found");
        setNotFound(true);
        setTeam(null);
      } else {
        console.log("[useTeamById] Team fetched successfully:", {
          id: result.id,
          name: result.name,
        });
        setTeam(result);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch team";

      console.error("[useTeamById] Error fetching team:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    team,
    isLoading,
    error,
    notFound,
    refetch: fetchTeam,
  };
}
