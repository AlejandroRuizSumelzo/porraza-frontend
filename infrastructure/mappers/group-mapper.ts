import type { Group } from "@/domain/entities/group";
import type { GroupDTO } from "@/infrastructure/http/dtos/group-dto";

/**
 * Group Mapper
 * Transforms data between DTO (API format) and Domain Entity (business format)
 */
export class GroupMapper {
  /**
   * Transform DTO to Domain Entity
   * Converts API response format to domain model
   *
   * @param dto - Group data from API
   * @returns Domain Group entity
   */
  static toDomain(dto: GroupDTO): Group {
    return {
      id: dto.id,
      name: dto.name,
    };
  }

  /**
   * Transform array of DTOs to Domain Entities
   *
   * @param dtos - Array of group DTOs
   * @returns Array of domain Group entities
   */
  static toDomainList(dtos: GroupDTO[]): Group[] {
    return dtos.map((dto) => this.toDomain(dto));
  }

  /**
   * Transform Domain Entity to DTO
   * Converts domain model to API request format
   *
   * @param domain - Domain Group entity
   * @returns Group DTO for API
   */
  static toDTO(domain: Group): GroupDTO {
    return {
      id: domain.id,
      name: domain.name,
    };
  }
}
