"use client";

import { useState } from "react";
import { useUpdateAwards } from "@/di/client/hooks/use-predictions";
import type { Prediction } from "@/domain/entities/prediction";
import type { UpdateAwardsParams } from "@/domain/use-cases/predictions/update-awards-use-case";

/**
 * Custom Hook: useUpdateAwardsClient
 *
 * Updates individual awards (Golden Boot, Ball, Glove)
 * This is a mutation hook for Client Components
 */

interface UseUpdateAwardsResult {
  updateAwards: (
    predictionId: string,
    params: UpdateAwardsParams
  ) => Promise<Prediction | null>;
  isLoading: boolean;
  error: string | null;
}

export function useUpdateAwardsClient(): UseUpdateAwardsResult {
  const updateAwardsUseCase = useUpdateAwards();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateAwards = async (
    predictionId: string,
    params: UpdateAwardsParams
  ): Promise<Prediction | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await updateAwardsUseCase.execute(predictionId, params);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update awards";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateAwards,
    isLoading,
    error,
  };
}
