import type { League } from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Get League by Invite Code Use Case
 * Business logic for retrieving a league using its unique code
 * Useful for discovering and sharing leagues (both public and private)
 */
export class GetLeagueByInviteCodeUseCase {
  constructor(private readonly repository: LeagueRepository) {}

  /**
   * Get a league by its unique code
   * @param code 6-20 character alphanumeric code (case-insensitive)
   * @returns League or null if not found
   * @throws Error if code format is invalid
   */
  async execute(code: string): Promise<League | null> {
    // Business validation
    if (!code || code.trim() === "") {
      throw new Error("League code is required");
    }

    const trimmedCode = code.trim().toUpperCase();

    // Validate code format (6-20 alphanumeric characters)
    if (trimmedCode.length < 6 || trimmedCode.length > 20) {
      throw new Error("League code must be between 6 and 20 characters");
    }

    // Alphanumeric validation
    if (!/^[A-Z0-9]+$/.test(trimmedCode)) {
      throw new Error(
        "League code must contain only uppercase letters and numbers"
      );
    }

    // Delegate to repository
    return await this.repository.getByInviteCode(trimmedCode);
  }
}
