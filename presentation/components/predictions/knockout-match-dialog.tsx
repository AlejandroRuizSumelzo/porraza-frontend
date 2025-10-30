"use client";

import { useState } from "react";
import { MapPin, Calendar, Clock, X } from "lucide-react";
import { Badge } from "@/presentation/components/ui/badge";
import { TeamFlag } from "@/presentation/components/ui/team-flag";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/presentation/components/ui/dialog";
import { Button } from "@/presentation/components/ui/button";
import { isTBDParticipant } from "@/presentation/utils/tournament-bracket-utils";

/**
 * Generic BracketSeed type for knockout match dialog
 * Can be used with any bracket library
 */
export interface BracketSeed {
  id: string;
  date: string;
  teams: Array<{
    name: string;
    fifaCode?: string;
    confederation?: string;
  }>;
  matchId?: string;
  matchNumber?: number;
  stadium?: {
    name: string;
    city: string;
    code: string;
  };
  matchTime?: string;
  phase?: string;
}

interface KnockoutMatchDialogProps {
  seed: BracketSeed | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Knockout Match Dialog Component
 *
 * Displays detailed information about a knockout match in a modal
 * Shows stadium image, teams, date, time, and location
 * Handles TBD (To Be Determined) matches gracefully
 */
export function KnockoutMatchDialog({
  seed,
  isOpen,
  onClose,
}: KnockoutMatchDialogProps) {
  const [imageError, setImageError] = useState(false);

  if (!seed) return null;

  const isTBDMatch =
    isTBDParticipant(seed.teams[0]?.fifaCode) ||
    isTBDParticipant(seed.teams[1]?.fifaCode);
  const stadiumImagePath = seed.stadium
    ? `/stadiums/${seed.stadium.code}.webp`
    : null;

  // Format date
  const formatDate = (dateString: string) => {
    if (dateString === "TBD") return "Por determinar";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    } catch {
      return "Por determinar";
    }
  };

  // Format time
  const formatTime = (timeString?: string) => {
    if (!timeString || timeString === "TBD") return "Por determinar";
    return timeString.slice(0, 5); // "20:00:00" -> "20:00"
  };

  // Get phase label
  const getPhaseLabel = (phase?: string) => {
    const labels: Record<string, string> = {
      ROUND_OF_32: "16avos de Final",
      ROUND_OF_16: "Octavos de Final",
      QUARTER_FINAL: "Cuartos de Final",
      SEMI_FINAL: "Semifinal",
      FINAL: "Final",
    };
    return phase ? labels[phase] || phase : "Eliminatoria";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{getPhaseLabel(seed.phase)}</span>
            {seed.matchNumber && (
              <Badge variant="outline" className="font-normal">
                Partido {seed.matchNumber}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stadium Image Header */}
          {!isTBDMatch && stadiumImagePath && (
            <div className="relative overflow-hidden rounded-lg border">
              {!imageError && (
                <>
                  <img
                    src={stadiumImagePath}
                    alt={seed.stadium?.name || "Stadium"}
                    className="h-48 w-full object-cover"
                    onError={() => setImageError(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                </>
              )}
              {imageError && (
                <div className="flex h-48 items-center justify-center bg-muted">
                  <MapPin className="size-12 text-muted-foreground" />
                </div>
              )}
            </div>
          )}

          {/* Teams Display */}
          <div className="space-y-6">
            {/* Home Team */}
            <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
              <TeamFlag
                fifaCode={seed.teams[0]?.fifaCode || "TBD"}
                teamName={seed.teams[0]?.name || "TBD"}
                size="xl"
                rounded="lg"
                bordered
                className="shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold">
                  {seed.teams[0]?.name || "Por determinar"}
                </h3>
                {seed.teams[0]?.confederation && (
                  <p className="mt-1 text-sm uppercase text-muted-foreground">
                    {seed.teams[0].confederation}
                  </p>
                )}
              </div>
            </div>

            {/* VS Divider */}
            <div className="flex items-center justify-center">
              <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/10 px-6 py-3 text-lg font-bold shadow-sm">
                VS
              </div>
            </div>

            {/* Away Team */}
            <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
              <TeamFlag
                fifaCode={seed.teams[1]?.fifaCode || "TBD"}
                teamName={seed.teams[1]?.name || "TBD"}
                size="xl"
                rounded="lg"
                bordered
                className="shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold">
                  {seed.teams[1]?.name || "Por determinar"}
                </h3>
                {seed.teams[1]?.confederation && (
                  <p className="mt-1 text-sm uppercase text-muted-foreground">
                    {seed.teams[1].confederation}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Match Details */}
          {!isTBDMatch && seed.stadium && (
            <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
              <h4 className="text-sm font-semibold uppercase text-muted-foreground">
                Detalles del partido
              </h4>
              <div className="space-y-2">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="size-4 text-primary" />
                  <span className="font-medium">{formatDate(seed.date)}</span>
                </div>
                {/* Time */}
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="size-4 text-primary" />
                  <span className="font-medium">{formatTime(seed.matchTime)}</span>
                </div>
                {/* Stadium */}
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="size-4 text-primary" />
                  <span className="font-medium">
                    {seed.stadium.name} - {seed.stadium.city}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TBD Message */}
          {isTBDMatch && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Los equipos se determinarán cuando se completen las rondas
                anteriores.
              </p>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end">
            <Button onClick={onClose} variant="outline">
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
