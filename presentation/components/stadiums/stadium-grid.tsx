import type { Stadium } from "@/domain/entities/stadium";
import { StadiumCard } from "@/presentation/components/stadiums/stadium-card";

interface StadiumGridProps {
  stadiums: Stadium[];
}

/**
 * Stadium Grid Component
 * Responsive grid layout for stadium cards
 *
 * Breakpoints:
 * - Mobile: 1 column
 * - Tablet: 2 columns
 * - Desktop: 3 columns
 */
export function StadiumGrid({ stadiums }: StadiumGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stadiums.map((stadium) => (
        <StadiumCard key={stadium.id} stadium={stadium} />
      ))}
    </div>
  );
}
