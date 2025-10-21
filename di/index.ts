/**
 * Dependency Injection Exports
 * Centralized exports for easier imports
 */

// Types
export type { Dependencies } from "./shared/types";

// Server-side (for Server Components - PREFERRED)
export * from "./server/factories/create-stadium-repository";
export * from "./server/factories/create-stadium-use-cases";

// Client-side (for Client Components - Use only when needed)
export { DependencyProvider } from "./client/providers/dependency-provider";
