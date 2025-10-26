"use client";

import { useDependencies } from "@/di/client/hooks/use-dependencies";

/**
 * Use Get Players By Team Hook
 * Access the GetPlayersByTeamUseCase from the DI container
 *
 * @returns GetPlayersByTeamUseCase instance
 *
 * @example
 * ```tsx
 * const getPlayersByTeamUseCase = useGetPlayersByTeam();
 * const players = await getPlayersByTeamUseCase.execute(teamId);
 * ```
 */
export function useGetPlayersByTeam() {
  const { getPlayersByTeamUseCase } = useDependencies();
  return getPlayersByTeamUseCase;
}

/**
 * Use Get All Goalkeepers Hook
 * Access the GetAllGoalkeepersUseCase from the DI container
 *
 * @returns GetAllGoalkeepersUseCase instance
 *
 * @example
 * ```tsx
 * const getAllGoalkeepersUseCase = useGetAllGoalkeepers();
 * const goalkeepers = await getAllGoalkeepersUseCase.execute();
 * ```
 */
export function useGetAllGoalkeepers() {
  const { getAllGoalkeepersUseCase } = useDependencies();
  return getAllGoalkeepersUseCase;
}
