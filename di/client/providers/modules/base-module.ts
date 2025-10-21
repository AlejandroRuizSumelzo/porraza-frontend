/**
 * Base Dependency Module Interface
 * All DI modules must implement this interface
 */
export interface DependencyModule {
  register(): Record<string, any>;
}
