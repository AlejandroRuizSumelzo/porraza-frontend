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
 * Use Register Hook
 * Access the RegisterUseCase from the DI container
 *
 * @returns RegisterUseCase instance
 *
 * @example
 * ```tsx
 * const registerUseCase = useRegister();
 * const registerResponse = await registerUseCase.execute(email, password, name);
 * ```
 */
export function useRegister() {
  const { registerUseCase } = useDependencies();
  return registerUseCase;
}

/**
 * Use Verify Email Hook
 * Access the VerifyEmailUseCase from the DI container
 *
 * @returns VerifyEmailUseCase instance
 *
 * @example
 * ```tsx
 * const verifyEmailUseCase = useVerifyEmail();
 * const user = await verifyEmailUseCase.execute(token);
 * ```
 */
export function useVerifyEmail() {
  const { verifyEmailUseCase } = useDependencies();
  return verifyEmailUseCase;
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

/**
 * Use Forgot Password Hook
 * Access the ForgotPasswordUseCase from the DI container
 *
 * @returns ForgotPasswordUseCase instance
 *
 * @example
 * ```tsx
 * const forgotPasswordUseCase = useForgotPassword();
 * const response = await forgotPasswordUseCase.execute(email);
 * ```
 */
export function useForgotPassword() {
  const { forgotPasswordUseCase } = useDependencies();
  return forgotPasswordUseCase;
}

/**
 * Use Reset Password Hook
 * Access the ResetPasswordUseCase from the DI container
 *
 * @returns ResetPasswordUseCase instance
 *
 * @example
 * ```tsx
 * const resetPasswordUseCase = useResetPassword();
 * const response = await resetPasswordUseCase.execute(token, newPassword);
 * ```
 */
export function useResetPassword() {
  const { resetPasswordUseCase } = useDependencies();
  return resetPasswordUseCase;
}
