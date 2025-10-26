import type { Player, PlayerPosition } from "@/domain/entities/player";
import type { PlayerDTO } from "@/infrastructure/http/dtos/player-dto";

/**
 * Player Mapper
 * Transforms data between DTO (API format) and Domain Entity (business format)
 *
 * Responsibilities:
 * - Transform API structure to domain structure
 * - Convert date strings to Date objects
 * - Ensure type safety for player positions
 */
export class PlayerMapper {
  /**
   * Transform DTO to Domain Entity
   * Converts API response format to domain model
   *
   * @param dto - Player data from API
   * @returns Domain Player entity
   */
  static toDomain(dto: PlayerDTO): Player {
    return {
      id: dto.id,
      name: dto.name,
      teamId: dto.teamId,
      position: dto.position as PlayerPosition,
      jerseyNumber: dto.jerseyNumber,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }

  /**
   * Transform array of DTOs to Domain Entities
   *
   * @param dtos - Array of player DTOs
   * @returns Array of domain Player entities
   */
  static toDomainList(dtos: PlayerDTO[]): Player[] {
    return dtos.map((dto) => this.toDomain(dto));
  }

  /**
   * Transform Domain Entity to DTO
   * Converts domain model to API request format
   *
   * @param domain - Domain Player entity
   * @returns Player DTO for API
   */
  static toDTO(domain: Player): PlayerDTO {
    return {
      id: domain.id,
      name: domain.name,
      teamId: domain.teamId,
      position: domain.position,
      jerseyNumber: domain.jerseyNumber,
      createdAt: domain.createdAt.toISOString(),
      updatedAt: domain.updatedAt.toISOString(),
    };
  }
}
