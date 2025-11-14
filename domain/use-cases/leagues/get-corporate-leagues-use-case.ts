import type { League } from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Use Case: Get only public corporate leagues
 *
 * Business Rules:
 * - Returns only public leagues with category "corporate"
 * - These leagues may require specific email domains to join
 */
export class GetCorporateLeaguesUseCase {
  constructor(private repository: LeagueRepository) {}

  async execute(): Promise<League[]> {
    return await this.repository.getCorporate();
  }
}
