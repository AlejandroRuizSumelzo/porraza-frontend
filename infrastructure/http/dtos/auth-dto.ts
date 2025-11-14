import type { UserDTO } from "@/infrastructure/http/dtos/user-dto";

// Re-export UserDTO for backward compatibility
export type { UserDTO };

/**
 * Login Request DTO
 * Request body for login endpoint
 */
export interface LoginRequestDTO {
  email: string;
  password: string;
}

/**
 * Login Response DTO
 * Response from the API for successful login
 * Matches the backend response format exactly for /auth/login
 */
export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserDTO;
}

/**
 * Refresh Token Request DTO
 * Request body for refresh token endpoint
 */
export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

/**
 * Refresh Token Response DTO
 * Response from the API for successful token refresh
 * Matches the backend response format exactly for /auth/refresh
 */
export interface RefreshTokenResponseDTO {
  accessToken: string;
  expiresIn: number;
}

/**
 * Register Request DTO
 * Request body for register endpoint
 */
export interface RegisterRequestDTO {
  email: string;
  password: string;
  name: string;
}

/**
 * Register Response DTO
 * Response from the API for successful registration
 * Matches the backend response format exactly for /auth/register
 */
export interface RegisterResponseDTO {
  user: UserDTO;
  message: string;
}

/**
 * Verify Email Request DTO
 * Request body for email verification endpoint
 */
export interface VerifyEmailRequestDTO {
  token: string;
}

/**
 * Verify Email Response DTO
 * Response from the API for successful email verification
 * Matches the backend response format exactly for /auth/verify-email
 */
export interface VerifyEmailResponseDTO {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
  hasPaid: boolean;
  stripeCustomerId?: string | null;
}

/**
 * Forgot Password Request DTO
 * Request body for forgot password endpoint
 */
export interface ForgotPasswordRequestDTO {
  email: string;
}

/**
 * Forgot Password Response DTO
 * Response from the API for successful forgot password request
 * Matches the backend response format exactly for /auth/forgot-password
 */
export interface ForgotPasswordResponseDTO {
  message: string;
}

/**
 * Reset Password Request DTO
 * Request body for reset password endpoint
 */
export interface ResetPasswordRequestDTO {
  token: string;
  newPassword: string;
}

/**
 * Reset Password Response DTO
 * Response from the API for successful password reset
 * Matches the backend response format exactly for /auth/reset-password
 */
export interface ResetPasswordResponseDTO {
  message: string;
}

/**
 * Error Response DTO
 * Standard error format from the API
 */
export interface ErrorResponseDTO {
  statusCode: number;
  message: string | string[];
  error: string;
}
