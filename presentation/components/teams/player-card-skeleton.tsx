import { Card } from "@/presentation/components/ui/card";
import { Skeleton } from "@/presentation/components/ui/skeleton";

/**
 * Player Card Skeleton
 * Loading state for player cards - matches the updated PlayerCard design
 */
export function PlayerCardSkeleton() {
  return (
    <Card className="relative overflow-hidden border-2">
      {/* Position indicator line skeleton */}
      <Skeleton className="absolute top-0 left-0 right-0 h-1" />

      <div className="flex flex-col items-center gap-3 p-4 pt-5">
        {/* Avatar with badge skeleton */}
        <div className="relative">
          <Skeleton className="h-20 w-20 sm:h-24 sm:w-24 rounded-full" />

          {/* Jersey number badge skeleton */}
          <Skeleton className="absolute -bottom-1.5 -right-1.5 h-7 w-7 rounded-full" />
        </div>

        {/* Player info skeleton */}
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-5 w-12 mx-auto rounded-full" />
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
