"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";
import { TeamFlag } from "@/presentation/components/ui/team-flag";
import { AlertTriangle, ArrowUp, ArrowDown } from "lucide-react";
import type { TeamStanding } from "@/presentation/utils/calculate-standings";
import { cn } from "@/presentation/utils/cn";

interface TiebreakerControlProps {
  tiedTeams: TeamStanding[];
  groupName: string;
  onReorder: (newOrder: string[]) => void; // Array of team IDs in desired order
}

/**
 * Tiebreaker Control Component
 *
 * Allows users to manually order teams that are tied in all criteria.
 * Uses simple up/down buttons for mobile-first UX.
 *
 * Features:
 * - Shows only when there's an absolute tie
 * - Clear visual warning with AlertTriangle
 * - Mobile-friendly button interface
 * - Shows team stats to help user decide
 */
export function TiebreakerControl({
  tiedTeams,
  groupName,
  onReorder,
}: TiebreakerControlProps) {
  // Current order (by position in array)
  const currentOrder = tiedTeams.map((t) => t.team.id);

  const handleMoveUp = (teamId: string) => {
    const currentIndex = currentOrder.indexOf(teamId);
    if (currentIndex <= 0) return; // Already at top

    const newOrder = [...currentOrder];
    // Swap with previous
    [newOrder[currentIndex - 1], newOrder[currentIndex]] = [
      newOrder[currentIndex],
      newOrder[currentIndex - 1],
    ];

    onReorder(newOrder);
  };

  const handleMoveDown = (teamId: string) => {
    const currentIndex = currentOrder.indexOf(teamId);
    if (currentIndex >= currentOrder.length - 1) return; // Already at bottom

    const newOrder = [...currentOrder];
    // Swap with next
    [newOrder[currentIndex], newOrder[currentIndex + 1]] = [
      newOrder[currentIndex + 1],
      newOrder[currentIndex],
    ];

    onReorder(newOrder);
  };

  // Sort tiedTeams by current order
  const sortedTiedTeams = [...tiedTeams].sort((a, b) => {
    const indexA = currentOrder.indexOf(a.team.id);
    const indexB = currentOrder.indexOf(b.team.id);
    return indexA - indexB;
  });

  return (
    <Card className="border-warning bg-warning/5 pt-4 pb-4">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" />
          <div className="space-y-1.5">
            <h3 className="text-base font-semibold text-foreground sm:text-lg">
              Desempate necesario - Grupo {groupName}
            </h3>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Estos equipos están empatados en puntos, diferencia de goles y
              goles a favor. Usa los botones para elegir el orden de
              clasificación.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 pb-5">
        {sortedTiedTeams.map((standing, index) => (
          <div
            key={standing.team.id}
            className={cn(
              "flex items-center gap-2 rounded-lg border bg-card p-2.5 transition-all sm:gap-3 sm:p-3",
              "hover:border-primary/30 hover:bg-muted/30"
            )}
          >
            {/* Position Badge */}
            <Badge
              variant="outline"
              className={cn(
                "size-7 shrink-0 items-center justify-center rounded-full border-2 p-0 text-xs font-bold sm:size-8 sm:text-sm",
                index === 0 &&
                  "border-secondary bg-secondary/10 text-secondary",
                index === 1 &&
                  "border-secondary bg-secondary/10 text-secondary",
                index === 2 && "border-warning bg-warning/10 text-warning"
              )}
            >
              {standing.position}
            </Badge>

            {/* Team Info */}
            <TeamFlag
              fifaCode={standing.team.fifaCode}
              teamName={standing.team.name}
              size="sm"
              rounded="md"
              bordered
              className="shrink-0"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground sm:text-base">
                {standing.team.name}
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-muted-foreground sm:gap-x-3">
                <span>
                  <strong className="text-foreground">{standing.points}</strong>{" "}
                  pts
                </span>
                <span>
                  <strong className="text-foreground">
                    {standing.goalDifference > 0 ? "+" : ""}
                    {standing.goalDifference}
                  </strong>{" "}
                  DIF
                </span>
                <span>
                  <strong className="text-foreground">
                    {standing.goalsFor}
                  </strong>{" "}
                  GF
                </span>
              </div>
            </div>

            {/* Move Buttons */}
            <div className="flex shrink-0 gap-1">
              <Button
                size="sm"
                variant="outline"
                className="size-8 p-0 sm:size-9"
                onClick={() => handleMoveUp(standing.team.id)}
                disabled={index === 0}
                aria-label={`Mover ${standing.team.name} hacia arriba`}
              >
                <ArrowUp className="size-3.5 sm:size-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="size-8 p-0 sm:size-9"
                onClick={() => handleMoveDown(standing.team.id)}
                disabled={index === sortedTiedTeams.length - 1}
                aria-label={`Mover ${standing.team.name} hacia abajo`}
              >
                <ArrowDown className="size-3.5 sm:size-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
