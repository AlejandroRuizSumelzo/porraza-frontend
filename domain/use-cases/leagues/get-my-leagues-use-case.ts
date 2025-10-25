import type { League } from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Use Case: Get leagues where current user is a member
 *
 * Business Rules:
 * - Returns only leagues where the current user is a member
 * - Includes both public and private leagues
 */
export class GetMyLeaguesUseCase {
  constructor(private repository: LeagueRepository) {}

  async execute(): Promise<League[]> {
    return await this.repository.getMy();
  }
}
