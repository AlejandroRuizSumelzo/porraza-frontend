"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/presentation/components/ui/avatar";
import { Badge } from "@/presentation/components/ui/badge";
import { Card } from "@/presentation/components/ui/card";
import type { Player } from "@/domain/entities/player";
import {
  getPlayerInitials,
  getPositionColor,
  getPositionShortLabel,
  getPlayerAvatarUrl,
  getPositionTextColor,
} from "@/presentation/utils/player-utils";
import { cn } from "@/presentation/utils/cn";

interface PlayerCardProps {
  player: Player;
  /**
   * Team identifier (name or FIFA code) for constructing avatar URL
   * Example: "France", "FRA"
   */
  teamIdentifier: string;
}

/**
 * Player Card Component
 * Displays player information in a modern card format
 *
 * Design:
 * - Large avatar (96x96) with player image or colored fallback
 * - Position-colored border on hover
 * - Prominent jersey number badge
 * - Clean typography with player name and position
 * - Smooth animations and hover effects
 */
export function PlayerCard({ player, teamIdentifier }: PlayerCardProps) {
  const initials = getPlayerInitials(player.name);
  const positionColor = getPositionColor(player.position);
  const positionTextColor = getPositionTextColor(player.position);
  const positionLabel = getPositionShortLabel(player.position);
  const avatarUrl = getPlayerAvatarUrl(teamIdentifier, player.avatarFilename);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        "border-2 border-border hover:border-current",
        positionTextColor
      )}
    >
      {/* Position indicator line */}
      <div className={cn("absolute top-0 left-0 right-0 h-1", positionColor)} />

      <div className="flex flex-col items-center gap-3 p-4 pt-5">
        {/* Avatar with player image or position color fallback */}
        <div className="relative">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-border group-hover:border-current transition-all duration-300">
            {avatarUrl && (
              <AvatarImage
                src={avatarUrl}
                alt={player.name}
                className="object-cover"
              />
            )}
            <AvatarFallback
              className={cn(
                "text-xl sm:text-2xl font-bold text-white transition-transform duration-300 group-hover:scale-110",
                positionColor
              )}
            >
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Jersey Number Badge */}
          <Badge
            className={cn(
              "absolute -bottom-1.5 -right-1.5 h-7 w-7 rounded-full p-0",
              "flex items-center justify-center text-xs font-bold",
              "shadow-md border-2 border-background",
              "transition-transform duration-300 group-hover:scale-110",
              positionColor
            )}
          >
            {player.jerseyNumber}
          </Badge>
        </div>

        {/* Player Info */}
        <div className="text-center w-full space-y-1">
          <p className="font-semibold text-sm leading-tight line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
            {player.name}
          </p>
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] font-semibold px-2 py-0.5 border-current",
              positionTextColor
            )}
          >
            {positionLabel}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
