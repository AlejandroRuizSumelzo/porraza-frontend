/**
 * Player DTO (Data Transfer Object)
 * Represents the raw player data structure from the API
 * Matches the backend PlayerResponseDto exactly
 */
export interface PlayerDTO {
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
   * Values: goalkeeper, defender, midfielder, forward
   */
  position: string;

  /**
   * Jersey number (1-99)
   */
  jerseyNumber: number;

  /**
   * Timestamp when player was created in the system (ISO 8601 string)
   */
  createdAt: string;

  /**
   * Timestamp when player was last updated (ISO 8601 string)
   */
  updatedAt: string;
}
