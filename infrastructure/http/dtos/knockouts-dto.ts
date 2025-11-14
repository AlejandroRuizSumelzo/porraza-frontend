import type { TeamDTO } from "@/infrastructure/http/dtos/team-dto";
import type { StadiumDTO } from "@/infrastructure/http/dtos/stadium-dto";

/**
 * User Knockout Prediction DTO
 * Represents user's prediction for a knockout match as returned by API
 */
export interface UserKnockoutPredictionDTO {
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
 * Knockout Match Detail DTO
 * Represents a single knockout match with optional user prediction from API
 */
export interface KnockoutMatchDetailDTO {
  /**
   * Match unique identifier (UUID)
   */
  id: string;

  /**
   * Match number (sequential identifier)
   */
  matchNumber: number;

  /**
   * Home team (nullable - may not be determined yet)
   */
  homeTeam: TeamDTO | null;

  /**
   * Away team (nullable - may not be determined yet)
   */
  awayTeam: TeamDTO | null;

  /**
   * Stadium where the match will be played
   */
  stadium: StadiumDTO;

  /**
   * Match date (ISO 8601 timestamp)
   */
  matchDate: string;

  /**
   * Match time in HH:MM:SS format
   */
  matchTime: string;

  /**
   * Match phase (ROUND_OF_32, ROUND_OF_16, QUARTER_FINAL, SEMI_FINAL, FINAL)
   */
  phase: string;

  /**
   * Timestamp when predictions become locked (ISO 8601 timestamp)
   */
  predictionsLockedAt: string;

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
  userPrediction: UserKnockoutPredictionDTO | null;
}

/**
 * Knockouts DTO
 * Represents all knockout stage matches organized by rounds from API
 * As returned by GET /predictions/league/{leagueId}
 */
export interface KnockoutsDTO {
  /**
   * Round of 32 matches (16 matches)
   */
  roundOf32: KnockoutMatchDetailDTO[];

  /**
   * Round of 16 matches (8 matches)
   */
  roundOf16: KnockoutMatchDetailDTO[];

  /**
   * Quarter Finals matches (4 matches)
   */
  quarterFinals: KnockoutMatchDetailDTO[];

  /**
   * Semi Finals matches (2 matches)
   */
  semiFinals: KnockoutMatchDetailDTO[];

  /**
   * Final match (1 match, not an array)
   */
  final: KnockoutMatchDetailDTO;
}
