import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Remove Member Use Case
 * Business logic for removing a member from a league (admin only)
 */
export class RemoveMemberUseCase {
  constructor(private readonly repository: LeagueRepository) {}

  /**
   * Remove a member from a league
   * Only the admin can remove members
   * Admin cannot remove themselves
   * @param leagueId League UUID
   * @param userId User UUID to remove
   */
  async execute(leagueId: string, userId: string): Promise<void> {
    // Business validation
    if (!leagueId || leagueId.trim() === "") {
      throw new Error("League ID is required");
    }

    if (!userId || userId.trim() === "") {
      throw new Error("User ID is required");
    }

    // Delegate to repository
    await this.repository.removeMember(leagueId, userId);
  }
}
