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
   * Private leagues require a valid league code
   * Requires payment and email verification
   * @param id League UUID
   * @param code Optional league code for private leagues (6-20 alphanumeric characters)
   * @returns Updated league
   */
  async execute(id: string, code?: string): Promise<League> {
    // Business validation
    if (!id || id.trim() === "") {
      throw new Error("League ID is required");
    }

    // Validate code format if provided
    if (code !== undefined) {
      const trimmedCode = code.trim();

      if (trimmedCode.length < 6 || trimmedCode.length > 20) {
        throw new Error("League code must be between 6 and 20 characters");
      }

      // Alphanumeric validation
      if (!/^[A-Z0-9]+$/.test(trimmedCode.toUpperCase())) {
        throw new Error(
          "League code must contain only uppercase letters and numbers"
        );
      }
    }

    // Delegate to repository
    return await this.repository.join(id, code);
  }
}
