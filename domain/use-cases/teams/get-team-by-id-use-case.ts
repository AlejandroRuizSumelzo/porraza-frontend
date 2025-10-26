import { Team } from "@/domain/entities/team";
import { TeamRepository } from "@/domain/repositories/team-repository";

/**
 * GetTeamByIdUseCase
 * Use case for retrieving a specific team by its ID
 */
export class GetTeamByIdUseCase {
  constructor(private readonly teamRepository: TeamRepository) {}

  /**
   * Execute the use case
   * @param id - Team UUID
   * @returns Promise with the team or null if not found
   */
  async execute(id: string): Promise<Team | null> {
    if (!id || id.trim() === "") {
      throw new Error("Team ID is required");
    }

    return await this.teamRepository.getById(id);
  }
}
