"use client";

import type { Player, PlayerPosition } from "@/domain/entities/player";
import { PlayerCard } from "./player-card";
import {
  groupPlayersByPosition,
  getPositionLabel,
  getPositionsInOrder,
  getPositionColor,
  getPositionTextColor,
  getPositionBgLight,
} from "@/presentation/utils/player-utils";
import { Shield, Zap, Target } from "lucide-react";
import { cn } from "@/presentation/utils/cn";
import { Separator } from "@/presentation/components/ui/separator";

interface PlayersGridProps {
  players: Player[];
  selectedPosition: PlayerPosition | "all";
  /**
   * Team identifier (name or FIFA code) for constructing player avatar URLs
   * Example: "France", "FRA"
   */
  teamIdentifier: string;
}

/**
 * Get icon for each position
 */
function getPositionIcon(position: PlayerPosition) {
  switch (position) {
    case "goalkeeper":
      return Shield;
    case "defender":
      return Shield;
    case "midfielder":
      return Zap;
    case "forward":
      return Target;
  }
}

/**
 * Players Grid Component
 * Displays players in a responsive grid with enhanced visual grouping
 *
 * Features:
 * - Responsive grid: 2 cols (mobile) → 6 cols (desktop)
 * - Position-colored headers with gradients
 * - Filters by selected position
 * - Groups by position when "all" is selected
 * - Ordered by jersey number
 * - Clear visual separation between position groups
 */
export function PlayersGrid({ players, selectedPosition, teamIdentifier }: PlayersGridProps) {
  // If specific position selected, show only those players
  if (selectedPosition !== "all") {
    const displayPlayers = groupPlayersByPosition(players)[selectedPosition];

    if (displayPlayers.length === 0) {
      return (
        <div className="flex items-center justify-center rounded-lg border border-dashed p-12">
          <p className="text-sm text-muted-foreground">
            No hay jugadores en esta posición
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {displayPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} teamIdentifier={teamIdentifier} />
        ))}
      </div>
    );
  }

  // Show all players grouped by position
  const groupedPlayers = groupPlayersByPosition(players);
  const positions = getPositionsInOrder();

  return (
    <div className="space-y-10">
      {positions.map((position, index) => {
        const positionPlayers = groupedPlayers[position];
        if (positionPlayers.length === 0) return null;

        const Icon = getPositionIcon(position);
        const colorClass = getPositionColor(position);
        const textColorClass = getPositionTextColor(position);
        const bgLightClass = getPositionBgLight(position);

        return (
          <div key={position} className="space-y-5">
            {/* Separator between groups */}
            {index > 0 && <Separator className="my-8" />}

            {/* Position Header with gradient background */}
            <div
              className={cn(
                "relative overflow-hidden rounded-xl border-2 transition-all duration-300",
                "hover:shadow-md"
              )}
            >
              {/* Gradient background */}
              <div
                className={cn(
                  "absolute inset-0 opacity-5",
                  colorClass
                )}
              />

              <div className="relative flex items-center gap-4 p-4 sm:p-5">
                {/* Icon */}
                <div
                  className={cn(
                    "flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl text-white shadow-md",
                    colorClass
                  )}
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className={cn("text-xl sm:text-2xl font-bold tracking-tight", textColorClass)}>
                    {getPositionLabel(position)}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mt-0.5">
                    {positionPlayers.length}{" "}
                    {positionPlayers.length === 1 ? "jugador" : "jugadores"}
                  </p>
                </div>

                {/* Decorative element */}
                <div
                  className={cn(
                    "hidden sm:flex h-full w-1 rounded-full",
                    colorClass
                  )}
                />
              </div>
            </div>

            {/* Players Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {positionPlayers.map((player) => (
                <PlayerCard key={player.id} player={player} teamIdentifier={teamIdentifier} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
