import type { AuthResponse } from "@/domain/entities/auth-response";
import type { RefreshTokenResponse } from "@/domain/entities/refresh-token-response";
import type { RegisterResponse } from "@/domain/entities/register-response";
import type { User } from "@/domain/entities/user";

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
   * Register new user account
   * @param email - User's email address
   * @param password - User's password
   * @param name - User's full name
   * @returns Promise with registration response (user data + message)
   * @throws Error if email is already registered or validation fails
   */
  register(
    email: string,
    password: string,
    name: string
  ): Promise<RegisterResponse>;

  /**
   * Refresh access token using refresh token
   * @param refreshToken - Valid refresh token
   * @returns Promise with new access token and expiration time
   * @throws Error if refresh token is invalid, expired, or account is inactive
   */
  refreshToken(refreshToken: string): Promise<RefreshTokenResponse>;

  /**
   * Verify user email using token from verification email
   * @param token - Email verification token from email link
   * @returns Promise with verified user data
   * @throws Error if token is invalid, expired, or user not found
   */
  verifyEmail(token: string): Promise<User>;

  /**
   * Logout user by clearing authentication cookies
   * @returns Promise that resolves when logout is complete
   * @throws Error if logout fails
   */
  logout(): Promise<void>;

  /**
   * Request password reset email
   * @param email - User's email address
   * @returns Promise with success message
   * @throws Error if request fails
   */
  forgotPassword(email: string): Promise<{ message: string }>;

  /**
   * Reset password using token from email
   * @param token - Password reset token from email link
   * @param newPassword - New password to set
   * @returns Promise with success message
   * @throws Error if token is invalid/expired or password validation fails
   */
  resetPassword(token: string, newPassword: string): Promise<{ message: string }>;
}
