import { Player } from "@/domain/entities/player";
import { PlayerRepository } from "@/domain/repositories/player-repository";

/**
 * GetAllGoalkeepersUseCase
 * Use case for retrieving all goalkeepers from all teams
 * Used for Golden Glove award selection
 */
export class GetAllGoalkeepersUseCase {
  constructor(private readonly playerRepository: PlayerRepository) {}

  /**
   * Execute the use case
   * @returns Promise with array of all goalkeepers
   */
  async execute(): Promise<Player[]> {
    return await this.playerRepository.getAllGoalkeepers();
  }
}
