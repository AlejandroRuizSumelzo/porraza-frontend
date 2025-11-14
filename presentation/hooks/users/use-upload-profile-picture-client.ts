"use client";

import { useState } from "react";
import { useUploadProfilePicture } from "@/di/client/hooks/use-users";
import type { User } from "@/domain/entities/user";

/**
 * Custom Hook: useUploadProfilePictureClient
 *
 * Uploads or updates user profile picture using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute upload profile picture use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { uploadProfilePicture, isUploading, error, updatedUser } = useUploadProfilePictureClient();
 *
 * const handleFileChange = async (file: File) => {
 *   const result = await uploadProfilePicture(userId, file);
 *   if (result) {
 *     // Upload successful - update Zustand store
 *     useAuthStore.getState().setUser(result);
 *   }
 * };
 *
 * if (isUploading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Requires authentication
 * - Users can only upload their own profile picture
 * - Allowed file types: JPEG, PNG, WebP
 * - Maximum file size: 5 MB
 * - Old profile picture (if exists) will be automatically deleted
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseUploadProfilePictureResult {
  /**
   * Function to upload a profile picture
   */
  uploadProfilePicture: (userId: string, file: File) => Promise<User | null>;

  /**
   * Loading state during upload
   */
  isUploading: boolean;

  /**
   * Error message if upload fails
   */
  error: string | null;

  /**
   * The updated user with new profile picture URL (null if not uploaded yet)
   */
  updatedUser: User | null;

  /**
   * Reset the hook state
   */
  reset: () => void;
}

export function useUploadProfilePictureClient(): UseUploadProfilePictureResult {
  const uploadProfilePictureUseCase = useUploadProfilePicture();

  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadProfilePicture = async (
    userId: string,
    file: File
  ): Promise<User | null> => {
    setIsUploading(true);
    setError(null);
    setUpdatedUser(null);

    try {
      console.log(
        "[useUploadProfilePictureClient] Uploading profile picture from browser...",
        {
          userId,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        }
      );

      const result = await uploadProfilePictureUseCase.execute(userId, file);

      console.log(
        "[useUploadProfilePictureClient] Profile picture uploaded successfully:",
        {
          userId: result.id,
          profilePictureUrl: result.profilePictureUrl,
        }
      );

      setUpdatedUser(result);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload profile picture";

      console.error(
        "[useUploadProfilePictureClient] Error uploading profile picture:",
        err
      );
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    setUpdatedUser(null);
    setError(null);
    setIsUploading(false);
  };

  return {
    uploadProfilePicture,
    isUploading,
    error,
    updatedUser,
    reset,
  };
}
