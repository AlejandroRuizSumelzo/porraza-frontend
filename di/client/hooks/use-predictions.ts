"use client";

import { useDependencies } from "@/di/client/hooks/use-dependencies";

/**
 * Use Get Or Create Prediction Hook
 * Access the GetOrCreatePredictionUseCase from the DI container
 *
 * @example
 * ```tsx
 * const getOrCreatePredictionUseCase = useGetOrCreatePrediction();
 * const result = await getOrCreatePredictionUseCase.execute(leagueId);
 * ```
 */
export function useGetOrCreatePrediction() {
  const { getOrCreatePredictionUseCase } = useDependencies();
  return getOrCreatePredictionUseCase;
}

/**
 * Use Save Group Predictions Hook
 * Access the SaveGroupPredictionsUseCase from the DI container
 *
 * @example
 * ```tsx
 * const saveGroupPredictionsUseCase = useSaveGroupPredictions();
 * const prediction = await saveGroupPredictionsUseCase.execute(leagueId, groupId, matchPredictions);
 * ```
 */
export function useSaveGroupPredictions() {
  const { saveGroupPredictionsUseCase } = useDependencies();
  return saveGroupPredictionsUseCase;
}

/**
 * Use Update Awards Hook
 * Access the UpdateAwardsUseCase from the DI container
 *
 * @example
 * ```tsx
 * const updateAwardsUseCase = useUpdateAwards();
 * const prediction = await updateAwardsUseCase.execute(predictionId, params);
 * ```
 */
export function useUpdateAwards() {
  const { updateAwardsUseCase } = useDependencies();
  return updateAwardsUseCase;
}

/**
 * Use Update Champion Hook
 * Access the UpdateChampionUseCase from the DI container
 *
 * @example
 * ```tsx
 * const updateChampionUseCase = useUpdateChampion();
 * const prediction = await updateChampionUseCase.execute(predictionId, championTeamId);
 * ```
 */
export function useUpdateChampion() {
  const { updateChampionUseCase } = useDependencies();
  return updateChampionUseCase;
}

/**
 * Use Get Prediction Stats Hook
 * Access the GetPredictionStatsUseCase from the DI container
 *
 * @example
 * ```tsx
 * const getPredictionStatsUseCase = useGetPredictionStats();
 * const stats = await getPredictionStatsUseCase.execute(predictionId);
 * ```
 */
export function useGetPredictionStats() {
  const { getPredictionStatsUseCase } = useDependencies();
  return getPredictionStatsUseCase;
}
