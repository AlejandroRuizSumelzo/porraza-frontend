import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Delete League Use Case
 * Business logic for permanently deleting a league (admin only)
 */
export class DeleteLeagueUseCase {
  constructor(private readonly repository: LeagueRepository) {}

  /**
   * Delete a league permanently
   * Only the admin can delete a league
   * All members and predictions will be deleted
   * @param id League UUID
   */
  async execute(id: string): Promise<void> {
    // Business validation
    if (!id || id.trim() === "") {
      throw new Error("League ID is required");
    }

    // Delegate to repository
    await this.repository.delete(id);
  }
}
