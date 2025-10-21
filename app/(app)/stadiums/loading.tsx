import { StadiumGridSkeleton } from "@/presentation/components/stadiums";
import { Skeleton } from "@/presentation/components/ui/skeleton";

/**
 * Stadiums Page Loading State
 * Automatically shown by Next.js while the page is loading
 * Uses shadcn/ui Skeleton component for consistent loading states
 * Matches the new layout with header and sidebar toggle
 */
export default function StadiumsLoading() {
  return (
    <div className="flex h-full flex-col">
      {/* Header Skeleton */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <Skeleton className="h-5 w-20" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Stats Skeleton */}
          <div className="space-y-6">
            <div>
              <Skeleton className="h-10 w-48" />
              <Skeleton className="mt-2 h-5 w-96 max-w-full" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-lg border bg-card p-4"
                >
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-7 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid Skeleton */}
          <StadiumGridSkeleton count={9} />
        </div>
      </main>
    </div>
  );
}
