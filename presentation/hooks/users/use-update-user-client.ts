"use client";

import { useState } from "react";
import { useUpdateUser } from "@/di/client/hooks/use-users";
import type { User } from "@/domain/entities/user";

/**
 * Custom Hook: useUpdateUserClient
 *
 * Updates user profile information using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute update user use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { updateUser, isUpdating, error, updatedUser } = useUpdateUserClient();
 *
 * const handleSubmit = async (data) => {
 *   const result = await updateUser(userId, data);
 *   if (result) {
 *     // Update successful - update Zustand store
 *     useAuthStore.getState().setUser(result);
 *   }
 * };
 *
 * if (isUpdating) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (updatedUser) return <SuccessMessage />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Requires authentication
 * - Users can only update their own profile
 * - At least one field must be provided
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UpdateUserParams {
  name?: string;
  email?: string;
  isActive?: boolean;
}

interface UseUpdateUserResult {
  /**
   * Function to update user profile
   */
  updateUser: (
    userId: string,
    params: UpdateUserParams
  ) => Promise<User | null>;

  /**
   * Loading state during update
   */
  isUpdating: boolean;

  /**
   * Error message if update fails
   */
  error: string | null;

  /**
   * The updated user (null if not updated yet)
   */
  updatedUser: User | null;

  /**
   * Reset the hook state
   */
  reset: () => void;
}

export function useUpdateUserClient(): UseUpdateUserResult {
  const updateUserUseCase = useUpdateUser();

  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (
    userId: string,
    params: UpdateUserParams
  ): Promise<User | null> => {
    setIsUpdating(true);
    setError(null);
    setUpdatedUser(null);

    try {
      console.log("[useUpdateUserClient] Updating user from browser...", {
        userId,
        params,
      });

      const result = await updateUserUseCase.execute(userId, params);

      console.log("[useUpdateUserClient] User updated successfully:", {
        id: result.id,
        name: result.name,
        email: result.email,
      });

      setUpdatedUser(result);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update user";

      console.error("[useUpdateUserClient] Error updating user:", err);
      setError(errorMessage);
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  const reset = () => {
    setUpdatedUser(null);
    setError(null);
    setIsUpdating(false);
  };

  return {
    updateUser,
    isUpdating,
    error,
    updatedUser,
    reset,
  };
}
