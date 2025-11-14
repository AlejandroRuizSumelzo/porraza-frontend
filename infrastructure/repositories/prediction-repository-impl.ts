import type { Prediction } from "@/domain/entities/prediction";
import type { PredictionStats } from "@/domain/entities/prediction-stats";
import type { MatchPrediction } from "@/domain/entities/match-prediction";
import type { GroupStanding } from "@/domain/entities/group-standing";
import type { MatchPhase } from "@/domain/entities/match";
import type {
  PredictionRepository,
  GetOrCreatePredictionResponse,
  SaveGroupPredictionsResponse,
  SaveKnockoutPredictionsResponse,
} from "@/domain/repositories/prediction-repository";
import type { HttpClient } from "@/infrastructure/http/client";
import type { PredictionDTO } from "@/infrastructure/http/dtos/prediction-dto";
import type { PredictionStatsDTO } from "@/infrastructure/http/dtos/prediction-stats-dto";
import type { PredictionRankingDTO } from "@/infrastructure/http/dtos/prediction-ranking-dto";
import type { MatchWithPredictionDTO } from "@/infrastructure/http/dtos/match-with-prediction-dto";
import type { BestThirdPlaceDTO } from "@/infrastructure/http/dtos/best-third-place-dto";
import type { RoundOf32MatchDTO } from "@/infrastructure/http/dtos/round-of-32-match-dto";
import type { KnockoutMatchWithPredictionDTO } from "@/infrastructure/http/dtos/knockout-match-with-prediction-dto";
import type { SaveKnockoutPredictionsResponseDTO } from "@/infrastructure/http/dtos/knockout-predictions-response-dto";
import type { KnockoutsDTO } from "@/infrastructure/http/dtos/knockouts-dto";
import { PredictionMapper } from "@/infrastructure/mappers/prediction-mapper";
import { HttpError } from "@/infrastructure/http/client";

/**
 * Response from GET /predictions/league/{leagueId}
 */
interface GetOrCreatePredictionAPIResponse {
  prediction: PredictionDTO;
  ranking: PredictionRankingDTO;
  matches: MatchWithPredictionDTO[];
  bestThirdPlaces?: BestThirdPlaceDTO[];
  roundOf32Matches?: RoundOf32MatchDTO[];
  knockouts?: KnockoutsDTO;
}

/**
 * Response from POST /predictions/league/{leagueId}/groups/{groupId}
 */
interface SaveGroupPredictionsAPIResponse {
  success: boolean;
  message: string;
  groupsCompleted: boolean;
  totalGroupsCompleted: number;
  bestThirdPlaces?: BestThirdPlaceDTO[];
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

      // Transform bestThirdPlaces if present (only when all 12 groups are completed)
      const bestThirdPlaces = response.data.bestThirdPlaces
        ? PredictionMapper.bestThirdPlacesToDomain(response.data.bestThirdPlaces)
        : undefined;

      // Transform roundOf32Matches if present (only when all 12 groups are completed)
      const roundOf32Matches = response.data.roundOf32Matches
        ? PredictionMapper.roundOf32MatchesToDomain(
            response.data.roundOf32Matches
          )
        : undefined;

      // Transform knockouts if present (all knockout rounds with progressive resolution)
      const knockouts = response.data.knockouts
        ? PredictionMapper.knockoutsToDomain(response.data.knockouts)
        : undefined;

      return {
        prediction: PredictionMapper.predictionToDomain(
          response.data.prediction
        ),
        ranking: PredictionMapper.rankingToDomain(response.data.ranking),
        matches: PredictionMapper.matchesWithPredictionsToDomain(
          response.data.matches
        ),
        bestThirdPlaces,
        roundOf32Matches,
        knockouts,
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
   * Save group predictions (6 matches) and group standings (4 teams)
   */
  async saveGroupPredictions(
    leagueId: string,
    groupId: string,
    matchPredictions: MatchPrediction[],
    groupStandings: GroupStanding[]
  ): Promise<SaveGroupPredictionsResponse> {
    try {
      const matchPredictionDTOs =
        PredictionMapper.matchPredictionsToDTOs(matchPredictions);
      const groupStandingDTOs =
        PredictionMapper.groupStandingsToDTOs(groupStandings);

      const response =
        await this.httpClient.post<SaveGroupPredictionsAPIResponse>(
          `${this.baseUrl}/league/${leagueId}/groups/${groupId}`,
          {
            matchPredictions: matchPredictionDTOs,
            groupStandings: groupStandingDTOs,
          }
        );

      console.log(
        "[PredictionRepository] Group predictions saved successfully:",
        {
          groupsCompleted: response.data.groupsCompleted,
          totalGroupsCompleted: response.data.totalGroupsCompleted,
          hasBestThirdPlaces: !!response.data.bestThirdPlaces,
        }
      );

      // Backend no longer returns prediction object, so we need to refetch
      // This ensures we get the most up-to-date prediction with new totalPoints
      const updatedPrediction = await this.getOrCreate(leagueId);

      // Transform bestThirdPlaces if present
      const bestThirdPlaces = response.data.bestThirdPlaces
        ? PredictionMapper.bestThirdPlacesToDomain(response.data.bestThirdPlaces)
        : undefined;

      return {
        prediction: updatedPrediction.prediction,
        bestThirdPlaces,
      };
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

  /**
   * Save knockout phase predictions
   */
  async saveKnockoutPredictions(
    predictionId: string,
    phase: MatchPhase,
    predictions: MatchPrediction[]
  ): Promise<SaveKnockoutPredictionsResponse> {
    try {
      // Prepare request body using mapper
      const requestBody = PredictionMapper.saveKnockoutRequestToDTO(
        phase,
        predictions
      );

      console.log(
        "[PredictionRepository] Saving knockout predictions:",
        {
          predictionId,
          phase,
          matchCount: predictions.length,
        }
      );

      // POST /predictions/{id}/knockouts/{phase}
      const response =
        await this.httpClient.post<SaveKnockoutPredictionsResponseDTO>(
          `${this.baseUrl}/${predictionId}/knockouts/${phase}`,
          requestBody
        );

      console.log(
        "[PredictionRepository] Knockout predictions saved successfully:",
        {
          phase: response.data.phase,
          matchesSaved: response.data.matchesSaved,
          knockoutsCompleted: response.data.knockoutsCompleted,
        }
      );

      // Transform response to domain entity
      return PredictionMapper.knockoutResponseToDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(
          "[PredictionRepository] Error saving knockout predictions:",
          {
            predictionId,
            phase,
            status: error.status,
            message: error.message,
            response: error.response,
          }
        );

        // Provide specific error messages based on status
        if (error.status === 400) {
          throw new Error(
            `Invalid knockout predictions: ${error.message}. Check that previous phase is complete and teams match expected winners.`
          );
        } else if (error.status === 403) {
          throw new Error(
            "Predictions are locked. The deadline has passed for this phase."
          );
        } else if (error.status === 404) {
          throw new Error(
            `Prediction or matches not found for phase ${phase}`
          );
        }

        throw new Error(
          `Failed to save knockout predictions: ${error.message}`
        );
      }
      throw error;
    }
  }
}
