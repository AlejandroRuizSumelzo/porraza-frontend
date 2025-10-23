import type { AuthResponse } from "@/domain/entities/auth-response";
import type { RefreshTokenResponse } from "@/domain/entities/refresh-token-response";
import type { AuthRepository } from "@/domain/repositories/auth-repository";
import type { HttpClient } from "@/infrastructure/http/client";
import type {
  LoginRequestDTO,
  LoginResponseDTO,
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
} from "@/infrastructure/http/dtos/auth-dto";
import { AuthMapper } from "@/infrastructure/mappers/auth-mapper";
import { HttpError } from "@/infrastructure/http/client";

/**
 * Auth Repository Implementation
 * Implements the AuthRepository interface from domain layer
 * Handles all HTTP communication with the auth API
 */
export class AuthRepositoryImpl implements AuthRepository {
  private readonly baseUrl = "/auth";

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Authenticate user with email and password
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise with authentication response (tokens + user data)
   * @throws Error if credentials are invalid, account is inactive, or validation fails
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const requestBody: LoginRequestDTO = {
        email,
        password,
      };

      const response = await this.httpClient.post<LoginResponseDTO>(
        `${this.baseUrl}/login`,
        requestBody
      );
      console.log("[AuthRepositoryImpl] Login response:", response.data);

      return AuthMapper.loginResponseToDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        // Handle specific error codes from backend
        switch (error.status) {
          case 400:
            // Validation failed
            const validationMessage = Array.isArray(error.response?.message)
              ? error.response.message.join(", ")
              : error.response?.message || "Datos de entrada inválidos";
            throw new Error(validationMessage);

          case 401:
            // Invalid credentials
            throw new Error("Email o contraseña incorrectos");

          case 403:
            // Account is inactive
            throw new Error(
              "La cuenta está inactiva. Por favor, contacta con soporte."
            );

          case 500:
            // Server error
            throw new Error(
              "Error en el servidor. Por favor, inténtalo de nuevo más tarde."
            );

          default:
            throw new Error(`Error de autenticación: ${error.message}`);
        }
      }

      // Network or unknown error
      if (error instanceof Error) {
        throw new Error(`Error de conexión: ${error.message}`);
      }

      throw new Error("Error desconocido durante el inicio de sesión");
    }
  }

  /**
   * Refresh access token using refresh token
   * @param refreshToken - Valid refresh token
   * @returns Promise with new access token and expiration time
   * @throws Error if refresh token is invalid, expired, or account is inactive
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const requestBody: RefreshTokenRequestDTO = {
        refreshToken,
      };

      const response = await this.httpClient.post<RefreshTokenResponseDTO>(
        `${this.baseUrl}/refresh`,
        requestBody
      );

      return AuthMapper.refreshTokenResponseToDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        // Handle specific error codes from backend
        switch (error.status) {
          case 400:
            // Missing or invalid refresh token
            const validationMessage = Array.isArray(error.response?.message)
              ? error.response.message.join(", ")
              : error.response?.message || "Refresh token inválido";
            throw new Error(validationMessage);

          case 401:
            // Invalid or expired refresh token
            throw new Error(
              "Sesión expirada. Por favor, inicia sesión nuevamente."
            );

          case 403:
            // Account is inactive
            throw new Error(
              "La cuenta está inactiva. Por favor, contacta con soporte."
            );

          case 500:
            // Server error
            throw new Error(
              "Error en el servidor. Por favor, inténtalo de nuevo más tarde."
            );

          default:
            throw new Error(`Error al refrescar token: ${error.message}`);
        }
      }

      // Network or unknown error
      if (error instanceof Error) {
        throw new Error(`Error de conexión: ${error.message}`);
      }

      throw new Error("Error desconocido al refrescar token");
    }
  }

  /**
   * Logout user by clearing authentication cookies
   * Calls backend endpoint to clear HTTP-only cookies (accessToken, refreshToken)
   * @returns Promise that resolves when logout is complete
   * @throws Error if logout fails
   */
  async logout(): Promise<void> {
    try {
      await this.httpClient.post(`${this.baseUrl}/logout`);
    } catch (error) {
      if (error instanceof HttpError) {
        // Handle specific error codes from backend
        switch (error.status) {
          case 500:
            // Server error
            throw new Error(
              "Error en el servidor. Por favor, inténtalo de nuevo más tarde."
            );

          default:
            throw new Error(`Error al cerrar sesión: ${error.message}`);
        }
      }

      // Network or unknown error
      if (error instanceof Error) {
        throw new Error(`Error de conexión: ${error.message}`);
      }

      throw new Error("Error desconocido al cerrar sesión");
    }
  }
}
