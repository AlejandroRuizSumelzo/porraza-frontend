"use client";

import { useState } from "react";
import { useChangePassword } from "@/di/client/hooks/use-users";

/**
 * Custom Hook: useChangePasswordClient
 *
 * Changes user password using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute change password use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { changePassword, isChanging, error, successMessage } = useChangePasswordClient();
 *
 * const handleSubmit = async (data) => {
 *   const result = await changePassword(userId, data.currentPassword, data.newPassword);
 *   if (result) {
 *     toast.success(result);
 *     // Optionally logout user to re-authenticate with new password
 *   }
 * };
 *
 * if (isChanging) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (successMessage) return <SuccessMessage message={successMessage} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Requires authentication
 * - Users can only change their own password
 * - Requires current password verification (security measure)
 * - New password must be different from current password
 * - New password must meet security requirements (min 8 chars, uppercase, lowercase, number)
 * - Notification email will be sent after successful change
 * - NOTE: JWT tokens remain valid until expiration (active sessions continue working)
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseChangePasswordResult {
  /**
   * Function to change user password
   * @returns Success message if successful, null if error
   */
  changePassword: (
    userId: string,
    currentPassword: string,
    newPassword: string
  ) => Promise<string | null>;

  /**
   * Loading state during password change
   */
  isChanging: boolean;

  /**
   * Error message if password change fails
   */
  error: string | null;

  /**
   * Success message from server (null if not changed yet)
   */
  successMessage: string | null;

  /**
   * Reset the hook state
   */
  reset: () => void;
}

export function useChangePasswordClient(): UseChangePasswordResult {
  const changePasswordUseCase = useChangePassword();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = async (
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<string | null> => {
    setIsChanging(true);
    setError(null);
    setSuccessMessage(null);

    try {
      console.log(
        "[useChangePasswordClient] Changing password from browser...",
        {
          userId,
        }
      );

      const result = await changePasswordUseCase.execute(
        userId,
        currentPassword,
        newPassword
      );

      console.log(
        "[useChangePasswordClient] Password changed successfully:",
        {
          userId,
          message: result.message,
        }
      );

      setSuccessMessage(result.message);
      return result.message;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to change password";

      console.error("[useChangePasswordClient] Error changing password:", err);
      setError(errorMessage);
      return null;
    } finally {
      setIsChanging(false);
    }
  };

  const reset = () => {
    setSuccessMessage(null);
    setError(null);
    setIsChanging(false);
  };

  return {
    changePassword,
    isChanging,
    error,
    successMessage,
    reset,
  };
}
