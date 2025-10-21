import { httpClient } from "@/infrastructure/http/client";
import type { DependencyModule } from "./base-module";

/**
 * HTTP Module
 * Registers HTTP client in the DI container
 */
export class HttpModule implements DependencyModule {
  register() {
    return {
      httpClient,
    };
  }
}
