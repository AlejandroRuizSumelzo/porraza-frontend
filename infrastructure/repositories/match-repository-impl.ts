import type { MatchCalendar } from "@/domain/entities/match-calendar";
import type { MatchRepository } from "@/domain/repositories/match-repository";
import type { HttpClient } from "@/infrastructure/http/client";
import type { MatchCalendarDTO } from "@/infrastructure/http/dtos/match-calendar-dto";
import { MatchCalendarMapper } from "@/infrastructure/mappers/match-calendar-mapper";
import { HttpError } from "@/infrastructure/http/client";

/**
 * Match Repository Implementation
 * Implements the MatchRepository interface from domain layer
 * Handles all HTTP communication with the matches API
 */
export class MatchRepositoryImpl implements MatchRepository {
  private readonly baseUrl = "/matches";

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get the complete match calendar
   * Returns all matches grouped by tournament phase
   * @returns Promise with the complete match calendar
   */
  async getCalendar(): Promise<MatchCalendar> {
    try {
      const response = await this.httpClient.get<MatchCalendarDTO>(
        `${this.baseUrl}/calendar`
      );
      return MatchCalendarMapper.toDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[MatchRepository] Error fetching calendar:", {
          status: error.status,
          message: error.message,
          response: error.response,
        });
        throw new Error(`Failed to fetch match calendar: ${error.message}`);
      }
      throw error;
    }
  }
}
