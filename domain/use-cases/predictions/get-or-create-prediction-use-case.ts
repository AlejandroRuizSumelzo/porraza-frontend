import {
  PredictionRepository,
  GetOrCreatePredictionResponse,
} from "@/domain/repositories/prediction-repository";

/**
 * GetOrCreatePredictionUseCase
 * Use case for retrieving or creating a prediction for a league
 * Auto-creates the prediction if it doesn't exist
 */
export class GetOrCreatePredictionUseCase {
  constructor(private readonly predictionRepository: PredictionRepository) {}

  /**
   * Execute the use case
   * @param leagueId - League UUID
   * @returns Promise with prediction and ranking
   */
  async execute(leagueId: string): Promise<GetOrCreatePredictionResponse> {
    if (!leagueId || leagueId.trim() === "") {
      throw new Error("League ID is required");
    }

    return await this.predictionRepository.getOrCreate(leagueId);
  }
}
