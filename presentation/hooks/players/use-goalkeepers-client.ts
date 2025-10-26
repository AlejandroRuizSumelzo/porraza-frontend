"use client";

import { useState, useEffect } from "react";
import { useGetAllGoalkeepers } from "@/di/client/hooks/use-players";
import type { Player } from "@/domain/entities/player";

/**
 * Custom Hook: useGoalkeepers (Client)
 *
 * Fetches all goalkeepers from all teams using Clean Architecture pattern
 * Used for Golden Glove award selection
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
 * const { goalkeepers, isLoading, error } = useGoalkeepers();
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!goalkeepers || goalkeepers.length === 0) return <EmptyState />;
 *
 * return <GoalkeeperList goalkeepers={goalkeepers} />;
 * ```
 *
 * IMPORTANT: This hook makes requests from the BROWSER, not the server
 * - Cookies are sent automatically with credentials: 'include'
 * - Authorization header is added automatically by HTTP client interceptor
 * - Token refresh is handled automatically
 */

interface UseGoalkeepersResult {
  /**
   * The fetched goalkeepers from all teams
   */
  goalkeepers: Player[] | null;

  /**
   * Loading state during fetch
   */
  isLoading: boolean;

  /**
   * Error message if fetch fails
   */
  error: string | null;

  /**
   * Refetch the goalkeepers
   */
  refetch: () => Promise<void>;
}

export function useGoalkeepers(): UseGoalkeepersResult {
  const getAllGoalkeepersUseCase = useGetAllGoalkeepers();

  const [goalkeepers, setGoalkeepers] = useState<Player[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoalkeepers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("[useGoalkeepers] Fetching goalkeepers from browser...");

      const result = await getAllGoalkeepersUseCase.execute();

      console.log("[useGoalkeepers] Goalkeepers fetched successfully:", {
        total: result.length,
      });

      setGoalkeepers(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch goalkeepers";

      console.error("[useGoalkeepers] Error fetching goalkeepers:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoalkeepers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    goalkeepers,
    isLoading,
    error,
    refetch: fetchGoalkeepers,
  };
}
