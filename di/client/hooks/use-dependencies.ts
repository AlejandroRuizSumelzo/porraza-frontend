"use client";

import { useContext } from "react";
import { DependencyContext } from "@/di/client/context/dependency-context";

/**
 * Use Dependencies Hook
 * Access the DI container from Client Components
 *
 * @throws Error if used outside DependencyProvider
 */
export function useDependencies() {
  const dependencies = useContext(DependencyContext);

  if (!dependencies) {
    throw new Error("useDependencies must be used within a DependencyProvider");
  }

  return dependencies;
}
