"use client";

import { useState, useEffect } from "react";
import { useGetPredictionStats } from "@/di/client/hooks/use-predictions";
import type { PredictionStats } from "@/domain/entities/prediction-stats";

/**
 * Custom Hook: usePredictionStats (Client)
 *
 * Fetches prediction statistics (completion percentage, etc.)
 */

interface UsePredictionStatsResult {
  stats: PredictionStats | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePredictionStats(
  predictionId: string | null
): UsePredictionStatsResult {
  const getPredictionStatsUseCase = useGetPredictionStats();

  const [stats, setStats] = useState<PredictionStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    if (!predictionId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getPredictionStatsUseCase.execute(predictionId);
      setStats(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch stats";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [predictionId]);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
  };
}
