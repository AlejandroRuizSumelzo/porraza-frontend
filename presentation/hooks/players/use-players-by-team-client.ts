"use client";

import { useState, useEffect } from "react";
import { useGetPlayersByTeam } from "@/di/client/hooks/use-players";
import type { Player } from "@/domain/entities/player";

/**
 * Custom Hook: usePlayersByTeam (Client)
 *
 * Fetches all players from a specific team using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute use case with team ID
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { players, isLoading, error } = usePlayersByTeam(teamId);
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!players || players.length === 0) return <EmptyState />;
 *
 * return <PlayerList players={players} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 * - Token refresh is handled automatically
 */

interface UsePlayersByTeamResult {
  /**
   * The fetched players (23 players from the team)
   */
  players: Player[] | null;

  /**
   * Loading state during fetch
   */
  isLoading: boolean;

  /**
   * Error message if fetch fails
   */
  error: string | null;

  /**
   * Refetch the players
   */
  refetch: () => Promise<void>;
}

export function usePlayersByTeam(
  teamId: string | null
): UsePlayersByTeamResult {
  const getPlayersByTeamUseCase = useGetPlayersByTeam();

  const [players, setPlayers] = useState<Player[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayers = async () => {
    if (!teamId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("[usePlayersByTeam] Fetching players from browser...", {
        teamId,
      });

      const result = await getPlayersByTeamUseCase.execute(teamId);

      console.log("[usePlayersByTeam] Players fetched successfully:", {
        teamId,
        total: result.length,
      });

      setPlayers(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch players";

      console.error("[usePlayersByTeam] Error fetching players:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  return {
    players,
    isLoading,
    error,
    refetch: fetchPlayers,
  };
}
