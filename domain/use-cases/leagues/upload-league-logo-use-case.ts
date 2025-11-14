import type { League } from "@/domain/entities/league";
import type { LeagueRepository } from "@/domain/repositories/league-repository";

/**
 * Upload League Logo Use Case
 * Business logic for uploading/updating league logo (admin only)
 */
export class UploadLeagueLogoUseCase {
  // Allowed file types
  private readonly ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  // Maximum file size: 5 MB
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024;

  constructor(private readonly repository: LeagueRepository) {}

  /**
   * Upload or update league logo
   * Only the admin can upload/update the league logo
   * @param id League UUID
   * @param file Image file to upload
   * @returns Updated league with new logo URL
   */
  async execute(id: string, file: File): Promise<League> {
    // Business validation
    if (!id || id.trim() === "") {
      throw new Error("League ID is required");
    }

    if (!file) {
      throw new Error("File is required");
    }

    // Validate file type
    if (!this.ALLOWED_MIME_TYPES.includes(file.type)) {
      throw new Error(
        "Invalid file type. Only JPEG, PNG, and WebP images are allowed"
      );
    }

    // Validate file size
    if (file.size > this.MAX_FILE_SIZE) {
      throw new Error(
        `File size exceeds maximum allowed size of ${this.MAX_FILE_SIZE / (1024 * 1024)} MB`
      );
    }

    // Delegate to repository
    return await this.repository.uploadLogo(id, file);
  }
}
