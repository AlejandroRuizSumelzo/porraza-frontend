import type { Player } from "@/domain/entities/player";
import type { PlayerRepository } from "@/domain/repositories/player-repository";
import type { HttpClient } from "@/infrastructure/http/client";
import type { PlayerDTO } from "@/infrastructure/http/dtos/player-dto";
import { PlayerMapper } from "@/infrastructure/mappers/player-mapper";
import { HttpError } from "@/infrastructure/http/client";

/**
 * Player Repository Implementation
 * Implements the PlayerRepository interface from domain layer
 * Handles all HTTP communication with the players API
 */
export class PlayerRepositoryImpl implements PlayerRepository {
  private readonly baseUrl = "/players";

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get all players from a specific team
   * @param teamId - Team UUID
   * @returns Promise with array of 23 players from the team
   */
  async getByTeam(teamId: string): Promise<Player[]> {
    try {
      const response = await this.httpClient.get<PlayerDTO[]>(
        `${this.baseUrl}/team/${teamId}`
      );
      return PlayerMapper.toDomainList(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[PlayerRepository] Error fetching players by team:", {
          teamId,
          status: error.status,
          message: error.message,
          response: error.response,
        });
        throw new Error(
          `Failed to fetch players for team ${teamId}: ${error.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Get all goalkeepers from all teams
   * For Golden Glove award selection
   * @returns Promise with array of all goalkeepers
   */
  async getAllGoalkeepers(): Promise<Player[]> {
    try {
      const response = await this.httpClient.get<PlayerDTO[]>(
        `${this.baseUrl}/goalkeepers`
      );
      return PlayerMapper.toDomainList(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[PlayerRepository] Error fetching goalkeepers:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });
        throw new Error(`Failed to fetch goalkeepers: ${error.message}`);
      }
      throw error;
    }
  }
}
