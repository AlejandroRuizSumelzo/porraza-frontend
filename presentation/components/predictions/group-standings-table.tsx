"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/presentation/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";
import { TeamFlag } from "@/presentation/components/ui/team-flag";
import {
  Trophy,
  AlertCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import type { TeamStanding } from "@/presentation/lib/calculate-standings";
import { cn } from "@/presentation/lib/utils";

interface GroupStandingsTableProps {
  standings: TeamStanding[];
  groupName: string;
  isPreview?: boolean; // True if not all predictions are saved to DB
}

/**
 * Group Standings Table Component
 *
 * Displays the group standings table with FIFA World Cup styling.
 *
 * Features:
 * - Color-coded positions (1-2: qualify, 3: possible best 3rd, 4: eliminated)
 * - Responsive design (mobile shows fewer columns)
 * - Tied teams indicator
 * - Preview mode badge (when predictions not saved)
 * - Trophy icon for qualified positions
 * - 🆕 Smooth animations when positions change (Motion)
 * - 🆕 Visual indicators for teams moving up/down
 */
export function GroupStandingsTable({
  standings,
  groupName,
  isPreview = false,
}: GroupStandingsTableProps) {
  // Track previous positions to detect changes
  const previousPositionsRef = useRef<Map<string, number>>(new Map());
  const [positionChanges, setPositionChanges] = useState<
    Map<string, "up" | "down" | null>
  >(new Map());

  // Detect position changes when standings update
  useEffect(() => {
    const newChanges = new Map<string, "up" | "down" | null>();
    const previousPositions = previousPositionsRef.current;

    standings.forEach((standing) => {
      const previousPosition = previousPositions.get(standing.team.id);

      if (
        previousPosition !== undefined &&
        previousPosition !== standing.position
      ) {
        // Position changed
        if (standing.position < previousPosition) {
          newChanges.set(standing.team.id, "up"); // Moved up (lower number = better)
        } else {
          newChanges.set(standing.team.id, "down"); // Moved down
        }
      } else {
        newChanges.set(standing.team.id, null); // No change
      }
    });

    setPositionChanges(newChanges);

    // Update previous positions for next comparison
    const newPositions = new Map<string, number>();
    standings.forEach((standing) => {
      newPositions.set(standing.team.id, standing.position);
    });
    previousPositionsRef.current = newPositions;

    // Clear position change indicators after animation completes
    if (
      newChanges.size > 0 &&
      Array.from(newChanges.values()).some((v) => v !== null)
    ) {
      const timer = setTimeout(() => {
        setPositionChanges(new Map());
      }, 2000); // Clear after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [standings]);
  return (
    <Card className="overflow-hidden bg-muted/30 pt-4 pb-4">
      <CardHeader className="space-y-3 border-b bg-muted/30 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Trophy className="size-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground sm:text-lg">
              Clasificación - Grupo {groupName}
            </h3>
          </div>
          {isPreview && (
            <Badge variant="outline" className="gap-1.5 text-xs">
              <AlertCircle className="size-3" />
              Vista previa
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead>Equipo</TableHead>
              {/* Desktop columns */}
              <TableHead className="hidden text-center sm:table-cell">
                PJ
              </TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                G
              </TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                E
              </TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                P
              </TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                GF
              </TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                GC
              </TableHead>
              {/* Mobile + Desktop columns */}
              <TableHead className="text-center">DIF</TableHead>
              <TableHead className="text-center font-bold">Pts</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <AnimatePresence mode="popLayout">
              {standings.map((standing) => {
                const isQualified = standing.position <= 2;
                const isPossibleThird = standing.position === 3;
                const isEliminated = standing.position === 4;
                const positionChange = positionChanges.get(standing.team.id);
                const hasPositionChange =
                  positionChange !== null && positionChange !== undefined;

                return (
                  <motion.tr
                    key={standing.team.id}
                    layout
                    layoutId={`team-${standing.team.id}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      backgroundColor: hasPositionChange
                        ? positionChange === "up"
                          ? "rgba(34, 197, 94, 0.15)" // green flash
                          : "rgba(239, 68, 68, 0.15)" // red flash
                        : "transparent",
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      },
                      backgroundColor: {
                        duration: 0.6,
                        ease: "easeOut",
                      },
                    }}
                    className={cn(
                      "transition-colors",
                      isQualified &&
                        "bg-secondary/10 hover:bg-secondary/20 border-l-4 border-l-secondary",
                      isPossibleThird &&
                        "bg-warning/10 hover:bg-warning/20 border-l-4 border-l-warning",
                      isEliminated && "opacity-60 hover:opacity-80"
                    )}
                  >
                    {/* Position */}
                    <TableCell className="text-center font-bold">
                      <div className="relative inline-flex items-center justify-center">
                        <motion.div
                          animate={
                            hasPositionChange
                              ? {
                                  scale: [1, 1.2, 1],
                                  rotate:
                                    positionChange === "up"
                                      ? [0, -5, 0]
                                      : [0, 5, 0],
                                }
                              : {}
                          }
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <Badge
                            variant={
                              isQualified
                                ? "secondary"
                                : isPossibleThird
                                ? "outline"
                                : "outline"
                            }
                            className={cn(
                              "size-7 items-center justify-center rounded-full p-0 text-xs sm:size-8 sm:text-sm",
                              isPossibleThird &&
                                "border-warning bg-warning/10 text-warning"
                            )}
                          >
                            {standing.position}
                          </Badge>
                        </motion.div>

                        {/* Position change indicator */}
                        <AnimatePresence>
                          {hasPositionChange && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                y: positionChange === "up" ? 10 : -10,
                              }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0 }}
                              transition={{ duration: 0.3 }}
                              className="absolute -right-5 sm:-right-6"
                            >
                              {positionChange === "up" ? (
                                <TrendingUp className="size-4 text-secondary drop-shadow-md sm:size-5" />
                              ) : (
                                <TrendingDown className="size-4 text-destructive drop-shadow-md sm:size-5" />
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </TableCell>

                    {/* Team */}
                    <TableCell>
                      <div className="flex items-center gap-2 sm:gap-2.5 ml-5">
                        <TeamFlag
                          fifaCode={standing.team.fifaCode}
                          teamName={standing.team.name}
                          size="sm"
                          rounded="md"
                          bordered
                          className="shrink-0"
                        />
                        <div className="min-w-0">
                          {/* Desktop: Full name */}
                          <p className="hidden truncate text-sm font-semibold sm:block">
                            {standing.team.name}
                          </p>
                          {/* Mobile: FIFA code */}
                          <p className="text-xs font-bold uppercase sm:hidden">
                            {standing.team.fifaCode}
                          </p>
                          {/* Show tied indicator only when all predictions are saved */}
                          {standing.isTied && !isPreview && (
                            <div className="mt-0.5 flex items-center gap-1">
                              <AlertTriangle className="size-2.5 text-warning" />
                              <p className="text-[10px] text-warning">
                                Empatado
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* Played (Desktop only) */}
                    <TableCell className="hidden text-center text-sm sm:table-cell">
                      {standing.played}
                    </TableCell>

                    {/* Won (Desktop only) */}
                    <TableCell className="hidden text-center text-sm sm:table-cell">
                      {standing.won}
                    </TableCell>

                    {/* Drawn (Desktop only) */}
                    <TableCell className="hidden text-center text-sm sm:table-cell">
                      {standing.drawn}
                    </TableCell>

                    {/* Lost (Desktop only) */}
                    <TableCell className="hidden text-center text-sm sm:table-cell">
                      {standing.lost}
                    </TableCell>

                    {/* Goals For (Desktop only) */}
                    <TableCell className="hidden text-center text-sm sm:table-cell">
                      {standing.goalsFor}
                    </TableCell>

                    {/* Goals Against (Desktop only) */}
                    <TableCell className="hidden text-center text-sm sm:table-cell">
                      {standing.goalsAgainst}
                    </TableCell>

                    {/* Goal Difference (Mobile + Desktop) */}
                    <TableCell
                      className={cn(
                        "text-center text-sm font-semibold",
                        standing.goalDifference > 0 && "text-secondary",
                        standing.goalDifference < 0 && "text-destructive"
                      )}
                    >
                      {standing.goalDifference > 0 && "+"}
                      {standing.goalDifference}
                    </TableCell>

                    {/* Points (Mobile + Desktop) - Highlighted */}
                    <TableCell className="text-center text-base font-bold text-primary sm:text-lg">
                      {standing.points}
                    </TableCell>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </TableBody>
        </Table>
      </CardContent>

      {/* Legend */}
      <CardContent className="border-t bg-muted/20 py-3">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-sm bg-secondary" />
            <span>Clasificado directo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-sm bg-warning" />
            <span>Posible mejor 3º</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-sm bg-muted opacity-40" />
            <span>Eliminado</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
