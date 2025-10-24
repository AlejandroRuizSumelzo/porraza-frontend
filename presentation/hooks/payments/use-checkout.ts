"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateCheckoutSession } from "@/di/client/hooks/use-payments";
import type { CheckoutSession } from "@/domain/entities/checkout-session";

/**
 * Custom Hook: useCheckout
 *
 * Encapsulates the business logic for creating a Stripe checkout session
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Execute createCheckoutSession use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for checkout flow
 *
 * Usage in Client Components:
 * ```tsx
 * const { createSession, isLoading, error } = useCheckout();
 *
 * const handlePayment = async () => {
 *   const session = await createSession();
 *
 *   if (session) {
 *     // Checkout session created, use clientSecret for Stripe
 *   }
 * };
 * ```
 */

interface UseCheckoutResult {
  /**
   * Create a Stripe checkout session
   * @returns CheckoutSession if successful, null if error
   */
  createSession: () => Promise<CheckoutSession | null>;

  /**
   * Loading state during session creation
   */
  isLoading: boolean;

  /**
   * Error message if session creation fails
   */
  error: string | null;

  /**
   * Clear error message
   */
  clearError: () => void;
}

export function useCheckout(): UseCheckoutResult {
  const router = useRouter();
  const createCheckoutSessionUseCase = useCreateCheckoutSession();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSession = async (): Promise<CheckoutSession | null> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("[useCheckout] Creating checkout session...");

      // Execute use case
      const session = await createCheckoutSessionUseCase.execute();

      console.log("[useCheckout] Session created:", session);

      setIsLoading(false);
      return session;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error desconocido al crear sesión de pago";

      console.error("[useCheckout] Error:", errorMessage);
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  };

  const clearError = () => setError(null);

  return {
    createSession,
    isLoading,
    error,
    clearError,
  };
}
