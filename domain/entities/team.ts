/**
 * Team Entity
 * Represents a national team participating in the FIFA World Cup 2026
 */

export type Confederation =
  | "AFC"
  | "CAF"
  | "CONCACAF"
  | "CONMEBOL"
  | "OFC"
  | "UEFA"
  | "TBD";

export interface Team {
  /**
   * Unique identifier of the team (UUID)
   */
  id: string;

  /**
   * Full name of the team (e.g., "Canada", "Spain")
   */
  name: string;

  /**
   * FIFA three-letter code (e.g., "CAN", "ESP")
   */
  fifaCode: string;

  /**
   * Confederation the team belongs to
   */
  confederation: Confederation;

  /**
   * Whether the team is a host nation (Mexico, USA, or Canada)
   */
  isHost: boolean;

  /**
   * Timestamp when the team was created
   */
  createdAt: Date;

  /**
   * Timestamp when the team was last updated
   */
  updatedAt: Date;
}
