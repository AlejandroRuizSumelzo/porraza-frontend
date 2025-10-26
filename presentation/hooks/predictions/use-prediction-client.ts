"use client";

import { useState, useEffect } from "react";
import { useGetOrCreatePrediction } from "@/di/client/hooks/use-predictions";
import type { Prediction } from "@/domain/entities/prediction";
import type { PredictionRanking } from "@/domain/entities/prediction-ranking";

/**
 * Custom Hook: usePrediction (Client)
 *
 * Fetches or creates a prediction for a league using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Usage:
 * ```tsx
 * const { prediction, ranking, isLoading, error, refetch } = usePrediction(leagueId);
 * ```
 */

interface UsePredictionResult {
  prediction: Prediction | null;
  ranking: PredictionRanking | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePrediction(leagueId: string | null): UsePredictionResult {
  const getOrCreatePredictionUseCase = useGetOrCreatePrediction();

  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [ranking, setRanking] = useState<PredictionRanking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
      });

      setPrediction(result.prediction);
      setRanking(result.ranking);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch prediction";

      console.error("[usePrediction] Error fetching prediction:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueId]);

  return {
    prediction,
    ranking,
    isLoading,
    error,
    refetch: fetchPrediction,
  };
}
