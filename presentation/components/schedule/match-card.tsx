"use client";

import { Card } from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";
import { Separator } from "@/presentation/components/ui/separator";
import { TeamFlag } from "@/presentation/components/ui/team-flag";
import { MapPin, Clock, Trophy, Circle } from "lucide-react";
import type { Match } from "@/domain/entities/match";
import { cn } from "@/presentation/lib/utils";

interface MatchCardProps {
  match: Match;
}

/**
 * Match Card Component (Client Component)
 * Modern, minimalist design with tricolor palette and stadium image
 *
 * Design Features:
 * - Small stadium image (aspect ratio 1200x700 scaled down)
 * - Tricolor accents (blue/green/red)
 * - Color-coded team badges
 * - Live match animations
 * - Gradient overlays on stadium image
 */
export function MatchCard({ match }: MatchCardProps) {
  // Generate stadium image path
  const stadiumImagePath = `/stadiums/${match.stadium.code}.webp`;

  // Status badge styling
  const getStatusBadge = () => {
    const statusConfig = {
      SCHEDULED: {
        label: "Programado",
        className: "bg-secondary/10 text-secondary border-secondary/20",
        icon: Clock,
      },
      LIVE: {
        label: "En vivo",
        className:
          "bg-destructive text-destructive-foreground border-destructive shadow-lg shadow-destructive/20",
        icon: Circle,
      },
      HALF_TIME: {
        label: "Medio tiempo",
        className: "bg-secondary/10 text-secondary border-secondary/20",
        icon: Clock,
      },
      FINISHED: {
        label: "Finalizado",
        className: "bg-muted text-muted-foreground border-border",
        icon: Trophy,
      },
      POSTPONED: {
        label: "Pospuesto",
        className: "bg-muted text-muted-foreground border-border",
        icon: Clock,
      },
      CANCELLED: {
        label: "Cancelado",
        className: "bg-muted text-muted-foreground border-border",
        icon: Clock,
      },
    };

    const config = statusConfig[match.status];
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={cn("gap-1.5", config.className)}>
        {match.status === "LIVE" && (
          <Circle className="h-2 w-2 fill-current animate-pulse" />
        )}
        {match.status !== "LIVE" && <Icon className="h-3 w-3" />}
        {config.label}
      </Badge>
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(date);
  };

  // Format time
  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5); // "20:00:00" -> "20:00"
  };

  // Determine winner for color coding
  const homeIsWinner = match.score && match.score.home > match.score.away;
  const awayIsWinner = match.score && match.score.away > match.score.home;
  const isDraw = match.score && match.score.home === match.score.away;

  return (
    <Card className="group relative overflow-hidden border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      {/* Top bar with gradient - Tricolor accent */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-destructive" />

      {/* Match Number & Status */}
      <div className="flex items-center justify-between bg-muted/30 px-4 py-2.5 pt-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-foreground/70">
            #{match.matchNumber}
          </span>
          {match.group && (
            <Badge
              variant="outline"
              className="h-5 border-primary/20 bg-primary/5 text-xs text-primary"
            >
              Grupo {match.group}
            </Badge>
          )}
        </div>
        {getStatusBadge()}
      </div>

      <div className="p-4">
        {/* Teams & Score */}
        <div className="flex items-center gap-4 max-[380px]:gap-2">
          {/* Home Team */}
          <div className="flex flex-1 items-center gap-3 max-[380px]:justify-end">
            <TeamFlag
              fifaCode={match.homeTeam.fifaCode}
              teamName={match.homeTeam.name}
              size="lg"
              rounded="lg"
              bordered
              className={cn(
                "shrink-0 transition-all duration-300",
                homeIsWinner &&
                  "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg shadow-primary/30"
              )}
            />
            <div className="flex-1 min-w-0 max-[380px]:hidden">
              <p
                className={cn(
                  "font-semibold line-clamp-1 transition-colors",
                  homeIsWinner && "text-primary"
                )}
              >
                {match.homeTeam.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {match.homeTeam.confederation}
              </p>
            </div>
          </div>

          {/* Score or VS */}
          <div className="flex flex-col items-center justify-center px-3 max-[380px]:px-2">
            {match.score ? (
              <div className="space-y-0.5">
                <div className="flex items-center gap-2.5 text-2xl font-bold">
                  <span
                    className={cn(
                      "transition-colors",
                      homeIsWinner && "text-primary",
                      isDraw && "text-foreground"
                    )}
                  >
                    {match.score.home}
                  </span>
                  <span className="text-sm text-muted-foreground">-</span>
                  <span
                    className={cn(
                      "transition-colors",
                      awayIsWinner && "text-secondary",
                      isDraw && "text-foreground"
                    )}
                  >
                    {match.score.away}
                  </span>
                </div>
                {/* Extra Time Score */}
                {match.scoreEt && (
                  <p className="text-center text-xs text-muted-foreground">
                    (ET: {match.scoreEt.home}-{match.scoreEt.away})
                  </p>
                )}
                {/* Penalties */}
                {match.penalties && (
                  <p className="text-center text-xs font-medium text-destructive">
                    Pen: {match.penalties.home}-{match.penalties.away}
                  </p>
                )}
              </div>
            ) : (
              <span className="text-base font-semibold text-muted-foreground">
                vs
              </span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-1 items-center gap-3 max-[380px]:justify-start">
            <div className="flex-1 min-w-0 text-right max-[380px]:hidden">
              <p
                className={cn(
                  "font-semibold line-clamp-1 transition-colors",
                  awayIsWinner && "text-secondary"
                )}
              >
                {match.awayTeam.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {match.awayTeam.confederation}
              </p>
            </div>
            <TeamFlag
              fifaCode={match.awayTeam.fifaCode}
              teamName={match.awayTeam.name}
              size="lg"
              rounded="md"
              bordered
              className={cn(
                "shrink-0 transition-all duration-300",
                awayIsWinner &&
                  "ring-2 ring-secondary ring-offset-2 ring-offset-background shadow-lg shadow-secondary/30"
              )}
            />
          </div>
        </div>

        <Separator className="my-4" />

        {/* Stadium Info with Image */}
        <div className="flex items-center gap-3">
          {/* Stadium Thumbnail */}
          <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
            <img
              src={stadiumImagePath}
              alt={match.stadium.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>

          {/* Stadium & Time Details */}
          <div className="flex-1 space-y-1.5 text-sm">
            <div className="flex items-center gap-2 text-foreground/80">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="line-clamp-1 font-medium">
                {match.stadium.name}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-secondary" />
              <span className="text-xs">
                {formatDate(match.date)} • {formatTime(match.time)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
