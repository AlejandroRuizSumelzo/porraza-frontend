"use client";

import { selectSelectedLeagueId } from "@/infrastructure/store/selectors";
import { useLeagueRankingClient } from "@/presentation/hooks/leagues/use-league-ranking-client";
import { RankingPageContent } from "@/presentation/components/ranking/ranking-page-content";

/**
 * Leaderboard/Ranking Page (Client Component)
 * Displays the league ranking/leaderboard using Clean Architecture pattern
 *
 * Architecture Flow:
 * Page (Client) → useLeagueRankingClient Hook → Use Cases → Repositories → HTTP Client → API
 *                                                                              ↓
 *                                                         Browser sends cookies automatically
 *
 * Design:
 * - Modern leaderboard with podium-style top 3 (gold, silver, bronze)
 * - Stats cards showing total members and active predictions
 * - Responsive table with avatars, badges, and completion indicators
 * - Real-time ranking with refetch functionality
 * - Color-coded completion status for groups, knockouts, and awards
 * - Sidebar toggle in header
 *
 * IMPORTANT: Client Component
 * - Requests are made from the BROWSER (not Next.js server)
 * - Cookies are sent automatically (authentication works correctly)
 * - HTTP client interceptor adds Authorization header
 * - Loading state is handled by loading.tsx (shows skeleton UI)
 *
 * Clean Architecture:
 * - Page component is THIN - only data fetching
 * - UI logic delegated to RankingPageContent
 * - Business logic in use cases
 * - HTTP logic in repositories
 */
export default function LeaderboardPage() {
  const selectedLeagueId = selectSelectedLeagueId();

  const { ranking, isLoading, error, refetch } = useLeagueRankingClient(
    selectedLeagueId || ""
  );

  return (
    <RankingPageContent
      ranking={ranking}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      selectedLeagueId={selectedLeagueId}
    />
  );
}
