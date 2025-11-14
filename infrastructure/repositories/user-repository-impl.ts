import type { User } from "@/domain/entities/user";
import type {
  UserRepository,
  UpdateUserParams,
} from "@/domain/repositories/user-repository";
import type { HttpClient } from "@/infrastructure/http/client";
import type {
  UpdateUserRequestDTO,
  UpdateUserResponseDTO,
  ChangePasswordRequestDTO,
  ChangePasswordResponseDTO,
  UploadProfilePictureResponseDTO,
} from "@/infrastructure/http/dtos/user-dto";
import { UserMapper } from "@/infrastructure/mappers/user-mapper";
import { HttpError } from "@/infrastructure/http/client";

/**
 * User Repository Implementation
 * Implements the UserRepository interface from domain layer
 * Handles HTTP communication with the backend API for user management
 */
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Update user profile information
   * Maps domain data to DTO, makes API call, and maps response back to domain
   *
   * @param userId - UUID of the user to update
   * @param params - User data to update
   * @returns Promise with updated user data
   * @throws HttpError if request fails (400, 401, 404, 409, 500)
   */
  async update(userId: string, params: UpdateUserParams): Promise<User> {
    try {
      // Map domain parameters to DTO
      const requestDTO: UpdateUserRequestDTO = UserMapper.updateToDTO(params);

      // Make API call
      const { data } = await this.httpClient.patch<UpdateUserResponseDTO>(
        `/users/${userId}`,
        requestDTO
      );

      // Map response DTO to domain entity
      const user = UserMapper.updateResponseToDomain(data);

      console.log(`[UserRepository] User ${userId} updated successfully`);

      return user;
    } catch (error) {
      if (error instanceof HttpError) {
        // Re-throw HTTP errors with context
        console.error(
          `[UserRepository] Failed to update user ${userId}:`,
          error.message
        );
        throw error;
      }

      // Handle unexpected errors
      console.error(
        `[UserRepository] Unexpected error updating user ${userId}:`,
        error
      );
      throw new Error("Error inesperado al actualizar el perfil de usuario");
    }
  }

  /**
   * Delete user account permanently
   * Makes DELETE request to /users/:id
   *
   * @param userId - UUID of the user to delete
   * @returns Promise that resolves when deletion is complete (204 No Content)
   * @throws HttpError if request fails (401, 404, 500)
   */
  async delete(userId: string): Promise<void> {
    try {
      // Make API call - 204 No Content (no response body)
      await this.httpClient.delete(`/users/${userId}`);

      console.log(`[UserRepository] User ${userId} deleted successfully`);
    } catch (error) {
      if (error instanceof HttpError) {
        // Re-throw HTTP errors with context
        console.error(
          `[UserRepository] Failed to delete user ${userId}:`,
          error.message
        );
        throw error;
      }

      // Handle unexpected errors
      console.error(
        `[UserRepository] Unexpected error deleting user ${userId}:`,
        error
      );
      throw new Error("Error inesperado al eliminar la cuenta de usuario");
    }
  }

  /**
   * Upload or update user profile picture
   * Makes POST request with multipart/form-data to /users/:id/profile-picture
   *
   * @param userId - UUID of the user
   * @param file - Image file to upload
   * @returns Promise with updated user data
   * @throws HttpError if request fails (400, 401, 403, 404, 500)
   */
  async uploadProfilePicture(userId: string, file: File): Promise<User> {
    try {
      // Create FormData to send the file
      const formData = new FormData();
      formData.append("file", file);

      // IMPORTANT: Don't set Content-Type header manually for FormData
      // The browser will automatically set it with the correct boundary:
      // Content-Type: multipart/form-data; boundary=----WebKitFormBoundary...
      const { data } = await this.httpClient.post<UploadProfilePictureResponseDTO>(
        `/users/${userId}/profile-picture`,
        formData
      );

      // Map response DTO to domain entity
      const user = UserMapper.toDomain(data);

      console.log(
        `[UserRepository] Profile picture uploaded for user ${userId}:`,
        user.profilePictureUrl
      );

      return user;
    } catch (error) {
      if (error instanceof HttpError) {
        // Re-throw HTTP errors with context
        console.error(
          `[UserRepository] Failed to upload profile picture for user ${userId}:`,
          error.message
        );
        throw error;
      }

      // Handle unexpected errors
      console.error(
        `[UserRepository] Unexpected error uploading profile picture for user ${userId}:`,
        error
      );
      throw new Error("Error inesperado al subir la foto de perfil");
    }
  }

  /**
   * Change user password
   * Makes PATCH request to /users/:id/password
   *
   * @param userId - UUID of the user
   * @param currentPassword - Current password for verification
   * @param newPassword - New password to set
   * @returns Promise with success message
   * @throws HttpError if request fails (400, 401, 403, 404, 500)
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }> {
    try {
      // Map parameters to DTO
      const requestDTO: ChangePasswordRequestDTO = {
        currentPassword,
        newPassword,
      };

      // Make API call
      const { data } = await this.httpClient.patch<ChangePasswordResponseDTO>(
        `/users/${userId}/password`,
        requestDTO
      );

      console.log(`[UserRepository] Password changed for user ${userId}`);

      return { message: data.message };
    } catch (error) {
      if (error instanceof HttpError) {
        // Re-throw HTTP errors with context
        console.error(
          `[UserRepository] Failed to change password for user ${userId}:`,
          error.message
        );
        throw error;
      }

      // Handle unexpected errors
      console.error(
        `[UserRepository] Unexpected error changing password for user ${userId}:`,
        error
      );
      throw new Error("Error inesperado al cambiar la contraseña");
    }
  }
}

/**
 * Factory function to create UserRepository instance
 * Used by DI container for dependency injection
 *
 * @param httpClient - HTTP client instance
 * @returns UserRepository implementation
 */
export function createUserRepository(
  httpClient: HttpClient
): UserRepository {
  return new UserRepositoryImpl(httpClient);
}
