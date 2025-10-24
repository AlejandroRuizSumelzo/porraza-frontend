"use client";

import { useState, useEffect } from "react";
import { useVerifyPaymentStatus } from "@/di/client/hooks/use-payments";
import type { PaymentStatus } from "@/domain/entities/checkout-session";

/**
 * Custom Hook: usePaymentStatus
 *
 * Encapsulates the business logic for verifying user payment status
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Automatically fetches payment status on mount
 *
 * Usage in Client Components:
 * ```tsx
 * const { hasPaid, paymentDate, isLoading, error, refetch } = usePaymentStatus();
 *
 * if (isLoading) return <Spinner />;
 * if (!hasPaid) return <PaymentRequired />;
 * return <PremiumContent />;
 * ```
 */

interface UsePaymentStatusResult {
  /**
   * Whether the user has completed payment
   */
  hasPaid: boolean;

  /**
   * Date when payment was completed (if paid)
   */
  paymentDate?: string;

  /**
   * User email (if available)
   */
  email?: string;

  /**
   * Loading state during verification
   */
  isLoading: boolean;

  /**
   * Error message if verification fails
   */
  error: string | null;

  /**
   * Manually refetch payment status
   */
  refetch: () => Promise<void>;

  /**
   * Clear error message
   */
  clearError: () => void;
}

export function usePaymentStatus(): UsePaymentStatusResult {
  const verifyPaymentStatusUseCase = useVerifyPaymentStatus();

  const [hasPaid, setHasPaid] = useState(false);
  const [paymentDate, setPaymentDate] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("[usePaymentStatus] Verifying payment status...");

      const status: PaymentStatus = await verifyPaymentStatusUseCase.execute();

      console.log("[usePaymentStatus] Status:", status);

      setHasPaid(status.hasPaid);
      setPaymentDate(status.paymentDate);
      setEmail(status.email);
      setIsLoading(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error desconocido al verificar estado del pago";

      console.error("[usePaymentStatus] Error:", errorMessage);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []); // Run once on mount

  const clearError = () => setError(null);

  return {
    hasPaid,
    paymentDate,
    email,
    isLoading,
    error,
    refetch: fetchStatus,
    clearError,
  };
}
