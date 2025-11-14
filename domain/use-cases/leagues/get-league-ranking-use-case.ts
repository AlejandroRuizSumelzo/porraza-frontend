import type { LeagueRanking } from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Get League Ranking Use Case
 * Business logic for retrieving the ranking/leaderboard of a league
 */
export class GetLeagueRankingUseCase {
  constructor(private readonly repository: LeagueRepository) {}

  /**
   * Get league ranking/leaderboard
   * Retrieve the real-time ranking of all members in a league ordered by points.
   * Includes all members (even those without predictions).
   * Tie-breaking criteria: 1) Total points (DESC), 2) Last points calculation (DESC), 3) Join date (ASC)
   * @param id League UUID
   * @returns League ranking with all members ordered by points
   */
  async execute(id: string): Promise<LeagueRanking> {
    // Business validation
    if (!id || id.trim() === "") {
      throw new Error("League ID is required");
    }

    // Delegate to repository
    return await this.repository.getLeagueRanking(id);
  }
}
