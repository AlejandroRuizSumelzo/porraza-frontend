import { useAuthStore } from "@/infrastructure/store/auth-store";
import { useLeagueStore } from "@/infrastructure/store/league-store";

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

/**
 * ============================================
 * League Store Selectors
 * Provides optimized selectors for accessing league state
 * Using selectors prevents unnecessary re-renders in components
 * ============================================
 */

/**
 * Select all leagues
 */
export const selectLeagues = () => useLeagueStore((state) => state.leagues);

/**
 * Select currently selected league ID
 */
export const selectSelectedLeagueId = () =>
  useLeagueStore((state) => state.selectedLeagueId);

/**
 * Select currently selected league (full object)
 */
export const selectSelectedLeague = () =>
  useLeagueStore((state) => state.getSelectedLeague());

/**
 * Select league loading state
 */
export const selectLeaguesLoading = () =>
  useLeagueStore((state) => state.isLoading);

/**
 * Select last fetched timestamp
 */
export const selectLeaguesLastFetchedAt = () =>
  useLeagueStore((state) => state.lastFetchedAt);

/**
 * Select whether leagues should be refreshed
 */
export const selectShouldRefreshLeagues = () =>
  useLeagueStore((state) => state.shouldRefresh());

/**
 * Select setLeagues action
 */
export const selectSetLeagues = () =>
  useLeagueStore((state) => state.setLeagues);

/**
 * Select setSelectedLeagueId action
 */
export const selectSetSelectedLeagueId = () =>
  useLeagueStore((state) => state.setSelectedLeagueId);

/**
 * Select addLeague action
 */
export const selectAddLeague = () => useLeagueStore((state) => state.addLeague);

/**
 * Select updateLeague action
 */
export const selectUpdateLeague = () =>
  useLeagueStore((state) => state.updateLeague);

/**
 * Select removeLeague action
 */
export const selectRemoveLeague = () =>
  useLeagueStore((state) => state.removeLeague);

/**
 * Select setLoading action
 */
export const selectSetLeaguesLoading = () =>
  useLeagueStore((state) => state.setLoading);

/**
 * Select clearLeagues action
 */
export const selectClearLeagues = () =>
  useLeagueStore((state) => state.clearLeagues);

/**
 * Select getLeagues getter
 */
export const selectGetLeagues = () =>
  useLeagueStore((state) => state.getLeagues);
