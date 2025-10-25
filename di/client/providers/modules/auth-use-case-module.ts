import type { DependencyModule } from "@/di/client/providers/modules/base-module";
import type { AuthRepository } from "@/domain/repositories/auth-repository";
import { LoginUseCase } from "@/domain/use-cases/auth/login-use-case";
import { RegisterUseCase } from "@/domain/use-cases/auth/register-use-case";
import { VerifyEmailUseCase } from "@/domain/use-cases/auth/verify-email-use-case";
import { RefreshTokenUseCase } from "@/domain/use-cases/auth/refresh-token-use-case";
import { LogoutUseCase } from "@/domain/use-cases/auth/logout-use-case";
import { ForgotPasswordUseCase } from "@/domain/use-cases/auth/forgot-password-use-case";
import { ResetPasswordUseCase } from "@/domain/use-cases/auth/reset-password-use-case";
import { initTokenRefreshService } from "@/infrastructure/http/token-refresh-service";
import { useAuthStore } from "@/infrastructure/store/auth-store";

/**
 * Auth Use Case Module
 * Registers all auth-related use cases in the DI container
 * Also initializes token refresh service
 */

interface AuthUseCaseModuleDeps {
  authRepository: AuthRepository;
}

export class AuthUseCaseModule implements DependencyModule {
  constructor(private deps: AuthUseCaseModuleDeps) {}

  register() {
    const loginUseCase = new LoginUseCase(this.deps.authRepository);
    const registerUseCase = new RegisterUseCase(this.deps.authRepository);
    const verifyEmailUseCase = new VerifyEmailUseCase(this.deps.authRepository);
    const refreshTokenUseCase = new RefreshTokenUseCase(
      this.deps.authRepository
    );
    const logoutUseCase = new LogoutUseCase(this.deps.authRepository);
    const forgotPasswordUseCase = new ForgotPasswordUseCase(
      this.deps.authRepository
    );
    const resetPasswordUseCase = new ResetPasswordUseCase(
      this.deps.authRepository
    );

    // Initialize token refresh service with callbacks
    initTokenRefreshService({
      refreshToken: async (refreshToken: string) => {
        const result = await refreshTokenUseCase.execute(refreshToken);
        return {
          accessToken: result.accessToken,
          expiresIn: result.expiresIn,
        };
      },
      updateAccessToken: (accessToken: string, expiresIn: number) => {
        useAuthStore.getState().updateAccessToken(accessToken, expiresIn);
      },
      getRefreshToken: () => useAuthStore.getState().getRefreshToken(),
      clearAuth: () => useAuthStore.getState().clearAuth(),
    });

    console.log("[AuthUseCaseModule] Token refresh service initialized");

    return {
      loginUseCase,
      registerUseCase,
      verifyEmailUseCase,
      refreshTokenUseCase,
      logoutUseCase,
      forgotPasswordUseCase,
      resetPasswordUseCase,
    };
  }
}
