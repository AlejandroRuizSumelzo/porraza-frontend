import type { MatchPhaseDTO } from "@/infrastructure/http/dtos/match-dto";
import type { TeamDTO } from "@/infrastructure/http/dtos/team-dto";
import type { StadiumDTO } from "@/infrastructure/http/dtos/stadium-dto";

/**
 * RoundOf32Match DTO (Data Transfer Object)
 * Represents the raw Round of 32 match data structure from the API
 * Matches the backend response format exactly
 */
export interface RoundOf32MatchDTO {
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
  homeTeam: TeamDTO;

  /**
   * Away team object
   */
  awayTeam: TeamDTO;

  /**
   * Stadium object where the match will be played
   */
  stadium: StadiumDTO;

  /**
   * Match date and time (ISO 8601 string)
   */
  matchDate: string;

  /**
   * Match time in HH:MM:SS format
   */
  matchTime: string;

  /**
   * Match phase (should always be "ROUND_OF_32" for this DTO)
   */
  phase: MatchPhaseDTO;

  /**
   * Timestamp when predictions for this match will be locked (ISO 8601 string)
   */
  predictionsLockedAt: string;
}
