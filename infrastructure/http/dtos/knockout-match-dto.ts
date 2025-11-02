import type { TeamDTO } from "@/infrastructure/http/dtos/team-dto";
import type { StadiumDTO } from "@/infrastructure/http/dtos/stadium-dto";

/**
 * Knockout Match DTO
 * Represents knockout stage match data from the API
 * Teams can be null if not yet determined
 */
export interface KnockoutMatchDTO {
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
   * Placeholder text for home team (e.g., "Winner Match 73", "Group A runners-up")
   */
  homeTeamPlaceholder: string | null;

  /**
   * Placeholder text for away team (e.g., "Winner Match 74", "Group B runners-up")
   */
  awayTeamPlaceholder: string | null;

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
   * Match phase (ROUND_OF_32, ROUND_OF_16, QUARTER_FINALS, SEMI_FINALS, THIRD_PLACE, FINAL)
   */
  phase: string;

  /**
   * Timestamp when predictions become locked (ISO 8601 timestamp)
   */
  predictionsLockedAt: string;
}
