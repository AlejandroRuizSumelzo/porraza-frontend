"use client";

import { Tabs, TabsList, TabsTrigger } from "@/presentation/components/ui/tabs";
import type { PlayerPosition } from "@/domain/entities/player";
import { Badge } from "@/presentation/components/ui/badge";
import { Users, Shield, Zap, Target } from "lucide-react";
import {
  getPositionLabel,
  getPositionsInOrder,
} from "@/presentation/utils/player-utils";

interface PositionTabsProps {
  selectedPosition: PlayerPosition | "all";
  onPositionChange: (position: PlayerPosition | "all") => void;
  playerCounts: Record<PlayerPosition, number>;
}

/**
 * Position Tabs Component
 * Tabs for filtering players by position
 *
 * Features:
 * - "Todos" tab to show all players
 * - Individual tabs for each position
 * - Shows player count in badges
 * - Responsive horizontal scroll on mobile
 */
/**
 * Get icon for each position
 */
function getPositionIcon(position: PlayerPosition | "all") {
  switch (position) {
    case "goalkeeper":
      return Shield; // Porteros
    case "defender":
      return Shield; // Defensas
    case "midfielder":
      return Zap; // Centrocampistas
    case "forward":
      return Target; // Delanteros
    case "all":
      return Users; // Todos
  }
}

export function PositionTabs({
  selectedPosition,
  onPositionChange,
  playerCounts,
}: PositionTabsProps) {
  const positions = getPositionsInOrder();
  const totalPlayers = positions.reduce(
    (sum, pos) => sum + playerCounts[pos],
    0
  );

  const AllIcon = getPositionIcon("all");

  return (
    <Tabs
      value={selectedPosition}
      onValueChange={(value) =>
        onPositionChange(value as PlayerPosition | "all")
      }
      className="w-full"
    >
      <TabsList className="h-auto flex-wrap justify-start gap-2 bg-muted/50 p-2">
        {/* All tab */}
        <TabsTrigger value="all" className="gap-2">
          <AllIcon className="h-4 w-4" />
          Todos
          <Badge variant="secondary" className="h-5 min-w-[1.25rem] px-1.5">
            {totalPlayers}
          </Badge>
        </TabsTrigger>

        {/* Position tabs */}
        {positions.map((position) => {
          const count = playerCounts[position];
          if (count === 0) return null;

          const Icon = getPositionIcon(position);

          return (
            <TabsTrigger key={position} value={position} className="gap-2">
              <Icon className="h-4 w-4" />
              {getPositionLabel(position)}
              <Badge variant="secondary" className="h-5 min-w-[1.25rem] px-1.5">
                {count}
              </Badge>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
