import type { League } from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Transfer Admin Use Case
 * Business logic for transferring admin role to another member (admin only)
 */
export class TransferAdminUseCase {
  constructor(private readonly repository: LeagueRepository) {}

  /**
   * Transfer admin role to another member
   * Only the current admin can transfer the role
   * New admin must be a league member
   * @param id League UUID
   * @param newAdminUserId User UUID of the new admin
   * @returns Updated league
   */
  async execute(id: string, newAdminUserId: string): Promise<League> {
    // Business validation
    if (!id || id.trim() === "") {
      throw new Error("League ID is required");
    }

    if (!newAdminUserId || newAdminUserId.trim() === "") {
      throw new Error("New admin user ID is required");
    }

    // Delegate to repository
    return await this.repository.transferAdmin(id, newAdminUserId);
  }
}
