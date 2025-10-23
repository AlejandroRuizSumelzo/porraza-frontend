/**
 * User DTO
 * Represents user data from the API
 */
export interface UserDTO {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

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
 * Error Response DTO
 * Standard error format from the API
 */
export interface ErrorResponseDTO {
  statusCode: number;
  message: string | string[];
  error: string;
}
