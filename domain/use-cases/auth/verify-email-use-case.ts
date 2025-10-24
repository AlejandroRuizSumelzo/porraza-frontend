import type { User } from "@/domain/entities/user";
import type { AuthRepository } from "@/domain/repositories/auth-repository";

/**
 * Verify Email Use Case
 * Business logic for email verification
 *
 * After successful verification, the user can login
 */
export class VerifyEmailUseCase {
  constructor(private readonly repository: AuthRepository) {}

  /**
   * Execute the verify email use case
   * @param token - Email verification token from email link
   * @returns Promise with verified user data
   * @throws Error if token is invalid, expired, or validation fails
   */
  async execute(token: string): Promise<User> {
    // Business validation
    if (!token || !token.trim()) {
      throw new Error("El token de verificación es requerido");
    }

    // Delegate to repository
    const user = await this.repository.verifyEmail(token);

    // Business logic: Verify that email is now verified
    if (!user.isEmailVerified) {
      throw new Error(
        "Error al verificar el email. Por favor, contacta con soporte."
      );
    }

    return user;
  }
}
