import { Prediction } from "@/domain/entities/prediction";
import { PredictionRepository } from "@/domain/repositories/prediction-repository";

/**
 * UpdateChampionUseCase
 * Use case for updating the predicted champion team
 */
export class UpdateChampionUseCase {
  constructor(private readonly predictionRepository: PredictionRepository) {}

  /**
   * Execute the use case
   * @param predictionId - Prediction UUID
   * @param championTeamId - Champion team UUID
   * @returns Promise with updated prediction
   */
  async execute(
    predictionId: string,
    championTeamId: string
  ): Promise<Prediction> {
    if (!predictionId || predictionId.trim() === "") {
      throw new Error("Prediction ID is required");
    }

    if (!championTeamId || championTeamId.trim() === "") {
      throw new Error("Champion team ID is required");
    }

    return await this.predictionRepository.updateChampion(
      predictionId,
      championTeamId
    );
  }
}
