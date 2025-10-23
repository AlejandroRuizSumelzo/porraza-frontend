"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogout as useDILogout } from "@/di/client/hooks/use-auth";
import { selectClearAuth } from "@/infrastructure/store/selectors";
import { APP_ROUTES } from "@/presentation/lib/routes";

/**
 * Custom Hook: useLogout
 *
 * Encapsulates the business logic for user logout
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute logout use case (clears backend cookies)
 * - Clear local auth state (Zustand store)
 * - Redirect to login page
 * - Handle loading and error states
 *
 * Usage in Client Components:
 * ```tsx
 * const { logout, isLoading, error } = useLogout();
 *
 * const handleLogout = async () => {
 *   await logout();
 *   // User is logged out and redirected to login
 * };
 * ```
 */

interface UseLogoutResult {
  /**
   * Execute logout
   * Clears backend cookies and local auth state, then redirects to login
   */
  logout: () => Promise<void>;

  /**
   * Loading state during logout request
   */
  isLoading: boolean;

  /**
   * Error message if logout fails
   */
  error: string | null;

  /**
   * Clear error message
   */
  clearError: () => void;
}

export function useLogout(): UseLogoutResult {
  const router = useRouter();
  const logoutUseCase = useDILogout();
  const clearAuth = selectClearAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("[useLogout] Logout started");

      // Execute logout use case (clears backend cookies)
      await logoutUseCase.execute();

      console.log("[useLogout] Backend cookies cleared");

      // Clear local auth state (Zustand store)
      clearAuth();

      console.log("[useLogout] Local auth state cleared");

      // Redirect to login page
      router.push(APP_ROUTES.auth.login);

      console.log("[useLogout] Redirected to login");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error desconocido al cerrar sesión";

      setError(errorMessage);
      console.error("[useLogout] Logout failed:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    logout,
    isLoading,
    error,
    clearError,
  };
}
