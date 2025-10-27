"use client";

import { useState, useEffect } from "react";
import {
  SidebarTrigger,
  useSidebar,
} from "@/presentation/components/ui/sidebar";
import type { Team } from "@/domain/entities/team";
import type { PlayerPosition } from "@/domain/entities/player";
import { usePlayersByTeam } from "@/presentation/hooks/players/use-players-by-team-client";
import { TeamGridSelector } from "./team-grid-selector";
import { PositionTabs } from "./position-tabs";
import { PlayersGrid } from "./players-grid";
import { PlayerCardsGridSkeleton } from "./player-card-skeleton";
import { TeamFlag } from "@/presentation/components/ui/team-flag";
import { TeamKit } from "@/presentation/components/ui/team-kit";
import { Separator } from "@/presentation/components/ui/separator";
import { Badge } from "@/presentation/components/ui/badge";
import {
  getPlayerCountByPosition,
  getPositionLabel,
  getPositionColor,
  getPositionsInOrder,
} from "@/presentation/lib/player-utils";
import { Trophy, Users, Shield, MapPin, Zap, Target } from "lucide-react";
import { Card, CardContent } from "@/presentation/components/ui/card";

interface TeamPageContentProps {
  teams: Team[] | null;
  error: string | null;
}

/**
 * Team Page Content (Client Component)
 * Main content for the teams page with player roster
 *
 * Features:
 * - Team selector with search
 * - Player roster grouped by position
 * - Position tabs filter
 * - Responsive grid layout
 * - Loading states
 */
