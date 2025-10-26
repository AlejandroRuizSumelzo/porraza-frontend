import { Prediction } from "@/domain/entities/prediction";
import { MatchPrediction } from "@/domain/entities/match-prediction";
import { PredictionRepository } from "@/domain/repositories/prediction-repository";

/**
 * SaveGroupPredictionsUseCase
 * Use case for saving match predictions for a group (6 matches)
 */
export class SaveGroupPredictionsUseCase {
  constructor(private readonly predictionRepository: PredictionRepository) {}

  /**
   * Execute the use case
   * @param leagueId - League UUID
   * @param groupId - Group UUID
   * @param matchPredictions - Array of 6 match predictions
   * @returns Promise with updated prediction
   */
  async execute(
    leagueId: string,
    groupId: string,
    matchPredictions: MatchPrediction[]
  ): Promise<Prediction> {
    // Validations
    if (!leagueId || leagueId.trim() === "") {
      throw new Error("League ID is required");
    }

    if (!groupId || groupId.trim() === "") {
      throw new Error("Group ID is required");
    }

    if (!matchPredictions || matchPredictions.length !== 6) {
      throw new Error("Exactly 6 match predictions are required for a group");
    }

    // Validate each match prediction
    matchPredictions.forEach((prediction, index) => {
      if (!prediction.matchId || prediction.matchId.trim() === "") {
        throw new Error(
          `Match ID is required for prediction at index ${index}`
        );
      }

      if (
        prediction.homeScore < 0 ||
        prediction.awayScore < 0 ||
        !Number.isInteger(prediction.homeScore) ||
        !Number.isInteger(prediction.awayScore)
      ) {
        throw new Error(`Invalid scores for match at index ${index}`);
      }
    });

    return await this.predictionRepository.saveGroupPredictions(
      leagueId,
      groupId,
      matchPredictions
    );
  }
}
