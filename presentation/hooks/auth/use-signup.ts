"use client";

import { useState } from "react";
import { useRegister as useDIRegister } from "@/di/client/hooks/use-auth";
import type { RegisterResponse } from "@/domain/entities/register-response";

/**
 * Custom Hook: useSignup
 *
 * Encapsulates the business logic for user registration
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute register use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for signup forms
 *
 * Usage in Client Components:
 * ```tsx
 * const { signup, isLoading, error } = useSignup();
 *
 * const handleSubmit = async (email: string, password: string, name: string) => {
 *   const registerResponse = await signup(email, password, name);
 *
 *   if (registerResponse) {
 *     // Registration successful
 *     // Show message to user about email verification
 *   }
 *   // If error, it's available in the `error` state
 * };
 * ```
 */

interface UseSignupResult {
  /**
   * Execute signup with email, password, and name
   * @returns RegisterResponse if successful, null if error
   */
  signup: (
    email: string,
    password: string,
    name: string
  ) => Promise<RegisterResponse | null>;

  /**
   * Loading state during signup request
   */
  isLoading: boolean;

  /**
   * Error message if signup fails
   */
  error: string | null;

  /**
   * Clear error message
   */
  clearError: () => void;
}

export function useSignup(): UseSignupResult {
  const registerUseCase = useDIRegister();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<RegisterResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("[useSignup] Signup started:", { email, name });

      // Execute register use case
      const registerResponse = await registerUseCase.execute(
        email,
        password,
        name
      );

      console.log("[useSignup] Signup response:", registerResponse);

      // Log success
      console.log("[useSignup] Signup successful:", {
        userId: registerResponse.user.id,
        email: registerResponse.user.email,
        isEmailVerified: registerResponse.user.isEmailVerified,
        message: registerResponse.message,
      });

      setIsLoading(false);
      return registerResponse;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido al registrarse";

      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  };

  const clearError = () => setError(null);

  return {
    signup,
    isLoading,
    error,
    clearError,
  };
}