export function TeamPageContent({ teams, error }: TeamPageContentProps) {
  const { open, isMobile } = useSidebar();
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<
    PlayerPosition | "all"
  >("all");

  // Fetch players when team is selected
  const {
    players,
    isLoading: playersLoading,
    error: playersError,
  } = usePlayersByTeam(selectedTeamId);

  // Console logs for debugging
  useEffect(() => {
    console.log("[TeamPageContent] Teams data:", teams);
    console.log("[TeamPageContent] Selected team ID:", selectedTeamId);
    console.log("[TeamPageContent] Players data:", players);
    console.log("[TeamPageContent] Players loading:", playersLoading);
    console.log("[TeamPageContent] Players error:", playersError);
  }, [teams, selectedTeamId, players, playersLoading, playersError]);

  // Get selected team
  const selectedTeam = teams?.find((team) => team.id === selectedTeamId);

  // Calculate player counts by position
  const playerCounts =
    players && players.length > 0
      ? getPlayerCountByPosition(players)
      : {
          goalkeeper: 0,
          defender: 0,
          midfielder: 0,
          forward: 0,
        };

  return (
    <div className="flex h-full flex-col">
      {/* Header with Sidebar Toggle */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {(isMobile || !open) && <SidebarTrigger />}
        <h1 className="text-xl font-semibold">Selecciones</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Error State */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Teams loaded - Show grid selector */}
          {!error && teams && teams.length > 0 && (
            <>
              {/* Team Grid Selector */}
              <div className="rounded-lg border bg-card p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">
                    Selecciona una selección:
                  </h2>
                </div>
                <TeamGridSelector
                  teams={teams}
                  selectedTeamId={selectedTeamId}
                  onTeamSelect={(teamId: string) => {
                    setSelectedTeamId(teamId);
                    setSelectedPosition("all"); // Reset position filter
                  }}
                />
              </div>

              {/* Selected Team - Show Players */}
              {selectedTeam && (
                <>
                  {/* Team Header - Option 2: Horizontal Layout with Balanced Proportions */}
                  <div className="rounded-lg border bg-gradient-primary overflow-hidden">
                    <div className="p-6 sm:p-8">
                      {/* Main Info */}
                      <div className="flex flex-col lg:flex-row items-start gap-6">
                        {/* Flag and Kit Container - Optimized Sizes */}
                        <div className="flex items-center gap-4 sm:gap-6">
                          {/* Flag: xl size to respect 300x189 aspect ratio */}
                          <div className="shrink-0">
                            <TeamFlag
                              fifaCode={selectedTeam.fifaCode}
                              teamName={selectedTeam.name}
                              size="xl"
                              bordered
                              className="shadow-soft"
                            />
                          </div>

                          {/* Kit: lg size (square) - slightly smaller to balance */}
                          <div className="shrink-0">
                            <TeamKit
                              fifaCode={selectedTeam.fifaCode}
                              teamName={selectedTeam.name}
                              size="lg"
                              bordered
                              className="shadow-soft"
                            />
                          </div>
                        </div>

                        {/* Team Info */}
                        <div className="flex-1 space-y-4">
                          <div>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                              {selectedTeam.name}
                            </h2>
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <Badge
                                variant="secondary"
                                className="gap-1.5 font-semibold"
                              >
                                <MapPin className="h-3.5 w-3.5" />
                                {selectedTeam.confederation}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="font-mono font-semibold"
                              >
                                {selectedTeam.fifaCode}
                              </Badge>
                              {selectedTeam.isHost && (
                                <Badge className="gap-1.5 bg-secondary text-secondary-foreground">
                                  <Shield className="h-3.5 w-3.5" />
                                  Anfitrión
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Stats Row */}
                          {players && players.length > 0 && (
                            <div className="flex flex-wrap gap-4 pt-2">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                                  <Users className="h-5 w-5" />
                                </div>
                                <div>
                                  <p className="text-lg font-bold">
                                    {players.length}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Jugadores
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground shadow-sm">
                                  <Trophy className="h-5 w-5" />
                                </div>
                                <div>
                                  <p className="text-base font-semibold">
                                    Mundial 2026
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Plantilla oficial
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Position Breakdown Stats */}
                  {!playersLoading && players && players.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {getPositionsInOrder().map((position) => {
                        const count = playerCounts[position];
                        const Icon =
                          position === "goalkeeper" || position === "defender"
                            ? Shield
                            : position === "midfielder"
                            ? Zap
                            : Target;
                        const colorClass = getPositionColor(position);

                        return (
                          <Card
                            key={position}
                            className="overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white ${colorClass}`}
                                >
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <p className="text-2xl font-bold">{count}</p>
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    {getPositionLabel(position)}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}

                  <Separator className="my-6" />

                  {/* Players Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">
                        Plantilla Completa
                      </h3>
                    </div>

                    {/* Players Loading State */}
                    {playersLoading && (
                      <div className="space-y-4">
                        <div className="h-12 rounded-lg border bg-muted/50 animate-pulse" />
                        <PlayerCardsGridSkeleton count={23} />
                      </div>
                    )}

                    {/* Players Error State */}
                    {playersError && !playersLoading && (
                      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <p className="text-sm text-red-600">{playersError}</p>
                      </div>
                    )}

                    {/* Players Success State */}
                    {!playersLoading &&
                      !playersError &&
                      players &&
                      players.length > 0 && (
                        <div className="space-y-6">
                          {/* Position Tabs */}
                          <PositionTabs
                            selectedPosition={selectedPosition}
                            onPositionChange={setSelectedPosition}
                            playerCounts={playerCounts}
                          />

                          {/* Players Grid */}
                          <PlayersGrid
                            players={players}
                            selectedPosition={selectedPosition}
                          />
                        </div>
                      )}

                    {/* No Players State */}
                    {!playersLoading &&
                      !playersError &&
                      players &&
                      players.length === 0 && (
                        <div className="rounded-lg border border-dashed p-12 text-center">
                          <p className="text-sm text-muted-foreground">
                            No hay jugadores disponibles para este equipo
                          </p>
                        </div>
                      )}
                  </div>
                </>
              )}

              {/* No Team Selected State */}
              {!selectedTeam && (
                <div className="rounded-lg border border-dashed p-12 text-center">
                  <p className="text-base font-medium mb-2">
                    Selecciona un equipo
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Elige un equipo del selector para ver su plantilla completa
                    del Mundial 2026
                  </p>
                </div>
              )}
            </>
          )}

          {/* Empty Teams State */}
          {!error && teams && teams.length === 0 && (
            <div className="rounded-lg border border-dashed p-12 text-center">
              <p className="text-sm text-muted-foreground">
                No hay equipos disponibles
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
