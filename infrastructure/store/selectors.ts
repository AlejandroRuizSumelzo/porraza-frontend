import { useAuthStore } from "./auth-store";

/**
 * Auth Store Selectors
 * Provides optimized selectors for accessing auth state
 * Using selectors prevents unnecessary re-renders in components
 */

/**
 * Select current user
 */
export const selectUser = () => useAuthStore((state) => state.user);

/**
 * Select access token
 */
export const selectAccessToken = () =>
  useAuthStore((state) => state.accessToken);

/**
 * Select refresh token
 */
export const selectRefreshToken = () =>
  useAuthStore((state) => state.refreshToken);

/**
 * Select token expiration timestamp
 */
export const selectExpiresAt = () => useAuthStore((state) => state.expiresAt);

/**
 * Select authentication status
 */
export const selectIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated());

/**
 * Select token expiration status
 */
export const selectIsTokenExpired = () =>
  useAuthStore((state) => state.isTokenExpired());

/**
 * Select setAuth action
 */
export const selectSetAuth = () => useAuthStore((state) => state.setAuth);

/**
 * Select updateAccessToken action
 */
export const selectUpdateAccessToken = () =>
  useAuthStore((state) => state.updateAccessToken);

/**
 * Select clearAuth action
 */
export const selectClearAuth = () => useAuthStore((state) => state.clearAuth);

/**
 * Select getAccessToken getter
 */
export const selectGetAccessToken = () =>
  useAuthStore((state) => state.getAccessToken);

/**
 * Select getRefreshToken getter
 */
export const selectGetRefreshToken = () =>
  useAuthStore((state) => state.getRefreshToken);
