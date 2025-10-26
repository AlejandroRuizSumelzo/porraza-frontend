import { Player } from "../entities/player";

/**
 * PlayerRepository
 * Interface for player data access operations
 */
export interface PlayerRepository {
  /**
   * Get all players from a specific team
   * @param teamId - Team UUID
   * @returns Promise with array of players from the team (23 players)
   */
  getByTeam(teamId: string): Promise<Player[]>;

  /**
   * Get all goalkeepers from all teams
   * For Golden Glove award selection
   * @returns Promise with array of all goalkeepers
   */
  getAllGoalkeepers(): Promise<Player[]>;
}
