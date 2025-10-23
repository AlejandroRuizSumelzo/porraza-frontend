"use client";

import { useDependencies } from "@/di/client/hooks/use-dependencies";

/**
 * Use Login Hook
 * Access the LoginUseCase from the DI container
 *
 * @returns LoginUseCase instance
 *
 * @example
 * ```tsx
 * const loginUseCase = useLogin();
 * const authResponse = await loginUseCase.execute(email, password);
 * ```
 */
export function useLogin() {
  const { loginUseCase } = useDependencies();
  return loginUseCase;
}

/**
 * Use Logout Hook
 * Access the LogoutUseCase from the DI container
 *
 * @returns LogoutUseCase instance
 *
 * @example
 * ```tsx
 * const logoutUseCase = useLogout();
 * await logoutUseCase.execute();
 * ```
 */
export function useLogout() {
  const { logoutUseCase } = useDependencies();
  return logoutUseCase;
}
