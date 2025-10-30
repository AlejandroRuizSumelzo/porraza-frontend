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
import type { GroupStanding } from "@/domain/entities/group-standing";
import type { BestThirdPlace } from "@/domain/entities/best-third-place";
import type { RoundOf32Match } from "@/domain/entities/round-of-32-match";

/**
 * Custom Hook: usePrediction (Client)
 *
 * Fetches or creates a prediction for a league using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Usage:
 * ```tsx
 * const { prediction, ranking, matches, isLoading, error, refetch, saveGroupPredictions, isSaving, bestThirdPlaces, roundOf32Matches } = usePrediction(leagueId);
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
    matchPredictions: MatchPrediction[],
    groupStandings: GroupStanding[]
  ) => Promise<void>;
  isSaving: boolean;
  bestThirdPlaces: BestThirdPlace[] | null;
  roundOf32Matches: RoundOf32Match[] | null;
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
  const [bestThirdPlaces, setBestThirdPlaces] = useState<
    BestThirdPlace[] | null
  >(null);
  const [roundOf32Matches, setRoundOf32Matches] = useState<
    RoundOf32Match[] | null
  >(null);

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
        hasBestThirdPlaces: !!result.bestThirdPlaces,
        bestThirdPlacesCount: result.bestThirdPlaces?.length,
        hasRoundOf32Matches: !!result.roundOf32Matches,
        roundOf32MatchesCount: result.roundOf32Matches?.length,
      });

      setPrediction(result.prediction);
      setRanking(result.ranking);
      setMatches(result.matches);

      // Set bestThirdPlaces if present (only when all 12 groups are completed)
      if (result.bestThirdPlaces) {
        setBestThirdPlaces(result.bestThirdPlaces);
      }

      // Set roundOf32Matches if present (only when all 12 groups are completed)
      if (result.roundOf32Matches) {
        setRoundOf32Matches(result.roundOf32Matches);
      }
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
    matchPredictions: MatchPrediction[],
    groupStandings: GroupStanding[]
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
        standingsCount: groupStandings.length,
      });

      const result = await saveGroupPredictionsUseCase.execute(
        leagueId,
        groupId,
        matchPredictions,
        groupStandings
      );

      console.log("[usePrediction] Group predictions saved successfully:", {
        predictionId: result.prediction.id,
        totalPoints: result.prediction.totalPoints,
        hasBestThirdPlaces: !!result.bestThirdPlaces,
        bestThirdPlacesCount: result.bestThirdPlaces?.length,
      });

      // Update prediction state with new data
      setPrediction(result.prediction);

      // Update bestThirdPlaces if returned (all 12 groups completed)
      if (result.bestThirdPlaces) {
        setBestThirdPlaces(result.bestThirdPlaces);
        console.log(
          "[usePrediction] All groups completed! Best third places calculated:",
          {
            count: result.bestThirdPlaces.length,
          }
        );
      }

      // Refetch matches to get updated userPrediction data
      await fetchPrediction();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save group predictions";

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
    bestThirdPlaces,
    roundOf32Matches,
  };
}
