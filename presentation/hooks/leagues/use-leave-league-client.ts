"use client";

import { useState } from "react";
import { useLeaveLeague } from "@/di/client/hooks/use-leagues";

/**
 * Custom Hook: useLeaveLeagueClient
 *
 * Leaves a league using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute leave league use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { leaveLeague, isLeaving, error, hasLeft } = useLeaveLeague();
 *
 * const handleLeave = async () => {
 *   const success = await leaveLeague(leagueId);
 *   if (success) {
 *     router.push('/dashboard');
 *   }
 * };
 *
 * if (isLeaving) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Requires authentication
 * - If admin leaves and there are other members, admin role is transferred to oldest member
 * - If admin is the only member, league is deleted
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseLeaveLeagueResult {
  /**
   * Function to leave a league
   * @returns true if left successfully, false otherwise
   */
  leaveLeague: (id: string) => Promise<boolean>;

  /**
   * Loading state during leave
   */
  isLeaving: boolean;

  /**
   * Error message if leave fails
   */
  error: string | null;

  /**
   * Whether the user has successfully left the league
   */
  hasLeft: boolean;

  /**
   * Reset the hook state
   */
  reset: () => void;
}

export function useLeaveLeagueClient(): UseLeaveLeagueResult {
  const leaveLeagueUseCase = useLeaveLeague();

  const [hasLeft, setHasLeft] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const leaveLeague = async (id: string): Promise<boolean> => {
    setIsLeaving(true);
    setError(null);
    setHasLeft(false);

    try {
      console.log("[useLeaveLeagueClient] Leaving league from browser...", {
        id,
      });

      await leaveLeagueUseCase.execute(id);

      console.log("[useLeaveLeagueClient] League left successfully:", {
        id,
      });

      setHasLeft(true);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to leave league";

      console.error("[useLeaveLeagueClient] Error leaving league:", err);
      setError(errorMessage);
      return false;
    } finally {
      setIsLeaving(false);
    }
  };

  const reset = () => {
    setHasLeft(false);
    setError(null);
    setIsLeaving(false);
  };

  return {
    leaveLeague,
    isLeaving,
    error,
    hasLeft,
    reset,
  };
}
