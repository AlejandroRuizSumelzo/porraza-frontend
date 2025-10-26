/**
 * Prediction Ranking Entity
 * Represents the ranking information for a league
 */

export interface PredictionRanking {
  /**
   * League UUID
   */
  leagueId: string;

  /**
   * Total number of participants in this league
   */
  totalParticipants: number;
}
