import { Skeleton } from "@/presentation/components/ui/skeleton";
import { Card } from "@/presentation/components/ui/card";

/**
 * Match Card Skeleton
 * Loading state for individual match card
 */
export function MatchCardSkeleton() {
  return (
    <Card className="overflow-hidden border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-20" />
      </div>

      {/* Teams & Score */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Home Team */}
          <div className="flex flex-1 items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* Score */}
          <Skeleton className="h-8 w-16" />

          {/* Away Team */}
          <div className="flex flex-1 items-center gap-3">
            <div className="flex-1 space-y-2 text-right">
              <Skeleton className="ml-auto h-4 w-32" />
              <Skeleton className="ml-auto h-3 w-16" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        {/* Stadium & Time */}
        <div className="mt-4 space-y-2 border-t pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </Card>
  );
}

/**
 * Phase Section Skeleton
 * Loading state for phase section with multiple matches
 */
export function PhaseSectionSkeleton({ matchCount = 2 }: { matchCount?: number }) {
  return (
    <section className="space-y-4">
      {/* Phase Header */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {Array.from({ length: matchCount }).map((_, i) => (
          <MatchCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

/**
 * Schedule Grid Skeleton
 * Loading state for entire schedule
 */
export function ScheduleGridSkeleton({ phaseCount = 3 }: { phaseCount?: number }) {
  return (
    <div className="space-y-8">
      {Array.from({ length: phaseCount }).map((_, i) => (
        <PhaseSectionSkeleton key={i} matchCount={i === 0 ? 4 : 2} />
      ))}
    </div>
  );
}
