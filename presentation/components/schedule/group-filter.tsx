"use client";

import { Card } from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";
import { Separator } from "@/presentation/components/ui/separator";
import { X, Filter } from "lucide-react";
import { cn } from "@/presentation/lib/utils";

interface GroupFilterProps {
  availableGroups: string[];
  selectedGroups: Set<string>;
  onToggleGroup: (group: string) => void;
  onClearAll: () => void;
}

/**
 * Group Filter Component (Enhanced)
 * Modern, responsive filter with Card wrapper and improved UX
 *
 * Features:
 * - Card wrapper for visual consistency
 * - Full-width responsive grid (mobile: 4 cols, tablet: 6 cols, desktop: 12 cols)
 * - Large touch-friendly badges on mobile
 * - Tricolor gradient border accent
 * - Smooth animations with motion
 * - Clear visual hierarchy
 * - Keyboard accessible
 */
export function GroupFilter({
  availableGroups,
  selectedGroups,
  onToggleGroup,
  onClearAll,
}: GroupFilterProps) {
  const hasActiveFilters = selectedGroups.size > 0;

  return (
    <Card className="relative overflow-hidden border bg-card shadow-soft">
      {/* Top accent bar - Tricolor gradient */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-destructive" />

      <div className="p-4 pt-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Filter className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Filtrar por grupo
              </h3>
              <p className="text-sm text-muted-foreground">
                {hasActiveFilters ? (
                  <>
                    <span className="font-medium text-primary">
                      {selectedGroups.size}
                    </span>{" "}
                    grupo{selectedGroups.size > 1 ? "s" : ""} seleccionado
                    {selectedGroups.size > 1 ? "s" : ""}
                  </>
                ) : (
                  "Selecciona uno o varios grupos"
                )}
              </p>
            </div>
          </div>

          {/* Clear All Button - Improved styling */}
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="group flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive sm:w-auto"
            >
              <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
              Limpiar filtros
            </button>
          )}
        </div>

        <Separator className="my-4" />

        {/* Group Badges Grid - Responsive */}
        <div
          className={cn(
            "grid gap-2",
            // Mobile: 4 columns (3 groups per row for 12 groups = 4 rows)
            "grid-cols-4",
            // Tablet: 6 columns (2 rows)
            "sm:grid-cols-6",
            // Desktop: 12 columns (all in one row if 12 groups)
            "lg:grid-cols-12"
          )}
        >
          {availableGroups.map((group, index) => {
            const isSelected = selectedGroups.has(group);

            return (
              <button
                key={group}
                onClick={() => onToggleGroup(group)}
                className={cn(
                  // Base styles
                  "group relative flex h-12 items-center justify-center rounded-lg border-2 font-bold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  // Mobile: larger touch target
                  "sm:h-14",
                  // Selected state
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5 hover:shadow-md",
                  // Stagger animation delay
                  "animate-in fade-in slide-in-from-bottom-2"
                )}
                style={{
                  animationDelay: `${index * 30}ms`,
                  animationFillMode: "backwards",
                }}
              >
                {/* Group letter */}
                <span className="text-lg sm:text-xl">{group}</span>

                {/* Subtle shine effect on hover */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300",
                    !isSelected && "group-hover:opacity-100"
                  )}
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Helper text - Only show on desktop when many groups */}
        {availableGroups.length >= 8 && (
          <p className="mt-4 hidden text-center text-xs text-muted-foreground sm:block">
            Haz clic en los grupos para filtrar • Puedes seleccionar múltiples
          </p>
        )}
      </div>
    </Card>
  );
}
