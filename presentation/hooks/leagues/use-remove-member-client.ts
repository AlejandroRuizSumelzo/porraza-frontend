"use client";

import { useState } from "react";
import { useRemoveMember } from "@/di/client/hooks/use-leagues";

/**
 * Custom Hook: useRemoveMemberClient
 *
 * Removes a member from a league (admin only) using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute remove member use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { removeMember, isRemoving, error, isRemoved } = useRemoveMember();
 *
 * const handleRemove = async (userId) => {
 *   const success = await removeMember(leagueId, userId);
 *   if (success) {
 *     refetchMembers();
 *   }
 * };
 *
 * if (isRemoving) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Requires authentication and admin permissions
 * - Only the league admin can remove members
 * - Admin cannot remove themselves
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseRemoveMemberResult {
  /**
   * Function to remove a member from a league
   * @param leagueId League UUID
   * @param userId User UUID to remove
   * @returns true if removed successfully, false otherwise
   */
  removeMember: (leagueId: string, userId: string) => Promise<boolean>;

  /**
   * Loading state during removal
   */
  isRemoving: boolean;

  /**
   * Error message if removal fails
   */
  error: string | null;

  /**
   * Whether the member was successfully removed
   */
  isRemoved: boolean;

  /**
   * Reset the hook state
   */
  reset: () => void;
}

export function useRemoveMemberClient(): UseRemoveMemberResult {
  const removeMemberUseCase = useRemoveMember();

  const [isRemoved, setIsRemoved] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeMember = async (
    leagueId: string,
    userId: string
  ): Promise<boolean> => {
    setIsRemoving(true);
    setError(null);
    setIsRemoved(false);

    try {
      console.log("[useRemoveMemberClient] Removing member from browser...", {
        leagueId,
        userId,
      });

      await removeMemberUseCase.execute(leagueId, userId);

      console.log("[useRemoveMemberClient] Member removed successfully:", {
        leagueId,
        userId,
      });

      setIsRemoved(true);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to remove member";

      console.error("[useRemoveMemberClient] Error removing member:", err);
      setError(errorMessage);
      return false;
    } finally {
      setIsRemoving(false);
    }
  };

  const reset = () => {
    setIsRemoved(false);
    setError(null);
    setIsRemoving(false);
  };

  return {
    removeMember,
    isRemoving,
    error,
    isRemoved,
    reset,
  };
}
