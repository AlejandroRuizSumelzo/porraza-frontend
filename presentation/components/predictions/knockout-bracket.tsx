"use client";

import { useState, useEffect } from "react";
import {
  SingleEliminationBracket,
  Match,
  createTheme,
} from "@g-loot/react-tournament-brackets";
// @ts-expect-error: Module '@g-loot/react-tournament-brackets/dist/types' does not provide type definitions.
import type { MatchComponentProps } from "@g-loot/react-tournament-brackets/dist/types";
import { Info, Trophy } from "lucide-react";
import { Badge } from "@/presentation/components/ui/badge";
import { TeamFlag } from "@/presentation/components/ui/team-flag";
import {
  ScrollArea,
  ScrollBar,
} from "@/presentation/components/ui/scroll-area";
import { KnockoutMatchDialog } from "@/presentation/components/predictions/knockout-match-dialog";
import { cn } from "@/presentation/lib/utils";
import type { RoundOf32Match } from "@/domain/entities/round-of-32-match";
import {
  convertToTournamentBracket,
  isTBDParticipant,
  type TournamentMatch,
} from "@/presentation/utils/tournament-bracket-utils";

interface KnockoutBracketProps {
  matches: RoundOf32Match[];
}

/**
 * Porraza Custom Theme for @g-loot/react-tournament-brackets
 * Matches the brand colors:
 * - Primary: #2a398d
 * - Secondary: #3cac3b
 * - Destructive: #e61d25
 */
const PorrazaTheme = createTheme({
  textColor: {
    main: "#0f172a",
    highlighted: "#2a398d", // Primary blue
    dark: "#64748b",
  },
  matchBackground: {
    wonColor: "#d1fae5", // Light green tint (secondary)
    lostColor: "#fee2e2", // Light red tint (destructive)
  },
  score: {
    background: {
      wonColor: "#3cac3b", // Secondary green for winners
      lostColor: "#e61d25", // Destructive red for losers
    },
    text: {
      highlightedWonColor: "#ffffff",
      highlightedLostColor: "#ffffff",
    },
  },
  border: {
    color: "#cbd5e1",
    highlightedColor: "#2a398d", // Primary blue for highlights
  },
  roundHeader: {
    backgroundColor: "#2a398d", // Primary blue headers
    fontColor: "#ffffff",
  },
  connectorColor: "#9ca9d9", // Primary blue with opacity
  connectorColorHighlight: "#3cac3b", // Secondary green on highlight
  svgBackground: "#fafafa",
});

/**
 * Custom Match Component with TeamFlag integration
 * Displays teams with their flags in a compact format
 */
