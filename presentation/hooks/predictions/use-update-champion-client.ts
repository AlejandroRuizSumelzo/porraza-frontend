"use client";

import { useState } from "react";
import { useUpdateChampion } from "@/di/client/hooks/use-predictions";
import type { Prediction } from "@/domain/entities/prediction";

/**
 * Custom Hook: useUpdateChampionClient
 *
 * Updates the predicted champion team
 * This is a mutation hook for Client Components
 */

interface UseUpdateChampionResult {
  updateChampion: (
    predictionId: string,
    championTeamId: string
  ) => Promise<Prediction | null>;
  isLoading: boolean;
  error: string | null;
}

export function useUpdateChampionClient(): UseUpdateChampionResult {
  const updateChampionUseCase = useUpdateChampion();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateChampion = async (
    predictionId: string,
    championTeamId: string
  ): Promise<Prediction | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await updateChampionUseCase.execute(
        predictionId,
        championTeamId
      );
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update champion";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateChampion,
    isLoading,
    error,
  };
}
