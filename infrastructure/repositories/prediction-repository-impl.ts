import type { Prediction } from "@/domain/entities/prediction";
import type { PredictionStats } from "@/domain/entities/prediction-stats";
import type { MatchPrediction } from "@/domain/entities/match-prediction";
import type {
  PredictionRepository,
  GetOrCreatePredictionResponse,
} from "@/domain/repositories/prediction-repository";
import type { HttpClient } from "@/infrastructure/http/client";
import type { PredictionDTO } from "@/infrastructure/http/dtos/prediction-dto";
import type { PredictionStatsDTO } from "@/infrastructure/http/dtos/prediction-stats-dto";
import type { PredictionRankingDTO } from "@/infrastructure/http/dtos/prediction-ranking-dto";
import { PredictionMapper } from "@/infrastructure/mappers/prediction-mapper";
import { HttpError } from "@/infrastructure/http/client";

/**
 * Response from GET /predictions/league/{leagueId}
 */
interface GetOrCreatePredictionAPIResponse {
  prediction: PredictionDTO;
  ranking: PredictionRankingDTO;
}

/**
 * Response from POST /predictions/league/{leagueId}/groups/{groupId}
 */
interface SaveGroupPredictionsAPIResponse {
  prediction: PredictionDTO;
}

/**
 * Prediction Repository Implementation
 * Implements the PredictionRepository interface from domain layer
 * Handles all HTTP communication with the predictions API
 */
export class PredictionRepositoryImpl implements PredictionRepository {
  private readonly baseUrl = "/predictions";

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get or create prediction for a league
   */
  async getOrCreate(leagueId: string): Promise<GetOrCreatePredictionResponse> {
    try {
      const response =
        await this.httpClient.get<GetOrCreatePredictionAPIResponse>(
          `${this.baseUrl}/league/${leagueId}`
        );

      return {
        prediction: PredictionMapper.predictionToDomain(
          response.data.prediction
        ),
        ranking: PredictionMapper.rankingToDomain(response.data.ranking),
      };
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(
          "[PredictionRepository] Error getting/creating prediction:",
          {
            leagueId,
            status: error.status,
            message: error.message,
            response: error.response,
          }
        );
        throw new Error(
          `Failed to get/create prediction for league ${leagueId}: ${error.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Save group predictions (6 matches)
   */
  async saveGroupPredictions(
    leagueId: string,
    groupId: string,
    matchPredictions: MatchPrediction[]
  ): Promise<Prediction> {
    try {
      const matchPredictionDTOs =
        PredictionMapper.matchPredictionsToDTOs(matchPredictions);

      const response =
        await this.httpClient.post<SaveGroupPredictionsAPIResponse>(
          `${this.baseUrl}/league/${leagueId}/groups/${groupId}`,
          { matchPredictions: matchPredictionDTOs }
        );

      return PredictionMapper.predictionToDomain(response.data.prediction);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(
          "[PredictionRepository] Error saving group predictions:",
          {
            leagueId,
            groupId,
            status: error.status,
            message: error.message,
            response: error.response,
          }
        );
        throw new Error(`Failed to save group predictions: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Update individual awards
   */
  async updateAwards(
    predictionId: string,
    goldenBootPlayerId?: string | null,
    goldenBallPlayerId?: string | null,
    goldenGlovePlayerId?: string | null
  ): Promise<Prediction> {
    try {
      const body: Record<string, string | null | undefined> = {};

      if (goldenBootPlayerId !== undefined) {
        body.goldenBootPlayerId = goldenBootPlayerId;
      }
      if (goldenBallPlayerId !== undefined) {
        body.goldenBallPlayerId = goldenBallPlayerId;
      }
      if (goldenGlovePlayerId !== undefined) {
        body.goldenGlovePlayerId = goldenGlovePlayerId;
      }

      const response = await this.httpClient.patch<PredictionDTO>(
        `${this.baseUrl}/${predictionId}/awards`,
        body
      );

      return PredictionMapper.predictionToDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[PredictionRepository] Error updating awards:", {
          predictionId,
          status: error.status,
          message: error.message,
          response: error.response,
        });
        throw new Error(`Failed to update awards: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Update predicted champion
   */
  async updateChampion(
    predictionId: string,
    championTeamId: string
  ): Promise<Prediction> {
    try {
      const response = await this.httpClient.patch<PredictionDTO>(
        `${this.baseUrl}/${predictionId}/champion`,
        { championTeamId }
      );

      return PredictionMapper.predictionToDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[PredictionRepository] Error updating champion:", {
          predictionId,
          championTeamId,
          status: error.status,
          message: error.message,
          response: error.response,
        });
        throw new Error(`Failed to update champion: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get prediction statistics
   */
  async getStats(predictionId: string): Promise<PredictionStats> {
    try {
      const response = await this.httpClient.get<PredictionStatsDTO>(
        `${this.baseUrl}/${predictionId}/stats`
      );

      return PredictionMapper.statsToDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("[PredictionRepository] Error getting stats:", {
          predictionId,
          status: error.status,
          message: error.message,
          response: error.response,
        });
        throw new Error(`Failed to get prediction stats: ${error.message}`);
      }
      throw error;
    }
  }
}
