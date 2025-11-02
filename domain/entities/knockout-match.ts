import type { Team } from "@/domain/entities/team";
import type { Stadium } from "@/domain/entities/stadium";

/**
 * Knockout Match Entity
 * Represents a knockout stage match (Round of 32, Round of 16, etc.)
 * Unlike group stage matches, teams may be null initially (until determined by previous matches)
 */
export interface KnockoutMatch {
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
  homeTeam: Team | null;

  /**
   * Away team (nullable - may not be determined yet)
   */
  awayTeam: Team | null;

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
   * Match phase (ROUND_OF_32, ROUND_OF_16, QUARTER_FINALS, SEMI_FINALS, THIRD_PLACE, FINAL)
   */
  phase: string;

  /**
   * Timestamp when predictions become locked (1 hour before match)
   */
  predictionsLockedAt: Date;
}
