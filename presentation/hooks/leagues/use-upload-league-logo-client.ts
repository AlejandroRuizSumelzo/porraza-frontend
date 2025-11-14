"use client";

import { useState } from "react";
import { useUploadLeagueLogo } from "@/di/client/hooks/use-leagues";
import type { League } from "@/domain/entities/league";

/**
 * Custom Hook: useUploadLeagueLogoClient
 *
 * Uploads or updates league logo (admin only) using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute upload league logo use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { uploadLogo, isUploading, error } = useUploadLeagueLogoClient();
 *
 * const handleFileChange = async (file: File) => {
 *   await uploadLogo(leagueId, file);
 * };
 *
 * if (isUploading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Only the admin can upload/update the league logo
 * - Allowed file types: JPEG, PNG, WebP
 * - Maximum file size: 5 MB
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseUploadLeagueLogoResult {
  /**
   * Function to upload a league logo
   */
  uploadLogo: (id: string, file: File) => Promise<League | null>;

  /**
   * Loading state during upload
   */
  isUploading: boolean;

  /**
   * Error message if upload fails
   */
  error: string | null;

  /**
   * The updated league with new logo (null if not uploaded yet)
   */
  updatedLeague: League | null;

  /**
   * Reset the hook state
   */
  reset: () => void;
}

export function useUploadLeagueLogoClient(): UseUploadLeagueLogoResult {
  const uploadLeagueLogoUseCase = useUploadLeagueLogo();

  const [updatedLeague, setUpdatedLeague] = useState<League | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadLogo = async (
    id: string,
    file: File
  ): Promise<League | null> => {
    setIsUploading(true);
    setError(null);
    setUpdatedLeague(null);

    try {
      console.log("[useUploadLeagueLogoClient] Uploading logo from browser...", {
        id,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });

      const result = await uploadLeagueLogoUseCase.execute(id, file);

      console.log("[useUploadLeagueLogoClient] Logo uploaded successfully:", {
        id: result.id,
        logoUrl: result.logoUrl,
      });

      setUpdatedLeague(result);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload logo";

      console.error("[useUploadLeagueLogoClient] Error uploading logo:", err);
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    setUpdatedLeague(null);
    setError(null);
    setIsUploading(false);
  };

  return {
    uploadLogo,
    isUploading,
    error,
    updatedLeague,
    reset,
  };
}
