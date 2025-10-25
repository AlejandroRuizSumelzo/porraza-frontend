import type { League } from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Use Case: Get all leagues (public and private)
 *
 * Business Rules:
 * - Returns all leagues visible to the current user
 * - Includes both public and private leagues
 */
export class GetAllLeaguesUseCase {
  constructor(private repository: LeagueRepository) {}

  async execute(): Promise<League[]> {
    return await this.repository.getAll();
  }
}
