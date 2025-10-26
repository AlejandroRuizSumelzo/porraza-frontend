"use client";

import { useState, useEffect } from "react";
import {
  useGetOrCreatePrediction,
  useSaveGroupPredictions,
} from "@/di/client/hooks/use-predictions";
import type { Prediction } from "@/domain/entities/prediction";
import type { PredictionRanking } from "@/domain/entities/prediction-ranking";
import type { MatchWithPrediction } from "@/domain/entities/match-with-prediction";
import type { MatchPrediction } from "@/domain/entities/match-prediction";

/**
 * Custom Hook: usePrediction (Client)
 *
 * Fetches or creates a prediction for a league using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Usage:
 * ```tsx
 * const { prediction, ranking, matches, isLoading, error, refetch, saveGroupPredictions, isSaving } = usePrediction(leagueId);
 * ```
 */

interface UsePredictionResult {
  prediction: Prediction | null;
  ranking: PredictionRanking | null;
  matches: MatchWithPrediction[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  saveGroupPredictions: (
    groupId: string,
    matchPredictions: MatchPrediction[]
  ) => Promise<void>;
  isSaving: boolean;
}

export function usePrediction(leagueId: string | null): UsePredictionResult {
  const getOrCreatePredictionUseCase = useGetOrCreatePrediction();
  const saveGroupPredictionsUseCase = useSaveGroupPredictions();

  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [ranking, setRanking] = useState<PredictionRanking | null>(null);
  const [matches, setMatches] = useState<MatchWithPrediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrediction = async () => {
    if (!leagueId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("[usePrediction] Fetching prediction from browser...", {
        leagueId,
      });

      const result = await getOrCreatePredictionUseCase.execute(leagueId);

      console.log("[usePrediction] Prediction fetched successfully:", {
        predictionId: result.prediction.id,
        totalPoints: result.prediction.totalPoints,
        matchesCount: result.matches.length,
      });

      setPrediction(result.prediction);
      setRanking(result.ranking);
      setMatches(result.matches);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch prediction";

      console.error("[usePrediction] Error fetching prediction:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const saveGroupPredictions = async (
    groupId: string,
    matchPredictions: MatchPrediction[]
  ) => {
    if (!leagueId) {
      throw new Error("League ID is required to save predictions");
    }

    setIsSaving(true);

    try {
      console.log("[usePrediction] Saving group predictions...", {
        leagueId,
        groupId,
        predictionsCount: matchPredictions.length,
      });

      const updatedPrediction = await saveGroupPredictionsUseCase.execute(
        leagueId,
        groupId,
        matchPredictions
      );

      console.log("[usePrediction] Group predictions saved successfully:", {
        predictionId: updatedPrediction.id,
        totalPoints: updatedPrediction.totalPoints,
      });

      // Update prediction state with new data
      setPrediction(updatedPrediction);

      // Refetch matches to get updated userPrediction data
      await fetchPrediction();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to save group predictions";

      console.error("[usePrediction] Error saving group predictions:", err);
      throw new Error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchPrediction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueId]);

  return {
    prediction,
    ranking,
    matches,
    isLoading,
    error,
    refetch: fetchPrediction,
    saveGroupPredictions,
    isSaving,
  };
}
