"use client";

import { useState } from "react";
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
} from "@/presentation/utils/player-utils";
import { Trophy, Users, Shield, MapPin, Zap, Target, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { cn } from "@/presentation/utils/cn";

interface TeamPageContentProps {
  teams: Team[] | null;
  error: string | null;
}

/**
 * Team Page Content (Client Component)
 * Enhanced main content for the teams page with player roster
 *
 * Features:
 * - Modern team selector with search
 * - Enhanced player roster with position-colored cards
 * - Position tabs filter with colors
 * - Responsive grid layout
 * - Improved loading and error states
 * - Better visual hierarchy and spacing
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
      <header className="flex h-16 shrink-0 items-center gap-3 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {(isMobile || !open) && <SidebarTrigger />}
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">Selecciones</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
          {/* Error State */}
          {error && (
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="flex items-start gap-3 p-4">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-semibold text-destructive">Error al cargar equipos</p>
                  <p className="text-sm text-destructive/80 mt-1">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Teams loaded - Show grid selector */}
          {!error && teams && teams.length > 0 && (
            <>
              {/* Team Grid Selector */}
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <h2 className="text-lg sm:text-xl font-bold">
                      Selecciona una selección
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
                </CardContent>
              </Card>

              {/* Selected Team - Show Players */}
              {selectedTeam && (
                <>
                  {/* Team Header - Enhanced Design */}
                  <Card className="overflow-hidden border-2">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent pointer-events-none" />

                    <CardContent className="relative p-4 sm:p-6 md:p-8">
                      {/* Main Info */}
                      <div className="flex flex-col lg:flex-row items-start gap-6">
                        {/* Flag and Kit Container */}
                        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                          {/* Flag - Responsive sizes: sm on mobile, lg on tablet, xl on desktop */}
                          <div className="shrink-0">
                            <TeamFlag
                              fifaCode={selectedTeam.fifaCode}
                              teamName={selectedTeam.name}
                              size="lg"
                              bordered
                              className="shadow-md transition-transform hover:scale-105 w-14 sm:w-16 md:w-20 lg:w-24"
                            />
                          </div>

                          {/* Kit - Responsive sizes: xs on mobile, sm on tablet, md on desktop */}
                          <div className="shrink-0">
                            <TeamKit
                              fifaCode={selectedTeam.fifaCode}
                              teamName={selectedTeam.name}
                              size="md"
                              bordered
                              className="shadow-md transition-transform hover:scale-105 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                            />
                          </div>
                        </div>

                        {/* Team Info */}
                        <div className="flex-1 space-y-3 sm:space-y-4">
                          <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                              {selectedTeam.name}
                            </h2>
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                              <Badge
                                variant="secondary"
                                className="gap-1 sm:gap-1.5 font-semibold text-xs sm:text-sm"
                              >
                                <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                <span className="hidden xs:inline">{selectedTeam.confederation}</span>
                                <span className="xs:hidden">{selectedTeam.confederation.substring(0, 3)}</span>
                              </Badge>
                              <Badge
                                variant="outline"
                                className="font-mono font-bold text-xs sm:text-sm"
                              >
                                {selectedTeam.fifaCode}
                              </Badge>
                              {selectedTeam.isHost && (
                                <Badge className="gap-1 sm:gap-1.5 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm">
                                  <Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                  <span className="hidden xs:inline">Anfitrión</span>
                                  <span className="xs:hidden">Host</span>
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Stats Row */}
                          {players && players.length > 0 && (
                            <div className="flex flex-wrap gap-3 sm:gap-4 pt-1 sm:pt-2">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 text-primary">
                                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                                </div>
                                <div>
                                  <p className="text-lg sm:text-xl font-bold">
                                    {players.length}
                                  </p>
                                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                                    Jugadores
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-lg sm:rounded-xl bg-secondary/10 text-secondary">
                                  <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
                                </div>
                                <div>
                                  <p className="text-sm sm:text-base font-bold">
                                    Mundial 2026
                                  </p>
                                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                                    Plantilla oficial
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Position Breakdown Stats */}
                  {!playersLoading && players && players.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 md:grid-cols-4">
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
                            className={cn(
                              "group overflow-hidden border-2 transition-all duration-300",
                              "hover:shadow-lg hover:-translate-y-0.5 sm:hover:-translate-y-1 cursor-pointer",
                              "active:scale-95"
                            )}
                            onClick={() => setSelectedPosition(position)}
                          >
                            {/* Top color line */}
                            <div className={cn("h-1 sm:h-1.5", colorClass)} />

                            <CardContent className="p-3 sm:p-4">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div
                                  className={cn(
                                    "flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl text-white shadow-sm transition-transform duration-300 group-hover:scale-110",
                                    colorClass
                                  )}
                                >
                                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xl sm:text-2xl font-bold">{count}</p>
                                  <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
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
                      <h3 className="text-xl font-bold">
                        Plantilla Completa
                      </h3>
                    </div>

                    {/* Players Loading State */}
                    {playersLoading && (
                      <div className="space-y-4">
                        <div className="h-14 rounded-xl border bg-muted/50 animate-pulse" />
                        <PlayerCardsGridSkeleton count={23} />
                      </div>
                    )}

                    {/* Players Error State */}
                    {playersError && !playersLoading && (
                      <Card className="border-destructive/50 bg-destructive/5">
                        <CardContent className="flex items-start gap-3 p-4">
                          <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                          <div>
                            <p className="font-semibold text-destructive">Error al cargar jugadores</p>
                            <p className="text-sm text-destructive/80 mt-1">{playersError}</p>
                          </div>
                        </CardContent>
                      </Card>
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
                            teamIdentifier={selectedTeam.fifaCode}
                          />
                        </div>
                      )}

                    {/* No Players State */}
                    {!playersLoading &&
                      !playersError &&
                      players &&
                      players.length === 0 && (
                        <Card className="border-dashed">
                          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                            <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
                            <p className="text-base font-medium text-muted-foreground">
                              No hay jugadores disponibles para este equipo
                            </p>
                          </CardContent>
                        </Card>
                      )}
                  </div>
                </>
              )}

              {/* No Team Selected State */}
              {!selectedTeam && (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                    <Trophy className="h-16 w-16 text-muted-foreground/30 mb-4" />
                    <p className="text-lg font-semibold mb-2">
                      Selecciona un equipo
                    </p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Elige un equipo del selector para ver su plantilla completa
                      del Mundial 2026
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Empty Teams State */}
          {!error && teams && teams.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <Trophy className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <p className="text-base font-medium text-muted-foreground">
                  No hay equipos disponibles
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
