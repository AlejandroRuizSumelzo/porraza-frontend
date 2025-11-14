import type { UserRepository } from "@/domain/repositories/user-repository";

/**
 * Change Password Use Case
 * Business logic for changing user password
 *
 * Responsibilities:
 * - Validate user ID and passwords
 * - Validate password strength requirements
 * - Ensure new password is different from current password
 * - Delegate password change to repository
 */
export class ChangePasswordUseCase {
  // Minimum password length
  private readonly MIN_PASSWORD_LENGTH = 8;

  constructor(private readonly repository: UserRepository) {}

  /**
   * Execute the change password use case
   *
   * @param userId - UUID of the user
   * @param currentPassword - Current password for verification
   * @param newPassword - New password to set
   * @returns Promise with success message
   * @throws Error if validation fails or password change fails
   */
  async execute(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }> {
    // Business validation: User ID is required
    if (!userId || !userId.trim()) {
      throw new Error("El ID de usuario es requerido");
    }

    // Business validation: Current password is required
    if (!currentPassword || !currentPassword.trim()) {
      throw new Error("La contraseña actual es requerida");
    }

    // Business validation: New password is required
    if (!newPassword || !newPassword.trim()) {
      throw new Error("La nueva contraseña es requerida");
    }

    // Business validation: New password must be different from current
    if (currentPassword === newPassword) {
      throw new Error(
        "La nueva contraseña debe ser diferente de la contraseña actual"
      );
    }

    // Business validation: New password length
    if (newPassword.length < this.MIN_PASSWORD_LENGTH) {
      throw new Error(
        `La nueva contraseña debe tener al menos ${this.MIN_PASSWORD_LENGTH} caracteres`
      );
    }

    // Business validation: Password strength (basic check)
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      throw new Error(
        "La nueva contraseña debe contener al menos una mayúscula, una minúscula y un número"
      );
    }

    // Delegate to repository
    const result = await this.repository.changePassword(
      userId,
      currentPassword,
      newPassword
    );

    console.log(`[ChangePasswordUseCase] Password changed for user ${userId}`);

    return result;
  }
}
