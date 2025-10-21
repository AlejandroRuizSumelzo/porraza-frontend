"use client";

import { Lock, MapPin, Calendar, Clock } from "lucide-react";
import { Badge } from "@/presentation/components/ui/badge";
import { Input } from "@/presentation/components/ui/input";
import { cn } from "@/presentation/lib/utils";

interface Match {
  id: number;
  team1: string;
  team2: string;
  flag1: string;
  flag2: string;
  date: string;
  time: string;
  stadium: string;
  status: "pending" | "locked" | "completed";
}

interface MatchPredictionCardProps {
  match: Match;
  prediction?: { score1: string; score2: string };
  onScoreChange: (
    matchId: number,
    team: "score1" | "score2",
    value: string
  ) => void;
}

export function MatchPredictionCard({
  match,
  prediction,
  onScoreChange,
}: MatchPredictionCardProps) {
  const isLocked = match.status === "locked";
  const hasPrediction = prediction?.score1 && prediction?.score2;

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
              <span>{match.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="size-3.5 text-primary/70 sm:size-4" />
              <span>{match.time}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {match.stadium && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
                <MapPin className="size-3 sm:size-3.5" />
                <span className="hidden sm:inline">{match.stadium}</span>
                <span className="sm:hidden">
                  {match.stadium.length > 20
                    ? match.stadium.substring(0, 20) + "..."
                    : match.stadium}
                </span>
              </div>
            )}
            {isLocked && (
              <Badge
                variant="outline"
                className="gap-1 border-border/50 text-muted-foreground"
              >
                <Lock className="size-3" />
                Locked
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Match Content */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6">
          {/* Team 1 */}
          <div className="flex items-center justify-end gap-3">
            <div className="text-right">
              <p className="text-sm font-medium leading-tight text-foreground sm:text-base">
                {match.team1}
              </p>
            </div>
          </div>

          {/* Score Inputs */}
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min="0"
                max="20"
                value={prediction?.score1 || ""}
                onChange={(e) =>
                  onScoreChange(match.id, "score1", e.target.value)
                }
                disabled={isLocked}
                className={cn(
                  "h-14 w-16 text-center text-xl font-bold transition-all sm:h-16 sm:w-18 sm:text-2xl",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "focus:ring-2 focus:ring-offset-0",
                  isLocked
                    ? "border-border/50 bg-muted/50"
                    : prediction?.score1
                    ? "border-primary/40 bg-primary/5 focus:border-primary focus:ring-primary/20"
                    : "border-border bg-background focus:border-primary focus:ring-primary/20"
                )}
                placeholder="–"
              />
              <span className="select-none text-xl font-bold text-muted-foreground/40 sm:text-2xl">
                :
              </span>
              <Input
                type="number"
                min="0"
                max="20"
                value={prediction?.score2 || ""}
                onChange={(e) =>
                  onScoreChange(match.id, "score2", e.target.value)
                }
                disabled={isLocked}
                className={cn(
                  "h-14 w-16 text-center text-xl font-bold transition-all sm:h-16 sm:w-18 sm:text-2xl",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "focus:ring-2 focus:ring-offset-0",
                  isLocked
                    ? "border-border/50 bg-muted/50"
                    : prediction?.score2
                    ? "border-primary/40 bg-primary/5 focus:border-primary focus:ring-primary/20"
                    : "border-border bg-background focus:border-primary focus:ring-primary/20"
                )}
                placeholder="–"
              />
            </div>
            {hasPrediction && !isLocked && (
              <div className="text-xs font-medium text-primary/80 sm:text-sm">
                ✓ Predicción guardada
              </div>
            )}
          </div>

          {/* Team 2 */}
          <div className="flex items-center gap-3">
            <div className="text-left">
              <p className="text-sm font-medium leading-tight text-foreground sm:text-base">
                {match.team2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
