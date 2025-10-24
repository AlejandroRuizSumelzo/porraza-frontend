"use client";

import { useState } from "react";
import { useForgotPassword as useForgotPasswordUseCase } from "@/di/client/hooks/use-auth";

/**
 * Forgot Password Hook
 *
 * Custom hook for forgot password functionality
 * Handles state management and business logic integration
 *
 * Clean Architecture:
 * - Located in presentation layer
 * - Uses DI hooks to access use cases
 * - Manages UI state (loading, error)
 * - No direct API calls
 *
 * @returns Object with forgotPassword function, loading state, error state, and clearError function
 */
export function useForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const forgotPasswordUseCase = useForgotPasswordUseCase();

  const forgotPassword = async (
    email: string
  ): Promise<{ message: string } | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await forgotPasswordUseCase.execute(email);
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error al solicitar recuperación de contraseña";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    forgotPassword,
    isLoading,
    error,
    clearError,
  };
}
