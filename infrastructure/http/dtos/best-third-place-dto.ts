/**
 * Best Third Place DTO
 * Represents the raw best third place data structure from the API
 * Matches backend BestThirdPlaceDto exactly
 */

export interface BestThirdPlaceDTO {
  /**
   * Best third place entry UUID
   */
  id: string;

  /**
   * Prediction UUID this entry belongs to
   */
  predictionId: string;

  /**
   * Team UUID
   */
  teamId: string;

  /**
   * Ranking position among all third-placed teams (1-8)
   */
  rankingPosition: number;

  /**
   * Total points earned in group stage
   */
  points: number;

  /**
   * Goal difference
   */
  goalDifference: number;

  /**
   * Goals scored in group stage
   */
  goalsFor: number;

  /**
   * UUID of the group this team came from
   */
  fromGroupId: string;

  /**
   * Whether this team has a tie with another team
   */
  hasTiebreakConflict: boolean;

  /**
   * Tiebreaker group number (null if no tiebreak needed)
   */
  tiebreakGroup: number | null;

  /**
   * Manual order for tiebreak resolution
   */
  manualTiebreakOrder: number | null;

  /**
   * Points earned from this prediction entry
   */
  pointsEarned: number;

  /**
   * Timestamp when entry was created (ISO 8601 string)
   */
  createdAt: string;

  /**
   * Timestamp when entry was last updated (ISO 8601 string)
   */
  updatedAt: string;
}
