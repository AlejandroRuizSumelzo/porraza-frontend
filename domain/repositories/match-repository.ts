import type { MatchCalendar } from "@/domain/entities/match-calendar";

/**
 * Match Repository Interface
 * Defines the contract for match data access
 */
export interface MatchRepository {
  /**
   * Get the complete match calendar
   * Returns all matches grouped by tournament phase
   * @returns Promise with the complete match calendar
   */
  getCalendar(): Promise<MatchCalendar>;
}
