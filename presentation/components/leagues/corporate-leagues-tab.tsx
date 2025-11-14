"use client";

import { Building2 } from "lucide-react";
import { LeagueCard } from "@/presentation/components/leagues/league-card";
import { LeagueEmptyState } from "@/presentation/components/leagues/league-empty-state";
import { LeagueGridSkeleton } from "@/presentation/components/leagues/league-skeleton";
import type { League } from "@/domain/entities/league";

interface CorporateLeaguesTabProps {
  leagues: League[];
  isLoading: boolean;
  error: string | null;
  isJoining: boolean;
  onJoinLeague: (league: League) => void;
}

/**
 * Corporate Leagues Tab Component
 * Displays public corporate/business leagues available to join
 */
export function CorporateLeaguesTab({
  leagues,
  isLoading,
  error,
  isJoining,
  onJoinLeague,
}: CorporateLeaguesTabProps) {
  return (
    <div>
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-600 dark:text-amber-500">
        <Building2 className="h-5 w-5" />
        Ligas Corporativas Disponibles
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Únete a ligas organizadas por empresas y organizaciones. Compite con
        compañeros de trabajo o miembros de tu comunidad profesional.
      </p>

      {isLoading && <LeagueGridSkeleton count={4} />}

      {error && <LeagueEmptyState type="error" message={error} />}

      {!isLoading && !error && leagues.length === 0 && (
        <LeagueEmptyState
          type="empty"
          message="No hay ligas corporativas disponibles en este momento."
        />
      )}

      {!isLoading && leagues.length > 0 && (
        <div className="space-y-3">
          {leagues.map((league) => (
            <LeagueCard
              key={league.id}
              league={league}
              onAction={onJoinLeague}
              actionLabel={league.isMember ? "Ya eres miembro" : "Unirse"}
              actionDisabled={league.isMember || isJoining}
            />
          ))}
        </div>
      )}
    </div>
  );
}
