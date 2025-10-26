import { Prediction } from "@/domain/entities/prediction";
import { PredictionRepository } from "@/domain/repositories/prediction-repository";

/**
 * Parameters for UpdateAwardsUseCase
 */
export interface UpdateAwardsParams {
  goldenBootPlayerId?: string | null;
  goldenBallPlayerId?: string | null;
  goldenGlovePlayerId?: string | null;
}

/**
 * UpdateAwardsUseCase
 * Use case for updating individual awards (Golden Boot, Ball, Glove)
 */
export class UpdateAwardsUseCase {
  constructor(private readonly predictionRepository: PredictionRepository) {}

  /**
   * Execute the use case
   * @param predictionId - Prediction UUID
   * @param params - Awards to update
   * @returns Promise with updated prediction
   */
  async execute(
    predictionId: string,
    params: UpdateAwardsParams
  ): Promise<Prediction> {
    if (!predictionId || predictionId.trim() === "") {
      throw new Error("Prediction ID is required");
    }

    // At least one award must be provided
    if (
      params.goldenBootPlayerId === undefined &&
      params.goldenBallPlayerId === undefined &&
      params.goldenGlovePlayerId === undefined
    ) {
      throw new Error("At least one award must be provided");
    }

    return await this.predictionRepository.updateAwards(
      predictionId,
      params.goldenBootPlayerId,
      params.goldenBallPlayerId,
      params.goldenGlovePlayerId
    );
  }
}
