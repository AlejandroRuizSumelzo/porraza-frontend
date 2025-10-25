import type { LeagueMember } from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Get League Members Use Case
 * Business logic for retrieving all members of a league
 */
export class GetLeagueMembersUseCase {
  constructor(private readonly repository: LeagueRepository) {}

  /**
   * Get all members of a league
   * Members are ordered by join date (oldest first)
   * @param id League UUID
   * @returns List of league members
   */
  async execute(id: string): Promise<LeagueMember[]> {
    // Business validation
    if (!id || id.trim() === "") {
      throw new Error("League ID is required");
    }

    // Delegate to repository
    return await this.repository.getMembers(id);
  }
}
