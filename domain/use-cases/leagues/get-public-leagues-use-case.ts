import type { League } from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Use Case: Get only public leagues
 *
 * Business Rules:
 * - Returns only public leagues
 * - These leagues are available to join without invite code
 */
export class GetPublicLeaguesUseCase {
  constructor(private repository: LeagueRepository) {}

  async execute(): Promise<League[]> {
    return await this.repository.getPublic();
  }
}
