"use client";

import { useState, useEffect } from "react";
import { useGetSessionStatus } from "@/di/client/hooks/use-payments";
import type { PaymentStatus } from "@/domain/entities/checkout-session";

/**
 * Custom Hook: useSessionStatus
 *
 * Encapsulates the business logic for verifying a specific session status
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Usage in Client Components:
 * ```tsx
 * const { status, isLoading, error } = useSessionStatus(sessionId);
 *
 * if (isLoading) return <Spinner />;
 * if (status?.hasPaid) return <PaymentSuccess />;
 * return <PaymentPending />;
 * ```
 */

interface UseSessionStatusResult {
  /**
   * Payment status for the session
   */
  status: PaymentStatus | null;

  /**
   * Loading state during verification
   */
  isLoading: boolean;

  /**
   * Error message if verification fails
   */
  error: string | null;

  /**
   * Manually refetch session status
   */
  refetch: () => Promise<void>;

  /**
   * Clear error message
   */
  clearError: () => void;
}

export function useSessionStatus(sessionId: string | null): UseSessionStatusResult {
  const getSessionStatusUseCase = useGetSessionStatus();

  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    if (!sessionId) {
      setError("No se proporcionó un ID de sesión");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("[useSessionStatus] Getting session status for:", sessionId);

      const sessionStatus = await getSessionStatusUseCase.execute(sessionId);

      console.log("[useSessionStatus] Status:", sessionStatus);

      setStatus(sessionStatus);
      setIsLoading(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error desconocido al verificar estado de la sesión";

      console.error("[useSessionStatus] Error:", errorMessage);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [sessionId]); // Refetch when sessionId changes

  const clearError = () => setError(null);

  return {
    status,
    isLoading,
    error,
    refetch: fetchStatus,
    clearError,
  };
}
