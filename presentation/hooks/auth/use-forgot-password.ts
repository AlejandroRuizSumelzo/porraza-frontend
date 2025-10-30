"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("auth.forgot.toasts.error");
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
          : t("description");
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
