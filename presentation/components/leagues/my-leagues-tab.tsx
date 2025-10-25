"use client";

import { LeagueCard } from "@/presentation/components/leagues/league-card";
import { LeagueEmptyState } from "@/presentation/components/leagues/league-empty-state";
import { LeagueGridSkeleton } from "@/presentation/components/leagues/league-skeleton";
import type { League } from "@/domain/entities/league";

interface MyLeaguesTabProps {
  leagues: League[];
  isLoading: boolean;
  error: string | null;
}

/**
 * My Leagues Tab Component
 * Displays user's leagues with admin badge
 */
export function MyLeaguesTab({ leagues, isLoading, error }: MyLeaguesTabProps) {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">
        Mis Ligas ({leagues.length})
      </h2>

      {isLoading && <LeagueGridSkeleton count={3} />}

      {error && <LeagueEmptyState type="error" message={error} />}

      {!isLoading && !error && leagues.length === 0 && (
        <LeagueEmptyState
          type="empty"
          message="No estás en ninguna liga todavía."
        />
      )}

      {!isLoading && leagues.length > 0 && (
        <div className="space-y-3">
          {leagues.map((league) => (
            <LeagueCard key={league.id} league={league} showAdminBadge />
          ))}
        </div>
      )}
    </div>
  );
}
