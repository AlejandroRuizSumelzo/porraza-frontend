"use client";

import { Tabs, TabsList, TabsTrigger } from "@/presentation/components/ui/tabs";
import type { PlayerPosition } from "@/domain/entities/player";
import { Badge } from "@/presentation/components/ui/badge";
import { Users, Shield, Zap, Target } from "lucide-react";
import {
  getPositionLabel,
  getPositionsInOrder,
  getPositionTextColor,
} from "@/presentation/utils/player-utils";
import { cn } from "@/presentation/utils/cn";

interface PositionTabsProps {
  selectedPosition: PlayerPosition | "all";
  onPositionChange: (position: PlayerPosition | "all") => void;
  playerCounts: Record<PlayerPosition, number>;
}

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

/**
 * Position Tabs Component
 * Enhanced tabs for filtering players by position
 *
 * Features:
 * - "Todos" tab to show all players
 * - Individual tabs for each position with position colors
 * - Shows player count in colored badges
 * - Smooth transitions and hover effects
 * - Responsive horizontal scroll on mobile
 */
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
      <TabsList className="h-auto flex-wrap justify-start gap-2 bg-muted/50 p-3 rounded-xl">
        {/* All tab */}
        <TabsTrigger
          value="all"
          className={cn(
            "gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all",
            "data-[state=active]:shadow-md",
            "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
            "dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground"
          )}
        >
          <AllIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Todos</span>
          <Badge
            variant="secondary"
            className={cn(
              "h-5 min-w-[1.25rem] px-2 font-bold transition-colors",
              selectedPosition === "all" &&
                "bg-white/20 text-white border-white/30"
            )}
          >
            {totalPlayers}
          </Badge>
        </TabsTrigger>

        {/* Position tabs with colors */}
        {positions.map((position) => {
          const count = playerCounts[position];
          if (count === 0) return null;

          const Icon = getPositionIcon(position);
          const textColorClass = getPositionTextColor(position);
          const isActive = selectedPosition === position;

          return (
            <TabsTrigger
              key={position}
              value={position}
              className={cn(
                "gap-2 px-3 sm:px-4 py-2.5 rounded-lg font-semibold transition-all",
                "data-[state=active]:shadow-md",
                // Inactive state colors
                !isActive && ["hover:bg-muted/80", textColorClass]
              )}
              style={
                isActive
                  ? {
                      // Use inline styles with !important as final override
                      backgroundColor:
                        position === "goalkeeper"
                          ? "#3cac3b"
                          : position === "defender"
                          ? "#2a398d"
                          : position === "midfielder"
                          ? "#3cac3b"
                          : "#e61d25",
                      color: "white",
                      // These are the problematic defaults we need to override
                      borderColor: "transparent",
                    }
                  : undefined
              }
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">
                {getPositionLabel(position)}
              </span>
              <span className="sm:hidden">
                {getPositionLabel(position).substring(0, 3)}
              </span>
              <Badge
                className={cn(
                  "h-5 min-w-[1.25rem] px-1.5 sm:px-2 font-bold transition-colors text-[10px] sm:text-xs",
                  isActive
                    ? "bg-white/20 text-white border-white/30"
                    : cn("border-current", textColorClass)
                )}
                variant={isActive ? "default" : "outline"}
              >
                {count}
              </Badge>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
