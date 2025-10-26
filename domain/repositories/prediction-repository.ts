import { Prediction } from "@/domain/entities/prediction";
import { PredictionStats } from "@/domain/entities/prediction-stats";
import { PredictionRanking } from "@/domain/entities/prediction-ranking";
import { MatchPrediction } from "@/domain/entities/match-prediction";

/**
 * Response for GetOrCreatePrediction
 */
export interface GetOrCreatePredictionResponse {
  prediction: Prediction;
  ranking: PredictionRanking;
}

/**
 * PredictionRepository
 * Interface for prediction data access operations
 */
export interface PredictionRepository {
  /**
   * Get or create prediction for a league
   * Auto-creates if not exists
   * @param leagueId - League UUID
   * @returns Promise with prediction and ranking
   */
  getOrCreate(leagueId: string): Promise<GetOrCreatePredictionResponse>;

  /**
   * Save group predictions (6 matches)
   * @param leagueId - League UUID
   * @param groupId - Group UUID
   * @param matchPredictions - Array of 6 match predictions
   * @returns Promise with updated prediction
   */
  saveGroupPredictions(
    leagueId: string,
    groupId: string,
    matchPredictions: MatchPrediction[]
  ): Promise<Prediction>;

  /**
   * Update individual awards
   * @param predictionId - Prediction UUID
   * @param goldenBootPlayerId - Golden Boot player UUID (optional)
   * @param goldenBallPlayerId - Golden Ball player UUID (optional)
   * @param goldenGlovePlayerId - Golden Glove player UUID (optional)
   * @returns Promise with updated prediction
   */
  updateAwards(
    predictionId: string,
    goldenBootPlayerId?: string | null,
    goldenBallPlayerId?: string | null,
    goldenGlovePlayerId?: string | null
  ): Promise<Prediction>;

  /**
   * Update predicted champion
   * @param predictionId - Prediction UUID
   * @param championTeamId - Champion team UUID
   * @returns Promise with updated prediction
   */
  updateChampion(
    predictionId: string,
    championTeamId: string
  ): Promise<Prediction>;

  /**
   * Get prediction statistics
   * @param predictionId - Prediction UUID
   * @returns Promise with prediction stats
   */
  getStats(predictionId: string): Promise<PredictionStats>;
}
