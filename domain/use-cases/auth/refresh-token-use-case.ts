import type { RefreshTokenResponse } from "@/domain/entities/refresh-token-response";
import type { AuthRepository } from "@/domain/repositories/auth-repository";

/**
 * Refresh Token Use Case
 * Business logic for refreshing access tokens
 */
export class RefreshTokenUseCase {
  constructor(private readonly repository: AuthRepository) {}

  /**
   * Execute the refresh token use case
   * @param refreshToken - Valid refresh token
   * @returns Promise with new access token and expiration time
   * @throws Error if refresh token is invalid, expired, or account is inactive
   */
  async execute(refreshToken: string): Promise<RefreshTokenResponse> {
    // Business validation
    if (!refreshToken || !refreshToken.trim()) {
      throw new Error("El refresh token es requerido");
    }

    // Delegate to repository
    const refreshResponse = await this.repository.refreshToken(refreshToken);

    // Log for debugging (can be removed in production)
    console.log("[RefreshTokenUseCase] Token refreshed successfully:", {
      expiresIn: refreshResponse.expiresIn,
    });

    return refreshResponse;
  }
}
