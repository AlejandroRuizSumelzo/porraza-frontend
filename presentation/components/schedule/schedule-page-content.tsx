"use client";

import {
  SidebarTrigger,
  useSidebar,
} from "@/presentation/components/ui/sidebar";
import type { MatchCalendar } from "@/domain/entities/match-calendar";
import { ScheduleHeader } from "@/presentation/components/schedule/schedule-header";
import { PhaseSection } from "@/presentation/components/schedule/phase-section";
import { ScheduleErrorState } from "@/presentation/components/schedule/schedule-error-state";

interface SchedulePageContentProps {
  calendar: MatchCalendar | null;
  error: string | null;
}

/**
 * Schedule Page Content Component (Client Component)
 * Wrapper component that handles sidebar state and renders schedule content
 *
 * This needs to be a Client Component because:
 * - Uses useSidebar hook from shadcn/ui
 * - Handles client-side sidebar toggle state
 *
 * The actual data fetching is done in the parent Server Component
 */
export function SchedulePageContent({
  calendar,
  error,
}: SchedulePageContentProps) {
  const { open } = useSidebar();

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {!open && <SidebarTrigger />}
        <h1 className="text-xl font-semibold">Calendario</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Error State */}
          {error && <ScheduleErrorState error={error} />}

          {/* Success State */}
          {!error && calendar && (
            <>
              {/* Header with Stats */}
              <ScheduleHeader calendar={calendar} />

              {/* Phases */}
              <div className="space-y-12">
                {calendar.calendar.map((phase) => (
                  <PhaseSection key={phase.phase} phaseData={phase} />
                ))}
              </div>
            </>
          )}

          {/* Empty State (shouldn't happen, but good practice) */}
          {!error && !calendar && (
            <div className="text-center text-muted-foreground">
              No hay partidos disponibles
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
