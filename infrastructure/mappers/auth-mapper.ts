import type { User } from "@/domain/entities/user";
import type { AuthTokens } from "@/domain/entities/auth-tokens";
import type { AuthResponse } from "@/domain/entities/auth-response";
import type { RefreshTokenResponse } from "@/domain/entities/refresh-token-response";
import type { RegisterResponse } from "@/domain/entities/register-response";
import type {
  UserDTO,
  LoginResponseDTO,
  RefreshTokenResponseDTO,
  RegisterResponseDTO,
  ForgotPasswordResponseDTO,
  ResetPasswordResponseDTO,
} from "@/infrastructure/http/dtos/auth-dto";

/**
 * Auth Mapper
 * Transforms data between DTO (API format) and Domain Entity (business format)
 *
 * Responsibilities:
 * - Transform user data from API to domain (excluding unnecessary fields)
 * - Transform authentication tokens
 * - Combine tokens and user into AuthResponse
 */
export class AuthMapper {
  /**
   * Transform User DTO to Domain Entity
   * Excludes createdAt and updatedAt as they're not needed in frontend
   *
   * @param dto - User data from API
   * @returns Domain User entity
   */
  static userToDomain(dto: UserDTO): User {
    return {
      id: dto.id,
      email: dto.email,
      name: dto.name,
      isActive: dto.isActive,
      isEmailVerified: dto.isEmailVerified,
      lastLoginAt: dto.lastLoginAt,
      hasPaid: dto.hasPaid,
      stripeCustomerId: dto.stripeCustomerId,
    };
  }

  /**
   * Transform Login Response DTO to Domain AuthResponse
   * Separates tokens and user data into structured domain entities
   *
   * @param dto - Login response from API
   * @returns Domain AuthResponse entity
   */
  static loginResponseToDomain(dto: LoginResponseDTO): AuthResponse {
    const tokens: AuthTokens = {
      accessToken: dto.accessToken,
      refreshToken: dto.refreshToken,
      expiresIn: dto.expiresIn,
    };

    const user: User = this.userToDomain(dto.user);

    return {
      tokens,
      user,
    };
  }

  /**
   * Transform Refresh Token Response DTO to Domain
   *
   * @param dto - Refresh token response from API
   * @returns Domain RefreshTokenResponse entity
   */
  static refreshTokenResponseToDomain(
    dto: RefreshTokenResponseDTO
  ): RefreshTokenResponse {
    return {
      accessToken: dto.accessToken,
      expiresIn: dto.expiresIn,
    };
  }

  /**
   * Transform Register Response DTO to Domain RegisterResponse
   *
   * @param dto - Register response from API
   * @returns Domain RegisterResponse entity
   */
  static registerResponseToDomain(dto: RegisterResponseDTO): RegisterResponse {
    const user: User = this.userToDomain(dto.user);

    return {
      user,
      message: dto.message,
    };
  }

  /**
   * Transform Domain User to DTO
   * Adds back createdAt and updatedAt for API requests (if needed)
   *
   * @param domain - Domain User entity
   * @returns User DTO for API
   */
  static userToDTO(domain: User): UserDTO {
    return {
      id: domain.id,
      email: domain.email,
      name: domain.name,
      isActive: domain.isActive,
      isEmailVerified: domain.isEmailVerified,
      lastLoginAt: domain.lastLoginAt,
      hasPaid: domain.hasPaid,
      stripeCustomerId: domain.stripeCustomerId,
      createdAt: "", // Not needed for requests
      updatedAt: "", // Not needed for requests
    };
  }

  /**
   * Transform Forgot Password Response DTO to Domain
   * Simple pass-through since the response is just a message
   *
   * @param dto - Forgot password response from API
   * @returns Domain response object
   */
  static forgotPasswordResponseToDomain(
    dto: ForgotPasswordResponseDTO
  ): { message: string } {
    return {
      message: dto.message,
    };
  }

  /**
   * Transform Reset Password Response DTO to Domain
   * Simple pass-through since the response is just a message
   *
   * @param dto - Reset password response from API
   * @returns Domain response object
   */
  static resetPasswordResponseToDomain(
    dto: ResetPasswordResponseDTO
  ): { message: string } {
    return {
      message: dto.message,
    };
  }
}
