import type { Match, Score } from "@/domain/entities/match";
import type { MatchDTO, ScoreDTO } from "@/infrastructure/http/dtos/match-dto";
import { TeamMapper } from "./team-mapper";
import { StadiumMapper } from "./stadium-mapper";

/**
 * Match Mapper
 * Transforms data between DTO (API format) and Domain Entity (business format)
 *
 * Responsibilities:
 * - Transform API structure to domain structure
 * - Handle nested entities (Team, Stadium)
 * - Handle null/undefined values for scores
 */
export class MatchMapper {
  /**
   * Transform Score DTO to Domain Score
   *
   * @param dto - Score data from API
   * @returns Domain Score entity or null
   */
  private static scoreToDomain(dto: ScoreDTO | null): Score | null {
    if (!dto) return null;
    return {
      home: dto.home,
      away: dto.away,
    };
  }

  /**
   * Transform DTO to Domain Entity
   * Converts API response format to domain model
   *
   * @param dto - Match data from API
   * @returns Domain Match entity
   */
  static toDomain(dto: MatchDTO): Match {
    return {
      id: dto.id,
      matchNumber: dto.matchNumber,
      phase: dto.phase,
      group: dto.group,
      date: dto.date,
      time: dto.time,
      status: dto.status,
      homeTeam: TeamMapper.toDomain(dto.homeTeam),
      awayTeam: TeamMapper.toDomain(dto.awayTeam),
      stadium: StadiumMapper.toDomain(dto.stadium),
      score: this.scoreToDomain(dto.score),
      scoreEt: this.scoreToDomain(dto.scoreEt),
      penalties: this.scoreToDomain(dto.penalties),
    };
  }

  /**
   * Transform array of DTOs to Domain Entities
   *
   * @param dtos - Array of match DTOs
   * @returns Array of domain Match entities
   */
  static toDomainList(dtos: MatchDTO[]): Match[] {
    return dtos.map((dto) => this.toDomain(dto));
  }

  /**
   * Transform Domain Score to DTO
   *
   * @param domain - Domain Score entity
   * @returns Score DTO or null
   */
  private static scoreToDTO(domain: Score | null): ScoreDTO | null {
    if (!domain) return null;
    return {
      home: domain.home,
      away: domain.away,
    };
  }

  /**
   * Transform Domain Entity to DTO
   * Converts domain model to API request format
   *
   * @param domain - Domain Match entity
   * @returns Match DTO for API
   */
  static toDTO(domain: Match): MatchDTO {
    return {
      id: domain.id,
      matchNumber: domain.matchNumber,
      phase: domain.phase,
      group: domain.group,
      date: domain.date,
      time: domain.time,
      status: domain.status,
      homeTeam: TeamMapper.toDTO(domain.homeTeam),
      awayTeam: TeamMapper.toDTO(domain.awayTeam),
      stadium: StadiumMapper.toDTO(domain.stadium),
      score: this.scoreToDTO(domain.score),
      scoreEt: this.scoreToDTO(domain.scoreEt),
      penalties: this.scoreToDTO(domain.penalties),
    };
  }
}
