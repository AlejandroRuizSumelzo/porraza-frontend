import type { MatchCalendar } from "@/domain/entities/match-calendar";
import type { MatchRepository } from "@/domain/repositories/match-repository";

/**
 * Get Match Calendar Use Case
 * Business logic for retrieving the complete match calendar
 */
export class GetMatchCalendarUseCase {
  constructor(private readonly repository: MatchRepository) {}

  /**
   * Execute the use case
   * @returns Promise with the complete match calendar
   */
  async execute(): Promise<MatchCalendar> {
    const calendar = await this.repository.getCalendar();

    // Business logic: could add sorting, filtering, validation here
    // For example: ensure matches are sorted by date within each phase
    return calendar;
  }
}
