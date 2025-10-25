"use client";

import { useState } from "react";
import { useDeleteLeague } from "@/di/client/hooks/use-leagues";

/**
 * Custom Hook: useDeleteLeagueClient
 *
 * Deletes a league permanently (admin only) using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute delete league use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { deleteLeague, isDeleting, error, isDeleted } = useDeleteLeague();
 *
 * const handleDelete = async () => {
 *   const success = await deleteLeague(leagueId);
 *   if (success) {
 *     router.push('/dashboard');
 *   }
 * };
 *
 * if (isDeleting) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Requires authentication and admin permissions
 * - Only the league admin can delete the league
 * - All members and predictions will be permanently deleted
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseDeleteLeagueResult {
  /**
   * Function to delete a league
   * @returns true if deleted successfully, false otherwise
   */
  deleteLeague: (id: string) => Promise<boolean>;

  /**
   * Loading state during deletion
   */
  isDeleting: boolean;

  /**
   * Error message if deletion fails
   */
  error: string | null;

  /**
   * Whether the league was successfully deleted
   */
  isDeleted: boolean;

  /**
   * Reset the hook state
   */
  reset: () => void;
}

export function useDeleteLeagueClient(): UseDeleteLeagueResult {
  const deleteLeagueUseCase = useDeleteLeague();

  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteLeague = async (id: string): Promise<boolean> => {
    setIsDeleting(true);
    setError(null);
    setIsDeleted(false);

    try {
      console.log("[useDeleteLeagueClient] Deleting league from browser...", {
        id,
      });

      await deleteLeagueUseCase.execute(id);

      console.log("[useDeleteLeagueClient] League deleted successfully:", {
        id,
      });

      setIsDeleted(true);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete league";

      console.error("[useDeleteLeagueClient] Error deleting league:", err);
      setError(errorMessage);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const reset = () => {
    setIsDeleted(false);
    setError(null);
    setIsDeleting(false);
  };

  return {
    deleteLeague,
    isDeleting,
    error,
    isDeleted,
    reset,
  };
}
