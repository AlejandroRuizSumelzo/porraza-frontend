"use client";

import { useState, useMemo } from "react";
import {
  SidebarTrigger,
  useSidebar,
} from "@/presentation/components/ui/sidebar";
import type { MatchCalendar } from "@/domain/entities/match-calendar";
import { ScheduleHeader } from "./schedule-header";
import { PhaseSection } from "./phase-section";
import { ScheduleErrorState } from "./schedule-error-state";
import { GroupFilter } from "./group-filter";

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
 * - Manages filter state (selectedGroups)
 *
 * The actual data fetching is done in the parent Server Component
 */
export function SchedulePageContent({
  calendar,
  error,
}: SchedulePageContentProps) {
  const { open, isMobile } = useSidebar();

  // Filter state: Set of selected groups (e.g., Set(["A", "B"]))
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());

  // Extract unique groups from GROUP_STAGE phase
  const availableGroups = useMemo(() => {
    if (!calendar) return [];

    const groupStagePhase = calendar.calendar.find(
      (phase) => phase.phase === "GROUP_STAGE"
    );

    if (!groupStagePhase) return [];

    // Get unique groups and sort alphabetically
    const groups = new Set<string>();
    groupStagePhase.matches.forEach((match) => {
      if (match.group) {
        groups.add(match.group);
      }
    });

    return Array.from(groups).sort();
  }, [calendar]);

  // Filter calendar by selected groups
  const filteredCalendar = useMemo(() => {
    if (!calendar || selectedGroups.size === 0) {
      return calendar; // Show all if no filter selected
    }

    // Filter each phase's matches
    return {
      ...calendar,
      calendar: calendar.calendar.map((phase) => ({
        ...phase,
        matches: phase.matches.filter((match) => {
          // If match has no group (knockout stages), always show
          if (!match.group) return true;

          // Otherwise, check if group is selected
          return selectedGroups.has(match.group);
        }),
      })),
    };
  }, [calendar, selectedGroups]);

  // Toggle group selection
  const handleToggleGroup = (group: string) => {
    setSelectedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(group)) {
        newSet.delete(group);
      } else {
        newSet.add(group);
      }
      return newSet;
    });
  };

  // Clear all filters
  const handleClearAll = () => {
    setSelectedGroups(new Set());
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {(isMobile || !open) && <SidebarTrigger />}
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

              {/* Group Filter */}
              {availableGroups.length > 0 && (
                <GroupFilter
                  availableGroups={availableGroups}
                  selectedGroups={selectedGroups}
                  onToggleGroup={handleToggleGroup}
                  onClearAll={handleClearAll}
                />
              )}

              {/* Phases - Filtered */}
              <div className="space-y-12">
                {filteredCalendar?.calendar.map((phase) => {
                  // Only render phase if it has matches after filtering
                  if (phase.matches.length === 0) return null;

                  return <PhaseSection key={phase.phase} phaseData={phase} />;
                })}
              </div>

              {/* Empty State after filtering */}
              {filteredCalendar?.calendar.every(
                (phase) => phase.matches.length === 0
              ) && (
                <div className="rounded-lg border border-dashed bg-muted/30 p-12 text-center">
                  <p className="text-lg font-medium text-muted-foreground">
                    No hay partidos para los grupos seleccionados
                  </p>
                  <button
                    onClick={handleClearAll}
                    className="mt-4 text-sm text-primary hover:underline"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
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