function CustomMatch({
  match,
  onMatchClick,
  onPartyClick,
  onMouseEnter,
  onMouseLeave,
  topParty,
  bottomParty,
  topWon,
  bottomWon,
  topHovered,
  bottomHovered,
  topText,
  bottomText,
  connectorColor,
  computedStyles,
  teamNameFallback,
  resultFallback,
}: MatchComponentProps) {
  const isTBD =
    isTBDParticipant(topParty.fifaCode) ||
    isTBDParticipant(bottomParty.fifaCode);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        width: "100%",
        height: "100%",
        minHeight: "72px",
      }}
      onClick={() => onMatchClick?.({ match })}
      className={cn(
        // Base styles with gradient background
        "group relative cursor-pointer rounded-lg bg-gradient-to-br from-card via-card to-primary/5",
        // Border with primary color - thicker and more prominent
        "border-2 border-primary/30",
        // Shadow and transitions
        "shadow-sm shadow-primary/5 transition-all duration-300",
        // Hover effects with secondary color (green)
        "hover:scale-[1.02] hover:border-secondary hover:shadow-lg hover:shadow-secondary/20",
        // TBD states - dashed border and muted
        isTBD &&
          "border-dashed border-destructive/30 opacity-60 hover:opacity-80"
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-secondary/0 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Top Team */}
      <div
        className={cn(
          "relative z-10 flex items-center gap-2 px-3 py-2.5 transition-colors duration-200",
          "border-b border-primary/10",
          topHovered && "bg-secondary/10"
        )}
        onMouseEnter={() => onMouseEnter?.(topParty.id)}
        onMouseLeave={onMouseLeave}
      >
        <TeamFlag
          fifaCode={topParty.fifaCode || "TBD"}
          teamName={topParty.name || "TBD"}
          size="sm"
          rounded="sm"
          bordered
          className="shrink-0 transition-transform duration-200 group-hover:scale-110"
        />
        <span
          className={cn(
            "flex-1 truncate text-xs font-semibold transition-colors duration-200",
            topHovered ? "text-secondary" : "text-foreground"
          )}
          title={topParty.name || teamNameFallback}
        >
          {topText || topParty.name || teamNameFallback}
        </span>
        {topParty.resultText && (
          <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-bold text-white shadow-sm">
            {topParty.resultText}
          </span>
        )}
      </div>

      {/* Bottom Team */}
      <div
        className={cn(
          "relative z-10 flex items-center gap-2 px-3 py-2.5 transition-colors duration-200",
          bottomHovered && "bg-secondary/10"
        )}
        onMouseEnter={() => onMouseEnter?.(bottomParty.id)}
        onMouseLeave={onMouseLeave}
      >
        <TeamFlag
          fifaCode={bottomParty.fifaCode || "TBD"}
          teamName={bottomParty.name || "TBD"}
          size="sm"
          rounded="sm"
          bordered
          className="shrink-0 transition-transform duration-200 group-hover:scale-110"
        />
        <span
          className={cn(
            "flex-1 truncate text-xs font-semibold transition-colors duration-200",
            bottomHovered ? "text-secondary" : "text-foreground"
          )}
          title={bottomParty.name || teamNameFallback}
        >
          {bottomText || bottomParty.name || teamNameFallback}
        </span>
        {bottomParty.resultText && (
          <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-bold text-white shadow-sm">
            {bottomParty.resultText}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Knockout Bracket Component
 *
 * Displays the complete knockout phase bracket for the World Cup 2026
 * Features:
 * - Complete single elimination bracket (16avos through Final)
 * - Custom theme matching Porraza brand colors
 * - Custom Match component with TeamFlag integration
 * - SVG-based bracket visualization with smooth connectors
 * - Click to open detailed match information
 * - Automatic removal of "Round" prefix from round headers
 */
export function KnockoutBracket({ matches }: KnockoutBracketProps) {
  const [selectedMatch, setSelectedMatch] = useState<TournamentMatch | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!matches || matches.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-card via-primary/5 to-secondary/5 p-12 text-center shadow-lg shadow-primary/5">
        <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-xl shadow-primary/30">
          <Info className="size-10 text-white" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-primary">16avos de Final</h3>
        <p className="mx-auto max-w-md text-sm font-medium leading-relaxed text-muted-foreground">
          Los emparejamientos de 16avos de final se mostrarán cuando se
          completen todos los grupos.
        </p>
        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-primary via-secondary to-primary" />
      </div>
    );
  }

  // Convert matches to @g-loot/react-tournament-brackets format
  const tournamentMatches = convertToTournamentBracket(matches);

  // Handle match click to open dialog
  const handleMatchClick = (args: { match: Match }) => {
    // Find the original TournamentMatch data
    const clickedMatch = tournamentMatches.find((m) => m.id === args.match.id);
    if (clickedMatch) {
      setSelectedMatch(clickedMatch);
      setIsDialogOpen(true);
    }
  };

  // Remove "Round " prefix from round headers in SVG
  useEffect(() => {
    const removeRoundPrefix = () => {
      // Find all <text> elements inside SVG (round headers)
      const textElements = document.querySelectorAll("svg text");
      textElements.forEach((textElement) => {
        const content = textElement.textContent;
        if (content && content.startsWith("Round ")) {
          textElement.textContent = content.replace("Round ", "");
        }
      });
    };

    // Run multiple times to catch async renders
    const timer1 = setTimeout(removeRoundPrefix, 50);
    const timer2 = setTimeout(removeRoundPrefix, 200);
    const timer3 = setTimeout(removeRoundPrefix, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [tournamentMatches]);

  console.log(
    "[KnockoutBracket] Displaying bracket with matches:",
    tournamentMatches.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 rounded-lg border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-primary">
            <div className="rounded-lg bg-primary p-2 shadow-md shadow-primary/30">
              <Trophy className="size-6 text-white" />
            </div>
            Eliminatorias
          </h2>
          <p className="mt-1 ml-14 text-sm font-medium text-muted-foreground">
            Fase final del Mundial 2026
          </p>
        </div>
        <Badge
          variant="secondary"
          className="w-fit bg-secondary text-white shadow-md shadow-secondary/30 hover:bg-secondary/90"
        >
          {matches.length} partidos confirmados
        </Badge>
      </div>

      {/* Bracket Container with ScrollArea */}
      <ScrollArea className="h-[800px] w-full max-w-full rounded-xl border-2 border-primary/20 bg-gradient-to-br from-card via-background to-primary/5 shadow-lg shadow-primary/10">
        <div className="min-w-fit p-8">
          <SingleEliminationBracket
            matches={tournamentMatches}
            matchComponent={CustomMatch}
            theme={PorrazaTheme}
            options={{
              style: {
                roundHeader: {
                  backgroundColor: PorrazaTheme.roundHeader.backgroundColor,
                  fontColor: PorrazaTheme.roundHeader.fontColor,
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                },
                connectorColor: PorrazaTheme.connectorColor,
                connectorColorHighlight: PorrazaTheme.connectorColorHighlight,
              },
            }}
            onMatchClick={handleMatchClick}
          />
        </div>
        <ScrollBar orientation="horizontal" className="bg-primary/5" />
        <ScrollBar orientation="vertical" className="bg-primary/5" />
      </ScrollArea>

      {/* Info Footer */}
      <div className="group rounded-lg border-2 border-secondary/30 bg-gradient-to-r from-secondary/5 via-primary/5 to-secondary/5 p-4 shadow-sm transition-all hover:border-secondary/50 hover:shadow-md hover:shadow-secondary/10">
        <div className="flex gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-secondary/80 shadow-md shadow-secondary/30">
            <Info className="size-5 text-white" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              Bracket de eliminatorias directas
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-secondary">Haz click</span> en
              cualquier partido para ver más detalles. Los equipos marcados como{" "}
              <span className="font-medium text-destructive">"TBD"</span> se
              determinarán cuando se completen las rondas anteriores.
            </p>
          </div>
        </div>
      </div>

      {/* Match Details Dialog - Reusing existing dialog */}
      {selectedMatch && (
        <KnockoutMatchDialog
          seed={{
            id: String(selectedMatch.id),
            date: selectedMatch.startTime,
            teams: selectedMatch.participants.map((p) => ({
              name: p.name,
              fifaCode: p.fifaCode,
              confederation: p.confederation,
            })),
            matchId: String(selectedMatch.id),
            matchNumber: undefined,
            stadium: undefined,
            matchTime: undefined,
            phase: selectedMatch.tournamentRoundText,
          }}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
}
