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
import { UserMapper } from "@/infrastructure/mappers/user-mapper";

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
   * Delegates to UserMapper for consistent user mapping
   *
   * @param dto - User data from API
   * @returns Domain User entity
   */
  static userToDomain(dto: UserDTO): User {
    return UserMapper.toDomain(dto);
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
   * Delegates to UserMapper for consistent user mapping
   *
   * @param domain - Domain User entity
   * @returns User DTO for API
   */
  static userToDTO(domain: User): UserDTO {
    return UserMapper.toDTO(domain);
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
