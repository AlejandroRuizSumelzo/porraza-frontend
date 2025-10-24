import type { AuthResponse } from "@/domain/entities/auth-response";
import type { RefreshTokenResponse } from "@/domain/entities/refresh-token-response";
import type { RegisterResponse } from "@/domain/entities/register-response";
import type { User } from "@/domain/entities/user";
import type { AuthRepository } from "@/domain/repositories/auth-repository";
import type { HttpClient } from "@/infrastructure/http/client";
import type {
  LoginRequestDTO,
  LoginResponseDTO,
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
  VerifyEmailRequestDTO,
  VerifyEmailResponseDTO,
  ForgotPasswordRequestDTO,
  ForgotPasswordResponseDTO,
  ResetPasswordRequestDTO,
  ResetPasswordResponseDTO,
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
      console.log("[AuthRepositoryImpl] Login response headers:", {
        setCookie: response.headers.get("set-cookie"),
        allHeaders: Array.from(response.headers.entries()),
      });

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
   * Register new user account
   * @param email - User's email address
   * @param password - User's password
   * @param name - User's full name
   * @returns Promise with registration response (user data + message)
   * @throws Error if email is already registered or validation fails
   */
  async register(
    email: string,
    password: string,
    name: string
  ): Promise<RegisterResponse> {
    try {
      const requestBody: RegisterRequestDTO = {
        email,
        password,
        name,
      };

      console.log("[AuthRepositoryImpl] Register request body:", requestBody);

      const response = await this.httpClient.post<RegisterResponseDTO>(
        `${this.baseUrl}/register`,
        requestBody
      );
      console.log("[AuthRepositoryImpl] Register response:", response.data);

      return AuthMapper.registerResponseToDomain(response.data);
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

          case 409:
            // Email already registered
            throw new Error("Este email ya está registrado");

          case 500:
            // Server error
            throw new Error(
              "Error en el servidor. Por favor, inténtalo de nuevo más tarde."
            );

          default:
            throw new Error(`Error de registro: ${error.message}`);
        }
      }

      // Network or unknown error
      if (error instanceof Error) {
        throw new Error(`Error de conexión: ${error.message}`);
      }

      throw new Error("Error desconocido durante el registro");
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
   * Verify user email using token from verification email
   * @param token - Email verification token from email link
   * @returns Promise with verified user data
   * @throws Error if token is invalid, expired, or user not found
   */
  async verifyEmail(token: string): Promise<User> {
    try {
      const requestBody: VerifyEmailRequestDTO = {
        token,
      };

      const response = await this.httpClient.post<VerifyEmailResponseDTO>(
        `${this.baseUrl}/verify-email`,
        requestBody
      );
      console.log("[AuthRepositoryImpl] Verify email response:", response.data);

      return AuthMapper.userToDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        // Handle specific error codes from backend
        switch (error.status) {
          case 400:
            // Validation failed
            const validationMessage = Array.isArray(error.response?.message)
              ? error.response.message.join(", ")
              : error.response?.message || "Token inválido";
            throw new Error(validationMessage);

          case 401:
            // Invalid or expired token
            throw new Error(
              "Token de verificación inválido o expirado. Por favor, solicita un nuevo enlace de verificación."
            );

          case 404:
            // User not found
            throw new Error("Usuario no encontrado");

          case 500:
            // Server error
            throw new Error(
              "Error en el servidor. Por favor, inténtalo de nuevo más tarde."
            );

          default:
            throw new Error(`Error al verificar email: ${error.message}`);
        }
      }

      // Network or unknown error
      if (error instanceof Error) {
        throw new Error(`Error de conexión: ${error.message}`);
      }

      throw new Error("Error desconocido al verificar email");
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

  /**
   * Request password reset email
   * @param email - User's email address
   * @returns Promise with success message
   * @throws Error if email format is invalid or request fails
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const requestBody: ForgotPasswordRequestDTO = {
        email,
      };

      const response = await this.httpClient.post<ForgotPasswordResponseDTO>(
        `${this.baseUrl}/forgot-password`,
        requestBody
      );

      return AuthMapper.forgotPasswordResponseToDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        // Handle specific error codes from backend
        switch (error.status) {
          case 400:
            // Validation failed (invalid email format)
            const validationMessage = Array.isArray(error.response?.message)
              ? error.response.message.join(", ")
              : error.response?.message || "Email inválido";
            throw new Error(validationMessage);

          case 500:
            // Server error
            throw new Error(
              "Error en el servidor. Por favor, inténtalo de nuevo más tarde."
            );

          default:
            throw new Error(
              `Error al solicitar recuperación de contraseña: ${error.message}`
            );
        }
      }

      // Network or unknown error
      if (error instanceof Error) {
        throw new Error(`Error de conexión: ${error.message}`);
      }

      throw new Error(
        "Error desconocido al solicitar recuperación de contraseña"
      );
    }
  }

  /**
   * Reset password using token from email
   * @param token - Password reset token from email link
   * @param newPassword - New password to set
   * @returns Promise with success message
   * @throws Error if token is invalid/expired or password validation fails
   */
  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ message: string }> {
    try {
      const requestBody: ResetPasswordRequestDTO = {
        token,
        newPassword,
      };

      const response = await this.httpClient.post<ResetPasswordResponseDTO>(
        `${this.baseUrl}/reset-password`,
        requestBody
      );

      return AuthMapper.resetPasswordResponseToDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        // Handle specific error codes from backend
        switch (error.status) {
          case 400:
            // Validation failed (password doesn't meet requirements)
            const validationMessage = Array.isArray(error.response?.message)
              ? error.response.message.join(", ")
              : error.response?.message ||
                "La contraseña no cumple con los requisitos";
            throw new Error(validationMessage);

          case 401:
            // Invalid or expired token
            throw new Error(
              "El enlace de recuperación es inválido o ha expirado. Por favor, solicita uno nuevo."
            );

          case 404:
            // User not found
            throw new Error("Usuario no encontrado");

          case 500:
            // Server error
            throw new Error(
              "Error en el servidor. Por favor, inténtalo de nuevo más tarde."
            );

          default:
            throw new Error(
              `Error al restablecer contraseña: ${error.message}`
            );
        }
      }

      // Network or unknown error
      if (error instanceof Error) {
        throw new Error(`Error de conexión: ${error.message}`);
      }

      throw new Error("Error desconocido al restablecer contraseña");
    }
  }
}
