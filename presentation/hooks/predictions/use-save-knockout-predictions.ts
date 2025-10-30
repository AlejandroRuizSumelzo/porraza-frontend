"use client";

import { useState } from "react";
import { useSaveKnockoutPredictions as useSaveKnockoutPredictionsUseCase } from "@/di/client/hooks/use-predictions";
import type { MatchPhase } from "@/domain/entities/match";
import type { MatchPrediction } from "@/domain/entities/match-prediction";
import type { SaveKnockoutPredictionsResponse } from "@/domain/repositories/prediction-repository";

/**
 * Custom Hook: useSaveKnockoutPredictions
 *
 * Saves predictions for a complete knockout phase (ROUND_OF_32, ROUND_OF_16, etc)
 * Handles loading state, error handling, and success response
 *
 * Usage:
 * ```tsx
 * const { saveKnockoutPredictions, isLoading, error } = useSaveKnockoutPredictions();
 *
 * const handleSave = async () => {
 *   try {
 *     const result = await saveKnockoutPredictions(
 *       predictionId,
 *       "ROUND_OF_32",
 *       predictions
 *     );
 *     console.log(result.message);
 *   } catch (err) {
 *     console.error(err);
 *   }
 * };
 * ```
 */

interface UseSaveKnockoutPredictionsResult {
  /**
   * Function to save knockout predictions
   * @param predictionId - Prediction UUID
   * @param phase - Knockout phase (ROUND_OF_32, ROUND_OF_16, etc)
   * @param predictions - Array of match predictions for the phase
   * @returns Promise with save confirmation
   */
  saveKnockoutPredictions: (
    predictionId: string,
    phase: MatchPhase,
    predictions: MatchPrediction[]
  ) => Promise<SaveKnockoutPredictionsResponse>;

  /**
   * Loading state - true while saving
   */
  isLoading: boolean;

  /**
   * Error message if save fails
   */
  error: string | null;

  /**
   * Success state - true after successful save
   */
  success: boolean;

  /**
   * Last successful response
   */
  lastResponse: SaveKnockoutPredictionsResponse | null;

  /**
   * Reset error and success states
   */
  reset: () => void;
}

export function useSaveKnockoutPredictions(): UseSaveKnockoutPredictionsResult {
  const saveKnockoutPredictionsUseCase = useSaveKnockoutPredictionsUseCase();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [lastResponse, setLastResponse] =
    useState<SaveKnockoutPredictionsResponse | null>(null);

  const saveKnockoutPredictions = async (
    predictionId: string,
    phase: MatchPhase,
    predictions: MatchPrediction[]
  ): Promise<SaveKnockoutPredictionsResponse> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("[useSaveKnockoutPredictions] Saving knockout predictions:", {
        predictionId,
        phase,
        predictionsCount: predictions.length,
      });

      const result = await saveKnockoutPredictionsUseCase.execute(
        predictionId,
        phase,
        predictions
      );

      console.log(
        "[useSaveKnockoutPredictions] Knockout predictions saved successfully:",
        {
          phase: result.phase,
          matchesSaved: result.matchesSaved,
          knockoutsCompleted: result.knockoutsCompleted,
          message: result.message,
        }
      );

      setSuccess(true);
      setLastResponse(result);

      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to save knockout predictions";

      console.error(
        "[useSaveKnockoutPredictions] Error saving knockout predictions:",
        err
      );

      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
    setLastResponse(null);
  };

  return {
    saveKnockoutPredictions,
    isLoading,
    error,
    success,
    lastResponse,
    reset,
  };
}
