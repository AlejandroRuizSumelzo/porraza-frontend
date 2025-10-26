/**
 * Match Prediction DTO
 * Represents a match prediction from/to the API
 * Matches backend MatchPredictionDto exactly
 */
export interface MatchPredictionDTO {
  /**
   * UUID of the match
   */
  matchId: string;

  /**
   * Home team score (90 minutes)
   */
  homeScore: number;

  /**
   * Away team score (90 minutes)
   */
  awayScore: number;

  /**
   * Home team score in extra time (only for knockouts)
   */
  homeScoreET?: number;

  /**
   * Away team score in extra time (only for knockouts)
   */
  awayScoreET?: number;

  /**
   * Winner on penalties (home or away)
   */
  penaltiesWinner?: string;
}
