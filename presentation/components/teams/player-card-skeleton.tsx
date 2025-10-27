import { Card } from "@/presentation/components/ui/card";
import { Skeleton } from "@/presentation/components/ui/skeleton";

/**
 * Player Card Skeleton
 * Loading state for player cards
 */
export function PlayerCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col items-center gap-3 p-4">
        {/* Avatar Skeleton */}
        <Skeleton className="h-16 w-16 rounded-full" />

        {/* Name Skeleton */}
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-16 mx-auto" />
        </div>
      </div>
    </Card>
  );
}

/**
 * Player Cards Grid Skeleton
 * Shows a grid of loading player cards
 */
interface PlayerCardsGridSkeletonProps {
  count?: number;
}

export function PlayerCardsGridSkeleton({
  count = 12,
}: PlayerCardsGridSkeletonProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <PlayerCardSkeleton key={i} />
      ))}
    </div>
  );
}
