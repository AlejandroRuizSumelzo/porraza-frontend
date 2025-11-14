import type { User } from "@/domain/entities/user";
import type {
  UserDTO,
  UpdateUserRequestDTO,
  UpdateUserResponseDTO,
} from "@/infrastructure/http/dtos/user-dto";

/**
 * User Mapper
 * Transforms data between DTO (API format) and Domain Entity (business format)
 *
 * Responsibilities:
 * - Transform user data from API to domain (excluding unnecessary fields)
 * - Transform update requests from domain to DTO
 * - Transform update responses from DTO to domain
 */
export class UserMapper {
  /**
   * Transform User DTO to Domain Entity
   * Excludes createdAt, updatedAt, and paymentDate as they're not needed in frontend
   *
   * @param dto - User data from API
   * @returns Domain User entity
   */
  static toDomain(dto: UserDTO): User {
    return {
      id: dto.id,
      email: dto.email,
      name: dto.name,
      isActive: dto.isActive,
      isEmailVerified: dto.isEmailVerified,
      lastLoginAt: dto.lastLoginAt,
      hasPaid: dto.hasPaid,
      stripeCustomerId: dto.stripeCustomerId,
      profilePictureUrl: dto.profilePictureUrl,
    };
  }

  /**
   * Transform Domain User to DTO
   * Adds back createdAt, updatedAt, and paymentDate for API requests (if needed)
   *
   * @param domain - Domain User entity
   * @returns User DTO for API
   */
  static toDTO(domain: User): UserDTO {
    return {
      id: domain.id,
      email: domain.email,
      name: domain.name,
      isActive: domain.isActive,
      isEmailVerified: domain.isEmailVerified,
      lastLoginAt: domain.lastLoginAt,
      hasPaid: domain.hasPaid,
      stripeCustomerId: domain.stripeCustomerId,
      profilePictureUrl: domain.profilePictureUrl,
      createdAt: "", // Not needed for requests
      updatedAt: "", // Not needed for requests
      paymentDate: null, // Not needed for requests
    };
  }

  /**
   * Transform partial user update data to DTO
   * Only includes fields that are actually provided
   *
   * @param data - Partial user data to update
   * @returns Update request DTO for API
   */
  static updateToDTO(data: Partial<User>): UpdateUserRequestDTO {
    const dto: UpdateUserRequestDTO = {};

    if (data.name !== undefined) {
      dto.name = data.name;
    }

    if (data.email !== undefined) {
      dto.email = data.email;
    }

    if (data.isActive !== undefined) {
      dto.isActive = data.isActive;
    }

    return dto;
  }

  /**
   * Transform Update User Response DTO to Domain Entity
   *
   * @param dto - Update response from API
   * @returns Domain User entity
   */
  static updateResponseToDomain(dto: UpdateUserResponseDTO): User {
    return this.toDomain(dto);
  }
}
