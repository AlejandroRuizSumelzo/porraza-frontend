/**
 * Match Prediction Value Object
 * Represents a user's prediction for a single match
 */

export type PenaltiesWinner = "home" | "away";

export interface MatchPrediction {
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
   * Optional - null for group stage matches
   */
  homeScoreET?: number | null;

  /**
   * Away team score in extra time (only for knockouts)
   * Optional - null for group stage matches
   */
  awayScoreET?: number | null;

  /**
   * Winner on penalties (home or away)
   * Optional - only for knockout matches that go to penalties
   */
  penaltiesWinner?: PenaltiesWinner | null;
}
