/**
 * Save Knockout Predictions Response DTO
 * Response from POST /predictions/{id}/knockouts/{phase}
 * Matches backend response structure
 */
export interface SaveKnockoutPredictionsResponseDTO {
  /**
   * Indicates if the operation was successful
   */
  success: boolean;

  /**
   * Human-readable message about the operation result
   * Example: "Knockout predictions saved successfully"
   */
  message: string;

  /**
   * The phase that was saved
   * Values: "ROUND_OF_32", "ROUND_OF_16", "QUARTER_FINALS", "SEMI_FINALS", "FINAL"
   */
  phase: string;

  /**
   * Number of matches saved in this request
   */
  matchesSaved: number;

  /**
   * Whether all knockout phases have been completed
   * true = User has completed all knockout predictions
   * false = Still has pending knockout phases to predict
   */
  knockoutsCompleted: boolean;
}
