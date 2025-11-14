import type { User } from "@/domain/entities/user";

/**
 * Update User Parameters
 * Optional fields for updating user profile
 * At least one field must be provided
 */
export interface UpdateUserParams {
  name?: string;
  email?: string;
  isActive?: boolean;
}

/**
 * User Repository Interface
 * Defines the contract for user management operations
 *
 * This repository is separate from AuthRepository to follow Single Responsibility Principle:
 * - AuthRepository: Authentication operations (login, signup, password reset)
 * - UserRepository: User profile management (update, delete, etc.)
 */
export interface UserRepository {
  /**
   * Update user profile information
   * All fields are optional - only provided fields will be updated
   *
   * @param userId - UUID of the user to update
   * @param params - User data to update (at least one field required)
   * @returns Promise with updated user data
   * @throws Error if user not found, validation fails, or email is already in use
   *
   * @example
   * ```typescript
   * // Update only name
   * const user = await userRepository.update('user-123', { name: 'Jane Smith' });
   *
   * // Update multiple fields
   * const user = await userRepository.update('user-123', {
   *   name: 'Jane Smith',
   *   email: 'jane.smith@example.com'
   * });
   * ```
   */
  update(userId: string, params: UpdateUserParams): Promise<User>;

  /**
   * Delete user account permanently
   * NOTE: This performs a hard delete (physical deletion)
   *
   * @param userId - UUID of the user to delete
   * @returns Promise that resolves when deletion is complete (204 No Content)
   * @throws Error if user not found or deletion fails
   *
   * @example
   * ```typescript
   * await userRepository.delete('user-123');
   * ```
   */
  delete(userId: string): Promise<void>;

  /**
   * Upload or update user profile picture
   * Allowed formats: JPEG, PNG, WebP
   * Maximum file size: 5 MB
   * Old profile picture (if exists) will be automatically deleted
   *
   * @param userId - UUID of the user
   * @param file - Image file to upload
   * @returns Promise with updated user data including new profile picture URL
   * @throws Error if file validation fails, user not found, or upload fails
   *
   * @example
   * ```typescript
   * const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
   * const user = await userRepository.uploadProfilePicture('user-123', file);
   * console.log(user.profilePictureUrl); // https://...
   * ```
   */
  uploadProfilePicture(userId: string, file: File): Promise<User>;

  /**
   * Change user password
   * Requires current password verification for security
   *
   * @param userId - UUID of the user (must match authenticated user)
   * @param currentPassword - Current password for verification
   * @param newPassword - New password to set
   * @returns Promise with success message
   * @throws Error if current password is incorrect, validation fails, or update fails
   *
   * @example
   * ```typescript
   * const result = await userRepository.changePassword(
   *   'user-123',
   *   'OldPass123',
   *   'NewSecurePass456'
   * );
   * console.log(result.message); // "Password updated successfully"
   * ```
   */
  changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }>;
}
