import { Skeleton } from "@/presentation/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/presentation/components/ui/card";

/**
 * Ranking Table Skeleton
 * Loading state for the ranking table
 * Shows skeleton rows with avatars and text placeholders
 */
export function RankingSkeleton() {
  return (
    <div className="space-y-4">
      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-28" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-32" />
          </CardContent>
        </Card>
      </div>

      {/* Table Skeleton */}
      <Card>
        <CardContent className="p-0">
          <div className="border-b p-4">
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="divide-y">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                {/* Position */}
                <Skeleton className="h-8 w-8 shrink-0 rounded-full" />

                {/* Avatar */}
                <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

                {/* Name and email */}
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>

                {/* Points */}
                <Skeleton className="h-6 w-16" />

                {/* Badges */}
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-12 rounded-full" />
                  <Skeleton className="h-5 w-12 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
