"use client";

import { useDependencies } from "@/di/client/hooks/use-dependencies";

/**
 * Use Create Checkout Session Hook
 * Access the CreateCheckoutSessionUseCase from the DI container
 *
 * @returns CreateCheckoutSessionUseCase instance
 *
 * @example
 * ```tsx
 * const createCheckoutSession = useCreateCheckoutSession();
 * const { clientSecret, sessionId } = await createCheckoutSession.execute();
 * ```
 */
export function useCreateCheckoutSession() {
  const { createCheckoutSessionUseCase } = useDependencies();
  return createCheckoutSessionUseCase;
}

/**
 * Use Verify Payment Status Hook
 * Access the VerifyPaymentStatusUseCase from the DI container
 *
 * @returns VerifyPaymentStatusUseCase instance
 *
 * @example
 * ```tsx
 * const verifyPaymentStatus = useVerifyPaymentStatus();
 * const { hasPaid, paymentDate } = await verifyPaymentStatus.execute();
 * ```
 */
export function useVerifyPaymentStatus() {
  const { verifyPaymentStatusUseCase } = useDependencies();
  return verifyPaymentStatusUseCase;
}

/**
 * Use Get Session Status Hook
 * Access the GetSessionStatusUseCase from the DI container
 *
 * @returns GetSessionStatusUseCase instance
 *
 * @example
 * ```tsx
 * const getSessionStatus = useGetSessionStatus();
 * const status = await getSessionStatus.execute(sessionId);
 * ```
 */
export function useGetSessionStatus() {
  const { getSessionStatusUseCase } = useDependencies();
  return getSessionStatusUseCase;
}
