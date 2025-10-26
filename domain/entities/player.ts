/**
 * Player Entity
 * Represents a football player in a national team for the FIFA World Cup 2026
 */

export type PlayerPosition =
  | "goalkeeper"
  | "defender"
  | "midfielder"
  | "forward";

export interface Player {
  /**
   * Player unique identifier (UUID)
   */
  id: string;

  /**
   * Player full name
   */
  name: string;

  /**
   * Team UUID this player belongs to
   */
  teamId: string;

  /**
   * Player position on the field
   */
  position: PlayerPosition;

  /**
   * Jersey number (1-99)
   */
  jerseyNumber: number;

  /**
   * Timestamp when player was created in the system
   */
  createdAt: Date;

  /**
   * Timestamp when player was last updated
   */
  updatedAt: Date;
}
