"use client";

import { useLocale } from "next-intl";
import { Building2, Globe, MapPin } from "lucide-react";
import type { Stadium } from "@/domain/entities/stadium";
import { formatNumber } from "@/presentation/utils/formatters";

interface StadiumHeaderProps {
  stadiums: Stadium[];
}

/**
 * Stadium Header Component
 * Shows summary statistics and page title
 */
export function StadiumHeader({ stadiums }: StadiumHeaderProps) {
  const locale = useLocale();

  // Calculate stats
  const totalStadiums = stadiums.length;
  const countries = new Set(stadiums.map((s) => s.country)).size;
  const totalCapacity = stadiums.reduce(
    (sum, s) => sum + (s.capacity || 0),
    0
  );

  const stats = [
    {
      icon: Building2,
      label: "Estadios",
      value: totalStadiums.toString(),
    },
    {
      icon: Globe,
      label: "Países",
      value: countries.toString(),
    },
    {
      icon: MapPin,
      label: "Capacidad Total",
      value: formatNumber(totalCapacity > 0 ? totalCapacity : null, locale),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title and Description */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Estadios</h1>
        <p className="mt-2 text-muted-foreground">
          Explora los estadios más emblemáticos donde se juega la historia
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
