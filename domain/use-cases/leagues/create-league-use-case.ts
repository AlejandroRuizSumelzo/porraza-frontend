import type { League } from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Parameters for creating a new league
 */
export interface CreateLeagueParams {
  name: string;
  description?: string;
  type: "public" | "private";
}

/**
 * Use Case: Create a new league
 *
 * Business Rules:
 * - League name must be between 3 and 100 characters
 * - Type must be either 'public' or 'private'
 * - Requires payment and email verification (handled by backend)
 * - Admin is automatically added as first member
 * - Invite code is generated automatically for private leagues
 */
export class CreateLeagueUseCase {
  constructor(private repository: LeagueRepository) {}

  async execute(params: CreateLeagueParams): Promise<League> {
    // Business validation
    if (!params.name || params.name.trim().length < 3) {
      throw new Error("League name must be at least 3 characters");
    }

    if (params.name.length > 100) {
      throw new Error("League name must not exceed 100 characters");
    }

    if (params.type !== "public" && params.type !== "private") {
      throw new Error('League type must be either "public" or "private"');
    }

    // Delegate to repository
    return await this.repository.create({
      name: params.name.trim(),
      description: params.description?.trim(),
      type: params.type,
    });
  }
}
