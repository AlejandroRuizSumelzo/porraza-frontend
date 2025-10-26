import { Team } from "@/domain/entities/team";

/**
 * TeamRepository
 * Interface for team data access operations
 */
export interface TeamRepository {
  /**
   * Get all teams
   * @returns Promise with array of all teams
   */
  getAll(): Promise<Team[]>;

  /**
   * Get a team by its ID
   * @param id - Team UUID
   * @returns Promise with the team or null if not found
   */
  getById(id: string): Promise<Team | null>;
}
