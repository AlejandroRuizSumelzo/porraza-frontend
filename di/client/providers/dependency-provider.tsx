"use client";

import { type ReactNode, useMemo } from "react";
import { DependencyContext } from "@/di/client/context/dependency-context";
import type { Dependencies } from "@/di/shared/types";
import { DependencyContainer } from "./dependency-container";
import { HttpModule } from "./modules/http-module";
import { RepositoryModule } from "./modules/repository-module";
import { AuthUseCaseModule } from "./modules/auth-use-case-module";
import { PaymentUseCaseModule } from "./modules/payment-use-case-module";
import { MatchUseCaseModule } from "./modules/match-use-case-module";
import { StadiumUseCaseModule } from "./modules/stadium-use-case-module";

interface DependencyProviderProps {
  children: ReactNode;
}

/**
 * Dependency Provider
 * Provides all dependencies to Client Components via React Context
 *
 * IMPORTANT: Only register dependencies needed by CLIENT COMPONENTS
 * For Server Components, use factories from di/server/factories instead
 *
 * Usage:
 * Wrap your app with this provider in app/layout.tsx (only if you have Client Components)
 */
export function DependencyProvider({ children }: DependencyProviderProps) {
  const dependencies = useMemo(() => {
    const container = new DependencyContainer();

    // Register HTTP module and get HTTP client
    container.registerModule(new HttpModule());

    // Get HTTP client for repositories
    const { httpClient } = container.getDependencies();

    // Register all repositories with HTTP client (only those needed by Client Components)
    container.registerModule(new RepositoryModule({ httpClient }));

    // Register all use case modules with their respective repositories
    const {
      authRepository,
      paymentRepository,
      matchRepository,
      stadiumRepository,
    } = container.getDependencies();
    container.registerModule(new AuthUseCaseModule({ authRepository }));
    container.registerModule(new PaymentUseCaseModule({ paymentRepository }));
    container.registerModule(new MatchUseCaseModule({ matchRepository }));
    container.registerModule(new StadiumUseCaseModule({ stadiumRepository }));

    return container.getDependencies() as Dependencies;
  }, []); // Empty dependency array ensures this only runs once

  return (
    <DependencyContext.Provider value={dependencies}>
      {children}
    </DependencyContext.Provider>
  );
}
