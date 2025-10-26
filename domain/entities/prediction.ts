/**
 * Prediction Entity
 * Represents a user's complete prediction for a league in the FIFA World Cup 2026
 */

export interface Prediction {
  /**
   * Prediction unique identifier (UUID)
   */
  id: string;

  /**
   * User UUID who owns this prediction
   */
  userId: string;

  /**
   * League UUID this prediction belongs to
   */
  leagueId: string;

  /**
   * Player UUID predicted to win Golden Boot (Pichichi - top scorer)
   * Nullable - can be null if not yet selected
   */
  goldenBootPlayerId: string | null;

  /**
   * Player UUID predicted to win Golden Ball (MVP)
   * Nullable - can be null if not yet selected
   */
  goldenBallPlayerId: string | null;

  /**
   * Player UUID predicted to win Golden Glove (Best Goalkeeper)
   * Nullable - can be null if not yet selected
   */
  goldenGlovePlayerId: string | null;

  /**
   * Team UUID predicted to win the World Cup 2026
   * Nullable - can be null if not yet selected
   */
  championTeamId: string | null;

  /**
   * Total points earned from this prediction (calculated by backend)
   */
  totalPoints: number;

  /**
   * Whether predictions are locked (deadline passed: 1h before first match)
   */
  isLocked: boolean;

  /**
   * Timestamp when prediction was created
   */
  createdAt: Date;

  /**
   * Timestamp when prediction was last updated
   */
  updatedAt: Date;
}
