"use client";

import { createContext } from "react";
import type { Dependencies } from "@/di/shared/types";

/**
 * Dependency Context
 * Provides dependencies to Client Components via React Context
 */
export const DependencyContext = createContext<Dependencies | undefined>(
  undefined
);
