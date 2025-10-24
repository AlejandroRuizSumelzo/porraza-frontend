"use client";

import { useDependencies } from "@/di/client/hooks/use-dependencies";

/**
 * Use Get All Stadiums Hook
 * Access the GetAllStadiumsUseCase from the DI container
 *
 * @returns GetAllStadiumsUseCase instance
 *
 * @example
 * ```tsx
 * const getAllStadiumsUseCase = useGetAllStadiums();
 * const stadiums = await getAllStadiumsUseCase.execute();
 * ```
 */
export function useGetAllStadiums() {
  const { getAllStadiumsUseCase } = useDependencies();
  return getAllStadiumsUseCase;
}
