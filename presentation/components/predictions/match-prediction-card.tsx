"use client";

import { Lock, MapPin, Calendar, Clock } from "lucide-react";
import { Badge } from "@/presentation/components/ui/badge";
import { Input } from "@/presentation/components/ui/input";
import { TeamFlag } from "@/presentation/components/ui/team-flag";
import { cn } from "@/presentation/lib/utils";
import type { MatchWithPrediction } from "@/domain/entities/match-with-prediction";

interface MatchPredictionCardProps {
  matchWithPrediction: MatchWithPrediction;
  prediction?: { homeScore: string; awayScore: string };
  onScoreChange: (
    matchId: string,
    team: "homeScore" | "awayScore",
    value: string
  ) => void;
}

export function MatchPredictionCard({
  matchWithPrediction,
  prediction,
  onScoreChange,
}: MatchPredictionCardProps) {
  const { match } = matchWithPrediction;

  // Check if predictions are locked
  const isLocked = new Date() > new Date(match.predictionsLockedAt);
  const hasPrediction =
    prediction?.homeScore !== undefined && prediction?.awayScore !== undefined;

  // Format date
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
    }).format(date);
  };

  // Format time
  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5); // "20:00:00" -> "20:00"
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border transition-all",
        isLocked
          ? "border-border/50 bg-card/30 opacity-60"
          : "border-border bg-card hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5"
      )}
    >
      {/* Header with Date, Time, Stadium */}
      <div className="border-b border-border/50 bg-muted/30 px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 text-xs sm:gap-4 sm:text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="size-3.5 text-primary/70 sm:size-4" />
              <span>{formatDate(match.matchDate)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="size-3.5 text-primary/70 sm:size-4" />
              <span>{formatTime(match.matchTime)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
              <MapPin className="size-3 sm:size-3.5" />
              <span className="hidden sm:inline">{match.stadium.name}</span>
              <span className="sm:hidden">
                {match.stadium.name.length > 20
                  ? match.stadium.name.substring(0, 20) + "..."
                  : match.stadium.name}
              </span>
            </div>
            {isLocked && (
              <Badge
                variant="outline"
                className="gap-1 border-border/50 text-muted-foreground"
              >
                <Lock className="size-3" />
                Cerrado
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Match Content */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6">
          {/* Home Team */}
          <div className="flex items-center justify-end gap-3">
            <div className="text-right">
              <p className="text-sm font-medium leading-tight text-foreground sm:text-base">
                {match.homeTeam.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {match.homeTeam.confederation}
              </p>
            </div>
            <TeamFlag
              fifaCode={match.homeTeam.fifaCode}
              teamName={match.homeTeam.name}
              size="lg"
              rounded="md"
              bordered
              className="shrink-0"
            />
          </div>

          {/* Score Inputs */}
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min="0"
                max="20"
                value={prediction?.homeScore ?? "0"}
                onChange={(e) =>
                  onScoreChange(match.id, "homeScore", e.target.value)
                }
                disabled={isLocked}
                className={cn(
                  "h-14 w-16 text-center text-xl font-bold transition-all sm:h-16 sm:w-18 sm:text-2xl",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "focus:ring-2 focus:ring-offset-0",
                  isLocked
                    ? "border-border/50 bg-muted/50"
                    : prediction?.homeScore !== undefined
                    ? "border-primary/40 bg-primary/5 focus:border-primary focus:ring-primary/20"
                    : "border-border bg-background focus:border-primary focus:ring-primary/20"
                )}
                placeholder="0"
              />
              <span className="select-none text-xl font-bold text-muted-foreground/40 sm:text-2xl">
                :
              </span>
              <Input
                type="number"
                min="0"
                max="20"
                value={prediction?.awayScore ?? "0"}
                onChange={(e) =>
                  onScoreChange(match.id, "awayScore", e.target.value)
                }
                disabled={isLocked}
                className={cn(
                  "h-14 w-16 text-center text-xl font-bold transition-all sm:h-16 sm:w-18 sm:text-2xl",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "focus:ring-2 focus:ring-offset-0",
                  isLocked
                    ? "border-border/50 bg-muted/50"
                    : prediction?.awayScore !== undefined
                    ? "border-primary/40 bg-primary/5 focus:border-primary focus:ring-primary/20"
                    : "border-border bg-background focus:border-primary focus:ring-primary/20"
                )}
                placeholder="0"
              />
            </div>
            {hasPrediction && !isLocked && (
              <div className="text-xs font-medium text-primary/80 sm:text-sm">
                ✓ Predicción guardada
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-3">
            <TeamFlag
              fifaCode={match.awayTeam.fifaCode}
              teamName={match.awayTeam.name}
              size="lg"
              rounded="md"
              bordered
              className="shrink-0"
            />
            <div className="text-left">
              <p className="text-sm font-medium leading-tight text-foreground sm:text-base">
                {match.awayTeam.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {match.awayTeam.confederation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
