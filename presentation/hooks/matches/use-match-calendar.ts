import type { MatchCalendar } from "@/domain/entities/match-calendar";
import { httpClient } from "@/infrastructure/http/client";
import { createMatchRepository } from "@/di/server/factories/create-match-repository";
import { createGetMatchCalendarUseCase } from "@/di/server/factories/create-match-use-cases";

/**
 * Custom Hook: useMatchCalendar
 *
 * Encapsulates the business logic for fetching the complete match calendar
 * This is a SERVER-SIDE hook (async function, not React hook)
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute use case
 * - Handle errors gracefully
 * - Return data in a consistent format
 *
 * Usage in Server Components:
 * ```tsx
 * const { calendar, error } = await useMatchCalendar();
 *
 * if (error) {
 *   return <ErrorComponent message={error} />;
 * }
 *
 * if (!calendar) {
 *   return <LoadingComponent />;
 * }
 *
 * return <CalendarView calendar={calendar} />;
 * ```
 */

interface UseMatchCalendarResult {
  calendar: MatchCalendar | null;
  error: string | null;
}

export async function useMatchCalendar(): Promise<UseMatchCalendarResult> {
  try {
    // Dependency Injection
    const repository = createMatchRepository(httpClient);
    const getMatchCalendarUseCase = createGetMatchCalendarUseCase(repository);

    // Execute use case
    const calendar = await getMatchCalendarUseCase.execute();

    // Log for debugging (can be removed in production)
    console.log('[useMatchCalendar] Fetched calendar:', {
      total: calendar.total,
      phases: calendar.calendar.length,
    });

    return {
      calendar,
      error: null,
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to fetch match calendar";

    console.error("[useMatchCalendar] Error:", err);

    return {
      calendar: null,
      error: errorMessage,
    };
  }
}
