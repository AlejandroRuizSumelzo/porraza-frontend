import type {
  MatchCalendar,
  PhaseMatches,
} from "@/domain/entities/match-calendar";
import type {
  MatchCalendarDTO,
  PhaseMatchesDTO,
} from "@/infrastructure/http/dtos/match-calendar-dto";
import { MatchMapper } from "@/infrastructure/mappers/match-mapper";

/**
 * Match Calendar Mapper
 * Transforms data between DTO (API format) and Domain Entity (business format)
 *
 * Responsibilities:
 * - Transform calendar structure from API to domain
 * - Handle nested match entities
 * - Preserve phase grouping
 */
export class MatchCalendarMapper {
  /**
   * Transform Phase Matches DTO to Domain
   *
   * @param dto - Phase matches data from API
   * @returns Domain PhaseMatches entity
   */
  private static phaseMatchesToDomain(dto: PhaseMatchesDTO): PhaseMatches {
    return {
      phase: dto.phase,
      matches: MatchMapper.toDomainList(dto.matches),
    };
  }

  /**
   * Transform DTO to Domain Entity
   * Converts API response format to domain model
   *
   * @param dto - Calendar data from API
   * @returns Domain MatchCalendar entity
   */
  static toDomain(dto: MatchCalendarDTO): MatchCalendar {
    return {
      total: dto.total,
      calendar: dto.calendar.map((phase) => this.phaseMatchesToDomain(phase)),
    };
  }

  /**
   * Transform Domain PhaseMatches to DTO
   *
   * @param domain - Domain PhaseMatches entity
   * @returns Phase matches DTO
   */
  private static phaseMatchesToDTO(domain: PhaseMatches): PhaseMatchesDTO {
    return {
      phase: domain.phase,
      matches: domain.matches.map((match) => MatchMapper.toDTO(match)),
    };
  }

  /**
   * Transform Domain Entity to DTO
   * Converts domain model to API request format
   *
   * @param domain - Domain MatchCalendar entity
   * @returns Calendar DTO for API
   */
  static toDTO(domain: MatchCalendar): MatchCalendarDTO {
    return {
      total: domain.total,
      calendar: domain.calendar.map((phase) => this.phaseMatchesToDTO(phase)),
    };
  }
}
