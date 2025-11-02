import type { KnockoutMatch } from "@/domain/entities/knockout-match";
import type { UserMatchPrediction } from "@/domain/entities/match-with-prediction";

/**
 * Knockout Match With Prediction Entity
 * Combines knockout match data with user's prediction
 * Used in the predictions page to show knockout matches and user predictions
 */
export interface KnockoutMatchWithPrediction {
  /**
   * Knockout match details
   */
  match: KnockoutMatch;

  /**
   * User's prediction for this knockout match
   */
  userPrediction: UserMatchPrediction;
}
