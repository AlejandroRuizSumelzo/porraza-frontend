"use client";

import { useDependencies } from "@/di/client/hooks/use-dependencies";

/**
 * Use Get All Teams Hook
 * Access the GetAllTeamsUseCase from the DI container
 *
 * @returns GetAllTeamsUseCase instance
 *
 * @example
 * ```tsx
 * const getAllTeamsUseCase = useGetAllTeams();
 * const teams = await getAllTeamsUseCase.execute();
 * ```
 */
export function useGetAllTeams() {
  const { getAllTeamsUseCase } = useDependencies();
  return getAllTeamsUseCase;
}

/**
 * Use Get Team By ID Hook
 * Access the GetTeamByIdUseCase from the DI container
 *
 * @returns GetTeamByIdUseCase instance
 *
 * @example
 * ```tsx
 * const getTeamByIdUseCase = useGetTeamById();
 * const team = await getTeamByIdUseCase.execute(teamId);
 * ```
 */
export function useGetTeamById() {
  const { getTeamByIdUseCase } = useDependencies();
  return getTeamByIdUseCase;
}
