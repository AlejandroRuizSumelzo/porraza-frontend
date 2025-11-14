"use client";

import { useState, useEffect } from "react";
import {
  useGetOrCreatePrediction,
  useSaveGroupPredictions,
  useSaveKnockoutPredictions as useSaveKnockoutPredictionsUseCase,
} from "@/di/client/hooks/use-predictions";
import type { Prediction } from "@/domain/entities/prediction";
import type { PredictionRanking } from "@/domain/entities/prediction-ranking";
import type { MatchWithPrediction } from "@/domain/entities/match-with-prediction";
import type { MatchPrediction } from "@/domain/entities/match-prediction";
import type { GroupStanding } from "@/domain/entities/group-standing";
import type { BestThirdPlace } from "@/domain/entities/best-third-place";
import type { RoundOf32Match } from "@/domain/entities/round-of-32-match";
import type { Knockouts } from "@/domain/entities/knockouts";
import type { MatchPhase } from "@/domain/entities/match";

/**
 * Custom Hook: usePrediction (Client)
 *
 * Fetches or creates a prediction for a league using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Usage:
 * ```tsx
 * const { prediction, ranking, matches, isLoading, error, refetch, saveGroupPredictions, isSaving, bestThirdPlaces, roundOf32Matches, knockouts } = usePrediction(leagueId);
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
  saveKnockoutPredictions: (
    phase: MatchPhase,
    matchPredictions: MatchPrediction[]
  ) => Promise<void>;
  isSaving: boolean;
  bestThirdPlaces: BestThirdPlace[] | null;
  roundOf32Matches: RoundOf32Match[] | null;
  knockouts: Knockouts | null;
}

export function usePrediction(leagueId: string | null): UsePredictionResult {
  const getOrCreatePredictionUseCase = useGetOrCreatePrediction();
  const saveGroupPredictionsUseCase = useSaveGroupPredictions();
  const saveKnockoutPredictionsUseCaseInstance =
    useSaveKnockoutPredictionsUseCase();

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
  const [knockouts, setKnockouts] = useState<Knockouts | null>(null);

  const fetchPrediction = async () => {
    if (!leagueId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getOrCreatePredictionUseCase.execute(leagueId);

      setPrediction(result.prediction);
      setRanking(result.ranking);
      setMatches(result.matches);

      if (result.bestThirdPlaces) {
        setBestThirdPlaces(result.bestThirdPlaces);
      }

      if (result.roundOf32Matches) {
        setRoundOf32Matches(result.roundOf32Matches);
      }

      if (result.knockouts) {
        setKnockouts(result.knockouts);
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
      const result = await saveGroupPredictionsUseCase.execute(
        leagueId,
        groupId,
        matchPredictions,
        groupStandings
      );

      setPrediction(result.prediction);

      if (result.bestThirdPlaces) {
        setBestThirdPlaces(result.bestThirdPlaces);
      }

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

  const saveKnockoutPredictions = async (
    phase: MatchPhase,
    matchPredictions: MatchPrediction[]
  ) => {
    if (!prediction?.id) {
      throw new Error("Prediction ID is required to save knockout predictions");
    }

    setIsSaving(true);

    try {
      await saveKnockoutPredictionsUseCaseInstance.execute(
        prediction.id,
        phase,
        matchPredictions
      );

      await fetchPrediction();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to save knockout predictions";

      console.error("[usePrediction] Error saving knockout predictions:", err);
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
    saveKnockoutPredictions,
    isSaving,
    bestThirdPlaces,
    roundOf32Matches,
    knockouts,
  };
}
