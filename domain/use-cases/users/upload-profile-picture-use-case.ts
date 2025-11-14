import type { User } from "@/domain/entities/user";
import type { UserRepository } from "@/domain/repositories/user-repository";

/**
 * Upload Profile Picture Use Case
 * Business logic for uploading/updating user profile picture
 *
 * Responsibilities:
 * - Validate user ID and file
 * - Validate file type (JPEG, PNG, WebP)
 * - Validate file size (max 5 MB)
 * - Delegate upload to repository
 */
export class UploadProfilePictureUseCase {
  // Allowed file types
  private readonly ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  // Maximum file size: 5 MB
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024;

  constructor(private readonly repository: UserRepository) {}

  /**
   * Execute the upload profile picture use case
   *
   * @param userId - UUID of the user
   * @param file - Image file to upload
   * @returns Promise with updated user data
   * @throws Error if validation fails or upload fails
   */
  async execute(userId: string, file: File): Promise<User> {
    // Business validation: User ID is required
    if (!userId || !userId.trim()) {
      throw new Error("El ID de usuario es requerido");
    }

    // Business validation: File is required
    if (!file) {
      throw new Error("El archivo de imagen es requerido");
    }

    // Business validation: File type
    if (!this.ALLOWED_MIME_TYPES.includes(file.type)) {
      throw new Error(
        "Tipo de archivo inválido. Solo se permiten imágenes JPEG, PNG y WebP"
      );
    }

    // Business validation: File size
    if (file.size > this.MAX_FILE_SIZE) {
      const maxSizeMB = this.MAX_FILE_SIZE / (1024 * 1024);
      throw new Error(
        `El tamaño del archivo excede el máximo permitido de ${maxSizeMB} MB`
      );
    }

    // Delegate to repository
    const updatedUser = await this.repository.uploadProfilePicture(userId, file);

    console.log(
      `[UploadProfilePictureUseCase] Profile picture uploaded for user ${userId}:`,
      updatedUser.profilePictureUrl
    );

    return updatedUser;
  }
}
