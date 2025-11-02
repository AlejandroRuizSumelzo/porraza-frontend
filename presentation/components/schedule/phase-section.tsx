import { Trophy, Users, Medal, Crown } from "lucide-react";
import type { PhaseMatches } from "@/domain/entities/match-calendar";
import { MatchCard } from "@/presentation/components/schedule/match-card";
import type { MatchPhase } from "@/domain/entities/match";

interface PhaseSectionProps {
  phaseData: PhaseMatches;
}

/**
 * Phase Section Component
 * Groups matches by tournament phase with styled header
 * Shows phase icon, name, and match count
 */
export function PhaseSection({ phaseData }: PhaseSectionProps) {
  // Get phase display info
  const getPhaseInfo = (phase: MatchPhase) => {
    const phaseConfig = {
      GROUP_STAGE: {
        icon: Users,
        label: "Fase de Grupos",
        color: "text-primary",
        bgColor: "bg-primary/10",
      },
      ROUND_OF_32: {
        icon: Trophy,
        label: "Dieciseisavos de Final",
        color: "text-secondary",
        bgColor: "bg-secondary/10",
      },
      ROUND_OF_16: {
        icon: Trophy,
        label: "Octavos de Final",
        color: "text-secondary",
        bgColor: "bg-secondary/10",
      },
      QUARTER_FINALS: {
        icon: Trophy,
        label: "Cuartos de Final",
        color: "text-secondary",
        bgColor: "bg-secondary/10",
      },
      SEMI_FINALS: {
        icon: Medal,
        label: "Semifinales",
        color: "text-destructive",
        bgColor: "bg-destructive/10",
      },
      THIRD_PLACE: {
        icon: Medal,
        label: "Tercer Lugar",
        color: "text-muted-foreground",
        bgColor: "bg-muted",
      },
      FINAL: {
        icon: Crown,
        label: "Final",
        color: "text-destructive",
        bgColor: "bg-destructive/10",
      },
    };

    return phaseConfig[phase];
  };

  const phaseInfo = getPhaseInfo(phaseData.phase);
  const Icon = phaseInfo.icon;

  return (
    <section className="space-y-4">
      {/* Phase Header */}
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${phaseInfo.bgColor}`}
        >
          <Icon className={`h-6 w-6 ${phaseInfo.color}`} />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{phaseInfo.label}</h2>
          <p className="text-sm text-muted-foreground">
            {phaseData.matches.length}{" "}
            {phaseData.matches.length === 1 ? "partido" : "partidos"}
          </p>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {phaseData.matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </section>
  );
}
