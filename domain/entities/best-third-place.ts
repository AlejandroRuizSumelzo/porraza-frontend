/**
 * Best Third Place Entity
 * Represents a third-placed team that qualifies for the knockout stage
 * Only exists when all 12 groups are completed
 */

export interface BestThirdPlace {
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
   * Only the top 8 qualify for knockouts
   */
  rankingPosition: number;

  /**
   * Total points earned in group stage
   */
  points: number;

  /**
   * Goal difference (goalsFor - goalsAgainst)
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
   * Whether this team has a tie with another team on points/GD/GF
   * If true, manual tiebreaker might be needed
   */
  hasTiebreakConflict: boolean;

  /**
   * Tiebreaker group number (teams with same stats)
   * null means no tiebreak needed
   */
  tiebreakGroup: number | null;

  /**
   * Manual order for tiebreak resolution
   * User can adjust this when hasTiebreakConflict is true
   */
  manualTiebreakOrder: number | null;

  /**
   * Points earned from this prediction entry
   */
  pointsEarned: number;

  /**
   * Timestamp when entry was created
   */
  createdAt: Date;

  /**
   * Timestamp when entry was last updated
   */
  updatedAt: Date;
}
