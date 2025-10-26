/**
 * Team DTO (Data Transfer Object)
 * Represents the raw team data structure from the API
 * Matches the backend TeamResponseDto exactly
 */
export interface TeamDTO {
  /**
   * Unique identifier of the team (UUID)
   */
  id: string;

  /**
   * Full name of the team
   */
  name: string;

  /**
   * FIFA three-letter code
   */
  fifaCode: string;

  /**
   * Confederation the team belongs to
   * Values: AFC, CAF, CONCACAF, CONMEBOL, OFC, UEFA, TBD
   */
  confederation: string;

  /**
   * Whether the team is a host nation (Mexico, USA, or Canada)
   */
  isHost: boolean;

  /**
   * Timestamp when the team was created (ISO 8601 string)
   */
  createdAt: string;

  /**
   * Timestamp when the team was last updated (ISO 8601 string)
   */
  updatedAt: string;
}
