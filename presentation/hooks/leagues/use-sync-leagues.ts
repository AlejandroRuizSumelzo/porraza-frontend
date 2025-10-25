"use client";

import { useEffect, useState, useCallback } from "react";
import { useGetMyLeagues } from "@/di/client/hooks/use-leagues";
import {
  selectSetLeagues,
  selectSetLeaguesLoading,
  selectShouldRefreshLeagues,
  selectIsAuthenticated,
  selectLeagues,
} from "@/infrastructure/store/selectors";

/**
 * Custom Hook: useSyncLeagues
 *
 * Synchronizes user leagues with the backend and Zustand store
 * This hook is designed to be used in the main layout or app shell
 *
 * Features:
 * - Auto-fetches leagues on mount if user is authenticated
 * - Smart refresh: only fetches if data is stale (older than 5 minutes)
 * - Manual refresh capability
 * - Skips fetch if user is not authenticated
 *
 * Usage:
 * ```tsx
 * // In app layout or dashboard
 * function DashboardLayout() {
 *   const { isLoading, error, refresh } = useSyncLeagues();
 *
 *   // Leagues are automatically synced
 *   // Use refresh() if you need to manually update
 * }
 * ```
 *
 * When to use:
 * - In the main authenticated layout (app shell)
 * - After creating/joining a new league
 * - When user navigates back to the app from external page
 */

interface UseSyncLeaguesResult {
  /**
   * Loading state during fetch
   */
  isLoading: boolean;

  /**
   * Error message if fetch fails
   */
  error: string | null;

  /**
   * Manually refresh leagues from backend
   */
  refresh: () => Promise<void>;

  /**
   * Whether leagues were successfully synced at least once
   */
  isSynced: boolean;
}

export function useSyncLeagues(options?: {
  /**
   * Auto-fetch on mount (default: true)
   */
  autoFetch?: boolean;

  /**
   * Force refresh even if data is fresh (default: false)
   */
  forceRefresh?: boolean;
}): UseSyncLeaguesResult {
  const { autoFetch = true, forceRefresh = false } = options || {};

  const getMyLeaguesUseCase = useGetMyLeagues();
  const setLeagues = selectSetLeagues();
  const setLeaguesLoading = selectSetLeaguesLoading();
  const shouldRefreshLeagues = selectShouldRefreshLeagues(); // This is a boolean
  const isAuthenticated = selectIsAuthenticated();
  const leagues = selectLeagues();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSynced, setIsSynced] = useState(false);

  const fetchLeagues = useCallback(async () => {
    // Don't fetch if user is not authenticated
    if (!isAuthenticated) {
      console.log("[useSyncLeagues] User not authenticated, skipping fetch");
      return;
    }

    // Skip fetch if data is fresh AND we have leagues in store (unless forced)
    // This ensures we don't skip if store is empty even if lastFetchedAt exists
    if (!forceRefresh && !shouldRefreshLeagues && leagues.length > 0) {
      console.log(
        "[useSyncLeagues] Leagues are fresh and available, skipping fetch",
        {
          leaguesCount: leagues.length,
        }
      );
      setIsSynced(true);
      return;
    }

    setIsLoading(true);
    setLeaguesLoading(true);
    setError(null);

    try {
      console.log("[useSyncLeagues] Fetching user leagues...");

      const leagues = await getMyLeaguesUseCase.execute();

      console.log("[useSyncLeagues] Leagues fetched successfully:", {
        total: leagues.length,
        leagues: leagues.map((l) => ({ id: l.id, name: l.name })),
      });

      setLeagues(leagues);
      setIsSynced(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to sync leagues";

      console.error("[useSyncLeagues] Error syncing leagues:", err);
      setError(errorMessage);
      setLeaguesLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [
    isAuthenticated,
    forceRefresh,
    shouldRefreshLeagues,
    leagues.length,
    getMyLeaguesUseCase,
    setLeagues,
    setLeaguesLoading,
  ]);

  const refresh = useCallback(async () => {
    console.log("[useSyncLeagues] Manual refresh triggered");
    await fetchLeagues();
  }, [fetchLeagues]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchLeagues();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch]);

  return {
    isLoading,
    error,
    refresh,
    isSynced,
  };
}
