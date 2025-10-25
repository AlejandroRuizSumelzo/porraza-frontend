import type { League, LeagueMember } from "@/domain/entities/league";

/**
 * League Repository Interface
 * Defines the contract for league data access
 */
export interface LeagueRepository {
  /**
   * Create a new league (public or private)
   * Requires payment and email verification
   * @param data League data without id, dates, and computed fields
   * @returns Created league
   */
  create(data: {
    name: string;
    description?: string;
    type: "public" | "private";
  }): Promise<League>;

  /**
   * Get all leagues (public and private)
   * @returns List of all leagues
   */
  getAll(): Promise<League[]>;

  /**
   * Get only public leagues
   * @returns List of public leagues
   */
  getPublic(): Promise<League[]>;

  /**
   * Get leagues where the current user is a member
   * @returns List of user's leagues
   */
  getMy(): Promise<League[]>;

  /**
   * Get a specific league by ID
   * @param id League UUID
   * @returns League or null if not found
   */
  getById(id: string): Promise<League | null>;

  /**
   * Get a league by its unique code
   * Useful for discovering and sharing leagues (both public and private)
   * @param code 6-20 character alphanumeric code (case-insensitive)
   * @returns League or null if not found
   */
  getByInviteCode(code: string): Promise<League | null>;

  /**
   * Update league information (admin only)
   * @param id League UUID
   * @param data Updated league data
   * @returns Updated league
   */
  update(
    id: string,
    data: {
      name?: string;
      description?: string;
      type?: "public" | "private";
    }
  ): Promise<League>;

  /**
   * Delete a league permanently (admin only)
   * @param id League UUID
   */
  delete(id: string): Promise<void>;

  /**
   * Join a league (public or private with code)
   * @param id League UUID
   * @param code Optional league code for private leagues
   * @returns Updated league
   */
  join(id: string, code?: string): Promise<League>;

  /**
   * Leave a league
   * @param id League UUID
   */
  leave(id: string): Promise<void>;

  /**
   * Get all members of a league
   * @param id League UUID
   * @returns List of league members
   */
  getMembers(id: string): Promise<LeagueMember[]>;

  /**
   * Remove a member from a league (admin only)
   * @param leagueId League UUID
   * @param userId User UUID to remove
   */
  removeMember(leagueId: string, userId: string): Promise<void>;

  /**
   * Transfer admin role to another member (admin only)
   * @param id League UUID
   * @param newAdminUserId User UUID of the new admin
   */
  transferAdmin(id: string, newAdminUserId: string): Promise<League>;
}
