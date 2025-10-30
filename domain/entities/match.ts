import type { Team } from "@/domain/entities/team";
import type { Stadium } from "@/domain/entities/stadium";

/**
 * Match Phase Enum
 * Represents the different phases of the tournament
 */
export type MatchPhase =
  | "GROUP_STAGE"
  | "ROUND_OF_32"
  | "ROUND_OF_16"
  | "QUARTER_FINALS"
  | "SEMI_FINALS"
  | "THIRD_PLACE"
  | "FINAL";

/**
 * Match Status Enum
 * Represents the current status of a match
 */
export type MatchStatus =
  | "SCHEDULED"
  | "LIVE"
  | "FINISHED"
  | "POSTPONED"
  | "CANCELLED";
/**
 * Score Interface
 * Represents the score of a match (regular time, extra time, or penalties)
 */
export interface Score {
  home: number;
  away: number;
}

/**
 * Match Entity
 * Represents a football match in the domain
 */
export interface Match {
  id: string;
  matchNumber: number;
  phase: MatchPhase;
  group: string | null;
  date: string;
  time: string;
  status: MatchStatus;
  homeTeam: Team;
  awayTeam: Team;
  stadium: Stadium;
  score: Score | null;
  scoreEt: Score | null;
  penalties: Score | null;
}
