import { PredictionStats } from "@/domain/entities/prediction-stats";
import { PredictionRepository } from "@/domain/repositories/prediction-repository";

/**
 * GetPredictionStatsUseCase
 * Use case for retrieving prediction statistics (completion percentage, etc.)
 */
export class GetPredictionStatsUseCase {
  constructor(private readonly predictionRepository: PredictionRepository) {}

  /**
   * Execute the use case
   * @param predictionId - Prediction UUID
   * @returns Promise with prediction stats
   */
  async execute(predictionId: string): Promise<PredictionStats> {
    if (!predictionId || predictionId.trim() === "") {
      throw new Error("Prediction ID is required");
    }

    return await this.predictionRepository.getStats(predictionId);
  }
}
