import type { AuthRepository } from "@/domain/repositories/auth-repository";

/**
 * Logout Use Case
 * Handles user logout by clearing authentication cookies
 *
 * Business Logic:
 * - Calls the backend /auth/logout endpoint to clear HTTP-only cookies
 * - The backend will clear accessToken and refreshToken cookies
 * - Frontend should also clear local auth state (handled by presentation layer)
 *
 * Note: This does NOT invalidate JWT tokens (they remain valid until expiration)
 * It only removes them from the browser cookies
 */
export class LogoutUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  /**
   * Execute logout
   * @returns Promise that resolves when logout is complete
   */
  async execute(): Promise<void> {
    await this.authRepository.logout();
  }
}
