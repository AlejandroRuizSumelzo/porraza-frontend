import { Prediction } from "@/domain/entities/prediction";
import { PredictionStats } from "@/domain/entities/prediction-stats";
import { PredictionRanking } from "@/domain/entities/prediction-ranking";
import { MatchPrediction } from "@/domain/entities/match-prediction";
import { MatchWithPrediction } from "@/domain/entities/match-with-prediction";
import { GroupStanding } from "@/domain/entities/group-standing";
import { BestThirdPlace } from "@/domain/entities/best-third-place";
import { RoundOf32Match } from "@/domain/entities/round-of-32-match";
import { MatchPhase } from "@/domain/entities/match";

/**
 * Response for GetOrCreatePrediction
 */
export interface GetOrCreatePredictionResponse {
  prediction: Prediction;
  ranking: PredictionRanking;
  matches: MatchWithPrediction[];
  bestThirdPlaces?: BestThirdPlace[];
  roundOf32Matches?: RoundOf32Match[];
}

/**
 * Response for SaveGroupPredictions
 */
export interface SaveGroupPredictionsResponse {
  prediction: Prediction;
  bestThirdPlaces?: BestThirdPlace[];
}

/**
 * Response for SaveKnockoutPredictions
 */
export interface SaveKnockoutPredictionsResponse {
  success: boolean;
  message: string;
  phase: MatchPhase;
  matchesSaved: number;
  knockoutsCompleted: boolean;
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
   * @returns Promise with prediction, ranking, and matches with user predictions
   */
  getOrCreate(leagueId: string): Promise<GetOrCreatePredictionResponse>;

  /**
   * Save group predictions (6 matches) and group standings (4 teams)
   * @param leagueId - League UUID
   * @param groupId - Group UUID
   * @param matchPredictions - Array of 6 match predictions
   * @param groupStandings - Array of 4 team standings for the group
   * @returns Promise with updated prediction and optionally bestThirdPlaces (when all groups completed)
   */
  saveGroupPredictions(
    leagueId: string,
    groupId: string,
    matchPredictions: MatchPrediction[],
    groupStandings: GroupStanding[]
  ): Promise<SaveGroupPredictionsResponse>;

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

  /**
   * Save knockout phase predictions
   * Validates that previous phase is complete and teams match expected winners
   * @param predictionId - Prediction UUID
   * @param phase - Knockout phase (ROUND_OF_32, ROUND_OF_16, QUARTER_FINALS, SEMI_FINALS, FINAL)
   * @param predictions - Array of match predictions for the knockout phase
   * @returns Promise with save confirmation and phase completion status
   */
  saveKnockoutPredictions(
    predictionId: string,
    phase: MatchPhase,
    predictions: MatchPrediction[]
  ): Promise<SaveKnockoutPredictionsResponse>;
}
