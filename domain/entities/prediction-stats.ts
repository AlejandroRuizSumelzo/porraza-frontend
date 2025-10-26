/**
 * Prediction Stats Entity
 * Represents progress statistics for a user's prediction
 */

export interface PredictionStats {
  /**
   * Total number of matches in the tournament (104)
   */
  totalMatches: number;

  /**
   * Number of matches already predicted by the user
   */
  predictedMatches: number;

  /**
   * Number of groups completed (with full standings)
   * Range: 0-12
   */
  groupsCompleted: number;

  /**
   * Total number of groups in the tournament (12)
   */
  totalGroups: number;

  /**
   * Whether user has selected a champion team
   */
  hasChampion: boolean;

  /**
   * Whether user has selected all awards (Golden Boot, Ball, Glove)
   */
  hasAllAwards: boolean;

  /**
   * Overall completion percentage (0-100)
   */
  completionPercentage: number;
}
