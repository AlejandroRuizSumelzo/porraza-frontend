import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Leave League Use Case
 * Business logic for leaving a league
 */
export class LeaveLeagueUseCase {
  constructor(private readonly repository: LeagueRepository) {}

  /**
   * Leave a league
   * If admin leaves and there are other members, admin role is transferred to oldest member
   * If admin is the only member, league is deleted
   * @param id League UUID
   */
  async execute(id: string): Promise<void> {
    // Business validation
    if (!id || id.trim() === "") {
      throw new Error("League ID is required");
    }

    // Delegate to repository
    await this.repository.leave(id);
  }
}
