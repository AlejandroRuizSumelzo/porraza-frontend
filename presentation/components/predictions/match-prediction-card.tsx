"use client";

import { Lock, MapPin, Calendar, Clock } from "lucide-react";
import { Badge } from "@/presentation/components/ui/badge";
import { Input } from "@/presentation/components/ui/input";
import { TeamFlag } from "@/presentation/components/ui/team-flag";
import { cn } from "@/presentation/lib/utils";
import type { MatchWithPrediction } from "@/domain/entities/match-with-prediction";
import { useState, type ChangeEvent } from "react";

interface MatchPredictionCardProps {
  matchWithPrediction: MatchWithPrediction;
  prediction?: { homeScore: string; awayScore: string };
  onScoreChange: (
    matchId: string,
    team: "homeScore" | "awayScore",
    value: string
  ) => void;
}

/**
 * Match Prediction Card Component
 *
 * Enhanced UI/UX features:
 * - Stadium background image with subtle gradient overlay
 * - Ultra-compact mobile-first design
 * - Clean score inputs without external decorations
 * - Uniform flag sizes across devices
 * - Full team names with tooltips
 * - Optimized for small screens with minimal height
 */
export function MatchPredictionCard({
  matchWithPrediction,
  prediction,
  onScoreChange,
}: MatchPredictionCardProps) {
  const { match } = matchWithPrediction;
  const [imageError, setImageError] = useState(false);

  const handleScoreChange =
    (team: "homeScore" | "awayScore") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      if (value === "") {
        onScoreChange(match.id, team, "");
        return;
      }

      const numericValue = Number(value);

      if (Number.isNaN(numericValue)) {
        return;
      }

      const sanitizedValue = Math.max(0, numericValue);

      onScoreChange(match.id, team, sanitizedValue.toString());
    };

  // Check if predictions are locked
  const isLocked = new Date() > new Date(match.predictionsLockedAt);
  const hasPrediction =
    prediction?.homeScore !== undefined && prediction?.awayScore !== undefined;

  // Stadium image path
  const stadiumImagePath = `/stadiums/${match.stadium.code}.webp`;

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
        "group overflow-hidden rounded-xl border transition-all duration-300",
        isLocked
          ? "border-border/50 bg-card/30 opacity-60"
          : "border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
      )}
    >
      {/* Header with Stadium Background Image */}
      <div className="relative overflow-hidden border-b border-border/50 bg-muted/30">
        {/* Stadium Background Image - More visible */}
        {!imageError && (
          <>
            <img
              src={stadiumImagePath}
              alt={match.stadium.name}
              className="absolute inset-0 h-full w-full object-cover opacity-50 blur-[0.5px] transition-all duration-500 group-hover:scale-105 group-hover:opacity-60"
              onError={() => setImageError(true)}
            />
            {/* Gradient overlay - More transparent to show stadium */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/70 to-background/80" />
          </>
        )}

        {/* Header Content - Ultra compact */}
        <div className="relative z-10 px-3 py-1.5 sm:px-4 sm:py-2">
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 text-[10px] sm:gap-3 sm:text-xs">
              <div className="flex items-center gap-1 text-muted-foreground sm:gap-1.5">
                <Calendar className="size-3 text-primary/70 sm:size-3.5" />
                <span className="font-medium">
                  {formatDate(match.matchDate)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground sm:gap-1.5">
                <Clock className="size-3 text-primary/70 sm:size-3.5" />
                <span className="font-medium">
                  {formatTime(match.matchTime)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground sm:gap-1.5 sm:text-xs">
                <MapPin className="size-3 text-primary/70 sm:size-3.5" />
                <span className="hidden font-medium sm:inline">
                  {match.stadium.name}
                </span>
                <span className="font-medium sm:hidden">
                  {match.stadium.name.length > 15
                    ? match.stadium.name.substring(0, 15) + "..."
                    : match.stadium.name}
                </span>
              </div>
              {isLocked && (
                <Badge
                  variant="outline"
                  className="gap-0.5 border-border/50 px-1.5 py-0 text-[10px] text-muted-foreground sm:gap-1 sm:px-2"
                >
                  <Lock className="size-2.5 sm:size-3" />
                  <span className="hidden sm:inline">Cerrado</span>
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Match Content - Ultra compact */}
      <div className="px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
          {/* Home Team */}
          <div className="flex items-center justify-end gap-2 sm:gap-2.5">
            <div className="min-w-0 text-right">
              <p
                className="truncate text-xs font-semibold leading-tight text-foreground sm:text-sm"
                title={match.homeTeam.name}
              >
                {match.homeTeam.name}
              </p>
              <p className="mt-0.5 text-[10px] font-medium uppercase text-muted-foreground sm:text-xs">
                {match.homeTeam.confederation}
              </p>
            </div>
            <TeamFlag
              fifaCode={match.homeTeam.fifaCode}
              teamName={match.homeTeam.name}
              size="md"
              rounded="md"
              bordered
              className="shrink-0"
            />
          </div>

          {/* Score Inputs - Compact and clean */}
          <div className="flex flex-col items-center gap-1 sm:gap-1.5">
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* Home Score Input */}
              <Input
                type="number"
                min="0"
                max="20"
                value={prediction?.homeScore ?? "0"}
                onChange={handleScoreChange("homeScore")}
                disabled={isLocked}
                className={cn(
                  "h-12 w-12 p-0 text-center text-lg font-bold transition-all sm:h-14 sm:w-14 sm:text-xl",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "focus-visible:ring-2 focus-visible:ring-offset-0",
                  isLocked
                    ? "border-border/50 bg-muted/50"
                    : prediction?.homeScore !== undefined
                    ? "border-primary/50 bg-primary/5 focus-visible:border-primary focus-visible:ring-primary/30"
                    : "border-border bg-background focus-visible:border-primary focus-visible:ring-primary/30"
                )}
                placeholder="0"
              />

              {/* Separator */}
              <span className="select-none text-lg font-bold text-muted-foreground/50 sm:text-xl">
                :
              </span>

              {/* Away Score Input */}
              <Input
                type="number"
                min="0"
                max="20"
                value={prediction?.awayScore ?? "0"}
                onChange={handleScoreChange("awayScore")}
                disabled={isLocked}
                className={cn(
                  "h-12 w-12 p-0 text-center text-lg font-bold transition-all sm:h-14 sm:w-14 sm:text-xl",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "focus-visible:ring-2 focus-visible:ring-offset-0",
                  isLocked
                    ? "border-border/50 bg-muted/50"
                    : prediction?.awayScore !== undefined
                    ? "border-primary/50 bg-primary/5 focus-visible:border-primary focus-visible:ring-primary/30"
                    : "border-border bg-background focus-visible:border-primary focus-visible:ring-primary/30"
                )}
                placeholder="0"
              />
            </div>

            {/* Prediction Status - Minimal */}
            {hasPrediction && !isLocked && (
              <div className="flex items-center gap-1 text-[9px] font-medium text-secondary sm:text-[10px]">
                <span className="size-1.5 rounded-full bg-secondary" />
                Guardado
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <TeamFlag
              fifaCode={match.awayTeam.fifaCode}
              teamName={match.awayTeam.name}
              size="md"
              rounded="md"
              bordered
              className="shrink-0"
            />
            <div className="min-w-0 text-left">
              <p
                className="truncate text-xs font-semibold leading-tight text-foreground sm:text-sm"
                title={match.awayTeam.name}
              >
                {match.awayTeam.name}
              </p>
              <p className="mt-0.5 text-[10px] font-medium uppercase text-muted-foreground sm:text-xs">
                {match.awayTeam.confederation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
