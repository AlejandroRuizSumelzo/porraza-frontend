import type { DependencyModule } from "@/di/client/providers/modules/base-module";
import type { PlayerRepository } from "@/domain/repositories/player-repository";
import { GetPlayersByTeamUseCase } from "@/domain/use-cases/players/get-players-by-team-use-case";
import { GetAllGoalkeepersUseCase } from "@/domain/use-cases/players/get-all-goalkeepers-use-case";

/**
 * Player Use Case Module
 * Registers all player-related use cases in the DI container
 *
 * IMPORTANT: Only for CLIENT COMPONENTS
 * Server Components should use factories from di/server/factories
 */

interface PlayerUseCaseModuleDeps {
  playerRepository: PlayerRepository;
}

export class PlayerUseCaseModule implements DependencyModule {
  constructor(private deps: PlayerUseCaseModuleDeps) {}

  register() {
    const getPlayersByTeamUseCase = new GetPlayersByTeamUseCase(
      this.deps.playerRepository
    );

    const getAllGoalkeepersUseCase = new GetAllGoalkeepersUseCase(
      this.deps.playerRepository
    );

    return {
      getPlayersByTeamUseCase,
      getAllGoalkeepersUseCase,
    };
  }
}
