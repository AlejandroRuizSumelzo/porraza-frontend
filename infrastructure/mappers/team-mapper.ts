import type { Team } from "@/domain/entities/team";
import type { TeamDTO } from "@/infrastructure/http/dtos/team-dto";

/**
 * Team Mapper
 * Transforms data between DTO (API format) and Domain Entity (business format)
 *
 * Responsibilities:
 * - Transform API structure to domain structure
 * - Handle null/undefined values
 */
export class TeamMapper {
  /**
   * Transform DTO to Domain Entity
   * Converts API response format to domain model
   *
   * @param dto - Team data from API
   * @returns Domain Team entity
   */
  static toDomain(dto: TeamDTO): Team {
    return {
      id: dto.id,
      name: dto.name,
      fifaCode: dto.fifaCode,
      confederation: dto.confederation,
      isHost: dto.isHost,
      placeholder: dto.placeholder,
    };
  }

  /**
   * Transform array of DTOs to Domain Entities
   *
   * @param dtos - Array of team DTOs
   * @returns Array of domain Team entities
   */
  static toDomainList(dtos: TeamDTO[]): Team[] {
    return dtos.map((dto) => this.toDomain(dto));
  }

  /**
   * Transform Domain Entity to DTO
   * Converts domain model to API request format
   *
   * @param domain - Domain Team entity
   * @returns Team DTO for API
   */
  static toDTO(domain: Team): TeamDTO {
    return {
      id: domain.id,
      name: domain.name,
      fifaCode: domain.fifaCode,
      confederation: domain.confederation,
      isHost: domain.isHost,
      placeholder: domain.placeholder,
    };
  }
}
