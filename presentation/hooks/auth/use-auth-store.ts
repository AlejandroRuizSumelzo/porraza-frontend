"use client";

import {
  selectUser,
  selectIsAuthenticated,
  selectClearAuth,
  selectGetAccessToken,
} from "@/infrastructure/store/selectors";

/**
 * Presentation layer hooks for accessing auth store
 * These are convenience hooks for use in components
 * Uses selectors for optimized re-renders
 */

/**
 * Get current authenticated user
 * Only re-renders when user changes
 */
export function useCurrentUser() {
  return selectUser();
}

/**
 * Check if user is authenticated
 * Only re-renders when auth status changes
 */
export function useIsAuthenticated() {
  return selectIsAuthenticated();
}

/**
 * Logout user (clear auth state)
 * Returns a stable callback function
 */
export function useLogout() {
  const clearAuth = selectClearAuth();

  return () => {
    clearAuth();
    console.log("[useLogout] User logged out, auth cleared");
  };
}

/**
 * Get access token (useful for manual API calls)
 * Only re-renders when access token changes
 */
export function useAccessToken() {
  const getAccessToken = selectGetAccessToken();
  return getAccessToken();
}
