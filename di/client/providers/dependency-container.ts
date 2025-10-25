import type { DependencyModule } from "@/di/client/providers/modules/base-module";

/**
 * Dependency Container
 * Manages registration and retrieval of dependencies
 */
export class DependencyContainer {
  private dependencies: Record<string, any> = {};

  /**
   * Register a module and merge its dependencies
   */
  registerModule(module: DependencyModule) {
    this.dependencies = {
      ...this.dependencies,
      ...module.register(),
    };
    return this;
  }

  /**
   * Get all registered dependencies
   */
  getDependencies() {
    return this.dependencies;
  }
}
