import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { League } from "@/domain/entities/league";

/**
 * League Store State Interface
 * Manages league state globally
 */
interface LeagueState {
  // ===== State =====
  /**
   * All leagues where the user is a member
   */
  leagues: League[];

  /**
   * Currently selected league ID (null if no league selected)
   */
  selectedLeagueId: string | null;

  /**
   * Loading state when fetching leagues
   */
  isLoading: boolean;

  /**
   * Last time leagues were fetched (timestamp)
   */
  lastFetchedAt: number | null;

  // ===== Actions =====
  /**
   * Set all user leagues
   * @param leagues - Array of leagues
   */
  setLeagues: (leagues: League[]) => void;

  /**
   * Set the selected league by ID
   * @param leagueId - League ID to select (null to deselect)
   */
  setSelectedLeagueId: (leagueId: string | null) => void;

  /**
   * Add a new league to the list
   * @param league - League to add
   */
  addLeague: (league: League) => void;

  /**
   * Update an existing league
   * @param leagueId - ID of league to update
   * @param updates - Partial league data to update
   */
  updateLeague: (leagueId: string, updates: Partial<League>) => void;

  /**
   * Remove a league from the list
   * @param leagueId - ID of league to remove
   */
  removeLeague: (leagueId: string) => void;

  /**
   * Set loading state
   * @param isLoading - Loading state
   */
  setLoading: (isLoading: boolean) => void;

  /**
   * Clear all league state (on logout)
   */
  clearLeagues: () => void;

  // ===== Getters =====
  /**
   * Get the currently selected league
   * @returns Selected league or null
   */
  getSelectedLeague: () => League | null;

  /**
   * Get all leagues
   * @returns Array of leagues
   */
  getLeagues: () => League[];

  /**
   * Check if leagues need to be refreshed (older than 5 minutes)
   * @returns True if refresh needed
   */
  shouldRefresh: () => boolean;
}

/**
 * League Store
 * Global league state management using Zustand
 *
 * Persistence Strategy:
 * - leagues: Persisted in localStorage for faster initial load
 * - selectedLeagueId: Persisted so user's selection is remembered
 * - lastFetchedAt: Persisted to implement smart refresh logic
 *
 * This provides:
 * 1. UX: User's league selection is remembered across sessions
 * 2. Performance: Leagues are cached, reducing API calls
 * 3. Freshness: Auto-refresh after 5 minutes
 */
export const useLeagueStore = create<LeagueState>()(
  persist(
    (set, get) => ({
      // Initial state
      leagues: [],
      selectedLeagueId: null,
      isLoading: false,
      lastFetchedAt: null,

      // Actions
      setLeagues: (leagues: League[]) => {
        const currentSelectedId = get().selectedLeagueId;

        // Auto-select first league if none selected and leagues available
        const newSelectedId =
          currentSelectedId || (leagues.length > 0 ? leagues[0].id : null);

        set({
          leagues,
          selectedLeagueId: newSelectedId,
          lastFetchedAt: Date.now(),
          isLoading: false,
        });

        console.log("[LeagueStore] Leagues set:", {
          total: leagues.length,
          selectedId: newSelectedId,
        });
      },

      setSelectedLeagueId: (leagueId: string | null) => {
        set({ selectedLeagueId: leagueId });

        console.log("[LeagueStore] Selected league changed:", {
          leagueId,
        });
      },

      addLeague: (league: League) => {
        const currentLeagues = get().leagues;
        const updatedLeagues = [...currentLeagues, league];

        set({
          leagues: updatedLeagues,
          // Auto-select the new league if it's the first one
          selectedLeagueId:
            get().selectedLeagueId ||
            (updatedLeagues.length === 1 ? league.id : null),
        });

        console.log("[LeagueStore] League added:", {
          leagueId: league.id,
          name: league.name,
        });
      },

      updateLeague: (leagueId: string, updates: Partial<League>) => {
        const currentLeagues = get().leagues;
        const updatedLeagues = currentLeagues.map((league) =>
          league.id === leagueId ? { ...league, ...updates } : league
        );

        set({ leagues: updatedLeagues });

        console.log("[LeagueStore] League updated:", {
          leagueId,
          updates,
        });
      },

      removeLeague: (leagueId: string) => {
        const currentLeagues = get().leagues;
        const updatedLeagues = currentLeagues.filter(
          (league) => league.id !== leagueId
        );
        const currentSelectedId = get().selectedLeagueId;

        set({
          leagues: updatedLeagues,
          // If removed league was selected, select first available or null
          selectedLeagueId:
            currentSelectedId === leagueId
              ? updatedLeagues.length > 0
                ? updatedLeagues[0].id
                : null
              : currentSelectedId,
        });

        console.log("[LeagueStore] League removed:", {
          leagueId,
          remainingLeagues: updatedLeagues.length,
        });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      clearLeagues: () => {
        set({
          leagues: [],
          selectedLeagueId: null,
          isLoading: false,
          lastFetchedAt: null,
        });

        console.log("[LeagueStore] Leagues cleared");
      },

      // Getters
      getSelectedLeague: () => {
        const state = get();
        if (!state.selectedLeagueId) return null;

        return (
          state.leagues.find(
            (league) => league.id === state.selectedLeagueId
          ) || null
        );
      },

      getLeagues: () => get().leagues,

      shouldRefresh: () => {
        const state = get();

        if (!state.lastFetchedAt) return true;

        // Refresh if older than 5 minutes
        const fiveMinutes = 5 * 60 * 1000;
        return Date.now() - state.lastFetchedAt > fiveMinutes;
      },
    }),
    {
      name: "porraza-leagues", // localStorage key
      storage: createJSONStorage(() => localStorage),

      // Persist everything except isLoading
      partialize: (state) => ({
        leagues: state.leagues,
        selectedLeagueId: state.selectedLeagueId,
        lastFetchedAt: state.lastFetchedAt,
        // isLoading is NOT persisted
      }),
    }
  )
);
