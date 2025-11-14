import { RankingSkeleton } from "@/presentation/components/ranking/ranking-skeleton";
import { Skeleton } from "@/presentation/components/ui/skeleton";
import { Trophy } from "lucide-react";

/**
 * Leaderboard Page Loading State
 * Automatically shown by Next.js while the page is loading
 * Uses shadcn/ui Skeleton component for consistent loading states
 * Matches the leaderboard page structure with header and ranking table
 */
export default function LeaderboardLoading() {
  return (
    <div className="flex h-full flex-col">
      {/* Header Skeleton */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <Trophy className="h-5 w-5 text-muted-foreground" />
        <Skeleton className="h-6 w-32" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-5xl">
          <RankingSkeleton />
        </div>
      </main>
    </div>
  );
}
