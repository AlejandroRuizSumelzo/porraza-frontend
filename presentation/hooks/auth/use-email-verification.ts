"use client";

import { useState } from "react";
import { useVerifyEmail as useDIVerifyEmail } from "@/di/client/hooks/use-auth";
import type { User } from "@/domain/entities/user";

/**
 * Custom Hook: useEmailVerification
 *
 * Encapsulates the business logic for email verification
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Flow:
 * 1. Verify email with token from URL
 * 2. Show success message
 * 3. Redirect to login page with email pre-filled
 *
 * Note: Currently, the backend only returns user data after verification,
 * not auth tokens. For better UX in the future, the backend could return
 * tokens directly, eliminating the need for a separate login step.
 *
 * Usage in Client Components:
 * ```tsx
 * const { verifyEmail, isLoading, error } = useEmailVerification();
 *
 * const handleVerify = async (token: string) => {
 *   const user = await verifyEmail(token);
 *
 *   if (user) {
 *     // Verification successful!
 *     // Redirect to login with email pre-filled
 *   }
 * };
 * ```
 */

interface UseEmailVerificationResult {
  /**
   * Verify email with token
   * @param token - Email verification token from URL
   * @returns User if successful, null if error
   */
  verifyEmail: (token: string) => Promise<User | null>;

  /**
   * Loading state during email verification
   */
  isLoading: boolean;

  /**
   * Error message if verification fails
   */
  error: string | null;

  /**
   * Clear error message
   */
  clearError: () => void;
}

export function useEmailVerification(): UseEmailVerificationResult {
  const verifyEmailUseCase = useDIVerifyEmail();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyEmail = async (token: string): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("[useEmailVerification] Verifying email with token");

      // Verify email
      const verifiedUser = await verifyEmailUseCase.execute(token);

      console.log("[useEmailVerification] Email verified successfully:", {
        userId: verifiedUser.id,
        email: verifiedUser.email,
        isEmailVerified: verifiedUser.isEmailVerified,
      });

      setIsLoading(false);
      return verifiedUser;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error desconocido al verificar el email";

      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  };

  const clearError = () => setError(null);

  return {
    verifyEmail,
    isLoading,
    error,
    clearError,
  };
}
