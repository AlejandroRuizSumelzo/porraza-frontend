import { Skeleton } from "@/presentation/components/ui/skeleton";
import { Card, CardContent } from "@/presentation/components/ui/card";

/**
 * Predictions Page Loading State
 * Automatically shown by Next.js while the page is loading
 * Uses shadcn/ui Skeleton component for consistent loading states
 * Matches the layout with header, tabs, and prediction cards
 */
export default function PredictionsLoading() {
  return (
    <div className="flex h-full flex-col">
      {/* Header Skeleton */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <Skeleton className="h-5 w-32" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-5xl">
          {/* Tabs Skeleton */}
          <div className="mb-6 flex gap-2">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
          </div>

          {/* Content Area */}
          <div className="space-y-4 sm:space-y-6">
            {/* Info Card Skeleton */}
            <Card className="border-primary/20">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Skeleton className="mt-0.5 size-4 shrink-0 sm:size-5" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Badge Skeleton */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Skeleton className="h-6 w-32" />
            </div>

            {/* Group Selector Skeleton - Mobile */}
            <div className="grid grid-cols-4 gap-2 sm:hidden">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-9 w-full" />
              ))}
            </div>

            {/* Group Selector Skeleton - Desktop */}
            <div className="hidden gap-2 sm:flex">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="h-10 flex-1" />
              ))}
            </div>

            {/* Current Group Stats Skeleton */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Skeleton className="h-6 w-32" />
            </div>

            {/* FieldSet Header Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-48" />

              {/* Match Prediction Cards Skeleton */}
              <div className="space-y-2.5 sm:space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden border bg-card">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        {/* Teams Section */}
                        <div className="flex flex-1 items-center gap-2 sm:gap-3">
                          {/* Home Team */}
                          <div className="flex flex-1 items-center gap-2 sm:gap-3">
                            <Skeleton className="size-8 shrink-0 rounded-full sm:size-10" />
                            <Skeleton className="h-4 w-20 sm:w-24" />
                          </div>

                          {/* Score Inputs */}
                          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                            <Skeleton className="h-9 w-12 sm:h-10 sm:w-14" />
                            <Skeleton className="h-4 w-3" />
                            <Skeleton className="h-9 w-12 sm:h-10 sm:w-14" />
                          </div>

                          {/* Away Team */}
                          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
                            <Skeleton className="h-4 w-20 sm:w-24" />
                            <Skeleton className="size-8 shrink-0 rounded-full sm:size-10" />
                          </div>
                        </div>

                        {/* Match Info */}
                        <div className="flex items-center gap-2 border-t pt-2 sm:w-48 sm:shrink-0 sm:justify-end sm:border-0 sm:pt-0">
                          <Skeleton className="h-3 w-full sm:w-32" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Save Button Skeleton */}
            <div className="sticky bottom-4 flex justify-center pt-4 sm:bottom-6">
              <Skeleton className="h-11 w-full sm:w-48" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
