import type { League } from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Update League Use Case
 * Business logic for updating league information (admin only)
 */
export class UpdateLeagueUseCase {
  constructor(private readonly repository: LeagueRepository) {}

  /**
   * Update league information
   * Only the admin can update league details
   * @param id League UUID
   * @param data Updated league data
   * @returns Updated league
   */
  async execute(
    id: string,
    data: {
      name?: string;
      description?: string;
      type?: "public" | "private";
    }
  ): Promise<League> {
    // Business validation
    if (!id || id.trim() === "") {
      throw new Error("League ID is required");
    }

    if (data.name !== undefined && data.name.trim().length < 3) {
      throw new Error("League name must be at least 3 characters");
    }

    if (data.name !== undefined && data.name.trim().length > 100) {
      throw new Error("League name must be at most 100 characters");
    }

    // Delegate to repository
    return await this.repository.update(id, data);
  }
}
