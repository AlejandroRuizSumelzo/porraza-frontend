"use client";

import { useState } from "react";
import { useResetPassword as useResetPasswordUseCase } from "@/di/client/hooks/use-auth";

/**
 * Reset Password Hook
 *
 * Custom hook for reset password functionality
 * Handles state management and business logic integration
 *
 * Clean Architecture:
 * - Located in presentation layer
 * - Uses DI hooks to access use cases
 * - Manages UI state (loading, error)
 * - No direct API calls
 *
 * @returns Object with resetPassword function, loading state, error state, and clearError function
 */
export function useResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resetPasswordUseCase = useResetPasswordUseCase();

  const resetPassword = async (
    token: string,
    newPassword: string
  ): Promise<{ message: string } | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await resetPasswordUseCase.execute(token, newPassword);
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al restablecer contraseña";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    resetPassword,
    isLoading,
    error,
    clearError,
  };
}
