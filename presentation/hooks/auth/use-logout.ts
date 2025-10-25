"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogout as useDILogout } from "@/di/client/hooks/use-auth";
import {
  selectClearAuth,
  selectClearLeagues,
} from "@/infrastructure/store/selectors";
import { APP_ROUTES } from "@/presentation/lib/routes";

/**
 * Custom Hook: useLogout
 *
 * Encapsulates the business logic for user logout
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute logout use case (clears backend HTTP-only cookies)
 * - Clear local auth state (Zustand store in-memory)
 * - Clear persisted localStorage (Zustand persist middleware)
 * - Clear all browser cookies (client-side fallback)
 * - Clear sessionStorage
 * - Redirect to login page
 * - Handle loading and error states
 *
 * Security Notes:
 * - Backend clears HTTP-only cookies (accessToken, refreshToken)
 * - Client explicitly clears localStorage to remove persisted Zustand state
 * - Client clears all browser cookies as a fallback/safety measure
 * - Client clears sessionStorage for any temporary session data
 *
 * Usage in Client Components:
 * ```tsx
 * const { logout, isLoading, error } = useLogout();
 *
 * const handleLogout = async () => {
 *   await logout();
 *   // User is fully logged out and redirected to login
 *   // All auth data (cookies, localStorage, sessionStorage) is cleared
 * };
 * ```
 */

interface UseLogoutResult {
  /**
   * Execute logout
   * Clears backend cookies, localStorage, browser cookies, sessionStorage, and redirects to login
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
  const clearLeagues = selectClearLeagues();

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

      // Clear local auth state (Zustand store in-memory)
      clearAuth();

      console.log("[useLogout] Local auth state cleared");

      // Clear league state (Zustand store in-memory)
      clearLeagues();

      console.log("[useLogout] Local league state cleared");

      // IMPORTANT: Explicitly clear localStorage
      // The Zustand persist middleware might not clear localStorage immediately
      // when clearAuth() is called, so we force it here
      try {
        localStorage.removeItem("porraza-auth");
        localStorage.removeItem("porraza-leagues");
        console.log("[useLogout] LocalStorage cleared");
      } catch (localStorageError) {
        console.warn(
          "[useLogout] Failed to clear localStorage:",
          localStorageError
        );
      }

      // Clear all cookies from the browser (client-side cleanup)
      // This is a fallback in case the backend fails to clear cookies
      try {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name =
            eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

          // Clear the cookie by setting it to expire in the past
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        }
        console.log("[useLogout] Browser cookies cleared");
      } catch (cookieError) {
        console.warn(
          "[useLogout] Failed to clear browser cookies:",
          cookieError
        );
      }

      // Clear sessionStorage as well (if anything is stored there)
      try {
        sessionStorage.clear();
        console.log("[useLogout] SessionStorage cleared");
      } catch (sessionStorageError) {
        console.warn(
          "[useLogout] Failed to clear sessionStorage:",
          sessionStorageError
        );
      }

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
