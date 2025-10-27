"use client";

import { Search } from "lucide-react";
import type { Team } from "@/domain/entities/team";
import { TeamFlag } from "@/presentation/components/ui/team-flag";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";

interface TeamSelectorProps {
  teams: Team[];
  selectedTeamId: string | null;
  onTeamSelect: (teamId: string) => void;
}

/**
 * Team Selector Component
 * Dropdown selector for choosing a team
 *
 * Features:
 * - Search/filter teams
 * - Shows team flag and name
 * - Responsive design
 */
export function TeamSelector({
  teams,
  selectedTeamId,
  onTeamSelect,
}: TeamSelectorProps) {
  const selectedTeam = teams.find((team) => team.id === selectedTeamId);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Selecciona un equipo:
      </label>
      <Select value={selectedTeamId ?? undefined} onValueChange={onTeamSelect}>
        <SelectTrigger className="w-full h-auto min-h-[44px] py-2">
          <SelectValue placeholder="🔍 Buscar equipo...">
            {selectedTeam && (
              <div className="flex items-center gap-3">
                <TeamFlag
                  fifaCode={selectedTeam.fifaCode}
                  teamName={selectedTeam.name}
                  size="sm"
                />
                <span className="font-medium">{selectedTeam.name}</span>
                {selectedTeam.isHost && (
                  <span className="text-xs text-muted-foreground">
                    (Anfitrión)
                  </span>
                )}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>

        <SelectContent className="max-h-[400px]">
          {teams.map((team) => (
            <SelectItem key={team.id} value={team.id}>
              <div className="flex items-center gap-3 py-1">
                <TeamFlag
                  fifaCode={team.fifaCode}
                  teamName={team.name}
                  size="sm"
                />
                <span className="font-medium">{team.name}</span>
                {team.isHost && (
                  <span className="text-xs text-muted-foreground">
                    (Anfitrión)
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
