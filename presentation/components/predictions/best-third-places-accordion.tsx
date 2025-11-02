"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/presentation/components/ui/collapsible";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";
import { Progress } from "@/presentation/components/ui/progress";
import { Trophy, ChevronDown, Lock, Sparkles, ArrowRight } from "lucide-react";
import { BestThirdPlacesTable } from "@/presentation/components/predictions/best-third-places-table";
import type { BestThirdPlace } from "@/domain/entities/best-third-place";
import type { MatchWithPrediction } from "@/domain/entities/match-with-prediction";
import { cn } from "@/presentation/utils/cn";

interface BestThirdPlacesAccordionProps {
  /**
   * Best third places data (only present when all 12 groups completed)
   */
  bestThirdPlaces: BestThirdPlace[] | null;
  /**
   * All matches (to extract team and group data)
   */
  matches: MatchWithPrediction[];
  /**
   * Total groups completed count
   */
  completedGroupsCount: number;
  /**
   * Total groups in the tournament
   */
  totalGroupsCount: number;
  /**
   * Callback to navigate to knockout phase
   */
  onNavigateToKnockout?: () => void;
}

const STORAGE_KEY = "porraza-best-thirds-viewed";

/**
 * Best Third Places Accordion Component
 *
 * Collapsible section that shows the ranking of best 3rd-placed teams
 * Only shows data when all 12 groups are completed
 *
 * Features:
 * - Auto-expands the first time all groups are completed
 * - Persists viewed state in localStorage
 * - Shows progress/lock state when not completed
 * - Responsive design
 * - Celebratory styling when completed
 */
export function BestThirdPlacesAccordion({
  bestThirdPlaces,
  matches,
  completedGroupsCount,
  totalGroupsCount,
  onNavigateToKnockout,
}: BestThirdPlacesAccordionProps) {
  const allGroupsCompleted = completedGroupsCount === totalGroupsCount;
  const hasData = bestThirdPlaces && bestThirdPlaces.length > 0;

  // Check if user has already viewed the best thirds
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load viewed state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const viewed = localStorage.getItem(STORAGE_KEY) === "true";
      setHasBeenViewed(viewed);

      // Auto-expand if all groups just completed and not viewed before
      if (hasData && !viewed) {
        setIsOpen(true);
      }
    }
  }, [hasData]);

  // Mark as viewed when user opens it
  useEffect(() => {
    if (isOpen && hasData && !hasBeenViewed) {
      localStorage.setItem(STORAGE_KEY, "true");
      setHasBeenViewed(true);
    }
  }, [isOpen, hasData, hasBeenViewed]);

  // Extract teams and groups data from matches
  const { teamsData, groupsData } = useMemo(() => {
    const teams: Record<string, { name: string; fifaCode: string }> = {};
    const groups: Record<string, string> = {};

    matches.forEach((m) => {
      // Add home team
      if (!teams[m.match.homeTeam.id]) {
        teams[m.match.homeTeam.id] = {
          name: m.match.homeTeam.name,
          fifaCode: m.match.homeTeam.fifaCode,
        };
      }
      // Add away team
      if (!teams[m.match.awayTeam.id]) {
        teams[m.match.awayTeam.id] = {
          name: m.match.awayTeam.name,
          fifaCode: m.match.awayTeam.fifaCode,
        };
      }
      // Add group
      if (!groups[m.match.group.id]) {
        groups[m.match.group.id] = m.match.group.name;
      }
    });

    return { teamsData: teams, groupsData: groups };
  }, [matches]);

  // Calculate qualified count (top 8)
  const qualifiedCount = bestThirdPlaces
    ? bestThirdPlaces.filter((p) => p.rankingPosition <= 8).length
    : 0;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card
        className={cn(
          "transition-all duration-300 pb-0",
          hasData && !hasBeenViewed && "shadow-secondary border-secondary/30"
        )}
      >
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-muted/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            )}
          >
            <div className="flex items-center gap-3">
              <Trophy
                className={cn(
                  "size-5 shrink-0 transition-colors",
                  hasData ? "text-secondary" : "text-muted-foreground"
                )}
              />
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-foreground sm:text-base">
                  Mejores terceros clasificados
                </h3>
                <p className="text-xs text-muted-foreground">
                  {!allGroupsCompleted &&
                    `Completa todos los grupos (${completedGroupsCount}/${totalGroupsCount})`}
                  {allGroupsCompleted &&
                    hasData &&
                    `${qualifiedCount} equipos clasifican a octavos`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Status badges */}
              {!allGroupsCompleted && (
                <Badge variant="outline" className="gap-1.5 text-xs">
                  <Lock className="size-3" />
                  {completedGroupsCount}/{totalGroupsCount}
                </Badge>
              )}
              {hasData && !hasBeenViewed && (
                <Badge
                  variant="secondary"
                  className="gap-1.5 text-xs animate-pulse"
                >
                  <Sparkles className="size-3" />
                  Nuevo
                </Badge>
              )}

              {/* Chevron */}
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </div>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="border-t pt-4">
            {/* State: Not completed */}
            {!allGroupsCompleted && (
              <div className="space-y-4 py-8 text-center">
                <Lock className="mx-auto size-12 text-muted-foreground" />
                <div className="space-y-2">
                  <h4 className="text-base font-semibold text-foreground">
                    Ranking no disponible
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Completa las predicciones de los 12 grupos para ver el
                    ranking de mejores terceros.
                  </p>
                </div>

                {/* Progress indicator */}
                <div className="mx-auto max-w-md space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progreso</span>
                    <span className="font-semibold">
                      {completedGroupsCount}/{totalGroupsCount} grupos
                    </span>
                  </div>
                  <Progress
                    value={(completedGroupsCount / totalGroupsCount) * 100}
                    className="h-2"
                  />
                </div>
              </div>
            )}

            {/* State: Completed with data */}
            {allGroupsCompleted && hasData && (
              <div className="space-y-4 pb-4">
                {/* Celebration message (only first time) */}
                {!hasBeenViewed && (
                  <div className="rounded-lg bg-gradient-secondary p-4 text-center">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <Sparkles className="size-5 text-secondary" />
                      <p className="text-base font-semibold text-foreground">
                        ¡Todos los grupos completados!
                      </p>
                      <Sparkles className="size-5 text-secondary" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Estos son los 8 mejores terceros que clasifican a octavos
                      de final
                    </p>
                  </div>
                )}

                {/* Table */}
                <BestThirdPlacesTable
                  bestThirdPlaces={bestThirdPlaces}
                  teamsData={teamsData}
                  groupsData={groupsData}
                />
              </div>
            )}

            {/* State: Completed but no data (edge case) */}
            {allGroupsCompleted && !hasData && (
              <div className="py-8 text-center text-sm text-muted-foreground">
                <p>
                  Finaliza la fase de grupos para ver el ranking de mejores
                  terceros clasificados.
                </p>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
