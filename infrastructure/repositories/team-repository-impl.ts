import type { Team } from "@/domain/entities/team";
import type { TeamRepository } from "@/domain/repositories/team-repository";
import type { HttpClient } from "@/infrastructure/http/client";
import type { TeamDTO } from "@/infrastructure/http/dtos/team-dto";
import { TeamMapper } from "@/infrastructure/mappers/team-mapper";
import { HttpError } from "@/infrastructure/http/client";

/**
 * Team Repository Implementation
 * Implements the TeamRepository interface from domain layer
 * Handles all HTTP communication with the teams API
 */
export class TeamRepositoryImpl implements TeamRepository {
  private readonly baseUrl = "/teams";

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get all teams
   * @returns Promise with array of all teams
   */
  async getAll(): Promise<Team[]> {
    try {
      const response = await this.httpClient.get<TeamDTO[]>(this.baseUrl);
      return TeamMapper.toDomainList(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[TeamRepository] Error fetching teams:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });
        throw new Error(`Failed to fetch teams: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get a team by its ID
   * @param id - Team UUID
   * @returns Promise with the team or null if not found
   */
  async getById(id: string): Promise<Team | null> {
    try {
      const response = await this.httpClient.get<TeamDTO>(
        `${this.baseUrl}/${id}`
      );
      return TeamMapper.toDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        // Return null for 404 errors (team not found)
        if (error.status === 404) {
          return null;
        }

        console.error("[TeamRepository] Error fetching team by id:", {
          id,
          status: error.status,
          message: error.message,
          response: error.response,
        });
        throw new Error(`Failed to fetch team ${id}: ${error.message}`);
      }
      throw error;
    }
  }
}
