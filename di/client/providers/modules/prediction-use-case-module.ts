import type { DependencyModule } from "@/di/client/providers/modules/base-module";
import type { PredictionRepository } from "@/domain/repositories/prediction-repository";
import { GetOrCreatePredictionUseCase } from "@/domain/use-cases/predictions/get-or-create-prediction-use-case";
import { SaveGroupPredictionsUseCase } from "@/domain/use-cases/predictions/save-group-predictions-use-case";
import { SaveKnockoutPredictionsUseCase } from "@/domain/use-cases/predictions/save-knockout-predictions-use-case";
import { UpdateAwardsUseCase } from "@/domain/use-cases/predictions/update-awards-use-case";
import { UpdateChampionUseCase } from "@/domain/use-cases/predictions/update-champion-use-case";
import { GetPredictionStatsUseCase } from "@/domain/use-cases/predictions/get-prediction-stats-use-case";

/**
 * Prediction Use Case Module
 * Registers all prediction-related use cases in the DI container
 *
 * IMPORTANT: Only for CLIENT COMPONENTS
 * Server Components should use factories from di/server/factories
 */

interface PredictionUseCaseModuleDeps {
  predictionRepository: PredictionRepository;
}

export class PredictionUseCaseModule implements DependencyModule {
  constructor(private deps: PredictionUseCaseModuleDeps) {}

  register() {
    const getOrCreatePredictionUseCase = new GetOrCreatePredictionUseCase(
      this.deps.predictionRepository
    );

    const saveGroupPredictionsUseCase = new SaveGroupPredictionsUseCase(
      this.deps.predictionRepository
    );

    const saveKnockoutPredictionsUseCase = new SaveKnockoutPredictionsUseCase(
      this.deps.predictionRepository
    );

    const updateAwardsUseCase = new UpdateAwardsUseCase(
      this.deps.predictionRepository
    );

    const updateChampionUseCase = new UpdateChampionUseCase(
      this.deps.predictionRepository
    );

    const getPredictionStatsUseCase = new GetPredictionStatsUseCase(
      this.deps.predictionRepository
    );

    return {
      getOrCreatePredictionUseCase,
      saveGroupPredictionsUseCase,
      saveKnockoutPredictionsUseCase,
      updateAwardsUseCase,
      updateChampionUseCase,
      getPredictionStatsUseCase,
    };
  }
}
