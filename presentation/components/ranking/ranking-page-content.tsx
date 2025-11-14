"use client";

import { RefreshCw, Trophy, Users, TrendingUp } from "lucide-react";
import {
  SidebarTrigger,
  useSidebar,
} from "@/presentation/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";
import { Button } from "@/presentation/components/ui/button";
import { Avatar, AvatarFallback } from "@/presentation/components/ui/avatar";
import type { LeagueRanking } from "@/domain/entities/league";
import { RankingSkeleton } from "@/presentation/components/ranking/ranking-skeleton";
import { cn } from "@/presentation/utils/cn";

interface RankingPageContentProps {
  ranking: LeagueRanking | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  selectedLeagueId: string | null;
}

/**
 * Ranking Page Content Component
 * Displays the league leaderboard with rankings, points, and completion status
 *
 * Features:
 * - Top 3 podium with special styling (gold, silver, bronze)
 * - Stats cards showing total members, active predictions, etc.
 * - Responsive table with avatars, badges, and completion indicators
 * - Real-time refetch functionality
 * - Clean, modern design with shadcn/ui components
 */
export function RankingPageContent({
  ranking,
  isLoading,
  error,
  refetch,
  selectedLeagueId,
}: RankingPageContentProps) {
  const { open, isMobile } = useSidebar();

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Helper function to get medal color for top 3
  const getMedalColor = (position: number) => {
    switch (position) {
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-600";
      default:
        return "text-muted-foreground";
    }
  };

  // Helper function to get position badge variant
  const getPositionBadge = (position: number) => {
    if (position <= 3) {
      return (
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full font-bold",
            position === 1 && "bg-yellow-500/20 text-yellow-600",
            position === 2 && "bg-gray-400/20 text-gray-600",
            position === 3 && "bg-amber-600/20 text-amber-700"
          )}
        >
          {position}
        </div>
      );
    }
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground">
        {position}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
        <div className="flex items-center gap-2">
          {(isMobile || !open) && <SidebarTrigger />}
          <Trophy className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold">Clasificación</h1>
        </div>
        {ranking && (
          <Button
            variant="ghost"
            size="sm"
            onClick={refetch}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </Button>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-5xl space-y-4">
          {/* No league selected */}
          {!selectedLeagueId && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Trophy className="mb-4 h-12 w-12 text-muted-foreground" />
                <CardTitle className="mb-2">
                  No hay liga seleccionada
                </CardTitle>
                <CardDescription>
                  Selecciona una liga en el menú lateral para ver su
                  clasificación.
                </CardDescription>
              </CardContent>
            </Card>
          )}

          {/* Loading state */}
          {isLoading && selectedLeagueId && <RankingSkeleton />}

          {/* Error state */}
          {error && selectedLeagueId && !isLoading && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <CardTitle className="mb-2 text-destructive">Error</CardTitle>
                <CardDescription>{error}</CardDescription>
                <Button onClick={refetch} className="mt-4">
                  Reintentar
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Ranking content */}
          {ranking && !isLoading && !error && (
            <>
              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Miembros
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {ranking.totalMembers}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Con Predicciones
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {ranking.activePredictions}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {((ranking.activePredictions / ranking.totalMembers) * 100).toFixed(1)}% activos
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Actualizado
                    </CardTitle>
                    <RefreshCw className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      {new Date(ranking.generatedAt).toLocaleString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Ranking Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Tabla de Clasificación</CardTitle>
                  <CardDescription>
                    Ordenado por puntos totales. Los empates se resuelven por
                    última actualización de puntos y fecha de ingreso.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {ranking.ranking.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Trophy className="mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        No hay miembros en esta liga todavía.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {ranking.ranking.map((entry) => (
                        <div
                          key={entry.user.id}
                          className={cn(
                            "flex items-center gap-4 p-4 transition-colors hover:bg-muted/50",
                            entry.position <= 3 && "bg-muted/30"
                          )}
                        >
                          {/* Position */}
                          <div className="shrink-0">
                            {getPositionBadge(entry.position)}
                          </div>

                          {/* Avatar */}
                          <Avatar className="h-10 w-10 shrink-0">
                            <AvatarFallback className="text-xs font-medium">
                              {getInitials(entry.user.name)}
                            </AvatarFallback>
                          </Avatar>

                          {/* User Info */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="truncate font-medium">
                                {entry.user.name}
                              </p>
                              {entry.position <= 3 && (
                                <Trophy
                                  className={cn(
                                    "h-4 w-4 shrink-0",
                                    getMedalColor(entry.position)
                                  )}
                                />
                              )}
                            </div>
                            <p className="truncate text-sm text-muted-foreground">
                              {entry.user.email}
                            </p>
                            <div className="mt-1 text-xs text-muted-foreground">
                              Ingresó:{" "}
                              {new Date(entry.joinedAt).toLocaleDateString(
                                "es-ES",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </div>
                          </div>

                          {/* Points */}
                          <div className="shrink-0 text-right">
                            <div className="text-2xl font-bold text-primary">
                              {entry.totalPoints}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              puntos
                            </p>
                          </div>

                          {/* Completion Badges */}
                          <div className="hidden shrink-0 flex-col gap-1 md:flex">
                            {entry.isLocked && (
                              <Badge variant="secondary" className="text-xs">
                                Bloqueada
                              </Badge>
                            )}
                            {entry.groupsCompleted && (
                              <Badge
                                variant="default"
                                className="bg-green-500 text-xs hover:bg-green-600"
                              >
                                Grupos ✓
                              </Badge>
                            )}
                            {entry.knockoutsCompleted && (
                              <Badge
                                variant="default"
                                className="bg-blue-500 text-xs hover:bg-blue-600"
                              >
                                Eliminatorias ✓
                              </Badge>
                            )}
                            {entry.awardsCompleted && (
                              <Badge
                                variant="default"
                                className="bg-purple-500 text-xs hover:bg-purple-600"
                              >
                                Premios ✓
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
