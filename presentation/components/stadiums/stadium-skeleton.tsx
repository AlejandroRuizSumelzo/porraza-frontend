import { Card } from "@/presentation/components/ui/card";
import { Skeleton } from "@/presentation/components/ui/skeleton";

/**
 * Stadium Card Skeleton
 * Loading placeholder for stadium cards using shadcn/ui Skeleton component
 */
export function StadiumCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 bg-card">
      {/* Image Skeleton */}
      <Skeleton className="aspect-[16/9] rounded-none" />

      {/* Content Skeleton */}
      <div className="space-y-3 p-4">
        {/* Capacity */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Timezone */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    </Card>
  );
}

/**
 * Stadium Grid Skeleton
 * Loading state for the entire grid
 */
export function StadiumGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <StadiumCardSkeleton key={i} />
      ))}
    </div>
  );
}
