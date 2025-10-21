"use client";

import { Card } from "@/presentation/components/ui/card";
import { MapPin, Users, Globe } from "lucide-react";
import type { Stadium } from "@/domain/entities/stadium";

interface StadiumCardProps {
  stadium: Stadium;
}

/**
 * Stadium Card Component (Client Component)
 * Modern, minimalist design for displaying stadium information
 * Optimized for both desktop and mobile
 *
 * Note: Client Component required for onError handler on img tag
 */
export function StadiumCard({ stadium }: StadiumCardProps) {
  // Generate image path from stadium code
  const imagePath = `/stadiums/${stadium.code}.webp`;

  return (
    <Card className="group relative overflow-hidden border-0 bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
      {/* Stadium Image with Gradient Overlay */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <img
          src={imagePath}
          alt={stadium.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-110"
          onError={(e) => {
            // Fallback to a gradient if image fails to load
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

        {/* Stadium Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-foreground line-clamp-1">
            {stadium.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {stadium.city}, {stadium.country}
            </p>
          </div>
        </div>
      </div>

      {/* Stadium Info */}
      <div className="p-4 space-y-3">
        {/* Capacity */}
        {stadium.capacity && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-sm">Capacidad</span>
            </div>
            <span className="text-sm font-semibold">
              {stadium.capacity.toLocaleString("es-ES")}
            </span>
          </div>
        )}

        {/* Timezone */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span className="text-sm">Zona horaria</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {stadium.timezone}
          </span>
        </div>
      </div>
    </Card>
  );
}
