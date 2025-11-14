import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/domain/entities/user";
import type { AuthResponse } from "@/domain/entities/auth-response";

/**
 * Sync auth state to a cookie for middleware access
 * This creates a non-HTTP-only cookie that the middleware can read
 */
function syncAuthStateToCookie(
  state: { userId?: string; accessToken?: string | null } | null
) {
  if (typeof document === "undefined") return; // Skip on server

  if (state?.userId && state?.accessToken) {
    // Set auth state cookie (expires in 7 days)
    const expiresIn7Days = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `porraza-auth-state=${JSON.stringify({
      state,
    })}; path=/; expires=${expiresIn7Days}; SameSite=Lax`;
  } else {
    // Clear auth state cookie
    document.cookie =
      "porraza-auth-state=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

/**
 * Auth Store State Interface
 * Manages authentication state globally
 */
interface AuthState {
  // ===== State =====
  /**
   * Currently authenticated user (null if not authenticated)
   */
  user: User | null;

  /**
   * Access token (stored in memory only - more secure)
   * Used for API requests with Bearer authentication
   */
  accessToken: string | null;

  /**
   * Refresh token (persisted in localStorage)
   * Used to obtain new access tokens when they expire
   */
  refreshToken: string | null;

  /**
   * Timestamp when the access token expires (milliseconds since epoch)
   */
  expiresAt: number | null;

  // ===== Actions =====
  /**
   * Set authentication state after successful login or token refresh
   * @param authResponse - Response containing user and tokens
   */
  setAuth: (authResponse: AuthResponse) => void;

  /**
   * Update only the access token (used after refresh)
   * @param accessToken - New access token
   * @param expiresIn - Seconds until token expires
   */
  updateAccessToken: (accessToken: string, expiresIn: number) => void;

  /**
   * Clear all authentication state (logout)
   */
  clearAuth: () => void;

  /**
   * Update only the user data (used after profile update)
   * @param user - Updated user object
   */
  setUser: (user: User) => void;

  // ===== Getters =====
  /**
   * Get current access token if available
   * @returns Access token or null
   */
  getAccessToken: () => string | null;

  /**
   * Get current refresh token if available
   * @returns Refresh token or null
   */
  getRefreshToken: () => string | null;

  /**
   * Check if user is authenticated
   * @returns True if user is logged in
   */
  isAuthenticated: () => boolean;

  /**
   * Check if access token is expired
   * @returns True if token is expired or about to expire (within 30 seconds)
   */
  isTokenExpired: () => boolean;
}

/**
 * Auth Store
 * Global authentication state management using Zustand
 *
 * Security Strategy:
 * - accessToken: Stored in memory only (not persisted) - resets on page reload
 * - refreshToken: Persisted in localStorage for automatic re-authentication
 * - user: Persisted in localStorage for UI state
 *
 * This balance provides:
 * 1. Security: accessToken can't be stolen via XSS after page reload
 * 2. UX: User stays logged in across sessions via refreshToken
 * 3. Performance: No need to fetch user data on every page load
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      refreshToken: null,
      expiresAt: null,

      // Actions
      setAuth: (authResponse: AuthResponse) => {
        const expiresAt = Date.now() + authResponse.tokens.expiresIn * 1000;

        set({
          user: authResponse.user,
          accessToken: authResponse.tokens.accessToken,
          refreshToken: authResponse.tokens.refreshToken,
          expiresAt,
        });

        // Sync auth state to cookie for middleware access
        syncAuthStateToCookie({
          userId: authResponse.user.id,
          accessToken: authResponse.tokens.accessToken,
        });

        console.log("[AuthStore] Authentication set:", {
          userId: authResponse.user.id,
          expiresIn: authResponse.tokens.expiresIn,
          expiresAt: new Date(expiresAt).toISOString(),
        });
      },

      updateAccessToken: (accessToken: string, expiresIn: number) => {
        const expiresAt = Date.now() + expiresIn * 1000;

        set({
          accessToken,
          expiresAt,
        });

        // Sync updated token to cookie for middleware access
        const userId = get().user?.id;
        if (userId) {
          syncAuthStateToCookie({
            userId,
            accessToken,
          });
        }

        console.log("[AuthStore] Access token updated:", {
          expiresIn,
          expiresAt: new Date(expiresAt).toISOString(),
        });
      },

      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          expiresAt: null,
        });

        // Clear auth state cookie
        syncAuthStateToCookie(null);

        console.log("[AuthStore] Authentication cleared");
      },

      setUser: (user: User) => {
        set({ user });

        console.log("[AuthStore] User updated:", {
          userId: user.id,
          name: user.name,
          email: user.email,
        });
      },

      // Getters
      getAccessToken: () => get().accessToken,

      getRefreshToken: () => get().refreshToken,

      isAuthenticated: () => {
        const state = get();
        return state.user !== null && state.refreshToken !== null;
      },

      isTokenExpired: () => {
        const state = get();

        if (!state.expiresAt) {
          return true;
        }

        // Consider token expired if it expires within 30 seconds
        const bufferTime = 30 * 1000; // 30 seconds in milliseconds
        return Date.now() + bufferTime >= state.expiresAt;
      },
    }),
    {
      name: "porraza-auth", // localStorage key
      storage: createJSONStorage(() => localStorage),

      // Partial persistence: only persist user and refreshToken
      // accessToken is NOT persisted (security)
      partialize: (state) => ({
        user: state.user,
        refreshToken: state.refreshToken,
        // accessToken and expiresAt are NOT persisted
      }),
    }
  )
);
