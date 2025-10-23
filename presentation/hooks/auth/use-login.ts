"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin as useDILogin } from "@/di/client/hooks/use-auth";
import { selectSetAuth } from "@/infrastructure/store/selectors";
import type { AuthResponse } from "@/domain/entities/auth-response";

/**
 * Custom Hook: useLogin
 *
 * Encapsulates the business logic for user authentication
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute login use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for login forms
 *
 * Usage in Client Components:
 * ```tsx
 * const { login, isLoading, error } = useLogin();
 *
 * const handleSubmit = async (email: string, password: string) => {
 *   const authResponse = await login(email, password);
 *
 *   if (authResponse) {
 *     // Login successful, user is in authResponse.user
 *     // Tokens are in authResponse.tokens
 *   }
 *   // If error, it's available in the `error` state
 * };
 * ```
 */

interface UseLoginResult {
  /**
   * Execute login with email and password
   * @returns AuthResponse if successful, null if error
   */
  login: (email: string, password: string) => Promise<AuthResponse | null>;

  /**
   * Loading state during login request
   */
  isLoading: boolean;

  /**
   * Error message if login fails
   */
  error: string | null;

  /**
   * Clear error message
   */
  clearError: () => void;
}

export function useLogin(): UseLoginResult {
  const router = useRouter();
  const loginUseCase = useDILogin();
  const setAuth = selectSetAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("[useLogin] Login started:", { email, password });
      // Execute login use case
      const authResponse = await loginUseCase.execute(email, password);

      console.log("[useLogin] Login response:", authResponse);

      // Save authentication state to Zustand store
      setAuth(authResponse);

      // Log success (can be removed in production)
      console.log("[useLogin] Login successful, auth saved to store:", {
        userId: authResponse.user.id,
        email: authResponse.user.email,
        expiresIn: authResponse.tokens.expiresIn,
      });

      setIsLoading(false);
      return authResponse;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error desconocido al iniciar sesión";

      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  };

  const clearError = () => setError(null);

  return {
    login,
    isLoading,
    error,
    clearError,
  };
}
