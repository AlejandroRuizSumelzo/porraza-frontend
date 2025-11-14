import type { League, LeagueCategory } from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Use Case: Get public leagues filtered by category
 *
 * Business Rules:
 * - Returns only public leagues in the specified category
 * - Category must be one of: general, corporate, friends, community
 */
export class GetLeaguesByCategoryUseCase {
  constructor(private repository: LeagueRepository) {}

  async execute(category: LeagueCategory): Promise<League[]> {
    // Business validation
    const validCategories: LeagueCategory[] = [
      "general",
      "corporate",
      "friends",
      "community",
    ];

    if (!validCategories.includes(category)) {
      throw new Error(
        `Invalid category. Must be one of: ${validCategories.join(", ")}`
      );
    }

    return await this.repository.getByCategory(category);
  }
}
