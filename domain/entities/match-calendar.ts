import type { Match, MatchPhase } from "@/domain/entities/match";

/**
 * Phase Matches
 * Groups matches by tournament phase
 */
export interface PhaseMatches {
  phase: MatchPhase;
  matches: Match[];
}

/**
 * Match Calendar Entity
 * Represents the complete tournament calendar with all matches grouped by phase
 */
export interface MatchCalendar {
  total: number;
  calendar: PhaseMatches[];
}
