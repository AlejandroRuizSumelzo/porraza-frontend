import { LeagueTabsSkeleton } from "@/presentation/components/leagues/league-skeleton";
import { Skeleton } from "@/presentation/components/ui/skeleton";

/**
 * Leagues Page Loading State
 * Automatically shown by Next.js while the page is loading
 * Uses shadcn/ui Skeleton component for consistent loading states
 * Matches the leagues page structure with header, tabs, and content
 */
export default function LeaguesLoading() {
  return (
    <div className="flex h-full flex-col">
      {/* Header Skeleton */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <Skeleton className="h-5 w-32" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-4xl">
          <LeagueTabsSkeleton />
        </div>
      </main>
    </div>
  );
}
