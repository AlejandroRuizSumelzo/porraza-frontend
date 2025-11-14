import type { TeamDTO } from "@/infrastructure/http/dtos/team-dto";
import type { StadiumDTO } from "@/infrastructure/http/dtos/stadium-dto";

/**
 * Match Phase DTO
 * Represents the different phases of the tournament (backend format)
 */
export type MatchPhaseDTO =
  | "GROUP_STAGE"
  | "ROUND_OF_32"
  | "ROUND_OF_16"
  | "QUARTER_FINAL"
  | "SEMI_FINAL"
  | "THIRD_PLACE"
  | "FINAL";

/**
 * Match Status DTO
 * Represents the current status of a match (backend format)
 */
export type MatchStatusDTO =
  | "SCHEDULED"
  | "LIVE"
  | "FINISHED"
  | "POSTPONED"
  | "CANCELLED";

/**
 * Score DTO
 * Represents the score of a match (backend format)
 */
export interface ScoreDTO {
  home: number;
  away: number;
}

/**
 * Match DTO (Data Transfer Object)
 * Represents the raw match data structure from the API
 * Matches the backend response format exactly
 */
export interface MatchDTO {
  id: string;
  matchNumber: number;
  phase: MatchPhaseDTO;
  group: string | null;
  date: string;
  time: string;
  status: MatchStatusDTO;
  homeTeam: TeamDTO;
  awayTeam: TeamDTO;
  stadium: StadiumDTO;
  score: ScoreDTO | null;
  scoreEt: ScoreDTO | null;
  penalties: ScoreDTO | null;
}
