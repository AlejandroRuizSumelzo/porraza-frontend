"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import type { Team } from "@/domain/entities/team";
import { TeamFlag } from "@/presentation/components/ui/team-flag";
import { Input } from "@/presentation/components/ui/input";
import { cn } from "@/presentation/utils/cn";
import { Badge } from "@/presentation/components/ui/badge";

interface TeamGridSelectorProps {
  teams: Team[];
  selectedTeamId: string | null;
  onTeamSelect: (teamId: string) => void;
}

/**
 * Team Grid Selector Component
 * Visual grid of team flags for selection
 *
 * Features:
 * - Grid of clickable team flags
 * - Search/filter functionality
 * - Visual feedback for selected team
 * - Responsive grid layout
 * - Shows team name on hover
 */
export function TeamGridSelector({
  teams,
  selectedTeamId,
  onTeamSelect,
}: TeamGridSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter teams based on search
  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.fifaCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar equipo..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Teams Grid - 2 columns on mobile for better visibility */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
        {filteredTeams.map((team) => {
          const isSelected = team.id === selectedTeamId;

          return (
            <button
              key={team.id}
              onClick={() => onTeamSelect(team.id)}
              className={cn(
                "group relative flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all",
                "hover:shadow-medium hover:-translate-y-0.5",
                isSelected
                  ? "border-primary shadow-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
              title={team.name}
            >
              {/* Team Flag */}
              <TeamFlag
                fifaCode={team.fifaCode}
                teamName={team.name}
                size="lg"
                className={cn(
                  "transition-transform",
                  isSelected && "ring-2 ring-primary ring-offset-2"
                )}
              />

              {/* Team Code */}
              <span
                className={cn(
                  "text-xs font-semibold transition-colors text-center w-full truncate",
                  isSelected ? "text-primary" : "text-muted-foreground"
                )}
              >
                {team.fifaCode}
              </span>

              {/* Host Badge */}
              {team.isHost && (
                <Badge
                  variant="secondary"
                  className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full p-0 text-[10px] font-bold"
                >
                  🏠
                </Badge>
              )}

              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute inset-0 rounded-lg border-2 border-primary pointer-events-none animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* No Results */}
      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">
            No se encontraron equipos con "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}
