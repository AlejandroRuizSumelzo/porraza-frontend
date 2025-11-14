import type { UserRepository } from "@/domain/repositories/user-repository";

/**
 * Delete User Use Case
 * Business logic for permanently deleting a user account
 *
 * Responsibilities:
 * - Validate user ID
 * - Delegate deletion to repository
 * - NOTE: This performs a hard delete (physical deletion)
 */
export class DeleteUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  /**
   * Execute the delete user use case
   *
   * @param userId - UUID of the user to delete
   * @returns Promise that resolves when deletion is complete
   * @throws Error if validation fails or deletion fails
   */
  async execute(userId: string): Promise<void> {
    // Business validation: User ID is required
    if (!userId || !userId.trim()) {
      throw new Error("El ID de usuario es requerido");
    }

    // Delegate to repository
    await this.repository.delete(userId);

    console.log(`[DeleteUserUseCase] User ${userId} deleted successfully`);
  }
}
