import type {
  League,
  LeagueCategory,
  LeagueVisibility,
} from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Parameters for creating a new league
 */
export interface CreateLeagueParams {
  name: string;
  description?: string;
  visibility: LeagueVisibility;
  category: LeagueCategory;
  code?: string;
  requiredEmailDomain?: string;
}

/**
 * Use Case: Create a new league
 *
 * Business Rules:
 * - League name must be between 3 and 100 characters
 * - Visibility must be either 'public' or 'private'
 * - Category must be one of: 'general', 'corporate', 'friends', 'community'
 * - Code (if provided) must be 6-20 uppercase alphanumeric characters
 * - requiredEmailDomain is required for corporate leagues
 * - Requires payment and email verification (handled by backend)
 * - Admin is automatically added as first member
 * - Invite code is generated automatically if not provided
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

    if (params.visibility !== "public" && params.visibility !== "private") {
      throw new Error('League visibility must be either "public" or "private"');
    }

    const validCategories: LeagueCategory[] = [
      "general",
      "corporate",
      "friends",
      "community",
    ];
    if (!validCategories.includes(params.category)) {
      throw new Error(
        `League category must be one of: ${validCategories.join(", ")}`
      );
    }

    // Validate custom code if provided
    if (params.code) {
      const codePattern = /^[A-Z0-9]{6,20}$/;
      if (!codePattern.test(params.code)) {
        throw new Error(
          "Custom league code must be 6-20 uppercase alphanumeric characters"
        );
      }
    }

    // Validate corporate leagues
    if (params.category === "corporate") {
      if (!params.requiredEmailDomain) {
        throw new Error("Required email domain is mandatory for corporate leagues");
      }
      // Validate email domain format (must start with @)
      if (!params.requiredEmailDomain.startsWith("@")) {
        throw new Error("Required email domain must start with @");
      }
    }

    // Delegate to repository
    return await this.repository.create({
      name: params.name.trim(),
      description: params.description?.trim(),
      visibility: params.visibility,
      category: params.category,
      code: params.code,
      requiredEmailDomain: params.requiredEmailDomain,
    });
  }
}
