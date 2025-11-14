import type { User } from "@/domain/entities/user";
import type {
  UserRepository,
  UpdateUserParams,
} from "@/domain/repositories/user-repository";

/**
 * Update User Use Case
 * Business logic for updating user profile information
 *
 * Responsibilities:
 * - Validate that at least one field is provided
 * - Validate field formats (email, name length, etc.)
 * - Delegate actual update to repository
 */
export class UpdateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  /**
   * Execute the update user use case
   *
   * @param userId - UUID of the user to update
   * @param params - User data to update (at least one field required)
   * @returns Promise with updated user data
   * @throws Error if validation fails or update fails
   */
  async execute(userId: string, params: UpdateUserParams): Promise<User> {
    // Business validation: User ID is required
    if (!userId || !userId.trim()) {
      throw new Error("El ID de usuario es requerido");
    }

    // Business validation: At least one field must be provided
    const hasAtLeastOneField =
      params.name !== undefined ||
      params.email !== undefined ||
      params.isActive !== undefined;

    if (!hasAtLeastOneField) {
      throw new Error(
        "Debes proporcionar al menos un campo para actualizar (name, email, o isActive)"
      );
    }

    // Business validation: Name format
    if (params.name !== undefined) {
      if (typeof params.name !== "string") {
        throw new Error("El nombre debe ser una cadena de texto");
      }

      const trimmedName = params.name.trim();
      if (trimmedName.length === 0) {
        throw new Error("El nombre no puede estar vacío");
      }

      if (trimmedName.length < 2) {
        throw new Error("El nombre debe tener al menos 2 caracteres");
      }

      if (trimmedName.length > 100) {
        throw new Error("El nombre no puede exceder los 100 caracteres");
      }

      // Update params with trimmed name
      params.name = trimmedName;
    }

    // Business validation: Email format
    if (params.email !== undefined) {
      if (typeof params.email !== "string") {
        throw new Error("El email debe ser una cadena de texto");
      }

      const trimmedEmail = params.email.trim().toLowerCase();
      if (trimmedEmail.length === 0) {
        throw new Error("El email no puede estar vacío");
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        throw new Error("El email no tiene un formato válido");
      }

      // Update params with trimmed and lowercased email
      params.email = trimmedEmail;
    }

    // Business validation: isActive type
    if (params.isActive !== undefined) {
      if (typeof params.isActive !== "boolean") {
        throw new Error("isActive debe ser un valor booleano");
      }
    }

    // Delegate to repository
    const updatedUser = await this.repository.update(userId, params);

    console.log(
      `[UpdateUserUseCase] User ${userId} updated successfully:`,
      Object.keys(params).join(", ")
    );

    return updatedUser;
  }
}
