import { MatchPrediction } from "@/domain/entities/match-prediction";
import { MatchPhase } from "@/domain/entities/match";
import {
  PredictionRepository,
  SaveKnockoutPredictionsResponse,
} from "@/domain/repositories/prediction-repository";

/**
 * Maximum number of matches per knockout phase
 * Used for validation only (allows 1 to N predictions)
 */
const MAX_MATCHES_PER_PHASE: Record<string, number> = {
  ROUND_OF_32: 16,
  ROUND_OF_16: 8,
  QUARTER_FINAL: 4,
  SEMI_FINAL: 2,
  FINAL: 1,
};

/**
 * Valid knockout phases (excludes GROUP_STAGE and THIRD_PLACE)
 */
const VALID_KNOCKOUT_PHASES: MatchPhase[] = [
  "ROUND_OF_32",
  "ROUND_OF_16",
  "QUARTER_FINAL",
  "SEMI_FINAL",
  "FINAL",
];

/**
 * SaveKnockoutPredictionsUseCase
 * Use case for saving predictions for a knockout phase
 * Supports partial saves (1 to N matches) or complete phase saves
 * Includes business logic validation for knockout match rules
 */
export class SaveKnockoutPredictionsUseCase {
  constructor(private readonly predictionRepository: PredictionRepository) {}

  /**
   * Execute the use case
   * Supports saving 1 to N match predictions for a knockout phase
   * @param predictionId - Prediction UUID
   * @param phase - Knockout phase (ROUND_OF_32, ROUND_OF_16, QUARTER_FINAL, SEMI_FINAL, FINAL)
   * @param predictions - Array of 1 to N match predictions (allows partial phase saves)
   * @returns Promise with save confirmation
   */
  async execute(
    predictionId: string,
    phase: MatchPhase,
    predictions: MatchPrediction[]
  ): Promise<SaveKnockoutPredictionsResponse> {
    // Validate predictionId
    if (!predictionId || predictionId.trim() === "") {
      throw new Error("Prediction ID is required");
    }

    // Validate UUID format (basic check)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(predictionId)) {
      throw new Error("Prediction ID must be a valid UUID");
    }

    // Validate phase
    if (!phase || !VALID_KNOCKOUT_PHASES.includes(phase)) {
      throw new Error(
        `Invalid knockout phase: ${phase}. Must be one of: ${VALID_KNOCKOUT_PHASES.join(
          ", "
        )}`
      );
    }

    // Validate predictions array
    if (!predictions || !Array.isArray(predictions)) {
      throw new Error("Predictions must be a non-empty array");
    }

    if (predictions.length === 0) {
      throw new Error("Predictions array cannot be empty");
    }

    // Validate maximum number of matches for phase (allows 1 to MAX)
    const maxMatches = MAX_MATCHES_PER_PHASE[phase];
    if (predictions.length > maxMatches) {
      throw new Error(
        `Too many predictions for ${phase}. Maximum is ${maxMatches}, but got ${predictions.length}`
      );
    }

    // Validate each match prediction
    predictions.forEach((prediction, index) => {
      this.validateMatchPrediction(prediction, index, phase);
    });

