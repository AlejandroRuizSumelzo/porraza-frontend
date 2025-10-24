import type { DependencyModule } from "./base-module";
import type { MatchRepository } from "@/domain/repositories/match-repository";
import { GetMatchCalendarUseCase } from "@/domain/use-cases/matches/get-match-calendar-use-case";

/**
 * Match Use Case Module
 * Registers all match-related use cases in the DI container
 *
 * IMPORTANT: Only for CLIENT COMPONENTS
 * Server Components should use factories from di/server/factories
 */

interface MatchUseCaseModuleDeps {
  matchRepository: MatchRepository;
}

export class MatchUseCaseModule implements DependencyModule {
  constructor(private deps: MatchUseCaseModuleDeps) {}

  register() {
    const getMatchCalendarUseCase = new GetMatchCalendarUseCase(
      this.deps.matchRepository
    );

    return {
      getMatchCalendarUseCase,
    };
  }
}
