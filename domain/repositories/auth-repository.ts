import type { AuthResponse } from "@/domain/entities/auth-response";
import type { RefreshTokenResponse } from "@/domain/entities/refresh-token-response";

/**
 * Auth Repository Interface
 * Defines the contract for authentication operations
 */
export interface AuthRepository {
  /**
   * Authenticate user with email and password
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise with authentication response (tokens + user data)
   * @throws Error if credentials are invalid or account is inactive
   */
  login(email: string, password: string): Promise<AuthResponse>;

  /**
   * Refresh access token using refresh token
   * @param refreshToken - Valid refresh token
   * @returns Promise with new access token and expiration time
   * @throws Error if refresh token is invalid, expired, or account is inactive
   */
  refreshToken(refreshToken: string): Promise<RefreshTokenResponse>;

  /**
   * Logout user by clearing authentication cookies
   * @returns Promise that resolves when logout is complete
   * @throws Error if logout fails
   */
  logout(): Promise<void>;
}
