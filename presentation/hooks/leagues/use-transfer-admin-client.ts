"use client";

import { useState } from "react";
import { useTransferAdmin } from "@/di/client/hooks/use-leagues";
import type { League } from "@/domain/entities/league";

/**
 * Custom Hook: useTransferAdminClient
 *
 * Transfers admin role to another member (admin only) using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute transfer admin use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { transferAdmin, isTransferring, error, updatedLeague } = useTransferAdmin();
 *
 * const handleTransfer = async (newAdminUserId) => {
 *   const league = await transferAdmin(leagueId, newAdminUserId);
 *   if (league) {
 *     refetchLeague();
 *   }
 * };
 *
 * if (isTransferring) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Requires authentication and admin permissions
 * - Only the current admin can transfer the role
 * - New admin must be a league member
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 */

interface UseTransferAdminResult {
  /**
   * Function to transfer admin role
   * @param leagueId League UUID
   * @param newAdminUserId User UUID of the new admin
   * @returns Updated league or null if failed
   */
  transferAdmin: (
    leagueId: string,
    newAdminUserId: string
  ) => Promise<League | null>;

  /**
   * Loading state during transfer
   */
  isTransferring: boolean;

  /**
   * Error message if transfer fails
   */
  error: string | null;

  /**
   * The updated league after admin transfer
   */
  updatedLeague: League | null;

  /**
   * Reset the hook state
   */
  reset: () => void;
}

export function useTransferAdminClient(): UseTransferAdminResult {
  const transferAdminUseCase = useTransferAdmin();

  const [updatedLeague, setUpdatedLeague] = useState<League | null>(null);
  const [isTransferring, setIsTransferring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transferAdmin = async (
    leagueId: string,
    newAdminUserId: string
  ): Promise<League | null> => {
    setIsTransferring(true);
    setError(null);
    setUpdatedLeague(null);

    try {
      console.log("[useTransferAdminClient] Transferring admin from browser...", {
        leagueId,
        newAdminUserId,
      });

      const result = await transferAdminUseCase.execute(
        leagueId,
        newAdminUserId
      );

      console.log("[useTransferAdminClient] Admin transferred successfully:", {
        leagueId,
        newAdminUserId: result.adminUserId,
      });

      setUpdatedLeague(result);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to transfer admin";

      console.error("[useTransferAdminClient] Error transferring admin:", err);
      setError(errorMessage);
      return null;
    } finally {
      setIsTransferring(false);
    }
  };

  const reset = () => {
    setUpdatedLeague(null);
    setError(null);
    setIsTransferring(false);
  };

  return {
    transferAdmin,
    isTransferring,
    error,
    updatedLeague,
    reset,
  };
}
