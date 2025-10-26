import { Team } from "@/domain/entities/team";
import { TeamRepository } from "@/domain/repositories/team-repository";

/**
 * GetAllTeamsUseCase
 * Use case for retrieving all teams
 */
export class GetAllTeamsUseCase {
  constructor(private readonly teamRepository: TeamRepository) {}

  /**
   * Execute the use case
   * @returns Promise with array of all teams
   */
  async execute(): Promise<Team[]> {
    return await this.teamRepository.getAll();
  }
}
