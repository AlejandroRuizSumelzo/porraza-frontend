"use client";

import { useState, useEffect } from "react";
import { useGetAllStadiums } from "@/di/client/hooks/use-stadiums";
import type { Stadium } from "@/domain/entities/stadium";

/**
 * Custom Hook: useStadiums (Client)
 *
 * Fetches all stadiums from the API using Clean Architecture pattern
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
 * const { stadiums, isLoading, error } = useStadiums();
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!stadiums || stadiums.length === 0) return <EmptyState />;
 *
 * return <StadiumGrid stadiums={stadiums} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 * - Token refresh is handled automatically
 */

interface UseStadiumsResult {
  /**
   * The fetched stadiums
   */
  stadiums: Stadium[] | null;

  /**
   * Loading state during fetch
   */
  isLoading: boolean;

  /**
   * Error message if fetch fails
   */
  error: string | null;

  /**
   * Refetch the stadiums
   */
  refetch: () => Promise<void>;
}

export function useStadiums(): UseStadiumsResult {
  const getAllStadiumsUseCase = useGetAllStadiums();

  const [stadiums, setStadiums] = useState<Stadium[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStadiums = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("[useStadiums] Fetching stadiums from browser...");

      const result = await getAllStadiumsUseCase.execute();

      console.log("[useStadiums] Stadiums fetched successfully:", {
        total: result.length,
      });

      setStadiums(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch stadiums";

      console.error("[useStadiums] Error fetching stadiums:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStadiums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    stadiums,
    isLoading,
    error,
    refetch: fetchStadiums,
  };
}
