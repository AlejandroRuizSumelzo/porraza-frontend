import type { MatchPredictionDTO } from "@/infrastructure/http/dtos/match-prediction-dto";

/**
 * Save Knockout Predictions Request DTO
 * Request body for POST /predictions/{id}/knockouts/{phase}
 * Matches backend SaveKnockoutPredictionsDto
 */
export interface SaveKnockoutPredictionsRequestDTO {
  /**
   * Knockout phase
   * Valid values: ROUND_OF_32, ROUND_OF_16, QUARTER_FINALS, SEMI_FINALS, FINAL
   */
  phase: string;

  /**
   * Array of match predictions for the knockout phase
   * Number of predictions must match the phase:
   * - ROUND_OF_32: 16 matches
   * - ROUND_OF_16: 8 matches
   * - QUARTER_FINALS: 4 matches
   * - SEMI_FINALS: 2 matches
   * - FINAL: 1 match
   */
  predictions: MatchPredictionDTO[];
}
