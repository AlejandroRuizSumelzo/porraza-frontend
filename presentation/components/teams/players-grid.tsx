"use client";

import type { Player, PlayerPosition } from "@/domain/entities/player";
import { PlayerCard } from "./player-card";
import {
  groupPlayersByPosition,
  getPositionLabel,
  getPositionsInOrder,
  getPositionColor,
} from "@/presentation/utils/player-utils";
import { Shield, Zap, Target } from "lucide-react";
import { cn } from "@/presentation/utils/cn";

interface PlayersGridProps {
  players: Player[];
  selectedPosition: PlayerPosition | "all";
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
 * Displays players in a responsive grid
 *
 * Features:
 * - Responsive grid: 2 cols (mobile) → 6 cols (desktop)
 * - Filters by selected position
 * - Groups by position when "all" is selected
 * - Ordered by jersey number
 */
export function PlayersGrid({ players, selectedPosition }: PlayersGridProps) {
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
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    );
  }

  // Show all players grouped by position
  const groupedPlayers = groupPlayersByPosition(players);
  const positions = getPositionsInOrder();

  return (
    <div className="space-y-8">
      {positions.map((position) => {
        const positionPlayers = groupedPlayers[position];
        if (positionPlayers.length === 0) return null;

        const Icon = getPositionIcon(position);
        const colorClass = getPositionColor(position);

        return (
          <div key={position} className="space-y-4">
            {/* Position Header */}
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg text-white",
                  colorClass
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {getPositionLabel(position)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {positionPlayers.length}{" "}
                  {positionPlayers.length === 1 ? "jugador" : "jugadores"}
                </p>
              </div>
            </div>

            {/* Players Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {positionPlayers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
