"use client";

import { Avatar, AvatarFallback } from "@/presentation/components/ui/avatar";
import { Badge } from "@/presentation/components/ui/badge";
import { Card } from "@/presentation/components/ui/card";
import type { Player } from "@/domain/entities/player";
import {
  getPlayerInitials,
  getPositionColor,
  getPositionShortLabel,
} from "@/presentation/utils/player-utils";
import { cn } from "@/presentation/utils/cn";

interface PlayerCardProps {
  player: Player;
}

/**
 * Player Card Component
 * Displays player information in a compact card format
 *
 * Design:
 * - Avatar with initials and position color
 * - Jersey number badge
 * - Player name
 * - Position label
 */
export function PlayerCard({ player }: PlayerCardProps) {
  const initials = getPlayerInitials(player.name);
  const positionColor = getPositionColor(player.position);
  const positionLabel = getPositionShortLabel(player.position);

  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-md">
      <div className="flex flex-col items-center gap-3 p-4">
        {/* Avatar with position color */}
        <div className="relative">
          <Avatar className="h-16 w-16">
            <AvatarFallback
              className={cn("text-lg font-semibold text-white", positionColor)}
            >
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Jersey Number Badge */}
          <Badge
            variant="default"
            className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold"
          >
            {player.jerseyNumber}
          </Badge>
        </div>

        {/* Player Name */}
        <div className="text-center">
          <p className="font-medium text-sm leading-tight line-clamp-2">
            {player.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{positionLabel}</p>
        </div>
      </div>
    </Card>
  );
}
