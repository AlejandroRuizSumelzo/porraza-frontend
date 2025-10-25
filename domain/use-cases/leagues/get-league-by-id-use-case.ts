import type { League } from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Use Case: Get detailed information about a specific league
 *
 * Business Rules:
 * - Returns league details by ID
 * - Returns null if league not found
 * - ID must be a valid UUID
 */
export class GetLeagueByIdUseCase {
  constructor(private repository: LeagueRepository) {}

  async execute(id: string): Promise<League | null> {
    // Business validation
    if (!id || id.trim().length === 0) {
      throw new Error("League ID is required");
    }

    // UUID validation (basic check)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new Error("Invalid League ID format");
    }

    return await this.repository.getById(id);
  }
}
