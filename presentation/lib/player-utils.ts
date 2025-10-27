import type { Player, PlayerPosition } from "@/domain/entities/player";

/**
 * Player utility functions
 * Helper functions for working with players and positions
 */

/**
 * Position display configuration
 * Using Porraza brand colors:
 * - Primary (Azul): #2a398d
 * - Secondary (Verde): #3cac3b
 * - Destructive (Rojo): #e61d25
 */
export const POSITION_CONFIG = {
  goalkeeper: {
    label: "Porteros",
    shortLabel: "POR",
    color: "bg-secondary", // Verde
    textColor: "text-secondary",
    bgLight: "bg-secondary/10",
    order: 1,
  },
  defender: {
    label: "Defensas",
    shortLabel: "DEF",
    color: "bg-primary", // Azul
    textColor: "text-primary",
    bgLight: "bg-primary/10",
    order: 2,
  },
  midfielder: {
    label: "Centrocampistas",
    shortLabel: "MED",
    color: "bg-secondary", // Verde
    textColor: "text-secondary",
    bgLight: "bg-secondary/10",
    order: 3,
  },
  forward: {
    label: "Delanteros",
    shortLabel: "DEL",
    color: "bg-destructive", // Rojo
    textColor: "text-destructive",
    bgLight: "bg-destructive/10",
    order: 4,
  },
} as const;

/**
 * Get position display label
 */
export function getPositionLabel(position: PlayerPosition): string {
  return POSITION_CONFIG[position].label;
}

/**
 * Get position short label
 */
export function getPositionShortLabel(position: PlayerPosition): string {
  return POSITION_CONFIG[position].shortLabel;
}

/**
 * Get position color for badges/avatars
 */
export function getPositionColor(position: PlayerPosition): string {
  return POSITION_CONFIG[position].color;
}

/**
 * Get position text color
 */
export function getPositionTextColor(position: PlayerPosition): string {
  return POSITION_CONFIG[position].textColor;
}

/**
 * Get position light background color
 */
export function getPositionBgLight(position: PlayerPosition): string {
  return POSITION_CONFIG[position].bgLight;
}

/**
 * Group players by position
 * Returns an object with position as key and array of players as value
 */
export function groupPlayersByPosition(players: Player[]): Record<
  PlayerPosition,
  Player[]
> {
  const grouped: Record<PlayerPosition, Player[]> = {
    goalkeeper: [],
    defender: [],
    midfielder: [],
    forward: [],
  };

  players.forEach((player) => {
    grouped[player.position].push(player);
  });

  // Sort each position group by jersey number
  Object.keys(grouped).forEach((position) => {
    grouped[position as PlayerPosition].sort(
      (a, b) => a.jerseyNumber - b.jerseyNumber
    );
  });

  return grouped;
}

/**
 * Get all positions in order
 */
export function getPositionsInOrder(): PlayerPosition[] {
  return ["goalkeeper", "defender", "midfielder", "forward"];
}

/**
 * Get player count by position
 */
export function getPlayerCountByPosition(
  players: Player[]
): Record<PlayerPosition, number> {
  const grouped = groupPlayersByPosition(players);
  return {
    goalkeeper: grouped.goalkeeper.length,
    defender: grouped.defender.length,
    midfielder: grouped.midfielder.length,
    forward: grouped.forward.length,
  };
}

/**
 * Get player initials for avatar
 */
export function getPlayerInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
