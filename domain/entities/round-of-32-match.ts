import type { MatchPhase } from "@/domain/entities/match";
import type { Team } from "@/domain/entities/team";
import type { Stadium } from "@/domain/entities/stadium";

/**
 * RoundOf32Match Entity
 * Represents a knockout match in the Round of 32 phase
 * Contains full team and stadium objects once groups are completed
 */
export interface RoundOf32Match {
  /**
   * Match unique identifier (UUID)
   */
  id: string;

  /**
   * Match number in the tournament sequence
   */
  matchNumber: number;

  /**
   * Home team object
   */
  homeTeam: Team;

  /**
   * Away team object
   */
  awayTeam: Team;

  /**
   * Stadium object where the match will be played
   */
  stadium: Stadium;

  /**
   * Match date and time
   */
  matchDate: Date;

  /**
   * Match time in HH:MM:SS format
   */
  matchTime: string;

  /**
   * Match phase (should always be "ROUND_OF_32" for this entity)
   */
  phase: MatchPhase;

  /**
   * Timestamp when predictions for this match will be locked
   */
  predictionsLockedAt: Date;
}
