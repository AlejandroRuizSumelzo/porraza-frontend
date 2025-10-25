import type { League } from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Join League Use Case
 * Business logic for joining a league (public or private)
 */
export class JoinLeagueUseCase {
  constructor(private readonly repository: LeagueRepository) {}

  /**
   * Join a league
   * Public leagues can be joined directly
   * Private leagues require a valid invite code
   * Requires payment and email verification
   * @param id League UUID
   * @param inviteCode Optional invite code for private leagues (8 alphanumeric characters)
   * @returns Updated league
   */
  async execute(id: string, inviteCode?: string): Promise<League> {
    // Business validation
    if (!id || id.trim() === "") {
      throw new Error("League ID is required");
    }

    // Validate invite code format if provided
    if (inviteCode !== undefined) {
      const trimmedCode = inviteCode.trim();

      if (trimmedCode.length !== 8) {
        throw new Error("Invite code must be exactly 8 characters");
      }

      // Alphanumeric validation
      if (!/^[A-Z0-9]{8}$/.test(trimmedCode)) {
        throw new Error(
          "Invite code must contain only uppercase letters and numbers"
        );
      }
    }

    // Delegate to repository
    return await this.repository.join(id, inviteCode);
  }
}
