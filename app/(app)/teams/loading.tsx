import { Skeleton } from "@/presentation/components/ui/skeleton";

/**
 * Teams Page Loading State
 * Automatically shown by Next.js while the page is loading
 * Uses shadcn/ui Skeleton component for consistent loading states
 * Matches the layout with header and sidebar toggle
 */
export default function TeamsLoading() {
  return (
    <div className="flex h-full flex-col">
      {/* Header Skeleton */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <Skeleton className="h-5 w-28" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header Card Skeleton */}
          <div className="rounded-lg border bg-card p-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Teams List Skeleton */}
          <div className="rounded-lg border bg-card p-6">
            <Skeleton className="h-5 w-40 mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-md border p-3"
                >
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
