"use client";

import { useDependencies } from "@/di/client/hooks/use-dependencies";

/**
 * Use Get Match Calendar Hook
 * Access the GetMatchCalendarUseCase from the DI container
 *
 * @returns GetMatchCalendarUseCase instance
 *
 * @example
 * ```tsx
 * const getMatchCalendarUseCase = useGetMatchCalendar();
 * const calendar = await getMatchCalendarUseCase.execute();
 * ```
 */
export function useGetMatchCalendar() {
  const { getMatchCalendarUseCase } = useDependencies();
  return getMatchCalendarUseCase;
}
