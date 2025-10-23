import {
  httpClient,
  initAuthStoreTokenGetter,
} from "@/infrastructure/http/client";
import { initTokenRefreshService } from "@/infrastructure/http/token-refresh-service";
import { useAuthStore } from "@/infrastructure/store/auth-store";
import type { DependencyModule } from "./base-module";

/**
 * HTTP Module
 * Registers HTTP client in the DI container
 * Also initializes auth token interceptor and refresh service
 */
export class HttpModule implements DependencyModule {
  register() {
    // Initialize auth store token getter for HTTP client interceptor
    initAuthStoreTokenGetter(
      () => useAuthStore.getState().getAccessToken(),
      () => useAuthStore.getState().isTokenExpired()
    );

    console.log("[HttpModule] Auth token interceptor initialized");

    return {
      httpClient,
    };
  }
}
