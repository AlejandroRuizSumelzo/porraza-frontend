"use client";

import { useState } from "react";
import { useDeleteUser } from "@/di/client/hooks/use-users";

/**
 * Custom Hook: useDeleteUserClient
 *
 * Permanently deletes a user account using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute delete user use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { deleteUser, isDeleting, error, isDeleted } = useDeleteUserClient();
 *
 * const handleDelete = async () => {
 *   const success = await deleteUser(userId);
 *   if (success) {
 *     // Deletion successful - clear auth and redirect
 *     useAuthStore.getState().clearAuth();
 *     router.push('/');
 *   }
 * };
 *
 * if (isDeleting) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Requires authentication
 * - Users can only delete their own account
 * - This performs a HARD DELETE (permanent, cannot be recovered)
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseDeleteUserResult {
  /**
   * Function to delete a user account
   * @returns true if successful, false if error
   */
  deleteUser: (userId: string) => Promise<boolean>;

  /**
   * Loading state during deletion
   */
  isDeleting: boolean;

  /**
   * Error message if deletion fails
   */
  error: string | null;

  /**
   * Flag indicating if user was successfully deleted
   */
  isDeleted: boolean;

  /**
   * Reset the hook state
   */
  reset: () => void;
}

export function useDeleteUserClient(): UseDeleteUserResult {
  const deleteUserUseCase = useDeleteUser();

  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (userId: string): Promise<boolean> => {
    setIsDeleting(true);
    setError(null);
    setIsDeleted(false);

    try {
      console.log("[useDeleteUserClient] Deleting user from browser...", {
        userId,
      });

      await deleteUserUseCase.execute(userId);

      console.log("[useDeleteUserClient] User deleted successfully:", {
        userId,
      });

      setIsDeleted(true);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete user";

      console.error("[useDeleteUserClient] Error deleting user:", err);
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
    deleteUser,
    isDeleting,
    error,
    isDeleted,
    reset,
  };
}
