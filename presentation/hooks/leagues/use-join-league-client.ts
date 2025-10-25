"use client";

import { useState } from "react";
import { useJoinLeague } from "@/di/client/hooks/use-leagues";
import type { League } from "@/domain/entities/league";

/**
 * Custom Hook: useJoinLeagueClient
 *
 * Joins a league (public or private with invite code) using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute join league use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { joinLeague, isJoining, error, joinedLeague } = useJoinLeague();
 *
 * const handleJoin = async (leagueId, inviteCode) => {
 *   const league = await joinLeague(leagueId, inviteCode);
 *   if (league) {
 *     router.push(`/leagues/${league.id}`);
 *   }
 * };
 *
 * if (isJoining) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Requires authentication, payment, and email verification
 * - Public leagues can be joined without invite code
 * - Private leagues require a valid 8-character invite code
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseJoinLeagueResult {
  /**
   * Function to join a league
   * @param id League UUID
   * @param inviteCode Optional invite code for private leagues
   * @returns Joined league or null if failed
   */
  joinLeague: (id: string, inviteCode?: string) => Promise<League | null>;

  /**
   * Loading state during join
   */
  isJoining: boolean;

  /**
   * Error message if join fails
   */
  error: string | null;

  /**
   * The joined league (null if not joined yet)
   */
  joinedLeague: League | null;

  /**
   * Reset the hook state
   */
  reset: () => void;
}

export function useJoinLeagueClient(): UseJoinLeagueResult {
  const joinLeagueUseCase = useJoinLeague();

  const [joinedLeague, setJoinedLeague] = useState<League | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const joinLeague = async (
    id: string,
    inviteCode?: string
  ): Promise<League | null> => {
    setIsJoining(true);
    setError(null);
    setJoinedLeague(null);

    try {
      console.log("[useJoinLeagueClient] Joining league from browser...", {
        id,
        hasInviteCode: !!inviteCode,
      });

      const result = await joinLeagueUseCase.execute(id, inviteCode);

      console.log("[useJoinLeagueClient] League joined successfully:", {
        id: result.id,
        name: result.name,
        type: result.type,
      });

      setJoinedLeague(result);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to join league";

      console.error("[useJoinLeagueClient] Error joining league:", err);
      setError(errorMessage);
      return null;
    } finally {
      setIsJoining(false);
    }
  };

  const reset = () => {
    setJoinedLeague(null);
    setError(null);
    setIsJoining(false);
  };

  return {
    joinLeague,
    isJoining,
    error,
    joinedLeague,
    reset,
  };
}
