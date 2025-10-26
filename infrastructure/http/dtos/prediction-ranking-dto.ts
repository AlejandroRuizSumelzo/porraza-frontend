/**
 * Prediction Ranking DTO
 * Represents league ranking information from the API
 */
export interface PredictionRankingDTO {
  /**
   * League UUID
   */
  leagueId: string;

  /**
   * Total number of participants in this league
   */
  totalParticipants: number;
}
