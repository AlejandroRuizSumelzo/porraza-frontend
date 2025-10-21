import type {
  MatchDTO,
  MatchPhaseDTO,
} from "@/infrastructure/http/dtos/match-dto";

/**
 * Phase Matches DTO
 * Groups matches by tournament phase (backend format)
 */
export interface PhaseMatchesDTO {
  phase: MatchPhaseDTO;
  matches: MatchDTO[];
}

/**
 * Match Calendar DTO
 * Represents the complete tournament calendar response from the API
 * Matches the backend response format exactly for /matches/calendar
 */
export interface MatchCalendarDTO {
  total: number;
  calendar: PhaseMatchesDTO[];
}
