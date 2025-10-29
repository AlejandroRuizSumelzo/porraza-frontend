"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/presentation/components/ui/table";
import { Badge } from "@/presentation/components/ui/badge";
import { TeamFlag } from "@/presentation/components/ui/team-flag";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import type { BestThirdPlace } from "@/domain/entities/best-third-place";
import { cn } from "@/presentation/lib/utils";

interface BestThirdPlacesTableProps {
  bestThirdPlaces: BestThirdPlace[];
  /**
   * Map of teamId to team data (name, fifaCode)
   * You'll need to pass this from parent component
   */
  teamsData: Record<string, { name: string; fifaCode: string }>;
  /**
   * Map of groupId to group name (e.g., "A", "B", "C")
   */
  groupsData: Record<string, string>;
}

/**
 * Best Third Places Table Component
 *
 * Displays the ranking of all 12 third-placed teams with FIFA World Cup styling.
 *
 * Features:
 * - Color-coded positions (1-8: qualify ✅, 9-12: eliminated ❌)
 * - Visual separator line between qualified/eliminated
 * - Responsive design (mobile shows fewer columns)
 * - Tiebreaker indicators
 * - Smooth animations with Motion
 *
 * Color scheme (from your palette):
 * - secondary (#3cac3b): Qualified teams (green)
 * - destructive (#e61d25): Eliminated teams (red)
 * - primary (#2a398d): Headers and accents (blue)
 * - warning (yellow): Tiebreaker conflicts
 */
export function BestThirdPlacesTable({
  bestThirdPlaces,
  teamsData,
  groupsData,
}: BestThirdPlacesTableProps) {
  // Sort by ranking position (should already be sorted, but just in case)
  const sortedPlaces = [...bestThirdPlaces].sort(
    (a, b) => a.rankingPosition - b.rankingPosition
  );

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            <TableHead className="w-12 text-center font-bold text-primary">
              #
            </TableHead>
            <TableHead className="font-bold text-primary">Equipo</TableHead>
            <TableHead className="hidden text-center font-bold text-primary sm:table-cell">
              Grupo
            </TableHead>
            <TableHead className="text-center font-bold text-primary">
              Pts
            </TableHead>
            <TableHead className="text-center font-bold text-primary">
              DG
            </TableHead>
            <TableHead className="hidden text-center font-bold text-primary sm:table-cell">
              GF
            </TableHead>
            <TableHead className="w-16 text-center font-bold text-primary">
              Estado
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <AnimatePresence mode="popLayout">
            {sortedPlaces.map((place, index) => {
              const isQualified = place.rankingPosition <= 8;
              const teamData = teamsData[place.teamId];
              const groupName = groupsData[place.fromGroupId];

              // Show separator line after position 8 (between qualified and eliminated)
              const showSeparator = place.rankingPosition === 8;

              if (!teamData) {
                console.warn(
                  `[BestThirdPlacesTable] Missing team data for teamId: ${place.teamId}`
                );
                return null;
              }

              return (
                <motion.tr
                  key={place.teamId}
                  layout
                  layoutId={`best-third-${place.teamId}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    },
                    opacity: { duration: 0.3 },
                    x: { duration: 0.3 },
                  }}
                  className={cn(
                    "transition-colors",
                    isQualified &&
                      "bg-secondary/5 hover:bg-secondary/10 !border-l-4 border-l-secondary",
                    !isQualified &&
                      "bg-destructive/5 hover:bg-destructive/10 !border-l-4 border-l-destructive opacity-70",
                    showSeparator && "border-b-2 border-b-border"
                  )}
                >
                  {/* Position */}
                  <TableCell className="text-center">
                    <Badge
                      variant={isQualified ? "secondary" : "outline"}
                      className={cn(
                        "size-8 items-center justify-center rounded-full p-0 text-sm font-bold sm:size-9",
                        !isQualified &&
                          "border-destructive bg-destructive/10 text-destructive"
                      )}
                    >
                      {place.rankingPosition}
                    </Badge>
                  </TableCell>

                  {/* Team */}
                  <TableCell>
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <TeamFlag
                        fifaCode={teamData.fifaCode}
                        teamName={teamData.name}
                        size="sm"
                        rounded="md"
                        bordered
                        className="shrink-0"
                      />
                      <div className="min-w-0">
                        {/* Desktop: Full name */}
                        <p className="hidden truncate text-sm font-semibold sm:block">
                          {teamData.name}
                        </p>
                        {/* Mobile: FIFA code */}
                        <p className="text-xs font-bold uppercase sm:hidden">
                          {teamData.fifaCode}
                        </p>
                        {/* Tiebreaker indicator */}
                        {place.hasTiebreakConflict && (
                          <div className="mt-0.5 flex items-center gap-1">
                            <AlertTriangle className="size-2.5 text-warning" />
                            <p className="text-[10px] text-warning">
                              Desempate
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Group (Desktop only) */}
                  <TableCell className="hidden text-center text-sm font-semibold sm:table-cell">
                    {groupName || "?"}
                  </TableCell>

                  {/* Points */}
                  <TableCell className="text-center text-base font-bold text-primary">
                    {place.points}
                  </TableCell>

                  {/* Goal Difference */}
                  <TableCell
                    className={cn(
                      "text-center text-sm font-semibold",
                      place.goalDifference > 0 && "text-secondary",
                      place.goalDifference < 0 && "text-destructive"
                    )}
                  >
                    {place.goalDifference > 0 && "+"}
                    {place.goalDifference}
                  </TableCell>

                  {/* Goals For (Desktop only) */}
                  <TableCell className="hidden text-center text-sm font-semibold sm:table-cell">
                    {place.goalsFor}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="text-center">
                    {isQualified ? (
                      <CheckCircle2
                        className="mx-auto size-5 text-secondary"
                        aria-label="Clasificado"
                      />
                    ) : (
                      <XCircle
                        className="mx-auto size-5 text-destructive"
                        aria-label="Eliminado"
                      />
                    )}
                  </TableCell>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </TableBody>
      </Table>

      {/* Legend */}
      <div className="border-t bg-muted/20 px-4 py-3">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-secondary" />
            <span>Clasificado a octavos (Top 8)</span>
          </div>
          {bestThirdPlaces.some((p) => p.hasTiebreakConflict) && (
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="size-3.5 text-warning" />
              <span>Desempate pendiente</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
