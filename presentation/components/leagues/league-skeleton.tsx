import { Card, CardContent } from "@/presentation/components/ui/card";
import { Skeleton } from "@/presentation/components/ui/skeleton";

/**
 * League Card Skeleton
 * Loading placeholder for league cards
 */
export function LeagueCardSkeleton() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-4 w-full max-w-md" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="ml-4 h-10 w-28" />
      </CardContent>
    </Card>
  );
}

/**
 * League Grid Skeleton
 * Loading state for league list
 */
export function LeagueGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <LeagueCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * League Tabs Skeleton
 * Full page skeleton with tabs structure
 */
export function LeagueTabsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Tabs Skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>

      {/* Content Skeleton */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>

      {/* League List Skeleton */}
      <LeagueGridSkeleton count={4} />
    </div>
  );
}