    // Call repository to save knockout predictions
    return await this.predictionRepository.saveKnockoutPredictions(
      predictionId,
      phase,
      predictions
    );
  }

  /**
   * Validate a single match prediction
   * @param prediction - Match prediction to validate
   * @param index - Index in array (for error messages)
   * @param phase - Knockout phase (for context)
   */
  private validateMatchPrediction(
    prediction: MatchPrediction,
    index: number,
    phase: MatchPhase
  ): void {
    const errorPrefix = `Match prediction at index ${index} (${phase})`;

    // Validate matchId
    if (!prediction.matchId || prediction.matchId.trim() === "") {
      throw new Error(`${errorPrefix}: Match ID is required`);
    }

    // Validate team IDs
    if (!prediction.homeTeamId || prediction.homeTeamId.trim() === "") {
      throw new Error(`${errorPrefix}: Home team ID is required`);
    }

    if (!prediction.awayTeamId || prediction.awayTeamId.trim() === "") {
      throw new Error(`${errorPrefix}: Away team ID is required`);
    }

    if (prediction.homeTeamId === prediction.awayTeamId) {
      throw new Error(`${errorPrefix}: Home and away teams cannot be the same`);
    }

    // Validate regular time scores
    if (prediction.homeScore < 0 || !Number.isInteger(prediction.homeScore)) {
      throw new Error(
        `${errorPrefix}: Home score must be a non-negative integer`
      );
    }

    if (prediction.awayScore < 0 || !Number.isInteger(prediction.awayScore)) {
      throw new Error(
        `${errorPrefix}: Away score must be a non-negative integer`
      );
    }

    // KNOCKOUT RULE: Tied matches must have a winner
    const isTiedRegularTime = prediction.homeScore === prediction.awayScore;

    if (isTiedRegularTime) {
      // If tied in 90 min, must have ET or penalties
      const hasExtraTime =
        prediction.homeScoreET !== null &&
        prediction.homeScoreET !== undefined &&
        prediction.awayScoreET !== null &&
        prediction.awayScoreET !== undefined;

      const hasPenalties = prediction.penaltiesWinner !== null;

      if (!hasExtraTime && !hasPenalties) {
        throw new Error(
          `${errorPrefix}: Tied matches (${prediction.homeScore}-${prediction.awayScore}) must have extra time or penalties winner`
        );
      }

      // Validate extra time scores if provided
      if (hasExtraTime) {
        if (
          prediction.homeScoreET! < 0 ||
          !Number.isInteger(prediction.homeScoreET!)
        ) {
          throw new Error(
            `${errorPrefix}: Home score ET must be a non-negative integer`
          );
        }

        if (
          prediction.awayScoreET! < 0 ||
          !Number.isInteger(prediction.awayScoreET!)
        ) {
          throw new Error(
            `${errorPrefix}: Away score ET must be a non-negative integer`
          );
        }

        // If still tied after ET, must have penalties
        const isTiedAfterET = prediction.homeScoreET === prediction.awayScoreET;

        if (isTiedAfterET && !hasPenalties) {
          throw new Error(
            `${errorPrefix}: Tied matches after ET (${prediction.homeScoreET}-${prediction.awayScoreET}) must have a penalties winner`
          );
        }

        // If ET resolves the tie, penalties must NOT be set
        if (!isTiedAfterET && hasPenalties) {
          throw new Error(
            `${errorPrefix}: Penalties winner should not be set if extra time resolves the tie`
          );
        }
      }

      // Validate penalties winner if provided
      if (hasPenalties) {
        if (
          prediction.penaltiesWinner !== "home" &&
          prediction.penaltiesWinner !== "away"
        ) {
          throw new Error(
            `${errorPrefix}: Penalties winner must be "home" or "away"`
          );
        }
      }
    } else {
      // If NOT tied in regular time, there's a winner - ET and penalties are optional but should be null
      // Backend may allow ET/penalties even if not needed, but logically they shouldn't be set
      // We won't enforce this strictly here, just validate if they ARE set
      if (
        prediction.homeScoreET !== null &&
        prediction.homeScoreET !== undefined
      ) {
        if (
          prediction.homeScoreET < 0 ||
          !Number.isInteger(prediction.homeScoreET)
        ) {
          throw new Error(
            `${errorPrefix}: Home score ET must be a non-negative integer if provided`
          );
        }
      }

      if (
        prediction.awayScoreET !== null &&
        prediction.awayScoreET !== undefined
      ) {
        if (
          prediction.awayScoreET < 0 ||
          !Number.isInteger(prediction.awayScoreET)
        ) {
          throw new Error(
            `${errorPrefix}: Away score ET must be a non-negative integer if provided`
          );
        }
      }
    }
  }
}
