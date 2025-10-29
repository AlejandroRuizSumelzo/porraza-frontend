"use client";

import { useState } from "react";
import { useSaveGroupPredictions } from "@/di/client/hooks/use-predictions";
import type { MatchPrediction } from "@/domain/entities/match-prediction";
import type { GroupStanding } from "@/domain/entities/group-standing";
import type { SaveGroupPredictionsResponse } from "@/domain/repositories/prediction-repository";

/**
 * Custom Hook: useSaveGroupPredictionsClient
 *
 * Saves match predictions for a group (6 matches) and group standings (4 teams)
 * This is a mutation hook for Client Components
 *
 * Usage:
 * ```tsx
 * const { saveGroupPredictions, isLoading, error } = useSaveGroupPredictionsClient();
 *
 * await saveGroupPredictions(leagueId, groupId, matchPredictions, groupStandings);
 * ```
 */

interface UseSaveGroupPredictionsResult {
  saveGroupPredictions: (
    leagueId: string,
    groupId: string,
    matchPredictions: MatchPrediction[],
    groupStandings: GroupStanding[]
  ) => Promise<SaveGroupPredictionsResponse | null>;
  isLoading: boolean;
  error: string | null;
}

export function useSaveGroupPredictionsClient(): UseSaveGroupPredictionsResult {
  const saveGroupPredictionsUseCase = useSaveGroupPredictions();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveGroupPredictions = async (
    leagueId: string,
    groupId: string,
    matchPredictions: MatchPrediction[],
    groupStandings: GroupStanding[]
  ): Promise<SaveGroupPredictionsResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("[useSaveGroupPredictions] Saving group predictions...", {
        leagueId,
        groupId,
        matchCount: matchPredictions.length,
        standingsCount: groupStandings.length,
      });

      const result = await saveGroupPredictionsUseCase.execute(
        leagueId,
        groupId,
        matchPredictions,
        groupStandings
      );

      console.log("[useSaveGroupPredictions] Predictions saved successfully:", {
        predictionId: result.prediction.id,
        hasBestThirdPlaces: !!result.bestThirdPlaces,
        bestThirdPlacesCount: result.bestThirdPlaces?.length,
      });

      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save group predictions";

      console.error("[useSaveGroupPredictions] Error:", err);
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveGroupPredictions,
    isLoading,
    error,
  };
}
