import { Trophy, Calendar, MapPin } from "lucide-react";
import type { MatchCalendar } from "@/domain/entities/match-calendar";

interface ScheduleHeaderProps {
  calendar: MatchCalendar;
}

/**
 * Schedule Header Component
 * Shows summary statistics and page title
 */
export function ScheduleHeader({ calendar }: ScheduleHeaderProps) {
  // Calculate stats
  const totalMatches = calendar.total;
  const totalPhases = calendar.calendar.length;

  // Get unique stadiums
  const uniqueStadiums = new Set(
    calendar.calendar.flatMap((phase) =>
      phase.matches.map((match) => match.stadium.id)
    )
  ).size;

  const stats = [
    {
      icon: Trophy,
      label: "Total de Partidos",
      value: totalMatches.toString(),
    },
    {
      icon: Calendar,
      label: "Fases del Torneo",
      value: totalPhases.toString(),
    },
    {
      icon: MapPin,
      label: "Estadios",
      value: uniqueStadiums.toString(),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title and Description */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Calendario</h1>
        <p className="mt-2 text-muted-foreground">
          Consulta el calendario completo del Mundial 2026
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
