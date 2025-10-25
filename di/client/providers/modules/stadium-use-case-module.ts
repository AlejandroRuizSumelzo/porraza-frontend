import type { DependencyModule } from "@/di/client/providers/modules/base-module";
import type { StadiumRepository } from "@/domain/repositories/stadium-repository";
import { GetAllStadiumsUseCase } from "@/domain/use-cases/stadiums/get-all-stadiums-use-case";

/**
 * Stadium Use Case Module
 * Registers all stadium-related use cases in the DI container
 *
 * IMPORTANT: Only for CLIENT COMPONENTS
 * Server Components should use factories from di/server/factories
 */

interface StadiumUseCaseModuleDeps {
  stadiumRepository: StadiumRepository;
}

export class StadiumUseCaseModule implements DependencyModule {
  constructor(private deps: StadiumUseCaseModuleDeps) {}

  register() {
    const getAllStadiumsUseCase = new GetAllStadiumsUseCase(
      this.deps.stadiumRepository
    );

    return {
      getAllStadiumsUseCase,
    };
  }
}
