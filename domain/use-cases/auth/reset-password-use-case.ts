import type { AuthRepository } from "@/domain/repositories/auth-repository";

/**
 * Reset Password Use Case
 *
 * Business logic for resetting user password using token from email.
 * Validates token and new password before calling repository.
 *
 * Clean Architecture:
 * - Pure domain logic (no HTTP, no UI)
 * - Depends on repository interface (dependency inversion)
 * - Used by presentation layer through DI
 */
export class ResetPasswordUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  /**
   * Reset password using token from email
   * @param token - Password reset token from email link
   * @param newPassword - New password to set
   * @returns Promise with success message
   * @throws Error if token is invalid/expired or password validation fails
   */
  async execute(
    token: string,
    newPassword: string
  ): Promise<{ message: string }> {
    // Validate token
    if (!token || !token.trim()) {
      throw new Error("El token es requerido");
    }

    // Validate new password
    if (!newPassword || !newPassword.trim()) {
      throw new Error("La contraseña es requerida");
    }

    if (newPassword.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }

    // Delegate to repository
    return await this.authRepository.resetPassword(token, newPassword);
  }
}
