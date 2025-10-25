import type { League, LeagueMember } from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";
import type { HttpClient } from "@/infrastructure/http/client";
import { HttpError } from "@/infrastructure/http/client";
import {
  LeagueMapper,
  type LeagueDTO,
  type LeagueMemberDTO,
} from "@/infrastructure/mappers/league-mapper";

/**
 * League Repository Implementation
 * Implements the LeagueRepository interface from domain layer
 * Handles all HTTP communication with the leagues API
 */
export class LeagueRepositoryImpl implements LeagueRepository {
  private readonly baseUrl = "/leagues";

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Create a new league (public or private)
   * Requires payment and email verification (handled by backend)
   */
  async create(data: {
    name: string;
    description?: string;
    type: "public" | "private";
  }): Promise<League> {
    try {
      const dto = LeagueMapper.toCreateDTO(data);
      const response = await this.httpClient.post<LeagueDTO>(this.baseUrl, dto);
      return LeagueMapper.toDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[LeagueRepository] Error creating league:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });

        // Handle specific error cases
        if (error.status === 403) {
          throw new Error(
            "Payment or email verification required to create a league"
          );
        }

        throw new Error(`Failed to create league: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get all leagues (public and private)
   */
  async getAll(): Promise<League[]> {
    try {
      const response = await this.httpClient.get<LeagueDTO[]>(this.baseUrl);
      return response.data.map(LeagueMapper.toDomain);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[LeagueRepository] Error fetching all leagues:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });
        throw new Error(`Failed to fetch leagues: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get only public leagues
   */
  async getPublic(): Promise<League[]> {
    try {
      const response = await this.httpClient.get<LeagueDTO[]>(
        `${this.baseUrl}/public`
      );
      return response.data.map(LeagueMapper.toDomain);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[LeagueRepository] Error fetching public leagues:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });
        throw new Error(`Failed to fetch public leagues: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get leagues where the current user is a member
   */
  async getMy(): Promise<League[]> {
    try {
      const response = await this.httpClient.get<LeagueDTO[]>(
        `${this.baseUrl}/my`
      );
      return response.data.map(LeagueMapper.toDomain);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[LeagueRepository] Error fetching my leagues:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });
        throw new Error(`Failed to fetch your leagues: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get a specific league by ID
   */
  async getById(id: string): Promise<League | null> {
    try {
      const response = await this.httpClient.get<LeagueDTO>(
        `${this.baseUrl}/${id}`
      );
      return LeagueMapper.toDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        // Return null if league not found
        if (error.status === 404) {
          return null;
        }

        console.error("[LeagueRepository] Error fetching league by ID:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });
        throw new Error(`Failed to fetch league: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get a league by its unique code
   * Useful for discovering and sharing leagues (both public and private)
   */
  async getByInviteCode(code: string): Promise<League | null> {
    try {
      const response = await this.httpClient.get<LeagueDTO>(
        `${this.baseUrl}/find/${code}`
      );
      return LeagueMapper.toDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        // Return null if league not found
        if (error.status === 404) {
          return null;
        }

        console.error(
          "[LeagueRepository] Error fetching league by code:",
          {
            status: error.status,
            message: error.message,
            response: error.response,
          }
        );
        throw new Error(`Failed to fetch league by code: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Update league information (admin only)
   */
  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
      type?: "public" | "private";
    }
  ): Promise<League> {
    try {
      const dto = LeagueMapper.toUpdateDTO(data);
      const response = await this.httpClient.patch<LeagueDTO>(
        `${this.baseUrl}/${id}`,
        dto
      );
      return LeagueMapper.toDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[LeagueRepository] Error updating league:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });

        if (error.status === 403) {
          throw new Error("Only the admin can update league information");
        }

        if (error.status === 404) {
          throw new Error("League not found");
        }

        throw new Error(`Failed to update league: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Delete a league permanently (admin only)
   */
  async delete(id: string): Promise<void> {
    try {
      await this.httpClient.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[LeagueRepository] Error deleting league:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });

        if (error.status === 403) {
          throw new Error("Only the admin can delete the league");
        }

        if (error.status === 404) {
          throw new Error("League not found");
        }

        throw new Error(`Failed to delete league: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Join a league (public or private with code)
   */
  async join(id: string, code?: string): Promise<League> {
    try {
      const dto = LeagueMapper.toJoinDTO(code);
      const response = await this.httpClient.post<LeagueDTO>(
        `${this.baseUrl}/${id}/join`,
        dto
      );
      return LeagueMapper.toDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[LeagueRepository] Error joining league:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });

        if (error.status === 400) {
          throw new Error("Invalid league code or league is full");
        }

        if (error.status === 403) {
          throw new Error("Payment or email verification required to join");
        }

        if (error.status === 404) {
          throw new Error("League not found");
        }

        if (error.status === 409) {
          throw new Error("You are already a member of this league");
        }

        throw new Error(`Failed to join league: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Leave a league
   */
  async leave(id: string): Promise<void> {
    try {
      await this.httpClient.delete(`${this.baseUrl}/${id}/leave`);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[LeagueRepository] Error leaving league:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });

        if (error.status === 400) {
          throw new Error("You are not a member of this league");
        }

        if (error.status === 404) {
          throw new Error("League not found");
        }

        throw new Error(`Failed to leave league: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get all members of a league
   */
  async getMembers(id: string): Promise<LeagueMember[]> {
    try {
      const response = await this.httpClient.get<LeagueMemberDTO[]>(
        `${this.baseUrl}/${id}/members`
      );
      return response.data.map(LeagueMapper.toMemberDomain);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[LeagueRepository] Error fetching league members:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });

        if (error.status === 404) {
          throw new Error("League not found");
        }

        throw new Error(`Failed to fetch league members: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Remove a member from a league (admin only)
   */
  async removeMember(leagueId: string, userId: string): Promise<void> {
    try {
      await this.httpClient.delete(
        `${this.baseUrl}/${leagueId}/members/${userId}`
      );
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[LeagueRepository] Error removing member:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });

        if (error.status === 400) {
          throw new Error("Cannot remove admin or user is not a member");
        }

        if (error.status === 403) {
          throw new Error("Only the admin can remove members");
        }

        if (error.status === 404) {
          throw new Error("League not found");
        }

        throw new Error(`Failed to remove member: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Transfer admin role to another member (admin only)
   */
  async transferAdmin(id: string, newAdminUserId: string): Promise<League> {
    try {
      const dto = LeagueMapper.toTransferAdminDTO(newAdminUserId);
      const response = await this.httpClient.patch<LeagueDTO>(
        `${this.baseUrl}/${id}/transfer-admin`,
        dto
      );
      return LeagueMapper.toDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[LeagueRepository] Error transferring admin:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });

        if (error.status === 400) {
          throw new Error("New admin is not a member or is already the admin");
        }

        if (error.status === 403) {
          throw new Error("Only the admin can transfer admin role");
        }

        if (error.status === 404) {
          throw new Error("League not found");
        }

        throw new Error(`Failed to transfer admin: ${error.message}`);
      }
      throw error;
    }
  }
}
