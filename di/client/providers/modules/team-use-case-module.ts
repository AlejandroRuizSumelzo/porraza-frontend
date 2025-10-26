import type { DependencyModule } from "@/di/client/providers/modules/base-module";
import type { TeamRepository } from "@/domain/repositories/team-repository";
import { GetAllTeamsUseCase } from "@/domain/use-cases/teams/get-all-teams-use-case";
import { GetTeamByIdUseCase } from "@/domain/use-cases/teams/get-team-by-id-use-case";

/**
 * Team Use Case Module
 * Registers all team-related use cases in the DI container
 *
 * IMPORTANT: Only for CLIENT COMPONENTS
 * Server Components should use factories from di/server/factories
 */

interface TeamUseCaseModuleDeps {
  teamRepository: TeamRepository;
}

export class TeamUseCaseModule implements DependencyModule {
  constructor(private deps: TeamUseCaseModuleDeps) {}

  register() {
    const getAllTeamsUseCase = new GetAllTeamsUseCase(this.deps.teamRepository);

    const getTeamByIdUseCase = new GetTeamByIdUseCase(this.deps.teamRepository);

    return {
      getAllTeamsUseCase,
      getTeamByIdUseCase,
    };
  }
}
