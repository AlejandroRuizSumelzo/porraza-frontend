import { Player } from "@/domain/entities/player";
import { PlayerRepository } from "@/domain/repositories/player-repository";

/**
 * GetPlayersByTeamUseCase
 * Use case for retrieving all players from a specific team
 */
export class GetPlayersByTeamUseCase {
  constructor(private readonly playerRepository: PlayerRepository) {}

  /**
   * Execute the use case
   * @param teamId - Team UUID
   * @returns Promise with array of 23 players from the team
   */
  async execute(teamId: string): Promise<Player[]> {
    if (!teamId || teamId.trim() === "") {
      throw new Error("Team ID is required");
    }

    return await this.playerRepository.getByTeam(teamId);
  }
}
