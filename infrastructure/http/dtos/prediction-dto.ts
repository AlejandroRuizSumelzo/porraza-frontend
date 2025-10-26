/**
 * Prediction DTO
 * Represents the raw prediction data structure from the API
 * Matches backend PredictionResponseDto exactly
 */
export interface PredictionDTO {
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
   * Player UUID predicted to win Golden Boot (Pichichi)
   */
  goldenBootPlayerId: string | null;

  /**
   * Player UUID predicted to win Golden Ball (MVP)
   */
  goldenBallPlayerId: string | null;

  /**
   * Player UUID predicted to win Golden Glove (Best GK)
   */
  goldenGlovePlayerId: string | null;

  /**
   * Team UUID predicted to win the World Cup 2026
   */
  championTeamId: string | null;

  /**
   * Total points earned from this prediction (calculated)
   */
  totalPoints: number;

  /**
   * Whether predictions are locked (deadline passed: 1h before first match)
   */
  isLocked: boolean;

  /**
   * Timestamp when prediction was created (ISO 8601 string)
   */
  createdAt: string;

  /**
   * Timestamp when prediction was last updated (ISO 8601 string)
   */
  updatedAt: string;
}
