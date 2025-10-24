import type { AuthRepository } from "@/domain/repositories/auth-repository";

/**
 * Forgot Password Use Case
 *
 * Business logic for requesting a password reset email.
 * Always returns success message for security (doesn't reveal if email exists).
 *
 * Clean Architecture:
 * - Pure domain logic (no HTTP, no UI)
 * - Depends on repository interface (dependency inversion)
 * - Used by presentation layer through DI
 */
export class ForgotPasswordUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  /**
   * Request password reset email
   * @param email - User's email address
   * @returns Promise with generic success message
   * @throws Error if email format is invalid or request fails
   */
  async execute(email: string): Promise<{ message: string }> {
    // Basic email validation (more validation in presentation layer)
    if (!email || !email.trim()) {
      throw new Error("El email es requerido");
    }

    // Email format validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("El formato del email es inválido");
    }

    // Delegate to repository
    return await this.authRepository.forgotPassword(email);
  }
}
