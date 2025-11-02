import type { KnockoutMatchDTO } from "@/infrastructure/http/dtos/knockout-match-dto";
import type { UserMatchPredictionDTO } from "@/infrastructure/http/dtos/match-with-prediction-dto";

/**
 * Knockout Match with Prediction DTO
 * Combines knockout match data with user's prediction
 * As returned by the API for knockout predictions
 */
export interface KnockoutMatchWithPredictionDTO {
  /**
   * Knockout match details
   */
  match: KnockoutMatchDTO;

  /**
   * User's prediction for this knockout match
   */
  userPrediction: UserMatchPredictionDTO;
}
