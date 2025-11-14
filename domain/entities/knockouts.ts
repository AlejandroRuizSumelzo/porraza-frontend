import type { Team } from "@/domain/entities/team";
import type { Stadium } from "@/domain/entities/stadium";

/**
 * Knockout Match Detail Entity
 * Represents a single knockout match with optional user prediction
 * Used within the Knockouts structure to show progressive bracket
 */
export interface KnockoutMatchDetail {
  /**
   * Match unique identifier (UUID)
   */
  id: string;

  /**
   * Match number (sequential identifier)
   */
  matchNumber: number;

  /**
   * Home team (nullable - may not be determined yet based on user predictions)
   */
  homeTeam: Team | null;

  /**
   * Away team (nullable - may not be determined yet based on user predictions)
   */
  awayTeam: Team | null;

  /**
   * Stadium where the match will be played
   */
  stadium: Stadium;

  /**
   * Match date (includes date and time)
   */
  matchDate: Date;

  /**
   * Match time in HH:MM:SS format
   */
  matchTime: string;

  /**
   * Match phase (ROUND_OF_32, ROUND_OF_16, QUARTER_FINAL, SEMI_FINAL, FINAL)
   */
  phase: string;

  /**
   * Timestamp when predictions become locked (1 hour before match)
   */
  predictionsLockedAt: Date;

  /**
   * Placeholder text for home team (e.g., "Winner Match 73", "Group A runners-up")
   */
  homeTeamPlaceholder: string | null;

  /**
   * Placeholder text for away team (e.g., "Winner Match 74", "Group B runners-up")
   */
  awayTeamPlaceholder: string | null;

  /**
   * User's prediction for this knockout match (nullable if not yet created)
   */
  userPrediction: UserKnockoutPrediction | null;
}

/**
 * User Knockout Prediction Entity
 * Represents user's prediction for a knockout match
 */
export interface UserKnockoutPrediction {
  /**
   * Prediction unique identifier (UUID)
   */
  id: string;

  /**
   * Match ID this prediction belongs to
   */
  matchId: string;

  /**
   * Predicted home team score (90 minutes)
   */
  homeScore: number;

  /**
   * Predicted away team score (90 minutes)
   */
  awayScore: number;

  /**
   * Predicted home team score after extra time (nullable)
   */
  homeScoreET: number | null;

  /**
   * Predicted away team score after extra time (nullable)
   */
  awayScoreET: number | null;

  /**
   * Winner of penalties if match goes to penalties
   * "home" | "away" | null
   */
  penaltiesWinner: string | null;

  /**
   * Points earned from this prediction (0 if not yet scored)
   */
  pointsEarned: number;
}

/**
 * Knockouts Entity
 * Represents all knockout stage matches organized by rounds
 * Teams are progressively resolved based on user's predictions
 *
 * Progressive resolution means:
 * - If user predicts Round of 32, winners populate Round of 16
 * - If user predicts Round of 16, winners populate Quarter Finals
 * - If user predicts Quarter Finals, winners populate Semi Finals
 * - If user predicts Semi Finals, winners populate Final
 *
 * Supports partial predictions: if user predicts 1 of 2 semifinals,
 * final will show 1 team + 1 placeholder
 */
export interface Knockouts {
  /**
   * Round of 32 matches (16 matches)
   */
  roundOf32: KnockoutMatchDetail[];

  /**
   * Round of 16 matches (8 matches)
   * Teams resolved from Round of 32 predictions
   */
  roundOf16: KnockoutMatchDetail[];

  /**
   * Quarter Finals matches (4 matches)
   * Teams resolved from Round of 16 predictions
   */
  quarterFinals: KnockoutMatchDetail[];

  /**
   * Semi Finals matches (2 matches)
   * Teams resolved from Quarter Finals predictions
   */
  semiFinals: KnockoutMatchDetail[];

  /**
   * Final match (1 match)
   * Teams resolved from Semi Finals predictions
   */
  final: KnockoutMatchDetail;
}
