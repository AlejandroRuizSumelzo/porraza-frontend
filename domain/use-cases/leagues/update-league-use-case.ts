import type {
  League,
  LeagueCategory,
  LeagueVisibility,
} from "@/domain/entities/league";
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
      visibility?: LeagueVisibility;
      category?: LeagueCategory;
      requiredEmailDomain?: string;
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

    // Validate visibility if provided
    if (data.visibility !== undefined) {
      if (data.visibility !== "public" && data.visibility !== "private") {
        throw new Error('League visibility must be either "public" or "private"');
      }
    }

    // Validate category if provided
    if (data.category !== undefined) {
      const validCategories: LeagueCategory[] = [
        "general",
        "corporate",
        "friends",
        "community",
      ];
      if (!validCategories.includes(data.category)) {
        throw new Error(
          `League category must be one of: ${validCategories.join(", ")}`
        );
      }
    }

    // Validate requiredEmailDomain if provided
    if (data.requiredEmailDomain !== undefined) {
      if (data.requiredEmailDomain && !data.requiredEmailDomain.startsWith("@")) {
        throw new Error("Required email domain must start with @");
      }
    }

    // Delegate to repository
    return await this.repository.update(id, data);
  }
}
