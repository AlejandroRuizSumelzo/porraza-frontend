"use client";

import { useState, useEffect } from "react";
import { useGetMatchCalendar } from "@/di/client/hooks/use-matches";
import type { MatchCalendar } from "@/domain/entities/match-calendar";

/**
 * Custom Hook: useMatchCalendar (Client)
 *
 * Fetches match calendar from the API using Clean Architecture pattern
 * This is a CLIENT-SIDE React hook for use in Client Components
 *
 * Responsibilities:
 * - Setup dependency injection
 * - Execute use case
 * - Handle loading, error, and success states
 * - Provide easy-to-use API for components
 *
 * Usage in Client Components:
 * ```tsx
 * const { calendar, isLoading, error } = useMatchCalendar();
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!calendar) return <EmptyState />;
 *
 * return <CalendarView calendar={calendar} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 * - Token refresh is handled automatically
 */

interface UseMatchCalendarResult {
  /**
   * The fetched match calendar
   */
  calendar: MatchCalendar | null;

  /**
   * Loading state during fetch
   */
  isLoading: boolean;

  /**
   * Error message if fetch fails
   */
  error: string | null;

  /**
   * Refetch the calendar
   */
  refetch: () => Promise<void>;
}

export function useMatchCalendar(): UseMatchCalendarResult {
  const getMatchCalendarUseCase = useGetMatchCalendar();

  const [calendar, setCalendar] = useState<MatchCalendar | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCalendar = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("[useMatchCalendar] Fetching calendar from browser...");

      const result = await getMatchCalendarUseCase.execute();

      console.log("[useMatchCalendar] Calendar fetched successfully:", {
        total: result.total,
        phases: result.calendar.length,
      });

      setCalendar(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch match calendar";

      console.error("[useMatchCalendar] Error fetching calendar:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    calendar,
    isLoading,
    error,
    refetch: fetchCalendar,
  };
}
